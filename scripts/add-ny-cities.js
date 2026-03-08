// Add New York cities to DumpsterChamps
const TURSO_URL = 'https://dumpsterchamps-joeybeyer.aws-us-east-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzExNzMyMDcsImlkIjoiZjE4ZDg2N2UtYzc4MS00Y2VmLTg5MWUtMDg1ODZlYWMzMWYzIiwicmlkIjoiYzM0YmNiNTUtMzFkNy00ZDFmLTg5MDYtN2VhYzFjNGQ5ZGU5In0.XB0pX1WPepWleHo-bQQ4uDZCU4BCyKN4MmoqoyL3MnvMBE6eUWXpsTiJxcI9yPZcf-65vm2xAZwQDESNZaO4Dw';

async function query(sql, args = []) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TURSO_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(a => ({ type: 'text', value: String(a) })) } },
        { type: 'close' }
      ]
    })
  });
  return res.json();
}

const nyCities = [
  { name: 'New York City', slug: 'new-york-city-ny', county: 'New York County', lat: 40.7128, lng: -74.0060, pop: '8,336,817' },
  { name: 'Buffalo', slug: 'buffalo-ny', county: 'Erie County', lat: 42.8864, lng: -78.8784, pop: '278,349' },
  { name: 'Rochester', slug: 'rochester-ny', county: 'Monroe County', lat: 43.1566, lng: -77.6088, pop: '211,328' },
  { name: 'Yonkers', slug: 'yonkers-ny', county: 'Westchester County', lat: 40.9312, lng: -73.8987, pop: '211,569' },
  { name: 'Syracuse', slug: 'syracuse-ny', county: 'Onondaga County', lat: 43.0481, lng: -76.1474, pop: '148,620' },
  { name: 'Albany', slug: 'albany-ny', county: 'Albany County', lat: 42.6526, lng: -73.7562, pop: '99,224' },
  { name: 'New Rochelle', slug: 'new-rochelle-ny', county: 'Westchester County', lat: 40.9115, lng: -73.7824, pop: '79,726' },
  { name: 'Mount Vernon', slug: 'mount-vernon-ny', county: 'Westchester County', lat: 40.9126, lng: -73.8371, pop: '73,893' },
  { name: 'Schenectady', slug: 'schenectady-ny', county: 'Schenectady County', lat: 42.8142, lng: -73.9396, pop: '67,875' },
  { name: 'Utica', slug: 'utica-ny', county: 'Oneida County', lat: 43.1009, lng: -75.2327, pop: '65,284' },
  { name: 'White Plains', slug: 'white-plains-ny', county: 'Westchester County', lat: 41.0340, lng: -73.7629, pop: '58,109' },
  { name: 'Hempstead', slug: 'hempstead-ny', county: 'Nassau County', lat: 40.7062, lng: -73.6187, pop: '55,361' },
  { name: 'Troy', slug: 'troy-ny', county: 'Rensselaer County', lat: 42.7284, lng: -73.6918, pop: '51,401' },
  { name: 'Niagara Falls', slug: 'niagara-falls-ny', county: 'Niagara County', lat: 43.0962, lng: -79.0377, pop: '50,193' },
  { name: 'Binghamton', slug: 'binghamton-ny', county: 'Broome County', lat: 42.0987, lng: -75.9180, pop: '47,376' },
  { name: 'Freeport', slug: 'freeport-ny', county: 'Nassau County', lat: 40.6576, lng: -73.5832, pop: '43,713' },
  { name: 'Valley Stream', slug: 'valley-stream-ny', county: 'Nassau County', lat: 40.6643, lng: -73.7085, pop: '37,511' },
  { name: 'Long Beach', slug: 'long-beach-ny', county: 'Nassau County', lat: 40.5884, lng: -73.6579, pop: '33,454' },
  { name: 'Spring Valley', slug: 'spring-valley-ny', county: 'Rockland County', lat: 41.1132, lng: -74.0437, pop: '33,332' },
  { name: 'Rome', slug: 'rome-ny', county: 'Oneida County', lat: 43.2128, lng: -75.4557, pop: '33,725' },
  { name: 'Ithaca', slug: 'ithaca-ny', county: 'Tompkins County', lat: 42.4440, lng: -76.5019, pop: '32,108' },
  { name: 'Poughkeepsie', slug: 'poughkeepsie-ny', county: 'Dutchess County', lat: 41.7004, lng: -73.9210, pop: '31,577' },
  { name: 'Port Chester', slug: 'port-chester-ny', county: 'Westchester County', lat: 41.0018, lng: -73.6657, pop: '29,639' },
  { name: 'Jamestown', slug: 'jamestown-ny', county: 'Chautauqua County', lat: 42.0970, lng: -79.2353, pop: '28,712' },
  { name: 'Elmira', slug: 'elmira-ny', county: 'Chemung County', lat: 42.0898, lng: -76.8077, pop: '27,759' },
];

function generateCityContent(city) {
  const desc = `Need a dumpster in ${city.name}, New York? Dumpster Champs delivers roll-off containers throughout ${city.county} with same-day service, flat-rate pricing from $495, and no hidden fees. From home renovations to construction cleanups, we have the right size for your ${city.name} project.`;

  const aiDesc = `## Dumpster Rental in ${city.name}, NY — No Brokers, No Games

When you search for dumpster rental in ${city.name}, you'll find dozens of companies. Most are brokers — they take your order, mark it up, and hand it off to whoever's cheapest. You end up with surprise fees, missed delivery windows, and no one to call when something goes wrong.

We're different. We own our trucks. We own our dumpsters. When you book with Dumpster Champs, you're working directly with the team that shows up at your ${city.name} property.

### What's Actually Included in Our ${city.name} Pricing

- **Delivery to your ${city.county} address** — no fuel surcharges
- **7-day rental** — extensions available if you need more time
- **Tonnage allowance** — built into the price, not a surprise at pickup
- **Pickup when you're done** — call us and we're there

No admin fees. No environmental fees. No "we forgot to mention" charges.

### Same-Day Dumpster Delivery in ${city.name}

Order before noon and we'll have a container in your driveway today. Our ${city.county} fleet means fast response times — not the 3-5 day waits you get from national chains.

### We Protect Your Property

Every delivery includes driveway protection boards under the container. It's standard, not an upsell. And we carry full liability coverage — because we actually care about doing the job right.

## Common ${city.name} Dumpster Projects

**Winter Storm Cleanups**: ${city.name}'s winters create debris. After major storms, we help homeowners clear fallen branches, damaged siding, and interior water damage debris.

**Home Renovations**: Whether you're updating a ${city.county} colonial or gutting a fixer-upper, our 20 and 30-yard containers handle drywall, flooring, cabinets, and demo debris.

**Estate Cleanouts**: Clearing out a lifetime of belongings is hard. We make the logistics easy — position, fill, swap, repeat until the job's done.

**Roofing Projects**: New York weather is hard on roofs. When it's tear-off time, we deliver containers sized for shingle weight without overage surprises.

## ${city.name} Dumpster Sizes

| Size | Best For | Price |
|------|----------|-------|
| 10 Yard | Basement cleanouts, small bathroom remodels | $495 |
| 15 Yard | Single room renovations, garage cleanouts | $550 |
| 20 Yard | Kitchen remodels, roofing up to 25 squares | $595 |
| 30 Yard | Major renovations, whole-house cleanouts | $695 |
| 40 Yard | Large construction, commercial projects | $795 |

## Permits in ${city.name}

**Private Property**: No permit needed when the dumpster sits on your driveway or yard.

**Street Placement**: Contact ${city.name} or ${city.county} for right-of-way permit requirements. Rules vary — we can help you figure it out.

## Get Your ${city.name} Dumpster Quote

Stop dealing with brokers. Call (888) 860-0710 or fill out the quote form for honest pricing from a real dumpster company.`;

  const whyChooseUs = `## Why ${city.name} Residents Trust Dumpster Champs

**We're Not a Broker**: We own our equipment. You talk to us, we deliver, we pick up. No middlemen.

**Honest Pricing**: The quote includes everything. No hidden fees, no weight surprises.

**Fast Delivery**: Same-day available throughout ${city.county}. Order by noon, get it today.

**Property Protection**: Boards under containers, full insurance coverage. Your driveway is safe.`;

  const climate = `${city.name}'s four-season climate affects project timing. Spring and fall are ideal for outdoor renovations. Winter can limit access but interior projects continue year-round. Summer is peak season — book early for best availability in ${city.county}.`;

  const permits = `**Driveway/Private Property**: No permit required in ${city.name}.

**Street Placement**: Contact ${city.name} Code Enforcement or ${city.county} for permit requirements.

**Timing**: Most New York municipalities require 24-48 hours for permit processing.`;

  const metaTitle = `Dumpster Rental ${city.name}, NY | Same-Day from $495 [2026]`;
  const metaDesc = `Affordable dumpster rental in ${city.name}, New York. 10-40 yard containers from $495. Same-day delivery, no hidden fees. Call (888) 860-0710.`;

  return { desc, aiDesc, whyChooseUs, climate, permits, metaTitle, metaDesc };
}

async function main() {
  const stateResult = await query("SELECT id FROM State WHERE abbr = 'NY'");
  const stateId = stateResult.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
  if (!stateId) { console.error('Could not find NY state ID'); return; }
  console.log('NY state ID:', stateId);

  const existingResult = await query("SELECT slug FROM City WHERE stateId = ?", [stateId]);
  const existingSlugs = new Set(existingResult.results?.[0]?.response?.result?.rows?.map(r => r[0]?.value) || []);
  console.log('Existing NY cities:', existingSlugs.size);

  const newCities = nyCities.filter(c => !existingSlugs.has(c.slug));
  console.log('New cities to add:', newCities.length);

  for (const city of newCities) {
    const content = generateCityContent(city);
    const id = `city_ny_${city.slug.replace(/-/g, '_')}_${Date.now()}`;
    
    const sql = `INSERT INTO City (id, name, slug, stateId, description, metaTitle, metaDesc, county, latitude, longitude, population, aiDescription, whyChooseUs, climate, permits, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
    
    try {
      await query(sql, [id, city.name, city.slug, stateId, content.desc, content.metaTitle, content.metaDesc, city.county, city.lat, city.lng, city.pop, content.aiDesc, content.whyChooseUs, content.climate, content.permits]);
      console.log(`✓ Added: ${city.name}, NY`);
    } catch (err) {
      console.error(`✗ Failed: ${city.name}`, err.message);
    }
  }
  console.log('\nDone!');
}

main().catch(console.error);
