/**
 * RoleCard Component
 * 
 * Reusable volunteer role card component displaying role information
 * with interactive hover effects and responsive design.
 * 
 * @module components/RoleCard
 * @version 1.0.0
 */

/**
 * Creates a volunteer role card element with all role details
 * 
 * @param {Object} role - Role data object
 * @param {string} role.id - Unique role identifier
 * @param {string} role.title - Role title
 * @param {string} role.description - Role description
 * @param {string[]} role.requirements - Array of role requirements
 * @param {string} role.timeCommitment - Time commitment description
 * @param {string} role.category - Role category for styling
 * @returns {HTMLElement} Role card element
 */
export function createRoleCard(role) {
  if (!role || typeof role !== 'object') {
    console.error('[RoleCard] Invalid role data provided:', role);
    return createErrorCard();
  }

  const {
    id,
    title,
    description,
    requirements = [],
    timeCommitment,
    category = 'general',
  } = role;

  if (!title || !description) {
    console.error('[RoleCard] Missing required role fields:', role);
    return createErrorCard();
  }

  const card = document.createElement('article');
  card.className = 'role-card bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group';
  card.setAttribute('data-role-id', id || '');
  card.setAttribute('data-category', category);

  const categoryColor = getCategoryColor(category);

  card.innerHTML = `
    <div class="relative">
      <div class="absolute top-0 left-0 right-0 h-2 ${categoryColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
              ${escapeHtml(title)}
            </h3>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadgeClass(category)}">
              ${escapeHtml(category)}
            </span>
          </div>
          <div class="ml-4 flex-shrink-0">
            <div class="w-12 h-12 rounded-full ${categoryColor} bg-opacity-10 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              ${getCategoryIcon(category)}
            </div>
          </div>
        </div>

        <p class="text-gray-600 leading-relaxed mb-6">
          ${escapeHtml(description)}
        </p>

        ${requirements.length > 0 ? `
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Requirements
            </h4>
            <ul class="space-y-2">
              ${requirements.map(req => `
                <li class="flex items-start text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>${escapeHtml(req)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${timeCommitment ? `
          <div class="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div class="flex items-center text-sm">
              <svg class="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Time Commitment:</span>
                <span class="text-gray-700 ml-1">${escapeHtml(timeCommitment)}</span>
              </div>
            </div>
          </div>
        ` : ''}

        <button 
          type="button"
          class="role-apply-btn w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center group"
          data-role-id="${id || ''}"
          data-role-title="${escapeHtml(title)}"
          aria-label="Apply for ${escapeHtml(title)} position"
        >
          <span>Apply Now</span>
          <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  attachCardEventListeners(card);

  return card;
}

/**
 * Gets the Tailwind color class for a role category
 * 
 * @param {string} category - Role category
 * @returns {string} Tailwind color class
 */
function getCategoryColor(category) {
  const colors = {
    education: 'bg-blue-500',
    healthcare: 'bg-red-500',
    community: 'bg-green-500',
    skills: 'bg-purple-500',
    mentorship: 'bg-yellow-500',
    general: 'bg-gray-500',
  };

  return colors[category.toLowerCase()] || colors.general;
}

/**
 * Gets the badge styling class for a role category
 * 
 * @param {string} category - Role category
 * @returns {string} Tailwind badge classes
 */
function getCategoryBadgeClass(category) {
  const badges = {
    education: 'bg-blue-100 text-blue-800',
    healthcare: 'bg-red-100 text-red-800',
    community: 'bg-green-100 text-green-800',
    skills: 'bg-purple-100 text-purple-800',
    mentorship: 'bg-yellow-100 text-yellow-800',
    general: 'bg-gray-100 text-gray-800',
  };

  return badges[category.toLowerCase()] || badges.general;
}

/**
 * Gets the SVG icon for a role category
 * 
 * @param {string} category - Role category
 * @returns {string} SVG icon markup
 */
function getCategoryIcon(category) {
  const icons = {
    education: `
      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    `,
    healthcare: `
      <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    `,
    community: `
      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    `,
    skills: `
      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    `,
    mentorship: `
      <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    `,
    general: `
      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      </svg>
    `,
  };

  return icons[category.toLowerCase()] || icons.general;
}

/**
 * Escapes HTML special characters to prevent XSS
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return '';
  }

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Creates an error card when role data is invalid
 * 
 * @returns {HTMLElement} Error card element
 */
function createErrorCard() {
  const card = document.createElement('div');
  card.className = 'role-card bg-red-50 border-2 border-red-200 rounded-2xl p-6';
  card.innerHTML = `
    <div class="flex items-center text-red-800">
      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="font-semibold">Unable to load role information</p>
    </div>
  `;
  return card;
}

/**
 * Attaches event listeners to role card elements
 * 
 * @param {HTMLElement} card - Role card element
 */
function attachCardEventListeners(card) {
  const applyButton = card.querySelector('.role-apply-btn');
  
  if (applyButton) {
    applyButton.addEventListener('click', handleApplyClick);
  }

  card.addEventListener('mouseenter', handleCardHover);
  card.addEventListener('mouseleave', handleCardLeave);
}

/**
 * Handles apply button click event
 * 
 * @param {Event} event - Click event
 */
function handleApplyClick(event) {
  const button = event.currentTarget;
  const roleId = button.getAttribute('data-role-id');
  const roleTitle = button.getAttribute('data-role-title');

  const customEvent = new CustomEvent('role:apply', {
    bubbles: true,
    detail: {
      roleId,
      roleTitle,
      timestamp: Date.now(),
    },
  });

  button.dispatchEvent(customEvent);

  console.log('[RoleCard] Apply button clicked:', { roleId, roleTitle });
}

/**
 * Handles card hover event for analytics
 * 
 * @param {Event} event - Mouse enter event
 */
function handleCardHover(event) {
  const card = event.currentTarget;
  const roleId = card.getAttribute('data-role-id');

  const customEvent = new CustomEvent('role:hover', {
    bubbles: true,
    detail: {
      roleId,
      timestamp: Date.now(),
    },
  });

  card.dispatchEvent(customEvent);
}

/**
 * Handles card leave event
 * 
 * @param {Event} event - Mouse leave event
 */
function handleCardLeave(event) {
  const card = event.currentTarget;
  const roleId = card.getAttribute('data-role-id');

  const customEvent = new CustomEvent('role:leave', {
    bubbles: true,
    detail: {
      roleId,
      timestamp: Date.now(),
    },
  });

  card.dispatchEvent(customEvent);
}

/**
 * Creates multiple role cards from an array of role data
 * 
 * @param {Object[]} roles - Array of role data objects
 * @returns {HTMLElement[]} Array of role card elements
 */
export function createRoleCards(roles) {
  if (!Array.isArray(roles)) {
    console.error('[RoleCard] Invalid roles array provided:', roles);
    return [];
  }

  return roles
    .filter(role => role && typeof role === 'object')
    .map(role => createRoleCard(role));
}

/**
 * Renders role cards into a container element
 * 
 * @param {HTMLElement} container - Container element
 * @param {Object[]} roles - Array of role data objects
 * @returns {HTMLElement[]} Array of rendered role card elements
 */
export function renderRoleCards(container, roles) {
  if (!(container instanceof HTMLElement)) {
    console.error('[RoleCard] Invalid container element provided');
    return [];
  }

  const cards = createRoleCards(roles);
  
  container.innerHTML = '';
  
  cards.forEach(card => {
    container.appendChild(card);
  });

  return cards;
}