/**
 * Animation Utilities Module
 * 
 * Provides comprehensive animation utilities including Intersection Observer
 * for scroll-triggered animations, easing functions, and counter animations.
 * Optimized for performance and accessibility.
 * 
 * @module utils/animations
 * @version 1.0.0
 */

/**
 * Easing functions for smooth animations
 * Mathematical functions that control animation timing
 */
const easingFunctions = Object.freeze({
  /**
   * Linear easing - constant speed
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  linear: (t) => t,

  /**
   * Ease in quadratic - slow start
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeInQuad: (t) => t * t,

  /**
   * Ease out quadratic - slow end
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeOutQuad: (t) => t * (2 - t),

  /**
   * Ease in-out quadratic - slow start and end
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  /**
   * Ease in cubic - slower start
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeInCubic: (t) => t * t * t,

  /**
   * Ease out cubic - slower end
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeOutCubic: (t) => --t * t * t + 1,

  /**
   * Ease in-out cubic - slower start and end
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  /**
   * Ease out exponential - very slow end
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),

  /**
   * Ease out back - slight overshoot
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   */
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
});

/**
 * Counter animation configuration
 * @typedef {Object} CounterConfig
 * @property {number} start - Starting value
 * @property {number} end - Ending value
 * @property {number} duration - Animation duration in milliseconds
 * @property {Function} easing - Easing function to use
 * @property {Function} onUpdate - Callback for each frame update
 * @property {Function} onComplete - Callback when animation completes
 * @property {number} decimalPlaces - Number of decimal places to show
 * @property {string} prefix - String to prepend to value
 * @property {string} suffix - String to append to value
 */

/**
 * Animate a counter from start to end value
 * 
 * @param {CounterConfig} config - Counter animation configuration
 * @returns {Object} Animation control object with cancel method
 */
export function animateCounter({
  start = 0,
  end = 100,
  duration = 2000,
  easing = easingFunctions.easeOutCubic,
  onUpdate = () => {},
  onComplete = () => {},
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
}) {
  // Validate inputs
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new TypeError('start and end must be numbers');
  }

  if (typeof duration !== 'number' || duration <= 0) {
    throw new TypeError('duration must be a positive number');
  }

  if (typeof easing !== 'function') {
    throw new TypeError('easing must be a function');
  }

  let startTime = null;
  let animationFrameId = null;
  let cancelled = false;

  /**
   * Format number with specified decimal places and affixes
   * @param {number} value - Value to format
   * @returns {string} Formatted value
   */
  const formatValue = (value) => {
    const formatted = value.toFixed(decimalPlaces);
    return `${prefix}${formatted}${suffix}`;
  };

  /**
   * Animation frame callback
   * @param {number} timestamp - Current timestamp
   */
  const animate = (timestamp) => {
    if (cancelled) {
      return;
    }

    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = start + (end - start) * easedProgress;

    try {
      onUpdate(currentValue, formatValue(currentValue), progress);
    } catch (error) {
      console.error('[Animation] Error in onUpdate callback:', error);
      cancelled = true;
      return;
    }

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      try {
        onComplete(end, formatValue(end));
      } catch (error) {
        console.error('[Animation] Error in onComplete callback:', error);
      }
    }
  };

  // Start animation
  animationFrameId = requestAnimationFrame(animate);

  // Return control object
  return {
    /**
     * Cancel the animation
     */
    cancel: () => {
      cancelled = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },

    /**
     * Check if animation is running
     * @returns {boolean} True if animation is active
     */
    isRunning: () => !cancelled && animationFrameId !== null,
  };
}

/**
 * Intersection Observer configuration
 * @typedef {Object} ObserverConfig
 * @property {number} threshold - Visibility threshold (0-1)
 * @property {string} rootMargin - Root margin for early/late triggering
 * @property {boolean} triggerOnce - Whether to trigger only once
 * @property {Function} onEnter - Callback when element enters viewport
 * @property {Function} onExit - Callback when element exits viewport
 */

/**
 * Create an Intersection Observer for scroll-triggered animations
 * 
 * @param {ObserverConfig} config - Observer configuration
 * @returns {Object} Observer control object
 */
export function createScrollObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  onEnter = () => {},
  onExit = () => {},
} = {}) {
  // Validate configuration
  if (typeof threshold !== 'number' || threshold < 0 || threshold > 1) {
    throw new TypeError('threshold must be a number between 0 and 1');
  }

  if (typeof rootMargin !== 'string') {
    throw new TypeError('rootMargin must be a string');
  }

  if (typeof triggerOnce !== 'boolean') {
    throw new TypeError('triggerOnce must be a boolean');
  }

  // Check for Intersection Observer support
  if (typeof IntersectionObserver === 'undefined') {
    console.warn(
      '[Animation] IntersectionObserver not supported, animations will trigger immediately'
    );

    // Fallback: trigger immediately
    return {
      observe: (element) => {
        try {
          onEnter(element);
        } catch (error) {
          console.error('[Animation] Error in onEnter callback:', error);
        }
      },
      unobserve: () => {},
      disconnect: () => {},
      getObservedElements: () => [],
    };
  }

  const observedElements = new Set();
  const triggeredElements = new WeakSet();

  /**
   * Intersection Observer callback
   * @param {IntersectionObserverEntry[]} entries - Observed entries
   */
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;

      if (isIntersecting) {
        // Element entered viewport
        if (triggerOnce && triggeredElements.has(target)) {
          return;
        }

        try {
          onEnter(target, entry);
          triggeredElements.add(target);

          if (triggerOnce) {
            observer.unobserve(target);
            observedElements.delete(target);
          }
        } catch (error) {
          console.error('[Animation] Error in onEnter callback:', error);
        }
      } else if (!triggerOnce) {
        // Element exited viewport (only if not triggerOnce)
        try {
          onExit(target, entry);
        } catch (error) {
          console.error('[Animation] Error in onExit callback:', error);
        }
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(handleIntersection, {
    threshold,
    rootMargin,
  });

  return {
    /**
     * Start observing an element
     * @param {Element} element - Element to observe
     */
    observe: (element) => {
      if (!(element instanceof Element)) {
        throw new TypeError('element must be a DOM Element');
      }

      observer.observe(element);
      observedElements.add(element);
    },

    /**
     * Stop observing an element
     * @param {Element} element - Element to stop observing
     */
    unobserve: (element) => {
      if (!(element instanceof Element)) {
        throw new TypeError('element must be a DOM Element');
      }

      observer.unobserve(element);
      observedElements.delete(element);
    },

    /**
     * Disconnect observer and stop observing all elements
     */
    disconnect: () => {
      observer.disconnect();
      observedElements.clear();
    },

    /**
     * Get all currently observed elements
     * @returns {Element[]} Array of observed elements
     */
    getObservedElements: () => Array.from(observedElements),
  };
}

/**
 * Stagger animation configuration
 * @typedef {Object} StaggerConfig
 * @property {Element[]} elements - Elements to animate
 * @property {number} delay - Delay between each element (ms)
 * @property {Function} animation - Animation function to apply
 * @property {boolean} reverse - Whether to reverse the order
 */

/**
 * Apply staggered animations to multiple elements
 * 
 * @param {StaggerConfig} config - Stagger configuration
 * @returns {Object} Control object with cancel method
 */
export function staggerAnimation({
  elements = [],
  delay = 100,
  animation = () => {},
  reverse = false,
} = {}) {
  // Validate inputs
  if (!Array.isArray(elements)) {
    throw new TypeError('elements must be an array');
  }

  if (typeof delay !== 'number' || delay < 0) {
    throw new TypeError('delay must be a non-negative number');
  }

  if (typeof animation !== 'function') {
    throw new TypeError('animation must be a function');
  }

  const timeouts = [];
  const elementsToAnimate = reverse ? [...elements].reverse() : elements;

  elementsToAnimate.forEach((element, index) => {
    const timeout = setTimeout(() => {
      try {
        animation(element, index);
      } catch (error) {
        console.error('[Animation] Error in stagger animation:', error);
      }
    }, index * delay);

    timeouts.push(timeout);
  });

  return {
    /**
     * Cancel all pending animations
     */
    cancel: () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts.length = 0;
    },
  };
}

/**
 * Debounce function for performance optimization
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  if (typeof func !== 'function') {
    throw new TypeError('func must be a function');
  }

  if (typeof wait !== 'number' || wait < 0) {
    throw new TypeError('wait must be a non-negative number');
  }

  let timeout = null;

  const debounced = function (...args) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      try {
        func.apply(context, args);
      } catch (error) {
        console.error('[Animation] Error in debounced function:', error);
      }
    }, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

/**
 * Throttle function for performance optimization
 * 
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 300) {
  if (typeof func !== 'function') {
    throw new TypeError('func must be a function');
  }

  if (typeof limit !== 'number' || limit < 0) {
    throw new TypeError('limit must be a non-negative number');
  }

  let inThrottle = false;

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      try {
        func.apply(context, args);
      } catch (error) {
        console.error('[Animation] Error in throttled function:', error);
      }

      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Check if user prefers reduced motion
 * 
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Get safe animation duration based on user preferences
 * 
 * @param {number} duration - Desired duration in milliseconds
 * @returns {number} Safe duration (0 if reduced motion preferred)
 */
export function getSafeAnimationDuration(duration) {
  if (typeof duration !== 'number' || duration < 0) {
    throw new TypeError('duration must be a non-negative number');
  }

  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Export easing functions for external use
 */
export { easingFunctions };

/**
 * Default export with all utilities
 */
export default {
  animateCounter,
  createScrollObserver,
  staggerAnimation,
  debounce,
  throttle,
  prefersReducedMotion,
  getSafeAnimationDuration,
  easingFunctions,
};