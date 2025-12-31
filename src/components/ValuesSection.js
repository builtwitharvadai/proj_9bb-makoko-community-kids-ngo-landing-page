/**
 * ValuesSection Component
 * 
 * Displays organizational values, approach to child welfare, and methodology
 * for community engagement with visual elements and icons.
 * 
 * @module components/ValuesSection
 */

/**
 * Core organizational values with icons and descriptions
 */
const VALUES_DATA = [
  {
    id: 'compassion',
    icon: '❤️',
    title: 'Compassion First',
    description: 'Every child deserves love, care, and understanding. We approach each situation with empathy and genuine concern for the wellbeing of children and families.',
    color: 'primary'
  },
  {
    id: 'community',
    icon: '🤝',
    title: 'Community Partnership',
    description: 'We work alongside the Makoko community, respecting local culture and traditions while building sustainable support systems together.',
    color: 'secondary'
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Education Access',
    description: 'Quality education is a fundamental right. We ensure every child has access to learning opportunities that unlock their full potential.',
    color: 'accent'
  },
  {
    id: 'dignity',
    icon: '✨',
    title: 'Dignity & Respect',
    description: 'We honor the inherent worth of every individual, treating children and families with the respect and dignity they deserve.',
    color: 'primary'
  },
  {
    id: 'sustainability',
    icon: '🌱',
    title: 'Sustainable Impact',
    description: 'Our programs are designed for long-term success, creating lasting change that empowers communities to thrive independently.',
    color: 'secondary'
  },
  {
    id: 'transparency',
    icon: '🔍',
    title: 'Transparency',
    description: 'We maintain open communication with donors, partners, and the community, ensuring accountability in all our operations.',
    color: 'accent'
  }
];

/**
 * Approach methodology steps
 */
const APPROACH_STEPS = [
  {
    id: 'assess',
    number: '01',
    title: 'Community Assessment',
    description: 'We begin by listening to the community, understanding their unique challenges, strengths, and aspirations for their children.',
    icon: '🎯'
  },
  {
    id: 'collaborate',
    number: '02',
    title: 'Collaborative Planning',
    description: 'Working with community leaders, families, and local organizations to design programs that address real needs effectively.',
    icon: '🤲'
  },
  {
    id: 'implement',
    number: '03',
    title: 'Thoughtful Implementation',
    description: 'Executing programs with care, monitoring progress, and adapting our approach based on feedback and outcomes.',
    icon: '⚡'
  },
  {
    id: 'empower',
    number: '04',
    title: 'Community Empowerment',
    description: 'Building local capacity and leadership so communities can sustain and expand positive change independently.',
    icon: '🚀'
  }
];

/**
 * Creates the values section HTML structure
 * @returns {string} HTML string for the values section
 */
function createValuesSectionHTML() {
  const valuesCards = VALUES_DATA.map(value => `
    <div class="card p-6 md:p-8 text-center transform transition-all duration-300 hover:scale-105" 
         data-value-id="${value.id}"
         role="article"
         aria-labelledby="value-title-${value.id}">
      <div class="text-5xl md:text-6xl mb-4 animate-float" 
           role="img" 
           aria-label="${value.title} icon">
        ${value.icon}
      </div>
      <h3 id="value-title-${value.id}" 
          class="text-xl md:text-2xl font-bold mb-3 text-${value.color}-700">
        ${value.title}
      </h3>
      <p class="text-gray-600 leading-relaxed">
        ${value.description}
      </p>
    </div>
  `).join('');

  const approachSteps = APPROACH_STEPS.map((step, index) => `
    <div class="approach-step flex flex-col md:flex-row gap-6 items-start"
         data-step-id="${step.id}"
         role="article"
         aria-labelledby="step-title-${step.id}"
         style="animation-delay: ${index * 150}ms">
      <div class="flex-shrink-0">
        <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg">
          ${step.number}
        </div>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl md:text-4xl" role="img" aria-label="${step.title} icon">
            ${step.icon}
          </span>
          <h3 id="step-title-${step.id}" 
              class="text-xl md:text-2xl font-bold text-gray-800">
            ${step.title}
          </h3>
        </div>
        <p class="text-gray-600 leading-relaxed">
          ${step.description}
        </p>
      </div>
    </div>
  `).join('');

  return `
    <section id="values-section" 
             class="section-container bg-gradient-to-b from-white to-gray-50"
             aria-labelledby="values-heading">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16">
          <h2 id="values-heading" 
              class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Our Values & Approach
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Guided by compassion and driven by results, we work hand-in-hand with the Makoko community to create lasting positive change for children and families.
          </p>
        </div>

        <!-- Core Values Grid -->
        <div class="mb-16 md:mb-24">
          <h3 class="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
            What Drives Us
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
               role="list"
               aria-label="Core organizational values">
            ${valuesCards}
          </div>
        </div>

        <!-- Approach Methodology -->
        <div class="bg-white rounded-3xl shadow-soft p-8 md:p-12">
          <h3 class="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
            Our Approach to Child Welfare
          </h3>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We follow a proven methodology that ensures sustainable impact and community ownership of positive change.
          </p>
          <div class="space-y-8 md:space-y-12"
               role="list"
               aria-label="Approach methodology steps">
            ${approachSteps}
          </div>
        </div>

        <!-- Community Engagement Highlight -->
        <div class="mt-16 md:mt-24 text-center">
          <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 border border-primary-100">
            <div class="text-4xl md:text-5xl mb-4" role="img" aria-label="Community icon">
              🌍
            </div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Community-Centered Methodology
            </h3>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Every program we implement is designed in partnership with the Makoko community. 
              We believe that sustainable change comes from within, and our role is to support, 
              empower, and amplify the incredible strength and resilience already present in the community.
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span class="px-4 py-2 bg-white rounded-full text-primary-700 font-semibold shadow-sm">
                Local Leadership
              </span>
              <span class="px-4 py-2 bg-white rounded-full text-secondary-700 font-semibold shadow-sm">
                Cultural Respect
              </span>
              <span class="px-4 py-2 bg-white rounded-full text-accent-700 font-semibold shadow-sm">
                Sustainable Solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Initializes intersection observer for scroll animations
 * @param {HTMLElement} section - The values section element
 */
function initializeScrollAnimations(section) {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = section.querySelectorAll('.card, .approach-step');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Adds hover interaction effects to value cards
 * @param {HTMLElement} section - The values section element
 */
function initializeCardInteractions(section) {
  const cards = section.querySelectorAll('[data-value-id]');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('[role="img"]');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('[role="img"]');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
}

/**
 * Logs section initialization for observability
 * @param {string} status - Initialization status
 * @param {Object} context - Additional context data
 */
function logSectionInit(status, context = {}) {
  if (typeof console !== 'undefined' && console.log) {
    console.log('[ValuesSection]', status, {
      timestamp: new Date().toISOString(),
      valuesCount: VALUES_DATA.length,
      stepsCount: APPROACH_STEPS.length,
      ...context
    });
  }
}

/**
 * Initializes the Values Section component
 * @param {string} containerId - ID of the container element
 * @returns {boolean} Success status
 */
function initValuesSection(containerId = 'values-section-container') {
  try {
    logSectionInit('Initializing');

    const container = document.getElementById(containerId);
    if (!container) {
      logSectionInit('Error: Container not found', { containerId });
      return false;
    }

    const html = createValuesSectionHTML();
    container.innerHTML = html;

    const section = document.getElementById('values-section');
    if (!section) {
      logSectionInit('Error: Section element not created');
      return false;
    }

    initializeScrollAnimations(section);
    initializeCardInteractions(section);

    logSectionInit('Initialized successfully');
    return true;
  } catch (error) {
    logSectionInit('Error during initialization', { 
      error: error.message,
      stack: error.stack 
    });
    return false;
  }
}

/**
 * Renders the Values Section into a container
 * @param {HTMLElement|string} container - Container element or selector
 * @returns {boolean} Success status
 */
function renderValuesSection(container) {
  try {
    const targetElement = typeof container === 'string' 
      ? document.querySelector(container)
      : container;

    if (!targetElement) {
      logSectionInit('Error: Target container not found', { container });
      return false;
    }

    const html = createValuesSectionHTML();
    targetElement.innerHTML = html;

    const section = targetElement.querySelector('#values-section');
    if (section) {
      initializeScrollAnimations(section);
      initializeCardInteractions(section);
    }

    logSectionInit('Rendered successfully');
    return true;
  } catch (error) {
    logSectionInit('Error during rendering', { 
      error: error.message,
      stack: error.stack 
    });
    return false;
  }
}

export { initValuesSection, renderValuesSection, VALUES_DATA, APPROACH_STEPS };