/**
 * ImpactSection Component
 * 
 * Displays NGO impact statistics, testimonials, and success stories with
 * animated counters and responsive design. Implements Intersection Observer
 * for performance-optimized animations.
 * 
 * @module components/ImpactSection
 */

/**
 * Creates and manages the Impact section with statistics and testimonials
 * @returns {HTMLElement} The complete impact section element
 */
export function createImpactSection() {
  const section = document.createElement('section');
  section.id = 'impact-section';
  section.className = 'section-container bg-gradient-to-br from-gray-50 to-primary-50';
  section.setAttribute('aria-labelledby', 'impact-heading');

  section.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 id="impact-heading" class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Impact in <span class="text-gradient">Makoko</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming lives through education, empowerment, and community support
        </p>
      </div>

      <!-- Statistics Dashboard -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" role="region" aria-label="Impact statistics">
        ${createStatCard('children-helped', '500', 'Children Helped', 'Students supported with education and resources', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')}
        ${createStatCard('programs-run', '25', 'Active Programs', 'Educational and community development initiatives', 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4')}
        ${createStatCard('volunteers', '150', 'Volunteers', 'Dedicated community members making a difference', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z')}
        ${createStatCard('community-reach', '2000', 'Community Reach', 'Families impacted through our programs', 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z')}
      </div>

      <!-- Impact Overview -->
      <div class="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-20">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">
              Making a Real Difference
            </h3>
            <div class="space-y-4">
              ${createImpactPoint('Education Access', 'Providing quality education to children who would otherwise have no access to schooling')}
              ${createImpactPoint('Skill Development', 'Empowering youth with vocational training and life skills for sustainable futures')}
              ${createImpactPoint('Community Support', 'Building stronger families through health, nutrition, and social programs')}
              ${createImpactPoint('Future Leaders', 'Nurturing the next generation of community leaders and change-makers')}
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <svg class="w-48 h-48 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="mb-20">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-12">
          Stories from Our Community
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="region" aria-label="Community testimonials">
          ${createTestimonialCard(
            'This organization changed my life. I can now read and write, and I dream of becoming a teacher.',
            'Chioma A.',
            'Student, Age 14',
            'student'
          )}
          ${createTestimonialCard(
            'Volunteering here has been the most rewarding experience. Seeing the children\'s progress fills my heart with joy.',
            'David O.',
            'Volunteer Teacher',
            'volunteer'
          )}
          ${createTestimonialCard(
            'My daughter now has opportunities I never had. This program is giving our children hope for a better future.',
            'Mrs. Adebayo',
            'Parent',
            'parent'
          )}
        </div>
      </div>

      <!-- Success Story Highlight -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl shadow-medium p-8 md:p-12 text-white">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-3xl md:text-4xl font-bold mb-6">
            Success Story: From Student to Teacher
          </h3>
          <p class="text-lg md:text-xl leading-relaxed mb-8 text-white/95">
            Meet Emmanuel, who joined our program at age 10 with no formal education. Today, at 22, 
            he has completed secondary school and returned to Makoko as a volunteer teacher, 
            inspiring the next generation. His journey represents the transformative power of 
            education and the ripple effect of community support.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div class="text-3xl font-bold">12</div>
              <div class="text-sm text-white/90">Years of Growth</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div class="text-3xl font-bold">50+</div>
              <div class="text-sm text-white/90">Students Taught</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div class="text-3xl font-bold">∞</div>
              <div class="text-sm text-white/90">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}

/**
 * Creates a statistics card with animated counter
 * @param {string} id - Unique identifier for the stat
 * @param {string} targetValue - Target number to count to
 * @param {string} label - Main label for the statistic
 * @param {string} description - Detailed description
 * @param {string} iconPath - SVG path data for the icon
 * @returns {string} HTML string for the stat card
 */
function createStatCard(id, targetValue, label, description, iconPath) {
  return `
    <div class="stat-card" role="article" aria-labelledby="${id}-label">
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path>
          </svg>
        </div>
      </div>
      <div class="stat-number" data-target="${targetValue}" data-stat-id="${id}" aria-live="polite">
        0
      </div>
      <div id="${id}-label" class="text-xl font-semibold text-gray-900 mt-2 mb-2">
        ${label}
      </div>
      <p class="text-gray-600 text-sm">
        ${description}
      </p>
    </div>
  `;
}

/**
 * Creates an impact point with icon
 * @param {string} title - Point title
 * @param {string} description - Point description
 * @returns {string} HTML string for the impact point
 */
function createImpactPoint(title, description) {
  return `
    <div class="flex gap-4">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div>
        <h4 class="font-semibold text-gray-900 mb-1">${title}</h4>
        <p class="text-gray-600">${description}</p>
      </div>
    </div>
  `;
}

/**
 * Creates a testimonial card
 * @param {string} quote - Testimonial quote
 * @param {string} name - Person's name
 * @param {string} role - Person's role
 * @param {string} type - Type of testimonial (student, volunteer, parent)
 * @returns {string} HTML string for the testimonial card
 */
function createTestimonialCard(quote, name, role, type) {
  const colors = {
    student: 'from-primary-50 to-primary-100',
    volunteer: 'from-secondary-50 to-secondary-100',
    parent: 'from-accent-50 to-accent-100'
  };

  return `
    <div class="testimonial bg-gradient-to-br ${colors[type] || colors.student}">
      <div class="relative z-10">
        <p class="text-gray-700 mb-6 italic leading-relaxed">
          "${quote}"
        </p>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <div class="font-semibold text-gray-900">${name}</div>
            <div class="text-sm text-gray-600">${role}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initializes animated counters using Intersection Observer
 * Counters animate when they come into viewport
 */
export function initializeImpactCounters() {
  const counters = document.querySelectorAll('[data-stat-id]');
  
  if (counters.length === 0) {
    return;
  }

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animatedCounters = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
        animatedCounters.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Animates a counter from 0 to target value
 * @param {HTMLElement} element - Counter element to animate
 */
function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10);
  
  if (isNaN(target)) {
    console.error(`Invalid target value for counter: ${element.dataset.target}`);
    element.textContent = element.dataset.target;
    return;
  }

  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
    
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Initializes the Impact section and its interactive features
 * Should be called after the section is added to the DOM
 */
export function initializeImpactSection() {
  try {
    initializeImpactCounters();
  } catch (error) {
    console.error('Error initializing Impact section:', error);
  }
}