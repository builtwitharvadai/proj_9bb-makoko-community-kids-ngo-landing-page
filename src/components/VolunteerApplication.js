/**
 * Volunteer Application Form Component
 * 
 * Comprehensive application form for volunteer opportunities with personal information,
 * skills assessment, availability selection, role preferences, and motivation questions.
 * Includes form validation, submission handling, and accessibility features.
 * 
 * @module VolunteerApplication
 * @version 1.0.0
 */

import {
  validateEmail,
  validateRequired,
  validatePhone,
  validateForm,
  displayFormErrors,
  clearFormErrors,
  createFieldValidator,
} from '../utils/formValidation.js';
import { icons } from '../utils/icons.js';

/**
 * Application form state
 */
const formState = {
  isSubmitting: false,
  selectedSkills: new Set(),
  selectedAvailability: new Set(),
  selectedRoles: new Set(),
};

/**
 * Skills categories with options
 */
const skillsCategories = [
  {
    category: 'Education & Mentoring',
    skills: [
      'Teaching/Tutoring',
      'Mentoring',
      'Curriculum Development',
      'Educational Technology',
      'Special Education',
    ],
  },
  {
    category: 'Healthcare & Wellness',
    skills: [
      'Medical/Nursing',
      'First Aid/CPR',
      'Nutrition',
      'Mental Health Support',
      'Health Education',
    ],
  },
  {
    category: 'Arts & Recreation',
    skills: [
      'Music',
      'Dance',
      'Visual Arts',
      'Sports Coaching',
      'Drama/Theater',
    ],
  },
  {
    category: 'Professional Skills',
    skills: [
      'Fundraising',
      'Marketing/Communications',
      'Graphic Design',
      'Photography/Videography',
      'Web Development',
      'Accounting/Finance',
      'Legal Services',
      'Project Management',
    ],
  },
  {
    category: 'Community Support',
    skills: [
      'Event Planning',
      'Administrative Support',
      'Translation',
      'Social Work',
      'Community Outreach',
    ],
  },
];

/**
 * Availability options
 */
const availabilityOptions = [
  { value: 'weekday-morning', label: 'Weekday Mornings (8am-12pm)' },
  { value: 'weekday-afternoon', label: 'Weekday Afternoons (12pm-5pm)' },
  { value: 'weekday-evening', label: 'Weekday Evenings (5pm-8pm)' },
  { value: 'weekend-morning', label: 'Weekend Mornings (8am-12pm)' },
  { value: 'weekend-afternoon', label: 'Weekend Afternoons (12pm-5pm)' },
  { value: 'flexible', label: 'Flexible Schedule' },
];

/**
 * Time commitment options
 */
const commitmentOptions = [
  {
    value: 'one-time',
    label: 'One-Time Event',
    description: 'Single event or project',
  },
  {
    value: 'weekly',
    label: 'Weekly',
    description: '2-4 hours per week',
  },
  {
    value: 'bi-weekly',
    label: 'Bi-Weekly',
    description: '2-4 hours every two weeks',
  },
  {
    value: 'monthly',
    label: 'Monthly',
    description: '4-8 hours per month',
  },
  {
    value: 'project-based',
    label: 'Project-Based',
    description: 'Specific project duration',
  },
];

/**
 * Form validation rules
 */
const validationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    errorMessage: 'First name is required (2-50 characters)',
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    errorMessage: 'Last name is required (2-50 characters)',
  },
  email: {
    required: true,
    type: 'email',
    errorMessage: 'Valid email address is required',
  },
  phone: {
    required: true,
    type: 'phone',
    errorMessage: 'Valid phone number is required',
  },
  address: {
    required: false,
    maxLength: 200,
  },
  city: {
    required: false,
    maxLength: 100,
  },
  state: {
    required: false,
    maxLength: 50,
  },
  zipCode: {
    required: false,
    pattern: /^\d{5}(-\d{4})?$/,
    errorMessage: 'Valid ZIP code format: 12345 or 12345-6789',
  },
  commitment: {
    required: true,
    errorMessage: 'Please select your time commitment preference',
  },
  motivation: {
    required: true,
    minLength: 50,
    maxLength: 1000,
    errorMessage: 'Please share your motivation (50-1000 characters)',
  },
  experience: {
    required: false,
    maxLength: 1000,
  },
  references: {
    required: false,
    maxLength: 500,
  },
};

/**
 * Create volunteer application form component
 * 
 * @returns {HTMLElement} Application form element
 */
export function createVolunteerApplication() {
  const container = document.createElement('div');
  container.className = 'volunteer-application-container max-w-4xl mx-auto';
  container.innerHTML = `
    <div class="bg-white rounded-3xl shadow-hard p-8 md:p-12">
      <!-- Form Header -->
      <header class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          ${icons.users}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Volunteer Application
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our community of dedicated volunteers making a difference in children's lives.
          Complete the form below to start your volunteer journey with us.
        </p>
      </header>

      <!-- Application Form -->
      <form id="volunteer-application-form" class="space-y-8" novalidate>
        <!-- Personal Information Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.user}
            <span>Personal Information</span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your first name"
                required
                aria-required="true"
              />
            </div>

            <div class="form-group">
              <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your last name"
                required
                aria-required="true"
              />
            </div>

            <div class="form-group">
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="your.email@example.com"
                required
                aria-required="true"
              />
            </div>

            <div class="form-group">
              <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="(555) 123-4567"
                required
                aria-required="true"
              />
            </div>

            <div class="form-group md:col-span-2">
              <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="123 Main Street"
              />
            </div>

            <div class="form-group">
              <label for="city" class="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="City"
              />
            </div>

            <div class="form-group">
              <label for="state" class="block text-sm font-semibold text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="State"
              />
            </div>

            <div class="form-group">
              <label for="zipCode" class="block text-sm font-semibold text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="12345"
              />
            </div>
          </div>
        </section>

        <!-- Skills Assessment Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.star}
            <span>Skills & Expertise</span>
          </h3>
          <p class="text-gray-600 mb-4">
            Select all skills that apply to you. This helps us match you with suitable volunteer opportunities.
          </p>
          <div id="skills-container" class="space-y-6">
            ${renderSkillsCategories()}
          </div>
        </section>

        <!-- Availability Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.calendar}
            <span>Availability</span>
          </h3>
          <p class="text-gray-600 mb-4">
            Select all time slots when you're available to volunteer.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${renderAvailabilityOptions()}
          </div>
        </section>

        <!-- Time Commitment Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.clock}
            <span>Time Commitment <span class="text-red-500">*</span></span>
          </h3>
          <p class="text-gray-600 mb-4">
            Choose your preferred time commitment level.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${renderCommitmentOptions()}
          </div>
        </section>

        <!-- Role Preferences Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.heart}
            <span>Role Preferences</span>
          </h3>
          <p class="text-gray-600 mb-4">
            Select the volunteer roles you're interested in (optional).
          </p>
          <div id="roles-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${renderRolePreferences()}
          </div>
        </section>

        <!-- Motivation & Experience Section -->
        <section class="form-section">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            ${icons.messageCircle}
            <span>Tell Us About Yourself</span>
          </h3>
          
          <div class="form-group mb-6">
            <label for="motivation" class="block text-sm font-semibold text-gray-700 mb-2">
              Why do you want to volunteer with us? <span class="text-red-500">*</span>
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows="5"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
              placeholder="Share your motivation and what you hope to contribute... (minimum 50 characters)"
              required
              aria-required="true"
              maxlength="1000"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-500">Minimum 50 characters</span>
              <span id="motivation-counter" class="text-sm text-gray-500">0 / 1000</span>
            </div>
          </div>

          <div class="form-group mb-6">
            <label for="experience" class="block text-sm font-semibold text-gray-700 mb-2">
              Relevant Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              rows="4"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
              placeholder="Describe any relevant volunteer or professional experience..."
              maxlength="1000"
            ></textarea>
            <span id="experience-counter" class="text-sm text-gray-500 mt-2 block">0 / 1000</span>
          </div>

          <div class="form-group">
            <label for="references" class="block text-sm font-semibold text-gray-700 mb-2">
              References
            </label>
            <textarea
              id="references"
              name="references"
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
              placeholder="Optional: Provide contact information for references..."
              maxlength="500"
            ></textarea>
            <span id="references-counter" class="text-sm text-gray-500 mt-2 block">0 / 500</span>
          </div>
        </section>

        <!-- Agreement Section -->
        <section class="form-section">
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                class="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                required
                aria-required="true"
              />
              <label for="agreement" class="text-sm text-gray-700 flex-1">
                I confirm that the information provided is accurate and complete. I understand that
                background checks may be required for certain volunteer positions. I agree to the
                <a href="#" class="text-primary-600 hover:text-primary-700 underline">volunteer terms and conditions</a>.
                <span class="text-red-500">*</span>
              </label>
            </div>
          </div>
        </section>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            id="submit-application"
            class="flex-1 btn-primary py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit volunteer application"
          >
            <span class="submit-text">Submit Application</span>
            <span class="submit-loading hidden">
              <span class="inline-block animate-spin mr-2">⏳</span>
              Submitting...
            </span>
          </button>
          <button
            type="reset"
            class="btn-outline py-4 text-lg font-semibold rounded-xl transition-all"
            aria-label="Reset form"
          >
            Reset Form
          </button>
        </div>

        <!-- Security Notice -->
        <div class="text-center text-sm text-gray-500 pt-4">
          <div class="flex items-center justify-center gap-2">
            ${icons.shield}
            <span>Your information is secure and will only be used for volunteer coordination.</span>
          </div>
        </div>
      </form>

      <!-- Success Message (Hidden by default) -->
      <div id="application-success" class="hidden">
        <div class="text-center py-12">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h3>
          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Thank you for your interest in volunteering with us. We've received your application
            and will review it shortly. You'll receive a confirmation email at the address you provided.
          </p>
          <p class="text-gray-600 mb-8">
            Our volunteer coordinator will contact you within 3-5 business days to discuss next steps.
          </p>
          <button
            id="submit-another"
            class="btn-primary px-8 py-3 rounded-xl"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    </div>
  `;

  // Initialize form after rendering
  setTimeout(() => initializeForm(container), 0);

  return container;
}

/**
 * Render skills categories
 * 
 * @returns {string} HTML string for skills categories
 */
function renderSkillsCategories() {
  return skillsCategories
    .map(
      ({ category, skills }) => `
    <div class="skills-category">
      <h4 class="font-semibold text-gray-900 mb-3">${category}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${skills
          .map(
            (skill) => `
          <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
            <input
              type="checkbox"
              name="skills"
              value="${skill}"
              class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span class="text-sm text-gray-700">${skill}</span>
          </label>
        `
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Render availability options
 * 
 * @returns {string} HTML string for availability options
 */
function renderAvailabilityOptions() {
  return availabilityOptions
    .map(
      ({ value, label }) => `
    <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
      <input
        type="checkbox"
        name="availability"
        value="${value}"
        class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
      />
      <span class="text-sm font-medium text-gray-700">${label}</span>
    </label>
  `
    )
    .join('');
}

/**
 * Render commitment options
 * 
 * @returns {string} HTML string for commitment options
 */
function renderCommitmentOptions() {
  return commitmentOptions
    .map(
      ({ value, label, description }) => `
    <label class="commitment-option relative flex flex-col p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
      <input
        type="radio"
        name="commitment"
        value="${value}"
        class="absolute top-4 right-4 w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
        required
      />
      <span class="font-semibold text-gray-900 mb-1 pr-8">${label}</span>
      <span class="text-sm text-gray-600">${description}</span>
    </label>
  `
    )
    .join('');
}

/**
 * Render role preferences
 * 
 * @returns {string} HTML string for role preferences
 */
function renderRolePreferences() {
  const roles = [
    'Education & Tutoring',
    'Healthcare Support',
    'Arts & Recreation',
    'Fundraising & Events',
    'Administrative Support',
    'Community Outreach',
    'Mentoring',
    'Technology Support',
  ];

  return roles
    .map(
      (role) => `
    <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
      <input
        type="checkbox"
        name="roles"
        value="${role}"
        class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
      />
      <span class="text-sm font-medium text-gray-700">${role}</span>
    </label>
  `
    )
    .join('');
}

/**
 * Initialize form functionality
 * 
 * @param {HTMLElement} container - Form container element
 */
function initializeForm(container) {
  const form = container.querySelector('#volunteer-application-form');
  if (!form) return;

  // Setup character counters
  setupCharacterCounters(form);

  // Setup real-time validation
  setupRealtimeValidation(form);

  // Setup form submission
  setupFormSubmission(form, container);

  // Setup reset functionality
  setupFormReset(form);

  // Setup submit another button
  setupSubmitAnother(container);
}

/**
 * Setup character counters for textareas
 * 
 * @param {HTMLFormElement} form - Form element
 */
function setupCharacterCounters(form) {
  const textareas = [
    { id: 'motivation', counterId: 'motivation-counter' },
    { id: 'experience', counterId: 'experience-counter' },
    { id: 'references', counterId: 'references-counter' },
  ];

  textareas.forEach(({ id, counterId }) => {
    const textarea = form.querySelector(`#${id}`);
    const counter = form.querySelector(`#${counterId}`);

    if (textarea && counter) {
      const updateCounter = () => {
        const length = textarea.value.length;
        const maxLength = textarea.getAttribute('maxlength') || 1000;
        counter.textContent = `${length} / ${maxLength}`;

        if (length > maxLength * 0.9) {
          counter.classList.add('text-red-600');
        } else {
          counter.classList.remove('text-red-600');
        }
      };

      textarea.addEventListener('input', updateCounter);
      updateCounter();
    }
  });
}

/**
 * Setup real-time validation for form fields
 * 
 * @param {HTMLFormElement} form - Form element
 */
function setupRealtimeValidation(form) {
  const validators = [];

  // Email validation
  const emailField = form.querySelector('#email');
  if (emailField) {
    validators.push(
      createFieldValidator(emailField, (value) => validateEmail(value), 500)
    );
  }

  // Phone validation
  const phoneField = form.querySelector('#phone');
  if (phoneField) {
    validators.push(
      createFieldValidator(phoneField, (value) => validateRequired(value, 'Phone', validationRules.phone), 500)
    );
  }

  // Store validators for cleanup
  form._validators = validators;
}

/**
 * Setup form submission handling
 * 
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLElement} container - Container element
 */
function setupFormSubmission(form, container) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (formState.isSubmitting) return;

    // Clear previous errors
    clearFormErrors(form);

    // Collect form data
    const formData = collectFormData(form);

    // Validate form
    const validation = validateApplicationForm(formData);

    if (!validation.isValid) {
      displayFormErrors(form, validation.errors);
      return;
    }

    // Submit form
    await submitApplication(formData, form, container);
  });
}

/**
 * Collect form data
 * 
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Form data object
 */
function collectFormData(form) {
  const formData = new FormData(form);
  const data = {};

  // Collect text fields
  for (const [key, value] of formData.entries()) {
    if (key !== 'skills' && key !== 'availability' && key !== 'roles') {
      data[key] = value;
    }
  }

  // Collect multi-select fields
  data.skills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(
    (input) => input.value
  );
  data.availability = Array.from(
    form.querySelectorAll('input[name="availability"]:checked')
  ).map((input) => input.value);
  data.roles = Array.from(form.querySelectorAll('input[name="roles"]:checked')).map(
    (input) => input.value
  );

  return data;
}

/**
 * Validate application form
 * 
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
function validateApplicationForm(formData) {
  const validation = validateForm(formData, validationRules);

  // Additional custom validations
  if (!formData.agreement) {
    validation.isValid = false;
    validation.errors.agreement = 'You must agree to the terms and conditions';
  }

  if (formData.skills.length === 0) {
    validation.isValid = false;
    validation.errors.skills = 'Please select at least one skill';
  }

  if (formData.availability.length === 0) {
    validation.isValid = false;
    validation.errors.availability = 'Please select at least one availability option';
  }

  return validation;
}

/**
 * Submit application
 * 
 * @param {Object} formData - Form data to submit
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLElement} container - Container element
 */
async function submitApplication(formData, form, container) {
  formState.isSubmitting = true;

  const submitButton = form.querySelector('#submit-application');
  const submitText = submitButton.querySelector('.submit-text');
  const submitLoading = submitButton.querySelector('.submit-loading');

  // Update button state
  submitButton.disabled = true;
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');

  try {
    // Simulate API call (replace with actual endpoint)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log submission for development
    console.log('Volunteer application submitted:', formData);

    // Show success message
    showSuccessMessage(container);

    // Reset form state
    formState.selectedSkills.clear();
    formState.selectedAvailability.clear();
    formState.selectedRoles.clear();
  } catch (error) {
    console.error('Application submission error:', error);

    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.className =
      'bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-800';
    errorDiv.innerHTML = `
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="font-semibold mb-1">Submission Failed</p>
          <p class="text-sm">
            We encountered an error submitting your application. Please try again or contact us directly.
          </p>
        </div>
      </div>
    `;
    form.insertBefore(errorDiv, form.firstChild);

    // Auto-remove error after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
  } finally {
    formState.isSubmitting = false;
    submitButton.disabled = false;
    submitText.classList.remove('hidden');
    submitLoading.classList.add('hidden');
  }
}

/**
 * Show success message
 * 
 * @param {HTMLElement} container - Container element
 */
function showSuccessMessage(container) {
  const form = container.querySelector('#volunteer-application-form');
  const success = container.querySelector('#application-success');

  if (form && success) {
    form.classList.add('hidden');
    success.classList.remove('hidden');

    // Scroll to top
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Setup form reset functionality
 * 
 * @param {HTMLFormElement} form - Form element
 */
function setupFormReset(form) {
  form.addEventListener('reset', () => {
    // Clear form state
    formState.selectedSkills.clear();
    formState.selectedAvailability.clear();
    formState.selectedRoles.clear();

    // Clear errors
    clearFormErrors(form);

    // Reset character counters
    setTimeout(() => {
      const counters = form.querySelectorAll('[id$="-counter"]');
      counters.forEach((counter) => {
        const textarea = form.querySelector(
          `#${counter.id.replace('-counter', '')}`
        );
        if (textarea) {
          const maxLength = textarea.getAttribute('maxlength') || 1000;
          counter.textContent = `0 / ${maxLength}`;
          counter.classList.remove('text-red-600');
        }
      });
    }, 0);
  });
}

/**
 * Setup submit another button
 * 
 * @param {HTMLElement} container - Container element
 */
function setupSubmitAnother(container) {
  const submitAnotherBtn = container.querySelector('#submit-another');
  if (!submitAnotherBtn) return;

  submitAnotherBtn.addEventListener('click', () => {
    const form = container.querySelector('#volunteer-application-form');
    const success = container.querySelector('#application-success');

    if (form && success) {
      success.classList.add('hidden');
      form.classList.remove('hidden');
      form.reset();

      // Scroll to top
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/**
 * Export component
 */
export default createVolunteerApplication;