/**
 * PayPal Payment Integration Component
 * 
 * Implements PayPal SDK integration for secure payment processing with:
 * - Sandbox mode for development/testing
 * - Comprehensive error handling and recovery
 * - Payment confirmation flow
 * - Structured logging with correlation IDs
 * - Retry logic with exponential backoff
 * 
 * @module PayPalPayment
 * @generated-from: task-id:TASK-007 feature:donation_system
 * @modifies: donation-flow
 * @dependencies: ["paypal-sdk"]
 */

import { generateCorrelationId } from '../utils/logging.js';

/**
 * PayPal SDK configuration
 * @constant {Object}
 */
const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sandbox',
  currency: 'USD',
  intent: 'capture',
  sandboxMode: import.meta.env.MODE !== 'production',
  sdkUrl: 'https://www.paypal.com/sdk/js',
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 30000,
};

/**
 * Payment states for state machine
 * @enum {string}
 */
const PaymentState = Object.freeze({
  IDLE: 'idle',
  INITIALIZING: 'initializing',
  READY: 'ready',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

/**
 * Error types for structured error handling
 * @enum {string}
 */
const ErrorType = Object.freeze({
  SDK_LOAD_FAILED: 'SDK_LOAD_FAILED',
  INITIALIZATION_FAILED: 'INITIALIZATION_FAILED',
  PAYMENT_CREATION_FAILED: 'PAYMENT_CREATION_FAILED',
  PAYMENT_CAPTURE_FAILED: 'PAYMENT_CAPTURE_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
});

/**
 * PayPal Payment Component
 * Manages PayPal payment integration lifecycle
 */
class PayPalPayment {
  #state = PaymentState.IDLE;
  #paypalInstance = null;
  #correlationId = null;
  #retryCount = 0;
  #timeoutId = null;
  #abortController = null;

  /**
   * Initialize PayPal payment component
   * @param {Object} options - Configuration options
   * @param {string} options.containerId - DOM container ID for PayPal buttons
   * @param {Function} options.onSuccess - Success callback
   * @param {Function} options.onError - Error callback
   * @param {Function} options.onCancel - Cancel callback
   * @param {boolean} [options.enableRecurring=false] - Enable recurring payments
   */
  constructor(options) {
    this.#validateOptions(options);
    
    this.containerId = options.containerId;
    this.onSuccess = options.onSuccess;
    this.onError = options.onError;
    this.onCancel = options.onCancel;
    this.enableRecurring = options.enableRecurring || false;
    
    this.#correlationId = generateCorrelationId();
    this.#log('info', 'PayPal payment component initialized', {
      containerId: this.containerId,
      enableRecurring: this.enableRecurring,
      sandboxMode: PAYPAL_CONFIG.sandboxMode,
    });
  }

  /**
   * Validate constructor options
   * @private
   * @param {Object} options - Options to validate
   * @throws {TypeError} If validation fails
   */
  #validateOptions(options) {
    if (!options || typeof options !== 'object') {
      throw new TypeError('Options must be an object');
    }

    if (typeof options.containerId !== 'string' || !options.containerId) {
      throw new TypeError('containerId must be a non-empty string');
    }

    if (typeof options.onSuccess !== 'function') {
      throw new TypeError('onSuccess must be a function');
    }

    if (typeof options.onError !== 'function') {
      throw new TypeError('onError must be a function');
    }

    if (typeof options.onCancel !== 'function') {
      throw new TypeError('onCancel must be a function');
    }
  }

  /**
   * Initialize PayPal SDK and render buttons
   * @param {Object} paymentData - Payment configuration
   * @param {number} paymentData.amount - Payment amount
   * @param {string} [paymentData.description] - Payment description
   * @param {Object} [paymentData.metadata] - Additional metadata
   * @returns {Promise<void>}
   */
  async initialize(paymentData) {
    if (this.#state !== PaymentState.IDLE && this.#state !== PaymentState.FAILED) {
      this.#log('warn', 'Initialize called in invalid state', { state: this.#state });
      return;
    }

    this.#setState(PaymentState.INITIALIZING);
    this.#validatePaymentData(paymentData);

    try {
      await this.#loadPayPalSDK();
      await this.#renderPayPalButtons(paymentData);
      this.#setState(PaymentState.READY);
      this.#log('info', 'PayPal initialized successfully');
    } catch (error) {
      this.#setState(PaymentState.FAILED);
      this.#handleError(error, ErrorType.INITIALIZATION_FAILED);
      throw error;
    }
  }

  /**
   * Validate payment data
   * @private
   * @param {Object} paymentData - Payment data to validate
   * @throws {Error} If validation fails
   */
  #validatePaymentData(paymentData) {
    if (!paymentData || typeof paymentData !== 'object') {
      throw new Error('Payment data must be an object');
    }

    if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
      throw new Error('Amount must be a positive number');
    }

    if (paymentData.amount > 10000) {
      throw new Error('Amount exceeds maximum allowed value');
    }
  }

  /**
   * Load PayPal SDK with retry logic
   * @private
   * @returns {Promise<void>}
   */
  async #loadPayPalSDK() {
    if (window.paypal) {
      this.#log('info', 'PayPal SDK already loaded');
      return;
    }

    const sdkUrl = this.#buildSDKUrl();
    
    try {
      await this.#loadScriptWithRetry(sdkUrl);
      this.#log('info', 'PayPal SDK loaded successfully');
    } catch (error) {
      throw new Error('Failed to load PayPal SDK', { cause: error });
    }
  }

  /**
   * Build PayPal SDK URL with query parameters
   * @private
   * @returns {string} SDK URL
   */
  #buildSDKUrl() {
    const params = new URLSearchParams({
      'client-id': PAYPAL_CONFIG.clientId,
      currency: PAYPAL_CONFIG.currency,
      intent: PAYPAL_CONFIG.intent,
      'disable-funding': 'credit,card',
    });

    if (this.enableRecurring) {
      params.append('vault', 'true');
    }

    return `${PAYPAL_CONFIG.sdkUrl}?${params.toString()}`;
  }

  /**
   * Load script with exponential backoff retry
   * @private
   * @param {string} url - Script URL
   * @returns {Promise<void>}
   */
  async #loadScriptWithRetry(url) {
    for (let attempt = 0; attempt < PAYPAL_CONFIG.retryAttempts; attempt++) {
      try {
        await this.#loadScript(url);
        return;
      } catch (error) {
        this.#retryCount = attempt + 1;
        
        if (attempt === PAYPAL_CONFIG.retryAttempts - 1) {
          throw error;
        }

        const delay = PAYPAL_CONFIG.retryDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 1000;
        
        this.#log('warn', 'Script load failed, retrying', {
          attempt: attempt + 1,
          delay: delay + jitter,
          error: error.message,
        });

        await this.#sleep(delay + jitter);
      }
    }
  }

  /**
   * Load script element
   * @private
   * @param {string} url - Script URL
   * @returns {Promise<void>}
   */
  #loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      
      const timeoutId = setTimeout(() => {
        script.remove();
        reject(new Error('Script load timeout'));
      }, PAYPAL_CONFIG.timeout);

      script.onload = () => {
        clearTimeout(timeoutId);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        script.remove();
        reject(new Error('Script load error'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Render PayPal buttons
   * @private
   * @param {Object} paymentData - Payment configuration
   * @returns {Promise<void>}
   */
  async #renderPayPalButtons(paymentData) {
    const container = document.getElementById(this.containerId);
    
    if (!container) {
      throw new Error(`Container element not found: ${this.containerId}`);
    }

    container.innerHTML = '';

    try {
      this.#paypalInstance = await window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45,
        },
        createOrder: (data, actions) => this.#createOrder(data, actions, paymentData),
        onApprove: (data, actions) => this.#onApprove(data, actions),
        onCancel: (data) => this.#onCancelPayment(data),
        onError: (error) => this.#onPaymentError(error),
      }).render(`#${this.containerId}`);

      this.#log('info', 'PayPal buttons rendered');
    } catch (error) {
      throw new Error('Failed to render PayPal buttons', { cause: error });
    }
  }

  /**
   * Create PayPal order
   * @private
   * @param {Object} _data - PayPal data (unused)
   * @param {Object} actions - PayPal actions
   * @param {Object} paymentData - Payment configuration
   * @returns {Promise<string>} Order ID
   */
  async #createOrder(_data, actions, paymentData) {
    this.#setState(PaymentState.PROCESSING);
    this.#log('info', 'Creating PayPal order', { amount: paymentData.amount });

    try {
      const orderData = {
        purchase_units: [{
          amount: {
            currency_code: PAYPAL_CONFIG.currency,
            value: paymentData.amount.toFixed(2),
          },
          description: paymentData.description || 'Donation',
          custom_id: this.#correlationId,
        }],
        application_context: {
          brand_name: 'Makoko Community Kids NGO',
          shipping_preference: 'NO_SHIPPING',
        },
      };

      const orderId = await actions.order.create(orderData);
      
      this.#log('info', 'PayPal order created', { orderId });
      return orderId;
    } catch (error) {
      this.#handleError(error, ErrorType.PAYMENT_CREATION_FAILED);
      throw error;
    }
  }

  /**
   * Handle payment approval
   * @private
   * @param {Object} data - PayPal approval data
   * @param {Object} actions - PayPal actions
   * @returns {Promise<void>}
   */
  async #onApprove(data, actions) {
    this.#log('info', 'Payment approved, capturing', { orderId: data.orderID });

    try {
      const details = await actions.order.capture();
      
      this.#setState(PaymentState.COMPLETED);
      this.#log('info', 'Payment captured successfully', {
        orderId: data.orderID,
        payerId: data.payerID,
        status: details.status,
      });

      const paymentResult = {
        orderId: data.orderID,
        payerId: data.payerID,
        status: details.status,
        amount: details.purchase_units[0].amount.value,
        currency: details.purchase_units[0].amount.currency_code,
        payerEmail: details.payer.email_address,
        payerName: details.payer.name.given_name + ' ' + details.payer.name.surname,
        timestamp: new Date().toISOString(),
        correlationId: this.#correlationId,
      };

      this.onSuccess(paymentResult);
    } catch (error) {
      this.#handleError(error, ErrorType.PAYMENT_CAPTURE_FAILED);
    }
  }

  /**
   * Handle payment cancellation
   * @private
   * @param {Object} data - PayPal cancellation data
   */
  #onCancelPayment(data) {
    this.#setState(PaymentState.CANCELLED);
    this.#log('info', 'Payment cancelled by user', { orderId: data.orderID });
    
    this.onCancel({
      orderId: data.orderID,
      timestamp: new Date().toISOString(),
      correlationId: this.#correlationId,
    });
  }

  /**
   * Handle payment error
   * @private
   * @param {Error} error - Error object
   */
  #onPaymentError(error) {
    this.#handleError(error, ErrorType.NETWORK_ERROR);
  }

  /**
   * Handle errors with structured logging
   * @private
   * @param {Error} error - Error object
   * @param {string} errorType - Error type from ErrorType enum
   */
  #handleError(error, errorType) {
    this.#setState(PaymentState.FAILED);
    
    const errorDetails = {
      type: errorType,
      message: error.message,
      stack: error.stack,
      correlationId: this.#correlationId,
      timestamp: new Date().toISOString(),
      retryCount: this.#retryCount,
    };

    this.#log('error', 'Payment error occurred', errorDetails);
    
    this.onError({
      ...errorDetails,
      userMessage: this.#getUserFriendlyMessage(errorType),
      recoverable: this.#isRecoverable(errorType),
    });
  }

  /**
   * Get user-friendly error message
   * @private
   * @param {string} errorType - Error type
   * @returns {string} User-friendly message
   */
  #getUserFriendlyMessage(errorType) {
    const messages = {
      [ErrorType.SDK_LOAD_FAILED]: 'Unable to load payment system. Please check your internet connection and try again.',
      [ErrorType.INITIALIZATION_FAILED]: 'Payment system initialization failed. Please refresh the page and try again.',
      [ErrorType.PAYMENT_CREATION_FAILED]: 'Unable to create payment. Please try again.',
      [ErrorType.PAYMENT_CAPTURE_FAILED]: 'Payment processing failed. Your account has not been charged. Please try again.',
      [ErrorType.VALIDATION_FAILED]: 'Invalid payment information. Please check your details and try again.',
      [ErrorType.TIMEOUT]: 'Payment request timed out. Please try again.',
      [ErrorType.NETWORK_ERROR]: 'Network error occurred. Please check your connection and try again.',
    };

    return messages[errorType] || 'An unexpected error occurred. Please try again.';
  }

  /**
   * Check if error is recoverable
   * @private
   * @param {string} errorType - Error type
   * @returns {boolean} True if recoverable
   */
  #isRecoverable(errorType) {
    const recoverableErrors = [
      ErrorType.NETWORK_ERROR,
      ErrorType.TIMEOUT,
      ErrorType.SDK_LOAD_FAILED,
    ];

    return recoverableErrors.includes(errorType);
  }

  /**
   * Set component state
   * @private
   * @param {string} newState - New state
   */
  #setState(newState) {
    const oldState = this.#state;
    this.#state = newState;
    
    this.#log('debug', 'State transition', {
      from: oldState,
      to: newState,
    });
  }

  /**
   * Get current state
   * @returns {string} Current state
   */
  getState() {
    return this.#state;
  }

  /**
   * Structured logging
   * @private
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} [context] - Additional context
   */
  #log(level, message, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      component: 'PayPalPayment',
      correlationId: this.#correlationId,
      message,
      ...context,
    };

    if (level === 'error') {
      console.error('[PayPalPayment]', message, logEntry);
    } else if (level === 'warn') {
      console.warn('[PayPalPayment]', message, logEntry);
    } else if (PAYPAL_CONFIG.sandboxMode) {
      console.log('[PayPalPayment]', message, logEntry);
    }
  }

  /**
   * Sleep utility
   * @private
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise<void>}
   */
  #sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Cleanup resources
   */
  destroy() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }

    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }

    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '';
    }

    this.#paypalInstance = null;
    this.#setState(PaymentState.IDLE);
    
    this.#log('info', 'PayPal payment component destroyed');
  }
}

/**
 * Create PayPal payment instance
 * @param {Object} options - Configuration options
 * @returns {PayPalPayment} PayPal payment instance
 */
export function createPayPalPayment(options) {
  return new PayPalPayment(options);
}

export { PaymentState, ErrorType };
export default PayPalPayment;