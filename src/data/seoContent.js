/**
 * SEO Content Data Module
 * 
 * Centralized SEO content management including meta tags, structured data schemas,
 * and social media sharing content. Designed for easy content management and
 * future localization support.
 * 
 * @module data/seoContent
 * @version 1.0.0
 */

/**
 * Default site-wide SEO configuration
 * @constant {Object}
 */
export const DEFAULT_SEO = Object.freeze({
  siteName: 'Makoko Community Kids NGO',
  siteUrl: 'https://makokokids.org',
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@MakokoKids',
  facebookAppId: '',
  locale: 'en_US',
  alternateLocales: ['en_NG'],
  organizationEmail: 'info@makokokids.org',
  organizationPhone: '+234-XXX-XXX-XXXX',
});

/**
 * Home page SEO content
 * @constant {Object}
 */
export const HOME_SEO = Object.freeze({
  title: 'Makoko Community Kids - Empowering Children Through Education',
  description: 'Supporting underprivileged children in Makoko community through education, healthcare, and community development programs. Join us in making a difference.',
  keywords: [
    'NGO',
    'education',
    'children',
    'Makoko',
    'community development',
    'charity',
    'Lagos',
    'Nigeria',
    'child welfare',
    'education programs',
    'community support',
    'volunteer opportunities',
  ],
  image: '/images/home-hero.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
    ],
  },
});

/**
 * About page SEO content
 * @constant {Object}
 */
export const ABOUT_SEO = Object.freeze({
  title: 'About Us - Makoko Community Kids NGO | Our Mission & Vision',
  description: 'Learn about Makoko Community Kids NGO, our mission to empower children through education, our values, team, and the impact we make in the Makoko community.',
  keywords: [
    'about Makoko Kids',
    'NGO mission',
    'vision',
    'values',
    'team',
    'community impact',
    'Lagos NGO',
    'child education mission',
  ],
  image: '/images/about-team.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
    ],
  },
});

/**
 * Programs page SEO content
 * @constant {Object}
 */
export const PROGRAMS_SEO = Object.freeze({
  title: 'Our Programs - Education & Community Development | Makoko Kids',
  description: 'Explore our comprehensive programs including education support, healthcare initiatives, skills training, and community development projects for Makoko children.',
  keywords: [
    'education programs',
    'healthcare initiatives',
    'skills training',
    'community development',
    'after-school programs',
    'scholarship programs',
    'vocational training',
    'child welfare programs',
  ],
  image: '/images/programs-overview.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Programs', url: '/programs' },
    ],
  },
});

/**
 * Impact page SEO content
 * @constant {Object}
 */
export const IMPACT_SEO = Object.freeze({
  title: 'Our Impact - Success Stories & Statistics | Makoko Community Kids',
  description: 'See the real impact of our work through success stories, statistics, and testimonials from children, families, and volunteers in the Makoko community.',
  keywords: [
    'impact stories',
    'success stories',
    'testimonials',
    'community impact',
    'program results',
    'children helped',
    'education outcomes',
    'community transformation',
  ],
  image: '/images/impact-stories.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Impact', url: '/impact' },
    ],
  },
});

/**
 * Donate page SEO content
 * @constant {Object}
 */
export const DONATE_SEO = Object.freeze({
  title: 'Donate - Support Makoko Children | Makoko Community Kids NGO',
  description: 'Make a difference in the lives of Makoko children. Your donation supports education, healthcare, and community development. Every contribution counts.',
  keywords: [
    'donate',
    'donation',
    'support children',
    'charity donation',
    'help children',
    'education funding',
    'NGO donation',
    'make a difference',
    'child sponsorship',
  ],
  image: '/images/donate-impact.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Donate', url: '/donate' },
    ],
  },
});

/**
 * Volunteer page SEO content
 * @constant {Object}
 */
export const VOLUNTEER_SEO = Object.freeze({
  title: 'Volunteer With Us - Make a Difference | Makoko Community Kids',
  description: 'Join our volunteer team and make a direct impact on children\'s lives. Explore volunteer opportunities in education, healthcare, and community development.',
  keywords: [
    'volunteer',
    'volunteer opportunities',
    'community service',
    'help children',
    'teaching volunteer',
    'healthcare volunteer',
    'NGO volunteer',
    'Lagos volunteer',
    'volunteer Nigeria',
  ],
  image: '/images/volunteer-team.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Volunteer', url: '/volunteer' },
    ],
  },
});

/**
 * Contact page SEO content
 * @constant {Object}
 */
export const CONTACT_SEO = Object.freeze({
  title: 'Contact Us - Get in Touch | Makoko Community Kids NGO',
  description: 'Contact Makoko Community Kids NGO for inquiries, partnerships, volunteer opportunities, or donations. We\'re here to answer your questions.',
  keywords: [
    'contact',
    'get in touch',
    'contact NGO',
    'inquiries',
    'partnerships',
    'volunteer contact',
    'donation inquiries',
    'Makoko location',
  ],
  image: '/images/contact-location.jpg',
  type: 'website',
  structuredData: {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
  },
});

/**
 * Organization structured data schema
 * @constant {Object}
 */
export const ORGANIZATION_SCHEMA = Object.freeze({
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: DEFAULT_SEO.siteName,
  url: DEFAULT_SEO.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${DEFAULT_SEO.siteUrl}/images/logo.png`,
    width: 250,
    height: 250,
  },
  description: 'Non-profit organization dedicated to empowering underprivileged children in Makoko community through education, healthcare, and community development programs.',
  foundingDate: '2015',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Makoko Community',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    postalCode: '100001',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: DEFAULT_SEO.organizationPhone,
    email: DEFAULT_SEO.organizationEmail,
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://facebook.com/makokokids',
    'https://twitter.com/makokokids',
    'https://instagram.com/makokokids',
    'https://linkedin.com/company/makokokids',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Makoko Community, Lagos, Nigeria',
  },
  knowsAbout: [
    'Child Education',
    'Community Development',
    'Healthcare Access',
    'Skills Training',
    'Youth Empowerment',
  ],
});

/**
 * Program schemas for structured data
 * @constant {Array<Object>}
 */
export const PROGRAM_SCHEMAS = Object.freeze([
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalProgram',
    name: 'Education Support Program',
    description: 'Comprehensive education support including school supplies, tutoring, and scholarship opportunities for underprivileged children.',
    provider: {
      '@type': 'NGO',
      name: DEFAULT_SEO.siteName,
    },
    educationalProgramMode: 'blended',
    timeToComplete: 'P1Y',
    programPrerequisites: 'Open to all children in Makoko community',
    educationalCredentialAwarded: 'Certificate of Completion',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalProgram',
    name: 'Skills Training Program',
    description: 'Vocational skills training in technology, arts, crafts, and entrepreneurship for youth empowerment.',
    provider: {
      '@type': 'NGO',
      name: DEFAULT_SEO.siteName,
    },
    educationalProgramMode: 'onsite',
    timeToComplete: 'P6M',
    programPrerequisites: 'Ages 14-25',
    educationalCredentialAwarded: 'Skills Certificate',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Healthcare Initiative',
    description: 'Free healthcare services, medical checkups, and health education for children and families.',
    provider: {
      '@type': 'NGO',
      name: DEFAULT_SEO.siteName,
    },
    medicalSpecialty: 'Pediatrics',
    availableService: [
      'Medical Checkups',
      'Vaccinations',
      'Health Education',
      'Nutrition Support',
    ],
  },
]);

/**
 * Social media sharing content templates
 * @constant {Object}
 */
export const SOCIAL_SHARING = Object.freeze({
  home: {
    title: 'Empowering Makoko Children Through Education',
    description: 'Join us in making a difference in the lives of underprivileged children. Every child deserves quality education and a bright future.',
    hashtags: ['MakokoKids', 'Education', 'NGO', 'ChildWelfare', 'Lagos'],
  },
  programs: {
    title: 'Our Programs Transform Lives',
    description: 'From education support to skills training, our programs create lasting impact in the Makoko community.',
    hashtags: ['EducationForAll', 'CommunityDevelopment', 'MakokoKids'],
  },
  impact: {
    title: 'Real Impact, Real Stories',
    description: 'See how your support transforms lives. Read success stories from children and families we\'ve helped.',
    hashtags: ['Impact', 'SuccessStories', 'MakokoKids', 'Changemakers'],
  },
  donate: {
    title: 'Your Donation Changes Lives',
    description: 'Every contribution supports education, healthcare, and community development for Makoko children. Donate today.',
    hashtags: ['Donate', 'MakeADifference', 'SupportChildren', 'MakokoKids'],
  },
  volunteer: {
    title: 'Volunteer and Make a Difference',
    description: 'Join our team of dedicated volunteers. Your time and skills can transform children\'s lives.',
    hashtags: ['Volunteer', 'CommunityService', 'MakokoKids', 'GiveBack'],
  },
});

/**
 * Twitter Card specific content
 * @constant {Object}
 */
export const TWITTER_CARDS = Object.freeze({
  home: {
    card: 'summary_large_image',
    title: 'Makoko Community Kids - Empowering Children',
    description: 'Supporting underprivileged children through education, healthcare, and community development.',
    image: '/images/twitter-home.jpg',
  },
  programs: {
    card: 'summary_large_image',
    title: 'Our Programs - Makoko Kids',
    description: 'Education, healthcare, skills training, and community development programs.',
    image: '/images/twitter-programs.jpg',
  },
  impact: {
    card: 'summary_large_image',
    title: 'Our Impact - Success Stories',
    description: 'Real stories of transformation from the Makoko community.',
    image: '/images/twitter-impact.jpg',
  },
});

/**
 * FAQ structured data for common questions
 * @constant {Object}
 */
export const FAQ_SCHEMA = Object.freeze({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I donate to Makoko Community Kids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can donate through our secure online donation form using credit card, PayPal, or bank transfer. Visit our Donate page for more options.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I volunteer with Makoko Community Kids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We welcome volunteers in various roles including teaching, healthcare, administration, and community outreach. Fill out our volunteer application form to get started.',
      },
    },
    {
      '@type': 'Question',
      name: 'What programs do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer education support, healthcare initiatives, skills training, and community development programs for children and families in the Makoko community.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Makoko Community Kids located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are located in Makoko Community, Lagos, Nigeria. Visit our Contact page for detailed location information and directions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my donation tax-deductible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Makoko Community Kids is a registered non-profit organization. Donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation.',
      },
    },
  ],
});

/**
 * Sitemap configuration for all pages
 * @constant {Array<Object>}
 */
export const SITEMAP_PAGES = Object.freeze([
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    title: 'Home',
  },
  {
    path: '/about',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'About Us',
  },
  {
    path: '/programs',
    priority: 0.9,
    changefreq: 'weekly',
    title: 'Programs',
  },
  {
    path: '/impact',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Impact',
  },
  {
    path: '/donate',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Donate',
  },
  {
    path: '/volunteer',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Volunteer',
  },
  {
    path: '/contact',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Contact',
  },
]);

/**
 * Robots.txt configuration
 * @constant {Object}
 */
export const ROBOTS_CONFIG = Object.freeze({
  allowAll: true,
  disallowPaths: [
    '/api',
    '/admin',
    '/*.json',
    '/private',
  ],
  crawlDelay: null,
  sitemapUrl: `${DEFAULT_SEO.siteUrl}/sitemap.xml`,
});

/**
 * Get SEO content for a specific page
 * 
 * @param {string} page - Page identifier (home, about, programs, etc.)
 * @returns {Object} SEO content for the page
 */
export function getSEOContent(page) {
  const seoMap = {
    home: HOME_SEO,
    about: ABOUT_SEO,
    programs: PROGRAMS_SEO,
    impact: IMPACT_SEO,
    donate: DONATE_SEO,
    volunteer: VOLUNTEER_SEO,
    contact: CONTACT_SEO,
  };

  const content = seoMap[page?.toLowerCase()];
  
  if (!content) {
    console.warn(`[SEO Content] No SEO content found for page: ${page}, using home defaults`);
    return HOME_SEO;
  }

  return content;
}

/**
 * Get social sharing content for a specific page
 * 
 * @param {string} page - Page identifier
 * @returns {Object} Social sharing content
 */
export function getSocialSharingContent(page) {
  const content = SOCIAL_SHARING[page?.toLowerCase()];
  
  if (!content) {
    console.warn(`[SEO Content] No social sharing content found for page: ${page}`);
    return SOCIAL_SHARING.home;
  }

  return content;
}

/**
 * Get Twitter Card content for a specific page
 * 
 * @param {string} page - Page identifier
 * @returns {Object} Twitter Card content
 */
export function getTwitterCardContent(page) {
  const content = TWITTER_CARDS[page?.toLowerCase()];
  
  if (!content) {
    return TWITTER_CARDS.home;
  }

  return content;
}

/**
 * Generate complete SEO package for a page
 * Combines all SEO elements for easy consumption
 * 
 * @param {string} page - Page identifier
 * @param {Object} overrides - Optional overrides for specific fields
 * @returns {Object} Complete SEO package
 */
export function generateSEOPackage(page, overrides = {}) {
  const seoContent = getSEOContent(page);
  const socialContent = getSocialSharingContent(page);
  const twitterContent = getTwitterCardContent(page);

  return {
    ...seoContent,
    ...overrides,
    social: {
      ...socialContent,
      ...(overrides.social || {}),
    },
    twitter: {
      ...twitterContent,
      ...(overrides.twitter || {}),
    },
    organization: ORGANIZATION_SCHEMA,
    faq: FAQ_SCHEMA,
  };
}

/**
 * Export all SEO content as default object
 */
export default {
  DEFAULT_SEO,
  HOME_SEO,
  ABOUT_SEO,
  PROGRAMS_SEO,
  IMPACT_SEO,
  DONATE_SEO,
  VOLUNTEER_SEO,
  CONTACT_SEO,
  ORGANIZATION_SCHEMA,
  PROGRAM_SCHEMAS,
  SOCIAL_SHARING,
  TWITTER_CARDS,
  FAQ_SCHEMA,
  SITEMAP_PAGES,
  ROBOTS_CONFIG,
  getSEOContent,
  getSocialSharingContent,
  getTwitterCardContent,
  generateSEOPackage,
};