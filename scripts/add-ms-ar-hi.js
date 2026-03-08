// Add Mississippi, Arkansas, Hawaii cities
const TURSO_URL = 'https://dumpsterchamps-joeybeyer.aws-us-east-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzExNzMyMDcsImlkIjoiZjE4ZDg2N2UtYzc4MS00Y2VmLTg5MWUtMDg1ODZlYWMzMWYzIiwicmlkIjoiYzM0YmNiNTUtMzFkNy00ZDFmLTg5MDYtN2VhYzFjNGQ5ZGU5In0.XB0pX1WPepWleHo-bQQ4uDZCU4BCyKN4MmoqoyL3MnvMBE6eUWXpsTiJxcI9yPZcf-65vm2xAZwQDESNZaO4Dw';

async function query(sql, args = []) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TURSO_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests: [{ type: 'execute', stmt: { sql, args: args.map(a => ({ type: 'text', value: String(a) })) } }, { type: 'close' }] })
  });
  return res.json();
}

const stateCities = {
  MS: [
    { name: 'Jackson', slug: 'jackson-ms', county: 'Hinds County', lat: 32.2988, lng: -90.1848, pop: '153,701' },
    { name: 'Gulfport', slug: 'gulfport-ms', county: 'Harrison County', lat: 30.3674, lng: -89.0928, pop: '72,076' },
    { name: 'Southaven', slug: 'southaven-ms', county: 'DeSoto County', lat: 34.9889, lng: -90.0126, pop: '55,026' },
    { name: 'Hattiesburg', slug: 'hattiesburg-ms', county: 'Forrest County', lat: 31.3271, lng: -89.2903, pop: '48,881' },
    { name: 'Biloxi', slug: 'biloxi-ms', county: 'Harrison County', lat: 30.3960, lng: -88.8853, pop: '46,586' },
    { name: 'Meridian', slug: 'meridian-ms', county: 'Lauderdale County', lat: 32.3643, lng: -88.7037, pop: '37,252' },
    { name: 'Tupelo', slug: 'tupelo-ms', county: 'Lee County', lat: 34.2576, lng: -88.7034, pop: '38,300' },
    { name: 'Olive Branch', slug: 'olive-branch-ms', county: 'DeSoto County', lat: 34.9617, lng: -89.8295, pop: '42,305' },
    { name: 'Greenville', slug: 'greenville-ms', county: 'Washington County', lat: 33.4101, lng: -91.0618, pop: '27,446' },
    { name: 'Horn Lake', slug: 'horn-lake-ms', county: 'DeSoto County', lat: 34.9553, lng: -90.0348, pop: '27,658' },
    { name: 'Clinton', slug: 'clinton-ms', county: 'Hinds County', lat: 32.3415, lng: -90.3218, pop: '25,216' },
    { name: 'Pearl', slug: 'pearl-ms', county: 'Rankin County', lat: 32.2743, lng: -90.1320, pop: '27,115' },
    { name: 'Madison', slug: 'madison-ms', county: 'Madison County', lat: 32.4618, lng: -90.1154, pop: '28,079' },
    { name: 'Starkville', slug: 'starkville-ms', county: 'Oktibbeha County', lat: 33.4504, lng: -88.8184, pop: '25,352' },
    { name: 'Vicksburg', slug: 'vicksburg-ms', county: 'Warren County', lat: 32.3526, lng: -90.8779, pop: '21,536' },
  ],
  AR: [
    { name: 'Little Rock', slug: 'little-rock-ar', county: 'Pulaski County', lat: 34.7465, lng: -92.2896, pop: '202,591' },
    { name: 'Fort Smith', slug: 'fort-smith-ar', county: 'Sebastian County', lat: 35.3859, lng: -94.3985, pop: '89,142' },
    { name: 'Fayetteville', slug: 'fayetteville-ar', county: 'Washington County', lat: 36.0822, lng: -94.1719, pop: '93,949' },
    { name: 'Springdale', slug: 'springdale-ar', county: 'Washington County', lat: 36.1867, lng: -94.1288, pop: '84,312' },
    { name: 'Jonesboro', slug: 'jonesboro-ar', county: 'Craighead County', lat: 35.8423, lng: -90.7043, pop: '78,576' },
    { name: 'Rogers', slug: 'rogers-ar', county: 'Benton County', lat: 36.3320, lng: -94.1185, pop: '72,758' },
    { name: 'Conway', slug: 'conway-ar', county: 'Faulkner County', lat: 35.0887, lng: -92.4421, pop: '67,336' },
    { name: 'North Little Rock', slug: 'north-little-rock-ar', county: 'Pulaski County', lat: 34.7695, lng: -92.2671, pop: '64,633' },
    { name: 'Bentonville', slug: 'bentonville-ar', county: 'Benton County', lat: 36.3729, lng: -94.2088, pop: '57,216' },
    { name: 'Pine Bluff', slug: 'pine-bluff-ar', county: 'Jefferson County', lat: 34.2284, lng: -92.0032, pop: '41,253' },
    { name: 'Hot Springs', slug: 'hot-springs-ar', county: 'Garland County', lat: 34.5037, lng: -93.0552, pop: '38,797' },
    { name: 'Benton', slug: 'benton-ar', county: 'Saline County', lat: 34.5645, lng: -92.5868, pop: '36,820' },
    { name: 'Texarkana', slug: 'texarkana-ar', county: 'Miller County', lat: 33.4418, lng: -94.0377, pop: '30,259' },
    { name: 'Sherwood', slug: 'sherwood-ar', county: 'Pulaski County', lat: 34.8151, lng: -92.2243, pop: '32,731' },
    { name: 'Russellville', slug: 'russellville-ar', county: 'Pope County', lat: 35.2784, lng: -93.1338, pop: '30,286' },
  ],
  HI: [
    { name: 'Honolulu', slug: 'honolulu-hi', county: 'Honolulu County', lat: 21.3069, lng: -157.8583, pop: '350,395' },
    { name: 'East Honolulu', slug: 'east-honolulu-hi', county: 'Honolulu County', lat: 21.2891, lng: -157.7113, pop: '47,132' },
    { name: 'Pearl City', slug: 'pearl-city-hi', county: 'Honolulu County', lat: 21.3972, lng: -157.9753, pop: '45,159' },
    { name: 'Hilo', slug: 'hilo-hi', county: 'Hawaii County', lat: 19.7297, lng: -155.0900, pop: '45,703' },
    { name: 'Kailua', slug: 'kailua-hi', county: 'Honolulu County', lat: 21.4022, lng: -157.7394, pop: '40,514' },
    { name: 'Waipahu', slug: 'waipahu-hi', county: 'Honolulu County', lat: 21.3867, lng: -158.0094, pop: '44,893' },
    { name: 'Kaneohe', slug: 'kaneohe-hi', county: 'Honolulu County', lat: 21.4180, lng: -157.8036, pop: '33,540' },
    { name: 'Mililani Town', slug: 'mililani-town-hi', county: 'Honolulu County', lat: 21.4519, lng: -158.0147, pop: '28,608' },
    { name: 'Kahului', slug: 'kahului-hi', county: 'Maui County', lat: 20.8893, lng: -156.4729, pop: '29,926' },
    { name: 'Ewa Gentry', slug: 'ewa-gentry-hi', county: 'Honolulu County', lat: 21.3397, lng: -158.0311, pop: '26,457' },
    { name: 'Kapolei', slug: 'kapolei-hi', county: 'Honolulu County', lat: 21.3350, lng: -158.0581, pop: '21,541' },
    { name: 'Kihei', slug: 'kihei-hi', county: 'Maui County', lat: 20.7650, lng: -156.4456, pop: '23,456' },
    { name: 'Lahaina', slug: 'lahaina-hi', county: 'Maui County', lat: 20.8783, lng: -156.6825, pop: '12,702' },
    { name: 'Kona', slug: 'kona-hi', county: 'Hawaii County', lat: 19.6400, lng: -155.9969, pop: '14,903' },
    { name: 'Wailuku', slug: 'wailuku-hi', county: 'Maui County', lat: 20.8911, lng: -156.5047, pop: '17,697' },
  ]
};

function generateContent(city, stateAbbr, stateName) {
  const desc = `Need a dumpster in ${city.name}, ${stateAbbr}? Dumpster Champs delivers roll-off containers throughout ${city.county} with same-day service, flat-rate pricing from $495, and no hidden fees.`;

  const aiDesc = `## Dumpster Rental in ${city.name}, ${stateName}\n\nSkip the brokers and work with a company that owns its trucks. We provide same-day dumpster delivery throughout ${city.county} with transparent, all-inclusive pricing.\n\n### Flat-Rate Pricing\n\nOur ${city.name} pricing includes:\n- Delivery to your ${city.county} address\n- 7-day rental (extensions available)\n- Tonnage allowance built in\n- Pickup when you call\n\nNo hidden fees. The quote is the price.\n\n### Same-Day Delivery\n\nOrder before noon, get your dumpster today. Our local fleet means fast service throughout ${city.county}.\n\n## ${city.name} Projects\n\n**Home Renovations**: Kitchen remodels, bathroom updates, flooring projects.\n**Roofing**: Tear-offs without weight surprises.\n**Cleanouts**: Estate and garage cleanouts made simple.\n**Construction**: Reliable jobsite logistics.\n\n## Sizes & Pricing\n\n| Size | Best For | Price |\n|------|----------|-------|\n| 10 Yard | Small cleanouts | $495 |\n| 15 Yard | Single room | $550 |\n| 20 Yard | Kitchen remodel | $595 |\n| 30 Yard | Major renovation | $695 |\n| 40 Yard | Large construction | $795 |\n\n## Permits\n\n**Private Property**: No permit needed.\n**Street**: Contact ${city.name} or ${city.county} for requirements.\n\nCall (888) 860-0710 for a free quote.`;

  const whyChooseUs = `## Why ${city.name} Chooses Us\n\n**Not a Broker**: We own our equipment.\n**Honest Pricing**: No surprises.\n**Same-Day Delivery**: Fast service.\n**Property Protection**: Full insurance.`;
  const climate = `${city.name}'s climate allows year-round dumpster rental. Plan around peak seasons for best availability.`;
  const permits = `**Private Property**: No permit required.\n**Street**: Contact ${city.name} or ${city.county} for requirements.`;
  const metaTitle = `Dumpster Rental ${city.name}, ${stateAbbr} | Same-Day from $495 [2026]`;
  const metaDesc = `Fast dumpster rental in ${city.name}, ${stateName}. 10-40 yard containers from $495. Same-day delivery, no hidden fees. Call (888) 860-0710.`;

  return { desc, aiDesc, whyChooseUs, climate, permits, metaTitle, metaDesc };
}

async function addCitiesForState(abbr, stateName, cities) {
  const stateResult = await query(`SELECT id FROM State WHERE abbr = '${abbr}'`);
  const stateId = stateResult.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
  if (!stateId) { console.log(`Could not find ${abbr}`); return 0; }

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
    } catch (err) { console.error(`  ✗ ${city.name}`); }
  }
  return newCities.length;
}

async function main() {
  let total = 0;
  total += await addCitiesForState('MS', 'Mississippi', stateCities.MS);
  total += await addCitiesForState('AR', 'Arkansas', stateCities.AR);
  total += await addCitiesForState('HI', 'Hawaii', stateCities.HI);
  console.log(`\nDone! Added ${total} cities.`);
}

main().catch(console.error);
