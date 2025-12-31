/**
 * Programs Section Component
 * 
 * Displays comprehensive overview of NGO programs including education, healthcare,
 * nutrition, skills development, and community engagement initiatives.
 * 
 * Features:
 * - Responsive grid layout with program cards
 * - Icon-based visual representation
 * - Impact metrics and descriptions
 * - Hover effects and animations
 * - Smooth scroll navigation integration
 * 
 * @module ProgramsSection
 */

import { observeElements } from '../utils/animations.js';

/**
 * Program data structure with comprehensive details
 */
const programs = [
  {
    id: 'education',
    title: 'Education Programs',
    icon: '📚',
    description: 'Providing quality education and learning resources to children in underserved communities. Our programs focus on literacy, numeracy, and critical thinking skills.',
    initiatives: [
      'After-school tutoring and homework support',
      'School supplies and textbook distribution',
      'Digital literacy and computer training',
      'Scholarship programs for secondary education'
    ],
    impact: {
      metric: '500+',
      label: 'Students Supported'
    },
    color: 'primary'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Support',
    icon: '🏥',
    description: 'Ensuring access to essential healthcare services and promoting wellness in our communities through preventive care and health education.',
    initiatives: [
      'Free medical checkups and consultations',
      'Vaccination and immunization drives',
      'Health awareness workshops',
      'Emergency medical assistance fund'
    ],
    impact: {
      metric: '1,200+',
      label: 'Health Screenings'
    },
    color: 'secondary'
  },
  {
    id: 'nutrition',
    title: 'Nutrition Programs',
    icon: '🍎',
    description: 'Fighting malnutrition through balanced meal programs and nutrition education to ensure healthy growth and development of children.',
    initiatives: [
      'Daily nutritious meal distribution',
      'Nutrition education for families',
      'Food security support programs',
      'Growth monitoring and supplementation'
    ],
    impact: {
      metric: '800+',
      label: 'Daily Meals Served'
    },
    color: 'accent'
  },
  {
    id: 'skills',
    title: 'Skills Development',
    icon: '🛠️',
    description: 'Empowering youth and adults with vocational training and entrepreneurship skills to create sustainable livelihoods and economic independence.',
    initiatives: [
      'Vocational training workshops',
      'Entrepreneurship mentorship programs',
      'Job placement assistance',
      'Microfinance and business support'
    ],
    impact: {
      metric: '300+',
      label: 'Trainees Graduated'
    },
    color: 'primary'
  },
  {
    id: 'community',
    title: 'Community Engagement',
    icon: '🤝',
    description: 'Building stronger communities through collaborative initiatives, cultural programs, and environmental sustainability projects.',
    initiatives: [
      'Community clean-up campaigns',
      'Cultural festivals and celebrations',
      'Youth leadership development',
      'Environmental conservation projects'
    ],
    impact: {
      metric: '2,000+',
      label: 'Community Members Engaged'
    },
    color: 'secondary'
  },
  {
    id: 'women',
    title: 'Women Empowerment',
    icon: '👩',
    description: 'Supporting women through education, skills training, and advocacy programs to promote gender equality and economic empowerment.',
    initiatives: [
      'Women\'s literacy programs',
      'Financial literacy workshops',
      'Leadership training for women',
      'Support groups and counseling'
    ],
    impact: {
      metric: '400+',
      label: 'Women Empowered'
    },
    color: 'accent'
  }
];

/**
 * Get color classes based on program color theme
 * @param {string} color - Color theme identifier
 * @returns {Object} Tailwind color classes
 */
const getColorClasses = (color) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      icon: 'bg-primary-100',
      text: 'text-primary-600',
      hover: 'hover:border-primary-300'
    },
    secondary: {
      bg: 'bg-secondary-50',
      border: 'border-secondary-200',
      icon: 'bg-secondary-100',
      text: 'text-secondary-600',
      hover: 'hover:border-secondary-300'
    },
    accent: {
      bg: 'bg-accent-50',
      border: 'border-accent-200',
      icon: 'bg-accent-100',
      text: 'text-accent-600',
      hover: 'hover:border-accent-300'
    }
  };

  return colorMap[color] || colorMap.primary;
};

/**
 * Create program card HTML
 * @param {Object} program - Program data object
 * @returns {string} HTML string for program card
 */
const createProgramCard = (program) => {
  const colors = getColorClasses(program.color);
  
  return `
    <article 
      class="program-card ${colors.bg} border-2 ${colors.border} ${colors.hover} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
      data-program-id="${program.id}"
      role="article"
      aria-labelledby="program-${program.id}-title"
    >
      <div class="flex flex-col h-full">
        <!-- Icon and Title -->
        <div class="flex items-start gap-4 mb-4">
          <div class="${colors.icon} rounded-xl p-4 text-4xl flex-shrink-0" aria-hidden="true">
            ${program.icon}
          </div>
          <div class="flex-1">
            <h3 
              id="program-${program.id}-title"
              class="text-2xl font-bold ${colors.text} mb-2"
            >
              ${program.title}
            </h3>
            <div class="flex items-center gap-2 text-sm ${colors.text} font-semibold">
              <span class="text-3xl font-bold">${program.impact.metric}</span>
              <span class="opacity-75">${program.impact.label}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-700 mb-4 leading-relaxed">
          ${program.description}
        </p>

        <!-- Initiatives List -->
        <div class="mt-auto">
          <h4 class="text-sm font-semibold ${colors.text} mb-3 uppercase tracking-wide">
            Key Initiatives
          </h4>
          <ul class="space-y-2" role="list">
            ${program.initiatives.map(initiative => `
              <li class="flex items-start gap-2 text-sm text-gray-600">
                <svg 
                  class="w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>${initiative}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Call to Action -->
        <div class="mt-6 pt-6 border-t ${colors.border}">
          <a 
            href="#get-involved" 
            class="inline-flex items-center gap-2 ${colors.text} font-semibold hover:underline transition-all duration-200"
            aria-label="Get involved with ${program.title}"
          >
            <span>Get Involved</span>
            <svg 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
};

/**
 * Create Programs section HTML structure
 * @returns {string} Complete section HTML
 */
const createProgramsSection = () => {
  return `
    <section 
      id="programs" 
      class="section-container bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="programs-heading"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <header class="text-center mb-16 animate-fadeInUp">
          <h2 
            id="programs-heading"
            class="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our <span class="text-gradient">Programs</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive initiatives designed to create lasting impact in education, 
            healthcare, nutrition, and community development. Each program is tailored 
            to address specific needs and empower individuals for a better future.
          </p>
        </header>

        <!-- Programs Grid -->
        <div 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Programs list"
        >
          ${programs.map(program => createProgramCard(program)).join('')}
        </div>

        <!-- Call to Action Footer -->
        <footer class="mt-16 text-center animate-fadeInUp">
          <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 class="text-3xl font-bold mb-4">
              Want to Support Our Programs?
            </h3>
            <p class="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
              Your contribution helps us expand our reach and create more opportunities 
              for children and families in need. Every donation makes a difference.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#donate" 
                class="btn-hero-primary inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100"
                aria-label="Donate to support our programs"
              >
                <svg 
                  class="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Donate Now</span>
              </a>
              <a 
                href="#volunteer" 
                class="btn-hero-secondary inline-flex items-center gap-2"
                aria-label="Volunteer with our programs"
              >
                <svg 
                  class="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Become a Volunteer</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  `;
};

/**
 * Initialize Programs section with animations and interactions
 */
const initializeProgramsSection = () => {
  try {
    // Observe program cards for scroll animations
    const programCards = document.querySelectorAll('.program-card');
    if (programCards.length > 0) {
      observeElements(programCards, 'animate-fadeInUp', {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
    }

    // Track program card interactions for analytics
    programCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const programId = card.dataset.programId;
        if (programId) {
          console.log(`[Programs] User viewing program: ${programId}`);
        }
      });

      // Track CTA clicks
      const ctaLink = card.querySelector('a[href="#get-involved"]');
      if (ctaLink) {
        ctaLink.addEventListener('click', (e) => {
          const programId = card.dataset.programId;
          console.log(`[Programs] Get involved clicked for: ${programId}`);
        });
      }
    });

    // Track main CTA button clicks
    const donateBtn = document.querySelector('a[href="#donate"]');
    const volunteerBtn = document.querySelector('a[href="#volunteer"]');

    if (donateBtn) {
      donateBtn.addEventListener('click', () => {
        console.log('[Programs] Donate CTA clicked');
      });
    }

    if (volunteerBtn) {
      volunteerBtn.addEventListener('click', () => {
        console.log('[Programs] Volunteer CTA clicked');
      });
    }

    console.log('[Programs] Section initialized successfully');
  } catch (error) {
    console.error('[Programs] Initialization error:', error);
  }
};

/**
 * Render Programs section to DOM
 * @param {string} containerId - ID of container element
 */
export const renderProgramsSection = (containerId = 'app') => {
  try {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`[Programs] Container element #${containerId} not found`);
      return;
    }

    const sectionHTML = createProgramsSection();
    container.insertAdjacentHTML('beforeend', sectionHTML);

    // Initialize after DOM insertion
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeProgramsSection);
    } else {
      initializeProgramsSection();
    }

    console.log('[Programs] Section rendered successfully');
  } catch (error) {
    console.error('[Programs] Render error:', error);
  }
};

/**
 * Get program data by ID
 * @param {string} programId - Program identifier
 * @returns {Object|null} Program data or null if not found
 */
export const getProgramById = (programId) => {
  return programs.find(program => program.id === programId) || null;
};

/**
 * Get all programs data
 * @returns {Array} Array of all program objects
 */
export const getAllPrograms = () => {
  return [...programs];
};

export default {
  renderProgramsSection,
  getProgramById,
  getAllPrograms
};
```
```