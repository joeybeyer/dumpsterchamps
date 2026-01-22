import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// State abbreviation to name mapping
const STATE_MAP: Record<string, { name: string; abbr: string }> = {
  'al': { name: 'Alabama', abbr: 'AL' },
  'az': { name: 'Arizona', abbr: 'AZ' },
  'ca': { name: 'California', abbr: 'CA' },
  'co': { name: 'Colorado', abbr: 'CO' },
  'ct': { name: 'Connecticut', abbr: 'CT' },
  'fl': { name: 'Florida', abbr: 'FL' },
  'ga': { name: 'Georgia', abbr: 'GA' },
  'ia': { name: 'Iowa', abbr: 'IA' },
  'id': { name: 'Idaho', abbr: 'ID' },
  'il': { name: 'Illinois', abbr: 'IL' },
  'in': { name: 'Indiana', abbr: 'IN' },
  'ks': { name: 'Kansas', abbr: 'KS' },
  'ky': { name: 'Kentucky', abbr: 'KY' },
  'ma': { name: 'Massachusetts', abbr: 'MA' },
  'mi': { name: 'Michigan', abbr: 'MI' },
  'mn': { name: 'Minnesota', abbr: 'MN' },
  'mo': { name: 'Missouri', abbr: 'MO' },
  'nc': { name: 'North Carolina', abbr: 'NC' },
  'ny': { name: 'New York', abbr: 'NY' },
  'oh': { name: 'Ohio', abbr: 'OH' },
  'ok': { name: 'Oklahoma', abbr: 'OK' },
  'or': { name: 'Oregon', abbr: 'OR' },
  'pa': { name: 'Pennsylvania', abbr: 'PA' },
  'sc': { name: 'South Carolina', abbr: 'SC' },
  'tn': { name: 'Tennessee', abbr: 'TN' },
  'tx': { name: 'Texas', abbr: 'TX' },
  'va': { name: 'Virginia', abbr: 'VA' },
  'wa': { name: 'Washington', abbr: 'WA' },
  'wi': { name: 'Wisconsin', abbr: 'WI' },
};

// Cities that need manual state assignment (no state in URL)
const MANUAL_STATE_ASSIGNMENTS: Record<string, string> = {
  // Alabama cities (no state suffix on Duda)
  'southside': 'al',
  'childersburg': 'al',
  'rainsville': 'al',
  'robertsdale': 'al',
  'brewton': 'al',
  'saraland': 'al',
  'spanish-fort': 'al',
  'jackson': 'al', // Note: jackson-al81662586 has weird suffix
  'orange-beach': 'al',
  'montevallo': 'al',
  'lincoln': 'al',
  'sylacauga': 'al',
  'satsuma': 'al',
  'muscle-shoals': 'al',
  'piedmont': 'al',
  'hartselle': 'al',
  'chickasaw': 'al',
};

// Convert slug to proper city name
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Parse city URL to extract city name and state
function parseCityUrl(url: string): { cityName: string; citySlug: string; stateAbbr: string } | null {
  // Skip non-city URLs
  if (!url.startsWith('dumpster-rental-')) return null;

  // Skip state-only pages
  const stateOnlyPages = ['vermont', 'wyoming', 'west-virginia', 'utah', 'nationwide'];
  const afterPrefix = url.replace('dumpster-rental-', '');
  if (stateOnlyPages.includes(afterPrefix)) return null;

  // Try to match city-state pattern (e.g., los-angeles-ca)
  const cityStateMatch = url.match(/^dumpster-rental-(.+)-([a-z]{2})$/i);
  if (cityStateMatch) {
    let citySlugPart = cityStateMatch[1];
    const stateAbbr = cityStateMatch[2].toLowerCase();

    // Handle special cases
    if (citySlugPart === 'in-weston') {
      citySlugPart = 'weston'; // Fix "dumpster-rental-in-weston-fl"
    }

    // Handle weird suffix like jackson-al81662586
    citySlugPart = citySlugPart.replace(/\d+$/, '');

    return {
      cityName: slugToName(citySlugPart),
      citySlug: `${citySlugPart}-${stateAbbr}`,
      stateAbbr: stateAbbr
    };
  }

  // Check manual state assignments (Alabama cities without state suffix)
  const cityPart = url.replace('dumpster-rental-', '');
  if (MANUAL_STATE_ASSIGNMENTS[cityPart]) {
    const stateAbbr = MANUAL_STATE_ASSIGNMENTS[cityPart];
    return {
      cityName: slugToName(cityPart),
      citySlug: `${cityPart}-${stateAbbr}`,
      stateAbbr: stateAbbr
    };
  }

  return null;
}

async function addMissingCities() {
  console.log('Reading missing URLs...\n');

  // Missing city URLs (extracted from missing-urls.txt)
  const missingUrls = [
    'dumpster-rental-twin-falls-id',
    'dumpster-rental-palmdale-ca',
    'dumpster-rental-southside-al',
    'dumpster-rental-childersburg-al',
    'dumpster-rental-rainsville-al',
    'dumpster-rental-robertsdale-al',
    'dumpster-rental-brewton-al',
    'dumpster-rental-saraland-al',
    'dumpster-rental-spanish-fort-al',
    'dumpster-rental-jackson-al',
    'dumpster-rental-oxnard-ca',
    'dumpster-rental-santa-clarita-ca',
    'dumpster-rental-moreno-valley-ca',
    'dumpster-rental-huntington-beach-ca',
    'dumpster-rental-ontario-ca',
    'dumpster-rental-rancho-cucamonga-ca',
    'dumpster-rental-oceanside-ca',
    'dumpster-rental-orange-beach-al',
    'dumpster-rental-montevallo-al',
    'dumpster-rental-lincoln-al',
    'dumpster-rental-sylacauga-al',
    'dumpster-rental-san-bernardino-ca',
    'dumpster-rental-glendale-ca',
    'dumpster-rental-simi-valley-ca',
    'dumpster-rental-satsuma-al',
    'dumpster-rental-garden-grove-ca',
    'dumpster-rental-muscle-shoals-al',
    'dumpster-rental-piedmont-al',
    'dumpster-rental-irvine-ca',
    'dumpster-rental-modesto-ca',
    'dumpster-rental-hartselle-al',
    'dumpster-rental-chickasaw-al',
    'dumpster-rental-westminster-co',
    'dumpster-rental-thornton-co',
    'dumpster-rental-arvada-co',
    'dumpster-rental-oro-valley-az',
    'dumpster-rental-sierra-vista-az',
    'dumpster-rental-casa-grande-az',
    'dumpster-rental-marana-az',
    'dumpster-rental-tucson-az',
    'dumpster-rental-stamford-ct',
    'dumpster-rental-norwalk-ct',
    'dumpster-rental-danbury-ct',
    'dumpster-rental-middletown-ct',
    'dumpster-rental-shelton-ct',
    'dumpster-rental-norwich-ct',
    'dumpster-rental-mesa-az',
    'dumpster-rental-glendale-az',
    'dumpster-rental-chandler-az',
    'dumpster-rental-nampa-id',
    'dumpster-rental-meridian-id',
    'dumpster-rental-idaho-falls-id',
    'dumpster-rental-athens-ga',
    'dumpster-rental-peoria-az',
    'dumpster-rental-scottsdale-az',
    'dumpster-rental-tempe-az',
    'dumpster-rental-goodyear-az',
    'dumpster-rental-rockford-il',
    'dumpster-rental-vallejo-ca',
    'dumpster-rental-maricopa-az',
    'dumpster-rental-apache-junction-az',
    'dumpster-rental-cedar-rapids-ia',
    'dumpster-rental-davenport-ia',
    'dumpster-rental-sioux-city-ia',
    'dumpster-rental-iowa-city-ia',
    'dumpster-rental-waterloo-ia',
    'dumpster-rental-council-bluffs-ia',
    'dumpster-rental-aurora-il',
    'dumpster-rental-joliet-il',
    'dumpster-rental-naperville-il',
    'dumpster-rental-elgin-il',
    'dumpster-rental-waukegan-il',
    'dumpster-rental-evanston-il',
    'dumpster-rental-arlington-heights-il',
    'dumpster-rental-tinley-park-il',
    'dumpster-rental-cicero-il',
    'dumpster-rental-schaumburg-il',
    'dumpster-rental-augusta-ga',
    'dumpster-rental-savannah-ga',
    'dumpster-rental-columbus-ga',
    'dumpster-rental-macon-ga',
    'dumpster-rental-roswell-ga',
    'dumpster-rental-sandy-springs-ga',
    'dumpster-rental-smyrna-ga',
    'dumpster-rental-gilbert-az',
    'dumpster-rental-surprise-az',
    'dumpster-rental-avondale-az',
    'dumpster-rental-valdosta-ga',
    'dumpster-rental-east-point-ga',
    'dumpster-rental-littleton-co',
    'dumpster-rental-new-britain-ct',
    'dumpster-rental-bristol-ct',
    'dumpster-rental-meriden-ct',
    'dumpster-rental-milford-ct',
    'dumpster-rental-west-haven-ct',
    'dumpster-rental-dubuque-ia',
    'dumpster-rental-waterbury-ct',
    'dumpster-rental-wichita-ks',
    'dumpster-rental-overland-park-ks',
    'dumpster-rental-topeka-ks',
    'dumpster-rental-olathe-ks',
    'dumpster-rental-lawrence-ks',
    'dumpster-rental-shawnee-ks',
    'dumpster-rental-lenexa-ks',
    'dumpster-rental-leavenworth-ks',
    'dumpster-rental-manhattan-ks',
    'dumpster-rental-salina-ks',
    'dumpster-rental-eugene-or',
    'dumpster-rental-wheaton-il',
    'dumpster-rental-mount-prospect-il',
    'dumpster-rental-berwyn-il',
    'dumpster-rental-elmhurst-il',
    'dumpster-rental-dekalb-il',
    'dumpster-rental-lombard-il',
    'dumpster-rental-bloomington-il',
    'dumpster-rental-downers-grove-il',
    'dumpster-rental-glenview-il',
    'dumpster-rental-des-plaines-il',
    'dumpster-rental-orland-park-il',
    'dumpster-rental-hoffman-estates-il',
    'dumpster-rental-oak-lawn-il',
    'dumpster-rental-oak-park-il',
    'dumpster-rental-moline-il',
    'dumpster-rental-lexington-ky',
    'dumpster-rental-covington-ky',
    'dumpster-rental-bowling-green-ky',
    'dumpster-rental-anderson-in',
    'dumpster-rental-lafayette-in',
    'dumpster-rental-mishawaka-in',
    'dumpster-rental-evansville-in',
    'dumpster-rental-fort-wayne-in',
    'dumpster-rental-south-bend-in',
    'dumpster-rental-bloomington-in',
    'dumpster-rental-carmel-in',
    'dumpster-rental-muncie-in',
    'dumpster-rental-lawrence-ma',
    'dumpster-rental-haverhill-ma',
    'dumpster-rental-greenwood-in',
    'dumpster-rental-seattle-wa',
    'dumpster-rental-revere-ma',
    'dumpster-rental-medford-ma',
    'dumpster-rental-chicopee-ma',
    'dumpster-rental-peabody-ma',
    'dumpster-rental-chelsea-ma',
    'dumpster-rental-buffalo-grove-il',
    'dumpster-rental-bartlett-il',
    'dumpster-rental-crystal-lake-il',
    'dumpster-rental-carol-stream-il',
    'dumpster-rental-peoria-il',
    'dumpster-rental-normal-il',
    'dumpster-rental-gary-in',
    'dumpster-rental-fishers-in',
    'dumpster-rental-elkhart-in',
    'dumpster-rental-kokomo-in',
    'dumpster-rental-noblesville-in',
    'dumpster-rental-hammond-in',
    'dumpster-rental-springfield-ma',
    'dumpster-rental-cambridge-ma',
    'dumpster-rental-newton-ma',
    'dumpster-rental-belleville-il',
    'dumpster-rental-malden-ma',
    'dumpster-rental-methuen-ma',
    'dumpster-rental-pittsfield-ma',
    'dumpster-rental-salem-ma',
    'dumpster-rental-westfield-ma',
    'dumpster-rental-holyoke-ma',
    'dumpster-rental-terre-haute-in',
    'dumpster-rental-hutchinson-ks',
    'dumpster-rental-richmond-ky',
    'dumpster-rental-owensboro-ky',
    'dumpster-rental-minneapolis-mn',
    'dumpster-rental-portland-or',
    'dumpster-rental-huber-heights-oh',
    'dumpster-rental-albany-or',
    'dumpster-rental-grants-pass-or',
    'dumpster-rental-springfield-or',
    'dumpster-rental-mansfield-oh',
    'dumpster-rental-findlay-oh',
    'dumpster-rental-gresham-or',
    'dumpster-rental-toledo-oh',
    'dumpster-rental-lima-oh',
    'dumpster-rental-kettering-oh',
    'dumpster-rental-euclid-oh',
    'dumpster-rental-cleveland-heights-oh',
    'dumpster-rental-lakewood-oh',
    'dumpster-rental-newark-oh',
    'dumpster-rental-dublin-oh',
    'dumpster-rental-corvallis-or',
    'dumpster-rental-dayton-oh',
    'dumpster-rental-hamilton-oh',
    'dumpster-rental-beavercreek-oh',
    'dumpster-rental-salem-or',
    'dumpster-rental-hillsboro-or',
    'dumpster-rental-tigard-or',
    'dumpster-rental-lake-oswego-or',
    'dumpster-rental-keizer-or',
    'dumpster-rental-mentor-oh',
    'dumpster-rental-strongsville-oh',
    'dumpster-rental-bend-or',
    'dumpster-rental-beaverton-or',
    'dumpster-rental-raleigh-nc',
    'dumpster-rental-elyria-oh',
    'dumpster-rental-lawton-ok',
    'dumpster-rental-edmond-ok',
    'dumpster-rental-midwest-city-ok',
    'dumpster-rental-moore-ok',
    'dumpster-rental-stillwater-ok',
    'dumpster-rental-norman-ok',
    'dumpster-rental-broken-arrow-ok',
    'dumpster-rental-muskogee-ok',
    'dumpster-rental-bartlesville-ok',
    'dumpster-rental-enid-ok',
    'dumpster-rental-pittsburg-pa',
    'dumpster-rental-new-york-city-ny',
    'dumpster-rental-buffalo-ny',
    'dumpster-rental-detroit-mi',
    'dumpster-rental-fort-myers-fl',
    'dumpster-rental-richmond-va',
    'dumpster-rental-nashville-tn',
    'dumpster-rental-kansas-city-mo',
    'dumpster-rental-st-louis-mo',
    'dumpster-rental-grand-rapids-mi',
    'dumpster-rental-virginia-beach-va',
    'dumpster-rental-columbia-sc',
    'dumpster-rental-queens-ny',
    'dumpster-rental-swiftwater-pa',
    'dumpster-rental-downey-ca',
    'dumpster-rental-victorville-ca',
    'dumpster-rental-costa-mesa-ca',
    'dumpster-rental-in-weston-fl',
    'dumpster-rental-frisco-tx',
    'dumpster-rental-west-dallas-tx',
    'dumpster-rental-rock-hill-sc',
    'dumpster-rental-west-hartford-ct',
    'dumpster-rental-tarrytown-ny',
    'dumpster-rental-brooklyn-ny',
    'dumpster-rental-elmont-ny',
    'dumpster-rental-mequon-wi',
    'dumpster-rental-orange-county-ca',
    'dumpster-rental-wallingford-ct',
    'dumpster-rental-franklin-wi',
    'dumpster-rental-greenfield-wi',
    'dumpster-rental-east-hartford-ct',
    'dumpster-rental-lancaster-ny',
    'dumpster-rental-manhattan-ny',
  ];

  // Get existing states
  const existingStates = await prisma.state.findMany();
  const statesByAbbr = new Map(existingStates.map(s => [s.abbr.toLowerCase(), s]));

  console.log(`Found ${existingStates.length} existing states\n`);

  // Get existing cities to avoid duplicates
  const existingCities = await prisma.city.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existingCities.map(c => c.slug));

  console.log(`Found ${existingCities.length} existing cities\n`);

  let added = 0;
  let skipped = 0;
  let errors: string[] = [];
  const statesNeeded = new Set<string>();

  // First pass: identify states we need to create
  for (const url of missingUrls) {
    const parsed = parseCityUrl(url.toLowerCase());
    if (parsed && !statesByAbbr.has(parsed.stateAbbr)) {
      statesNeeded.add(parsed.stateAbbr);
    }
  }

  // Create missing states
  for (const abbr of statesNeeded) {
    const stateInfo = STATE_MAP[abbr];
    if (stateInfo) {
      console.log(`Creating state: ${stateInfo.name}`);
      const newState = await prisma.state.create({
        data: {
          name: stateInfo.name,
          slug: stateInfo.name.toLowerCase().replace(/\s+/g, '-'),
          abbr: stateInfo.abbr,
        }
      });
      statesByAbbr.set(abbr, newState);
    }
  }

  // Second pass: add cities
  for (const url of missingUrls) {
    const parsed = parseCityUrl(url.toLowerCase());

    if (!parsed) {
      console.log(`Skipping non-city URL: ${url}`);
      skipped++;
      continue;
    }

    // Check if already exists
    if (existingSlugs.has(parsed.citySlug)) {
      console.log(`Already exists: ${parsed.citySlug}`);
      skipped++;
      continue;
    }

    // Get state
    const state = statesByAbbr.get(parsed.stateAbbr);
    if (!state) {
      errors.push(`State not found for: ${url} (${parsed.stateAbbr})`);
      continue;
    }

    try {
      await prisma.city.create({
        data: {
          name: parsed.cityName,
          slug: parsed.citySlug,
          stateId: state.id,
          phone: '(888) 860-0710', // Default phone
        }
      });

      existingSlugs.add(parsed.citySlug);
      added++;

      if (added % 25 === 0) {
        console.log(`Progress: ${added} cities added...`);
      }
    } catch (err) {
      errors.push(`Error adding ${parsed.citySlug}: ${err}`);
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Added: ${added} cities`);
  console.log(`Skipped: ${skipped} (already exist or non-city)`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n=== ERRORS ===');
    errors.forEach(e => console.log(`  ${e}`));
  }

  // Show total cities now
  const totalCities = await prisma.city.count();
  console.log(`\nTotal cities in database: ${totalCities}`);
}

addMissingCities()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
