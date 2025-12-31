/**
 * Sitemap Generation Utilities
 * 
 * Generates XML sitemap dynamically based on site structure with proper
 * URL formatting, priority settings, and change frequency indicators.
 * Implements production-grade sitemap generation following SEO best practices.
 * 
 * @module utils/sitemap
 * @version 1.0.0
 */

/**
 * Sitemap URL entry configuration
 * @typedef {Object} SitemapUrl
 * @property {string} loc - The URL location (required)
 * @property {string} [lastmod] - Last modification date in ISO format
 * @property {string} [changefreq] - Change frequency (always|hourly|daily|weekly|monthly|yearly|never)
 * @property {number} [priority] - Priority (0.0 to 1.0)
 */

/**
 * Sitemap generation options
 * @typedef {Object} SitemapOptions
 * @property {string} baseUrl - Base URL of the website
 * @property {string} [defaultChangefreq='monthly'] - Default change frequency
 * @property {number} [defaultPriority=0.5] - Default priority
 * @property {boolean} [prettyPrint=false] - Format XML with indentation
 */

/**
 * Valid change frequency values according to sitemap protocol
 */
const VALID_CHANGEFREQ = Object.freeze([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never'
]);

/**
 * Default sitemap configuration
 */
const DEFAULT_CONFIG = Object.freeze({
  defaultChangefreq: 'monthly',
  defaultPriority: 0.5,
  prettyPrint: false,
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
});

/**
 * Site structure with URL configurations
 * Defines all pages with their SEO properties
 */
const SITE_STRUCTURE = Object.freeze([
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    title: 'Home'
  },
  {
    path: '/#about',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'About Us'
  },
  {
    path: '/#programs',
    priority: 0.9,
    changefreq: 'weekly',
    title: 'Programs'
  },
  {
    path: '/#impact',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Impact'
  },
  {
    path: '/#donate',
    priority: 0.95,
    changefreq: 'monthly',
    title: 'Donate'
  },
  {
    path: '/#volunteer',
    priority: 0.85,
    changefreq: 'monthly',
    title: 'Volunteer'
  },
  {
    path: '/#contact',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Contact'
  }
]);

/**
 * Validates a URL string
 * 
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
function isValidUrl(url) {
  if (typeof url !== 'string' || url.trim().length === 0) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (_error) {
    return false;
  }
}

/**
 * Validates priority value
 * 
 * @param {number} priority - Priority value to validate
 * @returns {boolean} True if valid priority
 */
function isValidPriority(priority) {
  return typeof priority === 'number' && 
         priority >= 0.0 && 
         priority <= 1.0 &&
         !isNaN(priority);
}

/**
 * Validates change frequency value
 * 
 * @param {string} changefreq - Change frequency to validate
 * @returns {boolean} True if valid change frequency
 */
function isValidChangefreq(changefreq) {
  return typeof changefreq === 'string' && 
         VALID_CHANGEFREQ.includes(changefreq.toLowerCase());
}

/**
 * Validates ISO 8601 date string
 * 
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid ISO date
 */
function isValidISODate(dateString) {
  if (typeof dateString !== 'string') {
    return false;
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}

/**
 * Escapes XML special characters
 * 
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeXml(str) {
  if (typeof str !== 'string') {
    return '';
  }

  const xmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };

  return str.replace(/[&<>"']/g, (char) => xmlEscapeMap[char]);
}

/**
 * Normalizes URL by removing trailing slashes and ensuring proper format
 * 
 * @param {string} url - URL to normalize
 * @returns {string} Normalized URL
 */
function normalizeUrl(url) {
  if (typeof url !== 'string') {
    throw new TypeError('URL must be a string');
  }

  let normalized = url.trim();

  // Remove trailing slash except for root
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

/**
 * Formats a date to W3C datetime format (ISO 8601)
 * 
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    return dateObj.toISOString();
  } catch (error) {
    console.error('[Sitemap] Date formatting error:', error);
    return new Date().toISOString();
  }
}

/**
 * Validates and sanitizes a sitemap URL entry
 * 
 * @param {SitemapUrl} urlEntry - URL entry to validate
 * @param {SitemapOptions} options - Sitemap options
 * @returns {SitemapUrl} Validated and sanitized URL entry
 * @throws {Error} If URL entry is invalid
 */
function validateUrlEntry(urlEntry, options) {
  if (!urlEntry || typeof urlEntry !== 'object') {
    throw new TypeError('URL entry must be an object');
  }

  if (!urlEntry.loc || typeof urlEntry.loc !== 'string') {
    throw new Error('URL entry must have a valid "loc" property');
  }

  const fullUrl = urlEntry.loc.startsWith('http') 
    ? urlEntry.loc 
    : `${options.baseUrl}${urlEntry.loc}`;

  if (!isValidUrl(fullUrl)) {
    throw new Error(`Invalid URL: ${fullUrl}`);
  }

  const validated = {
    loc: normalizeUrl(fullUrl)
  };

  // Validate and add lastmod if present
  if (urlEntry.lastmod !== undefined) {
    if (typeof urlEntry.lastmod === 'string') {
      if (!isValidISODate(urlEntry.lastmod)) {
        console.warn(`[Sitemap] Invalid lastmod date for ${validated.loc}, using current date`);
        validated.lastmod = formatDate(new Date());
      } else {
        validated.lastmod = urlEntry.lastmod;
      }
    } else if (urlEntry.lastmod instanceof Date) {
      validated.lastmod = formatDate(urlEntry.lastmod);
    }
  }

  // Validate and add changefreq if present
  if (urlEntry.changefreq !== undefined) {
    if (!isValidChangefreq(urlEntry.changefreq)) {
      console.warn(`[Sitemap] Invalid changefreq "${urlEntry.changefreq}" for ${validated.loc}, using default`);
      validated.changefreq = options.defaultChangefreq;
    } else {
      validated.changefreq = urlEntry.changefreq.toLowerCase();
    }
  } else {
    validated.changefreq = options.defaultChangefreq;
  }

  // Validate and add priority if present
  if (urlEntry.priority !== undefined) {
    if (!isValidPriority(urlEntry.priority)) {
      console.warn(`[Sitemap] Invalid priority ${urlEntry.priority} for ${validated.loc}, using default`);
      validated.priority = options.defaultPriority;
    } else {
      validated.priority = Number(urlEntry.priority.toFixed(1));
    }
  } else {
    validated.priority = options.defaultPriority;
  }

  return validated;
}

/**
 * Generates XML for a single URL entry
 * 
 * @param {SitemapUrl} urlEntry - Validated URL entry
 * @param {number} indent - Indentation level
 * @param {boolean} prettyPrint - Whether to format with indentation
 * @returns {string} XML string for the URL entry
 */
function generateUrlXml(urlEntry, indent = 0, prettyPrint = false) {
  const indentStr = prettyPrint ? '  '.repeat(indent) : '';
  const newline = prettyPrint ? '\n' : '';

  let xml = `${indentStr}<url>${newline}`;
  xml += `${indentStr}  <loc>${escapeXml(urlEntry.loc)}</loc>${newline}`;

  if (urlEntry.lastmod) {
    xml += `${indentStr}  <lastmod>${escapeXml(urlEntry.lastmod)}</lastmod>${newline}`;
  }

  if (urlEntry.changefreq) {
    xml += `${indentStr}  <changefreq>${escapeXml(urlEntry.changefreq)}</changefreq>${newline}`;
  }

  if (urlEntry.priority !== undefined) {
    xml += `${indentStr}  <priority>${urlEntry.priority}</priority>${newline}`;
  }

  xml += `${indentStr}</url>${newline}`;

  return xml;
}

/**
 * Generates complete XML sitemap
 * 
 * @param {SitemapUrl[]} urls - Array of URL entries
 * @param {SitemapOptions} options - Sitemap generation options
 * @returns {string} Complete XML sitemap
 */
function generateSitemapXml(urls, options) {
  const prettyPrint = options.prettyPrint || false;
  const newline = prettyPrint ? '\n' : '';
  const indent = prettyPrint ? '  ' : '';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>' + newline;
  xml += `<urlset xmlns="${options.xmlns}">${newline}`;

  for (const url of urls) {
    xml += generateUrlXml(url, 1, prettyPrint);
  }

  xml += '</urlset>';

  return xml;
}

/**
 * Generates sitemap from site structure
 * 
 * @param {string} baseUrl - Base URL of the website
 * @param {Object} [customOptions={}] - Custom options to override defaults
 * @returns {string} Generated XML sitemap
 * @throws {Error} If baseUrl is invalid or sitemap generation fails
 */
export function generateSitemap(baseUrl, customOptions = {}) {
  try {
    // Validate base URL
    if (!baseUrl || typeof baseUrl !== 'string') {
      throw new TypeError('Base URL is required and must be a string');
    }

    if (!isValidUrl(baseUrl)) {
      throw new Error(`Invalid base URL: ${baseUrl}`);
    }

    // Normalize base URL
    const normalizedBaseUrl = normalizeUrl(baseUrl);

    // Merge options with defaults
    const options = {
      ...DEFAULT_CONFIG,
      ...customOptions,
      baseUrl: normalizedBaseUrl
    };

    // Get current date for lastmod
    const currentDate = formatDate(new Date());

    // Build URL entries from site structure
    const urlEntries = SITE_STRUCTURE.map((page) => {
      const entry = {
        loc: page.path,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      };

      return validateUrlEntry(entry, options);
    });

    // Generate XML sitemap
    const sitemap = generateSitemapXml(urlEntries, options);

    console.log(`[Sitemap] Generated sitemap with ${urlEntries.length} URLs`);

    return sitemap;
  } catch (error) {
    console.error('[Sitemap] Generation error:', {
      message: error.message,
      stack: error.stack,
      baseUrl
    });
    throw new Error(`Failed to generate sitemap: ${error.message}`);
  }
}

/**
 * Generates sitemap with custom URL entries
 * 
 * @param {string} baseUrl - Base URL of the website
 * @param {SitemapUrl[]} customUrls - Custom URL entries
 * @param {Object} [customOptions={}] - Custom options to override defaults
 * @returns {string} Generated XML sitemap
 * @throws {Error} If parameters are invalid or generation fails
 */
export function generateCustomSitemap(baseUrl, customUrls, customOptions = {}) {
  try {
    // Validate base URL
    if (!baseUrl || typeof baseUrl !== 'string') {
      throw new TypeError('Base URL is required and must be a string');
    }

    if (!isValidUrl(baseUrl)) {
      throw new Error(`Invalid base URL: ${baseUrl}`);
    }

    // Validate custom URLs
    if (!Array.isArray(customUrls)) {
      throw new TypeError('Custom URLs must be an array');
    }

    if (customUrls.length === 0) {
      throw new Error('Custom URLs array cannot be empty');
    }

    // Normalize base URL
    const normalizedBaseUrl = normalizeUrl(baseUrl);

    // Merge options with defaults
    const options = {
      ...DEFAULT_CONFIG,
      ...customOptions,
      baseUrl: normalizedBaseUrl
    };

    // Validate and sanitize all URL entries
    const validatedUrls = customUrls.map((url) => validateUrlEntry(url, options));

    // Generate XML sitemap
    const sitemap = generateSitemapXml(validatedUrls, options);

    console.log(`[Sitemap] Generated custom sitemap with ${validatedUrls.length} URLs`);

    return sitemap;
  } catch (error) {
    console.error('[Sitemap] Custom generation error:', {
      message: error.message,
      stack: error.stack,
      baseUrl,
      urlCount: Array.isArray(customUrls) ? customUrls.length : 0
    });
    throw new Error(`Failed to generate custom sitemap: ${error.message}`);
  }
}

/**
 * Gets the default site structure
 * 
 * @returns {Array} Site structure configuration
 */
export function getSiteStructure() {
  return [...SITE_STRUCTURE];
}

/**
 * Validates sitemap XML structure
 * 
 * @param {string} xml - XML string to validate
 * @returns {boolean} True if valid sitemap XML
 */
export function validateSitemapXml(xml) {
  try {
    if (typeof xml !== 'string' || xml.trim().length === 0) {
      return false;
    }

    // Basic XML structure validation
    const hasXmlDeclaration = xml.includes('<?xml version="1.0"');
    const hasUrlset = xml.includes('<urlset') && xml.includes('</urlset>');
    const hasNamespace = xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    const hasUrls = xml.includes('<url>') && xml.includes('</url>');
    const hasLoc = xml.includes('<loc>') && xml.includes('</loc>');

    return hasXmlDeclaration && hasUrlset && hasNamespace && hasUrls && hasLoc;
  } catch (_error) {
    return false;
  }
}

/**
 * Exports sitemap utilities
 */
export default {
  generateSitemap,
  generateCustomSitemap,
  getSiteStructure,
  validateSitemapXml,
  VALID_CHANGEFREQ,
  DEFAULT_CONFIG
};