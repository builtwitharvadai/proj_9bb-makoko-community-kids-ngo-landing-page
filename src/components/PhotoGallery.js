/**
 * PhotoGallery Component
 * 
 * Responsive photo gallery with lightbox functionality, lazy loading,
 * and keyboard navigation. Showcases community programs and activities
 * using optimized Unsplash images.
 * 
 * Features:
 * - Responsive grid layout with Tailwind CSS
 * - Lightbox modal with keyboard navigation
 * - Lazy loading for performance optimization
 * - Touch/swipe support for mobile devices
 * - Accessible with ARIA labels and keyboard controls
 * - Image optimization with WebP support
 * 
 * @module PhotoGallery
 * @version 1.0.0
 */

import {
  createOptimizedImage,
  initializeLazyLoading,
  generateUnsplashUrl,
} from '../utils/imageOptimization.js';

/**
 * Gallery photo configuration
 * @typedef {Object} GalleryPhoto
 * @property {string} id - Unsplash photo ID
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} category - Photo category for filtering
 */

/**
 * Gallery photos showcasing community programs and activities
 * @constant {GalleryPhoto[]}
 */
const GALLERY_PHOTOS = [
  {
    id: '5bYxXawHOQg',
    alt: 'Children participating in educational program at Makoko community center',
    category: 'education',
  },
  {
    id: 'NDuPLKYRXQU',
    alt: 'Community volunteers teaching children in outdoor classroom setting',
    category: 'education',
  },
  {
    id: 'WNoLnJo7tS8',
    alt: 'Group of children engaged in creative arts and crafts activities',
    category: 'activities',
  },
  {
    id: 'hn6CC9aosEk',
    alt: 'Children playing and learning together in community playground',
    category: 'activities',
  },
  {
    id: 'mG28olYFgHI',
    alt: 'Community meal program providing nutritious food to children',
    category: 'nutrition',
  },
  {
    id: 'lbLgFFlADrY',
    alt: 'Healthcare workers conducting health checkup for community children',
    category: 'health',
  },
  {
    id: 'Zyx1bK9mqmA',
    alt: 'Children reading books in community library program',
    category: 'education',
  },
  {
    id: 'pElSkGRA2NU',
    alt: 'Sports and recreation activities for youth development',
    category: 'activities',
  },
  {
    id: 'Fa9b57PEQlg',
    alt: 'Community gathering celebrating program achievements and milestones',
    category: 'community',
  },
];

/**
 * Lightbox state management
 * @type {Object}
 */
const lightboxState = {
  isOpen: false,
  currentIndex: 0,
  touchStartX: 0,
  touchEndX: 0,
};

/**
 * Minimum swipe distance for touch navigation (in pixels)
 * @constant {number}
 */
const SWIPE_THRESHOLD = 50;

/**
 * Creates the photo gallery section with responsive grid
 * 
 * @returns {Promise<HTMLElement>} Gallery section element
 */
async function createPhotoGallery() {
  try {
    const section = document.createElement('section');
    section.id = 'photo-gallery';
    section.className = 'section-container bg-gray-50';
    section.setAttribute('aria-label', 'Photo Gallery');

    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto';

    const header = createGalleryHeader();
    container.appendChild(header);

    const grid = await createGalleryGrid();
    container.appendChild(grid);

    const lightbox = createLightbox();
    container.appendChild(lightbox);

    section.appendChild(container);

    initializeLazyLoading(section, {
      rootMargin: '100px',
      threshold: 0.01,
    });

    return section;
  } catch (error) {
    console.error('[PhotoGallery] Failed to create gallery:', error);
    throw error;
  }
}

/**
 * Creates the gallery header with title and description
 * 
 * @returns {HTMLElement} Header element
 */
function createGalleryHeader() {
  const header = document.createElement('div');
  header.className = 'text-center mb-12';

  const title = document.createElement('h2');
  title.className = 'text-4xl md:text-5xl font-bold text-gray-900 mb-4';
  title.textContent = 'Our Community in Action';

  const description = document.createElement('p');
  description.className = 'text-xl text-gray-600 max-w-3xl mx-auto';
  description.textContent =
    'Witness the transformative impact of our programs through these moments captured in the Makoko community.';

  header.appendChild(title);
  header.appendChild(description);

  return header;
}

/**
 * Creates the responsive photo grid with optimized images
 * 
 * @returns {Promise<HTMLElement>} Grid container element
 */
async function createGalleryGrid() {
  try {
    const grid = document.createElement('div');
    grid.className =
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8';
    grid.setAttribute('role', 'list');
    grid.setAttribute('aria-label', 'Photo gallery grid');

    const photoPromises = GALLERY_PHOTOS.map((photo, index) =>
      createGalleryItem(photo, index)
    );

    const photoElements = await Promise.all(photoPromises);
    photoElements.forEach((element) => grid.appendChild(element));

    return grid;
  } catch (error) {
    console.error('[PhotoGallery] Failed to create gallery grid:', error);
    throw error;
  }
}

/**
 * Creates an individual gallery item with optimized image
 * 
 * @param {GalleryPhoto} photo - Photo configuration
 * @param {number} index - Photo index in gallery
 * @returns {Promise<HTMLElement>} Gallery item element
 */
async function createGalleryItem(photo, index) {
  try {
    const item = document.createElement('div');
    item.className =
      'group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer';
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View photo: ${photo.alt}`);
    item.dataset.index = String(index);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'aspect-[4/3] overflow-hidden bg-gray-200';

    const img = await createOptimizedImage({
      photoId: photo.id,
      alt: photo.alt,
      width: 800,
      height: 600,
      lazy: true,
      className:
        'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
      attributes: {
        'data-category': photo.category,
      },
    });

    imageContainer.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className =
      'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300';

    const overlayContent = document.createElement('div');
    overlayContent.className =
      'absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300';

    const categoryBadge = document.createElement('span');
    categoryBadge.className =
      'inline-block px-3 py-1 bg-primary-600 rounded-full text-sm font-semibold mb-2 capitalize';
    categoryBadge.textContent = photo.category;

    const caption = document.createElement('p');
    caption.className = 'text-sm font-medium line-clamp-2';
    caption.textContent = photo.alt;

    overlayContent.appendChild(categoryBadge);
    overlayContent.appendChild(caption);
    overlay.appendChild(overlayContent);

    item.appendChild(imageContainer);
    item.appendChild(overlay);

    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    return item;
  } catch (error) {
    console.error('[PhotoGallery] Failed to create gallery item:', error);
    throw error;
  }
}

/**
 * Creates the lightbox modal for full-size image viewing
 * 
 * @returns {HTMLElement} Lightbox container element
 */
function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'photo-lightbox';
  lightbox.className =
    'fixed inset-0 bg-black/95 z-50 hidden items-center justify-center';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Photo lightbox viewer');

  const closeButton = document.createElement('button');
  closeButton.className =
    'absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-white/10';
  closeButton.setAttribute('aria-label', 'Close lightbox');
  closeButton.innerHTML = `
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  closeButton.addEventListener('click', closeLightbox);

  const prevButton = document.createElement('button');
  prevButton.className =
    'absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-3 rounded-lg hover:bg-white/10';
  prevButton.setAttribute('aria-label', 'Previous photo');
  prevButton.innerHTML = `
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  `;
  prevButton.addEventListener('click', showPreviousPhoto);

  const nextButton = document.createElement('button');
  nextButton.className =
    'absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-3 rounded-lg hover:bg-white/10';
  nextButton.setAttribute('aria-label', 'Next photo');
  nextButton.innerHTML = `
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `;
  nextButton.addEventListener('click', showNextPhoto);

  const imageContainer = document.createElement('div');
  imageContainer.id = 'lightbox-image-container';
  imageContainer.className =
    'relative max-w-7xl max-h-[90vh] mx-auto px-4 flex items-center justify-center';

  const caption = document.createElement('div');
  caption.id = 'lightbox-caption';
  caption.className =
    'absolute bottom-8 left-0 right-0 text-center text-white px-4';

  const captionText = document.createElement('p');
  captionText.className = 'text-lg font-medium mb-2';
  captionText.id = 'lightbox-caption-text';

  const counter = document.createElement('p');
  counter.className = 'text-sm text-gray-300';
  counter.id = 'lightbox-counter';

  caption.appendChild(captionText);
  caption.appendChild(counter);

  lightbox.appendChild(closeButton);
  lightbox.appendChild(prevButton);
  lightbox.appendChild(nextButton);
  lightbox.appendChild(imageContainer);
  lightbox.appendChild(caption);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
  lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });

  return lightbox;
}

/**
 * Opens the lightbox at specified photo index
 * 
 * @param {number} index - Photo index to display
 */
async function openLightbox(index) {
  try {
    lightboxState.isOpen = true;
    lightboxState.currentIndex = index;

    const lightbox = document.getElementById('photo-lightbox');
    if (!lightbox) {
      throw new Error('Lightbox element not found');
    }

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    document.body.style.overflow = 'hidden';

    await updateLightboxContent(index);

    document.addEventListener('keydown', handleKeyboardNavigation);

    lightbox.focus();
  } catch (error) {
    console.error('[PhotoGallery] Failed to open lightbox:', error);
  }
}

/**
 * Closes the lightbox and cleans up event listeners
 */
function closeLightbox() {
  try {
    lightboxState.isOpen = false;

    const lightbox = document.getElementById('photo-lightbox');
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove('flex');
    lightbox.classList.add('hidden');

    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleKeyboardNavigation);

    const imageContainer = document.getElementById('lightbox-image-container');
    if (imageContainer) {
      imageContainer.innerHTML = '';
    }
  } catch (error) {
    console.error('[PhotoGallery] Failed to close lightbox:', error);
  }
}

/**
 * Updates lightbox content with current photo
 * 
 * @param {number} index - Photo index to display
 */
async function updateLightboxContent(index) {
  try {
    const photo = GALLERY_PHOTOS[index];
    if (!photo) {
      throw new Error(`Photo not found at index ${index}`);
    }

    const imageContainer = document.getElementById('lightbox-image-container');
    const captionText = document.getElementById('lightbox-caption-text');
    const counter = document.getElementById('lightbox-counter');

    if (!imageContainer || !captionText || !counter) {
      throw new Error('Lightbox elements not found');
    }

    imageContainer.innerHTML = '';

    const img = await createOptimizedImage({
      photoId: photo.id,
      alt: photo.alt,
      width: 1920,
      height: 1080,
      lazy: false,
      className: 'max-w-full max-h-[80vh] object-contain rounded-lg',
    });

    imageContainer.appendChild(img);

    captionText.textContent = photo.alt;
    counter.textContent = `${index + 1} / ${GALLERY_PHOTOS.length}`;
  } catch (error) {
    console.error('[PhotoGallery] Failed to update lightbox content:', error);
  }
}

/**
 * Shows the previous photo in the lightbox
 */
function showPreviousPhoto() {
  if (!lightboxState.isOpen) {
    return;
  }

  const newIndex =
    lightboxState.currentIndex === 0
      ? GALLERY_PHOTOS.length - 1
      : lightboxState.currentIndex - 1;

  lightboxState.currentIndex = newIndex;
  updateLightboxContent(newIndex);
}

/**
 * Shows the next photo in the lightbox
 */
function showNextPhoto() {
  if (!lightboxState.isOpen) {
    return;
  }

  const newIndex =
    lightboxState.currentIndex === GALLERY_PHOTOS.length - 1
      ? 0
      : lightboxState.currentIndex + 1;

  lightboxState.currentIndex = newIndex;
  updateLightboxContent(newIndex);
}

/**
 * Handles keyboard navigation in lightbox
 * 
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardNavigation(e) {
  if (!lightboxState.isOpen) {
    return;
  }

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      showPreviousPhoto();
      break;
    case 'ArrowRight':
      e.preventDefault();
      showNextPhoto();
      break;
    default:
      break;
  }
}

/**
 * Handles touch start event for swipe navigation
 * 
 * @param {TouchEvent} e - Touch event
 */
function handleTouchStart(e) {
  if (!lightboxState.isOpen || !e.touches || e.touches.length === 0) {
    return;
  }

  lightboxState.touchStartX = e.touches[0].clientX;
}

/**
 * Handles touch end event for swipe navigation
 * 
 * @param {TouchEvent} e - Touch event
 */
function handleTouchEnd(e) {
  if (!lightboxState.isOpen || !e.changedTouches || e.changedTouches.length === 0) {
    return;
  }

  lightboxState.touchEndX = e.changedTouches[0].clientX;

  const swipeDistance = lightboxState.touchStartX - lightboxState.touchEndX;

  if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
    if (swipeDistance > 0) {
      showNextPhoto();
    } else {
      showPreviousPhoto();
    }
  }
}

/**
 * Initializes the photo gallery component
 * 
 * @returns {Promise<HTMLElement>} Initialized gallery section
 */
async function initializePhotoGallery() {
  try {
    const gallery = await createPhotoGallery();

    console.info('[PhotoGallery] Gallery initialized successfully', {
      photoCount: GALLERY_PHOTOS.length,
      categories: [...new Set(GALLERY_PHOTOS.map((p) => p.category))],
    });

    return gallery;
  } catch (error) {
    console.error('[PhotoGallery] Failed to initialize gallery:', error);
    throw error;
  }
}

export { initializePhotoGallery, createPhotoGallery, GALLERY_PHOTOS };

export default initializePhotoGallery;