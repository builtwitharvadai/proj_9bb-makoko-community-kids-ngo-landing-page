/**
 * Form Submission Utilities for Volunteer Applications
 * 
 * Provides comprehensive form submission handling with Formspree integration,
 * error handling, loading states, success confirmation, spam protection,
 * and data validation for volunteer application forms.
 * 
 * @module formSubmission
 * @version 1.0.0
 */

/**
 * Submission result type
 * @typedef {Object} SubmissionResult
 * @property {boolean} success - Whether the submission was successful
 * @property {string} [message] - Success or error message
 * @property {Object} [data] - Response data from server
 * @property {string} [error] - Error details if submission failed
 * @property {string} [code] - Error code for structured error handling
 */

/**
 * Submission options configuration
 * @typedef {Object} SubmissionOptions
 * @property {string} endpoint - Form submission endpoint URL
 * @property {number} [timeout=30000] - Request timeout in milliseconds
 * @property {boolean} [validateBeforeSubmit=true] - Validate form before submission
 * @property {Function} [onProgress] - Progress callback function
 * @property {Function} [onSuccess] - Success callback function
 * @property {Function} [onError] - Error callback function
 * @property {Object} [headers] - Additional headers to send
 * @property {boolean} [enableSpamProtection=true] - Enable honeypot spam protection
 */

/**
 * Form state management
 * @typedef {Object} FormState
 * @property {boolean} isSubmitting - Whether form is currently submitting
 * @property {boolean} isSuccess - Whether submission was successful
 * @property {boolean} isError - Whether submission encountered an error
 * @property {string} [message] - Current status message
 * @property {number} [submitCount] - Number of submission attempts
 * @property {Date} [lastSubmitTime] - Timestamp of last submission
 */

/**
 * Submission error codes for structured error handling
 */
const SubmissionErrorCodes = Object.freeze({
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  SPAM_DETECTED: 'SPAM_DETECTED',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
});

/**
 * Default Formspree endpoint (should be configured per environment)
 */
const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  maxSubmissions: 3,
  windowMs: 60000, // 1 minute
};

/**
 * Form state storage using WeakMap for memory efficiency
 */
const formStates = new WeakMap();

/**
 * Submission history for rate limiting
 */
const submissionHistory = new Map();

/**
 * Get or initialize form state
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @returns {FormState} Form state object
 */
function getFormState(formElement) {
  if (!formStates.has(formElement)) {
    formStates.set(formElement, {
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      message: null,
      submitCount: 0,
      lastSubmitTime: null,
    });
  }
  return formStates.get(formElement);
}

/**
 * Update form state
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @param {Partial<FormState>} updates - State updates
 */
function updateFormState(formElement, updates) {
  const state = getFormState(formElement);
  Object.assign(state, updates);
  formStates.set(formElement, state);
}

/**
 * Check rate limiting for form submissions
 * 
 * @param {string} identifier - Unique identifier (e.g., email or IP)
 * @returns {Object} Rate limit check result
 */
function checkRateLimit(identifier) {
  const now = Date.now();
  const history = submissionHistory.get(identifier) || [];
  
  // Clean up old submissions outside the window
  const recentSubmissions = history.filter(
    timestamp => now - timestamp < RATE_LIMIT_CONFIG.windowMs
  );
  
  if (recentSubmissions.length >= RATE_LIMIT_CONFIG.maxSubmissions) {
    const oldestSubmission = Math.min(...recentSubmissions);
    const waitTime = RATE_LIMIT_CONFIG.windowMs - (now - oldestSubmission);
    
    return {
      allowed: false,
      waitTime: Math.ceil(waitTime / 1000), // Convert to seconds
      message: `Too many submissions. Please wait ${Math.ceil(waitTime / 1000)} seconds before trying again.`,
    };
  }
  
  // Update history
  recentSubmissions.push(now);
  submissionHistory.set(identifier, recentSubmissions);
  
  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxSubmissions - recentSubmissions.length,
  };
}

/**
 * Add honeypot field for spam protection
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @returns {HTMLInputElement} Honeypot field
 */
function addHoneypotField(formElement) {
  // Check if honeypot already exists
  let honeypot = formElement.querySelector('input[name="_gotcha"]');
  
  if (!honeypot) {
    honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = '_gotcha';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    
    formElement.appendChild(honeypot);
  }
  
  return honeypot;
}

/**
 * Check for spam indicators
 * 
 * @param {FormData} formData - Form data to check
 * @param {HTMLFormElement} formElement - Form element
 * @returns {Object} Spam check result
 */
function checkSpamIndicators(formData, formElement) {
  // Check honeypot
  const honeypotValue = formData.get('_gotcha');
  if (honeypotValue && honeypotValue.trim() !== '') {
    return {
      isSpam: true,
      reason: 'Honeypot field filled',
    };
  }
  
  // Check submission timing (too fast indicates bot)
  const state = getFormState(formElement);
  const formLoadTime = formElement.dataset.loadTime 
    ? parseInt(formElement.dataset.loadTime, 10) 
    : Date.now();
  const timeSinceLoad = Date.now() - formLoadTime;
  
  if (timeSinceLoad < 3000) { // Less than 3 seconds
    return {
      isSpam: true,
      reason: 'Submission too fast',
    };
  }
  
  // Check for suspicious patterns in text fields
  const textFields = Array.from(formData.entries())
    .filter(([key, _value]) => !key.startsWith('_'))
    .map(([_key, value]) => String(value));
  
  const suspiciousPatterns = [
    /https?:\/\//gi, // Multiple URLs
    /\b(viagra|cialis|casino|poker)\b/gi, // Spam keywords
  ];
  
  for (const text of textFields) {
    for (const pattern of suspiciousPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 2) {
        return {
          isSpam: true,
          reason: 'Suspicious content detected',
        };
      }
    }
  }
  
  return {
    isSpam: false,
  };
}

/**
 * Set form loading state
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @param {boolean} isLoading - Loading state
 */
function setFormLoadingState(formElement, isLoading) {
  const submitButton = formElement.querySelector('button[type="submit"]');
  const inputs = formElement.querySelectorAll('input, textarea, select');
  
  if (isLoading) {
    formElement.classList.add('form-submitting');
    formElement.setAttribute('aria-busy', 'true');
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      `;
    }
    
    inputs.forEach(input => {
      input.disabled = true;
    });
  } else {
    formElement.classList.remove('form-submitting');
    formElement.removeAttribute('aria-busy');
    
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || 'Submit';
      delete submitButton.dataset.originalText;
    }
    
    inputs.forEach(input => {
      input.disabled = false;
    });
  }
}

/**
 * Display submission message
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function displaySubmissionMessage(formElement, message, type = 'success') {
  // Remove existing message
  const existingMessage = formElement.querySelector('.submission-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `submission-message ${type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border rounded-lg p-4 mb-4`;
  messageElement.setAttribute('role', type === 'success' ? 'status' : 'alert');
  messageElement.setAttribute('aria-live', 'polite');
  
  const icon = type === 'success' 
    ? '<svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
    : '<svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>';
  
  messageElement.innerHTML = `${icon}<span>${message}</span>`;
  
  // Insert at top of form
  formElement.insertBefore(messageElement, formElement.firstChild);
  
  // Scroll to message
  messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Auto-remove success messages after 10 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 10000);
  }
}

/**
 * Submit form data to endpoint
 * 
 * @param {string} endpoint - Submission endpoint URL
 * @param {FormData} formData - Form data to submit
 * @param {SubmissionOptions} options - Submission options
 * @returns {Promise<SubmissionResult>} Submission result
 */
async function submitFormData(endpoint, formData, options = {}) {
  const {
    timeout = 30000,
    headers = {},
    onProgress,
  } = options;
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // Report progress
    if (onProgress && typeof onProgress === 'function') {
      onProgress({ stage: 'sending', progress: 0 });
    }
    
    // Make request
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        ...headers,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Report progress
    if (onProgress && typeof onProgress === 'function') {
      onProgress({ stage: 'processing', progress: 50 });
    }
    
    // Parse response
    let responseData;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = { message: await response.text() };
    }
    
    // Report progress
    if (onProgress && typeof onProgress === 'function') {
      onProgress({ stage: 'complete', progress: 100 });
    }
    
    // Check response status
    if (!response.ok) {
      return {
        success: false,
        message: responseData.error || responseData.message || 'Submission failed',
        error: responseData.error || 'Server returned error status',
        code: response.status === 429 
          ? SubmissionErrorCodes.RATE_LIMIT_ERROR 
          : SubmissionErrorCodes.SERVER_ERROR,
        data: responseData,
      };
    }
    
    return {
      success: true,
      message: responseData.message || 'Form submitted successfully',
      data: responseData,
    };
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle different error types
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Request timed out. Please try again.',
        error: 'Request timeout',
        code: SubmissionErrorCodes.TIMEOUT_ERROR,
      };
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        error: error.message,
        code: SubmissionErrorCodes.NETWORK_ERROR,
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: error.message,
      code: SubmissionErrorCodes.UNKNOWN_ERROR,
    };
  }
}

/**
 * Handle form submission
 * 
 * @param {HTMLFormElement} formElement - Form element to submit
 * @param {SubmissionOptions} options - Submission options
 * @returns {Promise<SubmissionResult>} Submission result
 */
export async function handleFormSubmission(formElement, options = {}) {
  const {
    endpoint = DEFAULT_FORMSPREE_ENDPOINT,
    validateBeforeSubmit = true,
    onProgress,
    onSuccess,
    onError,
    enableSpamProtection = true,
  } = options;
  
  // Get form state
  const state = getFormState(formElement);
  
  // Prevent double submission
  if (state.isSubmitting) {
    return {
      success: false,
      message: 'Form is already being submitted',
      code: SubmissionErrorCodes.VALIDATION_FAILED,
    };
  }
  
  try {
    // Update state
    updateFormState(formElement, {
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: null,
    });
    
    // Set loading state
    setFormLoadingState(formElement, true);
    
    // Get form data
    const formData = new FormData(formElement);
    
    // Add honeypot if spam protection enabled
    if (enableSpamProtection) {
      addHoneypotField(formElement);
    }
    
    // Check for spam
    if (enableSpamProtection) {
      const spamCheck = checkSpamIndicators(formData, formElement);
      if (spamCheck.isSpam) {
        // Silently reject spam (don't inform the spammer)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
          success: false,
          message: 'Submission failed. Please try again.',
          error: spamCheck.reason,
          code: SubmissionErrorCodes.SPAM_DETECTED,
        };
      }
    }
    
    // Rate limiting check
    const email = formData.get('email') || 'anonymous';
    const rateLimitCheck = checkRateLimit(email);
    
    if (!rateLimitCheck.allowed) {
      const result = {
        success: false,
        message: rateLimitCheck.message,
        code: SubmissionErrorCodes.RATE_LIMIT_ERROR,
      };
      
      displaySubmissionMessage(formElement, result.message, 'error');
      
      if (onError && typeof onError === 'function') {
        onError(result);
      }
      
      return result;
    }
    
    // Validate form if required
    if (validateBeforeSubmit) {
      // Import validation utilities dynamically to avoid circular dependencies
      const { validateForm, displayFormErrors } = await import('./formValidation.js');
      
      // Define validation rules for volunteer form
      const validationRules = {
        name: {
          required: true,
          minLength: 2,
          maxLength: 100,
        },
        email: {
          required: true,
          type: 'email',
        },
        phone: {
          required: true,
          type: 'phone',
        },
        role: {
          required: true,
        },
        availability: {
          required: true,
        },
        skills: {
          required: false,
          maxLength: 500,
        },
        experience: {
          required: false,
          maxLength: 1000,
        },
        motivation: {
          required: true,
          minLength: 50,
          maxLength: 1000,
        },
      };
      
      // Convert FormData to object for validation
      const formDataObject = {};
      for (const [key, value] of formData.entries()) {
        if (!key.startsWith('_')) {
          formDataObject[key] = value;
        }
      }
      
      const validationResult = validateForm(formDataObject, validationRules);
      
      if (!validationResult.isValid) {
        displayFormErrors(formElement, validationResult.errors);
        
        const result = {
          success: false,
          message: 'Please correct the errors in the form',
          error: 'Validation failed',
          code: SubmissionErrorCodes.VALIDATION_FAILED,
        };
        
        if (onError && typeof onError === 'function') {
          onError(result);
        }
        
        return result;
      }
    }
    
    // Submit form
    const result = await submitFormData(endpoint, formData, {
      ...options,
      onProgress,
    });
    
    // Update state
    updateFormState(formElement, {
      isSubmitting: false,
      isSuccess: result.success,
      isError: !result.success,
      message: result.message,
      submitCount: state.submitCount + 1,
      lastSubmitTime: new Date(),
    });
    
    // Display message
    displaySubmissionMessage(
      formElement,
      result.message,
      result.success ? 'success' : 'error'
    );
    
    // Call callbacks
    if (result.success) {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      
      // Reset form on success
      formElement.reset();
      
      // Dispatch success event
      const successEvent = new CustomEvent('volunteer:application-submitted', {
        detail: {
          formData: Object.fromEntries(formData.entries()),
          result,
        },
        bubbles: true,
      });
      formElement.dispatchEvent(successEvent);
    } else {
      if (onError && typeof onError === 'function') {
        onError(result);
      }
      
      // Dispatch error event
      const errorEvent = new CustomEvent('volunteer:application-error', {
        detail: {
          error: result.error,
          code: result.code,
          result,
        },
        bubbles: true,
      });
      formElement.dispatchEvent(errorEvent);
    }
    
    return result;
    
  } catch (error) {
    // Update state
    updateFormState(formElement, {
      isSubmitting: false,
      isSuccess: false,
      isError: true,
      message: 'An unexpected error occurred',
    });
    
    const result = {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: error.message,
      code: SubmissionErrorCodes.UNKNOWN_ERROR,
    };
    
    displaySubmissionMessage(formElement, result.message, 'error');
    
    if (onError && typeof onError === 'function') {
      onError(result);
    }
    
    return result;
    
  } finally {
    // Always clear loading state
    setFormLoadingState(formElement, false);
  }
}

/**
 * Initialize form submission handler
 * 
 * @param {string|HTMLFormElement} formSelector - Form selector or element
 * @param {SubmissionOptions} options - Submission options
 * @returns {Function} Cleanup function
 */
export function initializeFormSubmission(formSelector, options = {}) {
  const formElement = typeof formSelector === 'string'
    ? document.querySelector(formSelector)
    : formSelector;
  
  if (!formElement || !(formElement instanceof HTMLFormElement)) {
    console.error('[Form Submission] Invalid form element:', formSelector);
    return () => {};
  }
  
  // Store form load time for spam detection
  formElement.dataset.loadTime = Date.now().toString();
  
  // Add honeypot if spam protection enabled
  if (options.enableSpamProtection !== false) {
    addHoneypotField(formElement);
  }
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleFormSubmission(formElement, options);
  };
  
  formElement.addEventListener('submit', handleSubmit);
  
  // Return cleanup function
  return () => {
    formElement.removeEventListener('submit', handleSubmit);
    formStates.delete(formElement);
  };
}

/**
 * Get form submission state
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @returns {FormState} Current form state
 */
export function getSubmissionState(formElement) {
  return { ...getFormState(formElement) };
}

/**
 * Reset form submission state
 * 
 * @param {HTMLFormElement} formElement - Form element
 */
export function resetSubmissionState(formElement) {
  updateFormState(formElement, {
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: null,
    submitCount: 0,
    lastSubmitTime: null,
  });
  
  // Clear any displayed messages
  const message = formElement.querySelector('.submission-message');
  if (message) {
    message.remove();
  }
}

/**
 * Clear submission history (for testing or admin purposes)
 */
export function clearSubmissionHistory() {
  submissionHistory.clear();
}

/**
 * Export error codes for external use
 */
export { SubmissionErrorCodes };

/**
 * Default export with all submission functions
 */
export default {
  handleFormSubmission,
  initializeFormSubmission,
  getSubmissionState,
  resetSubmissionState,
  clearSubmissionHistory,
  SubmissionErrorCodes,
};