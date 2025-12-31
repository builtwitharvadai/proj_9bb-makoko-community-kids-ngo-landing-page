/**
 * Donation Content Data
 * 
 * Content configuration for donation amounts, impact descriptions, fund allocation,
 * and confirmation messaging. Structured for easy content management and updates.
 * 
 * @generated-from: task-id:TASK-007 feature:donation_system
 * @modifies: none (new file)
 * @dependencies: none
 */

/**
 * Suggested donation amounts with impact descriptions
 * @type {ReadonlyArray<{amount: number, impact: string, popular: boolean}>}
 */
export const SUGGESTED_AMOUNTS = Object.freeze([
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
]);

/**
 * Fund allocation breakdown showing how donations are used
 * @type {ReadonlyArray<{category: string, percentage: number, color: string, description: string}>}
 */
export const FUND_ALLOCATION = Object.freeze([
  {
    category: 'Education Programs',
    percentage: 45,
    color: 'bg-primary-600',
    description: 'School supplies, teacher training, and learning materials',
  },
  {
    category: 'Healthcare Services',
    percentage: 25,
    color: 'bg-secondary-600',
    description: 'Medical care, health screenings, and preventive services',
  },
  {
    category: 'Nutrition Support',
    percentage: 20,
    color: 'bg-accent-500',
    description: 'Daily meals, nutrition education, and food security programs',
  },
  {
    category: 'Administrative Costs',
    percentage: 10,
    color: 'bg-gray-400',
    description: 'Operations, staff, and program management',
  },
]);

/**
 * Payment method configurations
 * @type {ReadonlyArray<{id: string, name: string, icon: string, description: string}>}
 */
export const PAYMENT_METHODS = Object.freeze([
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: 'creditCard',
    description: 'Secure payment processing via Stripe',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    description: 'Pay with your PayPal account or linked payment methods',
  },
]);

/**
 * Donation frequency options
 * @type {ReadonlyArray<{id: string, label: string, description: string, badge?: string}>}
 */
export const DONATION_FREQUENCIES = Object.freeze([
  {
    id: 'one-time',
    label: 'One-Time',
    description: 'Make a single donation',
  },
  {
    id: 'monthly',
    label: 'Monthly',
    description: 'Recurring monthly support',
    badge: 'Sustaining Impact',
  },
]);

/**
 * Validation rules for donation amounts
 * @type {Readonly<{min: number, max: number, message: string}>}
 */
export const AMOUNT_VALIDATION = Object.freeze({
  min: 5,
  max: 100000,
  message: 'Amount must be between $5 and $100,000',
});

/**
 * Email validation pattern (RFC 5322 simplified)
 * @type {RegExp}
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Field validation rules
 * @type {Readonly<{[key: string]: {minLength?: number, pattern?: RegExp, message: string}}>}
 */
export const FIELD_VALIDATION = Object.freeze({
  name: {
    minLength: 2,
    message: 'Name must be at least 2 characters',
  },
  email: {
    pattern: EMAIL_PATTERN,
    message: 'Please enter a valid email address',
  },
});

/**
 * Confirmation messages for successful donations
 * @type {Readonly<{heading: string, oneTime: string, monthly: string, receiptInfo: string, taxInfo: string}>}
 */
export const CONFIRMATION_MESSAGES = Object.freeze({
  heading: 'Thank You for Your Generosity!',
  oneTime: 'Your donation of ${amount} will make a real difference in the lives of children in Makoko.',
  monthly: 'Your monthly donation of ${amount} will provide sustained support for our programs.',
  receiptInfo: 'A confirmation email with your tax receipt has been sent to ${email}',
  taxInfo: 'Makoko Community Kids is a registered 501(c)(3) nonprofit. Your donation is tax-deductible.',
});

/**
 * Security and trust messaging
 * @type {Readonly<{stripe: string, paypal: string, general: string}>}
 */
export const SECURITY_MESSAGES = Object.freeze({
  stripe: 'Your payment information is encrypted and processed securely through Stripe. We never store your card details.',
  paypal: "You'll be redirected to PayPal to complete your donation securely. You can use your PayPal balance or any payment method linked to your account.",
  general: 'All transactions are encrypted and processed securely. We never store your payment information.',
});

/**
 * Recurring donation information
 * @type {Readonly<{stripe: string, paypal: string}>}
 */
export const RECURRING_INFO = Object.freeze({
  stripe: 'Your card will be charged automatically each month. You can cancel anytime by contacting us.',
  paypal: 'A PayPal subscription will be created for monthly donations. You can manage it from your PayPal account.',
});

/**
 * Impact descriptions for different donation levels
 * @type {Readonly<{[key: string]: string}>}
 */
export const IMPACT_DESCRIPTIONS = Object.freeze({
  small: 'Every dollar counts and helps us provide essential services to children in need.',
  medium: 'Your generous contribution will directly support our education and healthcare programs.',
  large: 'Your substantial donation will have a transformative impact on our community programs.',
  major: 'Your major gift will enable us to expand our reach and serve more families in Makoko.',
});

/**
 * Get impact description based on donation amount
 * @param {number} amount - The donation amount
 * @returns {string} Impact description
 */
export function getImpactDescription(amount) {
  if (amount < 50) return IMPACT_DESCRIPTIONS.small;
  if (amount < 100) return IMPACT_DESCRIPTIONS.medium;
  if (amount < 500) return IMPACT_DESCRIPTIONS.large;
  return IMPACT_DESCRIPTIONS.major;
}

/**
 * Get suggested amount by value
 * @param {number} amount - The amount to find
 * @returns {{amount: number, impact: string, popular: boolean} | undefined}
 */
export function getSuggestedAmount(amount) {
  return SUGGESTED_AMOUNTS.find((suggestion) => suggestion.amount === amount);
}

/**
 * Get payment method by ID
 * @param {string} id - The payment method ID
 * @returns {{id: string, name: string, icon: string, description: string} | undefined}
 */
export function getPaymentMethod(id) {
  return PAYMENT_METHODS.find((method) => method.id === id);
}

/**
 * Get donation frequency by ID
 * @param {string} id - The frequency ID
 * @returns {{id: string, label: string, description: string, badge?: string} | undefined}
 */
export function getDonationFrequency(id) {
  return DONATION_FREQUENCIES.find((frequency) => frequency.id === id);
}

/**
 * Format confirmation message with amount and email
 * @param {string} template - The message template
 * @param {number} amount - The donation amount
 * @param {string} email - The donor email
 * @returns {string} Formatted message
 */
export function formatConfirmationMessage(template, amount, email) {
  return template
    .replace('${amount}', `$${amount.toFixed(2)}`)
    .replace('${email}', email);
}

/**
 * Validate donation amount
 * @param {number} amount - The amount to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return { valid: false, error: 'Amount must be a valid number' };
  }

  if (amount < AMOUNT_VALIDATION.min || amount > AMOUNT_VALIDATION.max) {
    return { valid: false, error: AMOUNT_VALIDATION.message };
  }

  return { valid: true };
}

/**
 * Validate email address
 * @param {string} email - The email to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { valid: false, error: FIELD_VALIDATION.email.message };
  }

  return { valid: true };
}

/**
 * Validate donor name
 * @param {string} name - The name to validate
 * @param {boolean} anonymous - Whether donation is anonymous
 * @returns {{valid: boolean, error?: string}}
 */
export function validateName(name, anonymous = false) {
  if (anonymous) {
    return { valid: true };
  }

  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  if (name.trim().length < FIELD_VALIDATION.name.minLength) {
    return { valid: false, error: FIELD_VALIDATION.name.message };
  }

  return { valid: true };
}

/**
 * Get security message for payment method
 * @param {string} paymentMethod - The payment method ID
 * @param {boolean} isRecurring - Whether donation is recurring
 * @returns {string} Security message
 */
export function getSecurityMessage(paymentMethod, isRecurring = false) {
  const baseMessage = SECURITY_MESSAGES[paymentMethod] || SECURITY_MESSAGES.general;
  
  if (isRecurring) {
    const recurringMessage = RECURRING_INFO[paymentMethod];
    return recurringMessage ? `${baseMessage} ${recurringMessage}` : baseMessage;
  }

  return baseMessage;
}

/**
 * Calculate total allocation percentage (should equal 100)
 * @returns {number} Total percentage
 */
export function getTotalAllocationPercentage() {
  return FUND_ALLOCATION.reduce((total, allocation) => total + allocation.percentage, 0);
}

/**
 * Get allocation by category
 * @param {string} category - The category name
 * @returns {{category: string, percentage: number, color: string, description: string} | undefined}
 */
export function getAllocationByCategory(category) {
  return FUND_ALLOCATION.find((allocation) => allocation.category === category);
}

/**
 * Default export with all content
 */
export default {
  SUGGESTED_AMOUNTS,
  FUND_ALLOCATION,
  PAYMENT_METHODS,
  DONATION_FREQUENCIES,
  AMOUNT_VALIDATION,
  EMAIL_PATTERN,
  FIELD_VALIDATION,
  CONFIRMATION_MESSAGES,
  SECURITY_MESSAGES,
  RECURRING_INFO,
  IMPACT_DESCRIPTIONS,
  getImpactDescription,
  getSuggestedAmount,
  getPaymentMethod,
  getDonationFrequency,
  formatConfirmationMessage,
  validateAmount,
  validateEmail,
  validateName,
  getSecurityMessage,
  getTotalAllocationPercentage,
  getAllocationByCategory,
};