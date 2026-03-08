// Add Pennsylvania, North Carolina, and Utah cities
const TURSO_URL = 'https://dumpsterchamps-joeybeyer.aws-us-east-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzExNzMyMDcsImlkIjoiZjE4ZDg2N2UtYzc4MS00Y2VmLTg5MWUtMDg1ODZlYWMzMWYzIiwicmlkIjoiYzM0YmNiNTUtMzFkNy00ZDFmLTg5MDYtN2VhYzFjNGQ5ZGU5In0.XB0pX1WPepWleHo-bQQ4uDZCU4BCyKN4MmoqoyL3MnvMBE6eUWXpsTiJxcI9yPZcf-65vm2xAZwQDESNZaO4Dw';

async function query(sql, args = []) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TURSO_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{ type: 'execute', stmt: { sql, args: args.map(a => ({ type: 'text', value: String(a) })) } }, { type: 'close' }]
    })
  });
  return res.json();
}

const stateCities = {
  PA: [
    { name: 'Philadelphia', slug: 'philadelphia-pa', county: 'Philadelphia County', lat: 39.9526, lng: -75.1652, pop: '1,584,064' },
    { name: 'Pittsburgh', slug: 'pittsburgh-pa', county: 'Allegheny County', lat: 40.4406, lng: -79.9959, pop: '302,971' },
    { name: 'Allentown', slug: 'allentown-pa', county: 'Lehigh County', lat: 40.6084, lng: -75.4902, pop: '125,845' },
    { name: 'Reading', slug: 'reading-pa', county: 'Berks County', lat: 40.3356, lng: -75.9269, pop: '95,112' },
    { name: 'Scranton', slug: 'scranton-pa', county: 'Lackawanna County', lat: 41.4090, lng: -75.6624, pop: '76,997' },
    { name: 'Bethlehem', slug: 'bethlehem-pa', county: 'Northampton County', lat: 40.6259, lng: -75.3705, pop: '75,781' },
    { name: 'Lancaster', slug: 'lancaster-pa', county: 'Lancaster County', lat: 40.0379, lng: -76.3055, pop: '63,069' },
    { name: 'Harrisburg', slug: 'harrisburg-pa', county: 'Dauphin County', lat: 40.2732, lng: -76.8867, pop: '50,099' },
    { name: 'Altoona', slug: 'altoona-pa', county: 'Blair County', lat: 40.5187, lng: -78.3947, pop: '44,098' },
    { name: 'York', slug: 'york-pa', county: 'York County', lat: 39.9626, lng: -76.7277, pop: '44,820' },
    { name: 'State College', slug: 'state-college-pa', county: 'Centre County', lat: 40.7934, lng: -77.8600, pop: '42,034' },
    { name: 'Wilkes-Barre', slug: 'wilkes-barre-pa', county: 'Luzerne County', lat: 41.2459, lng: -75.8813, pop: '44,328' },
    { name: 'Chester', slug: 'chester-pa', county: 'Delaware County', lat: 39.8496, lng: -75.3557, pop: '33,972' },
    { name: 'Easton', slug: 'easton-pa', county: 'Northampton County', lat: 40.6884, lng: -75.2207, pop: '28,203' },
    { name: 'Lebanon', slug: 'lebanon-pa', county: 'Lebanon County', lat: 40.3409, lng: -76.4114, pop: '26,070' },
    { name: 'Hazleton', slug: 'hazleton-pa', county: 'Luzerne County', lat: 40.9584, lng: -75.9746, pop: '26,889' },
    { name: 'Williamsport', slug: 'williamsport-pa', county: 'Lycoming County', lat: 41.2412, lng: -77.0011, pop: '28,356' },
    { name: 'Johnstown', slug: 'johnstown-pa', county: 'Cambria County', lat: 40.3267, lng: -78.9220, pop: '19,195' },
    { name: 'McKeesport', slug: 'mckeesport-pa', county: 'Allegheny County', lat: 40.3478, lng: -79.8642, pop: '19,731' },
    { name: 'Norristown', slug: 'norristown-pa', county: 'Montgomery County', lat: 40.1215, lng: -75.3399, pop: '35,359' },
  ],
  NC: [
    { name: 'Charlotte', slug: 'charlotte-nc', county: 'Mecklenburg County', lat: 35.2271, lng: -80.8431, pop: '874,579' },
    { name: 'Raleigh', slug: 'raleigh-nc', county: 'Wake County', lat: 35.7796, lng: -78.6382, pop: '467,665' },
    { name: 'Greensboro', slug: 'greensboro-nc', county: 'Guilford County', lat: 36.0726, lng: -79.7920, pop: '299,035' },
    { name: 'Durham', slug: 'durham-nc', county: 'Durham County', lat: 35.9940, lng: -78.8986, pop: '283,506' },
    { name: 'Winston-Salem', slug: 'winston-salem-nc', county: 'Forsyth County', lat: 36.0999, lng: -80.2442, pop: '249,545' },
    { name: 'Fayetteville', slug: 'fayetteville-nc', county: 'Cumberland County', lat: 35.0527, lng: -78.8784, pop: '208,501' },
    { name: 'Cary', slug: 'cary-nc', county: 'Wake County', lat: 35.7915, lng: -78.7811, pop: '174,721' },
    { name: 'Wilmington', slug: 'wilmington-nc', county: 'New Hanover County', lat: 34.2257, lng: -77.9447, pop: '115,451' },
    { name: 'High Point', slug: 'high-point-nc', county: 'Guilford County', lat: 35.9557, lng: -80.0053, pop: '114,059' },
    { name: 'Concord', slug: 'concord-nc', county: 'Cabarrus County', lat: 35.4088, lng: -80.5795, pop: '105,240' },
    { name: 'Asheville', slug: 'asheville-nc', county: 'Buncombe County', lat: 35.5951, lng: -82.5515, pop: '94,589' },
    { name: 'Greenville', slug: 'greenville-nc', county: 'Pitt County', lat: 35.6127, lng: -77.3664, pop: '93,137' },
    { name: 'Gastonia', slug: 'gastonia-nc', county: 'Gaston County', lat: 35.2621, lng: -81.1873, pop: '80,411' },
    { name: 'Jacksonville', slug: 'jacksonville-nc', county: 'Onslow County', lat: 34.7541, lng: -77.4302, pop: '74,438' },
    { name: 'Chapel Hill', slug: 'chapel-hill-nc', county: 'Orange County', lat: 35.9132, lng: -79.0558, pop: '61,960' },
    { name: 'Huntersville', slug: 'huntersville-nc', county: 'Mecklenburg County', lat: 35.4107, lng: -80.8429, pop: '61,438' },
    { name: 'Apex', slug: 'apex-nc', county: 'Wake County', lat: 35.7327, lng: -78.8503, pop: '60,416' },
    { name: 'Burlington', slug: 'burlington-nc', county: 'Alamance County', lat: 36.0957, lng: -79.4378, pop: '57,303' },
    { name: 'Rocky Mount', slug: 'rocky-mount-nc', county: 'Nash County', lat: 35.9382, lng: -77.7905, pop: '54,994' },
    { name: 'Kannapolis', slug: 'kannapolis-nc', county: 'Cabarrus County', lat: 35.4874, lng: -80.6217, pop: '53,576' },
  ],
  UT: [
    { name: 'Salt Lake City', slug: 'salt-lake-city-ut', county: 'Salt Lake County', lat: 40.7608, lng: -111.8910, pop: '199,723' },
    { name: 'West Valley City', slug: 'west-valley-city-ut', county: 'Salt Lake County', lat: 40.6916, lng: -112.0011, pop: '140,230' },
    { name: 'Provo', slug: 'provo-ut', county: 'Utah County', lat: 40.2338, lng: -111.6585, pop: '115,162' },
    { name: 'West Jordan', slug: 'west-jordan-ut', county: 'Salt Lake County', lat: 40.6097, lng: -111.9391, pop: '116,961' },
    { name: 'Orem', slug: 'orem-ut', county: 'Utah County', lat: 40.2969, lng: -111.6946, pop: '97,499' },
    { name: 'Sandy', slug: 'sandy-ut', county: 'Salt Lake County', lat: 40.5649, lng: -111.8389, pop: '96,380' },
    { name: 'Ogden', slug: 'ogden-ut', county: 'Weber County', lat: 41.2230, lng: -111.9738, pop: '87,321' },
    { name: 'St. George', slug: 'st-george-ut', county: 'Washington County', lat: 37.0965, lng: -113.5684, pop: '95,342' },
    { name: 'Layton', slug: 'layton-ut', county: 'Davis County', lat: 41.0602, lng: -111.9711, pop: '81,780' },
    { name: 'South Jordan', slug: 'south-jordan-ut', county: 'Salt Lake County', lat: 40.5622, lng: -111.9297, pop: '80,356' },
    { name: 'Lehi', slug: 'lehi-ut', county: 'Utah County', lat: 40.3916, lng: -111.8508, pop: '75,907' },
    { name: 'Millcreek', slug: 'millcreek-ut', county: 'Salt Lake County', lat: 40.6866, lng: -111.8755, pop: '63,535' },
    { name: 'Taylorsville', slug: 'taylorsville-ut', county: 'Salt Lake County', lat: 40.6677, lng: -111.9388, pop: '60,448' },
    { name: 'Logan', slug: 'logan-ut', county: 'Cache County', lat: 41.7370, lng: -111.8338, pop: '52,778' },
    { name: 'Murray', slug: 'murray-ut', county: 'Salt Lake County', lat: 40.6669, lng: -111.8879, pop: '50,637' },
    { name: 'Draper', slug: 'draper-ut', county: 'Salt Lake County', lat: 40.5247, lng: -111.8638, pop: '51,017' },
    { name: 'Bountiful', slug: 'bountiful-ut', county: 'Davis County', lat: 40.8894, lng: -111.8808, pop: '45,836' },
    { name: 'Riverton', slug: 'riverton-ut', county: 'Salt Lake County', lat: 40.5219, lng: -111.9391, pop: '45,830' },
    { name: 'Herriman', slug: 'herriman-ut', county: 'Salt Lake County', lat: 40.5144, lng: -112.0330, pop: '55,144' },
    { name: 'Spanish Fork', slug: 'spanish-fork-ut', county: 'Utah County', lat: 40.1149, lng: -111.6549, pop: '42,602' },
  ]
};

function generateContent(city, stateAbbr, stateName) {
  const desc = `Need a dumpster in ${city.name}, ${stateAbbr}? Dumpster Champs delivers roll-off containers throughout ${city.county} with same-day service, flat-rate pricing from $495, and no hidden fees.`;

  const aiDesc = `## Dumpster Rental in ${city.name}, ${stateName}

When you need a dumpster in ${city.name}, skip the brokers and work with a company that owns its trucks and delivers what it promises. We provide same-day dumpster delivery throughout ${city.county} with transparent, all-inclusive pricing.

### Flat-Rate Pricing — No Hidden Fees

Our ${city.name} pricing includes everything:
- Delivery to your ${city.county} address
- 7-day rental period (extensions available)
- Your tonnage allowance — built into the price
- Pickup when you call

No admin fees, no fuel surcharges, no surprise charges. The quote is the price.

### Same-Day Delivery in ${city.name}

Order before noon and we'll have a dumpster at your ${city.name} property today. Our local fleet means fast service — not the 3-5 day waits you get from national brokers.

## Common ${city.name} Projects

**Home Renovations**: Kitchen and bathroom remodels, flooring replacement, whole-house updates. Our 20-yard dumpster handles most renovation debris.

**Roofing Projects**: When it's time for a roof tear-off, we deliver containers sized for shingle weight without overage surprises.

**Estate Cleanouts**: Clearing a family home in ${city.name}? Fill, call, we pick up. As many loads as needed.

**Construction Sites**: Contractors across ${city.county} trust us for reliable jobsite logistics.

## ${city.name} Dumpster Sizes

| Size | Best For | Price |
|------|----------|-------|
| 10 Yard | Garage cleanouts, small remodels | $495 |
| 15 Yard | Single room renovations | $550 |
| 20 Yard | Kitchen remodels, roofing | $595 |
| 30 Yard | Major renovations, cleanouts | $695 |
| 40 Yard | Large construction | $795 |

## Permits in ${city.name}

**Private Property**: No permit needed for driveway placement.
**Street Placement**: Contact ${city.name} or ${city.county} for requirements.

Call (888) 860-0710 for a free quote.`;

  const whyChooseUs = `## Why ${city.name} Chooses Us\n\n**Not a Broker**: We own our trucks and dumpsters.\n**Honest Pricing**: Everything included, no surprises.\n**Same-Day Delivery**: Order by noon, get it today.\n**Property Protection**: Boards under containers, full insurance.`;

  const climate = `${city.name}'s climate allows year-round dumpster rental. Spring and fall offer ideal conditions for outdoor projects. Plan ahead during peak seasons for best availability in ${city.county}.`;

  const permits = `**Private Property**: No permit required in ${city.name} for driveway placement.\n**Street/Public Right-of-Way**: Contact ${city.name} or ${city.county} for permit requirements.`;

  const metaTitle = `Dumpster Rental ${city.name}, ${stateAbbr} | Same-Day from $495 [2026]`;
  const metaDesc = `Fast dumpster rental in ${city.name}, ${stateName}. 10-40 yard containers from $495. Same-day delivery, no hidden fees. Call (888) 860-0710.`;

  return { desc, aiDesc, whyChooseUs, climate, permits, metaTitle, metaDesc };
}

async function addCitiesForState(abbr, stateName, cities) {
  const stateResult = await query(`SELECT id FROM State WHERE abbr = '${abbr}'`);
  const stateId = stateResult.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
  if (!stateId) { console.log(`Could not find ${abbr} state ID`); return 0; }

  const existingResult = await query("SELECT slug FROM City WHERE stateId = ?", [stateId]);
  const existingSlugs = new Set(existingResult.results?.[0]?.response?.result?.rows?.map(r => r[0]?.value) || []);
  
  const newCities = cities.filter(c => !existingSlugs.has(c.slug));
  console.log(`${abbr}: ${existingSlugs.size} existing, adding ${newCities.length} new`);

  for (const city of newCities) {
    const content = generateContent(city, abbr, stateName);
    const id = `city_${abbr.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const sql = `INSERT INTO City (id, name, slug, stateId, description, metaTitle, metaDesc, county, latitude, longitude, population, aiDescription, whyChooseUs, climate, permits, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
    try {
      await query(sql, [id, city.name, city.slug, stateId, content.desc, content.metaTitle, content.metaDesc, city.county, city.lat, city.lng, city.pop, content.aiDesc, content.whyChooseUs, content.climate, content.permits]);
      console.log(`  ✓ ${city.name}`);
    } catch (err) { console.error(`  ✗ ${city.name}:`, err.message); }
  }
  return newCities.length;
}

async function main() {
  let total = 0;
  total += await addCitiesForState('PA', 'Pennsylvania', stateCities.PA);
  total += await addCitiesForState('NC', 'North Carolina', stateCities.NC);
  total += await addCitiesForState('UT', 'Utah', stateCities.UT);
  console.log(`\nDone! Added ${total} cities.`);
}

main().catch(console.error);
