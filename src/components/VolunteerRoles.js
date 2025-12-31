import { icons } from '../utils/icons.js';

/**
 * Volunteer roles data structure
 */
const volunteerRoles = [
  {
    id: 'education-tutor',
    title: 'Education Tutor',
    category: 'Education',
    description:
      'Help children with homework, reading, and basic academic skills. Make a direct impact on their educational journey.',
    timeCommitment: 'Weekly',
    hoursPerWeek: '3-5 hours',
    skillsNeeded: [
      'Patience and empathy',
      'Basic teaching skills',
      'English proficiency',
      'Subject knowledge (Math, English, Science)',
    ],
    impact: 'Support 5-10 children per session',
    location: 'Makoko Community Center',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: true,
  },
  {
    id: 'health-assistant',
    title: 'Health & Wellness Assistant',
    category: 'Healthcare',
    description:
      'Assist with health screenings, hygiene education, and basic first aid. Help maintain health records and coordinate medical visits.',
    timeCommitment: 'Monthly',
    hoursPerWeek: '4-6 hours',
    skillsNeeded: [
      'Healthcare background (preferred)',
      'First aid certification',
      'Good communication skills',
      'Compassion and sensitivity',
    ],
    impact: 'Serve 20-30 families monthly',
    location: 'Mobile Health Clinic',
    availability: ['Weekends', 'Flexible Schedule'],
    featured: false,
  },
  {
    id: 'nutrition-coordinator',
    title: 'Nutrition Program Coordinator',
    category: 'Nutrition',
    description:
      'Help prepare and distribute nutritious meals. Educate families about healthy eating habits and food preparation.',
    timeCommitment: 'Weekly',
    hoursPerWeek: '4-6 hours',
    skillsNeeded: [
      'Food handling knowledge',
      'Nutrition awareness',
      'Organizational skills',
      'Team collaboration',
    ],
    impact: 'Feed 50+ children daily',
    location: 'Community Kitchen',
    availability: ['Weekday Mornings', 'Weekends'],
    featured: true,
  },
  {
    id: 'sports-coach',
    title: 'Sports & Recreation Coach',
    category: 'Recreation',
    description:
      'Lead sports activities, games, and physical education sessions. Promote teamwork, discipline, and healthy lifestyles.',
    timeCommitment: 'Weekly',
    hoursPerWeek: '2-4 hours',
    skillsNeeded: [
      'Sports knowledge',
      'Youth engagement skills',
      'Energy and enthusiasm',
      'Safety awareness',
    ],
    impact: 'Engage 15-25 children per session',
    location: 'Community Sports Field',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
  },
  {
    id: 'arts-instructor',
    title: 'Arts & Crafts Instructor',
    category: 'Education',
    description:
      'Teach creative skills through art, music, drama, or crafts. Foster creativity and self-expression in children.',
    timeCommitment: 'Weekly',
    hoursPerWeek: '2-3 hours',
    skillsNeeded: [
      'Artistic or musical talent',
      'Teaching ability',
      'Creativity and patience',
      'Material preparation skills',
    ],
    impact: 'Inspire 10-15 children weekly',
    location: 'Community Center',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
  },
  {
    id: 'mentorship-guide',
    title: 'Youth Mentorship Guide',
    category: 'Mentorship',
    description:
      'Provide one-on-one mentorship to teenagers. Guide them through personal development, career planning, and life skills.',
    timeCommitment: 'Monthly',
    hoursPerWeek: '2-3 hours',
    skillsNeeded: [
      'Life experience',
      'Active listening',
      'Career guidance knowledge',
      'Commitment and reliability',
    ],
    impact: 'Mentor 2-3 youth individually',
    location: 'Flexible (In-person or Virtual)',
    availability: ['Flexible Schedule'],
    featured: true,
  },
  {
    id: 'admin-support',
    title: 'Administrative Support Volunteer',
    category: 'Administration',
    description:
      'Assist with office tasks, data entry, donor communications, and event coordination. Help keep operations running smoothly.',
    timeCommitment: 'Project-Based',
    hoursPerWeek: '3-5 hours',
    skillsNeeded: [
      'Computer literacy',
      'Organizational skills',
      'Attention to detail',
      'Communication skills',
    ],
    impact: 'Support entire organization',
    location: 'Remote or Office',
    availability: ['Flexible Schedule'],
    featured: false,
  },
  {
    id: 'fundraising-coordinator',
    title: 'Fundraising & Events Coordinator',
    category: 'Fundraising',
    description:
      'Help plan and execute fundraising campaigns and community events. Engage donors and raise awareness about our mission.',
    timeCommitment: 'Project-Based',
    hoursPerWeek: '5-8 hours',
    skillsNeeded: [
      'Event planning experience',
      'Marketing knowledge',
      'Networking skills',
      'Creativity and initiative',
    ],
    impact: 'Generate resources for programs',
    location: 'Remote or Office',
    availability: ['Flexible Schedule'],
    featured: false,
  },
  {
    id: 'tech-specialist',
    title: 'Technology & Digital Skills Trainer',
    category: 'Technology',
    description:
      'Teach basic computer skills, internet safety, and digital literacy. Help bridge the digital divide for children and families.',
    timeCommitment: 'Weekly',
    hoursPerWeek: '3-4 hours',
    skillsNeeded: [
      'Computer proficiency',
      'Teaching ability',
      'Patience with beginners',
      'Tech troubleshooting',
    ],
    impact: 'Train 8-12 students per session',
    location: 'Computer Lab',
    availability: ['Weekday Afternoons', 'Weekends'],
    featured: false,
  },
];

/**
 * Filter options for volunteer roles
 */
const filterOptions = {
  categories: [
    'All Categories',
    'Education',
    'Healthcare',
    'Nutrition',
    'Recreation',
    'Mentorship',
    'Administration',
    'Fundraising',
    'Technology',
  ],
  timeCommitments: [
    'All Time Commitments',
    'One-Time',
    'Weekly',
    'Monthly',
    'Project-Based',
  ],
  availability: [
    'All Availability',
    'Weekday Mornings',
    'Weekday Afternoons',
    'Weekends',
    'Flexible Schedule',
  ],
};

/**
 * Current filter state
 */
let currentFilters = {
  category: 'All Categories',
  timeCommitment: 'All Time Commitments',
  availability: 'All Availability',
  searchQuery: '',
};

/**
 * Creates the volunteer roles section with filtering and search
 * @returns {string} HTML string for volunteer roles section
 */
export function createVolunteerRoles() {
  return `
    <div class="volunteer-roles-container">
      <!-- Search and Filter Controls -->
      <div class="mb-8 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            ${icons.search}
          </div>
          <input
            type="text"
            id="volunteer-search"
            placeholder="Search volunteer opportunities..."
            class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            aria-label="Search volunteer opportunities"
          />
        </div>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap gap-3">
          <!-- Category Filter -->
          <div class="relative">
            <button
              id="category-filter-btn"
              class="filter-btn flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ${icons.filter}
              <span id="category-filter-label">All Categories</span>
              ${icons.chevronDown}
            </button>
            <div
              id="category-filter-dropdown"
              class="filter-dropdown hidden absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10"
              role="menu"
            >
              ${filterOptions.categories
                .map(
                  (category) => `
                <button
                  class="filter-option w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                  data-filter-type="category"
                  data-filter-value="${category}"
                  role="menuitem"
                >
                  ${category}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Time Commitment Filter -->
          <div class="relative">
            <button
              id="time-filter-btn"
              class="filter-btn flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ${icons.clock}
              <span id="time-filter-label">All Time Commitments</span>
              ${icons.chevronDown}
            </button>
            <div
              id="time-filter-dropdown"
              class="filter-dropdown hidden absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10"
              role="menu"
            >
              ${filterOptions.timeCommitments
                .map(
                  (commitment) => `
                <button
                  class="filter-option w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                  data-filter-type="timeCommitment"
                  data-filter-value="${commitment}"
                  role="menuitem"
                >
                  ${commitment}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Availability Filter -->
          <div class="relative">
            <button
              id="availability-filter-btn"
              class="filter-btn flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ${icons.calendar}
              <span id="availability-filter-label">All Availability</span>
              ${icons.chevronDown}
            </button>
            <div
              id="availability-filter-dropdown"
              class="filter-dropdown hidden absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10"
              role="menu"
            >
              ${filterOptions.availability
                .map(
                  (avail) => `
                <button
                  class="filter-option w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors"
                  data-filter-type="availability"
                  data-filter-value="${avail}"
                  role="menuitem"
                >
                  ${avail}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Clear Filters Button -->
          <button
            id="clear-filters-btn"
            class="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            ${icons.close}
            <span>Clear Filters</span>
          </button>
        </div>

        <!-- Active Filters Display -->
        <div id="active-filters" class="flex flex-wrap gap-2"></div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p id="results-count" class="text-gray-600 font-medium"></p>
      </div>

      <!-- Volunteer Roles Grid -->
      <div id="volunteer-roles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${renderVolunteerRoles(volunteerRoles)}
      </div>

      <!-- No Results Message -->
      <div id="no-results" class="hidden text-center py-12">
        <div class="text-gray-400 mb-4">
          ${icons.search}
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No opportunities found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
        <button
          id="reset-search-btn"
          class="btn btn-primary"
        >
          Reset Search
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders volunteer role cards
 * @param {Array} roles - Array of volunteer role objects
 * @returns {string} HTML string for role cards
 */
function renderVolunteerRoles(roles) {
  if (roles.length === 0) {
    return '';
  }

  return roles
    .map(
      (role) => `
    <article class="volunteer-role-card card p-6 flex flex-col ${role.featured ? 'featured-role' : ''}">
      ${
        role.featured
          ? `
        <div class="featured-badge mb-3">
          <span class="inline-flex items-center gap-1 px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
            ${icons.star}
            Featured
          </span>
        </div>
      `
          : ''
      }
      
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 mb-2">${role.title}</h3>
          <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
            ${role.category}
          </span>
        </div>
      </div>

      <p class="text-gray-600 mb-4 flex-grow">${role.description}</p>

      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-sm text-gray-700">
          ${icons.clock}
          <span><strong>Time:</strong> ${role.timeCommitment} (${role.hoursPerWeek})</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-gray-700">
          ${icons.location}
          <span><strong>Location:</strong> ${role.location}</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-gray-700">
          ${icons.users}
          <span><strong>Impact:</strong> ${role.impact}</span>
        </div>
      </div>

      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2">Skills Needed:</h4>
        <ul class="space-y-1">
          ${role.skillsNeeded
            .map(
              (skill) => `
            <li class="flex items-start gap-2 text-sm text-gray-600">
              <span class="text-primary-600 mt-0.5">${icons.check}</span>
              <span>${skill}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2">Availability:</h4>
        <div class="flex flex-wrap gap-2">
          ${role.availability
            .map(
              (time) => `
            <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
              ${time}
            </span>
          `
            )
            .join('')}
        </div>
      </div>

      <button
        class="btn btn-primary w-full apply-role-btn"
        data-role-id="${role.id}"
        data-role-title="${role.title}"
      >
        Apply for This Role
        ${icons.arrowRight}
      </button>
    </article>
  `
    )
    .join('');
}

/**
 * Filters volunteer roles based on current filter state
 * @returns {Array} Filtered array of volunteer roles
 */
function filterRoles() {
  return volunteerRoles.filter((role) => {
    const matchesCategory =
      currentFilters.category === 'All Categories' ||
      role.category === currentFilters.category;

    const matchesTimeCommitment =
      currentFilters.timeCommitment === 'All Time Commitments' ||
      role.timeCommitment === currentFilters.timeCommitment;

    const matchesAvailability =
      currentFilters.availability === 'All Availability' ||
      role.availability.includes(currentFilters.availability);

    const matchesSearch =
      currentFilters.searchQuery === '' ||
      role.title.toLowerCase().includes(currentFilters.searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(currentFilters.searchQuery.toLowerCase()) ||
      role.category.toLowerCase().includes(currentFilters.searchQuery.toLowerCase()) ||
      role.skillsNeeded.some((skill) =>
        skill.toLowerCase().includes(currentFilters.searchQuery.toLowerCase())
      );

    return matchesCategory && matchesTimeCommitment && matchesAvailability && matchesSearch;
  });
}

/**
 * Updates the volunteer roles display based on current filters
 */
function updateRolesDisplay() {
  const filteredRoles = filterRoles();
  const grid = document.getElementById('volunteer-roles-grid');
  const noResults = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');

  if (filteredRoles.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    noResults.classList.remove('hidden');
    resultsCount.textContent = 'No opportunities found';
  } else {
    grid.innerHTML = renderVolunteerRoles(filteredRoles);
    grid.classList.remove('hidden');
    noResults.classList.add('hidden');
    resultsCount.textContent = `Showing ${filteredRoles.length} ${filteredRoles.length === 1 ? 'opportunity' : 'opportunities'}`;

    attachApplyButtonListeners();
  }

  updateActiveFiltersDisplay();
}

/**
 * Updates the active filters display
 */
function updateActiveFiltersDisplay() {
  const activeFiltersContainer = document.getElementById('active-filters');
  const activeFilters = [];

  if (currentFilters.category !== 'All Categories') {
    activeFilters.push({
      type: 'category',
      label: currentFilters.category,
    });
  }

  if (currentFilters.timeCommitment !== 'All Time Commitments') {
    activeFilters.push({
      type: 'timeCommitment',
      label: currentFilters.timeCommitment,
    });
  }

  if (currentFilters.availability !== 'All Availability') {
    activeFilters.push({
      type: 'availability',
      label: currentFilters.availability,
    });
  }

  if (currentFilters.searchQuery !== '') {
    activeFilters.push({
      type: 'search',
      label: `Search: "${currentFilters.searchQuery}"`,
    });
  }

  if (activeFilters.length === 0) {
    activeFiltersContainer.innerHTML = '';
    return;
  }

  activeFiltersContainer.innerHTML = activeFilters
    .map(
      (filter) => `
    <span class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
      ${filter.label}
      <button
        class="remove-filter-btn hover:text-primary-900 transition-colors"
        data-filter-type="${filter.type}"
        aria-label="Remove ${filter.label} filter"
      >
        ${icons.close}
      </button>
    </span>
  `
    )
    .join('');

  attachRemoveFilterListeners();
}

/**
 * Attaches event listeners to apply buttons
 */
function attachApplyButtonListeners() {
  const applyButtons = document.querySelectorAll('.apply-role-btn');
  applyButtons.forEach((button) => {
    button.addEventListener('click', handleApplyClick);
  });
}

/**
 * Handles apply button click
 * @param {Event} event - Click event
 */
function handleApplyClick(event) {
  const button = event.currentTarget;
  const roleId = button.dataset.roleId;
  const roleTitle = button.dataset.roleTitle;

  const applicationForm = document.getElementById('volunteer-application-form');
  if (applicationForm) {
    const roleSelect = applicationForm.querySelector('#volunteer-role');
    if (roleSelect) {
      roleSelect.value = roleTitle;
    }

    applicationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      const firstInput = applicationForm.querySelector('input, select, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }, 500);
  }
}

/**
 * Attaches event listeners to remove filter buttons
 */
function attachRemoveFilterListeners() {
  const removeButtons = document.querySelectorAll('.remove-filter-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', handleRemoveFilter);
  });
}

/**
 * Handles remove filter button click
 * @param {Event} event - Click event
 */
function handleRemoveFilter(event) {
  event.stopPropagation();
  const filterType = event.currentTarget.dataset.filterType;

  if (filterType === 'category') {
    currentFilters.category = 'All Categories';
    document.getElementById('category-filter-label').textContent = 'All Categories';
  } else if (filterType === 'timeCommitment') {
    currentFilters.timeCommitment = 'All Time Commitments';
    document.getElementById('time-filter-label').textContent = 'All Time Commitments';
  } else if (filterType === 'availability') {
    currentFilters.availability = 'All Availability';
    document.getElementById('availability-filter-label').textContent = 'All Availability';
  } else if (filterType === 'search') {
    currentFilters.searchQuery = '';
    document.getElementById('volunteer-search').value = '';
  }

  updateRolesDisplay();
}

/**
 * Initializes volunteer roles functionality
 */
export function initVolunteerRoles() {
  const searchInput = document.getElementById('volunteer-search');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (event) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilters.searchQuery = event.target.value.trim();
        updateRolesDisplay();
      }, 300);
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const dropdownId = button.id.replace('-btn', '-dropdown');
      const dropdown = document.getElementById(dropdownId);

      document.querySelectorAll('.filter-dropdown').forEach((dd) => {
        if (dd.id !== dropdownId) {
          dd.classList.add('hidden');
          const btn = document.getElementById(dd.id.replace('-dropdown', '-btn'));
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      const isHidden = dropdown.classList.contains('hidden');
      dropdown.classList.toggle('hidden');
      button.setAttribute('aria-expanded', !isHidden);
    });
  });

  const filterOptions = document.querySelectorAll('.filter-option');
  filterOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      const filterType = event.currentTarget.dataset.filterType;
      const filterValue = event.currentTarget.dataset.filterValue;

      currentFilters[filterType] = filterValue;

      const labelId = `${filterType}-filter-label`;
      const label = document.getElementById(labelId);
      if (label) {
        label.textContent = filterValue;
      }

      const dropdown = event.currentTarget.closest('.filter-dropdown');
      dropdown.classList.add('hidden');

      const button = document.getElementById(dropdown.id.replace('-dropdown', '-btn'));
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }

      updateRolesDisplay();
    });
  });

  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      currentFilters = {
        category: 'All Categories',
        timeCommitment: 'All Time Commitments',
        availability: 'All Availability',
        searchQuery: '',
      };

      document.getElementById('category-filter-label').textContent = 'All Categories';
      document.getElementById('time-filter-label').textContent = 'All Time Commitments';
      document.getElementById('availability-filter-label').textContent = 'All Availability';
      document.getElementById('volunteer-search').value = '';

      updateRolesDisplay();
    });
  }

  const resetSearchBtn = document.getElementById('reset-search-btn');
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      currentFilters = {
        category: 'All Categories',
        timeCommitment: 'All Time Commitments',
        availability: 'All Availability',
        searchQuery: '',
      };

      document.getElementById('category-filter-label').textContent = 'All Categories';
      document.getElementById('time-filter-label').textContent = 'All Time Commitments';
      document.getElementById('availability-filter-label').textContent = 'All Availability';
      document.getElementById('volunteer-search').value = '';

      updateRolesDisplay();
    });
  }

  document.addEventListener('click', (event) => {
    const isFilterButton = event.target.closest('.filter-btn');
    const isDropdown = event.target.closest('.filter-dropdown');

    if (!isFilterButton && !isDropdown) {
      document.querySelectorAll('.filter-dropdown').forEach((dropdown) => {
        dropdown.classList.add('hidden');
        const button = document.getElementById(dropdown.id.replace('-dropdown', '-btn'));
        if (button) {
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  attachApplyButtonListeners();
  updateRolesDisplay();
}