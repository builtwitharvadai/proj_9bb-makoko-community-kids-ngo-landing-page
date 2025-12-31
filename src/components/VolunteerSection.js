/**
 * VolunteerSection Component
 * 
 * Displays volunteer opportunities with detailed role descriptions,
 * benefits of volunteering, and call-to-action for applications.
 * Implements responsive design with engaging visual elements.
 * 
 * @module components/VolunteerSection
 */

import { icons } from '../utils/icons.js';

/**
 * Volunteer opportunities data structure
 */
const volunteerOpportunities = [
  {
    id: 'education-mentor',
    title: 'Education Mentor',
    category: 'Education',
    commitment: 'Weekly',
    duration: '2-3 hours/week',
    description: 'Guide children through their learning journey, providing homework help and academic support.',
    skills: ['Teaching', 'Patience', 'Communication'],
    impact: 'Help 5-10 children improve their academic performance',
    icon: icons.education,
    color: 'primary',
  },
  {
    id: 'health-volunteer',
    title: 'Health & Wellness Volunteer',
    category: 'Healthcare',
    commitment: 'Monthly',
    duration: '4-6 hours/month',
    description: 'Assist with health screenings, nutrition education, and wellness workshops for families.',
    skills: ['Healthcare', 'First Aid', 'Empathy'],
    impact: 'Support health initiatives reaching 50+ families',
    icon: icons.health,
    color: 'secondary',
  },
  {
    id: 'community-organizer',
    title: 'Community Event Organizer',
    category: 'Community',
    commitment: 'Project-based',
    duration: 'Flexible',
    description: 'Plan and coordinate community events, fundraisers, and awareness campaigns.',
    skills: ['Organization', 'Leadership', 'Creativity'],
    impact: 'Organize events that engage 100+ community members',
    icon: icons.community,
    color: 'accent',
  },
  {
    id: 'skills-trainer',
    title: 'Skills Development Trainer',
    category: 'Empowerment',
    commitment: 'Weekly',
    duration: '3-4 hours/week',
    description: 'Teach vocational skills, computer literacy, or entrepreneurship to youth and adults.',
    skills: ['Technical Skills', 'Training', 'Mentorship'],
    impact: 'Empower 15-20 individuals with marketable skills',
    icon: icons.skills,
    color: 'primary',
  },
];

/**
 * Benefits of volunteering data
 */
const volunteerBenefits = [
  {
    title: 'Make Real Impact',
    description: 'Directly contribute to transforming lives in the Makoko community',
    icon: icons.impact,
  },
  {
    title: 'Develop Skills',
    description: 'Gain valuable experience in community development and leadership',
    icon: icons.growth,
  },
  {
    title: 'Build Connections',
    description: 'Join a passionate community of changemakers and volunteers',
    icon: icons.community,
  },
  {
    title: 'Flexible Commitment',
    description: 'Choose opportunities that fit your schedule and availability',
    icon: icons.time,
  },
];

/**
 * Volunteer testimonials data
 */
const volunteerTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Education Mentor',
    duration: '2 years',
    quote: 'Volunteering with Makoko Community Kids has been the most rewarding experience of my life. Seeing the children\'s progress and knowing I played a part in their journey is incredibly fulfilling.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Skills Trainer',
    duration: '1 year',
    quote: 'Teaching computer skills to youth in Makoko opened my eyes to the power of education. The enthusiasm and dedication of the students inspire me every week.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Amara Okafor',
    role: 'Community Organizer',
    duration: '6 months',
    quote: 'Being part of organizing community events has shown me the strength and resilience of the Makoko community. Every event brings us closer together.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
];

/**
 * Creates a volunteer opportunity card element
 * @param {Object} opportunity - Volunteer opportunity data
 * @returns {HTMLElement} Opportunity card element
 */
function createOpportunityCard(opportunity) {
  const card = document.createElement('div');
  card.className = 'card group cursor-pointer h-full flex flex-col';
  card.setAttribute('data-opportunity-id', opportunity.id);
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `${opportunity.title} volunteer opportunity`);

  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-secondary-50',
    accent: 'text-accent-600 bg-accent-50',
  };

  const iconColorClass = colorClasses[opportunity.color] || colorClasses.primary;

  card.innerHTML = `
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex items-start justify-between mb-4">
        <div class="w-14 h-14 rounded-xl ${iconColorClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          ${opportunity.icon}
        </div>
        <span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          ${opportunity.commitment}
        </span>
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-${opportunity.color}-600 transition-colors">
        ${opportunity.title}
      </h3>

      <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${opportunity.duration}</span>
      </div>

      <p class="text-gray-600 mb-4 flex-1">
        ${opportunity.description}
      </p>

      <div class="mb-4">
        <p class="text-sm font-semibold text-gray-700 mb-2">Skills Needed:</p>
        <div class="flex flex-wrap gap-2">
          ${opportunity.skills.map(skill => `
            <span class="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">
              ${skill}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-gray-100">
        <div class="flex items-start gap-2 text-sm text-${opportunity.color}-600">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="font-medium">${opportunity.impact}</span>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6">
      <button 
        class="btn btn-outline w-full group-hover:bg-${opportunity.color}-600 group-hover:text-white group-hover:border-${opportunity.color}-600"
        aria-label="Apply for ${opportunity.title}"
      >
        Learn More & Apply
        <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  `;

  return card;
}

/**
 * Creates a benefit card element
 * @param {Object} benefit - Benefit data
 * @returns {HTMLElement} Benefit card element
 */
function createBenefitCard(benefit) {
  const card = document.createElement('div');
  card.className = 'flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1';
  card.setAttribute('role', 'article');

  card.innerHTML = `
    <div class="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-primary-600 mb-4">
      ${benefit.icon}
    </div>
    <h3 class="text-lg font-bold text-gray-900 mb-2">
      ${benefit.title}
    </h3>
    <p class="text-gray-600 text-sm">
      ${benefit.description}
    </p>
  `;

  return card;
}

/**
 * Creates a testimonial card element
 * @param {Object} testimonial - Testimonial data
 * @returns {HTMLElement} Testimonial card element
 */
function createTestimonialCard(testimonial) {
  const card = document.createElement('div');
  card.className = 'testimonial';
  card.setAttribute('role', 'article');

  card.innerHTML = `
    <div class="flex items-start gap-4 mb-4">
      <img 
        src="${testimonial.image}" 
        alt="${testimonial.name}"
        class="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
        loading="lazy"
      />
      <div>
        <h4 class="font-bold text-gray-900">${testimonial.name}</h4>
        <p class="text-sm text-primary-600 font-medium">${testimonial.role}</p>
        <p class="text-xs text-gray-500">Volunteering for ${testimonial.duration}</p>
      </div>
    </div>
    <p class="text-gray-700 italic leading-relaxed pl-8">
      "${testimonial.quote}"
    </p>
  `;

  return card;
}

/**
 * Handles opportunity card click events
 * @param {Event} event - Click event
 */
function handleOpportunityClick(event) {
  const card = event.currentTarget;
  const opportunityId = card.getAttribute('data-opportunity-id');
  
  // Scroll to volunteer application form (to be implemented in VolunteerApplicationForm.js)
  const applicationSection = document.getElementById('volunteer-application');
  if (applicationSection) {
    applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Pre-select the opportunity in the form if available
    const opportunitySelect = document.getElementById('volunteer-opportunity');
    if (opportunitySelect) {
      opportunitySelect.value = opportunityId;
      opportunitySelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

/**
 * Initializes the volunteer section with all components
 * @returns {HTMLElement} Complete volunteer section element
 */
export function createVolunteerSection() {
  const section = document.createElement('section');
  section.id = 'volunteer';
  section.className = 'section-container bg-gradient-to-b from-white to-gray-50';
  section.setAttribute('aria-labelledby', 'volunteer-heading');

  section.innerHTML = `
    <!-- Section Header -->
    <header class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
        ${icons.volunteer}
      </div>
      <h2 id="volunteer-heading" class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Join Our <span class="text-gradient">Volunteer Community</span>
      </h2>
      <p class="text-xl text-gray-600 leading-relaxed">
        Make a lasting impact in the Makoko community. Whether you have a few hours a week or want to contribute on a project basis, there's a perfect opportunity for you to make a difference.
      </p>
    </header>

    <!-- Why Volunteer Section -->
    <div class="mb-20">
      <h3 class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
        Why Volunteer With Us?
      </h3>
      <div id="benefits-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Benefits will be inserted here -->
      </div>
    </div>

    <!-- Volunteer Opportunities -->
    <div class="mb-20">
      <div class="text-center mb-12">
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Available Opportunities
        </h3>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our volunteer roles and find the perfect match for your skills, interests, and availability.
        </p>
      </div>
      <div id="opportunities-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Opportunities will be inserted here -->
      </div>
      <div class="text-center">
        <p class="text-gray-600 mb-6">
          Don't see a role that fits? We welcome volunteers with diverse skills and interests.
        </p>
        <a 
          href="#volunteer-application" 
          class="btn btn-outline inline-flex items-center gap-2"
          aria-label="Contact us about custom volunteer opportunities"
        >
          Contact Us About Custom Opportunities
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Volunteer Testimonials -->
    <div class="mb-16">
      <h3 class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
        Hear From Our Volunteers
      </h3>
      <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Real stories from volunteers who are making a difference in the Makoko community.
      </p>
      <div id="testimonials-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Testimonials will be inserted here -->
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
      <h3 class="text-3xl md:text-4xl font-bold mb-4">
        Ready to Make a Difference?
      </h3>
      <p class="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
        Join our community of dedicated volunteers and help transform lives in Makoko. Your time and skills can create lasting change.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="#volunteer-application" 
          class="btn bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
          aria-label="Apply to volunteer now"
        >
          Apply to Volunteer Now
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a 
          href="#contact" 
          class="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-bold transition-all"
          aria-label="Learn more about volunteering"
        >
          Learn More
        </a>
      </div>
      <div class="mt-8 flex items-center justify-center gap-2 text-white/80 text-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Your information is secure and will only be used for volunteer coordination</span>
      </div>
    </div>
  `;

  // Populate benefits grid
  const benefitsGrid = section.querySelector('#benefits-grid');
  volunteerBenefits.forEach(benefit => {
    benefitsGrid.appendChild(createBenefitCard(benefit));
  });

  // Populate opportunities grid
  const opportunitiesGrid = section.querySelector('#opportunities-grid');
  volunteerOpportunities.forEach(opportunity => {
    const card = createOpportunityCard(opportunity);
    card.addEventListener('click', handleOpportunityClick);
    opportunitiesGrid.appendChild(card);
  });

  // Populate testimonials grid
  const testimonialsGrid = section.querySelector('#testimonials-grid');
  volunteerTestimonials.forEach(testimonial => {
    testimonialsGrid.appendChild(createTestimonialCard(testimonial));
  });

  return section;
}

/**
 * Initializes the volunteer section and appends it to the main element
 */
export function initVolunteerSection() {
  const main = document.querySelector('main');
  if (!main) {
    console.error('Main element not found. Cannot initialize volunteer section.');
    return;
  }

  const volunteerSection = createVolunteerSection();
  main.appendChild(volunteerSection);

  // Log initialization for observability
  console.log('Volunteer section initialized with', {
    opportunities: volunteerOpportunities.length,
    benefits: volunteerBenefits.length,
    testimonials: volunteerTestimonials.length,
  });
}