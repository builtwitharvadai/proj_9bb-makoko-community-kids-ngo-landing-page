/**
 * Contact Form Component
 * 
 * Provides a comprehensive contact form with validation, spam protection,
 * and submission handling. Includes accessibility features, real-time validation,
 * and user feedback mechanisms.
 * 
 * @module ContactForm
 * @version 1.0.0
 */

import { validateEmail, validateRequired, createFieldValidator } from '../utils/formValidation.js';
import { handleFormSubmission } from '../utils/formSubmission.js';

/**
 * Contact form configuration
 */
const CONTACT_FORM_CONFIG = {
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with actual Formspree ID
  maxMessageLength: 1000,
  minMessageLength: 10,
  debounceDelay: 300,
  submitTimeout: 30000,
};

/**
 * Form field validators
 */
const fieldValidators = new Map();

/**
 * Create contact form HTML structure
 * 
 * @returns {string} Contact form HTML
 */
function createContactFormHTML() {
  return `
    <form 
      id="contact-form" 
      class="space-y-6 max-w-2xl mx-auto"
      novalidate
      aria-label="Contact form"
    >
      <!-- Name Field -->
      <div class="form-group">
        <label 
          for="contact-name" 
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Full Name <span class="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          autocomplete="name"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          placeholder="Enter your full name"
          aria-required="true"
          aria-describedby="contact-name-hint"
        />
        <p id="contact-name-hint" class="text-xs text-gray-500 mt-1">
          Please provide your full name
        </p>
      </div>

      <!-- Email Field -->
      <div class="form-group">
        <label 
          for="contact-email" 
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email Address <span class="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autocomplete="email"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          placeholder="your.email@example.com"
          aria-required="true"
          aria-describedby="contact-email-hint"
        />
        <p id="contact-email-hint" class="text-xs text-gray-500 mt-1">
          We'll never share your email with anyone else
        </p>
      </div>

      <!-- Subject Field -->
      <div class="form-group">
        <label 
          for="contact-subject" 
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Subject <span class="text-red-500" aria-label="required">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          aria-required="true"
          aria-describedby="contact-subject-hint"
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="volunteer">Volunteer Opportunities</option>
          <option value="donation">Donation Information</option>
          <option value="partnership">Partnership Proposal</option>
          <option value="media">Media Inquiry</option>
          <option value="other">Other</option>
        </select>
        <p id="contact-subject-hint" class="text-xs text-gray-500 mt-1">
          Choose the topic that best describes your inquiry
        </p>
      </div>

      <!-- Message Field -->
      <div class="form-group">
        <label 
          for="contact-message" 
          class="block text-sm font-semibold text-gray-700 mb-2"
        >
          Message <span class="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows="6"
          maxlength="${CONTACT_FORM_CONFIG.maxMessageLength}"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-y"
          placeholder="Tell us how we can help you..."
          aria-required="true"
          aria-describedby="contact-message-hint contact-message-counter"
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          <p id="contact-message-hint" class="text-xs text-gray-500">
            Minimum ${CONTACT_FORM_CONFIG.minMessageLength} characters
          </p>
          <p 
            id="contact-message-counter" 
            class="text-xs text-gray-500"
            aria-live="polite"
          >
            0 / ${CONTACT_FORM_CONFIG.maxMessageLength}
          </p>
        </div>
      </div>

      <!-- Privacy Consent -->
      <div class="form-group">
        <label class="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            id="contact-consent"
            name="consent"
            required
            class="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
            aria-required="true"
            aria-describedby="contact-consent-hint"
          />
          <span class="text-sm text-gray-700">
            I agree to the processing of my personal data for the purpose of responding to my inquiry. 
            <span class="text-red-500" aria-label="required">*</span>
          </span>
        </label>
        <p id="contact-consent-hint" class="text-xs text-gray-500 mt-1 ml-7">
          Your data will be handled according to our privacy policy
        </p>
      </div>

      <!-- Submit Button -->
      <div class="form-group">
        <button
          type="submit"
          class="w-full btn btn-primary py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          aria-label="Submit contact form"
        >
          Send Message
        </button>
      </div>

      <!-- Security Notice -->
      <div class="text-center">
        <p class="text-xs text-gray-500 flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
          </svg>
          Your information is secure and will never be shared
        </p>
      </div>
    </form>
  `;
}

/**
 * Initialize character counter for message field
 * 
 * @param {HTMLTextAreaElement} messageField - Message textarea element
 */
function initializeCharacterCounter(messageField) {
  const counter = document.getElementById('contact-message-counter');
  
  if (!counter) {
    return;
  }

  const updateCounter = () => {
    const length = messageField.value.length;
    const max = CONTACT_FORM_CONFIG.maxMessageLength;
    counter.textContent = `${length} / ${max}`;
    
    // Update color based on length
    if (length > max * 0.9) {
      counter.classList.add('text-red-600');
      counter.classList.remove('text-gray-500');
    } else {
      counter.classList.remove('text-red-600');
      counter.classList.add('text-gray-500');
    }
  };

  messageField.addEventListener('input', updateCounter);
  updateCounter(); // Initial update
}

/**
 * Setup real-time field validation
 * 
 * @param {HTMLFormElement} formElement - Form element
 */
function setupFieldValidation(formElement) {
  // Name validation
  const nameField = formElement.elements.name;
  if (nameField) {
    const validator = createFieldValidator(
      nameField,
      (value) => validateRequired(value, 'Full Name', {
        minLength: 2,
        maxLength: 100,
      }),
      CONTACT_FORM_CONFIG.debounceDelay
    );
    fieldValidators.set('name', validator);
  }

  // Email validation
  const emailField = formElement.elements.email;
  if (emailField) {
    const validator = createFieldValidator(
      emailField,
      (value) => validateEmail(value),
      CONTACT_FORM_CONFIG.debounceDelay
    );
    fieldValidators.set('email', validator);
  }

  // Subject validation
  const subjectField = formElement.elements.subject;
  if (subjectField) {
    const validator = createFieldValidator(
      subjectField,
      (value) => validateRequired(value, 'Subject'),
      0 // No debounce for select
    );
    fieldValidators.set('subject', validator);
  }

  // Message validation
  const messageField = formElement.elements.message;
  if (messageField) {
    const validator = createFieldValidator(
      messageField,
      (value) => validateRequired(value, 'Message', {
        minLength: CONTACT_FORM_CONFIG.minMessageLength,
        maxLength: CONTACT_FORM_CONFIG.maxMessageLength,
      }),
      CONTACT_FORM_CONFIG.debounceDelay
    );
    fieldValidators.set('message', validator);

    // Initialize character counter
    initializeCharacterCounter(messageField);
  }

  // Consent validation
  const consentField = formElement.elements.consent;
  if (consentField) {
    const validator = createFieldValidator(
      consentField,
      (value) => {
        if (!value || value !== 'on') {
          return {
            isValid: false,
            error: 'You must agree to the privacy policy to continue',
            field: 'consent',
          };
        }
        return { isValid: true };
      },
      0 // No debounce for checkbox
    );
    fieldValidators.set('consent', validator);
  }
}

/**
 * Handle form submission success
 * 
 * @param {Object} result - Submission result
 */
function handleSubmissionSuccess(result) {
  console.log('[Contact Form] Submission successful:', result);

  // Dispatch custom event for analytics or other integrations
  const event = new CustomEvent('contact:form-submitted', {
    detail: {
      timestamp: new Date().toISOString(),
      result,
    },
    bubbles: true,
  });
  document.dispatchEvent(event);

  // Optional: Redirect or show additional confirmation
  // window.location.href = '/thank-you';
}

/**
 * Handle form submission error
 * 
 * @param {Object} result - Submission result with error
 */
function handleSubmissionError(result) {
  console.error('[Contact Form] Submission failed:', result);

  // Dispatch custom event for error tracking
  const event = new CustomEvent('contact:form-error', {
    detail: {
      timestamp: new Date().toISOString(),
      error: result.error,
      code: result.code,
    },
    bubbles: true,
  });
  document.dispatchEvent(event);
}

/**
 * Initialize contact form
 * 
 * @param {string|HTMLElement} container - Container selector or element
 * @returns {Function} Cleanup function
 */
export function initializeContactForm(container) {
  const containerElement = typeof container === 'string'
    ? document.querySelector(container)
    : container;

  if (!containerElement) {
    console.error('[Contact Form] Container not found:', container);
    return () => {};
  }

  // Render form
  containerElement.innerHTML = createContactFormHTML();

  // Get form element
  const formElement = containerElement.querySelector('#contact-form');
  if (!formElement) {
    console.error('[Contact Form] Form element not found after render');
    return () => {};
  }

  // Setup field validation
  setupFieldValidation(formElement);

  // Initialize form submission handler
  const cleanupSubmission = handleFormSubmission(formElement, {
    endpoint: CONTACT_FORM_CONFIG.formspreeEndpoint,
    timeout: CONTACT_FORM_CONFIG.submitTimeout,
    validateBeforeSubmit: true,
    enableSpamProtection: true,
    onSuccess: handleSubmissionSuccess,
    onError: handleSubmissionError,
  });

  // Return cleanup function
  return () => {
    // Cleanup field validators
    fieldValidators.forEach(cleanup => cleanup());
    fieldValidators.clear();

    // Cleanup submission handler
    cleanupSubmission();

    // Clear container
    containerElement.innerHTML = '';
  };
}

/**
 * Create contact form component
 * 
 * @returns {Object} Contact form component interface
 */
export function createContactForm() {
  let cleanup = null;

  return {
    /**
     * Mount contact form to container
     * 
     * @param {string|HTMLElement} container - Container selector or element
     */
    mount(container) {
      if (cleanup) {
        cleanup();
      }
      cleanup = initializeContactForm(container);
    },

    /**
     * Unmount contact form
     */
    unmount() {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    },

    /**
     * Update form configuration
     * 
     * @param {Object} config - Configuration updates
     */
    updateConfig(config) {
      Object.assign(CONTACT_FORM_CONFIG, config);
    },
  };
}

/**
 * Default export
 */
export default {
  initializeContactForm,
  createContactForm,
};