import { icons } from '../utils/icons.js';

/**
 * ContactSection Component
 * 
 * Comprehensive contact section with NGO information, embedded Google Maps,
 * contact form with validation, and social media integration.
 * 
 * Features:
 * - Contact information display (address, phone, email, hours)
 * - Embedded Google Maps showing Lagos office location
 * - Contact form with client-side validation
 * - Social media links and integration
 * - Responsive design for mobile optimization
 * - Accessibility compliance with ARIA labels
 * 
 * @returns {string} HTML string for the contact section
 */
export function ContactSection() {
  const contactInfo = {
    address: {
      street: '123 Makoko Waterfront',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      postalCode: '100001',
    },
    phone: '+234 803 456 7890',
    email: 'info@makokokids.org',
    hours: {
      weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
      saturday: 'Saturday: 10:00 AM - 2:00 PM',
      sunday: 'Sunday: Closed',
    },
    coordinates: {
      lat: 6.4969,
      lng: 3.3903,
    },
  };

  const socialMedia = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/makokokids',
      icon: icons.facebook,
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/makokokids',
      icon: icons.instagram,
      color: 'text-pink-600 hover:text-pink-700',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/makokokids',
      icon: icons.twitter,
      color: 'text-sky-600 hover:text-sky-700',
      bgColor: 'bg-sky-50 hover:bg-sky-100',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/makokokids',
      icon: icons.linkedin,
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
  ];

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7234567890123!2d${contactInfo.coordinates.lng}!3d${contactInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjknNDguOCJOIDPCsDIzJzI1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng`;

  return `
    <section id="contact" class="section-container bg-gradient-to-br from-gray-50 via-white to-blue-50" aria-labelledby="contact-heading">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <header class="text-center mb-16">
          <h2 id="contact-heading" class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you want to volunteer, donate, or learn more about our work, 
            we're here to help.
          </p>
        </header>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Contact Information & Map -->
          <div class="space-y-8">
            <!-- Contact Details Card -->
            <div class="card p-8 space-y-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <!-- Address -->
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  ${icons.mapPin}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Office Address</h4>
                  <address class="text-gray-600 not-italic leading-relaxed">
                    ${contactInfo.address.street}<br>
                    ${contactInfo.address.city}, ${contactInfo.address.state}<br>
                    ${contactInfo.address.country} ${contactInfo.address.postalCode}
                  </address>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  ${icons.phone}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a 
                    href="tel:${contactInfo.phone.replace(/\s/g, '')}" 
                    class="text-gray-600 hover:text-primary-600 transition-colors"
                    aria-label="Call us at ${contactInfo.phone}"
                  >
                    ${contactInfo.phone}
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  ${icons.mail}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                  <a 
                    href="mailto:${contactInfo.email}" 
                    class="text-gray-600 hover:text-primary-600 transition-colors break-all"
                    aria-label="Email us at ${contactInfo.email}"
                  >
                    ${contactInfo.email}
                  </a>
                </div>
              </div>

              <!-- Office Hours -->
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  ${icons.clock}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Office Hours</h4>
                  <div class="text-gray-600 space-y-1 text-sm">
                    <p>${contactInfo.hours.weekdays}</p>
                    <p>${contactInfo.hours.saturday}</p>
                    <p>${contactInfo.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Google Maps Embed -->
            <div class="card overflow-hidden">
              <div class="aspect-w-16 aspect-h-12 bg-gray-200">
                <iframe
                  src="${mapEmbedUrl}"
                  width="100%"
                  height="100%"
                  style="border:0; min-height: 400px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Makoko Community Kids NGO Office Location in Lagos"
                  aria-label="Google Maps showing our office location in Makoko, Lagos"
                ></iframe>
              </div>
              <div class="p-4 bg-gray-50 border-t border-gray-200">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  aria-label="Get directions to our office"
                >
                  ${icons.navigation}
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            <!-- Social Media Links -->
            <div class="card p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                ${socialMedia
                  .map(
                    (social) => `
                  <a
                    href="${social.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center gap-3 p-4 rounded-xl ${social.bgColor} transition-all hover:scale-105 hover:shadow-md"
                    aria-label="Visit our ${social.name} page"
                  >
                    <div class="w-10 h-10 ${social.color} transition-colors">
                      ${social.icon}
                    </div>
                    <span class="text-sm font-semibold text-gray-700">${social.name}</span>
                  </a>
                `
                  )
                  .join('')}
              </div>
              <p class="text-sm text-gray-600 mt-6 text-center">
                Follow us on social media to stay updated on our latest programs, events, and success stories.
              </p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="card p-8 lg:p-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            
            <form id="contact-form" class="space-y-6" novalidate>
              <!-- Name Field -->
              <div>
                <label for="contact-name" class="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span class="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="John Doe"
                  aria-required="true"
                  aria-describedby="contact-name-error"
                />
                <div id="contact-name-error" class="form-error hidden" role="alert">
                  ${icons.alertCircle}
                  <span></span>
                </div>
              </div>

              <!-- Email Field -->
              <div>
                <label for="contact-email" class="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span class="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="john@example.com"
                  aria-required="true"
                  aria-describedby="contact-email-error"
                />
                <div id="contact-email-error" class="form-error hidden" role="alert">
                  ${icons.alertCircle}
                  <span></span>
                </div>
              </div>

              <!-- Phone Field -->
              <div>
                <label for="contact-phone" class="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="+234 803 456 7890"
                  aria-describedby="contact-phone-error"
                />
                <div id="contact-phone-error" class="form-error hidden" role="alert">
                  ${icons.alertCircle}
                  <span></span>
                </div>
              </div>

              <!-- Subject Field -->
              <div>
                <label for="contact-subject" class="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span class="text-red-500" aria-label="required">*</span>
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  aria-required="true"
                  aria-describedby="contact-subject-error"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="donation">Donation Information</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="media">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
                <div id="contact-subject-error" class="form-error hidden" role="alert">
                  ${icons.alertCircle}
                  <span></span>
                </div>
              </div>

              <!-- Message Field -->
              <div>
                <label for="contact-message" class="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span class="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-y"
                  placeholder="Tell us how we can help you..."
                  aria-required="true"
                  aria-describedby="contact-message-error"
                ></textarea>
                <div id="contact-message-error" class="form-error hidden" role="alert">
                  ${icons.alertCircle}
                  <span></span>
                </div>
              </div>

              <!-- Honeypot Field (Spam Protection) -->
              <div class="hidden" aria-hidden="true">
                <label for="contact-website">Website</label>
                <input
                  type="text"
                  id="contact-website"
                  name="website"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <!-- Privacy Notice -->
              <div class="payment-info-box">
                <div class="info-icon flex-shrink-0">
                  ${icons.shield}
                </div>
                <div class="info-content">
                  <p class="text-sm">
                    Your information is secure and will only be used to respond to your inquiry. 
                    We respect your privacy and will never share your details with third parties.
                  </p>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full btn-primary py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                aria-label="Send message"
              >
                <span class="flex items-center justify-center gap-2">
                  ${icons.send}
                  <span>Send Message</span>
                </span>
              </button>

              <!-- Success Message -->
              <div id="contact-success" class="hidden p-4 bg-green-50 border border-green-200 rounded-xl" role="alert">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 text-green-600">
                    ${icons.checkCircle}
                  </div>
                  <div>
                    <h4 class="font-semibold text-green-900 mb-1">Message Sent Successfully!</h4>
                    <p class="text-sm text-green-700">
                      Thank you for contacting us. We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div id="contact-error" class="hidden p-4 bg-red-50 border border-red-200 rounded-xl" role="alert">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 text-red-600">
                    ${icons.alertCircle}
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-900 mb-1">Error Sending Message</h4>
                    <p class="text-sm text-red-700">
                      There was a problem sending your message. Please try again or contact us directly via email.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mt-16 text-center">
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 border border-blue-200 rounded-full">
            <div class="text-blue-600">
              ${icons.info}
            </div>
            <p class="text-sm text-blue-900">
              <strong>Emergency Contact:</strong> For urgent matters, please call us directly at 
              <a href="tel:${contactInfo.phone.replace(/\s/g, '')}" class="font-semibold hover:underline">
                ${contactInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}