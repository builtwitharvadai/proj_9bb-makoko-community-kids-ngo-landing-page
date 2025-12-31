/**
 * Form Validation Utilities for Donation Forms
 * 
 * Provides comprehensive validation for donation forms including email validation,
 * amount validation, required field checking, and payment form validation.
 * Includes accessibility features and structured error messaging.
 * 
 * @module formValidation
 * @version 1.0.0
 */

/**
 * Validation result type
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 * @property {string} [field] - Field name that failed validation
 */

/**
 * Email validation options
 * @typedef {Object} EmailValidationOptions
 * @property {boolean} [allowInternational=true] - Allow international domains
 * @property {boolean} [requireTLD=true] - Require top-level domain
 */

/**
 * Amount validation options
 * @typedef {Object} AmountValidationOptions
 * @property {number} [min=1] - Minimum allowed amount
 * @property {number} [max=1000000] - Maximum allowed amount
 * @property {boolean} [allowZero=false] - Allow zero amount
 * @property {string} [currency='USD'] - Currency code for formatting
 */

/**
 * Field validation configuration
 * @typedef {Object} FieldValidationConfig
 * @property {boolean} [required=false] - Whether field is required
 * @property {number} [minLength] - Minimum length for text fields
 * @property {number} [maxLength] - Maximum length for text fields
 * @property {RegExp} [pattern] - Custom validation pattern
 * @property {Function} [customValidator] - Custom validation function
 * @property {string} [errorMessage] - Custom error message
 */

/**
 * Validation error codes for structured error handling
 */
const ValidationErrorCodes = Object.freeze({
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  AMOUNT_TOO_LOW: 'AMOUNT_TOO_LOW',
  AMOUNT_TOO_HIGH: 'AMOUNT_TOO_HIGH',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_LENGTH: 'INVALID_LENGTH',
  INVALID_CARD_NUMBER: 'INVALID_CARD_NUMBER',
  INVALID_EXPIRY: 'INVALID_EXPIRY',
  INVALID_CVV: 'INVALID_CVV',
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_ZIP: 'INVALID_ZIP',
  CUSTOM_VALIDATION_FAILED: 'CUSTOM_VALIDATION_FAILED',
});

/**
 * Email validation regex pattern
 * Supports international domains and follows RFC 5322 simplified pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Phone number validation regex (US format)
 */
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/**
 * ZIP code validation regex (US format)
 */
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;

/**
 * Validate email address
 * 
 * @param {string} email - Email address to validate
 * @param {EmailValidationOptions} [options={}] - Validation options
 * @returns {ValidationResult} Validation result
 */
export function validateEmail(email, options = {}) {
  const { allowInternational = true, requireTLD = true } = options;

  // Check if email is provided
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'Email address is required',
      field: 'email',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  // Trim and normalize
  const normalizedEmail = email.trim().toLowerCase();

  // Check length constraints
  if (normalizedEmail.length === 0) {
    return {
      isValid: false,
      error: 'Email address cannot be empty',
      field: 'email',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  if (normalizedEmail.length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long (maximum 254 characters)',
      field: 'email',
      code: ValidationErrorCodes.INVALID_LENGTH,
    };
  }

  // Validate format
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
      field: 'email',
      code: ValidationErrorCodes.INVALID_EMAIL,
    };
  }

  // Check for TLD if required
  if (requireTLD) {
    const parts = normalizedEmail.split('@');
    if (parts.length !== 2 || !parts[1].includes('.')) {
      return {
        isValid: false,
        error: 'Email address must include a domain extension (e.g., .com)',
        field: 'email',
        code: ValidationErrorCodes.INVALID_EMAIL,
      };
    }
  }

  // Check for international characters if not allowed
  if (!allowInternational && /[^\x00-\x7F]/.test(normalizedEmail)) {
    return {
      isValid: false,
      error: 'Email address contains invalid characters',
      field: 'email',
      code: ValidationErrorCodes.INVALID_FORMAT,
    };
  }

  return {
    isValid: true,
    value: normalizedEmail,
  };
}

/**
 * Validate donation amount
 * 
 * @param {string|number} amount - Amount to validate
 * @param {AmountValidationOptions} [options={}] - Validation options
 * @returns {ValidationResult} Validation result
 */
export function validateAmount(amount, options = {}) {
  const {
    min = 1,
    max = 1000000,
    allowZero = false,
    currency = 'USD',
  } = options;

  // Check if amount is provided
  if (amount === null || amount === undefined || amount === '') {
    return {
      isValid: false,
      error: 'Donation amount is required',
      field: 'amount',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  // Convert to number
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  // Check if valid number
  if (isNaN(numericAmount) || !isFinite(numericAmount)) {
    return {
      isValid: false,
      error: 'Please enter a valid donation amount',
      field: 'amount',
      code: ValidationErrorCodes.INVALID_AMOUNT,
    };
  }

  // Check for negative values
  if (numericAmount < 0) {
    return {
      isValid: false,
      error: 'Donation amount cannot be negative',
      field: 'amount',
      code: ValidationErrorCodes.INVALID_AMOUNT,
    };
  }

  // Check for zero
  if (numericAmount === 0 && !allowZero) {
    return {
      isValid: false,
      error: 'Donation amount must be greater than zero',
      field: 'amount',
      code: ValidationErrorCodes.AMOUNT_TOO_LOW,
    };
  }

  // Check minimum amount
  if (numericAmount < min) {
    return {
      isValid: false,
      error: `Minimum donation amount is ${formatCurrency(min, currency)}`,
      field: 'amount',
      code: ValidationErrorCodes.AMOUNT_TOO_LOW,
    };
  }

  // Check maximum amount
  if (numericAmount > max) {
    return {
      isValid: false,
      error: `Maximum donation amount is ${formatCurrency(max, currency)}`,
      field: 'amount',
      code: ValidationErrorCodes.AMOUNT_TOO_HIGH,
    };
  }

  // Check for reasonable decimal places (max 2 for currency)
  const decimalPlaces = (numericAmount.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return {
      isValid: false,
      error: 'Amount cannot have more than 2 decimal places',
      field: 'amount',
      code: ValidationErrorCodes.INVALID_FORMAT,
    };
  }

  return {
    isValid: true,
    value: numericAmount,
  };
}

/**
 * Validate required field
 * 
 * @param {*} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @param {FieldValidationConfig} [config={}] - Validation configuration
 * @returns {ValidationResult} Validation result
 */
export function validateRequired(value, fieldName, config = {}) {
  const {
    minLength,
    maxLength,
    pattern,
    customValidator,
    errorMessage,
  } = config;

  // Check if value exists
  if (value === null || value === undefined || value === '') {
    return {
      isValid: false,
      error: errorMessage || `${fieldName} is required`,
      field: fieldName,
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  // For strings, check if not just whitespace
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    
    if (trimmedValue.length === 0) {
      return {
        isValid: false,
        error: errorMessage || `${fieldName} cannot be empty`,
        field: fieldName,
        code: ValidationErrorCodes.REQUIRED_FIELD,
      };
    }

    // Check minimum length
    if (minLength !== undefined && trimmedValue.length < minLength) {
      return {
        isValid: false,
        error: errorMessage || `${fieldName} must be at least ${minLength} characters`,
        field: fieldName,
        code: ValidationErrorCodes.INVALID_LENGTH,
      };
    }

    // Check maximum length
    if (maxLength !== undefined && trimmedValue.length > maxLength) {
      return {
        isValid: false,
        error: errorMessage || `${fieldName} must not exceed ${maxLength} characters`,
        field: fieldName,
        code: ValidationErrorCodes.INVALID_LENGTH,
      };
    }

    // Check pattern
    if (pattern && !pattern.test(trimmedValue)) {
      return {
        isValid: false,
        error: errorMessage || `${fieldName} format is invalid`,
        field: fieldName,
        code: ValidationErrorCodes.INVALID_FORMAT,
      };
    }
  }

  // Run custom validator if provided
  if (customValidator && typeof customValidator === 'function') {
    try {
      const customResult = customValidator(value);
      if (customResult !== true) {
        return {
          isValid: false,
          error: typeof customResult === 'string' ? customResult : (errorMessage || `${fieldName} validation failed`),
          field: fieldName,
          code: ValidationErrorCodes.CUSTOM_VALIDATION_FAILED,
        };
      }
    } catch (error) {
      return {
        isValid: false,
        error: errorMessage || `${fieldName} validation error`,
        field: fieldName,
        code: ValidationErrorCodes.CUSTOM_VALIDATION_FAILED,
      };
    }
  }

  return {
    isValid: true,
    value: typeof value === 'string' ? value.trim() : value,
  };
}

/**
 * Validate credit card number using Luhn algorithm
 * 
 * @param {string} cardNumber - Card number to validate
 * @returns {ValidationResult} Validation result
 */
export function validateCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return {
      isValid: false,
      error: 'Card number is required',
      field: 'cardNumber',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');

  // Check if only digits
  if (!/^\d+$/.test(cleanNumber)) {
    return {
      isValid: false,
      error: 'Card number must contain only digits',
      field: 'cardNumber',
      code: ValidationErrorCodes.INVALID_CARD_NUMBER,
    };
  }

  // Check length (13-19 digits for most cards)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return {
      isValid: false,
      error: 'Card number must be between 13 and 19 digits',
      field: 'cardNumber',
      code: ValidationErrorCodes.INVALID_CARD_NUMBER,
    };
  }

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return {
      isValid: false,
      error: 'Invalid card number',
      field: 'cardNumber',
      code: ValidationErrorCodes.INVALID_CARD_NUMBER,
    };
  }

  return {
    isValid: true,
    value: cleanNumber,
  };
}

/**
 * Validate card expiry date
 * 
 * @param {string} expiry - Expiry date in MM/YY or MM/YYYY format
 * @returns {ValidationResult} Validation result
 */
export function validateCardExpiry(expiry) {
  if (!expiry || typeof expiry !== 'string') {
    return {
      isValid: false,
      error: 'Expiry date is required',
      field: 'expiry',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  // Parse expiry date
  const parts = expiry.trim().split('/');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'Expiry date must be in MM/YY format',
      field: 'expiry',
      code: ValidationErrorCodes.INVALID_EXPIRY,
    };
  }

  const month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);

  // Validate month
  if (isNaN(month) || month < 1 || month > 12) {
    return {
      isValid: false,
      error: 'Invalid expiry month',
      field: 'expiry',
      code: ValidationErrorCodes.INVALID_EXPIRY,
    };
  }

  // Validate year
  if (isNaN(year)) {
    return {
      isValid: false,
      error: 'Invalid expiry year',
      field: 'expiry',
      code: ValidationErrorCodes.INVALID_EXPIRY,
    };
  }

  // Convert 2-digit year to 4-digit
  if (year < 100) {
    year += 2000;
  }

  // Check if card is expired
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return {
      isValid: false,
      error: 'Card has expired',
      field: 'expiry',
      code: ValidationErrorCodes.INVALID_EXPIRY,
    };
  }

  // Check if expiry is too far in future (more than 20 years)
  if (year > currentYear + 20) {
    return {
      isValid: false,
      error: 'Invalid expiry year',
      field: 'expiry',
      code: ValidationErrorCodes.INVALID_EXPIRY,
    };
  }

  return {
    isValid: true,
    value: { month, year },
  };
}

/**
 * Validate CVV/CVC code
 * 
 * @param {string} cvv - CVV code to validate
 * @param {number} [length=3] - Expected CVV length (3 or 4)
 * @returns {ValidationResult} Validation result
 */
export function validateCVV(cvv, length = 3) {
  if (!cvv || typeof cvv !== 'string') {
    return {
      isValid: false,
      error: 'Security code is required',
      field: 'cvv',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  const cleanCVV = cvv.trim();

  // Check if only digits
  if (!/^\d+$/.test(cleanCVV)) {
    return {
      isValid: false,
      error: 'Security code must contain only digits',
      field: 'cvv',
      code: ValidationErrorCodes.INVALID_CVV,
    };
  }

  // Check length
  if (cleanCVV.length !== length) {
    return {
      isValid: false,
      error: `Security code must be ${length} digits`,
      field: 'cvv',
      code: ValidationErrorCodes.INVALID_CVV,
    };
  }

  return {
    isValid: true,
    value: cleanCVV,
  };
}

/**
 * Validate phone number
 * 
 * @param {string} phone - Phone number to validate
 * @returns {ValidationResult} Validation result
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return {
      isValid: false,
      error: 'Phone number is required',
      field: 'phone',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  const cleanPhone = phone.trim();

  if (!PHONE_REGEX.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
      field: 'phone',
      code: ValidationErrorCodes.INVALID_PHONE,
    };
  }

  return {
    isValid: true,
    value: cleanPhone,
  };
}

/**
 * Validate ZIP code
 * 
 * @param {string} zip - ZIP code to validate
 * @returns {ValidationResult} Validation result
 */
export function validateZipCode(zip) {
  if (!zip || typeof zip !== 'string') {
    return {
      isValid: false,
      error: 'ZIP code is required',
      field: 'zip',
      code: ValidationErrorCodes.REQUIRED_FIELD,
    };
  }

  const cleanZip = zip.trim();

  if (!ZIP_REGEX.test(cleanZip)) {
    return {
      isValid: false,
      error: 'Please enter a valid ZIP code',
      field: 'zip',
      code: ValidationErrorCodes.INVALID_ZIP,
    };
  }

  return {
    isValid: true,
    value: cleanZip,
  };
}

/**
 * Validate entire form
 * 
 * @param {Object} formData - Form data to validate
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Validation results with errors object
 */
export function validateForm(formData, validationRules) {
  const errors = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const value = formData[fieldName];
    let fieldResult = { isValid: true };

    // Check required
    if (rules.required) {
      fieldResult = validateRequired(value, fieldName, rules);
      if (!fieldResult.isValid) {
        errors[fieldName] = fieldResult.error;
        isValid = false;
        continue;
      }
    }

    // Skip further validation if field is empty and not required
    if (!value && !rules.required) {
      continue;
    }

    // Email validation
    if (rules.type === 'email') {
      fieldResult = validateEmail(value, rules.emailOptions);
    }
    // Amount validation
    else if (rules.type === 'amount') {
      fieldResult = validateAmount(value, rules.amountOptions);
    }
    // Phone validation
    else if (rules.type === 'phone') {
      fieldResult = validatePhone(value);
    }
    // ZIP validation
    else if (rules.type === 'zip') {
      fieldResult = validateZipCode(value);
    }
    // Card number validation
    else if (rules.type === 'cardNumber') {
      fieldResult = validateCardNumber(value);
    }
    // Card expiry validation
    else if (rules.type === 'cardExpiry') {
      fieldResult = validateCardExpiry(value);
    }
    // CVV validation
    else if (rules.type === 'cvv') {
      fieldResult = validateCVV(value, rules.cvvLength);
    }

    if (!fieldResult.isValid) {
      errors[fieldName] = fieldResult.error;
      isValid = false;
    }
  }

  return {
    isValid,
    errors,
  };
}

/**
 * Display validation error on form field
 * 
 * @param {HTMLElement} fieldElement - Form field element
 * @param {string} errorMessage - Error message to display
 */
export function displayFieldError(fieldElement, errorMessage) {
  if (!fieldElement) {
    return;
  }

  // Remove existing error
  clearFieldError(fieldElement);

  // Add error class
  fieldElement.classList.add('error', 'border-red-500');
  fieldElement.setAttribute('aria-invalid', 'true');

  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message text-red-600 text-sm mt-1';
  errorElement.setAttribute('role', 'alert');
  errorElement.setAttribute('aria-live', 'polite');
  errorElement.textContent = errorMessage;

  // Insert error message after field
  fieldElement.parentNode.insertBefore(errorElement, fieldElement.nextSibling);

  // Set aria-describedby for accessibility
  const errorId = `${fieldElement.id || fieldElement.name}-error`;
  errorElement.id = errorId;
  fieldElement.setAttribute('aria-describedby', errorId);
}

/**
 * Clear validation error from form field
 * 
 * @param {HTMLElement} fieldElement - Form field element
 */
export function clearFieldError(fieldElement) {
  if (!fieldElement) {
    return;
  }

  // Remove error classes
  fieldElement.classList.remove('error', 'border-red-500');
  fieldElement.removeAttribute('aria-invalid');

  // Remove error message
  const errorElement = fieldElement.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }

  // Remove aria-describedby
  fieldElement.removeAttribute('aria-describedby');
}

/**
 * Display all form errors
 * 
 * @param {HTMLFormElement} formElement - Form element
 * @param {Object} errors - Errors object from validateForm
 */
export function displayFormErrors(formElement, errors) {
  if (!formElement || !errors) {
    return;
  }

  // Clear all existing errors
  clearFormErrors(formElement);

  // Display each error
  for (const [fieldName, errorMessage] of Object.entries(errors)) {
    const fieldElement = formElement.elements[fieldName];
    if (fieldElement) {
      displayFieldError(fieldElement, errorMessage);
    }
  }

  // Focus first error field
  const firstErrorField = formElement.querySelector('[aria-invalid="true"]');
  if (firstErrorField) {
    firstErrorField.focus();
  }
}

/**
 * Clear all form errors
 * 
 * @param {HTMLFormElement} formElement - Form element
 */
export function clearFormErrors(formElement) {
  if (!formElement) {
    return;
  }

  const errorFields = formElement.querySelectorAll('[aria-invalid="true"]');
  errorFields.forEach(field => clearFieldError(field));
}

/**
 * Format currency for display
 * 
 * @param {number} amount - Amount to format
 * @param {string} [currency='USD'] - Currency code
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (_error) {
    return `$${amount.toFixed(2)}`;
  }
}

/**
 * Create real-time field validator
 * 
 * @param {HTMLElement} fieldElement - Form field element
 * @param {Function} validatorFn - Validator function
 * @param {number} [debounceMs=300] - Debounce delay in milliseconds
 * @returns {Function} Cleanup function
 */
export function createFieldValidator(fieldElement, validatorFn, debounceMs = 300) {
  if (!fieldElement || typeof validatorFn !== 'function') {
    return () => {};
  }

  let timeoutId = null;

  const handleInput = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validatorFn(fieldElement.value);
      if (result.isValid) {
        clearFieldError(fieldElement);
      } else {
        displayFieldError(fieldElement, result.error);
      }
    }, debounceMs);
  };

  fieldElement.addEventListener('input', handleInput);
  fieldElement.addEventListener('blur', handleInput);

  // Return cleanup function
  return () => {
    clearTimeout(timeoutId);
    fieldElement.removeEventListener('input', handleInput);
    fieldElement.removeEventListener('blur', handleInput);
  };
}

/**
 * Export validation error codes for external use
 */
export { ValidationErrorCodes };

/**
 * Default export with all validation functions
 */
export default {
  validateEmail,
  validateAmount,
  validateRequired,
  validateCardNumber,
  validateCardExpiry,
  validateCVV,
  validatePhone,
  validateZipCode,
  validateForm,
  displayFieldError,
  clearFieldError,
  displayFormErrors,
  clearFormErrors,
  createFieldValidator,
  ValidationErrorCodes,
};