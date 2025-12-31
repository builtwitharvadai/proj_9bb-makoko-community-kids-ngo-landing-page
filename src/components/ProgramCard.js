/**
 * ProgramCard Component
 * 
 * Reusable card component for displaying individual NGO program initiatives.
 * Features hover effects, responsive design, and accessibility support.
 * 
 * @module components/ProgramCard
 */

/**
 * Creates a program card element with icon, title, description, metrics, and CTA
 * 
 * @param {Object} program - Program data object
 * @param {string} program.id - Unique program identifier
 * @param {string} program.icon - Icon identifier or emoji for the program
 * @param {string} program.title - Program title
 * @param {string} program.description - Program description
 * @param {Object} program.impact - Impact metrics object
 * @param {string} program.impact.metric - Impact metric label
 * @param {string} program.impact.value - Impact metric value
 * @param {string} program.ctaText - Call-to-action button text
 * @param {string} program.ctaLink - Call-to-action link URL
 * @returns {HTMLElement} Program card element
 */
export function createProgramCard(program) {
  // Validate required program data
  if (!program || typeof program !== 'object') {
    console.error('ProgramCard: Invalid program data provided', { program });
    return createErrorCard('Invalid program data');
  }

  const { id, icon, title, description, impact, ctaText, ctaLink } = program;

  // Validate required fields
  if (!title || !description) {
    console.error('ProgramCard: Missing required fields', { program });
    return createErrorCard('Incomplete program information');
  }

  // Create card container
  const card = document.createElement('article');
  card.className = 'card group relative bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden';
  card.setAttribute('data-program-id', id || '');
  card.setAttribute('role', 'article');
  card.setAttribute('aria-labelledby', `program-title-${id || 'unknown'}`);

  // Create card inner container
  const cardInner = document.createElement('div');
  cardInner.className = 'p-6 sm:p-8 flex flex-col h-full';

  // Create icon container
  const iconContainer = document.createElement('div');
  iconContainer.className = 'w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 group-hover:scale-110 transition-transform duration-300';
  iconContainer.setAttribute('aria-hidden', 'true');

  // Create icon element
  const iconElement = document.createElement('span');
  iconElement.className = 'text-4xl sm:text-5xl';
  iconElement.textContent = icon || '📋';
  iconElement.setAttribute('role', 'img');
  iconElement.setAttribute('aria-label', `${title} icon`);

  iconContainer.appendChild(iconElement);

  // Create title element
  const titleElement = document.createElement('h3');
  titleElement.id = `program-title-${id || 'unknown'}`;
  titleElement.className = 'text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300';
  titleElement.textContent = title;

  // Create description element
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'text-base sm:text-lg text-gray-600 mb-6 flex-grow leading-relaxed';
  descriptionElement.textContent = description;

  // Create impact metrics section if provided
  let impactSection = null;
  if (impact && impact.metric && impact.value) {
    impactSection = document.createElement('div');
    impactSection.className = 'mb-6 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100';
    impactSection.setAttribute('role', 'region');
    impactSection.setAttribute('aria-label', 'Program impact metrics');

    const impactLabel = document.createElement('p');
    impactLabel.className = 'text-sm font-semibold text-primary-700 mb-1';
    impactLabel.textContent = impact.metric;

    const impactValue = document.createElement('p');
    impactValue.className = 'text-2xl sm:text-3xl font-bold text-gradient';
    impactValue.textContent = impact.value;

    impactSection.appendChild(impactLabel);
    impactSection.appendChild(impactValue);
  }

  // Create CTA button if link provided
  let ctaButton = null;
  if (ctaLink) {
    ctaButton = document.createElement('a');
    ctaButton.href = sanitizeUrl(ctaLink);
    ctaButton.className = 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 group-hover:shadow-lg';
    ctaButton.textContent = ctaText || 'Learn More';
    ctaButton.setAttribute('aria-label', `${ctaText || 'Learn more'} about ${title}`);

    // Add arrow icon
    const arrowIcon = document.createElement('span');
    arrowIcon.className = 'transform group-hover:translate-x-1 transition-transform duration-300';
    arrowIcon.textContent = '→';
    arrowIcon.setAttribute('aria-hidden', 'true');

    ctaButton.appendChild(arrowIcon);

    // Track CTA clicks
    ctaButton.addEventListener('click', () => {
      logProgramInteraction('cta_click', program);
    });
  }

  // Assemble card
  cardInner.appendChild(iconContainer);
  cardInner.appendChild(titleElement);
  cardInner.appendChild(descriptionElement);
  
  if (impactSection) {
    cardInner.appendChild(impactSection);
  }
  
  if (ctaButton) {
    cardInner.appendChild(ctaButton);
  }

  card.appendChild(cardInner);

  // Add hover interaction logging
  card.addEventListener('mouseenter', () => {
    logProgramInteraction('card_hover', program);
  });

  // Add keyboard navigation support
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && ctaButton) {
      event.preventDefault();
      ctaButton.click();
    }
  });

  return card;
}

/**
 * Creates an error card for display when program data is invalid
 * 
 * @param {string} message - Error message to display
 * @returns {HTMLElement} Error card element
 */
function createErrorCard(message) {
  const errorCard = document.createElement('div');
  errorCard.className = 'card p-6 bg-red-50 border border-red-200 rounded-2xl';
  errorCard.setAttribute('role', 'alert');
  errorCard.setAttribute('aria-live', 'polite');

  const errorIcon = document.createElement('span');
  errorIcon.className = 'text-4xl mb-4 block';
  errorIcon.textContent = '⚠️';
  errorIcon.setAttribute('aria-hidden', 'true');

  const errorText = document.createElement('p');
  errorText.className = 'text-red-800 font-semibold';
  errorText.textContent = message;

  errorCard.appendChild(errorIcon);
  errorCard.appendChild(errorText);

  return errorCard;
}

/**
 * Sanitizes URL to prevent XSS attacks
 * 
 * @param {string} url - URL to sanitize
 * @returns {string} Sanitized URL
 */
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') {
    return '#';
  }

  // Remove any javascript: or data: protocols
  const sanitized = url.trim().toLowerCase();
  if (sanitized.startsWith('javascript:') || sanitized.startsWith('data:')) {
    console.warn('ProgramCard: Blocked potentially unsafe URL', { url });
    return '#';
  }

  return url.trim();
}

/**
 * Logs program interaction for analytics
 * 
 * @param {string} action - Interaction action type
 * @param {Object} program - Program data object
 */
function logProgramInteraction(action, program) {
  try {
    const interactionData = {
      timestamp: new Date().toISOString(),
      action,
      programId: program.id,
      programTitle: program.title,
      component: 'ProgramCard'
    };

    console.log('Program interaction:', interactionData);

    // Dispatch custom event for analytics tracking
    const event = new CustomEvent('program-interaction', {
      detail: interactionData,
      bubbles: true
    });
    document.dispatchEvent(event);
  } catch (error) {
    console.error('ProgramCard: Failed to log interaction', { error, action, program });
  }
}

/**
 * Creates multiple program cards from an array of program data
 * 
 * @param {Array<Object>} programs - Array of program data objects
 * @returns {Array<HTMLElement>} Array of program card elements
 */
export function createProgramCards(programs) {
  if (!Array.isArray(programs)) {
    console.error('ProgramCard: Expected array of programs', { programs });
    return [createErrorCard('Invalid programs data')];
  }

  if (programs.length === 0) {
    console.warn('ProgramCard: No programs provided');
    return [];
  }

  return programs.map(program => createProgramCard(program));
}

/**
 * Renders program cards into a container element
 * 
 * @param {HTMLElement} container - Container element to render cards into
 * @param {Array<Object>} programs - Array of program data objects
 * @param {Object} options - Rendering options
 * @param {string} options.gridClass - CSS classes for grid layout
 */
export function renderProgramCards(container, programs, options = {}) {
  if (!container || !(container instanceof HTMLElement)) {
    console.error('ProgramCard: Invalid container element', { container });
    return;
  }

  const { gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8' } = options;

  // Clear existing content
  container.innerHTML = '';

  // Create grid container
  const gridContainer = document.createElement('div');
  gridContainer.className = gridClass;
  gridContainer.setAttribute('role', 'list');
  gridContainer.setAttribute('aria-label', 'Programs list');

  // Create and append cards
  const cards = createProgramCards(programs);
  cards.forEach(card => {
    const listItem = document.createElement('div');
    listItem.setAttribute('role', 'listitem');
    listItem.appendChild(card);
    gridContainer.appendChild(listItem);
  });

  container.appendChild(gridContainer);

  console.log('ProgramCard: Rendered cards', { 
    count: cards.length, 
    containerId: container.id 
  });
}

export default {
  createProgramCard,
  createProgramCards,
  renderProgramCards
};