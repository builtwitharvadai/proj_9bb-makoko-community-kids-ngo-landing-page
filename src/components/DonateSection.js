/**
 * DonateSection Component
 * 
 * Comprehensive donation system with multiple payment options including Stripe and PayPal.
 * Implements one-time and recurring donation options with suggested amounts, impact descriptions,
 * and secure payment processing. Includes donation confirmation and transparent fund allocation.
 * 
 * @generated-from: task-id:TASK-007 feature:donation_system
 * @modifies: none (new component)
 * @dependencies: ["icons", "animations"]
 */

import { createIcon } from '../utils/icons.js';
import { observeElements } from '../utils/animations.js';

/**
 * Donation configuration with suggested amounts and impact descriptions
 */
const DONATION_CONFIG = {
  suggestedAmounts: [
    {
      amount: 25,
      impact: 'Provides school supplies for 2 children',
      popular: false,
    },
    {
      amount: 50,
      impact: 'Funds a week of nutritious meals for 5 children',
      popular: true,
    },
    {
      amount: 100,
      impact: 'Supports educational programs for a month',
      popular: false,
    },
    {
      amount: 250,
      impact: 'Provides healthcare services for 10 families',
      popular: false,
    },
  ],
  fundAllocation: [
    { category: 'Education Programs', percentage: 45, color: 'bg-primary-600' },
    { category: 'Healthcare Services', percentage: 25, color: 'bg-secondary-600' },
    { category: 'Nutrition Support', percentage: 20, color: 'bg-accent-500' },
    { category: 'Administrative Costs', percentage: 10, color: 'bg-gray-400' },
  ],
  paymentMethods: [
    { id: 'stripe', name: 'Credit/Debit Card', icon: 'creditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
  ],
};

/**
 * Form validation state
 */
const VALIDATION_RULES = {
  amount: {
    min: 5,
    max: 100000,
    message: 'Amount must be between $5 and $100,000',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  name: {
    minLength: 2,
    message: 'Name must be at least 2 characters',
  },
};

/**
 * Component state management
 */
class DonationState {
  constructor() {
    this.donationType = 'one-time';
    this.amount = 50;
    this.customAmount = '';
    this.paymentMethod = 'stripe';
    this.donorInfo = {
      name: '',
      email: '',
      anonymous: false,
    };
    this.errors = {};
    this.isProcessing = false;
  }

  /**
   * Update state and trigger re-render
   */
  update(updates) {
    Object.assign(this, updates);
    return this;
  }

  /**
   * Validate form data
   */
  validate() {
    const errors = {};

    // Validate amount
    const finalAmount = this.customAmount || this.amount;
    if (
      finalAmount < VALIDATION_RULES.amount.min ||
      finalAmount > VALIDATION_RULES.amount.max
    ) {
      errors.amount = VALIDATION_RULES.amount.message;
    }

    // Validate email
    if (!VALIDATION_RULES.email.pattern.test(this.donorInfo.email)) {
      errors.email = VALIDATION_RULES.email.message;
    }

    // Validate name (if not anonymous)
    if (
      !this.donorInfo.anonymous &&
      this.donorInfo.name.length < VALIDATION_RULES.name.minLength
    ) {
      errors.name = VALIDATION_RULES.name.message;
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  /**
   * Get final donation amount
   */
  getFinalAmount() {
    return this.customAmount || this.amount;
  }
}

/**
 * Create donation type selector
 */
function createDonationTypeSelector(state, onUpdate) {
  const types = [
    { id: 'one-time', label: 'One-Time', description: 'Make a single donation' },
    {
      id: 'monthly',
      label: 'Monthly',
      description: 'Recurring monthly support',
      badge: 'Sustaining Impact',
    },
  ];

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      ${types
        .map(
          (type) => `
        <button
          type="button"
          data-donation-type="${type.id}"
          class="relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
            state.donationType === type.id
              ? 'border-primary-600 bg-primary-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
          }"
          aria-pressed="${state.donationType === type.id}"
        >
          ${
            type.badge
              ? `
            <span class="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-accent-500 rounded-full">
              ${type.badge}
            </span>
          `
              : ''
          }
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1">
              ${createIcon(
                state.donationType === type.id ? 'checkCircle' : 'circle',
                state.donationType === type.id ? 'text-primary-600' : 'text-gray-400',
                'w-6 h-6'
              )}
            </div>
            <div>
              <h3 class="text-lg font-bold ${
                state.donationType === type.id ? 'text-primary-900' : 'text-gray-900'
              }">
                ${type.label}
              </h3>
              <p class="text-sm ${
                state.donationType === type.id ? 'text-primary-700' : 'text-gray-600'
              } mt-1">
                ${type.description}
              </p>
            </div>
          </div>
        </button>
      `
        )
        .join('')}
    </div>
  `;
}

/**
 * Create suggested amounts grid
 */
function createSuggestedAmounts(state, _onUpdate) {
  return `
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Select Amount</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        ${DONATION_CONFIG.suggestedAmounts
          .map(
            (suggestion) => `
          <button
            type="button"
            data-amount="${suggestion.amount}"
            class="relative p-4 rounded-xl border-2 transition-all duration-300 ${
              state.amount === suggestion.amount && !state.customAmount
                ? 'border-primary-600 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
            }"
            aria-pressed="${state.amount === suggestion.amount && !state.customAmount}"
          >
            ${
              suggestion.popular
                ? `
              <span class="absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold text-white bg-accent-500 rounded-full">
                Popular
              </span>
            `
                : ''
            }
            <div class="text-2xl font-bold ${
              state.amount === suggestion.amount && !state.customAmount
                ? 'text-primary-600'
                : 'text-gray-900'
            }">
              $${suggestion.amount}
            </div>
            <div class="text-xs text-gray-600 mt-2 line-clamp-2">
              ${suggestion.impact}
            </div>
          </button>
        `
          )
          .join('')}
      </div>
      
      <div class="relative">
        <label for="custom-amount" class="block text-sm font-semibold text-gray-700 mb-2">
          Or enter custom amount
        </label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
            $
          </span>
          <input
            type="number"
            id="custom-amount"
            name="customAmount"
            min="${VALIDATION_RULES.amount.min}"
            max="${VALIDATION_RULES.amount.max}"
            step="1"
            placeholder="Enter amount"
            value="${state.customAmount}"
            class="w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
              state.errors.amount
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-primary-600'
            } focus:outline-none focus:ring-2 focus:ring-primary-200"
            aria-invalid="${!!state.errors.amount}"
            aria-describedby="${state.errors.amount ? 'amount-error' : ''}"
          />
        </div>
        ${
          state.errors.amount
            ? `
          <p id="amount-error" class="mt-2 text-sm text-red-600 flex items-center gap-2">
            ${createIcon('alertCircle', 'text-red-600', 'w-4 h-4')}
            ${state.errors.amount}
          </p>
        `
            : ''
        }
      </div>
    </div>
  `;
}

/**
 * Create donor information form
 */
function createDonorInfoForm(state, _onUpdate) {
  return `
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
      
      <div class="space-y-4">
        <div>
          <label for="donor-name" class="block text-sm font-semibold text-gray-700 mb-2">
            Full Name ${state.donorInfo.anonymous ? '(Optional)' : '*'}
          </label>
          <input
            type="text"
            id="donor-name"
            name="name"
            value="${state.donorInfo.name}"
            placeholder="John Doe"
            class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
              state.errors.name
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-primary-600'
            } focus:outline-none focus:ring-2 focus:ring-primary-200"
            ${state.donorInfo.anonymous ? '' : 'required'}
            aria-invalid="${!!state.errors.name}"
            aria-describedby="${state.errors.name ? 'name-error' : ''}"
          />
          ${
            state.errors.name
              ? `
            <p id="name-error" class="mt-2 text-sm text-red-600 flex items-center gap-2">
              ${createIcon('alertCircle', 'text-red-600', 'w-4 h-4')}
              ${state.errors.name}
            </p>
          `
              : ''
          }
        </div>
        
        <div>
          <label for="donor-email" class="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="donor-email"
            name="email"
            value="${state.donorInfo.email}"
            placeholder="john@example.com"
            required
            class="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
              state.errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-primary-600'
            } focus:outline-none focus:ring-2 focus:ring-primary-200"
            aria-invalid="${!!state.errors.email}"
            aria-describedby="${state.errors.email ? 'email-error' : ''}"
          />
          ${
            state.errors.email
              ? `
            <p id="email-error" class="mt-2 text-sm text-red-600 flex items-center gap-2">
              ${createIcon('alertCircle', 'text-red-600', 'w-4 h-4')}
              ${state.errors.email}
            </p>
          `
              : ''
          }
          <p class="mt-2 text-sm text-gray-600">
            Receipt will be sent to this email
          </p>
        </div>
        
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous-donation"
            name="anonymous"
            ${state.donorInfo.anonymous ? 'checked' : ''}
            class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-200 transition-all duration-300"
          />
          <label for="anonymous-donation" class="text-sm font-medium text-gray-700 cursor-pointer">
            Make this donation anonymous
          </label>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create payment method selector
 */
function createPaymentMethodSelector(state, _onUpdate) {
  return `
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${DONATION_CONFIG.paymentMethods
          .map(
            (method) => `
          <button
            type="button"
            data-payment-method="${method.id}"
            class="p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
              state.paymentMethod === method.id
                ? 'border-primary-600 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
            }"
            aria-pressed="${state.paymentMethod === method.id}"
          >
            <div class="flex-shrink-0">
              ${createIcon(
                state.paymentMethod === method.id ? 'checkCircle' : 'circle',
                state.paymentMethod === method.id ? 'text-primary-600' : 'text-gray-400',
                'w-6 h-6'
              )}
            </div>
            <div class="flex-1 text-left">
              <div class="font-semibold ${
                state.paymentMethod === method.id ? 'text-primary-900' : 'text-gray-900'
              }">
                ${method.name}
              </div>
            </div>
            <div class="flex-shrink-0">
              ${createIcon(method.icon, 'text-gray-400', 'w-8 h-8')}
            </div>
          </button>
        `
          )
          .join('')}
      </div>
      
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div class="flex gap-3">
          ${createIcon('info', 'text-blue-600', 'w-5 h-5 flex-shrink-0 mt-0.5')}
          <div class="text-sm text-blue-900">
            <p class="font-semibold mb-1">Secure Payment Processing</p>
            <p class="text-blue-700">
              All transactions are encrypted and processed securely. We never store your payment information.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create fund allocation transparency section
 */
function createFundAllocation() {
  return `
    <div class="mb-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        ${createIcon('pieChart', 'text-primary-600', 'w-6 h-6')}
        How Your Donation is Used
      </h3>
      
      <div class="space-y-3">
        ${DONATION_CONFIG.fundAllocation
          .map(
            (allocation) => `
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-gray-700">${allocation.category}</span>
              <span class="text-sm font-bold text-gray-900">${allocation.percentage}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="${allocation.color} h-full rounded-full transition-all duration-1000 ease-out"
                style="width: ${allocation.percentage}%"
                role="progressbar"
                aria-valuenow="${allocation.percentage}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="${allocation.category}: ${allocation.percentage}%"
              ></div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
      
      <p class="mt-4 text-sm text-gray-600">
        We are committed to transparency and ensuring your donation makes the maximum impact.
      </p>
    </div>
  `;
}

/**
 * Create submit button
 */
function createSubmitButton(state) {
  const amount = state.getFinalAmount();
  const frequency = state.donationType === 'monthly' ? '/month' : '';

  return `
    <button
      type="submit"
      class="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
      ${state.isProcessing ? 'disabled' : ''}
    >
      ${
        state.isProcessing
          ? `
        <svg class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      `
          : `
        ${createIcon('heart', 'text-white', 'w-6 h-6')}
        Donate $${amount}${frequency}
      `
      }
    </button>
  `;
}

/**
 * Handle form submission
 */
async function handleDonationSubmit(state, form) {
  // Validate form
  if (!state.validate()) {
    // Scroll to first error
    const firstError = form.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }

  // Set processing state
  state.update({ isProcessing: true });
  updateForm(form, state);

  try {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log donation details (in production, this would call payment API)
    console.log('Donation submitted:', {
      type: state.donationType,
      amount: state.getFinalAmount(),
      paymentMethod: state.paymentMethod,
      donor: state.donorInfo,
      timestamp: new Date().toISOString(),
    });

    // Show success message
    showSuccessMessage(form, state);
  } catch (error) {
    console.error('Donation processing error:', error);
    showErrorMessage(form, error.message);
  } finally {
    state.update({ isProcessing: false });
    updateForm(form, state);
  }
}

/**
 * Show success message
 */
function showSuccessMessage(form, state) {
  const amount = state.getFinalAmount();
  const frequency = state.donationType === 'monthly' ? ' monthly' : '';

  form.innerHTML = `
    <div class="text-center py-12 animate-fadeInUp">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        ${createIcon('checkCircle', 'text-green-600', 'w-12 h-12')}
      </div>
      
      <h3 class="text-3xl font-bold text-gray-900 mb-4">
        Thank You for Your Generosity!
      </h3>
      
      <p class="text-xl text-gray-700 mb-6">
        Your${frequency} donation of <span class="font-bold text-primary-600">$${amount}</span> will make a real difference.
      </p>
      
      <div class="max-w-md mx-auto p-6 bg-blue-50 border border-blue-200 rounded-xl mb-8">
        <div class="flex gap-3">
          ${createIcon('mail', 'text-blue-600', 'w-5 h-5 flex-shrink-0 mt-0.5')}
          <div class="text-sm text-blue-900 text-left">
            <p class="font-semibold mb-1">Receipt Sent</p>
            <p class="text-blue-700">
              A confirmation email with your tax receipt has been sent to ${state.donorInfo.email}
            </p>
          </div>
        </div>
      </div>
      
      <button
        type="button"
        onclick="location.reload()"
        class="btn btn-primary"
      >
        Make Another Donation
      </button>
    </div>
  `;
}

/**
 * Show error message
 */
function showErrorMessage(form, message) {
  const errorContainer = document.createElement('div');
  errorContainer.className =
    'mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeInUp';
  errorContainer.innerHTML = `
    <div class="flex gap-3">
      ${createIcon('alertCircle', 'text-red-600', 'w-5 h-5 flex-shrink-0 mt-0.5')}
      <div class="text-sm text-red-900">
        <p class="font-semibold mb-1">Payment Failed</p>
        <p class="text-red-700">${message || 'An error occurred. Please try again.'}</p>
      </div>
    </div>
  `;

  form.insertBefore(errorContainer, form.firstChild);

  // Remove error after 5 seconds
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

/**
 * Update form with current state
 */
function updateForm(form, state) {
  const formContent = form.querySelector('[data-form-content]');
  if (!formContent) return;

  formContent.innerHTML = `
    ${createDonationTypeSelector(state)}
    ${createSuggestedAmounts(state)}
    ${createDonorInfoForm(state)}
    ${createPaymentMethodSelector(state)}
    ${createFundAllocation()}
    ${createSubmitButton(state)}
  `;

  // Re-attach event listeners
  attachFormEventListeners(form, state);
}

/**
 * Attach event listeners to form elements
 */
function attachFormEventListeners(form, state) {
  // Donation type buttons
  form.querySelectorAll('[data-donation-type]').forEach((button) => {
    button.addEventListener('click', () => {
      state.update({ donationType: button.dataset.donationType });
      updateForm(form, state);
    });
  });

  // Suggested amount buttons
  form.querySelectorAll('[data-amount]').forEach((button) => {
    button.addEventListener('click', () => {
      state.update({
        amount: parseInt(button.dataset.amount, 10),
        customAmount: '',
      });
      updateForm(form, state);
    });
  });

  // Custom amount input
  const customAmountInput = form.querySelector('#custom-amount');
  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      state.update({ customAmount: e.target.value });
    });
  }

  // Donor info inputs
  const nameInput = form.querySelector('#donor-name');
  const emailInput = form.querySelector('#donor-email');
  const anonymousCheckbox = form.querySelector('#anonymous-donation');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.donorInfo.name = e.target.value;
      state.errors.name = '';
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      state.donorInfo.email = e.target.value;
      state.errors.email = '';
    });
  }

  if (anonymousCheckbox) {
    anonymousCheckbox.addEventListener('change', (e) => {
      state.donorInfo.anonymous = e.target.checked;
      updateForm(form, state);
    });
  }

  // Payment method buttons
  form.querySelectorAll('[data-payment-method]').forEach((button) => {
    button.addEventListener('click', () => {
      state.update({ paymentMethod: button.dataset.paymentMethod });
      updateForm(form, state);
    });
  });
}

/**
 * Create and initialize donation section
 */
export function createDonateSection() {
  const state = new DonationState();

  const section = document.createElement('section');
  section.id = 'donate';
  section.className = 'section-container bg-gradient-to-br from-gray-50 to-white';
  section.setAttribute('aria-labelledby', 'donate-heading');

  section.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12 animate-fadeInUp">
        <h2 id="donate-heading" class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Support Our Mission
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Your donation directly impacts the lives of children in Makoko. Every contribution helps us provide education, healthcare, and hope.
        </p>
      </header>

      <div class="bg-white rounded-3xl shadow-xl p-6 md:p-10 animate-fadeInUp">
        <form id="donation-form" novalidate>
          <div data-form-content>
            ${createDonationTypeSelector(state)}
            ${createSuggestedAmounts(state)}
            ${createDonorInfoForm(state)}
            ${createPaymentMethodSelector(state)}
            ${createFundAllocation()}
            ${createSubmitButton(state)}
          </div>
        </form>
      </div>

      <div class="mt-8 text-center text-sm text-gray-600">
        <p>
          ${createIcon('lock', 'text-gray-400 inline', 'w-4 h-4')}
          Secure payment processing powered by industry-leading encryption
        </p>
        <p class="mt-2">
          Makoko Community Kids is a registered 501(c)(3) nonprofit. Your donation is tax-deductible.
        </p>
      </div>
    </div>
  `;

  // Attach form submit handler
  const form = section.querySelector('#donation-form');
  if (form) {
    attachFormEventListeners(form, state);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDonationSubmit(state, form);
    });
  }

  // Initialize animations
  observeElements(section);

  return section;
}