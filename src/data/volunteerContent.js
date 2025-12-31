/**
 * Volunteer Content Data Module
 * 
 * Centralized content management for volunteer opportunities, testimonials,
 * and application form configurations. Provides structured data for easy
 * content updates and role management.
 * 
 * @module data/volunteerContent
 * @version 1.0.0
 */

/**
 * Volunteer role categories with metadata
 * @constant {Object}
 */
export const ROLE_CATEGORIES = Object.freeze({
  EDUCATION: {
    id: 'education',
    label: 'Education',
    description: 'Teaching and tutoring opportunities',
    color: 'blue',
    icon: 'book',
  },
  HEALTHCARE: {
    id: 'healthcare',
    label: 'Healthcare',
    description: 'Health and wellness support',
    color: 'red',
    icon: 'heart',
  },
  NUTRITION: {
    id: 'nutrition',
    label: 'Nutrition',
    description: 'Food and nutrition programs',
    color: 'green',
    icon: 'utensils',
  },
  RECREATION: {
    id: 'recreation',
    label: 'Recreation',
    description: 'Sports and activities',
    color: 'orange',
    icon: 'sports',
  },
  MENTORSHIP: {
    id: 'mentorship',
    label: 'Mentorship',
    description: 'Youth guidance and support',
    color: 'yellow',
    icon: 'users',
  },
  ADMINISTRATION: {
    id: 'administration',
    label: 'Administration',
    description: 'Office and operational support',
    color: 'gray',
    icon: 'briefcase',
  },
  FUNDRAISING: {
    id: 'fundraising',
    label: 'Fundraising',
    description: 'Events and donor engagement',
    color: 'purple',
    icon: 'gift',
  },
  TECHNOLOGY: {
    id: 'technology',
    label: 'Technology',
    description: 'Digital skills and IT support',
    color: 'indigo',
    icon: 'computer',
  },
});

/**
 * Time commitment options
 * @constant {Object}
 */
export const TIME_COMMITMENTS = Object.freeze({
  ONE_TIME: {
    id: 'one-time',
    label: 'One-Time',
    description: 'Single event or project',
  },
  WEEKLY: {
    id: 'weekly',
    label: 'Weekly',
    description: 'Regular weekly commitment',
  },
  MONTHLY: {
    id: 'monthly',
    label: 'Monthly',
    description: 'Monthly engagement',
  },
  PROJECT_BASED: {
    id: 'project-based',
    label: 'Project-Based',
    description: 'Specific project duration',
  },
});

/**
 * Availability time slots
 * @constant {string[]}
 */
export const AVAILABILITY_SLOTS = Object.freeze([
  'Weekday Mornings',
  'Weekday Afternoons',
  'Weekday Evenings',
  'Weekends',
  'Flexible Schedule',
]);

/**
 * Volunteer role definitions
 * @constant {Object[]}
 */
export const VOLUNTEER_ROLES = Object.freeze([
  {
    id: 'education-tutor',
    title: 'Education Tutor',
    category: ROLE_CATEGORIES.EDUCATION.id,
    description: 'Help children with homework, reading, and basic academic skills. Make a direct impact on their educational journey through one-on-one and small group tutoring sessions.',
    timeCommitment: TIME_COMMITMENTS.WEEKLY.id,
    hoursPerWeek: '3-5 hours',
    skillsNeeded: [
      'Patience and empathy with children',
      'Basic teaching or tutoring skills',
      'English proficiency',
      'Subject knowledge (Math, English, Science)',
      'Ability to explain concepts clearly',
    ],
    requirements: [
      'Minimum age: 18 years',
      'Background check required',
      'Commitment of at least 3 months',
      'Attend volunteer orientation',
    ],
    impact: 'Support 5-10 children per session',
    location: 'Makoko Community Center',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: true,
    benefits: [
      'Make lasting impact on children\'s education',
      'Develop teaching and mentoring skills',
      'Join supportive volunteer community',
      'Receive volunteer certificate',
    ],
  },
  {
    id: 'health-assistant',
    title: 'Health & Wellness Assistant',
    category: ROLE_CATEGORIES.HEALTHCARE.id,
    description: 'Assist with health screenings, hygiene education, and basic first aid. Help maintain health records and coordinate medical visits for community members.',
    timeCommitment: TIME_COMMITMENTS.MONTHLY.id,
    hoursPerWeek: '4-6 hours',
    skillsNeeded: [
      'Healthcare background (preferred)',
      'First aid certification',
      'Good communication skills',
      'Compassion and cultural sensitivity',
      'Record-keeping abilities',
    ],
    requirements: [
      'Healthcare certification or training',
      'First aid/CPR certification',
      'Background check required',
      'Health screening clearance',
    ],
    impact: 'Serve 20-30 families monthly',
    location: 'Mobile Health Clinic',
    availability: ['Weekends', 'Flexible Schedule'],
    featured: false,
    benefits: [
      'Apply healthcare skills for community good',
      'Work with medical professionals',
      'Gain public health experience',
      'Professional development opportunities',
    ],
  },
  {
    id: 'nutrition-coordinator',
    title: 'Nutrition Program Coordinator',
    category: ROLE_CATEGORIES.NUTRITION.id,
    description: 'Help prepare and distribute nutritious meals. Educate families about healthy eating habits, food preparation, and nutrition for growing children.',
    timeCommitment: TIME_COMMITMENTS.WEEKLY.id,
    hoursPerWeek: '4-6 hours',
    skillsNeeded: [
      'Food handling knowledge',
      'Nutrition awareness',
      'Organizational skills',
      'Team collaboration',
      'Cultural sensitivity',
    ],
    requirements: [
      'Food handler certification (or willing to obtain)',
      'Background check required',
      'Physical ability to stand and lift',
      'Minimum 6-month commitment',
    ],
    impact: 'Feed 50+ children daily',
    location: 'Community Kitchen',
    availability: ['Weekday Mornings', 'Weekends'],
    featured: true,
    benefits: [
      'Combat childhood hunger directly',
      'Learn about nutrition and food systems',
      'Build community connections',
      'Hands-on program management experience',
    ],
  },
  {
    id: 'sports-coach',
    title: 'Sports & Recreation Coach',
    category: ROLE_CATEGORIES.RECREATION.id,
    description: 'Lead sports activities, games, and physical education sessions. Promote teamwork, discipline, and healthy lifestyles through engaging recreational programs.',
    timeCommitment: TIME_COMMITMENTS.WEEKLY.id,
    hoursPerWeek: '2-4 hours',
    skillsNeeded: [
      'Sports knowledge and experience',
      'Youth engagement skills',
      'Energy and enthusiasm',
      'Safety awareness',
      'Coaching or teaching ability',
    ],
    requirements: [
      'Sports coaching experience preferred',
      'Background check required',
      'First aid certification (or willing to obtain)',
      'Physical fitness',
    ],
    impact: 'Engage 15-25 children per session',
    location: 'Community Sports Field',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
    benefits: [
      'Share your passion for sports',
      'Promote healthy lifestyles',
      'Develop coaching skills',
      'Build youth confidence and teamwork',
    ],
  },
  {
    id: 'arts-instructor',
    title: 'Arts & Crafts Instructor',
    category: ROLE_CATEGORIES.EDUCATION.id,
    description: 'Teach creative skills through art, music, drama, or crafts. Foster creativity and self-expression in children while building confidence and fine motor skills.',
    timeCommitment: TIME_COMMITMENTS.WEEKLY.id,
    hoursPerWeek: '2-3 hours',
    skillsNeeded: [
      'Artistic or musical talent',
      'Teaching ability',
      'Creativity and patience',
      'Material preparation skills',
      'Classroom management',
    ],
    requirements: [
      'Arts background or experience',
      'Background check required',
      'Provide or help source materials',
      'Minimum 3-month commitment',
    ],
    impact: 'Inspire 10-15 children weekly',
    location: 'Community Center',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
    benefits: [
      'Share your creative talents',
      'Nurture children\'s artistic expression',
      'Develop teaching portfolio',
      'Access to art supplies and space',
    ],
  },
  {
    id: 'mentorship-guide',
    title: 'Youth Mentorship Guide',
    category: ROLE_CATEGORIES.MENTORSHIP.id,
    description: 'Provide one-on-one mentorship to teenagers. Guide them through personal development, career planning, and life skills while building lasting relationships.',
    timeCommitment: TIME_COMMITMENTS.MONTHLY.id,
    hoursPerWeek: '2-3 hours',
    skillsNeeded: [
      'Life experience and wisdom',
      'Active listening',
      'Career guidance knowledge',
      'Commitment and reliability',
      'Empathy and non-judgment',
    ],
    requirements: [
      'Minimum age: 25 years',
      'Background check required',
      'Mentorship training completion',
      'Minimum 1-year commitment',
    ],
    impact: 'Mentor 2-3 youth individually',
    location: 'Flexible (In-person or Virtual)',
    availability: ['Flexible Schedule'],
    featured: true,
    benefits: [
      'Make profound impact on young lives',
      'Develop mentoring skills',
      'Personal growth and reflection',
      'Ongoing mentor support and training',
    ],
  },
  {
    id: 'admin-support',
    title: 'Administrative Support Volunteer',
    category: ROLE_CATEGORIES.ADMINISTRATION.id,
    description: 'Assist with office tasks, data entry, donor communications, and event coordination. Help keep operations running smoothly behind the scenes.',
    timeCommitment: TIME_COMMITMENTS.PROJECT_BASED.id,
    hoursPerWeek: '3-5 hours',
    skillsNeeded: [
      'Computer literacy',
      'Organizational skills',
      'Attention to detail',
      'Communication skills',
      'Time management',
    ],
    requirements: [
      'Basic computer skills',
      'Background check required',
      'Reliable internet connection (for remote)',
      'Flexible availability',
    ],
    impact: 'Support entire organization',
    location: 'Remote or Office',
    availability: ['Flexible Schedule'],
    featured: false,
    benefits: [
      'Flexible remote opportunities',
      'Develop administrative skills',
      'Learn nonprofit operations',
      'Professional references available',
    ],
  },
  {
    id: 'fundraising-coordinator',
    title: 'Fundraising & Events Coordinator',
    category: ROLE_CATEGORIES.FUNDRAISING.id,
    description: 'Help plan and execute fundraising campaigns and community events. Engage donors and raise awareness about our mission through creative initiatives.',
    timeCommitment: TIME_COMMITMENTS.PROJECT_BASED.id,
    hoursPerWeek: '5-8 hours',
    skillsNeeded: [
      'Event planning experience',
      'Marketing knowledge',
      'Networking skills',
      'Creativity and initiative',
      'Project management',
    ],
    requirements: [
      'Event planning or fundraising experience',
      'Background check required',
      'Strong communication skills',
      'Flexible schedule during events',
    ],
    impact: 'Generate resources for programs',
    location: 'Remote or Office',
    availability: ['Flexible Schedule'],
    featured: false,
    benefits: [
      'Build fundraising portfolio',
      'Network with community leaders',
      'Event planning experience',
      'See direct impact of your efforts',
    ],
  },
  {
    id: 'tech-specialist',
    title: 'Technology & Digital Skills Trainer',
    category: ROLE_CATEGORIES.TECHNOLOGY.id,
    description: 'Teach basic computer skills, internet safety, and digital literacy. Help bridge the digital divide for children and families in the community.',
    timeCommitment: TIME_COMMITMENTS.WEEKLY.id,
    hoursPerWeek: '3-4 hours',
    skillsNeeded: [
      'Computer proficiency',
      'Teaching ability',
      'Patience with beginners',
      'Tech troubleshooting',
      'Curriculum development',
    ],
    requirements: [
      'Strong computer skills',
      'Background check required',
      'Teaching or training experience preferred',
      'Minimum 3-month commitment',
    ],
    impact: 'Train 8-12 students per session',
    location: 'Computer Lab',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
    benefits: [
      'Bridge the digital divide',
      'Develop training skills',
      'Empower through technology',
      'Access to teaching resources',
    ],
  },
]);

/**
 * Volunteer testimonials
 * @constant {Object[]}
 */
export const VOLUNTEER_TESTIMONIALS = Object.freeze([
  {
    id: 'testimonial-sarah',
    name: 'Sarah Johnson',
    role: 'Education Tutor',
    quote: 'Working with the children in Makoko has been the most rewarding experience of my life. Seeing their faces light up when they learn something new makes every moment worthwhile. The community has taught me as much as I\'ve taught them.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    duration: '2 years',
    location: 'Lagos, Nigeria',
    featured: true,
  },
  {
    id: 'testimonial-michael',
    name: 'Michael Chen',
    role: 'Healthcare Volunteer',
    quote: 'The healthcare program has transformed lives in ways I never imagined. From basic health screenings to nutrition education, we\'re making a real difference. The resilience and gratitude of the community inspire me every day.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    duration: '1 year',
    location: 'United Kingdom',
    featured: true,
  },
  {
    id: 'testimonial-amara',
    name: 'Amara Okafor',
    role: 'Community Development Volunteer',
    quote: 'Being part of the community development initiatives has shown me the power of grassroots change. We\'re not just providing services; we\'re empowering families to build better futures. This work has changed my perspective on what\'s possible.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    duration: '3 years',
    location: 'Lagos, Nigeria',
    featured: true,
  },
  {
    id: 'testimonial-david',
    name: 'David Martinez',
    role: 'Skills Training Volunteer',
    quote: 'Teaching vocational skills to young adults has been incredibly fulfilling. Watching them gain confidence and secure employment is amazing. The program doesn\'t just teach skills; it opens doors to new opportunities and dreams.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    duration: '18 months',
    location: 'United States',
    featured: false,
  },
  {
    id: 'testimonial-fatima',
    name: 'Fatima Adeyemi',
    role: 'Nutrition Program Volunteer',
    quote: 'Helping provide nutritious meals to children has been deeply meaningful. Every meal represents hope and health. The smiles and energy of well-fed children remind me why this work matters so much.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    duration: '8 months',
    location: 'Lagos, Nigeria',
    featured: false,
  },
  {
    id: 'testimonial-james',
    name: 'James Okonkwo',
    role: 'Youth Mentor',
    quote: 'Mentoring teenagers has been one of the most rewarding experiences. Watching them discover their potential and pursue their dreams is incredible. The relationships built through mentorship last a lifetime.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    duration: '2.5 years',
    location: 'Lagos, Nigeria',
    featured: false,
  },
]);

/**
 * Application form field configurations
 * @constant {Object[]}
 */
export const APPLICATION_FORM_FIELDS = Object.freeze([
  {
    id: 'full-name',
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    validation: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      errorMessage: 'Please enter a valid name',
    },
    section: 'personal',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Please enter a valid email address',
    },
    section: 'personal',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+234 XXX XXX XXXX',
    required: true,
    validation: {
      pattern: /^[\d\s+()-]+$/,
      minLength: 10,
      errorMessage: 'Please enter a valid phone number',
    },
    section: 'personal',
  },
  {
    id: 'location',
    name: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'City, Country',
    required: true,
    validation: {
      minLength: 2,
      maxLength: 100,
      errorMessage: 'Please enter your location',
    },
    section: 'personal',
  },
  {
    id: 'volunteer-role',
    name: 'volunteerRole',
    label: 'Preferred Volunteer Role',
    type: 'select',
    required: true,
    options: VOLUNTEER_ROLES.map(role => ({
      value: role.id,
      label: role.title,
    })),
    section: 'preferences',
  },
  {
    id: 'time-commitment',
    name: 'timeCommitment',
    label: 'Time Commitment',
    type: 'select',
    required: true,
    options: Object.values(TIME_COMMITMENTS).map(commitment => ({
      value: commitment.id,
      label: commitment.label,
    })),
    section: 'preferences',
  },
  {
    id: 'availability',
    name: 'availability',
    label: 'Availability',
    type: 'checkbox-group',
    required: true,
    options: AVAILABILITY_SLOTS.map(slot => ({
      value: slot,
      label: slot,
    })),
    validation: {
      minSelected: 1,
      errorMessage: 'Please select at least one availability option',
    },
    section: 'preferences',
  },
  {
    id: 'skills',
    name: 'skills',
    label: 'Relevant Skills & Experience',
    type: 'textarea',
    placeholder: 'Describe your relevant skills, experience, and qualifications...',
    required: true,
    validation: {
      minLength: 50,
      maxLength: 1000,
      errorMessage: 'Please provide at least 50 characters describing your skills',
    },
    rows: 4,
    section: 'qualifications',
  },
  {
    id: 'motivation',
    name: 'motivation',
    label: 'Why do you want to volunteer with us?',
    type: 'textarea',
    placeholder: 'Tell us what motivates you to volunteer...',
    required: true,
    validation: {
      minLength: 50,
      maxLength: 1000,
      errorMessage: 'Please provide at least 50 characters about your motivation',
    },
    rows: 4,
    section: 'qualifications',
  },
  {
    id: 'background-check',
    name: 'backgroundCheck',
    label: 'I consent to a background check',
    type: 'checkbox',
    required: true,
    validation: {
      errorMessage: 'Background check consent is required',
    },
    section: 'consent',
  },
  {
    id: 'terms',
    name: 'terms',
    label: 'I agree to the volunteer terms and conditions',
    type: 'checkbox',
    required: true,
    validation: {
      errorMessage: 'You must agree to the terms and conditions',
    },
    section: 'consent',
  },
]);

/**
 * Form sections configuration
 * @constant {Object[]}
 */
export const FORM_SECTIONS = Object.freeze([
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: 'user',
  },
  {
    id: 'preferences',
    title: 'Volunteer Preferences',
    description: 'Choose your role and availability',
    icon: 'calendar',
  },
  {
    id: 'qualifications',
    title: 'Skills & Motivation',
    description: 'Share your experience and goals',
    icon: 'star',
  },
  {
    id: 'consent',
    title: 'Consent & Agreement',
    description: 'Review and accept terms',
    icon: 'check',
  },
]);

/**
 * Volunteer program benefits
 * @constant {Object[]}
 */
export const PROGRAM_BENEFITS = Object.freeze([
  {
    id: 'impact',
    title: 'Make Real Impact',
    description: 'Directly improve lives in the Makoko community',
    icon: 'heart',
  },
  {
    id: 'skills',
    title: 'Develop Skills',
    description: 'Gain valuable experience and professional development',
    icon: 'growth',
  },
  {
    id: 'community',
    title: 'Join Community',
    description: 'Connect with like-minded volunteers and community members',
    icon: 'users',
  },
  {
    id: 'flexible',
    title: 'Flexible Options',
    description: 'Choose roles and schedules that fit your lifestyle',
    icon: 'clock',
  },
  {
    id: 'support',
    title: 'Ongoing Support',
    description: 'Receive training, resources, and volunteer coordination',
    icon: 'support',
  },
  {
    id: 'recognition',
    title: 'Recognition',
    description: 'Earn certificates and references for your contributions',
    icon: 'award',
  },
]);

/**
 * Volunteer statistics
 * @constant {Object[]}
 */
export const VOLUNTEER_STATISTICS = Object.freeze([
  {
    id: 'active-volunteers',
    value: 150,
    label: 'Active Volunteers',
    suffix: '+',
    icon: 'users',
  },
  {
    id: 'volunteer-hours',
    value: 5000,
    label: 'Volunteer Hours',
    suffix: '+',
    icon: 'clock',
  },
  {
    id: 'children-served',
    value: 300,
    label: 'Children Served',
    suffix: '+',
    icon: 'heart',
  },
  {
    id: 'programs',
    value: 9,
    label: 'Volunteer Programs',
    suffix: '',
    icon: 'star',
  },
]);

/**
 * FAQ items for volunteers
 * @constant {Object[]}
 */
export const VOLUNTEER_FAQ = Object.freeze([
  {
    id: 'faq-commitment',
    question: 'What is the minimum time commitment?',
    answer: 'Time commitments vary by role. Most positions require a minimum of 3 months, with weekly or monthly engagement. We also offer one-time and project-based opportunities for those with limited availability.',
  },
  {
    id: 'faq-requirements',
    question: 'What are the requirements to volunteer?',
    answer: 'Requirements vary by role but generally include being at least 18 years old, passing a background check, and attending volunteer orientation. Specific roles may require additional certifications or experience.',
  },
  {
    id: 'faq-training',
    question: 'Do you provide training?',
    answer: 'Yes! All volunteers receive comprehensive orientation and role-specific training. We provide ongoing support, resources, and professional development opportunities throughout your volunteer journey.',
  },
  {
    id: 'faq-remote',
    question: 'Can I volunteer remotely?',
    answer: 'Yes, we offer several remote volunteer opportunities including administrative support, fundraising coordination, and virtual mentorship. These roles provide flexibility while making meaningful impact.',
  },
  {
    id: 'faq-international',
    question: 'Can international volunteers apply?',
    answer: 'Absolutely! We welcome volunteers from around the world. Some roles can be performed remotely, while others may require travel to Lagos. We can provide guidance on visa requirements for in-person volunteering.',
  },
  {
    id: 'faq-costs',
    question: 'Are there any costs to volunteer?',
    answer: 'Volunteering with us is free. However, volunteers are responsible for their own transportation, meals, and any required certifications. We provide all necessary materials and resources for your role.',
  },
]);

/**
 * Get role by ID
 * @param {string} roleId - Role identifier
 * @returns {Object|null} Role object or null if not found
 */
export function getRoleById(roleId) {
  if (!roleId || typeof roleId !== 'string') {
    console.error('[volunteerContent] Invalid role ID provided:', roleId);
    return null;
  }

  const role = VOLUNTEER_ROLES.find(r => r.id === roleId);
  
  if (!role) {
    console.warn('[volunteerContent] Role not found:', roleId);
    return null;
  }

  return role;
}

/**
 * Get roles by category
 * @param {string} categoryId - Category identifier
 * @returns {Object[]} Array of roles in category
 */
export function getRolesByCategory(categoryId) {
  if (!categoryId || typeof categoryId !== 'string') {
    console.error('[volunteerContent] Invalid category ID provided:', categoryId);
    return [];
  }

  return VOLUNTEER_ROLES.filter(role => role.category === categoryId);
}

/**
 * Get featured roles
 * @returns {Object[]} Array of featured roles
 */
export function getFeaturedRoles() {
  return VOLUNTEER_ROLES.filter(role => role.featured === true);
}

/**
 * Get testimonial by ID
 * @param {string} testimonialId - Testimonial identifier
 * @returns {Object|null} Testimonial object or null if not found
 */
export function getTestimonialById(testimonialId) {
  if (!testimonialId || typeof testimonialId !== 'string') {
    console.error('[volunteerContent] Invalid testimonial ID provided:', testimonialId);
    return null;
  }

  const testimonial = VOLUNTEER_TESTIMONIALS.find(t => t.id === testimonialId);
  
  if (!testimonial) {
    console.warn('[volunteerContent] Testimonial not found:', testimonialId);
    return null;
  }

  return testimonial;
}

/**
 * Get featured testimonials
 * @returns {Object[]} Array of featured testimonials
 */
export function getFeaturedTestimonials() {
  return VOLUNTEER_TESTIMONIALS.filter(testimonial => testimonial.featured === true);
}

/**
 * Get form fields by section
 * @param {string} sectionId - Section identifier
 * @returns {Object[]} Array of form fields in section
 */
export function getFormFieldsBySection(sectionId) {
  if (!sectionId || typeof sectionId !== 'string') {
    console.error('[volunteerContent] Invalid section ID provided:', sectionId);
    return [];
  }

  return APPLICATION_FORM_FIELDS.filter(field => field.section === sectionId);
}

/**
 * Validate form field value
 * @param {string} fieldName - Field name
 * @param {*} value - Field value
 * @returns {Object} Validation result with isValid and errorMessage
 */
export function validateFormField(fieldName, value) {
  const field = APPLICATION_FORM_FIELDS.find(f => f.name === fieldName);
  
  if (!field) {
    return {
      isValid: false,
      errorMessage: 'Unknown field',
    };
  }

  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return {
      isValid: false,
      errorMessage: `${field.label} is required`,
    };
  }

  if (!field.validation) {
    return { isValid: true };
  }

  const { validation } = field;

  if (validation.minLength && value.length < validation.minLength) {
    return {
      isValid: false,
      errorMessage: validation.errorMessage || `Minimum length is ${validation.minLength}`,
    };
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return {
      isValid: false,
      errorMessage: `Maximum length is ${validation.maxLength}`,
    };
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    return {
      isValid: false,
      errorMessage: validation.errorMessage || 'Invalid format',
    };
  }

  if (validation.minSelected && Array.isArray(value) && value.length < validation.minSelected) {
    return {
      isValid: false,
      errorMessage: validation.errorMessage || `Select at least ${validation.minSelected}`,
    };
  }

  return { isValid: true };
}

export default {
  ROLE_CATEGORIES,
  TIME_COMMITMENTS,
  AVAILABILITY_SLOTS,
  VOLUNTEER_ROLES,
  VOLUNTEER_TESTIMONIALS,
  APPLICATION_FORM_FIELDS,
  FORM_SECTIONS,
  PROGRAM_BENEFITS,
  VOLUNTEER_STATISTICS,
  VOLUNTEER_FAQ,
  getRoleById,
  getRolesByCategory,
  getFeaturedRoles,
  getTestimonialById,
  getFeaturedTestimonials,
  getFormFieldsBySection,
  validateFormField,
};