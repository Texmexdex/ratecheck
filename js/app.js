/**
 * RateCheck - Main Application Controller
 * State management, routing, and UI orchestration
 */

// ============================================
// APP STATE
// ============================================

const state = {
  search: {
    zip: '',
    query: '',
    submitted: false
  },
  results: {
    raw: null,
    processed: null,
    selectedIndex: 0,
    loading: false,
    error: null
  },
  ui: {
    view: 'search', // 'search' | 'results'
    showAlternatives: false
  }
};

// ============================================
// DOM REFERENCES
// ============================================

function getEl(id) {
  return document.getElementById(id);
}

function getEls(sel) {
  return document.querySelectorAll(sel);
}

// ============================================
// SEARCH HANDLING
// ============================================

function handleSearchSubmit(e) {
  if (e) e.preventDefault();

  const zipInput = getEl('zip-input');
  const queryInput = getEl('query-input');

  const zip = (zipInput?.value || '').trim().replace(/[^0-9]/g, '').substring(0, 5);
  const query = (queryInput?.value || '').trim();

  if (!query) {
    showError('Please describe the service you\'re looking for.');
    return;
  }

  state.search.zip = zip;
  state.search.query = query;
  state.results.loading = true;
  state.results.error = null;

  render();

  // Run search asynchronously (simulate processing delay for UX)
  setTimeout(() => {
    runSearch(query, zip);
  }, 300);
}

function runSearch(query, zip) {
  try {
    const parsed = parseInput(query, 5);
    const params = extractParams(query);

    const processed = parsed.matches.map((match, idx) => {
      return buildResult(match, zip, params);
    });

    state.results.raw = parsed;
    state.results.processed = processed;
    state.results.selectedIndex = 0;
    state.results.loading = false;
    state.results.error = null;
    state.search.submitted = true;

    renderResults();

  } catch (err) {
    console.error('Search error:', err);
    state.results.error = 'Something went wrong processing your request. Please try again.';
    state.results.loading = false;
    render();
  }
}

function selectResult(idx) {
  state.results.selectedIndex = idx;
  renderResults();
}

// ============================================
// RENDERING
// ============================================

function render() {
  const searchSection = getEl('search-section');
  const loadingEl = getEl('loading-state');
  const resultsEl = getEl('results-section');

  if (state.results.loading) {
    searchSection?.classList.add('searching');
    loadingEl?.classList.add('visible');
    resultsEl?.classList.remove('visible');
    return;
  }

  searchSection?.classList.remove('searching');
  loadingEl?.classList.remove('visible');

  if (state.results.error) {
    renderError();
    return;
  }

  if (state.search.submitted && state.results.processed?.length > 0) {
    resultsEl?.classList.add('visible');
  }
}

function renderResults() {
  loadingEl?.classList.remove('visible');
  const resultsEl = getEl('results-section');
  resultsEl?.classList.add('visible');

  const resultsContainer = getEl('results-container');
  if (!resultsContainer || !state.results.processed?.length) return;

  const top = state.results.processed[state.results.selectedIndex];
  const alternatives = state.results.processed.slice(1, 4);

  resultsContainer.innerHTML = renderResultCard(top) + renderAlternatives(alternatives);
}

function renderResultCard(result) {
  const confidenceLabel = {
    high: 'High Confidence',
    medium: 'Medium Confidence',
    low: 'Low Confidence'
  };

  const confidenceIcon = {
    high: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    low: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
  };

  return `
    <div class="result-card result-card-primary">
      <!-- Header -->
      <div class="result-header">
        <div class="result-trade-badge" style="background: ${result.tradeColor}22; color: ${result.tradeColor};">
          ${result.tradeIcon}
          ${result.tradeName}
        </div>
        <div class="result-title-group">
          <h2 class="result-service-name">${result.serviceName}</h2>
          <p class="result-match-text">
            Matched from: "<strong>${state.search.query}</strong>"
            ${result.confidence === 'high' ? '' : `<br>${confidenceIcon[result.confidence] || ''} ${confidenceLabel[result.confidence] || ''} — try being more specific for better results`}
          </p>
        </div>
        <div class="result-confidence ${result.confidence}">
          ${confidenceIcon[result.confidence] || ''}
          ${confidenceLabel[result.confidence] || ''}
        </div>
      </div>

      <!-- Pricing -->
      <div class="pricing-section">
        <div class="pricing-main">
          <div class="pricing-range">
            <div class="pricing-low">${result.pricing.formattedLow} <span>low</span></div>
            <div class="pricing-separator">—</div>
            <div class="pricing-high">${result.pricing.formattedHigh} <span>high</span></div>
          </div>
          <div class="pricing-average">
            Average: <strong>${result.pricing.formattedAvg}</strong>
          </div>
          <div class="pricing-unit">per ${result.pricing.unit}</div>
        </div>

        <div class="pricing-region">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Based on ${result.pricing.region}
          ${result.pricing.costIndex !== 100 ? `(Cost Index: ${result.pricing.costIndex})` : ''}
        </div>
      </div>

      <!-- Explanations -->
      <div class="explanations-section">
        <ul class="explanations-list">
          ${result.explanations.map(exp => `
            <li class="explanation-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              ${exp}
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="#" class="cta-primary" onclick="handleCTA('fieldforge')">
          <div class="cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <div class="cta-content">
            <div class="cta-title">Build Your Quote in FieldForge</div>
            <div class="cta-subtitle">Create a professional invoice or quote in minutes</div>
          </div>
          <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <a href="#" class="cta-secondary" onclick="handleCTA('compare')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          Compare with other services in ${result.pricing.region.split(',')[0]}
        </a>
      </div>

      <!-- Data Sources -->
      <div class="data-sources">
        <div class="data-sources-label">Data Sources</div>
        <div class="data-sources-list">
          ${result.dataSources.join(' • ')}
        </div>
      </div>
    </div>
  `;
}

function renderAlternatives(alternatives) {
  if (!alternatives || alternatives.length === 0) return '';

  return `
    <div class="alternatives-section">
      <div class="alternatives-title">Other matches for your search</div>
      <div class="alternatives-grid">
        ${alternatives.map((alt, idx) => `
          <a href="#" class="alternative-card" onclick="selectResult(${idx + 1}); return false;">
            <span class="alt-trade">${alt.tradeIcon}</span>
            <div class="alt-info">
              <div class="alt-name">${alt.serviceName}</div>
              <div class="alt-range">${alt.pricing.formattedLow} – ${alt.pricing.formattedHigh} ${alt.pricing.unit}</div>
            </div>
            <div class="alt-confidence ${alt.confidence}">${alt.confidence}</div>
            <svg class="alt-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function renderError() {
  const resultsContainer = getEl('results-container');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = `
    <div class="error-state">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div class="error-title">Search Error</div>
      <div class="error-text">${state.results.error}</div>
    </div>
  `;
}

function showError(message) {
  const zipInput = getEl('zip-input');
  const queryInput = getEl('query-input');

  if (queryInput) {
    queryInput.style.borderColor = 'var(--error)';
    queryInput.focus();
  }

  // Show toast-like message
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;top:100px;left:50%;transform:translateX(-50%);background:var(--error);color:white;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:1000;animation:fadeIn 0.2s ease';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// CTA HANDLERS
// ============================================

function handleCTA(action) {
  if (action === 'fieldforge') {
    // Link to FieldForge
    window.open('https://github.com/Texmexdex/fieldforge-pwa', '_blank');
  } else if (action === 'compare') {
    // Show comparison modal - for now just search for other services
    const query = state.search.query;
    const zip = state.search.zip;
    runSearch(query, zip); // Re-run to show alternatives
  }
}

// ============================================
// EXAMPLE SEARCHES
// ============================================

const EXAMPLE_SEARCHES = [
  'remove a 40 foot pine tree in my backyard',
  'replace 2-story asphalt shingle roof',
  'fix a leaking kitchen faucet',
  'install central AC in a 2000 sqft house',
  'paint interior of a 3 bedroom house',
  'install hardwood floor in living room',
  'replace garbage disposal',
  'clean gutters on a 2-story house'
];

function renderExampleSearches() {
  const container = getEl('example-chips');
  if (!container) return;

  container.innerHTML = EXAMPLE_SEARCHES.map(query => `
    <button class="example-chip" onclick="fillExample('${query.replace(/'/g, "\\'")}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      ${query}
    </button>
  `).join('');
}

function fillExample(query) {
  const queryInput = getEl('query-input');
  if (queryInput) {
    queryInput.value = query;
    queryInput.focus();
  }
}

// ============================================
// ZIP AUTOFILL
// ============================================

function handleZipInput(e) {
  const zip = e.target.value.replace(/[^0-9]/g, '').substring(0, 5);
  e.target.value = zip;

  if (zip.length === 5) {
    // Show regional hint
    const hint = getEl('zip-hint');
    if (hint) {
      const data = getRegionalData(zip);
      hint.innerHTML = `<span style="opacity:0.7">${data.city}, ${data.state}</span>`;
    }
  } else {
    const hint = getEl('zip-hint');
    if (hint) {
      hint.innerHTML = '';
    }
  }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function handleKeydown(e) {
  if (!state.results.processed?.length) return;

  if (e.key === 'ArrowDown' || e.key === 'j') {
    e.preventDefault();
    state.results.selectedIndex = Math.min(
      state.results.selectedIndex + 1,
      state.results.processed.length - 1
    );
    renderResults();
    scrollResults();
  } else if (e.key === 'ArrowUp' || e.key === 'k') {
    e.preventDefault();
    state.results.selectedIndex = Math.max(state.results.selectedIndex - 1, 0);
    renderResults();
    scrollResults();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    handleSearchSubmit();
  }
}

function scrollResults() {
  const resultsEl = getEl('results-section');
  if (resultsEl) {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============================================
// INIT
// ============================================

function init() {
  // Render example searches
  renderExampleSearches();

  // Form submission
  const form = getEl('search-form');
  form?.addEventListener('submit', handleSearchSubmit);

  // ZIP input formatting
  const zipInput = getEl('zip-input');
  zipInput?.addEventListener('input', handleZipInput);

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);

  // Pre-fill ZIP from URL if present
  const params = new URLSearchParams(window.location.search);
  const zipParam = params.get('zip');
  const queryParam = params.get('q');

  if (zipParam && zipParam.length === 5) {
    if (zipInput) zipInput.value = zipParam;
    const hint = getEl('zip-hint');
    if (hint) {
      const data = getRegionalData(zipParam);
      hint.innerHTML = `<span style="opacity:0.7">${data.city}, ${data.state}</span>`;
    }
  }

  if (queryParam) {
    const queryInput = getEl('query-input');
    if (queryInput) queryInput.value = queryParam;
  }

  // Focus query input
  const queryInput = getEl('query-input');
  if (queryInput && !queryParam) {
    setTimeout(() => queryInput.focus(), 100);
  }
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}