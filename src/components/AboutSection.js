/**
 * AboutSection Component
 * 
 * Comprehensive About section showcasing NGO's mission, vision, organizational
 * history, and approach to helping children in the Makoko community.
 * 
 * Features:
 * - Mission and vision statements with compelling storytelling
 * - Organizational history and background
 * - Core values and approach to child welfare
 * - Historical context of work in Makoko community
 * - Responsive layout with professional design
 * - Accessible and SEO-optimized content
 * 
 * @module AboutSection
 * @version 1.0.0
 */

import { createOptimizedImage } from '../utils/imageOptimization.js';

/**
 * About section content configuration
 * @constant {Object}
 */
const ABOUT_CONTENT = {
  mission: {
    title: 'Our Mission',
    statement:
      'To empower and uplift children in the Makoko community through education, healthcare, and sustainable development programs that break the cycle of poverty and create lasting positive change.',
    icon: '🎯',
  },
  vision: {
    title: 'Our Vision',
    statement:
      'A future where every child in Makoko has access to quality education, healthcare, and opportunities to reach their full potential, regardless of their socioeconomic background.',
    icon: '🌟',
  },
  story: {
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
  },
  values: {
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
  },
  approach: {
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
  },
  makoko: {
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
  },
};

/**
 * Unsplash photo IDs for About section imagery
 * @constant {Object}
 */
const ABOUT_IMAGES = {
  mission: '1503454998666-1c593aea1937', // Children learning
  community: '1488521787991-ed7bbaae773c', // Community gathering
  education: '1503676260728-1c00da094a0b', // Classroom scene
  makoko: '1578632767196-37a6b1c7e2a3', // Waterfront community
};

/**
 * Creates the mission and vision section
 * @returns {HTMLElement} Mission and vision container
 */
function createMissionVisionSection() {
  const section = document.createElement('div');
  section.className = 'grid md:grid-cols-2 gap-8 mb-16';

  const missionCard = document.createElement('div');
  missionCard.className =
    'bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200 shadow-soft hover:shadow-medium transition-all duration-300';
  missionCard.innerHTML = `
    <div class="text-5xl mb-4">${ABOUT_CONTENT.mission.icon}</div>
    <h3 class="text-2xl font-bold text-primary-900 mb-4">${ABOUT_CONTENT.mission.title}</h3>
    <p class="text-lg text-gray-700 leading-relaxed">${ABOUT_CONTENT.mission.statement}</p>
  `;

  const visionCard = document.createElement('div');
  visionCard.className =
    'bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border border-secondary-200 shadow-soft hover:shadow-medium transition-all duration-300';
  visionCard.innerHTML = `
    <div class="text-5xl mb-4">${ABOUT_CONTENT.vision.icon}</div>
    <h3 class="text-2xl font-bold text-secondary-900 mb-4">${ABOUT_CONTENT.vision.title}</h3>
    <p class="text-lg text-gray-700 leading-relaxed">${ABOUT_CONTENT.vision.statement}</p>
  `;

  section.appendChild(missionCard);
  section.appendChild(visionCard);

  return section;
}

/**
 * Creates the organizational story timeline
 * @returns {HTMLElement} Story timeline container
 */
function createStorySection() {
  const section = document.createElement('div');
  section.className = 'mb-16';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  header.innerHTML = `
    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ABOUT_CONTENT.story.title}</h3>
    <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
  `;

  const timeline = document.createElement('div');
  timeline.className = 'relative';

  const timelineLine = document.createElement('div');
  timelineLine.className =
    'absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-secondary-600 transform md:-translate-x-1/2';
  timeline.appendChild(timelineLine);

  ABOUT_CONTENT.story.content.forEach((milestone, index) => {
    const isEven = index % 2 === 0;
    const item = document.createElement('div');
    item.className = `relative mb-12 ${isEven ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`;

    const card = document.createElement('div');
    card.className = `ml-20 md:ml-0 ${isEven ? 'md:mr-12' : 'md:ml-12'} bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100`;
    card.innerHTML = `
      <div class="absolute left-8 md:left-1/2 top-6 w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform md:-translate-x-1/2 -translate-y-1/2">
        ${milestone.year.slice(-2)}
      </div>
      <div class="text-sm font-semibold text-primary-600 mb-2">${milestone.year}</div>
      <h4 class="text-xl font-bold text-gray-900 mb-3">${milestone.heading}</h4>
      <p class="text-gray-700 leading-relaxed">${milestone.text}</p>
    `;

    item.appendChild(card);
    timeline.appendChild(item);
  });

  section.appendChild(header);
  section.appendChild(timeline);

  return section;
}

/**
 * Creates the core values grid
 * @returns {HTMLElement} Values grid container
 */
function createValuesSection() {
  const section = document.createElement('div');
  section.className = 'mb-16';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  header.innerHTML = `
    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ABOUT_CONTENT.values.title}</h3>
    <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
  `;

  const grid = document.createElement('div');
  grid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';

  ABOUT_CONTENT.values.items.forEach((value) => {
    const card = document.createElement('div');
    card.className =
      'bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary-200';
    card.innerHTML = `
      <div class="text-4xl mb-4">${value.icon}</div>
      <h4 class="text-xl font-bold text-gray-900 mb-3">${value.title}</h4>
      <p class="text-gray-700 leading-relaxed">${value.description}</p>
    `;
    grid.appendChild(card);
  });

  section.appendChild(header);
  section.appendChild(grid);

  return section;
}

/**
 * Creates the approach methodology section
 * @returns {HTMLElement} Approach section container
 */
function createApproachSection() {
  const section = document.createElement('div');
  section.className = 'mb-16';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  header.innerHTML = `
    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ABOUT_CONTENT.approach.title}</h3>
    <p class="text-xl text-gray-600 mb-4">${ABOUT_CONTENT.approach.subtitle}</p>
    <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
  `;

  const grid = document.createElement('div');
  grid.className = 'grid md:grid-cols-2 gap-8';

  ABOUT_CONTENT.approach.methods.forEach((method) => {
    const card = document.createElement('div');
    card.className =
      'bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100';
    card.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          ${method.step}
        </div>
        <div class="flex-1">
          <h4 class="text-xl font-bold text-gray-900 mb-3">${method.title}</h4>
          <p class="text-gray-700 leading-relaxed">${method.description}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  section.appendChild(header);
  section.appendChild(grid);

  return section;
}

/**
 * Creates the Makoko community context section
 * @returns {Promise<HTMLElement>} Makoko section container
 */
async function createMakokoSection() {
  const section = document.createElement('div');
  section.className = 'mb-16';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  header.innerHTML = `
    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ABOUT_CONTENT.makoko.title}</h3>
    <p class="text-xl text-gray-600 mb-4">${ABOUT_CONTENT.makoko.subtitle}</p>
    <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
  `;

  const content = document.createElement('div');
  content.className = 'grid lg:grid-cols-2 gap-8 items-start';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'rounded-2xl overflow-hidden shadow-medium';

  try {
    const makokoImage = await createOptimizedImage({
      photoId: ABOUT_IMAGES.makoko,
      alt: 'Makoko waterfront community in Lagos',
      width: 800,
      height: 600,
      className: 'w-full h-full object-cover',
      lazy: true,
    });
    imageContainer.appendChild(makokoImage);
  } catch (error) {
    console.error('[AboutSection] Failed to load Makoko image:', error);
    imageContainer.innerHTML = `
      <div class="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
        <span class="text-gray-500">Image unavailable</span>
      </div>
    `;
  }

  const textContent = document.createElement('div');
  textContent.innerHTML = `
    <p class="text-lg text-gray-700 leading-relaxed mb-8">${ABOUT_CONTENT.makoko.description}</p>
    
    <div class="mb-8">
      <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-2xl">⚠️</span>
        Challenges We Address
      </h4>
      <ul class="space-y-2">
        ${ABOUT_CONTENT.makoko.challenges
          .map(
            (challenge) => `
          <li class="flex items-start gap-3">
            <span class="text-accent-500 mt-1">•</span>
            <span class="text-gray-700">${challenge}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
    
    <div>
      <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span class="text-2xl">💪</span>
        Community Strengths
      </h4>
      <ul class="space-y-2">
        ${ABOUT_CONTENT.makoko.strengths
          .map(
            (strength) => `
          <li class="flex items-start gap-3">
            <span class="text-primary-600 mt-1">✓</span>
            <span class="text-gray-700">${strength}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `;

  content.appendChild(imageContainer);
  content.appendChild(textContent);

  section.appendChild(header);
  section.appendChild(content);

  return section;
}

/**
 * Creates the complete About section component
 * @returns {Promise<HTMLElement>} Complete About section
 */
async function createAboutSection() {
  try {
    const section = document.createElement('section');
    section.id = 'about-section';
    section.className = 'section-container bg-gray-50';
    section.setAttribute('aria-labelledby', 'about-heading');

    const container = document.createElement('div');
    container.className = 'max-w-6xl mx-auto';

    const mainHeading = document.createElement('div');
    mainHeading.className = 'text-center mb-16';
    mainHeading.innerHTML = `
      <h2 id="about-heading" class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        About Our <span class="text-gradient">Mission</span>
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Dedicated to transforming lives and creating opportunities for children in the Makoko community through education, healthcare, and sustainable development.
      </p>
    `;

    container.appendChild(mainHeading);
    container.appendChild(createMissionVisionSection());
    container.appendChild(createStorySection());
    container.appendChild(createValuesSection());
    container.appendChild(createApproachSection());

    const makokoSection = await createMakokoSection();
    container.appendChild(makokoSection);

    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'text-center mt-16 pt-12 border-t border-gray-200';
    ctaContainer.innerHTML = `
      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Join Us in Making a Difference
      </h3>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Your support can help us expand our programs and reach more children in need. Together, we can create lasting change in the Makoko community.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="#donate" class="btn btn-primary text-lg px-8 py-4">
          Support Our Work
        </a>
        <a href="#contact" class="btn btn-outline text-lg px-8 py-4">
          Get Involved
        </a>
      </div>
    `;

    container.appendChild(ctaContainer);
    section.appendChild(container);

    console.info('[AboutSection] Component created successfully');

    return section;
  } catch (error) {
    console.error('[AboutSection] Failed to create About section:', error);

    const errorSection = document.createElement('section');
    errorSection.id = 'about-section';
    errorSection.className = 'section-container bg-gray-50';
    errorSection.innerHTML = `
      <div class="text-center py-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">About Our Mission</h2>
        <p class="text-gray-600 mb-8">We're experiencing technical difficulties. Please try again later.</p>
        <button onclick="location.reload()" class="btn btn-primary">
          Reload Page
        </button>
      </div>
    `;

    return errorSection;
  }
}

/**
 * Initializes the About section and appends it to the DOM
 * @param {string} [containerId='app'] - ID of the container element
 * @returns {Promise<void>}
 */
async function initializeAboutSection(containerId = 'app') {
  try {
    const container = document.getElementById(containerId);

    if (!container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }

    const aboutSection = await createAboutSection();
    container.appendChild(aboutSection);

    console.info('[AboutSection] Initialized and mounted successfully');
  } catch (error) {
    console.error('[AboutSection] Initialization failed:', error);
    throw error;
  }
}

export { createAboutSection, initializeAboutSection, ABOUT_CONTENT };

export default createAboutSection;