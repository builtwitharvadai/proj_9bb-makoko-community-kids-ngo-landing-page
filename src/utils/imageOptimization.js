/**
 * Image Optimization Utilities
 * 
 * Provides comprehensive image optimization functionality including:
 * - Responsive image loading with srcset
 * - WebP format support with fallback
 * - Lazy loading for performance
 * - Unsplash image URL generation with proper sizing
 * - Browser compatibility detection
 * 
 * @module imageOptimization
 * @version 1.0.0
 */

/**
 * Supported image formats in order of preference
 * @constant {string[]}
 */
const SUPPORTED_FORMATS = ['webp', 'jpg', 'png'];

/**
 * Standard responsive breakpoints for image sizing
 * @constant {number[]}
 */
const RESPONSIVE_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536, 1920];

/**
 * Default quality settings for different formats
 * @constant {Object.<string, number>}
 */
const DEFAULT_QUALITY = {
  webp: 85,
  jpg: 80,
  png: 90,
};

/**
 * Unsplash API configuration
 * @constant {Object}
 */
const UNSPLASH_CONFIG = {
  baseUrl: 'https://images.unsplash.com',
  params: {
    auto: 'format',
    fit: 'crop',
    q: 80,
  },
};

/**
 * Browser capability detection cache
 * @type {Object.<string, boolean>}
 */
const browserCapabilities = {};

/**
 * Detects if the browser supports WebP format
 * Uses canvas-based detection with caching
 * 
 * @returns {Promise<boolean>} True if WebP is supported
 */
async function detectWebPSupport() {
  if (typeof browserCapabilities.webp !== 'undefined') {
    return browserCapabilities.webp;
  }

  try {
    // Create a small WebP image data URL
    const webpData =
      'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';

    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const supported = img.width === 1 && img.height === 1;
        browserCapabilities.webp = supported;
        resolve(supported);
      };

      img.onerror = () => {
        browserCapabilities.webp = false;
        resolve(false);
      };

      img.src = webpData;
    });
  } catch (error) {
    console.error('[ImageOptimization] WebP detection failed:', error);
    browserCapabilities.webp = false;
    return false;
  }
}

/**
 * Detects if the browser supports lazy loading natively
 * 
 * @returns {boolean} True if native lazy loading is supported
 */
function detectLazyLoadingSupport() {
  if (typeof browserCapabilities.lazyLoading !== 'undefined') {
    return browserCapabilities.lazyLoading;
  }

  try {
    browserCapabilities.lazyLoading = 'loading' in HTMLImageElement.prototype;
    return browserCapabilities.lazyLoading;
  } catch (error) {
    console.error('[ImageOptimization] Lazy loading detection failed:', error);
    browserCapabilities.lazyLoading = false;
    return false;
  }
}

/**
 * Generates Unsplash image URL with optimization parameters
 * 
 * @param {string} photoId - Unsplash photo ID
 * @param {Object} options - Image options
 * @param {number} [options.width] - Desired width in pixels
 * @param {number} [options.height] - Desired height in pixels
 * @param {number} [options.quality=80] - Image quality (1-100)
 * @param {string} [options.format='auto'] - Image format (auto, webp, jpg, png)
 * @param {string} [options.fit='crop'] - Fit mode (crop, fill, scale)
 * @returns {string} Optimized Unsplash image URL
 */
function generateUnsplashUrl(photoId, options = {}) {
  try {
    if (!photoId || typeof photoId !== 'string') {
      throw new Error('Invalid photo ID provided');
    }

    const {
      width,
      height,
      quality = UNSPLASH_CONFIG.params.q,
      format = 'auto',
      fit = UNSPLASH_CONFIG.params.fit,
    } = options;

    const params = new URLSearchParams({
      auto: format,
      fit,
      q: String(quality),
    });

    if (width) {
      params.set('w', String(Math.round(width)));
    }

    if (height) {
      params.set('h', String(Math.round(height)));
    }

    const url = `${UNSPLASH_CONFIG.baseUrl}/photo-${photoId}?${params.toString()}`;

    return url;
  } catch (error) {
    console.error('[ImageOptimization] Failed to generate Unsplash URL:', error);
    throw error;
  }
}

/**
 * Generates srcset attribute value for responsive images
 * 
 * @param {string} photoId - Unsplash photo ID
 * @param {Object} options - Image options
 * @param {number[]} [options.breakpoints] - Custom breakpoints
 * @param {number} [options.quality] - Image quality
 * @param {string} [options.format] - Image format
 * @returns {string} srcset attribute value
 */
function generateSrcSet(photoId, options = {}) {
  try {
    const { breakpoints = RESPONSIVE_BREAKPOINTS, quality, format } = options;

    const srcsetEntries = breakpoints.map((width) => {
      const url = generateUnsplashUrl(photoId, {
        width,
        quality,
        format,
      });
      return `${url} ${width}w`;
    });

    return srcsetEntries.join(', ');
  } catch (error) {
    console.error('[ImageOptimization] Failed to generate srcset:', error);
    throw error;
  }
}

/**
 * Generates sizes attribute value based on breakpoints
 * 
 * @param {Object} options - Size options
 * @param {Object.<string, string>} [options.breakpoints] - Custom breakpoint sizes
 * @returns {string} sizes attribute value
 */
function generateSizes(options = {}) {
  const {
    breakpoints = {
      '(max-width: 640px)': '100vw',
      '(max-width: 1024px)': '90vw',
      '(max-width: 1280px)': '80vw',
    },
  } = options;

  const sizeEntries = Object.entries(breakpoints).map(
    ([query, size]) => `${query} ${size}`
  );

  sizeEntries.push('100vw');

  return sizeEntries.join(', ');
}

/**
 * Creates an optimized image element with responsive loading
 * 
 * @param {Object} config - Image configuration
 * @param {string} config.photoId - Unsplash photo ID
 * @param {string} config.alt - Alt text for accessibility
 * @param {number} [config.width] - Default width
 * @param {number} [config.height] - Default height
 * @param {boolean} [config.lazy=true] - Enable lazy loading
 * @param {string} [config.className] - CSS classes
 * @param {Object} [config.attributes] - Additional HTML attributes
 * @returns {Promise<HTMLImageElement>} Configured image element
 */
async function createOptimizedImage(config) {
  try {
    const {
      photoId,
      alt,
      width,
      height,
      lazy = true,
      className = '',
      attributes = {},
    } = config;

    if (!photoId) {
      throw new Error('Photo ID is required');
    }

    if (!alt) {
      console.warn('[ImageOptimization] Alt text is missing for accessibility');
    }

    const img = new Image();
    const supportsWebP = await detectWebPSupport();
    const supportsLazyLoading = detectLazyLoadingSupport();

    const format = supportsWebP ? 'webp' : 'auto';
    const quality = DEFAULT_QUALITY[format] || DEFAULT_QUALITY.jpg;

    img.src = generateUnsplashUrl(photoId, {
      width: width || 1920,
      height,
      quality,
      format,
    });

    img.srcset = generateSrcSet(photoId, {
      quality,
      format,
    });

    img.sizes = generateSizes();

    img.alt = alt || '';

    if (className) {
      img.className = className;
    }

    if (width) {
      img.width = width;
    }

    if (height) {
      img.height = height;
    }

    if (lazy && supportsLazyLoading) {
      img.loading = 'lazy';
    } else if (lazy && !supportsLazyLoading) {
      img.setAttribute('data-lazy', 'true');
    }

    Object.entries(attributes).forEach(([key, value]) => {
      img.setAttribute(key, String(value));
    });

    return img;
  } catch (error) {
    console.error('[ImageOptimization] Failed to create optimized image:', error);
    throw error;
  }
}

/**
 * Implements Intersection Observer-based lazy loading fallback
 * for browsers that don't support native lazy loading
 * 
 * @param {HTMLElement} container - Container element to observe images within
 * @param {Object} options - Observer options
 * @param {string} [options.rootMargin='50px'] - Root margin for early loading
 * @param {number} [options.threshold=0.01] - Intersection threshold
 * @returns {IntersectionObserver} Observer instance
 */
function initializeLazyLoading(container, options = {}) {
  try {
    const { rootMargin = '50px', threshold = 0.01 } = options;

    if (detectLazyLoadingSupport()) {
      console.info('[ImageOptimization] Native lazy loading supported, skipping polyfill');
      return null;
    }

    if (!('IntersectionObserver' in window)) {
      console.warn('[ImageOptimization] IntersectionObserver not supported, loading all images');
      const lazyImages = container.querySelectorAll('[data-lazy="true"]');
      lazyImages.forEach((img) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            if (img.dataset.src) {
              img.src = img.dataset.src;
              delete img.dataset.src;
            }

            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              delete img.dataset.srcset;
            }

            img.removeAttribute('data-lazy');
            observer.unobserve(img);

            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });

            img.addEventListener('error', (error) => {
              console.error('[ImageOptimization] Image failed to load:', error);
              img.classList.add('error');
            });
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const lazyImages = container.querySelectorAll('[data-lazy="true"]');
    lazyImages.forEach((img) => observer.observe(img));

    return observer;
  } catch (error) {
    console.error('[ImageOptimization] Failed to initialize lazy loading:', error);
    return null;
  }
}

/**
 * Preloads critical images for improved perceived performance
 * 
 * @param {string[]} photoIds - Array of Unsplash photo IDs to preload
 * @param {Object} options - Preload options
 * @param {number} [options.width] - Image width
 * @param {number} [options.height] - Image height
 * @returns {Promise<void[]>} Promise that resolves when all images are preloaded
 */
async function preloadImages(photoIds, options = {}) {
  try {
    if (!Array.isArray(photoIds) || photoIds.length === 0) {
      return Promise.resolve([]);
    }

    const supportsWebP = await detectWebPSupport();
    const format = supportsWebP ? 'webp' : 'auto';

    const preloadPromises = photoIds.map((photoId) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = generateUnsplashUrl(photoId, {
          ...options,
          format,
        });

        link.onload = () => resolve();
        link.onerror = (error) => {
          console.error(`[ImageOptimization] Failed to preload image ${photoId}:`, error);
          reject(error);
        };

        document.head.appendChild(link);
      });
    });

    return Promise.all(preloadPromises);
  } catch (error) {
    console.error('[ImageOptimization] Failed to preload images:', error);
    throw error;
  }
}

/**
 * Calculates optimal image dimensions based on container and DPR
 * 
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Calculation options
 * @param {number} [options.maxWidth] - Maximum width constraint
 * @param {number} [options.maxHeight] - Maximum height constraint
 * @param {number} [options.dpr] - Device pixel ratio override
 * @returns {Object} Calculated dimensions {width, height}
 */
function calculateOptimalDimensions(container, options = {}) {
  try {
    const { maxWidth, maxHeight, dpr = window.devicePixelRatio || 1 } = options;

    const rect = container.getBoundingClientRect();
    let width = Math.ceil(rect.width * dpr);
    let height = Math.ceil(rect.height * dpr);

    if (maxWidth && width > maxWidth) {
      width = maxWidth;
    }

    if (maxHeight && height > maxHeight) {
      height = maxHeight;
    }

    const closestBreakpoint = RESPONSIVE_BREAKPOINTS.reduce((prev, curr) => {
      return Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev;
    });

    return {
      width: closestBreakpoint,
      height: height > 0 ? height : undefined,
      dpr,
    };
  } catch (error) {
    console.error('[ImageOptimization] Failed to calculate optimal dimensions:', error);
    return {
      width: 1920,
      height: undefined,
      dpr: 1,
    };
  }
}

/**
 * Exports all image optimization utilities
 */
export {
  detectWebPSupport,
  detectLazyLoadingSupport,
  generateUnsplashUrl,
  generateSrcSet,
  generateSizes,
  createOptimizedImage,
  initializeLazyLoading,
  preloadImages,
  calculateOptimalDimensions,
  RESPONSIVE_BREAKPOINTS,
  DEFAULT_QUALITY,
  SUPPORTED_FORMATS,
};

export default {
  detectWebPSupport,
  detectLazyLoadingSupport,
  generateUnsplashUrl,
  generateSrcSet,
  generateSizes,
  createOptimizedImage,
  initializeLazyLoading,
  preloadImages,
  calculateOptimalDimensions,
  RESPONSIVE_BREAKPOINTS,
  DEFAULT_QUALITY,
  SUPPORTED_FORMATS,
};