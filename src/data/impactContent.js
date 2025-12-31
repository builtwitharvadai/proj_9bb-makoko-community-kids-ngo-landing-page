/**
 * Impact Content Data Module
 * 
 * Centralized content data for the Impact section including statistics,
 * testimonials, success stories, and photo gallery metadata. Provides
 * structured data for easy content management and dynamic loading.
 * 
 * @module data/impactContent
 */

/**
 * Impact statistics configuration
 * @constant {Object[]}
 */
export const IMPACT_STATISTICS = Object.freeze([
  {
    id: 'children-helped',
    value: 500,
    label: 'Children Helped',
    description: 'Students supported with education and resources',
    icon: 'users',
    category: 'reach',
    trend: '+15%',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'programs-run',
    value: 25,
    label: 'Active Programs',
    description: 'Educational and community development initiatives',
    icon: 'programs',
    category: 'services',
    trend: '+5',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'volunteers',
    value: 150,
    label: 'Volunteers',
    description: 'Dedicated community members making a difference',
    icon: 'volunteers',
    category: 'community',
    trend: '+20%',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'community-reach',
    value: 2000,
    label: 'Community Reach',
    description: 'Families impacted through our programs',
    icon: 'globe',
    category: 'reach',
    trend: '+30%',
    lastUpdated: '2024-01-01',
  },
]);

/**
 * Impact overview points highlighting key achievements
 * @constant {Object[]}
 */
export const IMPACT_POINTS = Object.freeze([
  {
    id: 'education-access',
    title: 'Education Access',
    description:
      'Providing quality education to children who would otherwise have no access to schooling',
    icon: 'book',
    priority: 1,
  },
  {
    id: 'skill-development',
    title: 'Skill Development',
    description:
      'Empowering youth with vocational training and life skills for sustainable futures',
    icon: 'tools',
    priority: 2,
  },
  {
    id: 'community-support',
    title: 'Community Support',
    description:
      'Building stronger families through health, nutrition, and social programs',
    icon: 'heart',
    priority: 3,
  },
  {
    id: 'future-leaders',
    title: 'Future Leaders',
    description:
      'Nurturing the next generation of community leaders and change-makers',
    icon: 'star',
    priority: 4,
  },
]);

/**
 * Testimonials from beneficiaries, volunteers, and parents
 * @constant {Object[]}
 */
export const TESTIMONIALS = Object.freeze([
  {
    id: 'testimonial-001',
    name: 'Chioma A.',
    role: 'Student, Age 14',
    type: 'beneficiary',
    quote:
      'This organization changed my life. I can now read and write, and I dream of becoming a teacher.',
    image: null,
    category: 'education',
    featured: true,
    date: '2023-11-15',
  },
  {
    id: 'testimonial-002',
    name: 'David O.',
    role: 'Volunteer Teacher',
    type: 'volunteer',
    quote:
      "Volunteering here has been the most rewarding experience. Seeing the children's progress fills my heart with joy.",
    image: null,
    category: 'volunteer',
    featured: true,
    date: '2023-10-20',
  },
  {
    id: 'testimonial-003',
    name: 'Mrs. Adebayo',
    role: 'Parent',
    type: 'parent',
    quote:
      'My daughter now has opportunities I never had. This program is giving our children hope for a better future.',
    image: null,
    category: 'parent',
    featured: true,
    date: '2023-12-05',
  },
  {
    id: 'testimonial-004',
    name: 'Tunde M.',
    role: 'Student, Age 16',
    type: 'beneficiary',
    quote:
      'I learned computer skills here and now I help teach younger students. Education opens doors.',
    image: null,
    category: 'education',
    featured: false,
    date: '2023-09-10',
  },
  {
    id: 'testimonial-005',
    name: 'Sarah L.',
    role: 'Healthcare Volunteer',
    type: 'volunteer',
    quote:
      'Providing healthcare to these children is incredibly fulfilling. Every child deserves access to basic health services.',
    image: null,
    category: 'health',
    featured: false,
    date: '2023-11-28',
  },
  {
    id: 'testimonial-006',
    name: 'Mr. Okonkwo',
    role: 'Community Leader',
    type: 'parent',
    quote:
      'This NGO has transformed our community. Our children have hope, and our families are stronger.',
    image: null,
    category: 'community',
    featured: false,
    date: '2023-12-12',
  },
]);

/**
 * Success stories showcasing transformative impact
 * @constant {Object[]}
 */
export const SUCCESS_STORIES = Object.freeze([
  {
    id: 'story-001',
    title: 'From Student to Teacher',
    subject: 'Emmanuel',
    age: 22,
    summary:
      'Emmanuel joined our program at age 10 with no formal education. Today, he has completed secondary school and returned to Makoko as a volunteer teacher.',
    beforeDescription:
      'At age 10, Emmanuel had never attended school and could not read or write. His family struggled to provide basic necessities.',
    afterDescription:
      'Now 22, Emmanuel has completed secondary school with honors and is pursuing higher education while teaching at our center.',
    impact: {
      yearsOfGrowth: 12,
      studentsTaught: 50,
      livesImpacted: 'Countless',
    },
    category: 'education',
    featured: true,
    images: {
      before: null,
      after: null,
    },
    timeline: [
      { year: 2012, event: 'Joined program at age 10' },
      { year: 2015, event: 'Learned to read and write' },
      { year: 2018, event: 'Completed primary education' },
      { year: 2022, event: 'Graduated secondary school' },
      { year: 2023, event: 'Returned as volunteer teacher' },
    ],
    testimonial:
      'Education gave me a future I never thought possible. Now I want to give that same gift to others.',
    date: '2023-12-01',
  },
  {
    id: 'story-002',
    title: 'Breaking the Cycle',
    subject: 'Blessing',
    age: 18,
    summary:
      'Blessing overcame poverty and family challenges to become the first in her family to complete secondary education.',
    beforeDescription:
      'Blessing faced pressure to drop out of school to help support her family financially.',
    afterDescription:
      'She graduated top of her class and received a scholarship to study nursing at university.',
    impact: {
      yearsOfGrowth: 8,
      studentsTaught: 0,
      livesImpacted: 'Her entire family',
    },
    category: 'education',
    featured: true,
    images: {
      before: null,
      after: null,
    },
    timeline: [
      { year: 2016, event: 'Enrolled in program at age 10' },
      { year: 2019, event: 'Received scholarship support' },
      { year: 2022, event: 'Completed secondary school' },
      { year: 2023, event: 'Started nursing program' },
    ],
    testimonial:
      'This program believed in me when I almost gave up. Now I will become a nurse and serve my community.',
    date: '2023-11-15',
  },
  {
    id: 'story-003',
    title: 'Community Health Champion',
    subject: 'Adewale',
    age: 25,
    summary:
      'Adewale transformed from a program beneficiary to a community health advocate, improving healthcare access for hundreds.',
    beforeDescription:
      'Adewale struggled with health issues due to lack of access to basic healthcare and health education.',
    afterDescription:
      'He now leads health awareness campaigns and coordinates medical outreach programs in Makoko.',
    impact: {
      yearsOfGrowth: 10,
      studentsTaught: 0,
      livesImpacted: '500+ families',
    },
    category: 'health',
    featured: false,
    images: {
      before: null,
      after: null,
    },
    timeline: [
      { year: 2014, event: 'Received healthcare support' },
      { year: 2017, event: 'Trained as health educator' },
      { year: 2020, event: 'Started community health initiative' },
      { year: 2023, event: 'Coordinating medical outreach' },
    ],
    testimonial:
      'Good health is a right, not a privilege. I work every day to make healthcare accessible to everyone in our community.',
    date: '2023-10-20',
  },
]);

/**
 * Photo gallery metadata for impact showcase
 * @constant {Object[]}
 */
export const PHOTO_GALLERY = Object.freeze([
  {
    id: 'photo-001',
    unsplashId: '5bYxXawHOQg',
    alt: 'Children participating in educational program at Makoko community center',
    category: 'education',
    featured: true,
    caption: 'Learning together in our community classroom',
    date: '2023-11-01',
  },
  {
    id: 'photo-002',
    unsplashId: 'NDuPLKYRXQU',
    alt: 'Community volunteers teaching children in outdoor classroom setting',
    category: 'education',
    featured: true,
    caption: 'Dedicated volunteers making education accessible',
    date: '2023-10-15',
  },
  {
    id: 'photo-003',
    unsplashId: 'WNoLnJo7tS8',
    alt: 'Group of children engaged in creative arts and crafts activities',
    category: 'activities',
    featured: true,
    caption: 'Creativity and learning through arts',
    date: '2023-09-20',
  },
  {
    id: 'photo-004',
    unsplashId: 'hn6CC9aosEk',
    alt: 'Children playing and learning together in community playground',
    category: 'activities',
    featured: false,
    caption: 'Play is an essential part of childhood development',
    date: '2023-11-10',
  },
  {
    id: 'photo-005',
    unsplashId: 'mG28olYFgHI',
    alt: 'Community meal program providing nutritious food to children',
    category: 'nutrition',
    featured: true,
    caption: 'Ensuring every child has access to nutritious meals',
    date: '2023-10-25',
  },
  {
    id: 'photo-006',
    unsplashId: 'lbLgFFlADrY',
    alt: 'Healthcare workers conducting health checkup for community children',
    category: 'health',
    featured: true,
    caption: 'Regular health checkups for all children',
    date: '2023-11-05',
  },
  {
    id: 'photo-007',
    unsplashId: 'Zyx1bK9mqmA',
    alt: 'Children reading books in community library program',
    category: 'education',
    featured: false,
    caption: 'Building a love for reading and learning',
    date: '2023-09-30',
  },
  {
    id: 'photo-008',
    unsplashId: 'pElSkGRA2NU',
    alt: 'Sports and recreation activities for youth development',
    category: 'activities',
    featured: false,
    caption: 'Sports teach teamwork and discipline',
    date: '2023-10-12',
  },
  {
    id: 'photo-009',
    unsplashId: 'Fa9b57PEQlg',
    alt: 'Community gathering celebrating program achievements and milestones',
    category: 'community',
    featured: true,
    caption: 'Celebrating our collective achievements',
    date: '2023-12-01',
  },
]);

/**
 * Impact metrics for visualization
 * @constant {Object}
 */
export const IMPACT_METRICS = Object.freeze({
  education: {
    studentsEnrolled: 500,
    graduationRate: 92,
    literacyImprovement: 85,
    averageAttendance: 94,
  },
  health: {
    healthCheckups: 1200,
    nutritionPrograms: 8,
    familiesSupported: 350,
    healthEducationSessions: 48,
  },
  community: {
    volunteersActive: 150,
    programsRunning: 25,
    familiesReached: 2000,
    communityEvents: 36,
  },
  growth: {
    yearOverYearGrowth: 30,
    newProgramsLaunched: 5,
    partnerOrganizations: 12,
    fundingIncrease: 45,
  },
});

/**
 * Content categories for filtering and organization
 * @constant {Object[]}
 */
export const CONTENT_CATEGORIES = Object.freeze([
  {
    id: 'education',
    label: 'Education',
    description: 'Educational programs and literacy initiatives',
    color: 'primary',
    icon: 'book',
  },
  {
    id: 'health',
    label: 'Health',
    description: 'Healthcare and nutrition programs',
    color: 'secondary',
    icon: 'heart',
  },
  {
    id: 'activities',
    label: 'Activities',
    description: 'Recreation and skill development activities',
    color: 'accent',
    icon: 'star',
  },
  {
    id: 'community',
    label: 'Community',
    description: 'Community engagement and support programs',
    color: 'primary',
    icon: 'users',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    description: 'Meal programs and nutrition education',
    color: 'secondary',
    icon: 'food',
  },
  {
    id: 'volunteer',
    label: 'Volunteers',
    description: 'Volunteer programs and community service',
    color: 'accent',
    icon: 'hand',
  },
  {
    id: 'parent',
    label: 'Parents',
    description: 'Parent engagement and family support',
    color: 'primary',
    icon: 'family',
  },
]);

/**
 * Get testimonials by type
 * @param {string} type - Testimonial type (beneficiary, volunteer, parent)
 * @returns {Object[]} Filtered testimonials
 */
export function getTestimonialsByType(type) {
  if (!type || typeof type !== 'string') {
    console.warn('[impactContent] Invalid testimonial type provided');
    return [];
  }

  return TESTIMONIALS.filter((testimonial) => testimonial.type === type);
}

/**
 * Get featured testimonials
 * @returns {Object[]} Featured testimonials
 */
export function getFeaturedTestimonials() {
  return TESTIMONIALS.filter((testimonial) => testimonial.featured);
}

/**
 * Get success stories by category
 * @param {string} category - Story category
 * @returns {Object[]} Filtered success stories
 */
export function getSuccessStoriesByCategory(category) {
  if (!category || typeof category !== 'string') {
    console.warn('[impactContent] Invalid category provided');
    return [];
  }

  return SUCCESS_STORIES.filter((story) => story.category === category);
}

/**
 * Get featured success stories
 * @returns {Object[]} Featured success stories
 */
export function getFeaturedSuccessStories() {
  return SUCCESS_STORIES.filter((story) => story.featured);
}

/**
 * Get photos by category
 * @param {string} category - Photo category
 * @returns {Object[]} Filtered photos
 */
export function getPhotosByCategory(category) {
  if (!category || typeof category !== 'string') {
    console.warn('[impactContent] Invalid category provided');
    return [];
  }

  return PHOTO_GALLERY.filter((photo) => photo.category === category);
}

/**
 * Get featured photos
 * @returns {Object[]} Featured photos
 */
export function getFeaturedPhotos() {
  return PHOTO_GALLERY.filter((photo) => photo.featured);
}

/**
 * Get statistic by ID
 * @param {string} id - Statistic ID
 * @returns {Object|null} Statistic object or null if not found
 */
export function getStatisticById(id) {
  if (!id || typeof id !== 'string') {
    console.warn('[impactContent] Invalid statistic ID provided');
    return null;
  }

  return IMPACT_STATISTICS.find((stat) => stat.id === id) || null;
}

/**
 * Get all available categories
 * @returns {string[]} Array of category IDs
 */
export function getAllCategories() {
  return CONTENT_CATEGORIES.map((category) => category.id);
}

/**
 * Validate content data integrity
 * @returns {Object} Validation result with status and any errors
 */
export function validateContentData() {
  const errors = [];

  if (IMPACT_STATISTICS.length === 0) {
    errors.push('No impact statistics defined');
  }

  if (TESTIMONIALS.length === 0) {
    errors.push('No testimonials defined');
  }

  if (SUCCESS_STORIES.length === 0) {
    errors.push('No success stories defined');
  }

  if (PHOTO_GALLERY.length === 0) {
    errors.push('No photos defined');
  }

  const hasInvalidStats = IMPACT_STATISTICS.some(
    (stat) => !stat.id || typeof stat.value !== 'number'
  );
  if (hasInvalidStats) {
    errors.push('Invalid statistic data detected');
  }

  const hasInvalidTestimonials = TESTIMONIALS.some(
    (t) => !t.id || !t.name || !t.quote
  );
  if (hasInvalidTestimonials) {
    errors.push('Invalid testimonial data detected');
  }

  return {
    valid: errors.length === 0,
    errors,
    stats: {
      statistics: IMPACT_STATISTICS.length,
      testimonials: TESTIMONIALS.length,
      stories: SUCCESS_STORIES.length,
      photos: PHOTO_GALLERY.length,
      categories: CONTENT_CATEGORIES.length,
    },
  };
}

export default {
  IMPACT_STATISTICS,
  IMPACT_POINTS,
  TESTIMONIALS,
  SUCCESS_STORIES,
  PHOTO_GALLERY,
  IMPACT_METRICS,
  CONTENT_CATEGORIES,
  getTestimonialsByType,
  getFeaturedTestimonials,
  getSuccessStoriesByCategory,
  getFeaturedSuccessStories,
  getPhotosByCategory,
  getFeaturedPhotos,
  getStatisticById,
  getAllCategories,
  validateContentData,
};