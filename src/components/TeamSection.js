/**
 * TeamSection Component
 * 
 * Displays team member profiles with photos, names, roles, and bios.
 * Implements responsive grid layout with hover effects for enhanced UX.
 * 
 * @module TeamSection
 * @version 1.0.0
 */

import { createOptimizedImage } from '../utils/imageOptimization.js';

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
 * Team members data
 * @type {TeamMember[]}
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
 * Sanitizes text content to prevent XSS attacks
 * 
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
function sanitizeText(text) {
  if (typeof text !== 'string') {
    console.error('[TeamSection] Invalid text input for sanitization:', text);
    return '';
  }

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Creates a team member card element
 * 
 * @param {TeamMember} member - Team member data
 * @returns {Promise<HTMLElement>} Team member card element
 */
async function createTeamMemberCard(member) {
  try {
    const { id, name, role, bio, photoId } = member;

    if (!id || !name || !role || !bio || !photoId) {
      throw new Error('Missing required team member data');
    }

    const card = document.createElement('article');
    card.className = 'team-member-card group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2';
    card.setAttribute('data-member-id', sanitizeText(id));
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Team member: ${sanitizeText(name)}`);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative h-80 overflow-hidden bg-gray-100';

    try {
      const img = await createOptimizedImage({
        photoId,
        alt: `${sanitizeText(name)} - ${sanitizeText(role)}`,
        width: 400,
        height: 320,
        lazy: true,
        className: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
      });

      imageContainer.appendChild(img);
    } catch (error) {
      console.error(`[TeamSection] Failed to load image for ${name}:`, error);
      
      const placeholder = document.createElement('div');
      placeholder.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100';
      placeholder.innerHTML = `
        <svg class="w-24 h-24 text-primary-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      `;
      imageContainer.appendChild(placeholder);
    }

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300';
    overlay.setAttribute('aria-hidden', 'true');
    imageContainer.appendChild(overlay);

    const content = document.createElement('div');
    content.className = 'p-6';

    const nameElement = document.createElement('h3');
    nameElement.className = 'text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300';
    nameElement.textContent = sanitizeText(name);

    const roleElement = document.createElement('p');
    roleElement.className = 'text-sm font-semibold text-primary-600 uppercase tracking-wide mb-3';
    roleElement.textContent = sanitizeText(role);

    const bioElement = document.createElement('p');
    bioElement.className = 'text-gray-600 leading-relaxed line-clamp-4';
    bioElement.textContent = sanitizeText(bio);

    content.appendChild(nameElement);
    content.appendChild(roleElement);
    content.appendChild(bioElement);

    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
  } catch (error) {
    console.error('[TeamSection] Failed to create team member card:', error);
    throw error;
  }
}

/**
 * Creates the team section header
 * 
 * @returns {HTMLElement} Header element
 */
function createTeamHeader() {
  const header = document.createElement('div');
  header.className = 'text-center max-w-3xl mx-auto mb-16';

  const title = document.createElement('h2');
  title.className = 'text-4xl md:text-5xl font-bold text-gray-900 mb-6';
  title.textContent = 'Meet Our Team';

  const description = document.createElement('p');
  description.className = 'text-xl text-gray-600 leading-relaxed';
  description.textContent = 'Dedicated professionals working together to transform the lives of children in the Makoko community. Our team brings diverse expertise and unwavering commitment to our mission.';

  header.appendChild(title);
  header.appendChild(description);

  return header;
}

/**
 * Creates the team grid container
 * 
 * @returns {Promise<HTMLElement>} Grid container with team member cards
 */
async function createTeamGrid() {
  try {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    grid.setAttribute('role', 'list');
    grid.setAttribute('aria-label', 'Team members');

    const cardPromises = TEAM_MEMBERS.map(async (member) => {
      try {
        const card = await createTeamMemberCard(member);
        card.setAttribute('role', 'listitem');
        return card;
      } catch (error) {
        console.error(`[TeamSection] Failed to create card for ${member.name}:`, error);
        return null;
      }
    });

    const cards = await Promise.all(cardPromises);
    
    cards.forEach((card) => {
      if (card) {
        grid.appendChild(card);
      }
    });

    if (grid.children.length === 0) {
      throw new Error('No team member cards were successfully created');
    }

    return grid;
  } catch (error) {
    console.error('[TeamSection] Failed to create team grid:', error);
    throw error;
  }
}

/**
 * Creates and renders the complete team section
 * 
 * @param {HTMLElement} container - Container element to render into
 * @returns {Promise<void>}
 */
async function renderTeamSection(container) {
  try {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Invalid container element provided');
    }

    const section = document.createElement('section');
    section.id = 'team-section';
    section.className = 'section-container bg-gradient-to-b from-white to-gray-50';
    section.setAttribute('aria-labelledby', 'team-section-title');

    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-7xl mx-auto';

    const header = createTeamHeader();
    wrapper.appendChild(header);

    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'flex justify-center items-center py-12';
    loadingIndicator.innerHTML = `
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" role="status" aria-label="Loading team members">
        <span class="sr-only">Loading team members...</span>
      </div>
    `;
    wrapper.appendChild(loadingIndicator);

    section.appendChild(wrapper);
    container.appendChild(section);

    try {
      const grid = await createTeamGrid();
      wrapper.removeChild(loadingIndicator);
      wrapper.appendChild(grid);

      console.info('[TeamSection] Team section rendered successfully with', TEAM_MEMBERS.length, 'members');
    } catch (error) {
      wrapper.removeChild(loadingIndicator);
      
      const errorMessage = document.createElement('div');
      errorMessage.className = 'text-center py-12';
      errorMessage.innerHTML = `
        <p class="text-red-600 text-lg font-semibold mb-2">Failed to load team members</p>
        <p class="text-gray-600">Please try refreshing the page</p>
      `;
      wrapper.appendChild(errorMessage);
      
      throw error;
    }
  } catch (error) {
    console.error('[TeamSection] Failed to render team section:', error);
    throw error;
  }
}

/**
 * Initializes the team section
 * 
 * @param {string|HTMLElement} containerSelector - Container selector or element
 * @returns {Promise<void>}
 */
async function initTeamSection(containerSelector) {
  try {
    const container =
      typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!container) {
      throw new Error(`Container not found: ${containerSelector}`);
    }

    await renderTeamSection(container);
  } catch (error) {
    console.error('[TeamSection] Initialization failed:', error);
    throw error;
  }
}

export { initTeamSection, renderTeamSection, createTeamMemberCard, TEAM_MEMBERS };

export default {
  init: initTeamSection,
  render: renderTeamSection,
  createCard: createTeamMemberCard,
  members: TEAM_MEMBERS,
};