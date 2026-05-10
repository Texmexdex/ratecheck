/**
 * RateCheck Service Catalog + Regional Multipliers
 * Comprehensive service definitions with keyword fingerprints for NLP matching
 * Regional cost-of-living multipliers by ZIP prefix
 */

const SERVICE_CATALOG = {
  tree: {
    name: 'Tree Removal & Trimming',
    icon: '🌲',
    color: '#166534',
    keywords: ['tree', 'trees', 'removal', 'remove', 'cut', 'cutting', 'fall', 'falling', 'trim', 'pruning', 'prune', 'stump', 'grinding', 'grind', 'chop', 'chopping', 'clear', 'clearing', 'hazard', 'hazardous', 'deadwood', 'dead wood', 'limb', 'limbs', 'branch', 'branches', 'canopy', 'pine', 'oak', 'maple', 'oak', 'backyard', 'front yard', 'yard'],
    services: [
      {
        id: 'tree_small',
        name: 'Tree Removal (Small — under 30ft)',
        desc: 'No climbing required, accessible location, single tree under 30 feet',
        keywords: ['small', 'under 30', 'small tree', 'little tree', 'short tree'],
        low: 350, high: 850, unit: 'per tree',
        includes: ['Removal', 'Disposal', 'Basic cleanup'],
        factors: ['Accessibility', 'Ground conditions']
      },
      {
        id: 'tree_medium',
        name: 'Tree Removal (Medium — 30-60ft)',
        desc: 'Standard removal with climbing/rigging required. Most common residential size',
        keywords: ['medium', '30 foot', '40 foot', '50 foot', '60 foot', 'two story', 'mid size'],
        low: 700, high: 1400, unit: 'per tree',
        includes: ['Climbing', 'Rigging', 'Disposal'],
        factors: ['Height', 'Obstacles', 'Access for equipment']
      },
      {
        id: 'tree_large',
        name: 'Tree Removal (Large — 60ft+)',
        desc: 'Complex removal requiring sectional dismantling, heavy rigging, potentially crane assist',
        keywords: ['large', 'big', '60 foot', '70 foot', '80 foot', 'huge', 'giant', 'massive', 'three story', 'tall'],
        low: 1300, high: 3500, unit: 'per tree',
        includes: ['Sectional dismantling', 'Heavy rigging', 'Commercial disposal'],
        factors: ['Crane access', 'Structure proximity', 'Power lines']
      },
      {
        id: 'tree_complex',
        name: 'Tree Removal (Complex / High Risk)',
        desc: 'Sectional dismantling via climbing/rigging with asset protection and ground control. ANSI Z133 compliant',
        keywords: ['complex', 'complicated', 'over house', 'over structure', 'near power', 'power line', 'close to house', 'pool', 'addition'],
        low: 800, high: 3500, unit: 'per tree',
        includes: ['Asset protection', 'Ground control', 'Full liability coverage'],
        factors: ['Proximity to structures', 'Crane requirements', 'Permits']
      },
      {
        id: 'tree_directionalfell',
        name: 'Directional Felling',
        desc: 'Ground-level precision felling. Requires clear drop zone. No climbing or rigging',
        keywords: ['fell', 'felling', 'drop', 'direction', 'ground level', 'clear drop'],
        low: 300, high: 800, unit: 'per tree',
        includes: ['Single felling cut', 'Debris cleanup'],
        factors: ['Drop zone clearance', 'Tree lean']
      },
      {
        id: 'tree_stump',
        name: 'Stump Grinding',
        desc: 'Mechanical stump removal below grade. Residual roots left in ground',
        keywords: ['stump', 'stump grinding', 'grind stump', 'remove stump', 'stump removal'],
        low: 2.5, high: 5, unit: 'per inch of diameter',
        includes: ['Grinding below grade', 'Cleanup'],
        factors: ['Stump diameter', 'Root depth']
      },
      {
        id: 'tree_trimming',
        name: 'Tree Trimming / Pruning',
        desc: 'Canopy management, deadwood removal, shaping. Standard ornamental pruning',
        keywords: ['trim', 'prune', 'pruning', 'trimming', 'shaping', 'canopy', 'shape up'],
        low: 250, high: 800, unit: 'per tree',
        includes: ['Limb removal', 'Debris cleanup'],
        factors: ['Tree height', 'Canopy density']
      },
      {
        id: 'tree_crown_reduce',
        name: 'Crown Reduction',
        desc: 'Reduce wind sail effect and limb weight. Critical for storm-damaged or overgrown trees',
        keywords: ['crown', 'reduce', 'reduction', 'wind sail', 'weight reduction', 'thin canopy'],
        low: 300, high: 1000, unit: 'per tree',
        includes: ['Selective limb removal', 'Weight reduction cuts'],
        factors: ['Tree size', 'Amount of reduction needed']
      },
      {
        id: 'tree_sanitary',
        name: 'Sanitary Pruning (Deadwood Removal)',
        desc: 'Removal of dead or diseased limbs 2" diameter or larger. Safety-focused',
        keywords: ['dead', 'deadwood', 'dead wood', 'diseased', 'dying', 'hazard', 'safety', 'storm damage'],
        low: 200, high: 600, unit: 'per tree',
        includes: ['Dead limb removal', 'Disposal'],
        factors: ['Severity of condition']
      },
      {
        id: 'tree_storm',
        name: 'Storm Restoration / Emergency',
        desc: 'Emergency hazardous debris removal from structures, driveways, yards. Priority service',
        keywords: ['storm', 'emergency', 'hurricane', 'tornado', 'damage', 'down', 'fallen', 'wind damage', 'after storm', 'urgent'],
        low: 500, high: 2500, unit: 'per job',
        includes: ['Priority response', 'Hazardous debris removal', 'Initial safety assessment'],
        factors: ['Severity', 'Urgency', 'Debris volume']
      },
      {
        id: 'tree_crane',
        name: 'Crane Assist Fee',
        desc: 'Heavy lifting machinery for zero-impact removal over structures, pools, delicate landscaping',
        keywords: ['crane', 'over pool', 'over structure', 'zero impact', 'heavy lift', 'lifting'],
        low: 800, high: 1200, unit: 'minimum / day',
        includes: ['Crane setup', 'Operator', 'Lift charges'],
        factors: ['Duration', 'Access', 'Load weight']
      },
      {
        id: 'tree_brush',
        name: 'Brush Clearing / Underbrush',
        desc: 'Mechanical mulching of saplings, briars, vines, light vegetation. Per acre or per day',
        keywords: ['brush', 'clearing', 'underbrush', 'saplings', 'briars', 'vines', 'vegetation', 'mulch', 'land clearing'],
        low: 800, high: 2500, unit: 'per acre or per day',
        includes: ['Mechanical clearing', 'Disposal'],
        factors: ['Density', 'Terrain']
      }
    ]
  },

  hvac: {
    name: 'HVAC / Heating & Cooling',
    icon: '❄️',
    color: '#0369a1',
    keywords: ['hvac', 'ac', 'air conditioning', 'air conditioning', 'furnace', 'heating', 'cooling', 'heat pump', 'duct', 'ductwork', 'vent', 'ventilation', 'thermostat', 'air', 'cool', 'warm', 'hot', 'cold', 'temperature'],
    services: [
      {
        id: 'hvac_ac_install',
        name: 'AC Unit Installation (Standard 3-5 Ton)',
        desc: 'New central air conditioning system installation. Standard residential size',
        keywords: ['ac install', 'air conditioning install', 'new ac', 'central air', 'new air conditioner', 'ac unit'],
        low: 4500, high: 8000, unit: 'per unit',
        includes: ['Equipment', 'Installation', 'Startup', 'Warranty'],
        factors: ['Unit efficiency rating', 'Home size', 'Ductwork condition']
      },
      {
        id: 'hvac_ac_replace',
        name: 'AC Unit Replacement (Same Size)',
        desc: 'Swap out existing AC unit for new model. Same tonnage. No ductwork changes',
        keywords: ['replace ac', 'ac replacement', 'swap ac', 'change ac', 'new ac unit', 'ac unit change'],
        low: 4000, high: 7000, unit: 'per unit',
        includes: ['Equipment', 'Removal of old unit', 'Installation', 'Startup'],
        factors: ['Unit efficiency', 'Accessibility']
      },
      {
        id: 'hvac_furnace_install',
        name: 'Furnace Installation (Gas/Electric)',
        desc: 'New furnace installation. Gas or electric. Standard residential',
        keywords: ['furnace', 'furnace install', 'new furnace', 'heating system', 'furnace replacement'],
        low: 3000, high: 6000, unit: 'per unit',
        includes: ['Equipment', 'Installation', 'Gas line connection (gas)', 'Startup'],
        factors: ['Fuel type', 'Efficiency rating', 'Home size']
      },
      {
        id: 'hvac_heatpump',
        name: 'Heat Pump Installation',
        desc: 'Heat pump system (heating + cooling in one). Most efficient option for moderate climates',
        keywords: ['heat pump', 'heat pump install', 'mini split', 'mini-split', 'ductless'],
        low: 5000, high: 9000, unit: 'per unit',
        includes: ['Equipment', 'Installation', 'Refrigerant lines', 'Startup'],
        factors: ['Zones', 'Efficiency rating', 'Climate']
      },
      {
        id: 'hvac_duct_install',
        name: 'Ductwork Installation (Per Linear Foot)',
        desc: 'New ductwork installation or significant extension. Per linear foot',
        keywords: ['duct', 'ductwork', 'ducts', 'vent', 'vents', 'duct install', 'new ducts', 'extend duct'],
        low: 12, high: 25, unit: 'per linear foot',
        includes: ['Materials', 'Labor', 'Insulation'],
        factors: ['Accessibility', 'Length', 'Complexity']
      },
      {
        id: 'hvac_duct_repair',
        name: 'Ductwork Repair / Modification',
        desc: 'Fix leaks, replace damaged sections, modify routing. Per repair',
        keywords: ['duct repair', 'leaky ducts', 'duct leak', 'fix duct', 'duct modification', 'seal ducts'],
        low: 150, high: 500, unit: 'per repair',
        includes: ['Diagnosis', 'Materials', 'Labor', 'Seal testing'],
        factors: ['Location', 'Severity of leak']
      },
      {
        id: 'hvac_thermostat',
        name: 'Thermostat Installation (Standard)',
        desc: 'Standard programmable or basic smart thermostat installation',
        keywords: ['thermostat', 'thermostat install', 'new thermostat', 'nest', 'ecobee', 'smart thermostat'],
        low: 75, high: 200, unit: 'per unit',
        includes: ['Equipment', 'Installation', 'Wiring', 'Setup'],
        factors: ['Wiring compatibility']
      },
      {
        id: 'hvac_recharge',
        name: 'AC Recharge / Refrigerant Add',
        desc: 'Add refrigerant to existing system. Indicates a leak — should be investigated',
        keywords: ['recharge', 'refrigerant', 'low refrigerant', 'add freon', 'freon', 'ac not cooling'],
        low: 150, high: 400, unit: 'per job',
        includes: ['Leak search', 'Refrigerant', 'Test'],
        factors: ['System size', 'Refrigerant type']
      },
      {
        id: 'hvac_compressor',
        name: 'Compressor Replacement',
        desc: 'Outdoor unit compressor failure. Major repair. Often near replacement cost',
        keywords: ['compressor', 'compressor replacement', 'ac not working', 'outdoor unit', 'ac repair'],
        low: 800, high: 1800, unit: 'per unit',
        includes: ['Compressor', 'Labor', 'Refrigerant', 'Testing'],
        factors: ['Unit age', 'Compressor type']
      },
      {
        id: 'hvac_maintenance',
        name: 'HVAC Maintenance Tune-Up',
        desc: 'Seasonal maintenance. Cleaning, inspection, refrigerant check, filter replacement',
        keywords: ['maintenance', 'tune up', 'service', 'inspection', 'yearly', 'annual', 'checkup'],
        low: 100, high: 200, unit: 'per visit',
        includes: ['Inspection', 'Cleaning', 'Filter', 'Refrigerant check'],
        factors: ['System type', 'System condition']
      }
    ]
  },

  plumbing: {
    name: 'Plumbing',
    icon: '🚿',
    color: '#0891b2',
    keywords: ['plumbing', 'plumber', 'pipe', 'pipes', 'leak', 'leaking', 'water', 'drain', 'draining', 'clog', 'clogged', 'blocked', 'sink', 'toilet', 'shower', 'bathtub', 'faucet', 'water heater', 'tank', 'sewage', 'sewer', 'bathroom', 'kitchen', 'kitchen sink', 'garbage disposal', 'disposal', 'sump pump', 'jet pump', 'well'],
    services: [
      {
        id: 'plumb_hourly',
        name: 'Plumbing Labor (Hourly Rate)',
        desc: 'General plumbing labor. Most repairs charged by the hour after diagnosis',
        keywords: ['plumber', 'plumbing', 'hourly', 'per hour', 'labor'],
        low: 85, high: 175, unit: 'per hour',
        includes: ['Labor', 'Diagnosis'],
        factors: ['Time of day', 'Job complexity', 'Parts cost separate']
      },
      {
        id: 'plumb_drain',
        name: 'Drain Cleaning (Per Drain)',
        desc: 'Clear clogged or slow drain. Snaking or hydro jetting',
        keywords: ['drain', 'clog', 'clogged', 'slow drain', 'blocked', 'clogged drain', 'clean drain', 'clear drain'],
        low: 100, high: 300, unit: 'per drain',
        includes: ['Snaking', 'Camera inspection (if needed)', 'Cleanup'],
        factors: ['Severity', 'Location', 'Cause of clog']
      },
      {
        id: 'plumb_waterheater_tank',
        name: 'Water Heater Installation (Tank)',
        desc: 'Traditional tank water heater. 40-50 gallon standard residential',
        keywords: ['water heater', 'tank water heater', 'hot water heater', 'replace water heater', 'new water heater', '40 gallon', '50 gallon'],
        low: 800, high: 1800, unit: 'per unit',
        includes: ['Equipment', 'Removal of old', 'Installation', 'Permit'],
        factors: ['Size', 'Fuel type', 'Location']
      },
      {
        id: 'plumb_waterheater_tankless',
        name: 'Water Heater Installation (Tankless)',
        desc: 'On-demand water heater. Higher upfront cost, lower operating cost long-term',
        keywords: ['tankless', 'tankless water heater', 'on demand', 'instant hot water', 'endless hot water'],
        low: 1500, high: 3500, unit: 'per unit',
        includes: ['Equipment', 'Installation', 'Gas line if needed', 'Permit'],
        factors: ['Flow rate', 'Gas line requirements', 'Venting']
      },
      {
        id: 'plumb_faucet',
        name: 'Faucet Installation / Replacement',
        desc: 'Kitchen or bathroom faucet replacement. Standard models',
        keywords: ['faucet', 'faucet replacement', 'new faucet', 'replace faucet', 'sink faucet', 'bathroom faucet', 'kitchen faucet'],
        low: 100, high: 300, unit: 'per faucet',
        includes: ['Faucet (customer supply option)', 'Installation', 'Connections'],
        factors: ['Faucet type', 'Accessibility']
      },
      {
        id: 'plumb_toilet',
        name: 'Toilet Installation / Replacement',
        desc: 'Remove old toilet, install new. Standard two-piece residential',
        keywords: ['toilet', 'toilet replacement', 'new toilet', 'replace toilet', 'commode', 'bathroom'],
        low: 125, high: 350, unit: 'per toilet',
        includes: ['Toilet (customer supply option)', 'Removal', 'Installation', 'Wax seal'],
        factors: ['Floor condition', 'Age of existing']
      },
      {
        id: 'plumb_leak',
        name: 'Pipe Leak Repair',
        desc: 'Repair leaking pipe. Copper, PEX, or galvanized depending on age of home',
        keywords: ['leak', 'leaking', 'pipe leak', 'water leak', 'leaky pipe', 'burst pipe', 'pinhole leak'],
        low: 150, high: 500, unit: 'per repair',
        includes: ['Diagnosis', 'Pipe repair', 'Water cleanup'],
        factors: ['Pipe location', 'Access', 'Pipe type']
      },
      {
        id: 'plumb_sump',
        name: 'Sump Pump Installation',
        desc: 'Primary or backup sump pump installation. Critical for basement protection',
        keywords: ['sump pump', 'sump', 'basement', 'flooding', 'water backup', 'sump pump install'],
        low: 300, high: 800, unit: 'per unit',
        includes: ['Pump', 'Basin', 'Check valve', 'Installation'],
        factors: ['Pump type', 'Discharge location']
      },
      {
        id: 'plumb_garbage',
        name: 'Garbage Disposal Installation',
        desc: 'Install new garbage disposal unit. Replaces existing or new installation',
        keywords: ['garbage disposal', 'disposal', 'garbage', 'food waste', 'replace disposal', 'new disposal'],
        low: 100, high: 250, unit: 'per unit',
        includes: ['Disposal unit', 'Installation', 'Electrical', 'Connection'],
        factors: ['Cabinet space', 'Electrical readiness']
      },
      {
        id: 'plumb_bathroom_remodel',
        name: 'Bathroom Remodel',
        desc: 'Full or partial bathroom renovation. Per square foot',
        keywords: ['bathroom remodel', 'bathroom renovation', 'bathroom renovation', 'remodel bathroom', 'renovate bathroom'],
        low: 80, high: 200, unit: 'per sq ft',
        includes: ['Labor', 'Materials (varies)', 'Permits'],
        factors: ['Scope', 'Fixtures', 'Finishes']
      }
    ]
  },

  electrical: {
    name: 'Electrical',
    icon: '⚡',
    color: '#ca8a04',
    keywords: ['electric', 'electrical', 'electrician', 'wiring', 'wire', 'outlet', 'receptacle', 'switch', 'light', 'lights', 'panel', 'breaker', 'circuit', 'voltage', 'amp', 'watt', 'ev charger', 'ceiling fan', 'fan', 'chandelier', 'smoke detector', 'doorbell'],
    services: [
      {
        id: 'elec_hourly',
        name: 'Electrical Labor (Hourly Rate)',
        desc: 'General electrical labor. Most work charged hourly after assessment',
        keywords: ['electrician', 'electrical', 'hourly', 'per hour', 'electric work'],
        low: 90, high: 200, unit: 'per hour',
        includes: ['Labor', 'Diagnosis'],
        factors: ['Job complexity', 'Time of day', 'Parts separate']
      },
      {
        id: 'elec_outlet',
        name: 'Outlet Installation (Standard)',
        desc: 'Standard 120V outlet installation. New outlet or replacement',
        keywords: ['outlet', 'receptacle', 'electrical outlet', 'plug', 'new outlet', 'replace outlet', 'electrical outlet'],
        low: 75, high: 200, unit: 'per outlet',
        includes: ['Outlet', 'Labor', 'Wiring'],
        factors: ['Access', 'New circuit needed', 'Box required']
      },
      {
        id: 'elec_gfci',
        name: 'GFCI Outlet Installation',
        desc: 'Ground fault circuit interrupter outlet. Required in wet areas (kitchen, bathroom, exterior)',
        keywords: ['gfci', 'gfc outlet', 'bathroom outlet', 'kitchen outlet', 'outdoor outlet', 'wet area outlet'],
        low: 100, high: 250, unit: 'per outlet',
        includes: ['GFCI outlet', 'Labor', 'Testing'],
        factors: ['Access', 'Circuit type']
      },
      {
        id: 'elec_light_fixture',
        name: 'Light Fixture Installation (Standard)',
        desc: 'Standard light fixture installation. Flush mount, semi-flush, pendant',
        keywords: ['light fixture', 'light install', 'new light', 'replace light', 'ceiling light', 'flush mount', 'pendant'],
        low: 75, high: 200, unit: 'per fixture',
        includes: ['Fixture (customer supply option)', 'Labor', 'Wiring'],
        factors: ['Fixture type', 'Ceiling height', 'Access']
      },
      {
        id: 'elec_ceiling_fan',
        name: 'Ceiling Fan Installation',
        desc: 'Install or replace ceiling fan. Includes mounting bracket if needed',
        keywords: ['ceiling fan', 'fan install', 'replace fan', 'new fan', 'install fan'],
        low: 100, high: 275, unit: 'per fan',
        includes: ['Fan (customer supply option)', 'Mounting bracket', 'Labor', 'Wiring'],
        factors: ['Ceiling height', 'Existing wiring', 'Fan size']
      },
      {
        id: 'elec_panel_upgrade',
        name: 'Electrical Panel Upgrade (100→200 Amp)',
        desc: 'Upgrade home electrical panel. Major project, often required for modern loads',
        keywords: ['panel', 'electrical panel', 'breaker box', 'fuse box', 'upgrade panel', '200 amp', 'amp upgrade'],
        low: 1200, high: 3000, unit: 'per job',
        includes: ['Panel', 'Breakers', 'Labor', 'Permit', 'Inspection'],
        factors: ['Service entrance condition', 'Home size', 'Local codes']
      },
      {
        id: 'elec_ev_charger',
        name: 'EV Charger Installation (Level 2)',
        desc: '240V Level 2 EV charger installation. Requires dedicated circuit',
        keywords: ['ev charger', 'electric vehicle', 'tesla charger', 'chargepoint', 'ev charging', 'car charger', 'electric car'],
        low: 300, high: 800, unit: 'per unit',
        includes: ['Circuit', 'Charger (if included)', 'Labor', 'Permit'],
        factors: ['Panel capacity', 'Circuit length', 'Mounting location']
      },
      {
        id: 'elec_rewire',
        name: 'Whole-House Rewiring (Per Sq Ft)',
        desc: 'Complete rewire of home. Rarely needed but critical when required',
        keywords: ['rewire', 'rewiring', 'whole house', 'full rewire', 'replacing wiring', 'old wiring'],
        low: 3, high: 8, unit: 'per sq ft',
        includes: ['Wire', 'Labor', 'Boxes', 'Permit', 'Drywall repair'],
        factors: ['Home size', 'Age of home', 'Accessibility']
      },
      {
        id: 'elec_smoke',
        name: 'Smoke Detector Installation',
        desc: 'Install or replace smoke detectors. Hardwired preferred for safety',
        keywords: ['smoke detector', 'smoke alarm', 'fire alarm', 'detector', 'carbon monoxide', 'co detector'],
        low: 50, high: 150, unit: 'per unit',
        includes: ['Detector', 'Labor', 'Wiring (hardwired)'],
        factors: ['Number of units', 'Type']
      },
      {
        id: 'elec_doorbell',
        name: 'Doorbell Installation / Upgrade',
        desc: 'Standard or smart doorbell installation (Ring, Nest, etc.)',
        keywords: ['doorbell', 'ring doorbell', 'nest doorbell', 'smart doorbell', 'video doorbell', 'door bell'],
        low: 75, high: 200, unit: 'per unit',
        includes: ['Doorbell (if included)', 'Labor', 'Transformer check'],
        factors: ['Transformer upgrade needed', 'Wiring compatibility']
      }
    ]
  },

  roofing: {
    name: 'Roofing',
    icon: '🏠',
    color: '#dc2626',
    keywords: ['roof', 'roofing', 'shingle', 'shingles', 'tile', 'metal roof', 'flat roof', 'leak', 'leaking', 'leak', 'flashing', 'gutter', 'gutters', 'skylight', 'storm', 'hail', 'wind damage', 'replacement', 'repair', 'tear off', 'tear-off'],
    services: [
      {
        id: 'roof_inspect',
        name: 'Roof Inspection',
        desc: 'Comprehensive roof inspection. Written report with photos. Insurance claim support',
        keywords: ['inspection', 'inspect', 'check roof', 'roof check', 'roof assessment', 'leak detection'],
        low: 100, high: 300, unit: 'per inspection',
        includes: ['Inspection', 'Written report', 'Photos', 'Repair estimate'],
        factors: ['Roof size', 'Pitch', 'Accessibility']
      },
      {
        id: 'roof_shingle',
        name: 'Asphalt Shingle Replacement (Per Sq Ft)',
        desc: 'Remove old shingles, install new asphalt shingles. Per square foot (sqft)',
        keywords: ['shingle', 'shingles', 'asphalt shingle', 'roof replacement', 'new roof', 'roofing', 'tear off'],
        low: 4, high: 10, unit: 'per sq ft',
        includes: ['Tear-off', 'Underlayment', 'Shingles', 'Flashing', 'Labor'],
        factors: ['Pitch', 'Layers to remove', 'Quality of shingle', 'Local codes']
      },
      {
        id: 'roof_metal',
        name: 'Metal Roof Installation (Per Sq Ft)',
        desc: 'Standing seam or corrugated metal roofing. Long lifespan, premium cost',
        keywords: ['metal roof', 'standing seam', 'corrugated', 'steel roof', 'aluminum roof'],
        low: 8, high: 18, unit: 'per sq ft',
        includes: ['Underlayment', 'Metal panels', 'Trim', 'Labor'],
        factors: ['Panel type', 'Roof complexity', 'Access']
      },
      {
        id: 'roof_flat',
        name: 'Flat Roof / TPO Installation (Per Sq Ft)',
        desc: 'Single-ply TPO or EPDM flat roof system. For flat or low-slope roofs',
        keywords: ['flat roof', 'tpo', 'epdm', 'rubber roof', 'low slope', 'flat', 'commercial roof'],
        low: 6, high: 14, unit: 'per sq ft',
        includes: ['Membrane', 'Insulation', 'Labor'],
        factors: ['Roof size', 'Complexity', 'Access']
      },
      {
        id: 'roof_tearoff',
        name: 'Roof Tear-Off (Per Sq Ft)',
        desc: 'Stripping old roofing material. Usually done with new roof installation',
        keywords: ['tear off', 'tear-off', 'strip roof', 'remove shingles', 'demo roof'],
        low: 2, high: 6, unit: 'per sq ft',
        includes: ['Labor', 'Dumpster', 'Disposal'],
        factors: ['Layers', 'Material type', 'Disposal fees']
      },
      {
        id: 'roof_skylight',
        name: 'Skylight Installation',
        desc: 'Install new skylight or replace existing. Curb-mounted or framed',
        keywords: ['skylight', 'roof window', 'sun tunnel', 'solar tube', 'light tube'],
        low: 300, high: 900, unit: 'per unit',
        includes: ['Skylight', 'Framing', 'Flashing', 'Interior trim', 'Labor'],
        factors: ['Size', 'Roof type', 'Access']
      },
      {
        id: 'roof_gutter',
        name: 'Gutter Installation (Per Linear Foot)',
        desc: 'Seamless aluminum gutters. 5" or 6" width. Includes downspouts',
        keywords: ['gutter', 'gutters', 'gutter install', 'new gutters', 'replace gutters', 'seamless'],
        low: 6, high: 15, unit: 'per linear foot',
        includes: ['Gutters', 'Downspouts', 'Brackets', 'Labor'],
        factors: ['Stories', 'Material', 'Downspout count']
      },
      {
        id: 'roof_gutter_guard',
        name: 'Gutter Guard Installation (Per Linear Foot)',
        desc: 'Leaf guards or gutter protection systems. Reduces maintenance',
        keywords: ['gutter guard', 'gutter protection', 'leaf guard', 'gutter cover', 'gutter screen'],
        low: 4, high: 10, unit: 'per linear foot',
        includes: ['Guards', 'Labor', 'Existing gutter prep'],
        factors: ['Guard type', 'Roof edge condition']
      },
      {
        id: 'roof_flashing',
        name: 'Flashing Repair / Replacement',
        desc: 'Valley flashing, pipe jacks, chimney flashing repair. Critical leak prevention',
        keywords: ['flashing', 'leak', 'valley', 'chimney', 'pipe jack', 'roof leak', 'leak repair'],
        low: 100, high: 400, unit: 'per repair',
        includes: ['Materials', 'Labor', 'Sealant'],
        factors: ['Location', 'Extent of damage', 'Roof type']
      },
      {
        id: 'roof_repair',
        name: 'Roof Repair (Per Patch)',
        desc: 'Localized repair. Patch leaks, replace damaged shingles, fix flashing',
        keywords: ['roof repair', 'repair roof', 'patch roof', 'fix leak', 'leak repair', 'shingle repair'],
        low: 150, high: 600, unit: 'per repair',
        includes: ['Materials', 'Labor', 'Basic cleanup'],
        factors: ['Extent of damage', 'Roof type', 'Access']
      }
    ]
  },

  painting: {
    name: 'Painting',
    icon: '🎨',
    color: '#7c3aed',
    keywords: ['paint', 'painting', 'painter', 'interior', 'exterior', 'wall', 'walls', 'ceiling', 'trim', 'cabinet', 'cabinets', 'stain', 'staining', 'deck', 'fence', 'wallpaper', 'texture', 'drywall', 'sheetrock'],
    services: [
      {
        id: 'paint_interior',
        name: 'Interior Paint (Per Sq Ft, with Materials)',
        desc: 'Full interior paint job. Includes premium paint, primer, supplies. Per square foot',
        keywords: ['interior paint', 'paint interior', 'paint walls', 'interior painting', 'paint inside', 'wall paint'],
        low: 2.5, high: 6, unit: 'per sq ft',
        includes: ['Paint', 'Primer', 'Supplies', 'Labor', 'Two coats'],
        factors: ['Wall condition', 'Ceiling height', 'Number of colors', 'Trim painting']
      },
      {
        id: 'paint_exterior',
        name: 'Exterior Paint (Per Sq Ft, with Materials)',
        desc: 'Full exterior paint job. Power wash, scrape, prime, paint. Per square foot',
        keywords: ['exterior paint', 'paint exterior', 'outside paint', 'house paint', 'siding paint', 'exterior painting'],
        low: 3, high: 7, unit: 'per sq ft',
        includes: ['Power wash', 'Scraping', 'Primer', 'Paint', 'Labor'],
        factors: ['Siding type', 'Condition', 'Number of stories', 'Access']
      },
      {
        id: 'paint_cabinet',
        name: 'Cabinet Painting / Refinishing',
        desc: 'Kitchen or bathroom cabinet painting or refinishing. Per door or per linear foot',
        keywords: ['cabinet', 'cabinets', 'kitchen cabinets', 'bathroom cabinets', 'cabinet paint', 'refinish cabinets', 'cabinet refinishing'],
        low: 30, high: 80, unit: 'per linear foot',
        includes: ['Prep', 'Sand', 'Primer', 'Paint or stain', 'Seal'],
        factors: ['Condition', 'Number of doors', 'Hardware change']
      },
      {
        id: 'paint_deck',
        name: 'Deck Staining / Sealing (Per Sq Ft)',
        desc: 'Clean, sand, stain or seal wooden deck. Protects against weather',
        keywords: ['deck', 'deck staining', 'deck seal', 'stain deck', 'seal deck', 'wood deck', 'patio deck'],
        low: 1.5, high: 4, unit: 'per sq ft',
        includes: ['Power wash', 'Sand', 'Stain or seal', 'Labor'],
        factors: ['Deck condition', 'Square footage', 'Stain vs seal']
      },
      {
        id: 'paint_fence',
        name: 'Fence Staining (Per Linear Foot)',
        desc: 'Stain or seal wooden fence. Extends life, improves appearance',
        keywords: ['fence', 'fence staining', 'stain fence', 'fence paint', 'wood fence', 'fence seal'],
        low: 3, high: 8, unit: 'per linear foot',
        includes: ['Clean', 'Stain or seal', 'Labor'],
        factors: ['Fence condition', 'Type of stain', 'Height']
      },
      {
        id: 'paint_trim',
        name: 'Trim Painting (Per Linear Foot)',
        desc: 'Baseboards, door casings, window trim, crown molding. Per linear foot',
        keywords: ['trim', 'baseboard', 'baseboards', 'casing', 'crown molding', 'molding', 'trim painting', 'door trim'],
        low: 2, high: 6, unit: 'per linear foot',
        includes: ['Fill nail holes', 'Sand', 'Primer', 'Paint', 'Caulk'],
        factors: ['Condition', 'Complexity of profile']
      },
      {
        id: 'paint_ceiling',
        name: 'Ceiling Texture / Popcorn Removal (Per Sq Ft)',
        desc: 'Apply texture or remove popcorn ceiling. Often done before paint',
        keywords: ['ceiling', 'popcorn', 'texture', 'ceiling texture', 'popcorn ceiling', 'skip trowel', 'orange peel'],
        low: 1.5, high: 4, unit: 'per sq ft',
        includes: ['Scraping or texture', 'Skim coat', 'Paint'],
        factors: ['Condition', 'Texture type', 'Height']
      },
      {
        id: 'paint_wallpaper',
        name: 'Wallpaper Removal (Per Sq Ft)',
        desc: 'Strip wallpaper, prep wall for paint. Often requires skim coat',
        keywords: ['wallpaper', 'remove wallpaper', 'strip wallpaper', 'wallpaper removal', 'tear out wallpaper'],
        low: 1, high: 3, unit: 'per sq ft',
        includes: ['Strip', 'Residue removal', 'Wall prep'],
        factors: ['Adhesive type', 'Wall condition after removal']
      },
      {
        id: 'paint_garage',
        name: 'Garage Floor Epoxy (Per Sq Ft)',
        desc: 'Concrete floor coating. Transforms garage floor, easy to clean',
        keywords: ['garage floor', 'epoxy', 'garage epoxy', 'floor epoxy', 'concrete coating', 'garage floor coating'],
        low: 4, high: 10, unit: 'per sq ft',
        includes: ['Floor prep', 'Epoxy coating', 'Non-slip additive', 'Cure time'],
        factors: ['Floor condition', 'Size', 'Decorative flakes']
      }
    ]
  },

  landscaping: {
    name: 'Landscaping',
    icon: '🌿',
    color: '#15803d',
    keywords: ['landscaping', 'landscape', 'lawn', 'sod', 'seed', 'mulch', 'planting', 'plants', 'shrub', 'shrubs', 'tree', 'trees', 'flower', 'flowers', 'bed', 'paver', 'pavers', 'retaining wall', 'wall', 'sprinkler', 'irrigation', 'drainage', 'french drain', 'grading', 'yard'],
    services: [
      {
        id: 'landscape_sod',
        name: 'Sod Installation (Per Sq Ft)',
        desc: 'New lawn via sod installation. Instant results. Soil prep included',
        keywords: ['sod', 'sod install', 'new lawn', 'grass', 'turf', 'lay sod', 'install sod', 'lawn installation'],
        low: 0.8, high: 2.5, unit: 'per sq ft',
        includes: ['Sod', 'Delivery', 'Installation', 'Roller'],
        factors: ['Soil prep needed', 'Size', 'Accessibility']
      },
      {
        id: 'landscape_seed',
        name: 'Lawn Seeding (Per Sq Ft)',
        desc: 'New lawn via seed. Slower than sod, more economical. Includes straw blanket',
        keywords: ['seed', 'seeding', 'hydroseed', 'hydroseeding', 'grass seed', 'lawn seed'],
        low: 0.15, high: 0.5, unit: 'per sq ft',
        includes: ['Seed', 'Straw', 'Starter fertilizer'],
        factors: ['Site prep', 'Irrigation needed', 'Type of seed']
      },
      {
        id: 'landscape_mulch',
        name: 'Mulch Installation (Per Cubic Yard)',
        desc: 'Decorative mulch installation. Bed prep, edging, mulch delivery and spread',
        keywords: ['mulch', 'mulching', 'bark', 'wood mulch', 'mulch install', 'flower bed mulch'],
        low: 45, high: 85, unit: 'per cubic yard',
        includes: ['Mulch', 'Delivery', 'Installation', 'Edging adjustment'],
        factors: ['Mulch type', 'Bed prep', 'Depth']
      },
      {
        id: 'landscape_planting_small',
        name: 'Planting - Small Shrub (1 Gallon)',
        desc: 'Install 1-gallon shrubs. Most common size for foundation plantings',
        keywords: ['shrub', 'shrubs', 'plant', 'planting', 'bush', 'bushes', '1 gallon', 'small shrub'],
        low: 30, high: 65, unit: 'per plant',
        includes: ['Plant', 'Hole prep', 'Backfill', 'Root stimulant'],
        factors: ['Soil condition', 'Quantity', 'Accessibility']
      },
      {
        id: 'landscape_planting_medium',
        name: 'Planting - Medium Shrub (3 Gallon)',
        desc: 'Install 3-gallon shrubs. More established, immediate impact',
        keywords: ['3 gallon', 'medium shrub', 'larger shrub', 'established shrub'],
        low: 50, high: 100, unit: 'per plant',
        includes: ['Plant', 'Hole prep', 'Backfill', 'Root stimulant'],
        factors: ['Quantity', 'Accessibility']
      },
      {
        id: 'landscape_planting_tree',
        name: 'Tree Planting (15-25 Gallon)',
        desc: 'Install balled-and-burlapped trees. 15-25 gallon size for residential',
        keywords: ['tree planting', 'plant tree', 'new tree', 'ornamental tree', 'shade tree', 'tree install'],
        low: 150, high: 400, unit: 'per tree',
        includes: ['Tree', 'Hole prep', 'Staking', 'Root stimulant', 'Mulch ring'],
        factors: ['Tree size', 'Delivery', 'Accessibility for equipment']
      },
      {
        id: 'landscape_paver',
        name: 'Paver Patio Installation (Per Sq Ft)',
        desc: 'Interlocking concrete or brick pavers. Includes base, edge restraint, sand',
        keywords: ['paver', 'pavers', 'patio', 'paver patio', 'brick patio', 'paved patio', 'hardscape'],
        low: 12, high: 30, unit: 'per sq ft',
        includes: ['Excavation', 'Base material', 'Paver', 'Edge restraint', 'Polymeric sand'],
        factors: ['Base conditions', 'Pattern complexity', 'Drainage']
      },
      {
        id: 'landscape_retaining',
        name: 'Retaining Wall (Per Sq Ft)',
        desc: 'Segmental block retaining wall. For slopes, terracing, erosion control',
        keywords: ['retaining wall', 'block wall', 'segmental wall', 'slope', 'terrace', 'erosion'],
        low: 20, high: 55, unit: 'per sq ft',
        includes: ['Block', 'Drainage', 'Compacted base', 'Geogrid if needed'],
        factors: ['Height', 'Soil conditions', 'Drainage requirements']
      },
      {
        id: 'landscape_sprinkler',
        name: 'Sprinkler System Installation (Per Zone)',
        desc: 'In-ground irrigation system. Per zone. Automatic controller included',
        keywords: ['sprinkler', 'irrigation', 'sprinkler system', 'in-ground', 'lawn irrigation', 'automatic sprinkler'],
        low: 350, high: 800, unit: 'per zone',
        includes: ['Heads', 'Pipe', 'Controller', 'Timer', 'Backflow preventer'],
        factors: ['Zone size', 'Head count', 'Existing landscaping']
      },
      {
        id: 'landscape_french_drain',
        name: 'French Drain Installation',
        desc: 'Subsurface drainage system. Solves standing water, basement seepage',
        keywords: ['french drain', 'drainage', 'drain', 'standing water', 'soggy yard', 'basement water', 'water drainage'],
        low: 800, high: 2500, unit: 'per job',
        includes: ['Excavation', 'Pipe', ' Gravel', 'Filter fabric', 'Outlet'],
        factors: ['Length', 'Depth', 'Outlet availability']
      }
    ]
  },

  cleaning: {
    name: 'Cleaning Services',
    icon: '✨',
    color: '#0891b2',
    keywords: ['cleaning', 'clean', 'cleaner', 'house cleaning', 'maid', 'maidservice', 'deep clean', 'move out', 'move in', 'construction clean', 'window', 'windows', 'carpet', 'upholstery', 'pressure wash', 'pressure washing', 'gutter', 'gutters', 'office'],
    services: [
      {
        id: 'clean_house',
        name: 'Standard House Cleaning (Per Sq Ft)',
        desc: 'Regular maintenance cleaning. Dust, vacuum, mop, bathrooms, kitchen',
        keywords: ['house cleaning', 'cleaning', 'maid', 'regular cleaning', 'weekly cleaning', 'biweekly', 'monthly cleaning'],
        low: 0.08, high: 0.18, unit: 'per sq ft',
        includes: ['All surfaces', 'Floors', 'Bathrooms', 'Kitchen', 'Dusting'],
        factors: ['Home size', 'Clutter level', 'Condition']
      },
      {
        id: 'clean_deep',
        name: 'Deep House Cleaning (Per Sq Ft)',
        desc: 'Thorough top-to-bottom cleaning. Behind furniture, inside appliances, baseboards',
        keywords: ['deep clean', 'deep cleaning', 'thorough cleaning', 'top to bottom', 'intensive clean'],
        low: 0.15, high: 0.35, unit: 'per sq ft',
        includes: ['Everything in standard', 'Behind furniture', 'Baseboards', 'Inside appliances', 'Light fixtures'],
        factors: ['Home condition', 'Size', 'Time since last clean']
      },
      {
        id: 'clean_move',
        name: 'Move-In / Move-Out Clean',
        desc: 'Real estate turnover cleaning. Ensures property is show-ready for new occupant',
        keywords: ['move in', 'move out', 'movein', 'moveout', 'turnover', 'real estate clean', 'rental clean'],
        low: 250, high: 800, unit: 'per job',
        includes: ['Full deep clean', 'Inside all cabinets', 'Inside appliances', 'Garage sweep'],
        factors: ['Home size', 'Condition', 'Time allocated']
      },
      {
        id: 'clean_window',
        name: 'Window Cleaning (Interior/Exterior, Per Pane)',
        desc: 'Inside and outside window cleaning. Per individual pane (one side = one pane)',
        keywords: ['window', 'windows', 'window cleaning', 'clean windows', 'glass cleaning', 'window wash'],
        low: 3, high: 8, unit: 'per pane',
        includes: ['Interior', 'Exterior', 'Screen cleaning', 'Track cleaning'],
        factors: ['Height', 'Accessibility', 'Condition']
      },
      {
        id: 'clean_carpet',
        name: 'Carpet Cleaning (Per Room)',
        desc: 'Professional carpet cleaning. Hot water extraction (steam clean)',
        keywords: ['carpet', 'carpet cleaning', 'steam clean', 'clean carpet', 'deep clean carpet'],
        low: 80, high: 200, unit: 'per room',
        includes: ['Pre-treatment', 'Hot water extraction', 'Deodorizer', 'Quick dry'],
        factors: ['Room size', 'Soil level', 'Stain treatment']
      },
      {
        id: 'clean_pressure_siding',
        name: 'Pressure Washing - Siding (Per Sq Ft)',
        desc: 'Exterior siding cleaning. Removes mold, algae, dirt, oxidation',
        keywords: ['pressure wash', 'pressure washing', 'siding', 'house wash', 'exterior clean', 'power wash'],
        low: 0.5, high: 1.2, unit: 'per sq ft',
        includes: ['Detergent application', 'Pressure wash', 'Rinse'],
        factors: ['Siding type', 'Height', 'Soil level']
      },
      {
        id: 'clean_pressure_driveway',
        name: 'Pressure Washing - Driveway/Concrete (Per Sq Ft)',
        desc: 'Concrete and asphalt cleaning. Removes stains, oil, mildew, dirt',
        keywords: ['driveway', 'concrete', 'parking pad', 'slab', 'garage floor', 'patio concrete'],
        low: 0.25, high: 0.6, unit: 'per sq ft',
        includes: ['Pre-treatment', 'Hot pressure', 'Surface prep'],
        factors: ['Surface type', 'Stain severity', 'Sealant after']
      },
      {
        id: 'clean_gutter',
        name: 'Gutter Cleaning (Per Linear Foot)',
        desc: 'Clean debris from gutters and downspouts. Flush to ensure proper flow',
        keywords: ['gutter', 'gutters', 'gutter cleaning', 'clean gutters', 'clear gutters'],
        low: 1, high: 3, unit: 'per linear foot',
        includes: ['Debris removal', 'Flushing', 'Downspout check', 'Bag debris'],
        factors: ['Height', 'Debris amount', 'Frequency']
      },
      {
        id: 'clean_office',
        name: 'Office Cleaning (Per Visit)',
        desc: 'Regular commercial office cleaning. Per visit or per month contract',
        keywords: ['office', 'office cleaning', 'commercial clean', 'business cleaning', 'workplace clean'],
        low: 150, high: 600, unit: 'per visit',
        includes: ['All surfaces', 'Restrooms', 'Kitchen', 'Floors', 'Trash'],
        factors: ['Sq ft', 'Employees', 'Special requirements']
      }
    ]
  },

  handyman: {
    name: 'Handyman / General Repair',
    icon: '🔧',
    color: '#9a3412',
    keywords: ['handyman', 'handyman', 'general repair', 'repair', 'fix', 'fixing', 'maintenance', 'drywall', 'patch', 'door', 'doors', 'window', 'windows', 'hardware', 'mount', 'mounting', 'furniture', 'assemble', 'assembly', 'tv', 'shelf', 'shelves'],
    services: [
      {
        id: 'handyman_hourly',
        name: 'Handyman Labor (Hourly Rate)',
        desc: 'General handyman labor. Most jobs charged by the hour',
        keywords: ['handyman', 'hourly', 'per hour', 'general labor', 'maintenance'],
        low: 60, high: 125, unit: 'per hour',
        includes: ['Labor'],
        factors: ['Skill level needed', 'Job complexity', 'Travel time']
      },
      {
        id: 'handyman_drywall',
        name: 'Drywall Repair (Per Patch)',
        desc: 'Patch small to medium drywall holes. Nail holes to fist-sized holes',
        keywords: ['drywall', 'patch', 'hole', 'patch wall', 'fix wall', 'sheetrock', 'wall repair'],
        low: 75, high: 250, unit: 'per patch',
        includes: ['Patch', 'Tape', 'Mud', 'Sand', 'Prime', 'Texture match'],
        factors: ['Hole size', 'Location', 'Texture complexity']
      },
      {
        id: 'handyman_drywall_sheet',
        name: 'Drywall Repair (Per Sheet)',
        desc: 'Replace full drywall sheet. For large damage areas',
        keywords: ['large drywall', 'big hole', 'sheet drywall', 'replace drywall'],
        low: 150, high: 400, unit: 'per sheet',
        includes: ['Drywall', 'Tape', 'Mud', 'Sand', 'Prime', 'Texture'],
        factors: ['Location', 'Access', 'Ceiling']
      },
      {
        id: 'handyman_door',
        name: 'Door Installation',
        desc: 'Interior or exterior door installation. Prehung or slab',
        keywords: ['door', 'doors', 'door install', 'replace door', 'new door', 'install door'],
        low: 100, high: 350, unit: 'per door',
        includes: ['Door', 'Hinges', 'Handle', 'Labor'],
        factors: ['Door type', 'Frame condition', 'Prehung vs slab']
      },
      {
        id: 'handyman_door_hardware',
        name: 'Door Hardware Replacement',
        desc: 'Replace doorknobs, handles, hinges, strikes. Quick fixes',
        keywords: ['doorknob', 'handle', 'hinge', 'door knob', 'hardware', 'door handle', 'latch'],
        low: 50, high: 150, unit: 'per door',
        includes: ['Hardware', 'Installation'],
        factors: ['Type of hardware']
      },
      {
        id: 'handyman_window',
        name: 'Window Replacement (Standard)',
        desc: 'Replace standard single/double-hung window. Insert or full frame',
        keywords: ['window', 'window replace', 'replace window', 'new window', 'window installation'],
        low: 200, high: 600, unit: 'per window',
        includes: ['Window', 'Labor', 'Flashing', 'Interior trim'],
        factors: ['Window size', 'Frame condition', 'Number of panes']
      },
      {
        id: 'handyman_tv_mount',
        name: 'TV Mount Installation',
        desc: 'Wall mount TV. Includes electrical and cable management',
        keywords: ['tv mount', 'mount tv', 'wall mount', 'tv installation', 'flat screen mount', 'hang tv'],
        low: 75, high: 200, unit: 'per unit',
        includes: ['Mount', 'Labor', 'Cable management', 'Wall scan'],
        factors: ['TV size', 'Wall type', 'Hide wires']
      },
      {
        id: 'handyman_furniture',
        name: 'Furniture Assembly',
        desc: 'Assemble flat-pack furniture. IKEA, Wayfair, Amazon, etc.',
        keywords: ['furniture', 'assemble', 'assembly', 'ikea', 'build furniture', 'put together', 'flat pack'],
        low: 60, high: 150, unit: 'per hour',
        includes: ['Labor'],
        factors: ['Piece complexity', 'Number of pieces']
      },
      {
        id: 'handyman_shelf',
        name: 'Shelving / Storage Installation',
        desc: 'Install shelving units, closet systems, garage storage',
        keywords: ['shelf', 'shelves', 'shelving', 'closet', 'storage', 'garage storage', 'wall shelf', 'floating shelf'],
        low: 50, high: 200, unit: 'per unit',
        includes: ['Materials (if provided)', 'Installation', 'Leveling'],
        factors: ['Shelf length', 'Wall type', 'Weight capacity']
      }
    ]
  },

  general: {
    name: 'General Service',
    icon: '🔨',
    color: '#475569',
    keywords: ['hourly', 'estimate', 'consultation', 'trip charge', 'service call', 'emergency', 'after hours', 'permit', 'dumpster', 'debris', 'removal', 'rental', 'equipment'],
    services: [
      {
        id: 'gen_hourly',
        name: 'General Labor (Hourly Rate)',
        desc: 'General labor for misc tasks. Helper rate or semi-skilled work',
        keywords: ['labor', 'hourly', 'per hour', 'general labor', 'helper'],
        low: 65, high: 150, unit: 'per hour',
        includes: ['Labor'],
        factors: ['Skill level', 'Task complexity']
      },
      {
        id: 'gen_estimate',
        name: 'Consultation / Estimate',
        desc: 'On-site assessment and written estimate. May be credited to job',
        keywords: ['estimate', 'consultation', 'assessment', 'quote', 'look at', 'evaluate', 'appraisal'],
        low: 0, high: 150, unit: 'per visit',
        includes: ['Site visit', 'Written estimate', 'Photos', 'Recommendations'],
        factors: ['Drive time', 'Complexity of assessment']
      },
      {
        id: 'gen_trip',
        name: 'Trip Charge / Service Call',
        desc: 'Minimum charge for coming to your location. Applied to repair costs',
        keywords: ['trip charge', 'service call', 'trip fee', 'diagnostic', 'visit fee'],
        low: 50, high: 150, unit: 'per visit',
        includes: ['Diagnostic', 'Trip', 'Minimum charge'],
        factors: ['Distance', 'Time of day']
      },
      {
        id: 'gen_emergency',
        name: 'After-Hours / Emergency Rate',
        desc: 'Emergency or after-hours service. Weekends, nights, holidays',
        keywords: ['emergency', 'urgent', 'after hours', 'night', 'weekend', 'holiday', 'immediate'],
        low: 125, high: 300, unit: 'per hour',
        includes: ['Labor'],
        factors: ['Time', 'Urgency', 'Nature of emergency']
      },
      {
        id: 'gen_permit',
        name: 'Permit Acquisition',
        desc: 'Pull construction or trade permits on behalf of homeowner',
        keywords: ['permit', 'permits', 'pull permit', 'city permit', 'building permit'],
        low: 50, high: 300, unit: 'per permit',
        includes: ['Application', 'Inspection scheduling', 'Follow-up'],
        factors: ['Permit type', 'Jurisdiction complexity']
      },
      {
        id: 'gen_dumpster',
        name: 'Dumpster / Debris Removal',
        desc: 'Roll-off dumpster rental or debris hauling. Per load or per day',
        keywords: ['dumpster', 'debris', 'junk', 'trash', 'removal', 'hauling', 'cleanup', 'demo debris'],
        low: 200, high: 800, unit: 'per job',
        includes: ['Delivery', 'Rental period', 'Disposal'],
        factors: ['Size', 'Duration', 'Type of debris']
      },
      {
        id: 'gen_equipment',
        name: 'Equipment Rental (Per Day)',
        desc: 'Specialized equipment rental. Dozer, mini-excavator, lift, etc.',
        keywords: ['rental', 'equipment', 'machine', 'boom lift', 'scissor lift', 'excavator', 'mini excavator'],
        low: 50, high: 500, unit: 'per day',
        includes: ['Machine', 'Delivery', 'Operator (if needed)'],
        factors: ['Equipment type', 'Duration', 'Operator']
      }
    ]
  }
};

// ============================================
// REGIONAL MULTIPLIERS
// ============================================

/**
 * Regional cost-of-living multipliers by ZIP prefix
 * 1.00 = national average
 * Higher = more expensive region
 * Lower = less expensive region
 * 
 * Data sources: BLS Cost-of-Living Index, Homewyse regional data
 */
const REGIONAL_MULTIPLIERS = {
  // Texas
  '770': { city: 'Houston', state: 'TX', multiplier: 0.97, costIndex: 95 },
  '771': { city: 'Houston', state: 'TX', multiplier: 0.97, costIndex: 95 },
  '772': { city: 'Houston', state: 'TX', multiplier: 0.97, costIndex: 95 },
  '773': { city: 'Houston NW', state: 'TX', multiplier: 0.95, costIndex: 93 },
  '774': { city: 'Houston SW', state: 'TX', multiplier: 0.98, costIndex: 96 },
  '775': { city: 'Galveston', state: 'TX', multiplier: 0.99, costIndex: 97 },
  '750': { city: 'Dallas', state: 'TX', multiplier: 0.98, costIndex: 96 },
  '751': { city: 'Dallas', state: 'TX', multiplier: 0.98, costIndex: 96 },
  '752': { city: 'Dallas', state: 'TX', multiplier: 0.99, costIndex: 97 },
  '782': { city: 'San Antonio', state: 'TX', multiplier: 0.91, costIndex: 89 },
  '761': { city: 'Fort Worth', state: 'TX', multiplier: 0.95, costIndex: 93 },
  '760': { city: 'Arlington', state: 'TX', multiplier: 0.96, costIndex: 94 },
  '785': { city: 'McAllen', state: 'TX', multiplier: 0.85, costIndex: 83 },
  '767': { city: 'Waco', state: 'TX', multiplier: 0.87, costIndex: 85 },
  '768': { city: 'Rural TX', state: 'TX', multiplier: 0.83, costIndex: 81 },

  // California
  '900': { city: 'Los Angeles', state: 'CA', multiplier: 1.42, costIndex: 139 },
  '901': { city: 'Los Angeles', state: 'CA', multiplier: 1.42, costIndex: 139 },
  '902': { city: 'Los Angeles', state: 'CA', multiplier: 1.44, costIndex: 141 },
  '903': { city: 'Los Angeles', state: 'CA', multiplier: 1.42, costIndex: 139 },
  '904': { city: 'Los Angeles', state: 'CA', multiplier: 1.45, costIndex: 142 },
  '905': { city: 'Torrance', state: 'CA', multiplier: 1.43, costIndex: 140 },
  '906': { city: 'Long Beach', state: 'CA', multiplier: 1.40, costIndex: 137 },
  '907': { city: 'LA South Bay', state: 'CA', multiplier: 1.39, costIndex: 136 },
  '908': { city: 'Long Beach', state: 'CA', multiplier: 1.40, costIndex: 137 },
  '909': { city: 'San Bernardino', state: 'CA', multiplier: 1.32, costIndex: 129 },
  '910': { city: 'Pasadena', state: 'CA', multiplier: 1.44, costIndex: 141 },
  '911': { city: 'Pasadena', state: 'CA', multiplier: 1.44, costIndex: 141 },
  '912': { city: 'Glendale', state: 'CA', multiplier: 1.43, costIndex: 140 },
  '913': { city: 'San Fernando Valley', state: 'CA', multiplier: 1.41, costIndex: 138 },
  '914': { city: 'San Fernando Valley', state: 'CA', multiplier: 1.41, costIndex: 138 },
  '915': { city: 'Burbank', state: 'CA', multiplier: 1.43, costIndex: 140 },
  '916': { city: 'No. Hollywood', state: 'CA', multiplier: 1.41, costIndex: 138 },
  '917': { city: 'Inland Empire', state: 'CA', multiplier: 1.32, costIndex: 129 },
  '918': { city: 'Inland Empire', state: 'CA', multiplier: 1.32, costIndex: 129 },
  '920': { city: 'San Diego', state: 'CA', multiplier: 1.38, costIndex: 135 },
  '921': { city: 'San Diego', state: 'CA', multiplier: 1.38, costIndex: 135 },
  '930': { city: 'Ventura', state: 'CA', multiplier: 1.40, costIndex: 137 },
  '931': { city: 'Santa Barbara', state: 'CA', multiplier: 1.48, costIndex: 145 },
  '940': { city: 'San Francisco', state: 'CA', multiplier: 1.65, costIndex: 162 },
  '941': { city: 'San Francisco', state: 'CA', multiplier: 1.65, costIndex: 162 },
  '942': { city: 'Sacramento', state: 'CA', multiplier: 1.28, costIndex: 125 },
  '943': { city: 'Palo Alto', state: 'CA', multiplier: 1.68, costIndex: 165 },
  '944': { city: 'San Mateo', state: 'CA', multiplier: 1.65, costIndex: 162 },
  '945': { city: 'East Bay', state: 'CA', multiplier: 1.48, costIndex: 145 },
  '946': { city: 'Oakland', state: 'CA', multiplier: 1.52, costIndex: 149 },
  '947': { city: 'Berkeley', state: 'CA', multiplier: 1.55, costIndex: 152 },
  '948': { city: 'Richmond', state: 'CA', multiplier: 1.48, costIndex: 145 },
  '949': { city: 'Marin County', state: 'CA', multiplier: 1.60, costIndex: 157 },
  '950': { city: 'San Jose', state: 'CA', multiplier: 1.58, costIndex: 155 },
  '951': { city: 'San Jose', state: 'CA', multiplier: 1.58, costIndex: 155 },
  '952': { city: 'Stockton', state: 'CA', multiplier: 1.18, costIndex: 116 },
  '953': { city: 'Modesto', state: 'CA', multiplier: 1.16, costIndex: 114 },
  '954': { city: 'Santa Rosa', state: 'CA', multiplier: 1.38, costIndex: 135 },
  '955': { city: 'Eureka', state: 'CA', multiplier: 1.25, costIndex: 123 },
  '956': { city: 'Sacramento', state: 'CA', multiplier: 1.28, costIndex: 125 },
  '958': { city: 'Sacramento', state: 'CA', multiplier: 1.28, costIndex: 125 },
  '959': { city: 'Chico', state: 'CA', multiplier: 1.14, costIndex: 112 },
  '960': { city: 'Redding', state: 'CA', multiplier: 1.15, costIndex: 113 },
  '961': { city: 'Reno', state: 'CA', multiplier: 1.22, costIndex: 119 },

  // Florida
  '320': { city: 'Jacksonville', state: 'FL', multiplier: 0.97, costIndex: 95 },
  '321': { city: 'Daytona', state: 'FL', multiplier: 0.98, costIndex: 96 },
  '322': { city: 'Jacksonville', state: 'FL', multiplier: 0.97, costIndex: 95 },
  '323': { city: 'Tallahassee', state: 'FL', multiplier: 0.94, costIndex: 92 },
  '324': { city: 'Panama City', state: 'FL', multiplier: 0.93, costIndex: 91 },
  '325': { city: 'Pensacola', state: 'FL', multiplier: 0.92, costIndex: 90 },
  '326': { city: 'Gainesville', state: 'FL', multiplier: 0.96, costIndex: 94 },
  '327': { city: 'Orlando', state: 'FL', multiplier: 1.03, costIndex: 101 },
  '328': { city: 'Orlando', state: 'FL', multiplier: 1.04, costIndex: 102 },
  '329': { city: 'Melbourne', state: 'FL', multiplier: 1.01, costIndex: 99 },
  '330': { city: 'Miami', state: 'FL', multiplier: 1.18, costIndex: 116 },
  '331': { city: 'Miami', state: 'FL', multiplier: 1.18, costIndex: 116 },
  '332': { city: 'Miami', state: 'FL', multiplier: 1.17, costIndex: 115 },
  '333': { city: 'Fort Lauderdale', state: 'FL', multiplier: 1.15, costIndex: 113 },
  '334': { city: 'West Palm Beach', state: 'FL', multiplier: 1.14, costIndex: 112 },
  '335': { city: 'Tampa', state: 'FL', multiplier: 1.02, costIndex: 100 },
  '336': { city: 'Tampa', state: 'FL', multiplier: 1.02, costIndex: 100 },
  '337': { city: 'St. Petersburg', state: 'FL', multiplier: 1.01, costIndex: 99 },
  '338': { city: 'Lakeland', state: 'FL', multiplier: 0.97, costIndex: 95 },
  '339': { city: 'Fort Myers', state: 'FL', multiplier: 1.04, costIndex: 102 },
  '341': { city: 'Naples', state: 'FL', multiplier: 1.15, costIndex: 113 },

  // New York
  '100': { city: 'Manhattan', state: 'NY', multiplier: 1.78, costIndex: 175 },
  '101': { city: 'Manhattan', state: 'NY', multiplier: 1.78, costIndex: 175 },
  '102': { city: 'Manhattan', state: 'NY', multiplier: 1.78, costIndex: 175 },
  '103': { city: 'Staten Island', state: 'NY', multiplier: 1.52, costIndex: 149 },
  '104': { city: 'Bronx', state: 'NY', multiplier: 1.48, costIndex: 145 },
  '105': { city: 'Westchester', state: 'NY', multiplier: 1.55, costIndex: 152 },
  '106': { city: 'Westchester', state: 'NY', multiplier: 1.55, costIndex: 152 },
  '107': { city: 'Westchester', state: 'NY', multiplier: 1.53, costIndex: 150 },
  '108': { city: 'Westchester', state: 'NY', multiplier: 1.52, costIndex: 149 },
  '109': { city: 'Rockland', state: 'NY', multiplier: 1.48, costIndex: 145 },
  '110': { city: 'Queens', state: 'NY', multiplier: 1.55, costIndex: 152 },
  '111': { city: 'Queens', state: 'NY', multiplier: 1.55, costIndex: 152 },
  '112': { city: 'Brooklyn', state: 'NY', multiplier: 1.58, costIndex: 155 },
  '113': { city: 'Queens', state: 'NY', multiplier: 1.53, costIndex: 150 },
  '114': { city: 'Queens', state: 'NY', multiplier: 1.50, costIndex: 147 },
  '115': { city: 'Nassau', state: 'NY', multiplier: 1.48, costIndex: 145 },
  '116': { city: 'Nassau', state: 'NY', multiplier: 1.47, costIndex: 144 },
  '117': { city: 'Suffolk', state: 'NY', multiplier: 1.45, costIndex: 142 },
  '118': { city: 'Suffolk', state: 'NY', multiplier: 1.44, costIndex: 141 },
  '119': { city: 'Suffolk', state: 'NY', multiplier: 1.45, costIndex: 142 },
  '120': { city: 'Albany', state: 'NY', multiplier: 1.10, costIndex: 108 },
  '121': { city: 'Schenectady', state: 'NY', multiplier: 1.08, costIndex: 106 },
  '122': { city: 'Albany', state: 'NY', multiplier: 1.10, costIndex: 108 },
  '123': { city: 'Schenectady', state: 'NY', multiplier: 1.08, costIndex: 106 },
  '124': { city: 'Hudson Valley', state: 'NY', multiplier: 1.18, costIndex: 116 },
  '125': { city: 'Hudson Valley', state: 'NY', multiplier: 1.18, costIndex: 116 },
  '126': { city: 'Poughkeepsie', state: 'NY', multiplier: 1.15, costIndex: 113 },
  '127': { city: 'Sullivan', state: 'NY', multiplier: 1.05, costIndex: 103 },
  '128': { city: 'Saratoga', state: 'NY', multiplier: 1.12, costIndex: 110 },
  '129': { city: 'Plattsburgh', state: 'NY', multiplier: 1.05, costIndex: 103 },
  '130': { city: 'Syracuse', state: 'NY', multiplier: 1.02, costIndex: 100 },
  '131': { city: 'Syracuse', state: 'NY', multiplier: 1.02, costIndex: 100 },
  '132': { city: 'Syracuse', state: 'NY', multiplier: 1.02, costIndex: 100 },
  '133': { city: 'Utica', state: 'NY', multiplier: 0.97, costIndex: 95 },
  '134': { city: 'Utica', state: 'NY', multiplier: 0.97, costIndex: 95 },
  '135': { city: 'Rome', state: 'NY', multiplier: 0.96, costIndex: 94 },
  '136': { city: 'Watertown', state: 'NY', multiplier: 0.95, costIndex: 93 },
  '137': { city: 'Binghamton', state: 'NY', multiplier: 0.98, costIndex: 96 },
  '138': { city: 'Binghamton', state: 'NY', multiplier: 0.98, costIndex: 96 },
  '139': { city: 'Binghamton', state: 'NY', multiplier: 0.98, costIndex: 96 },
  '140': { city: 'Buffalo', state: 'NY', multiplier: 1.01, costIndex: 99 },
  '141': { city: 'Buffalo', state: 'NY', multiplier: 1.01, costIndex: 99 },
  '142': { city: 'Buffalo', state: 'NY', multiplier: 1.01, costIndex: 99 },
  '143': { city: 'Buffalo', state: 'NY', multiplier: 1.01, costIndex: 99 },
  '144': { city: 'Rochester', state: 'NY', multiplier: 1.03, costIndex: 101 },
  '145': { city: 'Rochester', state: 'NY', multiplier: 1.03, costIndex: 101 },
  '146': { city: 'Rochester', state: 'NY', multiplier: 1.03, costIndex: 101 },
  '147': { city: 'Olean', state: 'NY', multiplier: 0.96, costIndex: 94 },
  '148': { city: 'Ithaca', state: 'NY', multiplier: 1.05, costIndex: 103 },
  '149': { city: 'Elmira', state: 'NY', multiplier: 0.97, costIndex: 95 },

  // Georgia
  '300': { city: 'Atlanta Metro', state: 'GA', multiplier: 1.04, costIndex: 102 },
  '301': { city: 'Atlanta Metro', state: 'GA', multiplier: 1.04, costIndex: 102 },
  '302': { city: 'Atlanta Metro', state: 'GA', multiplier: 1.03, costIndex: 101 },
  '303': { city: 'Atlanta', state: 'GA', multiplier: 1.05, costIndex: 103 },
  '304': { city: 'Savannah', state: 'GA', multiplier: 1.00, costIndex: 98 },
  '305': { city: 'Gainesville', state: 'GA', multiplier: 1.01, costIndex: 99 },
  '306': { city: 'Athens', state: 'GA', multiplier: 1.02, costIndex: 100 },
  '307': { city: 'Rome', state: 'GA', multiplier: 0.94, costIndex: 92 },
  '308': { city: 'Augusta', state: 'GA', multiplier: 0.96, costIndex: 94 },
  '309': { city: 'Augusta', state: 'GA', multiplier: 0.96, costIndex: 94 },
  '310': { city: 'Macon', state: 'GA', multiplier: 0.94, costIndex: 92 },
  '312': { city: 'Macon', state: 'GA', multiplier: 0.94, costIndex: 92 },
  '314': { city: 'Savannah', state: 'GA', multiplier: 1.00, costIndex: 98 },
  '315': { city: 'Brunswick', state: 'GA', multiplier: 0.97, costIndex: 95 },
  '316': { city: 'Valdosta', state: 'GA', multiplier: 0.91, costIndex: 89 },
  '317': { city: 'Albany', state: 'GA', multiplier: 0.90, costIndex: 88 },
  '318': { city: 'Columbus', state: 'GA', multiplier: 0.93, costIndex: 91 },
  '319': { city: 'Columbus', state: 'GA', multiplier: 0.93, costIndex: 91 },
  '398': { city: 'Columbus', state: 'GA', multiplier: 0.93, costIndex: 91 },
  '399': { city: 'Atlanta', state: 'GA', multiplier: 1.05, costIndex: 103 },

  // North Carolina
  '270': { city: 'Winston-Salem', state: 'NC', multiplier: 0.96, costIndex: 94 },
  '271': { city: 'Winston-Salem', state: 'NC', multiplier: 0.96, costIndex: 94 },
  '272': { city: 'Greensboro', state: 'NC', multiplier: 0.97, costIndex: 95 },
  '273': { city: 'Greensboro', state: 'NC', multiplier: 0.97, costIndex: 95 },
  '274': { city: 'Greensboro', state: 'NC', multiplier: 0.97, costIndex: 95 },
  '275': { city: 'Raleigh', state: 'NC', multiplier: 1.04, costIndex: 102 },
  '276': { city: 'Raleigh', state: 'NC', multiplier: 1.04, costIndex: 102 },
  '277': { city: 'Durham', state: 'NC', multiplier: 1.05, costIndex: 103 },
  '278': { city: 'Rocky Mount', state: 'NC', multiplier: 0.95, costIndex: 93 },
  '279': { city: 'Elizabeth City', state: 'NC', multiplier: 0.95, costIndex: 93 },
  '280': { city: 'Charlotte', state: 'NC', multiplier: 1.03, costIndex: 101 },
  '281': { city: 'Charlotte', state: 'NC', multiplier: 1.03, costIndex: 101 },
  '282': { city: 'Charlotte', state: 'NC', multiplier: 1.04, costIndex: 102 },
  '283': { city: 'Fayetteville', state: 'NC', multiplier: 0.96, costIndex: 94 },
  '284': { city: 'Wilmington', state: 'NC', multiplier: 1.01, costIndex: 99 },
  '285': { city: 'Jacksonville', state: 'NC', multiplier: 0.98, costIndex: 96 },
  '286': { city: 'Boone', state: 'NC', multiplier: 1.02, costIndex: 100 },
  '287': { city: 'Asheville', state: 'NC', multiplier: 1.05, costIndex: 103 },
  '288': { city: 'Asheville', state: 'NC', multiplier: 1.05, costIndex: 103 },
  '289': { city: 'Murphy', state: 'NC', multiplier: 0.94, costIndex: 92 },

  // Illinois
  '600': { city: 'Chicago North', state: 'IL', multiplier: 1.22, costIndex: 120 },
  '601': { city: 'Chicago NW', state: 'IL', multiplier: 1.20, costIndex: 118 },
  '602': { city: 'Chicago North', state: 'IL', multiplier: 1.22, costIndex: 120 },
  '603': { city: 'Chicago North', state: 'IL', multiplier: 1.21, costIndex: 119 },
  '604': { city: 'Chicago South', state: 'IL', multiplier: 1.15, costIndex: 113 },
  '605': { city: 'Chicago West', state: 'IL', multiplier: 1.18, costIndex: 116 },
  '606': { city: 'Chicago', state: 'IL', multiplier: 1.25, costIndex: 123 },
  '607': { city: 'Chicago', state: 'IL', multiplier: 1.22, costIndex: 120 },
  '608': { city: 'Chicago', state: 'IL', multiplier: 1.18, costIndex: 116 },
  '609': { city: 'Kankakee', state: 'IL', multiplier: 1.08, costIndex: 106 },
  '610': { city: 'Rockford', state: 'IL', multiplier: 1.05, costIndex: 103 },
  '611': { city: 'Rockford', state: 'IL', multiplier: 1.05, costIndex: 103 },
  '612': { city: 'Moline', state: 'IL', multiplier: 1.03, costIndex: 101 },
  '613': { city: 'LaSalle', state: 'IL', multiplier: 1.02, costIndex: 100 },
  '614': { city: 'Galesburg', state: 'IL', multiplier: 0.98, costIndex: 96 },
  '615': { city: 'Peoria', state: 'IL', multiplier: 1.00, costIndex: 98 },
  '616': { city: 'Peoria', state: 'IL', multiplier: 1.00, costIndex: 98 },
  '617': { city: 'Bloomington', state: 'IL', multiplier: 1.04, costIndex: 102 },
  '618': { city: 'Champaign', state: 'IL', multiplier: 1.03, costIndex: 101 },
  '619': { city: 'Decatur', state: 'IL', multiplier: 1.00, costIndex: 98 },
  '620': { city: 'Alton', state: 'IL', multiplier: 1.02, costIndex: 100 },
  '622': { city: 'St. Louis Metro (IL)', state: 'IL', multiplier: 1.03, costIndex: 101 },
  '623': { city: 'Quincy', state: 'IL', multiplier: 0.97, costIndex: 95 },
  '624': { city: 'Effingham', state: 'IL', multiplier: 0.96, costIndex: 94 },
  '625': { city: 'Springfield', state: 'IL', multiplier: 1.02, costIndex: 100 },
  '626': { city: 'Jacksonville', state: 'IL', multiplier: 0.98, costIndex: 96 },
  '627': { city: 'Springfield', state: 'IL', multiplier: 1.02, costIndex: 100 },
  '628': { city: 'Carbondale', state: 'IL', multiplier: 0.98, costIndex: 96 },
  '629': { city: 'Cairo', state: 'IL', multiplier: 0.94, costIndex: 92 },

  // Pennsylvania
  '150': { city: 'Pittsburgh', state: 'PA', multiplier: 1.03, costIndex: 101 },
  '151': { city: 'Pittsburgh', state: 'PA', multiplier: 1.03, costIndex: 101 },
  '152': { city: 'Pittsburgh', state: 'PA', multiplier: 1.03, costIndex: 101 },
  '153': { city: 'Greensburg', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '154': { city: 'Uniontown', state: 'PA', multiplier: 0.97, costIndex: 95 },
  '155': { city: 'Somerset', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '156': { city: 'Jeannette', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '157': { city: 'Indiana', state: 'PA', multiplier: 0.96, costIndex: 94 },
  '158': { city: 'DuBois', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '159': { city: 'Johnstown', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '160': { city: 'Butler', state: 'PA', multiplier: 0.98, costIndex: 96 },
  '161': { city: 'New Castle', state: 'PA', multiplier: 0.96, costIndex: 94 },
  '162': { city: 'Kittanning', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '163': { city: 'Oil City', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '164': { city: 'Erie', state: 'PA', multiplier: 0.98, costIndex: 96 },
  '165': { city: 'Erie', state: 'PA', multiplier: 0.98, costIndex: 96 },
  '166': { city: 'Altoona', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '167': { city: 'Bradford', state: 'PA', multiplier: 0.94, costIndex: 92 },
  '168': { city: 'State College', state: 'PA', multiplier: 1.05, costIndex: 103 },
  '169': { city: 'Wellsboro', state: 'PA', multiplier: 0.95, costIndex: 93 },
  '170': { city: 'Harrisburg', state: 'PA', multiplier: 1.05, costIndex: 103 },
  '171': { city: 'Harrisburg', state: 'PA', multiplier: 1.05, costIndex: 103 },
  '172': { city: 'Chambersburg', state: 'PA', multiplier: 1.02, costIndex: 100 },
  '173': { city: 'York', state: 'PA', multiplier: 1.04, costIndex: 102 },
  '174': { city: 'York', state: 'PA', multiplier: 1.04, costIndex: 102 },
  '175': { city: 'Lancaster', state: 'PA', multiplier: 1.08, costIndex: 106 },
  '176': { city: 'Lancaster', state: 'PA', multiplier: 1.08, costIndex: 106 },
  '177': { city: 'Williamsport', state: 'PA', multiplier: 0.98, costIndex: 96 },
  '178': { city: 'Sunbury', state: 'PA', multiplier: 0.96, costIndex: 94 },
  '179': { city: 'Pottsville', state: 'PA', multiplier: 0.96, costIndex: 94 },
  '180': { city: 'Allentown', state: 'PA', multiplier: 1.12, costIndex: 110 },
  '181': { city: 'Allentown', state: 'PA', multiplier: 1.12, costIndex: 110 },
  '182': { city: 'Hazleton', state: 'PA', multiplier: 1.05, costIndex: 103 },
  '183': { city: 'Stroudsburg', state: 'PA', multiplier: 1.08, costIndex: 106 },
  '184': { city: 'Scranton', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '185': { city: 'Scranton', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '186': { city: 'Wilkes-Barre', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '187': { city: 'Wilkes-Barre', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '188': { city: 'Wilkes-Barre', state: 'PA', multiplier: 1.00, costIndex: 98 },
  '189': { city: 'Doylestown', state: 'PA', multiplier: 1.30, costIndex: 127 },
  '190': { city: 'Philadelphia', state: 'PA', multiplier: 1.28, costIndex: 125 },
  '191': { city: 'Philadelphia', state: 'PA', multiplier: 1.28, costIndex: 125 },
  '192': { city: 'Philadelphia', state: 'PA', multiplier: 1.28, costIndex: 125 },
  '193': { city: 'Philadelphia Suburb', state: 'PA', multiplier: 1.32, costIndex: 129 },
  '194': { city: 'Philadelphia Suburb', state: 'PA', multiplier: 1.30, costIndex: 127 },
  '195': { city: 'Reading', state: 'PA', multiplier: 1.08, costIndex: 106 },
  '196': { city: 'Reading', state: 'PA', multiplier: 1.08, costIndex: 106 },

  // Ohio
  '430': { city: 'Columbus', state: 'OH', multiplier: 1.02, costIndex: 100 },
  '431': { city: 'Columbus', state: 'OH', multiplier: 1.02, costIndex: 100 },
  '432': { city: 'Columbus', state: 'OH', multiplier: 1.03, costIndex: 101 },
  '433': { city: 'Marysville', state: 'OH', multiplier: 1.00, costIndex: 98 },
  '434': { city: 'Toledo', state: 'OH', multiplier: 0.99, costIndex: 97 },
  '435': { city: 'Toledo', state: 'OH', multiplier: 0.99, costIndex: 97 },
  '436': { city: 'Toledo', state: 'OH', multiplier: 0.99, costIndex: 97 },
  '437': { city: 'Zanesville', state: 'OH', multiplier: 0.95, costIndex: 93 },
  '438': { city: 'New Philadelphia', state: 'OH', multiplier: 0.94, costIndex: 92 },
  '439': { city: 'Steubenville', state: 'OH', multiplier: 0.95, costIndex: 93 },
  '440': { city: 'Cleveland', state: 'OH', multiplier: 1.05, costIndex: 103 },
  '441': { city: 'Cleveland', state: 'OH', multiplier: 1.06, costIndex: 104 },
  '442': { city: 'Cleveland', state: 'OH', multiplier: 1.04, costIndex: 102 },
  '443': { city: 'Akron', state: 'OH', multiplier: 1.02, costIndex: 100 },
  '444': { city: 'Youngstown', state: 'OH', multiplier: 0.96, costIndex: 94 },
  '445': { city: 'Youngstown', state: 'OH', multiplier: 0.96, costIndex: 94 },
  '446': { city: 'Canton', state: 'OH', multiplier: 0.99, costIndex: 97 },
  '447': { city: 'Canton', state: 'OH', multiplier: 0.99, costIndex: 97 },
  '448': { city: 'Mansfield', state: 'OH', multiplier: 0.96, costIndex: 94 },
  '449': { city: 'Mansfield', state: 'OH', multiplier: 0.96, costIndex: 94 },
  '450': { city: 'Cincinnati', state: 'OH', multiplier: 1.05, costIndex: 103 },
  '451': { city: 'Cincinnati', state: 'OH', multiplier: 1.05, costIndex: 103 },
  '452': { city: 'Cincinnati', state: 'OH', multiplier: 1.05, costIndex: 103 },
  '453': { city: 'Dayton', state: 'OH', multiplier: 1.01, costIndex: 99 },
  '454': { city: 'Dayton', state: 'OH', multiplier: 1.01, costIndex: 99 },
  '455': { city: 'Springfield', state: 'OH', multiplier: 0.98, costIndex: 96 },
  '456': { city: 'Chillicothe', state: 'OH', multiplier: 0.97, costIndex: 95 },
  '457': { city: 'Athens', state: 'OH', multiplier: 0.96, costIndex: 94 },
  '458': { city: 'Lima', state: 'OH', multiplier: 0.97, costIndex: 95 },

  // Michigan
  '480': { city: 'Detroit', state: 'MI', multiplier: 1.08, costIndex: 106 },
  '481': { city: 'Ann Arbor', state: 'MI', multiplier: 1.12, costIndex: 110 },
  '482': { city: 'Detroit', state: 'MI', multiplier: 1.06, costIndex: 104 },
  '483': { city: 'Detroit Suburb', state: 'MI', multiplier: 1.10, costIndex: 108 },
  '484': { city: 'Flint', state: 'MI', multiplier: 0.98, costIndex: 96 },
  '485': { city: 'Flint', state: 'MI', multiplier: 0.98, costIndex: 96 },
  '486': { city: 'Saginaw', state: 'MI', multiplier: 0.97, costIndex: 95 },
  '487': { city: 'Bay City', state: 'MI', multiplier: 0.96, costIndex: 94 },
  '488': { city: 'Lansing', state: 'MI', multiplier: 1.01, costIndex: 99 },
  '489': { city: 'Lansing', state: 'MI', multiplier: 1.01, costIndex: 99 },
  '490': { city: 'Kalamazoo', state: 'MI', multiplier: 1.03, costIndex: 101 },
  '491': { city: 'South Bend', state: 'MI', multiplier: 1.02, costIndex: 100 },
  '492': { city: 'Jackson', state: 'MI', multiplier: 0.99, costIndex: 97 },
  '493': { city: 'Grand Rapids', state: 'MI', multiplier: 1.04, costIndex: 102 },
  '494': { city: 'Holland', state: 'MI', multiplier: 1.03, costIndex: 101 },
  '495': { city: 'Grand Rapids', state: 'MI', multiplier: 1.04, costIndex: 102 },
  '496': { city: 'Traverse City', state: 'MI', multiplier: 1.08, costIndex: 106 },
  '497': { city: 'Alpena', state: 'MI', multiplier: 0.95, costIndex: 93 },
  '498': { city: 'Iron Mountain', state: 'MI', multiplier: 0.94, costIndex: 92 },
  '499': { city: 'Houghton', state: 'MI', multiplier: 0.95, costIndex: 93 },

  // Arizona
  '850': { city: 'Phoenix', state: 'AZ', multiplier: 1.06, costIndex: 104 },
  '852': { city: 'Mesa / Scottsdale', state: 'AZ', multiplier: 1.08, costIndex: 106 },
  '853': { city: 'Glendale', state: 'AZ', multiplier: 1.05, costIndex: 103 },
  '855': { city: 'Mogollon Rim', state: 'AZ', multiplier: 1.02, costIndex: 100 },
  '856': { city: 'Sierra Vista', state: 'AZ', multiplier: 0.99, costIndex: 97 },
  '857': { city: 'Tucson', state: 'AZ', multiplier: 1.02, costIndex: 100 },
  '859': { city: 'Show Low', state: 'AZ', multiplier: 0.98, costIndex: 96 },
  '860': { city: 'Flagstaff', state: 'AZ', multiplier: 1.09, costIndex: 107 },
  '863': { city: 'Prescott', state: 'AZ', multiplier: 1.06, costIndex: 104 },
  '864': { city: 'Lake Havasu', state: 'AZ', multiplier: 1.03, costIndex: 101 },
  '865': { city: 'Tombstone', state: 'AZ', multiplier: 0.99, costIndex: 97 },

  // Washington
  '980': { city: 'Seattle', state: 'WA', multiplier: 1.45, costIndex: 142 },
  '981': { city: 'Seattle', state: 'WA', multiplier: 1.45, costIndex: 142 },
  '982': { city: 'Everett', state: 'WA', multiplier: 1.38, costIndex: 135 },
  '983': { city: 'Tacoma', state: 'WA', multiplier: 1.32, costIndex: 129 },
  '984': { city: 'Tacoma', state: 'WA', multiplier: 1.32, costIndex: 129 },
  '985': { city: 'Olympia', state: 'WA', multiplier: 1.28, costIndex: 125 },
  '986': { city: 'Vancouver WA', state: 'WA', multiplier: 1.28, costIndex: 125 },
  '988': { city: 'Wenatchee', state: 'WA', multiplier: 1.12, costIndex: 110 },
  '989': { city: 'Yakima', state: 'WA', multiplier: 1.08, costIndex: 106 },
  '990': { city: 'Spokane', state: 'WA', multiplier: 1.05, costIndex: 103 },
  '991': { city: 'Spokane', state: 'WA', multiplier: 1.05, costIndex: 103 },
  '992': { city: 'Spokane', state: 'WA', multiplier: 1.05, costIndex: 103 },
  '993': { city: 'Tri-Cities', state: 'WA', multiplier: 1.08, costIndex: 106 },

  // Colorado
  '800': { city: 'Denver', state: 'CO', multiplier: 1.32, costIndex: 129 },
  '801': { city: 'Denver South', state: 'CO', multiplier: 1.34, costIndex: 131 },
  '802': { city: 'Denver', state: 'CO', multiplier: 1.32, costIndex: 129 },
  '803': { city: 'Boulder', state: 'CO', multiplier: 1.40, costIndex: 137 },
  '804': { city: 'Front Range', state: 'CO', multiplier: 1.30, costIndex: 127 },
  '805': { city: 'Fort Collins', state: 'CO', multiplier: 1.25, costIndex: 123 },
  '806': { city: 'Greeley', state: 'CO', multiplier: 1.20, costIndex: 118 },
  '807': { city: 'Sterling', state: 'CO', multiplier: 1.08, costIndex: 106 },
  '808': { city: 'Colorado Springs', state: 'CO', multiplier: 1.22, costIndex: 120 },
  '809': { city: 'Colorado Springs', state: 'CO', multiplier: 1.22, costIndex: 120 },
  '810': { city: 'Pueblo', state: 'CO', multiplier: 1.10, costIndex: 108 },
  '811': { city: 'San Luis Valley', state: 'CO', multiplier: 1.02, costIndex: 100 },
  '812': { city: 'Durango', state: 'CO', multiplier: 1.18, costIndex: 116 },
  '813': { city: 'Cortez', state: 'CO', multiplier: 1.08, costIndex: 106 },
  '814': { city: 'Grand Junction', state: 'CO', multiplier: 1.12, costIndex: 110 },
  '815': { city: 'Grand Junction', state: 'CO', multiplier: 1.12, costIndex: 110 },
  '816': { city: 'Vail', state: 'CO', multiplier: 1.48, costIndex: 145 },

  // Nevada
  '889': { city: 'Henderson', state: 'NV', multiplier: 1.18, costIndex: 116 },
  '890': { city: 'Las Vegas', state: 'NV', multiplier: 1.15, costIndex: 113 },
  '891': { city: 'Las Vegas', state: 'NV', multiplier: 1.15, costIndex: 113 },
  '893': { city: 'Ely', state: 'NV', multiplier: 1.02, costIndex: 100 },
  '894': { city: 'Carson City', state: 'NV', multiplier: 1.22, costIndex: 120 },
  '895': { city: 'Reno', state: 'NV', multiplier: 1.24, costIndex: 122 },
  '897': { city: 'Reno', state: 'NV', multiplier: 1.24, costIndex: 122 },
  '898': { city: 'Elko', state: 'NV', multiplier: 1.12, costIndex: 110 },

  // Washington DC / Maryland / Virginia
  '200': { city: 'Washington DC', state: 'DC', multiplier: 1.58, costIndex: 155 },
  '201': { city: 'Fairfax', state: 'VA', multiplier: 1.52, costIndex: 149 },
  '202': { city: 'Washington DC', state: 'DC', multiplier: 1.58, costIndex: 155 },
  '203': { city: 'Washington DC', state: 'DC', multiplier: 1.58, costIndex: 155 },
  '204': { city: 'Washington DC', state: 'DC', multiplier: 1.58, costIndex: 155 },
  '205': { city: 'Washington DC', state: 'DC', multiplier: 1.58, costIndex: 155 },
  '206': { city: 'Chevy Chase', state: 'MD', multiplier: 1.55, costIndex: 152 },
  '207': { city: 'College Park', state: 'MD', multiplier: 1.48, costIndex: 145 },
  '208': { city: 'Bethesda', state: 'MD', multiplier: 1.55, costIndex: 152 },
  '209': { city: 'Silver Spring', state: 'MD', multiplier: 1.50, costIndex: 147 },
  '210': { city: 'Annapolis', state: 'MD', multiplier: 1.45, costIndex: 142 },
  '211': { city: 'Odenton', state: 'MD', multiplier: 1.42, costIndex: 139 },
  '212': { city: 'Baltimore', state: 'MD', multiplier: 1.22, costIndex: 120 },
  '214': { city: 'Baltimore', state: 'MD', multiplier: 1.22, costIndex: 120 },
  '215': { city: 'Cumberland', state: 'MD', multiplier: 0.97, costIndex: 95 },
  '216': { city: 'Waldorf', state: 'MD', multiplier: 1.35, costIndex: 132 },
  '217': { city: 'Hagerstown', state: 'MD', multiplier: 1.02, costIndex: 100 },
  '218': { city: 'Salisbury', state: 'MD', multiplier: 1.00, costIndex: 98 },
  '220': { city: 'Arlington', state: 'VA', multiplier: 1.55, costIndex: 152 },
  '221': { city: 'Fairfax', state: 'VA', multiplier: 1.52, costIndex: 149 },
  '222': { city: 'Arlington', state: 'VA', multiplier: 1.55, costIndex: 152 },
  '223': { city: 'Alexandria', state: 'VA', multiplier: 1.52, costIndex: 149 },
  '224': { city: 'Fredericksburg', state: 'VA', multiplier: 1.35, costIndex: 132 },
  '225': { city: 'Fredericksburg', state: 'VA', multiplier: 1.32, costIndex: 129 },
  '226': { city: 'Winchester', state: 'VA', multiplier: 1.15, costIndex: 113 },
  '227': { city: 'Culpeper', state: 'VA', multiplier: 1.18, costIndex: 116 },
  '228': { city: 'Harrisonburg', state: 'VA', multiplier: 1.08, costIndex: 106 },
  '229': { city: 'Charlottesville', state: 'VA', multiplier: 1.20, costIndex: 118 },
  '230': { city: 'Williamsburg', state: 'VA', multiplier: 1.25, costIndex: 123 },
  '231': { city: 'Newport News', state: 'VA', multiplier: 1.15, costIndex: 113 },
  '232': { city: 'Richmond', state: 'VA', multiplier: 1.18, costIndex: 116 },
  '233': { city: 'Virginia Beach', state: 'VA', multiplier: 1.20, costIndex: 118 },
  '234': { city: 'Virginia Beach', state: 'VA', multiplier: 1.20, costIndex: 118 },
  '235': { city: 'Norfolk', state: 'VA', multiplier: 1.12, costIndex: 110 },
  '236': { city: 'Newport News', state: 'VA', multiplier: 1.15, costIndex: 113 },
  '237': { city: 'Petersburg', state: 'VA', multiplier: 1.08, costIndex: 106 },
  '238': { city: 'Petersburg', state: 'VA', multiplier: 1.08, costIndex: 106 },
  '239': { city: 'Lynchburg', state: 'VA', multiplier: 1.05, costIndex: 103 },
  '240': { city: 'Roanoke', state: 'VA', multiplier: 1.02, costIndex: 100 },
  '241': { city: 'Roanoke', state: 'VA', multiplier: 1.02, costIndex: 100 },
  '242': { city: 'Bristol', state: 'VA', multiplier: 0.98, costIndex: 96 },
  '243': { city: 'Wytheville', state: 'VA', multiplier: 0.96, costIndex: 94 },
  '244': { city: 'Lexington', state: 'VA', multiplier: 1.02, costIndex: 100 },
  '245': { city: 'Lynchburg', state: 'VA', multiplier: 1.05, costIndex: 103 },
  '246': { city: 'Pound', state: 'VA', multiplier: 0.95, costIndex: 93 },

  // Tennessee
  '370': { city: 'Nashville', state: 'TN', multiplier: 1.08, costIndex: 106 },
  '371': { city: 'Nashville', state: 'TN', multiplier: 1.08, costIndex: 106 },
  '372': { city: 'Nashville', state: 'TN', multiplier: 1.09, costIndex: 107 },
  '373': { city: 'Chattanooga', state: 'TN', multiplier: 1.00, costIndex: 98 },
  '374': { city: 'Chattanooga', state: 'TN', multiplier: 1.00, costIndex: 98 },
  '375': { city: 'Chattanooga', state: 'TN', multiplier: 1.00, costIndex: 98 },
  '376': { city: 'Kingsport', state: 'TN', multiplier: 0.97, costIndex: 95 },
  '377': { city: 'Knoxville', state: 'TN', multiplier: 1.02, costIndex: 100 },
  '378': { city: 'Knoxville', state: 'TN', multiplier: 1.02, costIndex: 100 },
  '379': { city: 'Knoxville', state: 'TN', multiplier: 1.03, costIndex: 101 },
  '380': { city: 'Memphis', state: 'TN', multiplier: 0.98, costIndex: 96 },
  '381': { city: 'Memphis', state: 'TN', multiplier: 0.98, costIndex: 96 },
  '382': { city: 'Jackson', state: 'TN', multiplier: 0.95, costIndex: 93 },
  '383': { city: 'Jackson', state: 'TN', multiplier: 0.95, costIndex: 93 },
  '384': { city: 'Columbia', state: 'TN', multiplier: 0.97, costIndex: 95 },
  '385': { city: 'Cookeville', state: 'TN', multiplier: 0.95, costIndex: 93 },
  '386': { city: 'Memphis', state: 'TN', multiplier: 0.98, costIndex: 96 },
  '387': { city: 'Greenville', state: 'TN', multiplier: 0.94, costIndex: 92 },
  '388': { city: 'Corinth', state: 'TN', multiplier: 0.93, costIndex: 91 },
  '389': { city: 'Greeneville', state: 'TN', multiplier: 0.93, costIndex: 91 },

  // Louisiana
  '700': { city: 'New Orleans', state: 'LA', multiplier: 1.08, costIndex: 106 },
  '701': { city: 'New Orleans', state: 'LA', multiplier: 1.08, costIndex: 106 },
  '703': { city: 'Houma', state: 'LA', multiplier: 1.02, costIndex: 100 },
  '704': { city: 'Hammond', state: 'LA', multiplier: 1.00, costIndex: 98 },
  '705': { city: 'Lafayette', state: 'LA', multiplier: 0.98, costIndex: 96 },
  '706': { city: 'Lake Charles', state: 'LA', multiplier: 0.99, costIndex: 97 },
  '707': { city: 'Baton Rouge', state: 'LA', multiplier: 1.04, costIndex: 102 },
  '708': { city: 'Baton Rouge', state: 'LA', multiplier: 1.04, costIndex: 102 },
  '710': { city: 'Shreveport', state: 'LA', multiplier: 0.97, costIndex: 95 },
  '711': { city: 'Shreveport', state: 'LA', multiplier: 0.97, costIndex: 95 },
  '712': { city: 'Monroe', state: 'LA', multiplier: 0.93, costIndex: 91 },
  '713': { city: 'Alexandria', state: 'LA', multiplier: 0.93, costIndex: 91 },
  '714': { city: 'Natchitoches', state: 'LA', multiplier: 0.92, costIndex: 90 },

  // Oregon
  '970': { city: 'Portland', state: 'OR', multiplier: 1.35, costIndex: 132 },
  '971': { city: 'Portland', state: 'OR', multiplier: 1.35, costIndex: 132 },
  '972': { city: 'Portland', state: 'OR', multiplier: 1.35, costIndex: 132 },
  '973': { city: 'Salem', state: 'OR', multiplier: 1.22, costIndex: 120 },
  '974': { city: 'Eugene', state: 'OR', multiplier: 1.25, costIndex: 123 },
  '975': { city: 'Medford', state: 'OR', multiplier: 1.18, costIndex: 116 },
  '976': { city: 'Klamath Falls', state: 'OR', multiplier: 1.10, costIndex: 108 },
  '977': { city: 'Bend', state: 'OR', multiplier: 1.28, costIndex: 125 },
  '978': { city: 'Pendleton', state: 'OR', multiplier: 1.08, costIndex: 106 },
  '979': { city: 'Ontario', state: 'OR', multiplier: 1.05, costIndex: 103 },

  // Default fallback for unknown ZIPs
  'default': { city: 'National Average', state: 'US', multiplier: 1.00, costIndex: 100 }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get regional data for a ZIP code
 */
function getRegionalData(zip) {
  if (!zip || zip.length < 3) return REGIONAL_MULTIPLIERS['default'];
  const prefix = zip.toString().substring(0, 3);
  return REGIONAL_MULTIPLIERS[prefix] || REGIONAL_MULTIPLIERS['default'];
}

/**
 * Apply regional multiplier to a price
 */
function adjustPrice(basePrice, zip) {
  const regional = getRegionalData(zip);
  return basePrice * regional.multiplier;
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + 'k';
  }
  return '$' + amount.toFixed(0);
}

/**
 * Get all available trade keys
 */
function getTradeKeys() {
  return Object.keys(SERVICE_CATALOG);
}

/**
 * Get service count
 */
function getTotalServiceCount() {
  let count = 0;
  for (const trade of Object.values(SERVICE_CATALOG)) {
    count += trade.services.length;
  }
  return count;
}

// Export for use
if (typeof module !== 'undefined') {
  module.exports = { SERVICE_CATALOG, REGIONAL_MULTIPLIERS, getRegionalData, adjustPrice, formatCurrency, getTradeKeys, getTotalServiceCount };
}