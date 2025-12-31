/**
 * Hero Section Content Data
 * 
 * Centralized content management for hero section messaging including
 * headline, mission statement, call-to-action text, and image URLs.
 * Structured for easy content management and localization support.
 * 
 * @module data/heroContent
 * @version 1.0.0
 */

/**
 * Hero section content configuration
 * Frozen object to prevent accidental mutations
 */
const heroContent = Object.freeze({
  /**
   * Background image configuration with responsive sources
   */
  backgroundImage: Object.freeze({
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Children in Makoko community playing and learning together',
    webpUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&fm=webp',
    sizes: '100vw',
    srcset: Object.freeze([
      Object.freeze({ 
        width: 640, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=640&auto=format&fit=crop' 
      }),
      Object.freeze({ 
        width: 768, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=768&auto=format&fit=crop' 
      }),
      Object.freeze({ 
        width: 1024, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1024&auto=format&fit=crop' 
      }),
      Object.freeze({ 
        width: 1280, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1280&auto=format&fit=crop' 
      }),
      Object.freeze({ 
        width: 1536, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1536&auto=format&fit=crop' 
      }),
      Object.freeze({ 
        width: 2070, 
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' 
      }),
    ]),
  }),

  /**
   * Hero section text content
   */
  content: Object.freeze({
    headline: 'Empowering Makoko Children Through Education',
    mission: 'We believe every child in Makoko deserves access to quality education, healthcare, and opportunities to thrive. Join us in transforming lives and building a brighter future for the next generation.',
    
    /**
     * Primary call-to-action configuration
     */
    ctaPrimary: Object.freeze({
      text: 'Donate Now',
      href: '#donate',
      ariaLabel: 'Make a donation to support Makoko children',
    }),
    
    /**
     * Secondary call-to-action configuration
     */
    ctaSecondary: Object.freeze({
      text: 'Volunteer',
      href: '#volunteer',
      ariaLabel: 'Learn about volunteer opportunities',
    }),
  }),

  /**
   * Animation timing configuration
   */
  animation: Object.freeze({
    fadeInDelay: 100,
    staggerDelay: 150,
  }),

  /**
   * Image loading configuration
   */
  loading: Object.freeze({
    priority: 'high',
    fetchPriority: 'high',
  }),
});

/**
 * Localization support structure
 * Extensible for future multi-language support
 */
const heroContentLocales = Object.freeze({
  en: heroContent,
  
  /**
   * Example structure for future localization
   * Uncomment and populate when adding new languages
   */
  // es: Object.freeze({
  //   backgroundImage: heroContent.backgroundImage,
  //   content: Object.freeze({
  //     headline: 'Empoderando a los Niños de Makoko a Través de la Educación',
  //     mission: 'Creemos que cada niño en Makoko merece acceso a educación de calidad...',
  //     ctaPrimary: Object.freeze({
  //       text: 'Donar Ahora',
  //       href: '#donate',
  //       ariaLabel: 'Hacer una donación para apoyar a los niños de Makoko',
  //     }),
  //     ctaSecondary: Object.freeze({
  //       text: 'Voluntariado',
  //       href: '#volunteer',
  //       ariaLabel: 'Conocer las oportunidades de voluntariado',
  //     }),
  //   }),
  //   animation: heroContent.animation,
  //   loading: heroContent.loading,
  // }),
});

/**
 * Get hero content for specified locale
 * @param {string} locale - Locale code (default: 'en')
 * @returns {Object} Hero content configuration
 */
function getHeroContent(locale = 'en') {
  const content = heroContentLocales[locale];
  
  if (!content) {
    console.warn(`[heroContent] Locale '${locale}' not found, falling back to 'en'`);
    return heroContentLocales.en;
  }
  
  return content;
}

/**
 * Validate hero content structure
 * @param {Object} content - Content object to validate
 * @returns {boolean} True if valid
 * @throws {Error} If content structure is invalid
 */
function validateHeroContent(content) {
  if (!content || typeof content !== 'object') {
    throw new Error('Hero content must be an object');
  }

  if (!content.backgroundImage || typeof content.backgroundImage !== 'object') {
    throw new Error('Hero content must include backgroundImage object');
  }

  if (!content.backgroundImage.url || typeof content.backgroundImage.url !== 'string') {
    throw new Error('Background image must include valid URL string');
  }

  if (!content.backgroundImage.alt || typeof content.backgroundImage.alt !== 'string') {
    throw new Error('Background image must include alt text string');
  }

  if (!Array.isArray(content.backgroundImage.srcset) || content.backgroundImage.srcset.length === 0) {
    throw new Error('Background image must include srcset array');
  }

  if (!content.content || typeof content.content !== 'object') {
    throw new Error('Hero content must include content object');
  }

  if (!content.content.headline || typeof content.content.headline !== 'string') {
    throw new Error('Content must include headline string');
  }

  if (!content.content.mission || typeof content.content.mission !== 'string') {
    throw new Error('Content must include mission string');
  }

  if (!content.content.ctaPrimary || typeof content.content.ctaPrimary !== 'object') {
    throw new Error('Content must include ctaPrimary object');
  }

  if (!content.content.ctaSecondary || typeof content.content.ctaSecondary !== 'object') {
    throw new Error('Content must include ctaSecondary object');
  }

  return true;
}

/**
 * Get available locales
 * @returns {string[]} Array of available locale codes
 */
function getAvailableLocales() {
  return Object.keys(heroContentLocales);
}

export { heroContent, heroContentLocales, getHeroContent, validateHeroContent, getAvailableLocales };
export default heroContent;