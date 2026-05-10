/**
 * RateCheck Parser
 * NLP-lite keyword matching engine for free-text service descriptions
 * 
 * Approach:
 * 1. Tokenize user input (normalize, stem, remove stop words)
 * 2. Score each service against the input
 * 3. Rank by match confidence
 * 4. Extract parameters (size, quantity, urgency) when present
 */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'can', 'to', 'of', 'in', 'for', 'on', 'with',
  'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'beneath', 'under',
  'above', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'him', 'his', 'she',
  'her', 'it', 'its', 'they', 'them', 'their', 'what', 'which', 'who', 'whom',
  'this', 'that', 'these', 'those', 'am', 'let', 'some', 'any', 'every', 'each',
  'other', 'another', 'such', 'no', 'not', 'only', 'same', 'so', 'than', 'too',
  'very', 'just', 'also', 'now', 'here', 'there', 'when', 'where', 'why', 'how',
  'all', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'just',
  'don', 'now', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'need', 'needs', 'needed', 'want', 'wants', 'wanted', 'looking',
  'need', 'help', 'get', 'got', 'have', 'has', 'had', 'need', 'needs', 'needed',
  'like', 'likes', 'liked', 'estimate', 'quotes', 'price', 'cost', 'around',
  'please', 'thanks', 'thank', 'help', 'maybe', 'perhaps', 'probably'
]);

const STEM_MAP = {
  'removing': 'remove', 'removal': 'remove', 'removed': 'remove', 'removes': 'remove',
  'cutting': 'cut', 'cutdown': 'cut', 'cutting': 'cut', 'cutdown': 'cut',
  'installing': 'install', 'installed': 'install', 'installation': 'install',
  'replacing': 'replace', 'replaced': 'replace', 'replacement': 'replace',
  'repairing': 'repair', 'repaired': 'repair', 'repairs': 'repair',
  'fixing': 'fix', 'fixed': 'fix', 'fixes': 'fix',
  'cleaning': 'clean', 'cleaned': 'clean', 'cleans': 'clean',
  'painting': 'paint', 'painted': 'paint', 'paints': 'paint',
  'building': 'build', 'built': 'build',
  'remodeling': 'remodel', 'remodeled': 'remodel',
  'renovating': 'renovate', 'renovated': 'renovate',
  'trimming': 'trim', 'trimmed': 'trim',
  'pruning': 'prune', 'pruned': 'prune',
  'staining': 'stain', 'stained': 'stain',
  'sealing': 'seal', 'sealed': 'seal',
  'grinding': 'grind', 'ground': 'grind',
  'cleaning': 'clean', 'cleans': 'clean',
  'checking': 'check', 'checked': 'check',
  'inspecting': 'inspect', 'inspected': 'inspect',
  'working': 'work', 'works': 'work',
  'broken': 'break', 'fixing': 'fix'
};

const QUANTITY_WORDS = {
  'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'a': 1, 'an': 1, 'single': 1, 'double': 2, 'couple': 2, 'few': 3,
  'several': 4, 'multiple': 5, 'many': 7, 'lots': 8
};

const HEIGHT_WORDS = {
  'small': 'under 20ft', 'short': 'under 25ft', 'medium': '30-50ft',
  'standard': '30-50ft', 'average': '30-50ft', 'large': '50-70ft',
  'big': '50-70ft', 'tall': '60-80ft', 'very tall': '80ft+', 'huge': '80ft+',
  'giant': '80ft+', 'massive': '80ft+'
};

const UNIT_MAP = {
  'foot': 'ft', 'feet': 'ft', 'ft': 'ft', "'": 'ft',
  'inch': 'in', 'inches': 'in', 'in': 'in', '"': 'in',
  'sq ft': 'sqft', 'square foot': 'sqft', 'square feet': 'sqft',
  'sqft': 'sqft', 'sf': 'sqft',
  'linear foot': 'lf', 'linear feet': 'lf', 'lf': 'lf',
  'gallon': 'gal', 'gallons': 'gal', 'gal': 'gal',
  'per hour': 'hour', 'hour': 'hour', 'hours': 'hour', 'hr': 'hour', 'hrs': 'hour',
  'per day': 'day', 'day': 'day', 'days': 'day'
};

/**
 * Tokenize and normalize input
 */
function tokenize(text) {
  const normalized = text.toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')  // Remove punctuation except apostrophe/hyphen
    .replace(/\s+/g, ' ')        // Normalize whitespace
    .trim();

  const tokens = normalized.split(' ').filter(t => t.length > 1);
  const filtered = tokens.filter(t => !STOP_WORDS.has(t) && !/^\d+$/.test(t) && t.length > 1);

  // Stem tokens
  const stemmed = filtered.map(t => STEM_MAP[t] || t);

  return {
    raw: tokens,
    filtered: filtered,
    stemmed: stemmed,
    original: text
  };
}

/**
 * Extract numeric parameters from text
 */
function extractParams(text) {
  const params = {};

  // Extract quantities (2 trees, 3 bedrooms, etc)
  const qtyMatch = text.match(/(\d+)\s*(tree|trees|bedroom|bedrooms|bathroom|bathrooms|room|rooms|outlet|outlets|window|windows|door|doors|fixtures?|unit|units|pair|pairs)/i);
  if (qtyMatch) {
    params.quantity = parseInt(qtyMatch[1]);
  }

  // Extract "X foot/yellow" height or size descriptors
  const heightMatch = text.match(/(\d+)\s*(?:foot|feet|ft)/i);
  if (heightMatch) {
    params.heightFt = parseInt(heightMatch[1]);
  }

  // Extract sqft
  const sqftMatch = text.match(/(\d+)\s*(?:sq\s*ft|sqft|square\s*feet|square\s*foot)/i);
  if (sqftMatch) {
    params.sqft = parseInt(sqftMatch[1]);
  }

  // Extract linear feet
  const lfMatch = text.match(/(\d+)\s*(?:linear\s*foot|linear\s*feet|lf)/i);
  if (lfMatch) {
    params.linearFt = parseInt(lfMatch[1]);
  }

  // Detect urgency
  params.urgent = /\b(emergency|urgent|asap|right now|immediately|today|this week)\b/i.test(text);

  // Detect it's a quote request (not for their own business)
  params.isQuoteRequest = /\b(how much|what does|estimate|price|cost|range|charge)/i.test(text);

  // Detect size adjectives
  const sizeMatch = text.match(/\b(small|large|big|tiny|huge|giant|medium|standard|average)\b/i);
  if (sizeMatch) {
    params.sizeAdjective = sizeMatch[1].toLowerCase();
  }

  // Detect location context
  const locationMatch = text.match(/\b(backyard|front yard|backyard|yard|garage|basement|attic|upstairs|downstairs|2-story|three-story|one-story|single story|multi-story)\b/i);
  if (locationMatch) {
    params.location = locationMatch[1].toLowerCase();
  }

  return params;
}

/**
 * Calculate match score between tokens and a service
 */
function scoreService(tokens, service, trade) {
  let score = 0;
  let matchedKeywords = [];
  let matchedContext = [];
  let missingKeywords = [];
  let explanation = [];

  // Score service keywords (higher weight for name/desc matches)
  const serviceNameTokens = tokenize(service.name);
  const serviceDescTokens = tokenize(service.desc);

  // Check for exact name matches (highest weight)
  const nameMatches = tokens.stemmed.filter(t =>
    serviceNameTokens.stemmed.some(nt => nt === t || t.includes(nt) || nt.includes(t))
  );
  if (nameMatches.length > 0) {
    score += nameMatches.length * 10;
    matchedContext.push(`Name match: "${nameMatches.join('", "')}"`);
  }

  // Check for description matches (high weight)
  const descMatches = tokens.stemmed.filter(t =>
    serviceDescTokens.stemmed.some(dt => dt === t || t.includes(dt) || dt.includes(t))
  );
  if (descMatches.length > 0) {
    score += descMatches.length * 5;
    matchedKeywords.push(...descMatches);
  }

  // Check for keyword list matches (standard weight)
  const keywordMatches = tokens.stemmed.filter(t =>
    service.keywords.some(kw => {
      const kwTokens = tokenize(kw);
      return kwTokens.stemmed.some(kt => kt === t || t.includes(kt) || kt.includes(t));
    })
  );
  if (keywordMatches.length > 0) {
    score += keywordMatches.length * 3;
    matchedKeywords.push(...keywordMatches);
  }

  // Check for partial/tolerable matches (low weight)
  const partialMatches = tokens.stemmed.filter(t => {
    if (matchedKeywords.includes(t)) return false;
    // Check if token appears in any keyword
    return service.keywords.some(kw =>
      kw.toLowerCase().includes(t) || t.length > 4 && kw.toLowerCase().includes(t.substring(0, t.length - 1))
    );
  });
  if (partialMatches.length > 0) {
    score += partialMatches.length * 1;
    matchedContext.push(`Partial: ${partialMatches.slice(0, 2).join(', ')}`);
  }

  // Check trade-level keywords (context bonus)
  const tradeKeywords = trade.keywords || [];
  const tradeMatchCount = tokens.stemmed.filter(t =>
    tradeKeywords.some(tk => tk.toLowerCase().includes(t) || t.includes(tk.toLowerCase().substring(0, 4)))
  ).length;
  if (tradeMatchCount > 0) {
    score += tradeMatchCount * 2;
    explanation.push(`Trade context: ${tradeMatchCount} matching category keywords`);
  }

  // Penalize for unmatched significant tokens
  const significantTokens = tokens.stemmed.filter(t => t.length > 3);
  const unmatchedCount = significantTokens.filter(t => {
    const inName = serviceNameTokens.stemmed.some(nt => nt.includes(t) || t.includes(nt));
    const inDesc = serviceDescTokens.stemmed.some(dt => dt.includes(t) || t.includes(dt));
    const inKeywords = service.keywords.some(kw => kw.toLowerCase().includes(t));
    return !inName && !inDesc && !inKeywords;
  }).length;

  if (unmatchedCount > 0 && significantTokens.length > 0) {
    const penalty = unmatchedCount * 0.5;
    score = Math.max(0, score - penalty);
    missingKeywords.push(...significantTokens.filter(t =>
      !matchedKeywords.includes(t) && !matchedContext.some(c => c.includes(t))
    ).slice(0, 5));
  }

  // Boost for parameter alignment
  if (tokens.original.includes('small') && service.name.includes('Small')) score += 5;
  if (tokens.original.includes('large') && service.name.includes('Large')) score += 5;
  if (tokens.original.includes('medium') && service.name.includes('Medium')) score += 4;
  if (tokens.original.includes('emergency') && service.name.toLowerCase().includes('emergency')) score += 8;

  // Boost exact service type mentions
  const typeMentions = ['removal', 'installation', 'repair', 'replacement', 'cleaning', 'inspection', 'replacement'];
  const mentionedType = typeMentions.find(t => tokens.stemmed.includes(t));
  if (mentionedType && service.name.toLowerCase().includes(mentionedType)) {
    score += 6;
    explanation.push(`Exact type match: ${mentionedType}`);
  }

  return {
    score,
    matchedKeywords: [...new Set(matchedKeywords)],
    matchedContext,
    missingKeywords: [...new Set(missingKeywords)],
    explanation,
    confidence: 0
  };
}

/**
 * Get confidence level label
 */
function getConfidenceLevel(score) {
  if (score >= 25) return 'high';
  if (score >= 12) return 'medium';
  if (score >= 5) return 'low';
  return 'minimal';
}

/**
 * Parse input and find best matching services
 */
function parseInput(input, topN = 5) {
  const tokens = tokenize(input);
  const params = extractParams(input);
  const results = [];

  // Iterate all trades and services
  for (const [tradeKey, trade] of Object.entries(SERVICE_CATALOG)) {
    for (const service of trade.services) {
      const scoring = scoreService(tokens, service, trade);
      scoring.confidence = getConfidenceLevel(scoring.score);
      scoring.trade = tradeKey;
      scoring.tradeName = trade.name;
      scoring.tradeIcon = trade.icon;
      scoring.tradeColor = trade.color;
      scoring.service = service;

      if (scoring.score > 0) {
        results.push(scoring);
      }
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Return top N results
  return {
    tokens,
    params,
    matches: results.slice(0, topN).map(r => ({
      trade: r.trade,
      tradeName: r.tradeName,
      tradeIcon: r.tradeIcon,
      tradeColor: r.tradeColor,
      service: r.service,
      score: r.score,
      confidence: r.confidence,
      matchedKeywords: r.matchedKeywords,
      matchedContext: r.matchedContext,
      missingKeywords: r.missingKeywords,
      explanation: r.explanation
    })),
    totalMatches: results.length
  };
}

/**
 * Get a human-readable explanation for why a service was matched
 */
function getMatchExplanation(match) {
  const parts = [];

  if (match.matchedContext.length > 0) {
    parts.push(...match.matchedContext);
  }

  if (match.matchedKeywords.length > 0) {
    const unique = [...new Set(match.matchedKeywords)];
    parts.push(`Matched terms: ${unique.slice(0, 4).join(', ')}`);
  }

  if (match.explanation.length > 0) {
    parts.push(...match.explanation);
  }

  return parts.length > 0 ? parts.join(' | ') : 'General match based on category';
}

/**
 * Suggest alternative trade/category if top match is low confidence
 */
function suggestAlternative(input, currentTrade) {
  const tokens = tokenize(input);

  // Check for cross-trade signals
  const crossSignals = {
    plumbing: ['leak', 'drain', 'pipe', 'clog', 'water', 'sink', 'toilet', 'faucet', 'shower'],
    electrical: ['outlet', 'wire', 'switch', 'light', 'circuit', 'panel', 'breaker', 'electric'],
    tree: ['tree', 'stump', 'limb', 'branch', 'canopy', 'trim', 'prune', 'hazard'],
    roofing: ['roof', 'shingle', 'leak', 'gutter', 'flashing'],
    hvac: ['ac', 'furnace', 'heat', 'cool', 'air', 'duct', 'vent'],
    painting: ['paint', 'wall', 'ceiling', 'trim', 'cabinet', 'stain'],
    cleaning: ['clean', 'carpet', 'window', 'pressure', 'gutter']
  };

  let bestSignal = null;
  let bestSignalCount = 0;

  for (const [trade, signals] of Object.entries(crossSignals)) {
    if (trade === currentTrade) continue;
    const count = tokens.stemmed.filter(t => signals.some(s => t.includes(s) || s.includes(t))).length;
    if (count > bestSignalCount) {
      bestSignalCount = count;
      bestSignal = trade;
    }
  }

  if (bestSignal && bestSignalCount >= 1) {
    const trade = SERVICE_CATALOG[bestSignal];
    return {
      trade: bestSignal,
      tradeName: trade.name,
      tradeIcon: trade.icon,
      signalCount: bestSignalCount
    };
  }

  return null;
}

// Export
if (typeof module !== 'undefined') {
  module.exports = { parseInput, extractParams, tokenize, getMatchExplanation, suggestAlternative };
}