/**
 * Lightbox Component for Photo Gallery
 * 
 * Provides accessible, keyboard-navigable lightbox functionality with zoom,
 * touch controls, and proper focus management for photo galleries.
 * 
 * @module utils/lightbox
 * @version 1.0.0
 */

/**
 * Lightbox class for displaying images in an overlay with navigation
 * Implements accessibility features, keyboard navigation, and mobile touch controls
 */
class Lightbox {
  /**
   * Creates a new Lightbox instance
   * 
   * @param {Object} options - Configuration options
   * @param {string} options.gallerySelector - CSS selector for gallery container
   * @param {string} options.imageSelector - CSS selector for gallery images
   * @param {boolean} options.enableZoom - Enable zoom functionality (default: true)
   * @param {boolean} options.enableKeyboard - Enable keyboard navigation (default: true)
   * @param {boolean} options.enableTouch - Enable touch/swipe controls (default: true)
   * @param {number} options.animationDuration - Animation duration in ms (default: 300)
   * @param {Function} options.onOpen - Callback when lightbox opens
   * @param {Function} options.onClose - Callback when lightbox closes
   * @param {Function} options.onChange - Callback when image changes
   */
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      gallerySelector: options.gallerySelector || '[data-gallery]',
      imageSelector: options.imageSelector || '[data-lightbox-image]',
      enableZoom: options.enableZoom !== false,
      enableKeyboard: options.enableKeyboard !== false,
      enableTouch: options.enableTouch !== false,
      animationDuration: options.animationDuration || 300,
      onOpen: options.onOpen || null,
      onClose: options.onClose || null,
      onChange: options.onChange || null,
    };

    // State management
    this.state = {
      isOpen: false,
      currentIndex: 0,
      images: [],
      isZoomed: false,
      zoomLevel: 1,
      isDragging: false,
      startX: 0,
      startY: 0,
      translateX: 0,
      translateY: 0,
    };

    // DOM references
    this.elements = {
      overlay: null,
      container: null,
      image: null,
      prevButton: null,
      nextButton: null,
      closeButton: null,
      counter: null,
      zoomInButton: null,
      zoomOutButton: null,
    };

    // Touch handling
    this.touch = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      threshold: 50,
    };

    // Store previous focus for restoration
    this.previousFocus = null;

    // Bind methods to maintain context
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  /**
   * Initialize the lightbox
   * Creates DOM structure and sets up event listeners
   * 
   * @returns {Lightbox} The lightbox instance for chaining
   */
  init() {
    try {
      this.logInfo('Initializing lightbox');

      // Create lightbox DOM structure
      this.createLightboxDOM();

      // Set up gallery click handlers
      this.setupGalleryListeners();

      // Set up keyboard navigation
      if (this.config.enableKeyboard) {
        document.addEventListener('keydown', this.handleKeydown);
      }

      this.logInfo('Lightbox initialized successfully');
      return this;
    } catch (error) {
      this.logError('Failed to initialize lightbox', error);
      throw error;
    }
  }

  /**
   * Create the lightbox DOM structure
   * Builds all necessary elements with proper ARIA attributes
   */
  createLightboxDOM() {
    // Create overlay
    this.elements.overlay = document.createElement('div');
    this.elements.overlay.className = 'lightbox-overlay fixed inset-0 bg-black bg-opacity-90 z-50 hidden opacity-0 transition-opacity';
    this.elements.overlay.setAttribute('role', 'dialog');
    this.elements.overlay.setAttribute('aria-modal', 'true');
    this.elements.overlay.setAttribute('aria-label', 'Image lightbox');
    this.elements.overlay.addEventListener('click', this.handleOverlayClick);

    // Create container
    this.elements.container = document.createElement('div');
    this.elements.container.className = 'lightbox-container relative w-full h-full flex items-center justify-center p-4';

    // Create image wrapper
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'lightbox-image-wrapper relative max-w-full max-h-full overflow-hidden';

    // Create image element
    this.elements.image = document.createElement('img');
    this.elements.image.className = 'lightbox-image max-w-full max-h-full object-contain transition-transform';
    this.elements.image.setAttribute('alt', '');
    this.elements.image.addEventListener('load', this.handleImageLoad);
    this.elements.image.addEventListener('error', this.handleImageError);

    // Add zoom and drag support
    if (this.config.enableZoom) {
      this.elements.image.style.cursor = 'zoom-in';
      this.elements.image.addEventListener('wheel', this.handleWheel, { passive: false });
      this.elements.image.addEventListener('mousedown', this.handleMouseDown);
    }

    // Add touch support
    if (this.config.enableTouch) {
      this.elements.image.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      this.elements.image.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      this.elements.image.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    }

    imageWrapper.appendChild(this.elements.image);

    // Create controls container
    const controls = document.createElement('div');
    controls.className = 'lightbox-controls absolute inset-0 pointer-events-none';

    // Create close button
    this.elements.closeButton = this.createButton('close', 'Close lightbox', 'top-4 right-4', '×');
    this.elements.closeButton.addEventListener('click', this.handleClose);

    // Create previous button
    this.elements.prevButton = this.createButton('prev', 'Previous image', 'left-4 top-1/2 -translate-y-1/2', '‹');
    this.elements.prevButton.addEventListener('click', this.handlePrevious);

    // Create next button
    this.elements.nextButton = this.createButton('next', 'Next image', 'right-4 top-1/2 -translate-y-1/2', '›');
    this.elements.nextButton.addEventListener('click', this.handleNext);

    // Create counter
    this.elements.counter = document.createElement('div');
    this.elements.counter.className = 'lightbox-counter absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded pointer-events-auto';
    this.elements.counter.setAttribute('aria-live', 'polite');
    this.elements.counter.setAttribute('aria-atomic', 'true');

    // Create zoom controls if enabled
    if (this.config.enableZoom) {
      const zoomControls = document.createElement('div');
      zoomControls.className = 'lightbox-zoom-controls absolute top-4 left-4 flex flex-col gap-2';

      this.elements.zoomInButton = this.createButton('zoom-in', 'Zoom in', '', '+');
      this.elements.zoomInButton.addEventListener('click', this.handleZoomIn);

      this.elements.zoomOutButton = this.createButton('zoom-out', 'Zoom out', '', '−');
      this.elements.zoomOutButton.addEventListener('click', this.handleZoomOut);

      zoomControls.appendChild(this.elements.zoomInButton);
      zoomControls.appendChild(this.elements.zoomOutButton);
      controls.appendChild(zoomControls);
    }

    // Assemble controls
    controls.appendChild(this.elements.closeButton);
    controls.appendChild(this.elements.prevButton);
    controls.appendChild(this.elements.nextButton);
    controls.appendChild(this.elements.counter);

    // Assemble container
    this.elements.container.appendChild(imageWrapper);
    this.elements.container.appendChild(controls);

    // Assemble overlay
    this.elements.overlay.appendChild(this.elements.container);

    // Add to document
    document.body.appendChild(this.elements.overlay);
  }

  /**
   * Create a button element with consistent styling
   * 
   * @param {string} type - Button type identifier
   * @param {string} ariaLabel - Accessible label
   * @param {string} positionClasses - Tailwind position classes
   * @param {string} content - Button content
   * @returns {HTMLButtonElement} The created button
   */
  createButton(type, ariaLabel, positionClasses, content) {
    const button = document.createElement('button');
    button.className = `lightbox-button lightbox-button-${type} absolute ${positionClasses} bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', ariaLabel);
    button.textContent = content;
    return button;
  }

  /**
   * Set up click listeners on gallery images
   */
  setupGalleryListeners() {
    const galleries = document.querySelectorAll(this.config.gallerySelector);

    galleries.forEach((gallery) => {
      const images = gallery.querySelectorAll(this.config.imageSelector);

      images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Open image ${index + 1} in lightbox`);

        img.addEventListener('click', () => {
          this.open(gallery, index);
        });

        img.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.open(gallery, index);
          }
        });
      });
    });
  }

  /**
   * Open the lightbox with specified gallery and image index
   * 
   * @param {HTMLElement} gallery - Gallery container element
   * @param {number} index - Index of image to display
   */
  open(gallery, index) {
    try {
      // Store images from gallery
      const images = Array.from(gallery.querySelectorAll(this.config.imageSelector));
      this.state.images = images.map((img) => ({
        src: img.dataset.lightboxSrc || img.src,
        alt: img.alt || '',
        caption: img.dataset.lightboxCaption || '',
      }));

      if (this.state.images.length === 0) {
        this.logError('No images found in gallery');
        return;
      }

      // Store previous focus
      this.previousFocus = document.activeElement;

      // Set initial state
      this.state.currentIndex = Math.max(0, Math.min(index, this.state.images.length - 1));
      this.state.isOpen = true;
      this.state.isZoomed = false;
      this.state.zoomLevel = 1;

      // Show overlay
      this.elements.overlay.classList.remove('hidden');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Load and display image
      this.loadImage(this.state.currentIndex);

      // Trigger animation
      requestAnimationFrame(() => {
        this.elements.overlay.classList.remove('opacity-0');
      });

      // Update navigation
      this.updateNavigation();

      // Focus close button for keyboard navigation
      setTimeout(() => {
        this.elements.closeButton.focus();
      }, this.config.animationDuration);

      // Call onOpen callback
      if (typeof this.config.onOpen === 'function') {
        this.config.onOpen(this.state.currentIndex);
      }

      this.logInfo('Lightbox opened', { index: this.state.currentIndex });
    } catch (error) {
      this.logError('Failed to open lightbox', error);
    }
  }

  /**
   * Close the lightbox
   */
  close() {
    try {
      if (!this.state.isOpen) {
        return;
      }

      // Trigger closing animation
      this.elements.overlay.classList.add('opacity-0');

      setTimeout(() => {
        this.elements.overlay.classList.add('hidden');
        this.state.isOpen = false;

        // Restore body scroll
        document.body.style.overflow = '';

        // Restore previous focus
        if (this.previousFocus && this.previousFocus.focus) {
          this.previousFocus.focus();
        }

        // Reset zoom
        this.resetZoom();

        // Call onClose callback
        if (typeof this.config.onClose === 'function') {
          this.config.onClose();
        }

        this.logInfo('Lightbox closed');
      }, this.config.animationDuration);
    } catch (error) {
      this.logError('Failed to close lightbox', error);
    }
  }

  /**
   * Load and display image at specified index
   * 
   * @param {number} index - Image index to load
   */
  loadImage(index) {
    if (index < 0 || index >= this.state.images.length) {
      this.logError('Invalid image index', { index, total: this.state.images.length });
      return;
    }

    const imageData = this.state.images[index];

    // Reset zoom before loading new image
    this.resetZoom();

    // Set loading state
    this.elements.image.style.opacity = '0';

    // Load image
    this.elements.image.src = imageData.src;
    this.elements.image.alt = imageData.alt;

    // Update counter
    this.updateCounter();
  }

  /**
   * Handle image load event
   */
  handleImageLoad() {
    // Fade in image
    this.elements.image.style.opacity = '1';
    this.logInfo('Image loaded successfully', { index: this.state.currentIndex });
  }

  /**
   * Handle image load error
   * 
   * @param {Event} event - Error event
   */
  handleImageError(event) {
    this.logError('Failed to load image', {
      src: event.target.src,
      index: this.state.currentIndex,
    });

    // Show error message
    this.elements.image.alt = 'Failed to load image';
    this.elements.image.style.opacity = '1';
  }

  /**
   * Navigate to previous image
   */
  previous() {
    if (this.state.images.length <= 1) {
      return;
    }

    this.state.currentIndex = (this.state.currentIndex - 1 + this.state.images.length) % this.state.images.length;
    this.loadImage(this.state.currentIndex);
    this.updateNavigation();

    if (typeof this.config.onChange === 'function') {
      this.config.onChange(this.state.currentIndex);
    }

    this.logInfo('Navigated to previous image', { index: this.state.currentIndex });
  }

  /**
   * Navigate to next image
   */
  next() {
    if (this.state.images.length <= 1) {
      return;
    }

    this.state.currentIndex = (this.state.currentIndex + 1) % this.state.images.length;
    this.loadImage(this.state.currentIndex);
    this.updateNavigation();

    if (typeof this.config.onChange === 'function') {
      this.config.onChange(this.state.currentIndex);
    }

    this.logInfo('Navigated to next image', { index: this.state.currentIndex });
  }

  /**
   * Update navigation button states
   */
  updateNavigation() {
    const hasPrevious = this.state.images.length > 1;
    const hasNext = this.state.images.length > 1;

    this.elements.prevButton.style.display = hasPrevious ? 'flex' : 'none';
    this.elements.nextButton.style.display = hasNext ? 'flex' : 'none';
  }

  /**
   * Update image counter display
   */
  updateCounter() {
    this.elements.counter.textContent = `${this.state.currentIndex + 1} / ${this.state.images.length}`;
  }

  /**
   * Zoom in on the image
   */
  zoomIn() {
    if (!this.config.enableZoom) {
      return;
    }

    this.state.zoomLevel = Math.min(this.state.zoomLevel + 0.5, 3);
    this.applyZoom();
    this.logInfo('Zoomed in', { zoomLevel: this.state.zoomLevel });
  }

  /**
   * Zoom out on the image
   */
  zoomOut() {
    if (!this.config.enableZoom) {
      return;
    }

    this.state.zoomLevel = Math.max(this.state.zoomLevel - 0.5, 1);
    this.applyZoom();
    this.logInfo('Zoomed out', { zoomLevel: this.state.zoomLevel });
  }

  /**
   * Apply current zoom level to image
   */
  applyZoom() {
    this.state.isZoomed = this.state.zoomLevel > 1;
    this.elements.image.style.transform = `scale(${this.state.zoomLevel}) translate(${this.state.translateX}px, ${this.state.translateY}px)`;
    this.elements.image.style.cursor = this.state.isZoomed ? 'grab' : 'zoom-in';

    // Update zoom button states
    if (this.elements.zoomInButton) {
      this.elements.zoomInButton.disabled = this.state.zoomLevel >= 3;
    }
    if (this.elements.zoomOutButton) {
      this.elements.zoomOutButton.disabled = this.state.zoomLevel <= 1;
    }
  }

  /**
   * Reset zoom to default
   */
  resetZoom() {
    this.state.zoomLevel = 1;
    this.state.isZoomed = false;
    this.state.translateX = 0;
    this.state.translateY = 0;
    this.applyZoom();
  }

  /**
   * Handle keyboard navigation
   * 
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeydown(event) {
    if (!this.state.isOpen) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previous();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.zoomIn();
        break;
      case '-':
      case '_':
        event.preventDefault();
        this.zoomOut();
        break;
      default:
        break;
    }
  }

  /**
   * Handle previous button click
   * 
   * @param {Event} event - Click event
   */
  handlePrevious(event) {
    event.stopPropagation();
    this.previous();
  }

  /**
   * Handle next button click
   * 
   * @param {Event} event - Click event
   */
  handleNext(event) {
    event.stopPropagation();
    this.next();
  }

  /**
   * Handle close button click
   * 
   * @param {Event} event - Click event
   */
  handleClose(event) {
    event.stopPropagation();
    this.close();
  }

  /**
   * Handle overlay click (close on background click)
   * 
   * @param {Event} event - Click event
   */
  handleOverlayClick(event) {
    if (event.target === this.elements.overlay) {
      this.close();
    }
  }

  /**
   * Handle zoom in button click
   * 
   * @param {Event} event - Click event
   */
  handleZoomIn(event) {
    event.stopPropagation();
    this.zoomIn();
  }

  /**
   * Handle zoom out button click
   * 
   * @param {Event} event - Click event
   */
  handleZoomOut(event) {
    event.stopPropagation();
    this.zoomOut();
  }

  /**
   * Handle mouse wheel for zoom
   * 
   * @param {WheelEvent} event - Wheel event
   */
  handleWheel(event) {
    if (!this.config.enableZoom || !event.ctrlKey) {
      return;
    }

    event.preventDefault();

    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  /**
   * Handle mouse down for drag
   * 
   * @param {MouseEvent} event - Mouse event
   */
  handleMouseDown(event) {
    if (!this.state.isZoomed) {
      return;
    }

    event.preventDefault();
    this.state.isDragging = true;
    this.state.startX = event.clientX - this.state.translateX;
    this.state.startY = event.clientY - this.state.translateY;
    this.elements.image.style.cursor = 'grabbing';

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle mouse move for drag
   * 
   * @param {MouseEvent} event - Mouse event
   */
  handleMouseMove(event) {
    if (!this.state.isDragging) {
      return;
    }

    event.preventDefault();
    this.state.translateX = event.clientX - this.state.startX;
    this.state.translateY = event.clientY - this.state.startY;
    this.applyZoom();
  }

  /**
   * Handle mouse up to end drag
   */
  handleMouseUp() {
    this.state.isDragging = false;
    this.elements.image.style.cursor = 'grab';

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle touch start for swipe navigation
   * 
   * @param {TouchEvent} event - Touch event
   */
  handleTouchStart(event) {
    if (event.touches.length !== 1) {
      return;
    }

    this.touch.startX = event.touches[0].clientX;
    this.touch.startY = event.touches[0].clientY;
  }

  /**
   * Handle touch move for swipe navigation
   * 
   * @param {TouchEvent} event - Touch event
   */
  handleTouchMove(event) {
    if (event.touches.length !== 1 || this.state.isZoomed) {
      return;
    }

    this.touch.endX = event.touches[0].clientX;
    this.touch.endY = event.touches[0].clientY;
  }

  /**
   * Handle touch end to complete swipe
   */
  handleTouchEnd() {
    const deltaX = this.touch.endX - this.touch.startX;
    const deltaY = Math.abs(this.touch.endY - this.touch.startY);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(deltaX) > this.touch.threshold && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        this.previous();
      } else {
        this.next();
      }
    }

    // Reset touch state
    this.touch.startX = 0;
    this.touch.startY = 0;
    this.touch.endX = 0;
    this.touch.endY = 0;
  }

  /**
   * Clean up resources and event listeners
   */
  destroy() {
    try {
      // Remove keyboard listener
      document.removeEventListener('keydown', this.handleKeydown);

      // Remove mouse listeners
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);

      // Remove overlay from DOM
      if (this.elements.overlay && this.elements.overlay.parentNode) {
        this.elements.overlay.parentNode.removeChild(this.elements.overlay);
      }

      // Restore body scroll if needed
      if (this.state.isOpen) {
        document.body.style.overflow = '';
      }

      // Clear references
      this.elements = {};
      this.state.images = [];

      this.logInfo('Lightbox destroyed');
    } catch (error) {
      this.logError('Error during lightbox cleanup', error);
    }
  }

  /**
   * Log informational message
   * 
   * @param {string} message - Message to log
   * @param {*} data - Additional data
   */
  logInfo(message, data) {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Lightbox] ${message}`, data || '');
    }
  }

  /**
   * Log error message with context
   * 
   * @param {string} message - Error message
   * @param {Error|Object} error - Error object or context
   */
  logError(message, error) {
    const errorContext = {
      message,
      timestamp: new Date().toISOString(),
      state: { ...this.state },
    };

    if (error instanceof Error) {
      errorContext.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error) {
      errorContext.details = error;
    }

    console.error('[Lightbox Error]', errorContext);
  }
}

/**
 * Initialize lightbox with default configuration
 * 
 * @param {Object} options - Configuration options
 * @returns {Lightbox} Initialized lightbox instance
 */
export function initializeLightbox(options = {}) {
  const lightbox = new Lightbox(options);
  lightbox.init();
  return lightbox;
}

/**
 * Export Lightbox class as default
 */
export default Lightbox;