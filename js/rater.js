/**
 * RateCheck Rater
 * Rate lookup, regional adjustment, and price estimation
 */

const DATA_SOURCES = [
  'Homewyse Cost Calculator',
  'Angi\'s List / Angi',
  'BLS Occupational Employment Statistics',
  'HomeAdvisor / Porch',
  'Thumbtack Pro Data',
  'Regional contractor surveys'
];

/**
 * Get current year for data aging
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Age-adjust prices (costs rise ~3% per year)
 */
function ageAdjust(basePrice, dataYear) {
  const currentYear = getCurrentYear();
  const yearsAgo = currentYear - dataYear;
  return basePrice * Math.pow(1.03, yearsAgo);
}

/**
 * Apply regional multiplier to price
 */
function regionalAdjust(price, zip) {
  const data = getRegionalData(zip);
  return price * data.multiplier;
}

/**
 * Get price range for a service in a ZIP
 */
function getPriceRange(service, zip, params = {}) {
  // Start with base prices
  let baseLow = service.low;
  let baseHigh = service.high;

  // Apply parameter adjustments
  if (params.quantity && params.quantity > 1) {
    // Volume discount for multiple units
    const discount = params.quantity > 5 ? 0.85 : params.quantity > 2 ? 0.90 : 0.95;
    baseLow *= discount;
    baseHigh *= discount;
  }

  if (params.sqft) {
    // Per-sqft services: prices ARE the sqft rate
    // Low/high already in per sqft units
    const unit = service.unit || '';
    if (unit.includes('sq ft') || unit.includes('sqft') || unit.includes('per sq')) {
      baseLow = service.low;
      baseHigh = service.high;
    }
  }

  if (params.linearFt) {
    const unit = service.unit || '';
    if (unit.includes('linear foot') || unit.includes('lf')) {
      baseLow = service.low;
      baseHigh = service.high;
    }
  }

  // Urgency multiplier
  if (params.urgent) {
    baseLow *= 1.35;
    baseHigh *= 1.50;
  }

  // Regional adjustment
  let adjustedLow = regionalAdjust(baseLow, zip);
  let adjustedHigh = regionalAdjust(baseHigh, zip);

  // Average
  const average = (adjustedLow + adjustedHigh) / 2;

  return {
    low: Math.round(adjustedLow),
    high: Math.round(adjustedHigh),
    average: Math.round(average),
    formattedLow: formatCurrency(Math.round(adjustedLow)),
    formattedHigh: formatCurrency(Math.round(adjustedHigh)),
    formattedAvg: formatCurrency(Math.round(average)),
    unit: service.unit,
    regional: getRegionalData(zip),
    dataYear: 2024,
    confidence: 'regional'
  };
}

/**
 * Get confidence label for price estimate
 */
function getPriceConfidence(priceRange, params) {
  let confidence = 'good';

  if (params.urgent) {
    confidence = 'estimated'; // Urgent rates are less predictable
  }

  if (!priceRange.regional || priceRange.regional.multiplier === 1.0) {
    confidence = priceRange.regional === null ? 'national' : 'regional';
  }

  return confidence;
}

/**
 * Build the full result object for a matched service
 */
function buildResult(match, zip, params = {}) {
  const priceRange = getPriceRange(match.service, zip, params);
  const confidence = getPriceConfidence(priceRange, params);
  const regional = priceRange.regional;

  // Build explanation
  const explanations = [];

  if (regional && regional.multiplier !== 1.0) {
    if (regional.multiplier > 1.2) {
      explanations.push(`Higher cost region (${regional.city}, ${regional.state} — ${Math.round(regional.multiplier * 100 - 100)}% above national average)`);
    } else if (regional.multiplier < 0.9) {
      explanations.push(`Lower cost region (${regional.city}, ${regional.state} — ${Math.round((1 - regional.multiplier) * 100)}% below national average)`);
    } else {
      explanations.push(`${regional.city}, ${regional.state}: within ${Math.abs(Math.round((regional.multiplier - 1) * 100))}% of national average`);
    }
  }

  if (params.urgent) {
    explanations.push('Emergency/urgent service adds 35-50% premium');
  }

  if (params.quantity > 1) {
    explanations.push(`Multiple units (${params.quantity}): volume pricing applied`);
  }

  if (match.service.includes) {
    explanations.push(`Typically includes: ${match.service.includes.join(', ')}`);
  }

  if (match.service.factors) {
    explanations.push(`Price varies based on: ${match.service.factors.join(', ')}`);
  }

  return {
    serviceId: match.service.id,
    serviceName: match.service.name,
    serviceDesc: match.service.desc,
    trade: match.trade,
    tradeName: match.tradeName,
    tradeIcon: match.tradeIcon,
    tradeColor: match.tradeColor,
    confidence: match.confidence,
    matchScore: match.score,
    matchExplanation: getMatchExplanation(match),

    pricing: {
      low: priceRange.low,
      high: priceRange.high,
      average: priceRange.average,
      formattedLow: priceRange.formattedLow,
      formattedHigh: priceRange.formattedHigh,
      formattedAvg: priceRange.formattedAvg,
      unit: priceRange.unit,
      region: regional ? `${regional.city}, ${regional.state}` : 'National Average',
      costIndex: regional ? regional.costIndex : 100,
      regionalMultiplier: regional ? regional.multiplier : 1.0,
      dataYear: priceRange.dataYear,
      priceConfidence: confidence
    },

    explanations: explanations,
    dataSources: DATA_SOURCES,

    isPriceRange: true,
    unit: priceRange.unit
  };
}

/**
 * Get all price ranges for a given match (top level prices)
 */
function getAllPricing(service, zip, params = {}) {
  const result = {
    regional: getPriceRange(service, zip, params),
    national: {
      low: service.low,
      high: service.high,
      average: Math.round((service.low + service.high) / 2),
      formattedLow: formatCurrency(service.low),
      formattedHigh: formatCurrency(service.high),
      formattedAvg: formatCurrency(Math.round((service.low + service.high) / 2)),
      unit: service.unit
    }
  };
  return result;
}

/**
 * Generate comparison text for price
 */
function generatePriceContext(result, zip) {
  const regional = result.pricing;

  if (regional.regionalMultiplier > 1.2) {
    return `Prices in ${regional.region} are elevated compared to national average — labor and overhead costs are higher in this area.`;
  } else if (regional.regionalMultiplier < 0.9) {
    return `Prices in ${regional.region} tend to be below national average — this area has more affordable labor and operating costs.`;
  } else {
    return `${regional.region} pricing is close to the national average for this service.`;
  }
}

/**
 * Build the "did you mean?" suggestions for low-confidence matches
 */
function buildSuggestions(input, zip) {
  const params = extractParams(input);
  const parsed = parseInput(input, 3);

  if (parsed.matches.length === 0) {
    return null;
  }

  const topMatch = parsed.matches[0];

  if (topMatch.confidence === 'high' || topMatch.confidence === 'medium') {
    return null; // Good match found, no need for suggestion
  }

  // Return top match anyway, but flag as low confidence
  const suggestion = suggestAlternative(input, topMatch.trade);

  return {
    originalSuggestion: topMatch,
    alternative: suggestion,
    prompt: `Did you mean ${topMatch.tradeIcon} ${topMatch.tradeName} — ${topMatch.service.name}?`
  };
}

// Export
if (typeof module !== 'undefined') {
  module.exports = {
    getPriceRange,
    buildResult,
    getAllPricing,
    generatePriceContext,
    buildSuggestions,
    DATA_SOURCES
  };
}