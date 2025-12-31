/**
 * Contact Content Data Module
 * 
 * Centralized content management for contact section including:
 * - NGO contact information (address, phone, email, hours)
 * - Social media platform details and URLs
 * - Contact form configuration and validation rules
 * - Map integration settings
 * - Email notification templates
 * 
 * This module provides structured data for easy content management
 * and localization support.
 * 
 * @module contactContent
 */

/**
 * NGO Contact Information
 * Complete contact details for the Makoko Community Kids NGO
 */
export const contactInfo = {
  organization: {
    name: 'Makoko Community Kids NGO',
    tagline: 'Empowering Children, Building Futures',
    registrationNumber: 'NGO-LAG-2020-12345',
  },
  
  address: {
    street: '123 Makoko Waterfront',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100001',
    formatted: '123 Makoko Waterfront, Lagos, Lagos State, Nigeria 100001',
  },
  
  phone: {
    primary: '+234 803 456 7890',
    secondary: '+234 803 456 7891',
    formatted: '+234 803 456 7890',
    international: '+2348034567890',
  },
  
  email: {
    general: 'info@makokokids.org',
    donations: 'donate@makokokids.org',
    volunteer: 'volunteer@makokokids.org',
    media: 'media@makokokids.org',
    support: 'support@makokokids.org',
  },
  
  hours: {
    weekdays: {
      days: 'Monday - Friday',
      hours: '9:00 AM - 5:00 PM',
      formatted: 'Monday - Friday: 9:00 AM - 5:00 PM',
    },
    saturday: {
      days: 'Saturday',
      hours: '10:00 AM - 2:00 PM',
      formatted: 'Saturday: 10:00 AM - 2:00 PM',
    },
    sunday: {
      days: 'Sunday',
      hours: 'Closed',
      formatted: 'Sunday: Closed',
    },
    emergency: {
      note: 'For urgent matters, please call our emergency line',
      available: '24/7 Emergency Support Available',
    },
  },
  
  coordinates: {
    lat: 6.4969,
    lng: 3.3903,
    zoom: 15,
    mapType: 'roadmap',
  },
};

/**
 * Social Media Platform Configuration
 * URLs, handles, and display settings for all social platforms
 */
export const socialMedia = {
  platforms: [
    {
      id: 'facebook',
      name: 'Facebook',
      handle: '@makokocommunitykids',
      url: 'https://facebook.com/makokocommunitykids',
      displayUrl: 'facebook.com/makokocommunitykids',
      color: 'blue',
      colorClass: 'text-blue-600 hover:text-blue-700',
      bgColorClass: 'bg-blue-50 hover:bg-blue-100',
      buttonColorClass: 'bg-blue-600 hover:bg-blue-700',
      followers: '12.5K',
      verified: true,
      active: true,
      priority: 1,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@makokocommunitykids',
      url: 'https://instagram.com/makokocommunitykids',
      displayUrl: 'instagram.com/makokocommunitykids',
      color: 'pink',
      colorClass: 'text-pink-600 hover:text-pink-700',
      bgColorClass: 'bg-pink-50 hover:bg-pink-100',
      buttonColorClass: 'bg-pink-600 hover:bg-pink-700',
      followers: '8.3K',
      verified: true,
      active: true,
      priority: 2,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      handle: '@makokokids',
      url: 'https://twitter.com/makokokids',
      displayUrl: 'twitter.com/makokokids',
      color: 'sky',
      colorClass: 'text-sky-600 hover:text-sky-700',
      bgColorClass: 'bg-sky-50 hover:bg-sky-100',
      buttonColorClass: 'bg-sky-500 hover:bg-sky-600',
      followers: '5.7K',
      verified: false,
      active: true,
      priority: 3,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Makoko Community Kids',
      url: 'https://linkedin.com/company/makoko-community-kids',
      displayUrl: 'linkedin.com/company/makoko-community-kids',
      color: 'blue',
      colorClass: 'text-blue-700 hover:text-blue-800',
      bgColorClass: 'bg-blue-50 hover:bg-blue-100',
      buttonColorClass: 'bg-blue-700 hover:bg-blue-800',
      followers: '3.2K',
      verified: true,
      active: true,
      priority: 4,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@MakokoKids',
      url: 'https://youtube.com/@MakokoKids',
      displayUrl: 'youtube.com/@MakokoKids',
      color: 'red',
      colorClass: 'text-red-600 hover:text-red-700',
      bgColorClass: 'bg-red-50 hover:bg-red-100',
      buttonColorClass: 'bg-red-600 hover:bg-red-700',
      followers: '2.1K',
      verified: false,
      active: true,
      priority: 5,
    },
  ],
  
  feeds: {
    facebook: {
      enabled: true,
      widgetType: 'page',
      showPosts: true,
      postsLimit: 5,
      privacyMode: true,
    },
    instagram: {
      enabled: true,
      widgetType: 'profile',
      showPosts: true,
      postsLimit: 6,
      privacyMode: true,
    },
    twitter: {
      enabled: true,
      widgetType: 'timeline',
      showPosts: true,
      postsLimit: 5,
      privacyMode: true,
    },
    linkedin: {
      enabled: false,
      widgetType: 'company',
      showPosts: false,
      postsLimit: 0,
      privacyMode: true,
    },
  },
  
  sharing: {
    enabled: true,
    message: 'Share our mission and help us reach more people',
    hashtags: ['MakokoKids', 'EducationForAll', 'LagosNGO', 'CommunityDevelopment'],
    defaultShareText: 'Support Makoko Community Kids NGO in empowering children through education and community development.',
  },
};

/**
 * Contact Form Configuration
 * Field definitions, validation rules, and submission settings
 */
export const contactForm = {
  fields: {
    name: {
      id: 'contact-name',
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s\'-]+$',
      errorMessages: {
        required: 'Please enter your full name',
        minLength: 'Name must be at least 2 characters',
        maxLength: 'Name must not exceed 100 characters',
        pattern: 'Please enter a valid name',
      },
    },
    
    email: {
      id: 'contact-email',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'john@example.com',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      errorMessages: {
        required: 'Please enter your email address',
        pattern: 'Please enter a valid email address',
      },
    },
    
    phone: {
      id: 'contact-phone',
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '+234 803 456 7890',
      required: false,
      pattern: '^[+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,9}$',
      errorMessages: {
        pattern: 'Please enter a valid phone number',
      },
    },
    
    subject: {
      id: 'contact-subject',
      name: 'subject',
      type: 'select',
      label: 'Subject',
      required: true,
      options: [
        { value: '', label: 'Select a subject', disabled: true },
        { value: 'general', label: 'General Inquiry' },
        { value: 'volunteer', label: 'Volunteer Opportunities' },
        { value: 'donation', label: 'Donation Information' },
        { value: 'partnership', label: 'Partnership Opportunities' },
        { value: 'media', label: 'Media Inquiry' },
        { value: 'feedback', label: 'Feedback' },
        { value: 'support', label: 'Support Request' },
        { value: 'other', label: 'Other' },
      ],
      errorMessages: {
        required: 'Please select a subject',
      },
    },
    
    message: {
      id: 'contact-message',
      name: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Tell us how we can help you...',
      required: true,
      minLength: 10,
      maxLength: 1000,
      rows: 5,
      errorMessages: {
        required: 'Please enter your message',
        minLength: 'Message must be at least 10 characters',
        maxLength: 'Message must not exceed 1000 characters',
      },
    },
    
    honeypot: {
      id: 'contact-website',
      name: 'website',
      type: 'text',
      label: 'Website',
      required: false,
      hidden: true,
      spamProtection: true,
    },
  },
  
  validation: {
    enabled: true,
    realTime: true,
    showErrorsOnBlur: true,
    showErrorsOnSubmit: true,
    scrollToFirstError: true,
  },
  
  submission: {
    endpoint: '/api/contact',
    method: 'POST',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    successRedirect: null,
    resetOnSuccess: true,
  },
  
  spamProtection: {
    honeypot: true,
    reCaptcha: {
      enabled: false,
      siteKey: '',
      version: 'v3',
      action: 'contact_form',
      threshold: 0.5,
    },
    rateLimit: {
      enabled: true,
      maxSubmissions: 3,
      timeWindow: 3600000, // 1 hour in milliseconds
    },
  },
  
  notifications: {
    email: {
      enabled: true,
      recipients: ['info@makokokids.org', 'support@makokokids.org'],
      subject: 'New Contact Form Submission - Makoko Community Kids',
      replyTo: true,
      autoReply: {
        enabled: true,
        subject: 'Thank you for contacting Makoko Community Kids',
        template: 'contact-auto-reply',
      },
    },
    slack: {
      enabled: false,
      webhookUrl: '',
      channel: '#contact-forms',
    },
  },
  
  messages: {
    success: {
      title: 'Message Sent Successfully!',
      text: 'Thank you for contacting us. We\'ll get back to you within 24-48 hours.',
      icon: 'checkCircle',
    },
    error: {
      title: 'Error Sending Message',
      text: 'There was a problem sending your message. Please try again or contact us directly via email.',
      icon: 'alertCircle',
    },
    loading: {
      text: 'Sending your message...',
    },
  },
  
  privacy: {
    notice: 'Your information is secure and will only be used to respond to your inquiry. We respect your privacy and will never share your details with third parties.',
    policyUrl: '/privacy-policy',
    termsUrl: '/terms-of-service',
  },
};

/**
 * Google Maps Configuration
 * Settings for embedded map display and interactions
 */
export const mapConfig = {
  apiKey: '', // Set via environment variable in production
  
  embed: {
    enabled: true,
    width: '100%',
    height: '400px',
    zoom: 15,
    mapType: 'roadmap',
    language: 'en',
    region: 'NG',
  },
  
  marker: {
    title: 'Makoko Community Kids NGO',
    label: 'Makoko Kids',
    icon: null, // Use default marker
  },
  
  directions: {
    enabled: true,
    buttonText: 'Get Directions',
    mode: 'driving', // driving, walking, bicycling, transit
  },
  
  features: {
    streetView: true,
    fullscreen: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    rotateControl: false,
  },
  
  styles: [], // Custom map styles (optional)
  
  fallback: {
    staticMapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}&zoom=15&size=600x400&markers=color:red%7C${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`,
    alternativeText: 'View our location on Google Maps',
  },
};

/**
 * Email Templates for Notifications
 * HTML and text templates for automated emails
 */
export const emailTemplates = {
  contactSubmission: {
    subject: 'New Contact Form Submission - Makoko Community Kids',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p>You have received a new message from the contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{{name}}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{{email}}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{{phone}}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{{subject}}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">{{message}}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Submitted:</td>
            <td style="padding: 10px;">{{timestamp}}</td>
          </tr>
        </table>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This is an automated notification from the Makoko Community Kids website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

Submitted: {{timestamp}}

---
This is an automated notification from the Makoko Community Kids website contact form.
    `,
  },
  
  autoReply: {
    subject: 'Thank you for contacting Makoko Community Kids',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank You for Reaching Out!</h2>
        
        <p>Dear {{name}},</p>
        
        <p>Thank you for contacting Makoko Community Kids NGO. We have received your message and appreciate you taking the time to reach out to us.</p>
        
        <p>Our team will review your inquiry and respond within 24-48 hours. If your matter is urgent, please feel free to call us directly at <strong>+234 803 456 7890</strong>.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Your Message Summary:</h3>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong> {{message}}</p>
        </div>
        
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Learn more about our <a href="https://makokokids.org/programs" style="color: #2563eb;">programs and initiatives</a></li>
          <li>Explore <a href="https://makokokids.org/volunteer" style="color: #2563eb;">volunteer opportunities</a></li>
          <li>Make a <a href="https://makokokids.org/donate" style="color: #2563eb;">donation</a> to support our work</li>
          <li>Follow us on social media for updates</li>
        </ul>
        
        <p>Thank you for your interest in supporting the children of Makoko!</p>
        
        <p>Best regards,<br>
        <strong>The Makoko Community Kids Team</strong></p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Makoko Community Kids NGO<br>
          123 Makoko Waterfront, Lagos, Nigeria<br>
          Phone: +234 803 456 7890<br>
          Email: info@makokokids.org<br>
          Website: www.makokokids.org
        </p>
      </div>
    `,
    text: `
Thank You for Reaching Out!

Dear {{name}},

Thank you for contacting Makoko Community Kids NGO. We have received your message and appreciate you taking the time to reach out to us.

Our team will review your inquiry and respond within 24-48 hours. If your matter is urgent, please feel free to call us directly at +234 803 456 7890.

Your Message Summary:
Subject: {{subject}}
Message: {{message}}

In the meantime, feel free to:
- Learn more about our programs and initiatives
- Explore volunteer opportunities
- Make a donation to support our work
- Follow us on social media for updates

Thank you for your interest in supporting the children of Makoko!

Best regards,
The Makoko Community Kids Team

---
Makoko Community Kids NGO
123 Makoko Waterfront, Lagos, Nigeria
Phone: +234 803 456 7890
Email: info@makokokids.org
Website: www.makokokids.org
    `,
  },
};

/**
 * Content Sections for Contact Page
 * Additional content blocks and messaging
 */
export const contentSections = {
  header: {
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you. Whether you want to volunteer, donate, or learn more about our work, we\'re here to help.',
  },
  
  emergency: {
    enabled: true,
    message: 'For urgent matters, please call us directly at',
    phone: contactInfo.phone.primary,
    icon: 'info',
  },
  
  socialConnect: {
    title: 'Connect With Us',
    description: 'Follow us on social media to stay updated on our latest programs, events, and success stories.',
    callToAction: 'Share our mission and help us reach more people',
  },
  
  officeVisit: {
    enabled: true,
    title: 'Visit Our Office',
    description: 'We welcome visitors to our office. Please call ahead to schedule an appointment.',
    note: 'Office visits are by appointment only to ensure we can give you our full attention.',
  },
};

/**
 * Accessibility Configuration
 * ARIA labels and screen reader content
 */
export const accessibility = {
  labels: {
    contactSection: 'Contact information and form',
    contactForm: 'Contact form',
    socialMedia: 'Social media links',
    map: 'Google Maps showing our office location in Makoko, Lagos',
    directions: 'Get directions to our office',
  },
  
  announcements: {
    formSubmitting: 'Submitting your message, please wait',
    formSuccess: 'Your message has been sent successfully',
    formError: 'There was an error sending your message',
    mapLoading: 'Loading map',
    mapLoaded: 'Map loaded successfully',
  },
};

/**
 * Export all contact content as default object
 */
export default {
  contactInfo,
  socialMedia,
  contactForm,
  mapConfig,
  emailTemplates,
  contentSections,
  accessibility,
};