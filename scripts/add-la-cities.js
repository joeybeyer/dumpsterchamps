// Add Louisiana cities to DumpsterChamps
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

const laCities = [
  { name: 'New Orleans', slug: 'new-orleans-la', county: 'Orleans Parish', lat: 29.9511, lng: -90.0715, pop: '383,997' },
  { name: 'Baton Rouge', slug: 'baton-rouge-la', county: 'East Baton Rouge Parish', lat: 30.4515, lng: -91.1871, pop: '227,470' },
  { name: 'Shreveport', slug: 'shreveport-la', county: 'Caddo Parish', lat: 32.5252, lng: -93.7502, pop: '187,593' },
  { name: 'Lafayette', slug: 'lafayette-la', county: 'Lafayette Parish', lat: 30.2241, lng: -92.0198, pop: '126,066' },
  { name: 'Lake Charles', slug: 'lake-charles-la', county: 'Calcasieu Parish', lat: 30.2266, lng: -93.2174, pop: '84,872' },
  { name: 'Kenner', slug: 'kenner-la', county: 'Jefferson Parish', lat: 29.9941, lng: -90.2417, pop: '66,702' },
  { name: 'Bossier City', slug: 'bossier-city-la', county: 'Bossier Parish', lat: 32.5160, lng: -93.7321, pop: '68,094' },
  { name: 'Monroe', slug: 'monroe-la', county: 'Ouachita Parish', lat: 32.5093, lng: -92.1193, pop: '47,877' },
  { name: 'Alexandria', slug: 'alexandria-la', county: 'Rapides Parish', lat: 31.3113, lng: -92.4451, pop: '46,342' },
  { name: 'Houma', slug: 'houma-la', county: 'Terrebonne Parish', lat: 29.5958, lng: -90.7195, pop: '33,727' },
  { name: 'Metairie', slug: 'metairie-la', county: 'Jefferson Parish', lat: 29.9841, lng: -90.1526, pop: '145,791' },
  { name: 'Slidell', slug: 'slidell-la', county: 'St. Tammany Parish', lat: 30.2752, lng: -89.7812, pop: '28,781' },
  { name: 'Central', slug: 'central-la', county: 'East Baton Rouge Parish', lat: 30.5541, lng: -91.0368, pop: '29,695' },
  { name: 'Ruston', slug: 'ruston-la', county: 'Lincoln Parish', lat: 32.5232, lng: -92.6379, pop: '22,370' },
  { name: 'Sulphur', slug: 'sulphur-la', county: 'Calcasieu Parish', lat: 30.2366, lng: -93.3774, pop: '20,165' },
  { name: 'Hammond', slug: 'hammond-la', county: 'Tangipahoa Parish', lat: 30.5044, lng: -90.4612, pop: '20,557' },
  { name: 'Natchitoches', slug: 'natchitoches-la', county: 'Natchitoches Parish', lat: 31.7607, lng: -93.0863, pop: '18,323' },
  { name: 'Zachary', slug: 'zachary-la', county: 'East Baton Rouge Parish', lat: 30.6488, lng: -91.1565, pop: '17,535' },
  { name: 'Thibodaux', slug: 'thibodaux-la', county: 'Lafourche Parish', lat: 29.7958, lng: -90.8229, pop: '14,566' },
  { name: 'Opelousas', slug: 'opelousas-la', county: 'St. Landry Parish', lat: 30.5335, lng: -92.0815, pop: '16,634' },
  { name: 'Mandeville', slug: 'mandeville-la', county: 'St. Tammany Parish', lat: 30.3580, lng: -90.0684, pop: '13,159' },
  { name: 'Covington', slug: 'covington-la', county: 'St. Tammany Parish', lat: 30.4755, lng: -90.1009, pop: '10,824' },
  { name: 'Morgan City', slug: 'morgan-city-la', county: 'St. Mary Parish', lat: 29.6994, lng: -91.2068, pop: '11,651' },
  { name: 'West Monroe', slug: 'west-monroe-la', county: 'Ouachita Parish', lat: 32.5185, lng: -92.1474, pop: '12,852' },
  { name: 'Crowley', slug: 'crowley-la', county: 'Acadia Parish', lat: 30.2141, lng: -92.3746, pop: '12,817' },
];

function generateCityContent(city) {
  const desc = `Looking for dumpster rental in ${city.name}, Louisiana? Dumpster Champs delivers roll-off containers throughout ${city.county} with same-day service, flat-rate pricing from $495, and no hidden fees.`;

  const aiDesc = `## Dumpster Rental in ${city.name}, Louisiana

Skip the national brokers and work with a company that actually delivers what they promise. In ${city.name}, that means same-day dumpster delivery, honest pricing, and no surprise fees when we pick up.

### What You Actually Pay in ${city.name}

Our flat-rate pricing includes everything:
- Delivery to your ${city.county} address
- 7-day rental (extensions available)
- Your tonnage allowance — built in, not a surprise
- Pickup when you're done

No admin fees, no environmental surcharges, no hidden costs. The price we quote is the price you pay.

### Fast Delivery Across ${city.county}

Order before noon and we deliver today. Our Louisiana fleet means you're not waiting 3-5 days like with national chains. We know ${city.name}, we know the neighborhoods, and we know how to get a dumpster into your driveway without problems.

### Hurricane Season Ready

Living in Louisiana means dealing with storm debris. When hurricanes hit ${city.name}, demand for dumpsters spikes. We scale our capacity for storm season and prioritize our existing customers. Book ahead of major storms when possible.

## ${city.name} Dumpster Projects

**Storm Cleanup**: ${city.name} sees its share of weather damage. Fallen trees, damaged roofing, flooded basement contents — we handle debris removal after the storm passes.

**Home Renovations**: Whether you're updating a historic ${city.county} home or gutting a 1970s ranch, our containers handle demo debris, old cabinets, flooring, and fixtures.

**Estate Cleanouts**: When it's time to clear out a family property in ${city.name}, we make it simple. Fill, call, we pick up. Repeat until done.

**Construction Sites**: Contractors across ${city.county} trust us for reliable jobsite logistics with consistent pricing.

## Dumpster Sizes for ${city.name}

| Size | Best For | Price |
|------|----------|-------|
| 10 Yard | Garage cleanouts, bathroom remodels | $495 |
| 15 Yard | Single room renovations | $550 |
| 20 Yard | Kitchen remodels, roofing projects | $595 |
| 30 Yard | Major renovations, estate cleanouts | $695 |
| 40 Yard | Large construction, commercial | $795 |

## ${city.name} Permit Info

**Private Property**: No permit required when placed on your driveway or yard.

**Street/Right-of-Way**: Contact ${city.name} or ${city.county} for permit requirements.

## Get Started

Call (888) 860-0710 or fill out the quote form for honest pricing on ${city.name} dumpster rental.`;

  const whyChooseUs = `## Why ${city.name} Chooses Dumpster Champs

**Not a Broker**: We own our trucks and dumpsters. Direct service, no middlemen.

**Honest Pricing**: Everything included. No surprise fees.

**Same-Day Delivery**: Order by noon, get your dumpster today.

**Storm Ready**: Louisiana weather demands reliable service partners.`;

  const climate = `${city.name}'s humid subtropical climate means year-round project capability, but plan around hurricane season (June-November). Spring and fall offer the best working conditions. Summer heat and afternoon storms can slow outdoor projects. We recommend early morning deliveries during peak summer months in ${city.county}.`;

  const permits = `**Private Property**: No permit required in ${city.name} for driveway placement.

**Street Placement**: Contact ${city.name} Public Works or ${city.county} for requirements.

**Flood Zones**: Some ${city.name} areas have special placement requirements. We help navigate local rules.`;

  const metaTitle = `Dumpster Rental ${city.name}, LA | Same-Day from $495 [2026]`;
  const metaDesc = `Fast dumpster rental in ${city.name}, Louisiana. 10-40 yard containers from $495. Same-day delivery, no hidden fees. Call (888) 860-0710.`;

  return { desc, aiDesc, whyChooseUs, climate, permits, metaTitle, metaDesc };
}

async function main() {
  const stateResult = await query("SELECT id FROM State WHERE abbr = 'LA'");
  const stateId = stateResult.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
  if (!stateId) { console.error('Could not find LA state ID'); return; }
  console.log('LA state ID:', stateId);

  const existingResult = await query("SELECT slug FROM City WHERE stateId = ?", [stateId]);
  const existingSlugs = new Set(existingResult.results?.[0]?.response?.result?.rows?.map(r => r[0]?.value) || []);
  console.log('Existing LA cities:', existingSlugs.size);

  const newCities = laCities.filter(c => !existingSlugs.has(c.slug));
  console.log('New cities to add:', newCities.length);

  for (const city of newCities) {
    const content = generateCityContent(city);
    const id = `city_la_${city.slug.replace(/-/g, '_')}_${Date.now()}`;
    const sql = `INSERT INTO City (id, name, slug, stateId, description, metaTitle, metaDesc, county, latitude, longitude, population, aiDescription, whyChooseUs, climate, permits, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
    try {
      await query(sql, [id, city.name, city.slug, stateId, content.desc, content.metaTitle, content.metaDesc, city.county, city.lat, city.lng, city.pop, content.aiDesc, content.whyChooseUs, content.climate, content.permits]);
      console.log(`✓ Added: ${city.name}, LA`);
    } catch (err) { console.error(`✗ Failed: ${city.name}`, err.message); }
  }
  console.log('\nDone!');
}

main().catch(console.error);
