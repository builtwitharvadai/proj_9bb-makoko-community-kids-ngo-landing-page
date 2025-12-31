/**
 * About Section Content Data
 * 
 * Centralized content management for the About section including mission,
 * vision, organizational history, team information, and core values.
 * 
 * Features:
 * - Structured content for easy updates and maintenance
 * - Comprehensive organizational information
 * - Team member profiles with roles and bios
 * - Historical timeline of organizational milestones
 * - Core values and approach methodology
 * - Makoko community context and challenges
 * 
 * @module data/aboutContent
 * @version 1.0.0
 */

/**
 * Mission statement configuration
 * @constant {Object}
 */
const MISSION = {
  title: 'Our Mission',
  statement:
    'To empower and uplift children in the Makoko community through education, healthcare, and sustainable development programs that break the cycle of poverty and create lasting positive change.',
  icon: '🎯',
};

/**
 * Vision statement configuration
 * @constant {Object}
 */
const VISION = {
  title: 'Our Vision',
  statement:
    'A future where every child in Makoko has access to quality education, healthcare, and opportunities to reach their full potential, regardless of their socioeconomic background.',
  icon: '🌟',
};

/**
 * Organizational history timeline
 * @constant {Object}
 */
const STORY = {
  title: 'Our Story',
  content: [
    {
      year: '2015',
      heading: 'The Beginning',
      text: 'Founded by a group of passionate educators and community leaders who witnessed firsthand the challenges faced by children in Makoko, one of Lagos\'s largest waterfront slum communities.',
    },
    {
      year: '2017',
      heading: 'First School Program',
      text: 'Launched our first educational initiative, providing free tutoring and school supplies to 50 children. The overwhelming response from the community showed us the critical need for sustained support.',
    },
    {
      year: '2019',
      heading: 'Healthcare Initiative',
      text: 'Expanded our mission to include basic healthcare services, partnering with local clinics to provide free medical checkups and vaccinations for children in the community.',
    },
    {
      year: '2021',
      heading: 'Community Center',
      text: 'Opened our first community learning center in Makoko, providing a safe space for children to learn, play, and access resources that support their development.',
    },
    {
      year: '2023',
      heading: 'Growing Impact',
      text: 'Now serving over 500 children annually through comprehensive programs in education, healthcare, nutrition, and skills development, with plans for continued expansion.',
    },
  ],
};

/**
 * Core organizational values
 * @constant {Object}
 */
const VALUES = {
  title: 'Our Core Values',
  items: [
    {
      icon: '❤️',
      title: 'Compassion',
      description:
        'We approach every child and family with empathy, understanding, and genuine care for their wellbeing and dignity.',
    },
    {
      icon: '🤝',
      title: 'Community Partnership',
      description:
        'We work alongside the Makoko community, respecting local knowledge and empowering residents to lead change.',
    },
    {
      icon: '📚',
      title: 'Education First',
      description:
        'We believe education is the most powerful tool for breaking the cycle of poverty and creating lasting change.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Impact',
      description:
        'We focus on long-term solutions that create self-sustaining improvements in the lives of children and families.',
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description:
        'We maintain open communication with donors, partners, and the community about our work, impact, and challenges.',
    },
    {
      icon: '⚖️',
      title: 'Equity & Inclusion',
      description:
        'We ensure all children have equal access to our programs regardless of gender, religion, or family circumstances.',
    },
  ],
};

/**
 * Organizational approach methodology
 * @constant {Object}
 */
const APPROACH = {
  title: 'Our Approach',
  subtitle: 'How We Make a Difference in Makoko',
  methods: [
    {
      step: '01',
      title: 'Community Assessment',
      description:
        'We begin by listening to the community, understanding their needs, challenges, and aspirations through direct engagement with families and local leaders.',
    },
    {
      step: '02',
      title: 'Holistic Support',
      description:
        'We address multiple aspects of child development simultaneously - education, health, nutrition, and emotional wellbeing - recognizing that these factors are interconnected.',
    },
    {
      step: '03',
      title: 'Family Engagement',
      description:
        'We involve parents and guardians in our programs, providing them with resources and support to create nurturing home environments.',
    },
    {
      step: '04',
      title: 'Continuous Monitoring',
      description:
        'We track each child\'s progress through regular assessments, adjusting our support to meet their evolving needs and celebrate their achievements.',
    },
  ],
};

/**
 * Makoko community context and information
 * @constant {Object}
 */
const MAKOKO = {
  title: 'Understanding Makoko',
  subtitle: 'The Community We Serve',
  description:
    'Makoko is a historic fishing community built on stilts over the Lagos Lagoon. Home to over 100,000 residents, it faces significant challenges including limited access to clean water, sanitation, healthcare, and education. Despite these hardships, Makoko is a vibrant community with rich cultural heritage and resilient families who are determined to create better futures for their children.',
  challenges: [
    'Limited access to quality education',
    'Inadequate healthcare facilities',
    'Poor sanitation and water quality',
    'High poverty rates and unemployment',
    'Vulnerability to flooding and environmental hazards',
    'Social stigma and marginalization',
  ],
  strengths: [
    'Strong community bonds and mutual support',
    'Rich cultural traditions and heritage',
    'Entrepreneurial spirit and resourcefulness',
    'Deep connection to waterfront livelihoods',
    'Growing youth activism and leadership',
    'Increasing external support and partnerships',
  ],
};

/**
 * Team member data structure
 * @typedef {Object} TeamMember
 * @property {string} id - Unique identifier
 * @property {string} name - Full name
 * @property {string} role - Job title/role
 * @property {string} bio - Brief biography
 * @property {string} photoId - Unsplash photo ID
 */

/**
 * Team members information
 * @constant {TeamMember[]}
 */
const TEAM_MEMBERS = [
  {
    id: 'member-1',
    name: 'Adebayo Okonkwo',
    role: 'Founder & Executive Director',
    bio: 'With over 15 years of experience in community development, Adebayo founded the organization to bring hope and opportunity to children in Makoko. His vision has transformed countless lives.',
    photoId: '1573496359142-b8d87734a5a2',
  },
  {
    id: 'member-2',
    name: 'Chioma Nwosu',
    role: 'Education Program Director',
    bio: 'A passionate educator with a Master\'s in Child Development, Chioma designs and oversees all educational initiatives, ensuring every child receives quality learning opportunities.',
    photoId: '1580489944761-15a19d654956',
  },
  {
    id: 'member-3',
    name: 'Emeka Okafor',
    role: 'Community Outreach Coordinator',
    bio: 'Born and raised in Makoko, Emeka bridges the gap between the organization and the community, building trust and ensuring programs meet real needs.',
    photoId: '1507003211169-0a1dd7228f2d',
  },
  {
    id: 'member-4',
    name: 'Ngozi Adeyemi',
    role: 'Health & Nutrition Specialist',
    bio: 'A registered nurse with expertise in pediatric care, Ngozi leads health initiatives that have improved the wellbeing of hundreds of children in the community.',
    photoId: '1594744803329-e1852922f42b',
  },
  {
    id: 'member-5',
    name: 'Oluwaseun Balogun',
    role: 'Volunteer Coordinator',
    bio: 'Oluwaseun manages our growing volunteer network, matching skills with needs and ensuring every volunteer has a meaningful and impactful experience.',
    photoId: '1519085360753-af0119f7b3cd',
  },
  {
    id: 'member-6',
    name: 'Fatima Ibrahim',
    role: 'Fundraising Manager',
    bio: 'With a background in nonprofit management, Fatima develops innovative fundraising strategies that sustain and expand our programs for children in need.',
    photoId: '1573497019940-1c28c88b4f3e',
  },
];

/**
 * Unsplash photo IDs for About section imagery
 * @constant {Object}
 */
const ABOUT_IMAGES = {
  mission: '1503454998666-1c593aea1937',
  community: '1488521787991-ed7bbaae773c',
  education: '1503676260728-1c00da094a0b',
  makoko: '1578632767196-37a6b1c7e2a3',
};

/**
 * Complete About section content configuration
 * @constant {Object}
 */
const ABOUT_CONTENT = {
  mission: MISSION,
  vision: VISION,
  story: STORY,
  values: VALUES,
  approach: APPROACH,
  makoko: MAKOKO,
  team: TEAM_MEMBERS,
  images: ABOUT_IMAGES,
};

/**
 * Validates content structure for required fields
 * @param {Object} content - Content object to validate
 * @returns {boolean} Validation result
 */
function validateContent(content) {
  try {
    if (!content || typeof content !== 'object') {
      console.error('[aboutContent] Invalid content structure');
      return false;
    }

    const requiredSections = ['mission', 'vision', 'story', 'values', 'approach', 'makoko', 'team'];
    const missingSections = requiredSections.filter((section) => !content[section]);

    if (missingSections.length > 0) {
      console.error('[aboutContent] Missing required sections:', missingSections);
      return false;
    }

    if (!Array.isArray(content.team) || content.team.length === 0) {
      console.error('[aboutContent] Team members array is invalid or empty');
      return false;
    }

    if (!Array.isArray(content.story.content) || content.story.content.length === 0) {
      console.error('[aboutContent] Story timeline is invalid or empty');
      return false;
    }

    if (!Array.isArray(content.values.items) || content.values.items.length === 0) {
      console.error('[aboutContent] Values items array is invalid or empty');
      return false;
    }

    console.info('[aboutContent] Content validation successful');
    return true;
  } catch (error) {
    console.error('[aboutContent] Validation error:', error);
    return false;
  }
}

/**
 * Gets content by section key with fallback
 * @param {string} section - Section key to retrieve
 * @returns {Object|null} Section content or null if not found
 */
function getSection(section) {
  try {
    if (!section || typeof section !== 'string') {
      console.error('[aboutContent] Invalid section key:', section);
      return null;
    }

    const content = ABOUT_CONTENT[section];

    if (!content) {
      console.warn('[aboutContent] Section not found:', section);
      return null;
    }

    return content;
  } catch (error) {
    console.error('[aboutContent] Error retrieving section:', error);
    return null;
  }
}

/**
 * Gets team member by ID
 * @param {string} memberId - Team member ID
 * @returns {TeamMember|null} Team member data or null if not found
 */
function getTeamMember(memberId) {
  try {
    if (!memberId || typeof memberId !== 'string') {
      console.error('[aboutContent] Invalid member ID:', memberId);
      return null;
    }

    const member = TEAM_MEMBERS.find((m) => m.id === memberId);

    if (!member) {
      console.warn('[aboutContent] Team member not found:', memberId);
      return null;
    }

    return member;
  } catch (error) {
    console.error('[aboutContent] Error retrieving team member:', error);
    return null;
  }
}

/**
 * Gets all team members
 * @returns {TeamMember[]} Array of team members
 */
function getAllTeamMembers() {
  return [...TEAM_MEMBERS];
}

/**
 * Gets story timeline entries
 * @returns {Array} Story timeline entries
 */
function getStoryTimeline() {
  return [...STORY.content];
}

/**
 * Gets core values
 * @returns {Array} Core values items
 */
function getCoreValues() {
  return [...VALUES.items];
}

/**
 * Gets approach methodology steps
 * @returns {Array} Approach methodology steps
 */
function getApproachSteps() {
  return [...APPROACH.methods];
}

/**
 * Gets Makoko community information
 * @returns {Object} Makoko community data
 */
function getMakokoInfo() {
  return { ...MAKOKO };
}

if (typeof window !== 'undefined') {
  validateContent(ABOUT_CONTENT);
}

export {
  ABOUT_CONTENT,
  MISSION,
  VISION,
  STORY,
  VALUES,
  APPROACH,
  MAKOKO,
  TEAM_MEMBERS,
  ABOUT_IMAGES,
  validateContent,
  getSection,
  getTeamMember,
  getAllTeamMembers,
  getStoryTimeline,
  getCoreValues,
  getApproachSteps,
  getMakokoInfo,
};

export default ABOUT_CONTENT;