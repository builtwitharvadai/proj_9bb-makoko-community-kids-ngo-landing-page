/**
 * StatisticsCounter Component
 * 
 * Animated counter component that animates numbers when the section comes into view.
 * Uses Intersection Observer API for viewport detection and requestAnimationFrame
 * for smooth animations with customizable duration, easing, and formatting.
 * 
 * @module components/StatisticsCounter
 */

/**
 * Easing functions for counter animations
 * @private
 */
const EASING_FUNCTIONS = Object.freeze({
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
});

/**
 * Default configuration for counter animations
 * @private
 */
const DEFAULT_CONFIG = Object.freeze({
  duration: 2000,
  easing: 'easeOutCubic',
  threshold: 0.3,
  rootMargin: '0px',
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
  decimals: 0,
  startValue: 0,
});

/**
 * Format number with separators and decimal places
 * @private
 * @param {number} value - Number to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted number string
 */
function formatNumber(value, options) {
  const { separator, decimal, decimals, prefix, suffix } = options;

  // Handle edge cases
  if (!Number.isFinite(value)) {
    return `${prefix}0${suffix}`;
  }

  // Round to specified decimal places
  const rounded = Number(value.toFixed(decimals));

  // Split into integer and decimal parts
  const parts = rounded.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Combine parts
  let result = formattedInteger;
  if (decimals > 0) {
    const paddedDecimal = decimalPart.padEnd(decimals, '0');
    result += decimal + paddedDecimal;
  }

  return `${prefix}${result}${suffix}`;
}

/**
 * Animate counter from start to end value
 * @private
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} easingFn - Easing function
 * @param {Object} formatOptions - Number formatting options
 * @returns {Object} Animation control object with cancel method
 */
function animateCounter(element, start, end, duration, easingFn, formatOptions) {
  const startTime = performance.now();
  const range = end - start;
  let animationFrameId = null;
  let cancelled = false;

  /**
   * Animation frame callback
   * @param {number} currentTime - Current timestamp
   */
  function updateCounter(currentTime) {
    if (cancelled) {
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    const currentValue = start + range * easedProgress;

    // Update element content
    element.textContent = formatNumber(currentValue, formatOptions);

    // Continue animation if not complete
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(updateCounter);
    } else {
      // Ensure final value is exact
      element.textContent = formatNumber(end, formatOptions);
    }
  }

  // Start animation
  animationFrameId = requestAnimationFrame(updateCounter);

  // Return control object
  return {
    cancel: () => {
      cancelled = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },
  };
}

/**
 * StatisticsCounter class
 * Manages animated counters with Intersection Observer
 */
export class StatisticsCounter {
  /**
   * Create a StatisticsCounter instance
   * @param {HTMLElement} element - Container element with counter elements
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    // Validate element
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('Element must be an HTMLElement instance');
    }

    this.element = element;
    this.config = { ...DEFAULT_CONFIG, ...options };
    this.counters = new Map();
    this.observer = null;
    this.hasAnimated = false;

    // Validate easing function
    if (
      typeof this.config.easing === 'string' &&
      !EASING_FUNCTIONS[this.config.easing]
    ) {
      console.warn(
        `Unknown easing function: ${this.config.easing}. Falling back to easeOutCubic.`
      );
      this.config.easing = 'easeOutCubic';
    }

    this._initialize();
  }

  /**
   * Initialize counter elements and observer
   * @private
   */
  _initialize() {
    try {
      // Find all counter elements
      const counterElements = this.element.querySelectorAll('[data-counter]');

      if (counterElements.length === 0) {
        console.warn('No counter elements found with [data-counter] attribute');
        return;
      }

      // Setup each counter
      counterElements.forEach((el) => {
        const endValue = this._parseCounterValue(el);
        const counterConfig = this._parseCounterConfig(el);

        this.counters.set(el, {
          endValue,
          config: { ...this.config, ...counterConfig },
          animation: null,
        });

        // Set initial value
        el.textContent = formatNumber(counterConfig.startValue || 0, counterConfig);
      });

      // Setup Intersection Observer
      this._setupObserver();
    } catch (error) {
      console.error('Failed to initialize StatisticsCounter:', error);
      throw error;
    }
  }

  /**
   * Parse counter end value from element
   * @private
   * @param {HTMLElement} element - Counter element
   * @returns {number} Parsed end value
   */
  _parseCounterValue(element) {
    const value = element.getAttribute('data-counter');
    const parsed = parseFloat(value);

    if (!Number.isFinite(parsed)) {
      console.warn(`Invalid counter value: ${value}. Using 0.`);
      return 0;
    }

    return parsed;
  }

  /**
   * Parse counter configuration from element attributes
   * @private
   * @param {HTMLElement} element - Counter element
   * @returns {Object} Counter configuration
   */
  _parseCounterConfig(element) {
    const config = {};

    // Parse duration
    const duration = element.getAttribute('data-counter-duration');
    if (duration !== null) {
      const parsed = parseInt(duration, 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        config.duration = parsed;
      }
    }

    // Parse easing
    const easing = element.getAttribute('data-counter-easing');
    if (easing !== null) {
      config.easing = easing;
    }

    // Parse formatting options
    const prefix = element.getAttribute('data-counter-prefix');
    if (prefix !== null) {
      config.prefix = prefix;
    }

    const suffix = element.getAttribute('data-counter-suffix');
    if (suffix !== null) {
      config.suffix = suffix;
    }

    const separator = element.getAttribute('data-counter-separator');
    if (separator !== null) {
      config.separator = separator;
    }

    const decimal = element.getAttribute('data-counter-decimal');
    if (decimal !== null) {
      config.decimal = decimal;
    }

    const decimals = element.getAttribute('data-counter-decimals');
    if (decimals !== null) {
      const parsed = parseInt(decimals, 10);
      if (Number.isFinite(parsed) && parsed >= 0) {
        config.decimals = parsed;
      }
    }

    const startValue = element.getAttribute('data-counter-start');
    if (startValue !== null) {
      const parsed = parseFloat(startValue);
      if (Number.isFinite(parsed)) {
        config.startValue = parsed;
      }
    }

    return config;
  }

  /**
   * Setup Intersection Observer
   * @private
   */
  _setupObserver() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported. Animating immediately.');
      this._animateAllCounters();
      return;
    }

    const observerOptions = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this._animateAllCounters();
          this.observer.disconnect();
        }
      });
    }, observerOptions);

    this.observer.observe(this.element);
  }

  /**
   * Animate all counters
   * @private
   */
  _animateAllCounters() {
    this.counters.forEach((counterData, element) => {
      this._animateCounter(element, counterData);
    });
  }

  /**
   * Animate a single counter
   * @private
   * @param {HTMLElement} element - Counter element
   * @param {Object} counterData - Counter data object
   */
  _animateCounter(element, counterData) {
    const { endValue, config } = counterData;
    const startValue = config.startValue || 0;

    // Get easing function
    const easingFn =
      typeof config.easing === 'function'
        ? config.easing
        : EASING_FUNCTIONS[config.easing] || EASING_FUNCTIONS.easeOutCubic;

    // Format options
    const formatOptions = {
      separator: config.separator,
      decimal: config.decimal,
      decimals: config.decimals,
      prefix: config.prefix,
      suffix: config.suffix,
    };

    // Start animation
    counterData.animation = animateCounter(
      element,
      startValue,
      endValue,
      config.duration,
      easingFn,
      formatOptions
    );
  }

  /**
   * Reset all counters to initial state
   * @public
   */
  reset() {
    // Cancel ongoing animations
    this.counters.forEach((counterData, element) => {
      if (counterData.animation) {
        counterData.animation.cancel();
        counterData.animation = null;
      }

      // Reset to start value
      const startValue = counterData.config.startValue || 0;
      element.textContent = formatNumber(startValue, counterData.config);
    });

    this.hasAnimated = false;

    // Reconnect observer if available
    if (this.observer) {
      this.observer.disconnect();
      this.observer.observe(this.element);
    }
  }

  /**
   * Manually trigger counter animations
   * @public
   */
  animate() {
    if (!this.hasAnimated) {
      this.hasAnimated = true;
      this._animateAllCounters();
    }
  }

  /**
   * Destroy the counter instance and cleanup
   * @public
   */
  destroy() {
    // Cancel all animations
    this.counters.forEach((counterData) => {
      if (counterData.animation) {
        counterData.animation.cancel();
      }
    });

    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Clear counters
    this.counters.clear();
  }
}

/**
 * Initialize all counter elements on the page
 * @param {string} selector - CSS selector for counter containers
 * @param {Object} options - Global configuration options
 * @returns {StatisticsCounter[]} Array of counter instances
 */
export function initializeCounters(selector = '[data-counter-container]', options = {}) {
  const containers = document.querySelectorAll(selector);
  const instances = [];

  containers.forEach((container) => {
    try {
      const instance = new StatisticsCounter(container, options);
      instances.push(instance);
    } catch (error) {
      console.error('Failed to initialize counter:', error);
    }
  });

  return instances;
}

/**
 * Export easing functions for custom use
 */
export { EASING_FUNCTIONS };