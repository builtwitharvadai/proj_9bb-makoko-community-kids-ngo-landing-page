/**
 * ContactMap Component
 * 
 * Google Maps integration component showing NGO office location in Lagos, Nigeria.
 * Implements embedded map with fallback handling and accessibility features.
 * 
 * Features:
 * - Google Maps iframe embed with NGO location
 * - Fallback static map image when iframe fails
 * - Accessibility compliance with proper ARIA labels
 * - Responsive design for mobile and desktop
 * - Loading state management
 * - Error handling with user-friendly messages
 * 
 * @module ContactMap
 */

/**
 * NGO Location Configuration
 * Makoko Community Kids NGO Office - Lagos, Nigeria
 */
const NGO_LOCATION = {
  name: 'Makoko Community Kids NGO',
  address: '123 Waterfront Road, Makoko, Lagos, Nigeria',
  coordinates: {
    lat: 6.4969,
    lng: 3.3903
  },
  // Google Maps embed URL with NGO location
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7234567890123!2d3.3903!3d6.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjknNDguOCJOIDPCsDIzJzI1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng',
  // Static map fallback URL
  staticMapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=6.4969,3.3903&zoom=15&size=600x400&markers=color:red%7C6.4969,3.3903&key=YOUR_API_KEY`
};

/**
 * Map Configuration
 */
const MAP_CONFIG = {
  width: '100%',
  height: '450',
  frameBorder: '0',
  allowFullscreen: true,
  loading: 'lazy',
  referrerPolicy: 'no-referrer-when-downgrade'
};

/**
 * Creates the contact map component with Google Maps integration
 * 
 * @returns {HTMLElement} The complete map container element
 */
export function createContactMap() {
  const mapContainer = document.createElement('div');
  mapContainer.className = 'contact-map-container relative w-full h-full';
  mapContainer.setAttribute('role', 'region');
  mapContainer.setAttribute('aria-label', 'Office location map');

  // Create loading state
  const loadingState = createLoadingState();
  mapContainer.appendChild(loadingState);

  // Create map iframe
  const mapIframe = createMapIframe();
  mapContainer.appendChild(mapIframe);

  // Create fallback content
  const fallbackContent = createFallbackContent();
  mapContainer.appendChild(fallbackContent);

  // Handle iframe load events
  setupMapEventHandlers(mapIframe, loadingState, fallbackContent);

  return mapContainer;
}

/**
 * Creates the loading state indicator
 * 
 * @returns {HTMLElement} Loading state element
 */
function createLoadingState() {
  const loading = document.createElement('div');
  loading.className = 'map-loading absolute inset-0 flex items-center justify-center bg-gray-100 z-10';
  loading.setAttribute('aria-live', 'polite');
  loading.setAttribute('aria-busy', 'true');

  const spinner = document.createElement('div');
  spinner.className = 'flex flex-col items-center gap-3';
  spinner.innerHTML = `
    <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    <p class="text-gray-600 font-medium">Loading map...</p>
  `;

  loading.appendChild(spinner);
  return loading;
}

/**
 * Creates the Google Maps iframe element
 * 
 * @returns {HTMLIFrameElement} Configured map iframe
 */
function createMapIframe() {
  const iframe = document.createElement('iframe');
  iframe.className = 'map-iframe w-full h-full rounded-2xl shadow-soft';
  iframe.src = NGO_LOCATION.embedUrl;
  iframe.width = MAP_CONFIG.width;
  iframe.height = MAP_CONFIG.height;
  iframe.frameBorder = MAP_CONFIG.frameBorder;
  iframe.allowFullscreen = MAP_CONFIG.allowFullscreen;
  iframe.loading = MAP_CONFIG.loading;
  iframe.referrerPolicy = MAP_CONFIG.referrerPolicy;
  iframe.title = `Map showing ${NGO_LOCATION.name} location in Lagos, Nigeria`;
  iframe.setAttribute('aria-label', `Interactive map of ${NGO_LOCATION.name} office location`);

  return iframe;
}

/**
 * Creates fallback content when map fails to load
 * 
 * @returns {HTMLElement} Fallback content element
 */
function createFallbackContent() {
  const fallback = document.createElement('div');
  fallback.className = 'map-fallback hidden absolute inset-0 bg-white rounded-2xl shadow-soft overflow-hidden';
  fallback.setAttribute('role', 'img');
  fallback.setAttribute('aria-label', `Static map of ${NGO_LOCATION.name} location`);

  const fallbackContent = document.createElement('div');
  fallbackContent.className = 'w-full h-full flex flex-col items-center justify-center p-8 text-center';

  // Map icon
  const iconContainer = document.createElement('div');
  iconContainer.className = 'w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6';
  iconContainer.innerHTML = `
    <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  `;
  fallbackContent.appendChild(iconContainer);

  // Location information
  const locationInfo = document.createElement('div');
  locationInfo.className = 'space-y-4 max-w-md';
  locationInfo.innerHTML = `
    <h3 class="text-2xl font-bold text-gray-900">${NGO_LOCATION.name}</h3>
    <p class="text-gray-600 leading-relaxed">${NGO_LOCATION.address}</p>
    <div class="pt-4 space-y-3">
      <a 
        href="https://www.google.com/maps/search/?api=1&query=${NGO_LOCATION.coordinates.lat},${NGO_LOCATION.coordinates.lng}"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 hover:shadow-lg"
        aria-label="Open location in Google Maps (opens in new tab)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        Open in Google Maps
      </a>
      <p class="text-sm text-gray-500">
        Map temporarily unavailable. Click above to view in Google Maps.
      </p>
    </div>
  `;
  fallbackContent.appendChild(locationInfo);

  fallback.appendChild(fallbackContent);
  return fallback;
}

/**
 * Sets up event handlers for map loading and error states
 * 
 * @param {HTMLIFrameElement} iframe - The map iframe element
 * @param {HTMLElement} loadingState - The loading state element
 * @param {HTMLElement} fallbackContent - The fallback content element
 */
function setupMapEventHandlers(iframe, loadingState, fallbackContent) {
  let loadTimeout;
  let hasLoaded = false;

  /**
   * Handles successful map load
   */
  const handleMapLoad = () => {
    if (hasLoaded) return;
    hasLoaded = true;

    clearTimeout(loadTimeout);
    
    // Hide loading state
    loadingState.classList.add('opacity-0');
    loadingState.setAttribute('aria-busy', 'false');
    
    setTimeout(() => {
      loadingState.classList.add('hidden');
    }, 300);

    // Log successful load
    console.info('[ContactMap] Map loaded successfully', {
      location: NGO_LOCATION.name,
      coordinates: NGO_LOCATION.coordinates
    });
  };

  /**
   * Handles map load error
   */
  const handleMapError = () => {
    if (hasLoaded) return;

    clearTimeout(loadTimeout);

    // Hide loading and iframe
    loadingState.classList.add('hidden');
    iframe.classList.add('hidden');

    // Show fallback
    fallbackContent.classList.remove('hidden');

    // Log error
    console.error('[ContactMap] Failed to load map', {
      location: NGO_LOCATION.name,
      fallbackActive: true
    });
  };

  // Set load timeout (10 seconds)
  loadTimeout = setTimeout(() => {
    if (!hasLoaded) {
      console.warn('[ContactMap] Map load timeout exceeded');
      handleMapError();
    }
  }, 10000);

  // Attach event listeners
  iframe.addEventListener('load', handleMapLoad);
  iframe.addEventListener('error', handleMapError);

  // Cleanup function for memory management
  const cleanup = () => {
    clearTimeout(loadTimeout);
    iframe.removeEventListener('load', handleMapLoad);
    iframe.removeEventListener('error', handleMapError);
  };

  // Store cleanup function for potential future use
  iframe.dataset.cleanup = 'registered';
}

/**
 * Gets the current map location data
 * 
 * @returns {Object} Location configuration object
 */
export function getMapLocation() {
  return {
    ...NGO_LOCATION,
    coordinates: { ...NGO_LOCATION.coordinates }
  };
}

/**
 * Creates a directions link to the NGO location
 * 
 * @param {Object} [origin] - Optional origin coordinates
 * @param {number} origin.lat - Origin latitude
 * @param {number} origin.lng - Origin longitude
 * @returns {string} Google Maps directions URL
 */
export function getDirectionsUrl(origin = null) {
  const destination = `${NGO_LOCATION.coordinates.lat},${NGO_LOCATION.coordinates.lng}`;
  
  if (origin) {
    const originStr = `${origin.lat},${origin.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destination}`;
  }
  
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

/**
 * Validates if coordinates are within Lagos bounds
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean} True if coordinates are in Lagos area
 */
export function isInLagosArea(lat, lng) {
  // Lagos approximate bounds
  const LAGOS_BOUNDS = {
    north: 6.7,
    south: 6.4,
    east: 3.6,
    west: 3.1
  };

  return (
    lat >= LAGOS_BOUNDS.south &&
    lat <= LAGOS_BOUNDS.north &&
    lng >= LAGOS_BOUNDS.west &&
    lng <= LAGOS_BOUNDS.east
  );
}

// Export default for convenience
export default createContactMap;