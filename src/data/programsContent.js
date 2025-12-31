/**
 * Programs Content Data
 * 
 * Comprehensive data structure for all NGO programs and initiatives.
 * Provides structured content for education, healthcare, nutrition,
 * skills development, and community engagement programs.
 * 
 * @module data/programsContent
 * @version 1.0.0
 */

/**
 * Program category identifiers
 */
const PROGRAM_CATEGORIES = Object.freeze({
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  NUTRITION: 'nutrition',
  SKILLS: 'skills',
  COMMUNITY: 'community',
});

/**
 * Education programs and initiatives
 */
const educationPrograms = [
  {
    id: 'edu-001',
    category: PROGRAM_CATEGORIES.EDUCATION,
    icon: '📚',
    title: 'Primary Education Support',
    description: 'Providing quality education to children in Makoko through school supplies, tutoring, and learning resources. We ensure every child has access to foundational education regardless of their family\'s economic situation.',
    impact: {
      metric: 'Students Supported',
      value: '500+',
    },
    ctaText: 'Support Education',
    ctaLink: '#get-involved',
  },
  {
    id: 'edu-002',
    category: PROGRAM_CATEGORIES.EDUCATION,
    icon: '💻',
    title: 'Digital Literacy Program',
    description: 'Equipping youth with essential computer skills and digital literacy to prepare them for the modern workforce. Our computer lab provides hands-on training in basic computing, internet safety, and digital tools.',
    impact: {
      metric: 'Youth Trained',
      value: '200+',
    },
    ctaText: 'Learn More',
    ctaLink: '#get-involved',
  },
  {
    id: 'edu-003',
    category: PROGRAM_CATEGORIES.EDUCATION,
    icon: '🎓',
    title: 'Scholarship Program',
    description: 'Offering scholarships and financial assistance to exceptional students from low-income families to pursue secondary and tertiary education. We believe financial constraints should never limit educational aspirations.',
    impact: {
      metric: 'Scholarships Awarded',
      value: '75+',
    },
    ctaText: 'Sponsor a Student',
    ctaLink: '#get-involved',
  },
];

/**
 * Healthcare programs and initiatives
 */
const healthcarePrograms = [
  {
    id: 'health-001',
    category: PROGRAM_CATEGORIES.HEALTHCARE,
    icon: '🏥',
    title: 'Primary Healthcare Services',
    description: 'Operating a community health clinic providing basic medical care, preventive services, and health education. Our medical team offers consultations, treatments, and referrals for specialized care when needed.',
    impact: {
      metric: 'Patients Served Monthly',
      value: '300+',
    },
    ctaText: 'Support Healthcare',
    ctaLink: '#get-involved',
  },
  {
    id: 'health-002',
    category: PROGRAM_CATEGORIES.HEALTHCARE,
    icon: '💉',
    title: 'Immunization Campaign',
    description: 'Conducting regular immunization drives to protect children from preventable diseases. We partner with health authorities to ensure comprehensive vaccination coverage for all children in the community.',
    impact: {
      metric: 'Children Vaccinated',
      value: '1,000+',
    },
    ctaText: 'Join Campaign',
    ctaLink: '#get-involved',
  },
  {
    id: 'health-003',
    category: PROGRAM_CATEGORIES.HEALTHCARE,
    icon: '🤰',
    title: 'Maternal Health Program',
    description: 'Providing prenatal care, safe delivery services, and postnatal support to expectant mothers. Our program includes health education, nutritional support, and access to skilled birth attendants.',
    impact: {
      metric: 'Mothers Supported',
      value: '150+',
    },
    ctaText: 'Support Mothers',
    ctaLink: '#get-involved',
  },
];

/**
 * Nutrition programs and initiatives
 */
const nutritionPrograms = [
  {
    id: 'nutr-001',
    category: PROGRAM_CATEGORIES.NUTRITION,
    icon: '🍎',
    title: 'School Feeding Program',
    description: 'Providing nutritious meals to school children to improve their health, concentration, and academic performance. Our daily meal program ensures no child learns on an empty stomach.',
    impact: {
      metric: 'Meals Served Daily',
      value: '400+',
    },
    ctaText: 'Feed a Child',
    ctaLink: '#get-involved',
  },
  {
    id: 'nutr-002',
    category: PROGRAM_CATEGORIES.NUTRITION,
    icon: '👶',
    title: 'Infant Nutrition Support',
    description: 'Supporting mothers with infant feeding education, breastfeeding counseling, and supplementary nutrition for malnourished children under five. We promote optimal nutrition during critical early development years.',
    impact: {
      metric: 'Infants Supported',
      value: '120+',
    },
    ctaText: 'Support Infants',
    ctaLink: '#get-involved',
  },
  {
    id: 'nutr-003',
    category: PROGRAM_CATEGORIES.NUTRITION,
    icon: '🥗',
    title: 'Community Garden Project',
    description: 'Establishing community gardens to promote food security, nutrition education, and sustainable agriculture. Families learn to grow their own vegetables and improve household nutrition.',
    impact: {
      metric: 'Families Participating',
      value: '80+',
    },
    ctaText: 'Join Garden Project',
    ctaLink: '#get-involved',
  },
];

/**
 * Skills development programs and initiatives
 */
const skillsPrograms = [
  {
    id: 'skills-001',
    category: PROGRAM_CATEGORIES.SKILLS,
    icon: '✂️',
    title: 'Vocational Training',
    description: 'Offering practical vocational training in tailoring, carpentry, plumbing, and other trades. Our hands-on programs equip youth and adults with marketable skills for sustainable livelihoods.',
    impact: {
      metric: 'Trainees Graduated',
      value: '250+',
    },
    ctaText: 'Enroll in Training',
    ctaLink: '#get-involved',
  },
  {
    id: 'skills-002',
    category: PROGRAM_CATEGORIES.SKILLS,
    icon: '💼',
    title: 'Entrepreneurship Program',
    description: 'Providing business skills training, mentorship, and microfinance support to aspiring entrepreneurs. We help community members start and grow small businesses for economic independence.',
    impact: {
      metric: 'Businesses Started',
      value: '100+',
    },
    ctaText: 'Start Your Business',
    ctaLink: '#get-involved',
  },
  {
    id: 'skills-003',
    category: PROGRAM_CATEGORIES.SKILLS,
    icon: '🎨',
    title: 'Arts & Crafts Workshop',
    description: 'Teaching traditional and contemporary arts and crafts skills including beadwork, weaving, and painting. Participants create products for sale, generating income while preserving cultural heritage.',
    impact: {
      metric: 'Artisans Trained',
      value: '150+',
    },
    ctaText: 'Join Workshop',
    ctaLink: '#get-involved',
  },
];

/**
 * Community engagement programs and initiatives
 */
const communityPrograms = [
  {
    id: 'comm-001',
    category: PROGRAM_CATEGORIES.COMMUNITY,
    icon: '🌊',
    title: 'Environmental Cleanup',
    description: 'Organizing regular community cleanup campaigns to improve sanitation and environmental health. We mobilize volunteers to clean waterways, streets, and public spaces while promoting environmental awareness.',
    impact: {
      metric: 'Volunteers Engaged',
      value: '500+',
    },
    ctaText: 'Join Cleanup',
    ctaLink: '#get-involved',
  },
  {
    id: 'comm-002',
    category: PROGRAM_CATEGORIES.COMMUNITY,
    icon: '⚽',
    title: 'Youth Sports Program',
    description: 'Providing sports and recreational activities to keep youth engaged, healthy, and away from negative influences. Our program includes football, basketball, and other team sports with coaching and mentorship.',
    impact: {
      metric: 'Youth Participating',
      value: '300+',
    },
    ctaText: 'Support Sports',
    ctaLink: '#get-involved',
  },
  {
    id: 'comm-003',
    category: PROGRAM_CATEGORIES.COMMUNITY,
    icon: '👥',
    title: 'Women Empowerment Circle',
    description: 'Creating safe spaces for women to connect, learn, and support each other. Our circles provide skills training, financial literacy education, and advocacy for women\'s rights and economic empowerment.',
    impact: {
      metric: 'Women Empowered',
      value: '200+',
    },
    ctaText: 'Join Circle',
    ctaLink: '#get-involved',
  },
];

/**
 * All programs combined in a single array
 */
const allPrograms = [
  ...educationPrograms,
  ...healthcarePrograms,
  ...nutritionPrograms,
  ...skillsPrograms,
  ...communityPrograms,
];

/**
 * Programs section metadata
 */
const programsMetadata = Object.freeze({
  sectionTitle: 'Our Programs',
  sectionSubtitle: 'Making a Difference Through Comprehensive Community Support',
  sectionDescription: 'We implement holistic programs addressing education, healthcare, nutrition, skills development, and community engagement. Each initiative is designed to create lasting positive change in the lives of Makoko residents.',
  totalPrograms: allPrograms.length,
  categories: Object.values(PROGRAM_CATEGORIES),
});

/**
 * Gets programs by category
 * 
 * @param {string} category - Program category identifier
 * @returns {Array<Object>} Array of programs in the specified category
 */
export function getProgramsByCategory(category) {
  if (!category || typeof category !== 'string') {
    console.error('[programsContent] Invalid category provided', { category });
    return [];
  }

  const normalizedCategory = category.toLowerCase().trim();
  
  if (!Object.values(PROGRAM_CATEGORIES).includes(normalizedCategory)) {
    console.warn('[programsContent] Unknown category', { 
      category: normalizedCategory,
      availableCategories: Object.values(PROGRAM_CATEGORIES),
    });
    return [];
  }

  return allPrograms.filter(program => program.category === normalizedCategory);
}

/**
 * Gets a program by ID
 * 
 * @param {string} programId - Program identifier
 * @returns {Object|null} Program object or null if not found
 */
export function getProgramById(programId) {
  if (!programId || typeof programId !== 'string') {
    console.error('[programsContent] Invalid program ID provided', { programId });
    return null;
  }

  const program = allPrograms.find(p => p.id === programId);
  
  if (!program) {
    console.warn('[programsContent] Program not found', { programId });
    return null;
  }

  return program;
}

/**
 * Gets total impact across all programs
 * 
 * @returns {Object} Aggregated impact metrics
 */
export function getTotalImpact() {
  const impactSummary = {
    totalPrograms: allPrograms.length,
    categoriesCount: Object.keys(PROGRAM_CATEGORIES).length,
    programsByCategory: {},
  };

  Object.values(PROGRAM_CATEGORIES).forEach(category => {
    impactSummary.programsByCategory[category] = getProgramsByCategory(category).length;
  });

  return impactSummary;
}

/**
 * Validates program data structure
 * 
 * @param {Object} program - Program object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateProgram(program) {
  if (!program || typeof program !== 'object') {
    return false;
  }

  const requiredFields = ['id', 'category', 'icon', 'title', 'description'];
  const hasRequiredFields = requiredFields.every(field => 
    field in program && program[field] !== null && program[field] !== undefined
  );

  if (!hasRequiredFields) {
    console.error('[programsContent] Program missing required fields', { 
      program,
      requiredFields,
    });
    return false;
  }

  if (!Object.values(PROGRAM_CATEGORIES).includes(program.category)) {
    console.error('[programsContent] Invalid program category', { 
      category: program.category,
      validCategories: Object.values(PROGRAM_CATEGORIES),
    });
    return false;
  }

  return true;
}

/**
 * Export program categories for external use
 */
export { PROGRAM_CATEGORIES };

/**
 * Export programs metadata
 */
export { programsMetadata };

/**
 * Export individual program arrays
 */
export {
  educationPrograms,
  healthcarePrograms,
  nutritionPrograms,
  skillsPrograms,
  communityPrograms,
  allPrograms,
};

/**
 * Default export with all programs and utilities
 */
export default {
  programs: allPrograms,
  metadata: programsMetadata,
  categories: PROGRAM_CATEGORIES,
  education: educationPrograms,
  healthcare: healthcarePrograms,
  nutrition: nutritionPrograms,
  skills: skillsPrograms,
  community: communityPrograms,
  getProgramsByCategory,
  getProgramById,
  getTotalImpact,
  validateProgram,
};