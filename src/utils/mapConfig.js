/**
 * Google Maps Configuration and Utilities
 * 
 * Provides comprehensive Google Maps integration with API key management,
 * map styling, marker placement, error handling, and accessibility features.
 * Includes fallback options for when Maps API is unavailable.
 * 
 * @module mapConfig
 * @version 1.0.0
 */

/**
 * Map configuration constants
 */
const MAP_CONFIG = Object.freeze({
  // Default center coordinates (Lagos, Nigeria - Makoko area)
  DEFAULT_CENTER: Object.freeze({
    lat: 6.4969,
    lng: 3.3903,
  }),
  
  // Default zoom level
  DEFAULT_ZOOM: 15,
  
  // Map container ID
  CONTAINER_ID: 'map-container',
  
  // API load timeout (ms)
  API_TIMEOUT: 10000,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // Map styles
  STYLES: Object.freeze([
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }],
    },
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#fefefe' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
    },
  ]),
});

/**
 * Marker configuration
 */
const MARKER_CONFIG = Object.freeze({
  // Custom marker icon
  ICON: Object.freeze({
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52">
        <path fill="#2563eb" d="M20 0C8.954 0 0 8.954 0 20c0 14 20 32 20 32s20-18 20-32C40 8.954 31.046 0 20 0z"/>
        <circle fill="#ffffff" cx="20" cy="20" r="8"/>
      </svg>
    `),
    scaledSize: { width: 40, height: 52 },
    anchor: { x: 20, y: 52 },
  }),
  
  // Marker animation
  ANIMATION: 'DROP',
  
  // Info window configuration
  INFO_WINDOW: Object.freeze({
    maxWidth: 300,
    pixelOffset: { width: 0, height: -40 },
  }),
});

/**
 * Error messages
 */
const ERROR_MESSAGES = Object.freeze({
  API_KEY_MISSING: 'Google Maps API key is not configured',
  API_LOAD_FAILED: 'Failed to load Google Maps API',
  API_TIMEOUT: 'Google Maps API loading timed out',
  CONTAINER_NOT_FOUND: 'Map container element not found',
  INITIALIZATION_FAILED: 'Failed to initialize Google Maps',
  GEOCODING_FAILED: 'Failed to geocode address',
  NETWORK_ERROR: 'Network error while loading Google Maps',
});

/**
 * Map state management
 */
class MapState {
  constructor() {
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
    this.apiLoaded = false;
    this.apiLoading = false;
    this.loadPromise = null;
    this.retryCount = 0;
    this.listeners = [];
  }

  /**
   * Reset state
   */
  reset() {
    this.cleanup();
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
    this.apiLoaded = false;
    this.apiLoading = false;
    this.loadPromise = null;
    this.retryCount = 0;
  }

  /**
   * Clean up event listeners
   */
  cleanup() {
    this.listeners.forEach(({ element, event, handler }) => {
      if (element && element.removeEventListener) {
        element.removeEventListener(event, handler);
      }
    });
    this.listeners = [];
  }

  /**
   * Add event listener with tracking
   */
  addEventListener(element, event, handler) {
    if (element && element.addEventListener) {
      element.addEventListener(event, handler);
      this.listeners.push({ element, event, handler });
    }
  }
}

const mapState = new MapState();

/**
 * Get Google Maps API key from environment or configuration
 * 
 * @returns {string|null} API key or null if not configured
 */
function getApiKey() {
  // Check environment variables (Vite pattern)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null;
  }
  
  // Check window configuration
  if (typeof window !== 'undefined' && window.GOOGLE_MAPS_CONFIG) {
    return window.GOOGLE_MAPS_CONFIG.apiKey || null;
  }
  
  return null;
}

/**
 * Load Google Maps API script dynamically
 * 
 * @param {string} apiKey - Google Maps API key
 * @returns {Promise<void>} Resolves when API is loaded
 */
function loadGoogleMapsAPI(apiKey) {
  // Return existing promise if already loading
  if (mapState.loadPromise) {
    return mapState.loadPromise;
  }

  // Return resolved promise if already loaded
  if (mapState.apiLoaded && window.google && window.google.maps) {
    return Promise.resolve();
  }

  mapState.apiLoading = true;

  mapState.loadPromise = new Promise((resolve, reject) => {
    // Set up timeout
    const timeoutId = setTimeout(() => {
      mapState.apiLoading = false;
      reject(new Error(ERROR_MESSAGES.API_TIMEOUT));
    }, MAP_CONFIG.API_TIMEOUT);

    // Create callback function
    const callbackName = `initGoogleMaps_${Date.now()}`;
    window[callbackName] = () => {
      clearTimeout(timeoutId);
      mapState.apiLoaded = true;
      mapState.apiLoading = false;
      delete window[callbackName];
      resolve();
    };

    // Create and append script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      clearTimeout(timeoutId);
      mapState.apiLoading = false;
      delete window[callbackName];
      reject(new Error(ERROR_MESSAGES.API_LOAD_FAILED));
    };

    document.head.appendChild(script);
  });

  return mapState.loadPromise;
}

/**
 * Create fallback map display when Google Maps is unavailable
 * 
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Map options
 * @returns {HTMLElement} Fallback element
 */
function createFallbackMap(container, options = {}) {
  const { center = MAP_CONFIG.DEFAULT_CENTER, address = '' } = options;

  const fallback = document.createElement('div');
  fallback.className = 'map-fallback bg-gray-100 rounded-lg p-8 text-center';
  fallback.setAttribute('role', 'img');
  fallback.setAttribute('aria-label', 'Map location fallback');

  const icon = document.createElement('div');
  icon.className = 'text-6xl mb-4';
  icon.textContent = '📍';
  icon.setAttribute('aria-hidden', 'true');

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold text-gray-900 mb-2';
  title.textContent = 'Location Information';

  const addressText = document.createElement('p');
  addressText.className = 'text-gray-700 mb-4';
  addressText.textContent = address || 'Makoko, Lagos, Nigeria';

  const coordinates = document.createElement('p');
  coordinates.className = 'text-sm text-gray-600 mb-4';
  coordinates.textContent = `Coordinates: ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;

  const link = document.createElement('a');
  link.href = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors';
  link.textContent = 'Open in Google Maps';

  fallback.appendChild(icon);
  fallback.appendChild(title);
  fallback.appendChild(addressText);
  fallback.appendChild(coordinates);
  fallback.appendChild(link);

  container.innerHTML = '';
  container.appendChild(fallback);

  return fallback;
}

/**
 * Create custom info window content
 * 
 * @param {Object} options - Info window options
 * @returns {string} HTML content
 */
function createInfoWindowContent(options = {}) {
  const {
    title = 'Makoko Community Kids NGO',
    address = 'Makoko, Lagos, Nigeria',
    phone = '+234 XXX XXX XXXX',
    email = 'info@makokocommunitykids.org',
  } = options;

  return `
    <div class="info-window p-4 max-w-xs">
      <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
      <div class="space-y-2 text-sm text-gray-700">
        <p class="flex items-start">
          <span class="mr-2">📍</span>
          <span>${address}</span>
        </p>
        <p class="flex items-center">
          <span class="mr-2">📞</span>
          <a href="tel:${phone}" class="text-blue-600 hover:underline">${phone}</a>
        </p>
        <p class="flex items-center">
          <span class="mr-2">✉️</span>
          <a href="mailto:${email}" class="text-blue-600 hover:underline">${email}</a>
        </p>
      </div>
    </div>
  `;
}

/**
 * Initialize Google Map with marker and info window
 * 
 * @param {string|HTMLElement} containerId - Container element or ID
 * @param {Object} options - Map configuration options
 * @returns {Promise<Object>} Map instance and utilities
 */
async function initializeMap(containerId, options = {}) {
  try {
    // Get container element
    const container = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId;

    if (!container) {
      throw new Error(ERROR_MESSAGES.CONTAINER_NOT_FOUND);
    }

    // Set container attributes for accessibility
    container.setAttribute('role', 'application');
    container.setAttribute('aria-label', 'Interactive map showing NGO location');

    // Get API key
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn(ERROR_MESSAGES.API_KEY_MISSING);
      return {
        map: null,
        marker: null,
        infoWindow: null,
        fallback: createFallbackMap(container, options),
        isLoaded: false,
      };
    }

    // Load Google Maps API
    try {
      await loadGoogleMapsAPI(apiKey);
    } catch (error) {
      console.error('Failed to load Google Maps API:', error);
      
      // Retry logic
      if (mapState.retryCount < MAP_CONFIG.MAX_RETRIES) {
        mapState.retryCount++;
        await new Promise(resolve => setTimeout(resolve, MAP_CONFIG.RETRY_DELAY * mapState.retryCount));
        mapState.loadPromise = null;
        return initializeMap(containerId, options);
      }
      
      return {
        map: null,
        marker: null,
        infoWindow: null,
        fallback: createFallbackMap(container, options),
        isLoaded: false,
      };
    }

    // Merge options with defaults
    const config = {
      center: options.center || MAP_CONFIG.DEFAULT_CENTER,
      zoom: options.zoom || MAP_CONFIG.DEFAULT_ZOOM,
      styles: options.styles || MAP_CONFIG.STYLES,
      disableDefaultUI: options.disableDefaultUI !== undefined ? options.disableDefaultUI : false,
      zoomControl: options.zoomControl !== undefined ? options.zoomControl : true,
      mapTypeControl: options.mapTypeControl !== undefined ? options.mapTypeControl : false,
      streetViewControl: options.streetViewControl !== undefined ? options.streetViewControl : true,
      fullscreenControl: options.fullscreenControl !== undefined ? options.fullscreenControl : true,
      gestureHandling: options.gestureHandling || 'cooperative',
    };

    // Create map instance
    mapState.map = new window.google.maps.Map(container, config);

    // Create marker
    mapState.marker = new window.google.maps.Marker({
      position: config.center,
      map: mapState.map,
      title: options.markerTitle || 'Makoko Community Kids NGO',
      animation: window.google.maps.Animation[MARKER_CONFIG.ANIMATION],
      icon: options.customIcon || MARKER_CONFIG.ICON,
    });

    // Create info window
    const infoWindowContent = options.infoWindowContent || createInfoWindowContent(options.infoWindowData);
    mapState.infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: MARKER_CONFIG.INFO_WINDOW.maxWidth,
    });

    // Add marker click listener
    mapState.addEventListener(mapState.marker, 'click', () => {
      mapState.infoWindow.open(mapState.map, mapState.marker);
    });

    // Open info window by default if specified
    if (options.openInfoWindow !== false) {
      mapState.infoWindow.open(mapState.map, mapState.marker);
    }

    // Add resize listener for responsive behavior
    const resizeHandler = () => {
      window.google.maps.event.trigger(mapState.map, 'resize');
      mapState.map.setCenter(config.center);
    };
    mapState.addEventListener(window, 'resize', resizeHandler);

    // Dispatch custom event
    const mapReadyEvent = new CustomEvent('map:ready', {
      detail: {
        map: mapState.map,
        marker: mapState.marker,
        infoWindow: mapState.infoWindow,
      },
    });
    window.dispatchEvent(mapReadyEvent);

    return {
      map: mapState.map,
      marker: mapState.marker,
      infoWindow: mapState.infoWindow,
      fallback: null,
      isLoaded: true,
    };

  } catch (error) {
    console.error('Map initialization error:', error);
    
    const container = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId;

    return {
      map: null,
      marker: null,
      infoWindow: null,
      fallback: container ? createFallbackMap(container, options) : null,
      isLoaded: false,
      error: error.message,
    };
  }
}

/**
 * Geocode an address to coordinates
 * 
 * @param {string} address - Address to geocode
 * @returns {Promise<Object>} Coordinates {lat, lng}
 */
async function geocodeAddress(address) {
  if (!mapState.apiLoaded || !window.google || !window.google.maps) {
    throw new Error(ERROR_MESSAGES.API_LOAD_FAILED);
  }

  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formattedAddress: results[0].formatted_address,
        });
      } else {
        reject(new Error(`${ERROR_MESSAGES.GEOCODING_FAILED}: ${status}`));
      }
    });
  });
}

/**
 * Update map center and marker position
 * 
 * @param {Object} position - New position {lat, lng}
 */
function updateMapPosition(position) {
  if (!mapState.map || !mapState.marker) {
    console.warn('Map not initialized');
    return;
  }

  const latLng = new window.google.maps.LatLng(position.lat, position.lng);
  mapState.map.setCenter(latLng);
  mapState.marker.setPosition(latLng);
}

/**
 * Destroy map instance and clean up resources
 */
function destroyMap() {
  if (mapState.infoWindow) {
    mapState.infoWindow.close();
  }
  
  if (mapState.marker) {
    mapState.marker.setMap(null);
  }
  
  mapState.reset();
}

/**
 * Check if Google Maps API is loaded
 * 
 * @returns {boolean} True if API is loaded
 */
function isMapApiLoaded() {
  return mapState.apiLoaded && window.google && window.google.maps;
}

/**
 * Export map configuration and utilities
 */
export {
  MAP_CONFIG,
  MARKER_CONFIG,
  ERROR_MESSAGES,
  initializeMap,
  geocodeAddress,
  updateMapPosition,
  destroyMap,
  isMapApiLoaded,
  getApiKey,
  createFallbackMap,
  createInfoWindowContent,
};

export default {
  MAP_CONFIG,
  MARKER_CONFIG,
  ERROR_MESSAGES,
  initializeMap,
  geocodeAddress,
  updateMapPosition,
  destroyMap,
  isMapApiLoaded,
  getApiKey,
  createFallbackMap,
  createInfoWindowContent,
};