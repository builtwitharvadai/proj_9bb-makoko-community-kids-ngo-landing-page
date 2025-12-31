/**
 * SEO Utilities Module
 * 
 * Provides comprehensive SEO optimization utilities including meta tag management,
 * Open Graph and Twitter Card setup, and structured data (JSON-LD) generation
 * for organization, programs, and events.
 * 
 * @module utils/seo
 * @version 1.0.0
 */

/**
 * Default SEO configuration
 * @constant {Object}
 */
const DEFAULT_SEO_CONFIG = Object.freeze({
  siteName: 'Makoko Community Kids NGO',
  siteUrl: 'https://makokokids.org',
  defaultTitle: 'Makoko Community Kids - Empowering Children Through Education',
  defaultDescription: 'Supporting underprivileged children in Makoko community through education, healthcare, and community development programs.',
  defaultImage: '/images/og-image.jpg',
  defaultKeywords: ['NGO', 'education', 'children', 'Makoko', 'community development', 'charity', 'Lagos', 'Nigeria'],
  twitterHandle: '@MakokoKids',
  facebookAppId: '',
  locale: 'en_US',
  type: 'website',
});

/**
 * Sanitize text content for meta tags
 * Removes HTML tags and excessive whitespace
 * 
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
function sanitizeText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 500); // Limit length
}

/**
 * Generate canonical URL
 * 
 * @param {string} path - URL path
 * @param {string} baseUrl - Base URL
 * @returns {string} Canonical URL
 */
function generateCanonicalUrl(path, baseUrl = DEFAULT_SEO_CONFIG.siteUrl) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Set or update a meta tag
 * 
 * @param {string} name - Meta tag name or property
 * @param {string} content - Meta tag content
 * @param {boolean} isProperty - Whether to use property attribute instead of name
 */
function setMetaTag(name, content, isProperty = false) {
  if (!content) {
    return;
  }

  const attribute = isProperty ? 'property' : 'name';
  const selector = `meta[${attribute}="${name}"]`;
  
  let metaTag = document.querySelector(selector);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, name);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', sanitizeText(content));
}

/**
 * Set or update a link tag
 * 
 * @param {string} rel - Link relationship
 * @param {string} href - Link href
 * @param {Object} attributes - Additional attributes
 */
function setLinkTag(rel, href, attributes = {}) {
  if (!href) {
    return;
  }

  const selector = `link[rel="${rel}"]`;
  let linkTag = document.querySelector(selector);
  
  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.setAttribute('rel', rel);
    document.head.appendChild(linkTag);
  }
  
  linkTag.setAttribute('href', href);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      linkTag.setAttribute(key, value);
    }
  });
}

/**
 * Generate and inject structured data (JSON-LD)
 * 
 * @param {Object} data - Structured data object
 * @param {string} id - Unique identifier for the script tag
 */
function injectStructuredData(data, id) {
  if (!data || typeof data !== 'object') {
    console.warn('[SEO] Invalid structured data provided');
    return;
  }

  const scriptId = `structured-data-${id}`;
  let script = document.getElementById(scriptId);
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  try {
    script.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('[SEO] Failed to stringify structured data:', error);
  }
}

/**
 * Set basic meta tags
 * 
 * @param {Object} options - Meta tag options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords (comma-separated or array)
 * @param {string} options.author - Page author
 * @param {string} options.canonical - Canonical URL
 */
export function setBasicMetaTags(options = {}) {
  const {
    title = DEFAULT_SEO_CONFIG.defaultTitle,
    description = DEFAULT_SEO_CONFIG.defaultDescription,
    keywords = DEFAULT_SEO_CONFIG.defaultKeywords,
    author = DEFAULT_SEO_CONFIG.siteName,
    canonical = window.location.href,
  } = options;

  // Set document title
  document.title = sanitizeText(title);

  // Set meta description
  setMetaTag('description', description);

  // Set meta keywords
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  setMetaTag('keywords', keywordsString);

  // Set author
  setMetaTag('author', author);

  // Set canonical URL
  setLinkTag('canonical', canonical);

  // Set viewport (if not already set)
  if (!document.querySelector('meta[name="viewport"]')) {
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }

  // Set charset (if not already set)
  if (!document.querySelector('meta[charset]')) {
    const charsetMeta = document.createElement('meta');
    charsetMeta.setAttribute('charset', 'UTF-8');
    document.head.insertBefore(charsetMeta, document.head.firstChild);
  }
}

/**
 * Set Open Graph meta tags for social media sharing
 * 
 * @param {Object} options - Open Graph options
 * @param {string} options.title - OG title
 * @param {string} options.description - OG description
 * @param {string} options.image - OG image URL
 * @param {string} options.url - OG URL
 * @param {string} options.type - OG type (website, article, etc.)
 * @param {string} options.siteName - OG site name
 * @param {string} options.locale - OG locale
 */
export function setOpenGraphTags(options = {}) {
  const {
    title = DEFAULT_SEO_CONFIG.defaultTitle,
    description = DEFAULT_SEO_CONFIG.defaultDescription,
    image = DEFAULT_SEO_CONFIG.defaultImage,
    url = window.location.href,
    type = DEFAULT_SEO_CONFIG.type,
    siteName = DEFAULT_SEO_CONFIG.siteName,
    locale = DEFAULT_SEO_CONFIG.locale,
  } = options;

  setMetaTag('og:title', title, true);
  setMetaTag('og:description', description, true);
  setMetaTag('og:image', image, true);
  setMetaTag('og:url', url, true);
  setMetaTag('og:type', type, true);
  setMetaTag('og:site_name', siteName, true);
  setMetaTag('og:locale', locale, true);

  // Set Facebook App ID if available
  if (DEFAULT_SEO_CONFIG.facebookAppId) {
    setMetaTag('fb:app_id', DEFAULT_SEO_CONFIG.facebookAppId, true);
  }
}

/**
 * Set Twitter Card meta tags
 * 
 * @param {Object} options - Twitter Card options
 * @param {string} options.card - Card type (summary, summary_large_image, etc.)
 * @param {string} options.title - Twitter title
 * @param {string} options.description - Twitter description
 * @param {string} options.image - Twitter image URL
 * @param {string} options.site - Twitter site handle
 * @param {string} options.creator - Twitter creator handle
 */
export function setTwitterCardTags(options = {}) {
  const {
    card = 'summary_large_image',
    title = DEFAULT_SEO_CONFIG.defaultTitle,
    description = DEFAULT_SEO_CONFIG.defaultDescription,
    image = DEFAULT_SEO_CONFIG.defaultImage,
    site = DEFAULT_SEO_CONFIG.twitterHandle,
    creator = DEFAULT_SEO_CONFIG.twitterHandle,
  } = options;

  setMetaTag('twitter:card', card);
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', description);
  setMetaTag('twitter:image', image);
  setMetaTag('twitter:site', site);
  setMetaTag('twitter:creator', creator);
}

/**
 * Generate Organization structured data (JSON-LD)
 * 
 * @param {Object} options - Organization options
 * @returns {Object} Organization structured data
 */
export function generateOrganizationSchema(options = {}) {
  const {
    name = DEFAULT_SEO_CONFIG.siteName,
    url = DEFAULT_SEO_CONFIG.siteUrl,
    logo = `${DEFAULT_SEO_CONFIG.siteUrl}/images/logo.png`,
    description = DEFAULT_SEO_CONFIG.defaultDescription,
    address = {
      streetAddress: 'Makoko Community',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State',
      postalCode: '100001',
      addressCountry: 'NG',
    },
    contactPoint = {
      telephone: '+234-XXX-XXX-XXXX',
      contactType: 'customer service',
      email: 'info@makokokids.org',
    },
    sameAs = [
      'https://facebook.com/makokokids',
      'https://twitter.com/makokokids',
      'https://instagram.com/makokokids',
      'https://linkedin.com/company/makokokids',
    ],
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      ...contactPoint,
    },
    sameAs,
  };
}

/**
 * Generate Program structured data (JSON-LD)
 * 
 * @param {Object} program - Program data
 * @returns {Object} Program structured data
 */
export function generateProgramSchema(program) {
  if (!program || typeof program !== 'object') {
    console.warn('[SEO] Invalid program data provided');
    return null;
  }

  const {
    name,
    description,
    image,
    url,
    startDate,
    endDate,
    location,
    organizer = DEFAULT_SEO_CONFIG.siteName,
  } = program;

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalProgram',
    name: sanitizeText(name),
    description: sanitizeText(description),
    image: image || DEFAULT_SEO_CONFIG.defaultImage,
    url: url || window.location.href,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
      },
    }),
    provider: {
      '@type': 'NGO',
      name: organizer,
    },
  };
}

/**
 * Generate Event structured data (JSON-LD)
 * 
 * @param {Object} event - Event data
 * @returns {Object} Event structured data
 */
export function generateEventSchema(event) {
  if (!event || typeof event !== 'object') {
    console.warn('[SEO] Invalid event data provided');
    return null;
  }

  const {
    name,
    description,
    image,
    startDate,
    endDate,
    location,
    organizer = DEFAULT_SEO_CONFIG.siteName,
    offers,
  } = event;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: sanitizeText(name),
    description: sanitizeText(description),
    image: image || DEFAULT_SEO_CONFIG.defaultImage,
    startDate,
    endDate,
    location: {
      '@type': 'Place',
      name: location?.name || 'Makoko Community',
      address: location?.address || {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
    },
    organizer: {
      '@type': 'NGO',
      name: organizer,
      url: DEFAULT_SEO_CONFIG.siteUrl,
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        ...offers,
      },
    }),
  };
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 * 
 * @param {Array<Object>} breadcrumbs - Array of breadcrumb items
 * @returns {Object} BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: sanitizeText(crumb.name),
      item: crumb.url ? generateCanonicalUrl(crumb.url) : undefined,
    })),
  };
}

/**
 * Initialize SEO for a page
 * Sets all meta tags and structured data
 * 
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords
 * @param {string} options.image - Page image
 * @param {string} options.url - Page URL
 * @param {string} options.type - Page type
 * @param {Object} options.structuredData - Additional structured data
 * @param {Array<Object>} options.breadcrumbs - Breadcrumb items
 */
export function initializeSEO(options = {}) {
  try {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type,
      structuredData = {},
      breadcrumbs,
    } = options;

    // Set basic meta tags
    setBasicMetaTags({
      title,
      description,
      keywords,
      canonical: url,
    });

    // Set Open Graph tags
    setOpenGraphTags({
      title,
      description,
      image,
      url,
      type,
    });

    // Set Twitter Card tags
    setTwitterCardTags({
      title,
      description,
      image,
    });

    // Inject organization schema
    const orgSchema = generateOrganizationSchema();
    injectStructuredData(orgSchema, 'organization');

    // Inject breadcrumb schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
      if (breadcrumbSchema) {
        injectStructuredData(breadcrumbSchema, 'breadcrumb');
      }
    }

    // Inject additional structured data
    Object.entries(structuredData).forEach(([key, data]) => {
      if (data) {
        injectStructuredData(data, key);
      }
    });

    // Dispatch SEO initialized event
    const seoEvent = new CustomEvent('seo:initialized', {
      detail: {
        title,
        description,
        url,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(seoEvent);

    console.log('[SEO] Page SEO initialized successfully');
  } catch (error) {
    console.error('[SEO] Failed to initialize SEO:', error);
  }
}

/**
 * Update page SEO dynamically
 * Useful for single-page applications
 * 
 * @param {Object} options - SEO options (same as initializeSEO)
 */
export function updateSEO(options = {}) {
  initializeSEO(options);
}

/**
 * Generate sitemap data
 * Returns array of URL objects for sitemap generation
 * 
 * @param {Array<Object>} pages - Array of page objects
 * @returns {Array<Object>} Sitemap URL objects
 */
export function generateSitemapData(pages = []) {
  const defaultPages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/programs', priority: 0.9, changefreq: 'weekly' },
    { path: '/impact', priority: 0.8, changefreq: 'monthly' },
    { path: '/donate', priority: 0.9, changefreq: 'monthly' },
    { path: '/volunteer', priority: 0.8, changefreq: 'monthly' },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  ];

  const allPages = [...defaultPages, ...pages];

  return allPages.map((page) => ({
    loc: generateCanonicalUrl(page.path),
    lastmod: page.lastmod || new Date().toISOString().split('T')[0],
    changefreq: page.changefreq || 'monthly',
    priority: page.priority || 0.5,
  }));
}

/**
 * Generate robots.txt content
 * 
 * @param {Object} options - Robots.txt options
 * @returns {string} Robots.txt content
 */
export function generateRobotsTxt(options = {}) {
  const {
    allowAll = true,
    disallowPaths = ['/admin', '/api'],
    sitemapUrl = `${DEFAULT_SEO_CONFIG.siteUrl}/sitemap.xml`,
  } = options;

  const lines = ['User-agent: *'];

  if (allowAll) {
    lines.push('Allow: /');
  }

  disallowPaths.forEach((path) => {
    lines.push(`Disallow: ${path}`);
  });

  lines.push('');
  lines.push(`Sitemap: ${sitemapUrl}`);

  return lines.join('\n');
}

/**
 * Export default configuration for external access
 */
export const SEO_CONFIG = DEFAULT_SEO_CONFIG;

/**
 * Export all utilities as default object
 */
export default {
  setBasicMetaTags,
  setOpenGraphTags,
  setTwitterCardTags,
  generateOrganizationSchema,
  generateProgramSchema,
  generateEventSchema,
  generateBreadcrumbSchema,
  initializeSEO,
  updateSEO,
  generateSitemapData,
  generateRobotsTxt,
  SEO_CONFIG,
};