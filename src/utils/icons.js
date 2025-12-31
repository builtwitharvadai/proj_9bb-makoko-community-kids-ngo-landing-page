/**
 * Icon Utilities and SVG Icon Components
 * 
 * Provides utility functions and SVG icon components for rendering
 * program icons with customizable size, color, and accessibility features.
 * 
 * @module utils/icons
 * @version 1.0.0
 */

/**
 * Default icon configuration
 */
const DEFAULT_ICON_CONFIG = Object.freeze({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  className: '',
  ariaLabel: '',
  role: 'img',
});

/**
 * Icon size presets for consistent sizing across the application
 */
const ICON_SIZES = Object.freeze({
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
});

/**
 * Validates icon configuration parameters
 * 
 * @param {Object} config - Icon configuration object
 * @returns {Object} Validated configuration
 * @throws {TypeError} If configuration is invalid
 */
function validateIconConfig(config) {
  if (config.size !== undefined) {
    const size = typeof config.size === 'string' ? ICON_SIZES[config.size] : config.size;
    if (typeof size !== 'number' || size <= 0) {
      throw new TypeError(`Invalid icon size: ${config.size}. Must be a positive number or valid size preset.`);
    }
  }

  if (config.strokeWidth !== undefined && (typeof config.strokeWidth !== 'number' || config.strokeWidth < 0)) {
    throw new TypeError(`Invalid strokeWidth: ${config.strokeWidth}. Must be a non-negative number.`);
  }

  return config;
}

/**
 * Normalizes icon configuration by merging with defaults
 * 
 * @param {Object} config - User-provided configuration
 * @returns {Object} Normalized configuration
 */
function normalizeIconConfig(config = {}) {
  validateIconConfig(config);

  const size = typeof config.size === 'string' ? ICON_SIZES[config.size] : config.size;

  return {
    ...DEFAULT_ICON_CONFIG,
    ...config,
    size: size || DEFAULT_ICON_CONFIG.size,
  };
}

/**
 * Creates an SVG element with proper attributes and accessibility features
 * 
 * @param {Object} config - Icon configuration
 * @param {string} pathData - SVG path data
 * @param {string} iconName - Name of the icon for accessibility
 * @returns {SVGElement} Configured SVG element
 */
function createSVGElement(config, pathData, iconName) {
  const normalizedConfig = normalizeIconConfig(config);
  const { size, color, strokeWidth, className, ariaLabel, role } = normalizedConfig;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size.toString());
  svg.setAttribute('height', size.toString());
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', color);
  svg.setAttribute('stroke-width', strokeWidth.toString());
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('role', role);
  svg.setAttribute('aria-label', ariaLabel || `${iconName} icon`);

  if (className) {
    svg.setAttribute('class', className);
  }

  // Add paths
  if (Array.isArray(pathData)) {
    pathData.forEach(data => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', data);
      svg.appendChild(path);
    });
  } else {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    svg.appendChild(path);
  }

  return svg;
}

/**
 * Education icon - Book with bookmark
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Education icon SVG element
 */
export function createEducationIcon(config = {}) {
  const pathData = [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    'M12 2v10l2-2 2 2V2',
  ];

  return createSVGElement(config, pathData, 'Education');
}

/**
 * Healthcare icon - Heart with pulse line
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Healthcare icon SVG element
 */
export function createHealthcareIcon(config = {}) {
  const pathData = [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    'M3.5 12h4l2-4 2 8 2-4h4',
  ];

  return createSVGElement(config, pathData, 'Healthcare');
}

/**
 * Nutrition icon - Apple
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Nutrition icon SVG element
 */
export function createNutritionIcon(config = {}) {
  const pathData = [
    'M12 2c-1.5 0-2.5 1-3 2.5-.5-1.5-1.5-2.5-3-2.5-2 0-3 1.5-3 3.5 0 4 6 8 6 8s6-4 6-8c0-2-1-3.5-3-3.5z',
    'M8 2c0 1.5.5 2.5 1.5 3.5',
    'M12 2v4',
    'M12 6c2.5 0 4.5 2 4.5 4.5 0 3.5-2 6.5-4.5 9.5-2.5-3-4.5-6-4.5-9.5C7.5 8 9.5 6 12 6z',
  ];

  return createSVGElement(config, pathData, 'Nutrition');
}

/**
 * Skills Development icon - Tools/Wrench and Hammer
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Skills Development icon SVG element
 */
export function createSkillsIcon(config = {}) {
  const pathData = [
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    'M2 2l4 4',
    'M6 6l-4 4',
  ];

  return createSVGElement(config, pathData, 'Skills Development');
}

/**
 * Community Engagement icon - Users/People
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Community Engagement icon SVG element
 */
export function createCommunityIcon(config = {}) {
  const pathData = [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ];

  return createSVGElement(config, pathData, 'Community Engagement');
}

/**
 * Generic program icon - Star
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Generic program icon SVG element
 */
export function createProgramIcon(config = {}) {
  const pathData = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

  return createSVGElement(config, pathData, 'Program');
}

/**
 * Impact icon - Target/Bullseye
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Impact icon SVG element
 */
export function createImpactIcon(config = {}) {
  const pathData = [
    'M22 12h-4',
    'M6 12H2',
    'M12 6V2',
    'M12 22v-4',
    'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
    'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  ];

  return createSVGElement(config, pathData, 'Impact');
}

/**
 * Support icon - Hands helping
 * 
 * @param {Object} config - Icon configuration
 * @returns {SVGElement} Support icon SVG element
 */
export function createSupportIcon(config = {}) {
  const pathData = [
    'M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14',
    'M5 12H2v5h3',
    'M13 12h2a2 2 0 0 1 0 4h-3c-.6 0-1.1-.2-1.4-.6L5 10',
    'M19 12h3v5h-3',
  ];

  return createSVGElement(config, pathData, 'Support');
}

/**
 * Icon registry mapping icon names to their creation functions
 */
const ICON_REGISTRY = Object.freeze({
  education: createEducationIcon,
  healthcare: createHealthcareIcon,
  nutrition: createNutritionIcon,
  skills: createSkillsIcon,
  community: createCommunityIcon,
  program: createProgramIcon,
  impact: createImpactIcon,
  support: createSupportIcon,
});

/**
 * Gets an icon by name from the registry
 * 
 * @param {string} iconName - Name of the icon to retrieve
 * @param {Object} config - Icon configuration
 * @returns {SVGElement|null} Icon SVG element or null if not found
 */
export function getIcon(iconName, config = {}) {
  const normalizedName = iconName.toLowerCase().trim();
  const iconCreator = ICON_REGISTRY[normalizedName];

  if (!iconCreator) {
    console.warn(`[Icons] Icon "${iconName}" not found in registry. Available icons:`, Object.keys(ICON_REGISTRY));
    return null;
  }

  try {
    return iconCreator(config);
  } catch (error) {
    console.error(`[Icons] Error creating icon "${iconName}":`, error);
    return null;
  }
}

/**
 * Renders an icon into a container element
 * 
 * @param {HTMLElement} container - Container element to render icon into
 * @param {string} iconName - Name of the icon to render
 * @param {Object} config - Icon configuration
 * @returns {SVGElement|null} Rendered icon element or null if failed
 */
export function renderIcon(container, iconName, config = {}) {
  if (!(container instanceof HTMLElement)) {
    console.error('[Icons] Invalid container element provided');
    return null;
  }

  const icon = getIcon(iconName, config);
  if (!icon) {
    return null;
  }

  // Clear existing content
  container.innerHTML = '';
  container.appendChild(icon);

  return icon;
}

/**
 * Creates an icon element with wrapper div for easier styling
 * 
 * @param {string} iconName - Name of the icon
 * @param {Object} config - Icon configuration
 * @param {string} wrapperClass - CSS class for wrapper div
 * @returns {HTMLElement|null} Wrapper div containing icon or null if failed
 */
export function createIconWithWrapper(iconName, config = {}, wrapperClass = 'icon-wrapper') {
  const icon = getIcon(iconName, config);
  if (!icon) {
    return null;
  }

  const wrapper = document.createElement('div');
  wrapper.className = wrapperClass;
  wrapper.appendChild(icon);

  return wrapper;
}

/**
 * Gets list of all available icon names
 * 
 * @returns {string[]} Array of available icon names
 */
export function getAvailableIcons() {
  return Object.keys(ICON_REGISTRY);
}

/**
 * Checks if an icon exists in the registry
 * 
 * @param {string} iconName - Name of the icon to check
 * @returns {boolean} True if icon exists, false otherwise
 */
export function hasIcon(iconName) {
  const normalizedName = iconName.toLowerCase().trim();
  return normalizedName in ICON_REGISTRY;
}

/**
 * Export icon size presets for external use
 */
export { ICON_SIZES };

/**
 * Export default configuration for external reference
 */
export { DEFAULT_ICON_CONFIG };