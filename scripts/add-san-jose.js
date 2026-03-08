// Add San Jose, CA to DumpsterChamps
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

const city = {
  name: 'San Jose',
  slug: 'san-jose-ca',
  county: 'Santa Clara County',
  lat: 37.3382,
  lng: -121.8863,
  pop: '1,013,240'
};

const desc = `Need a dumpster in San Jose, California? Dumpster Champs delivers roll-off containers throughout Santa Clara County with same-day service, flat-rate pricing from $495, and no hidden fees. From Silicon Valley home renovations to construction projects, we have the right size dumpster for your San Jose project.`;

const aiDesc = `## Dumpster Rental in San Jose, CA — Fast, Reliable, No Broker Games

San Jose is the heart of Silicon Valley, and homeowners here don't have time for unreliable dumpster companies. When you're renovating a mid-century Willow Glen bungalow, clearing out a garage in Almaden Valley, or managing construction debris in North San Jose, you need a dumpster company that shows up when they say they will.

That's us. We own our trucks. We own our containers. No brokers, no middlemen, no surprise fees.

### What's Included in San Jose Pricing

Our flat-rate pricing covers everything:
- **Delivery** to your Santa Clara County address — no fuel surcharges
- **7-day rental** — need more time? Extensions available
- **Tonnage allowance** — built into the price, not a surprise at pickup
- **Pickup** when you're done — just call

No admin fees. No environmental fees. No "we forgot to mention" charges. The quote is the price.

### Same-Day Dumpster Delivery in San Jose

Order before noon and we'll have a container at your San Jose property today. Our local fleet serves all of Santa Clara County — from Milpitas to Los Gatos, Campbell to Cupertino. You're not waiting 3-5 days like with national chains.

### We Protect Silicon Valley Driveways

San Jose homes aren't cheap, and neither are the driveways. We use boards under every container as standard practice — not an upsell. And we carry full liability insurance, so you're covered if anything goes wrong.

## Popular San Jose Dumpster Projects

**Home Renovations**: San Jose's housing stock ranges from 1950s ranches to modern builds. Whether you're updating a Cambrian Park fixer-upper or gutting a kitchen in Rose Garden, our 20-yard containers handle demo debris, old cabinets, flooring, and fixtures.

**Tech Campus Cleanouts**: When companies downsize or relocate, we handle the office furniture, e-waste staging areas, and general debris. (Note: actual e-waste requires specialized disposal — we can advise.)

**Roofing Projects**: California sun beats down on roofs year-round. When it's time for a tear-off, we deliver containers sized for shingle weight without overage surprises.

**Estate Cleanouts**: The Bay Area's multigenerational families often face major cleanouts. We position dumpsters, you fill them, we haul — as many loads as needed.

**ADU Construction**: San Jose's push for Accessory Dwelling Units means constant construction. We provide reliable jobsite logistics for ADU builders throughout Santa Clara County.

## San Jose Neighborhoods We Serve

We deliver dumpsters throughout San Jose, including:
- **Willow Glen** — Tree-lined streets, historic homes, renovation-heavy
- **Almaden Valley** — Larger properties, estate cleanouts common
- **Cambrian Park** — Mix of original and updated homes
- **Rose Garden** — Historic district, careful driveway work
- **Evergreen** — East side, growing area
- **North San Jose** — Tech corridor, commercial + residential
- **Downtown San Jose** — Permit-heavy, we help navigate
- **Berryessa** — Near BART extension, lots of activity
- **Santa Teresa** — South San Jose, hillside properties
- **Silver Creek** — Newer developments

## Dumpster Sizes for San Jose Projects

| Size | Best For | Price |
|------|----------|-------|
| 10 Yard | Garage cleanouts, small bathroom remodels | $495 |
| 15 Yard | Single room renovations, medium cleanouts | $550 |
| 20 Yard | Kitchen remodels, roofing (up to 25 squares), ADU debris | $595 |
| 30 Yard | Major renovations, whole-house cleanouts | $695 |
| 40 Yard | Large construction, commercial projects, estate cleanouts | $795 |

## San Jose Permit Information

**Private Property**: No permit required when the dumpster sits on your driveway or yard — this covers most residential projects.

**Street Placement**: San Jose requires an encroachment permit for dumpsters placed in the public right-of-way. Contact the City of San Jose Department of Transportation for current requirements and fees. Processing typically takes 3-5 business days.

**Downtown San Jose**: Additional restrictions may apply in the downtown core. Call us and we'll help you figure out the best approach.

## Why San Jose Chooses Dumpster Champs

**Not a Broker**: We own our equipment. You talk to us, we deliver, we pick up. No middlemen marking up your job.

**Silicon Valley Speed**: Same-day delivery available. Order by noon, get your dumpster today.

**Transparent Pricing**: Everything included in the quote. No surprise fees, no weight games.

**Property Protection**: Boards under containers, full insurance coverage. Your driveway is safe.

## Ready to Get Started?

Skip the brokers and call (888) 860-0710 for honest pricing on San Jose dumpster rental. Or fill out the quote form above — we'll get back to you fast.`;

const whyChooseUs = `## Why San Jose Chooses Dumpster Champs

**Not a Broker**: We own our trucks and dumpsters. Direct service throughout Santa Clara County.

**Transparent Pricing**: The quote includes everything — delivery, pickup, disposal, tonnage. No surprises.

**Same-Day Delivery**: Order by noon, get your dumpster today. Silicon Valley speed.

**Driveway Protection**: Boards under containers as standard. Full liability insurance.

**Local Knowledge**: We know San Jose neighborhoods, permit requirements, and access challenges.`;

const climate = `San Jose's Mediterranean climate means year-round dumpster rental is practical. Mild winters and dry summers make any season good for outdoor projects. The only consideration: summer heat can make heavy outdoor work challenging — early morning deliveries are popular May through September. Rainy season (November-March) occasionally affects scheduling, but most projects proceed normally throughout Santa Clara County.`;

const permits = `**Driveway/Private Property**: No permit required in San Jose when the dumpster is placed on your property.

**Street/Public Right-of-Way**: San Jose requires an encroachment permit for street placement. Contact the San Jose Department of Transportation. Expect 3-5 business days for processing.

**Downtown Core**: Additional restrictions may apply. Call us for guidance.

**HOA Communities**: Many San Jose neighborhoods have HOA rules about dumpster placement and duration. Check your CC&Rs before delivery.

We help San Jose customers navigate permit requirements — just ask when you call.`;

const metaTitle = `Dumpster Rental San Jose, CA | Same-Day from $495 [2026]`;
const metaDesc = `Fast, affordable dumpster rental in San Jose, California. 10-40 yard roll-off containers from $495. Same-day delivery throughout Santa Clara County. No hidden fees. Call (888) 860-0710.`;

async function main() {
  // Get California state ID
  const stateResult = await query("SELECT id FROM State WHERE abbr = 'CA'");
  const stateId = stateResult.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
  if (!stateId) { console.error('Could not find CA state ID'); return; }
  console.log('CA state ID:', stateId);

  // Check if San Jose already exists
  const existingResult = await query("SELECT id FROM City WHERE slug = ?", [city.slug]);
  if (existingResult.results?.[0]?.response?.result?.rows?.length > 0) {
    console.log('San Jose already exists, updating...');
    const sql = `UPDATE City SET description = ?, metaTitle = ?, metaDesc = ?, county = ?, latitude = ?, longitude = ?, population = ?, aiDescription = ?, whyChooseUs = ?, climate = ?, permits = ?, updatedAt = datetime('now') WHERE slug = ?`;
    await query(sql, [desc, metaTitle, metaDesc, city.county, city.lat, city.lng, city.pop, aiDesc, whyChooseUs, climate, permits, city.slug]);
    console.log('✓ Updated San Jose, CA');
  } else {
    const id = `city_ca_san_jose_${Date.now()}`;
    const sql = `INSERT INTO City (id, name, slug, stateId, description, metaTitle, metaDesc, county, latitude, longitude, population, aiDescription, whyChooseUs, climate, permits, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
    await query(sql, [id, city.name, city.slug, stateId, desc, metaTitle, metaDesc, city.county, city.lat, city.lng, city.pop, aiDesc, whyChooseUs, climate, permits]);
    console.log('✓ Added San Jose, CA');
  }
}

main().catch(console.error);
