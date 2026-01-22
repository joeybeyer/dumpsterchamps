import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Priority cities with enhanced data
// These are major metros that should have full content
interface CityEnhancement {
  slug: string;
  latitude: number;
  longitude: number;
  county: string;
  population: string;
  climate: string;
  permits: string;
  whyChooseUs: string;
  neighborhoods: Array<{
    name: string;
    slug: string;
    description: string;
    zipCodes: string;
  }>;
}

const priorityCities: CityEnhancement[] = [
  // Los Angeles
  {
    slug: "los-angeles-ca",
    latitude: 34.0522,
    longitude: -118.2437,
    county: "Los Angeles County",
    population: "~4 million",
    climate: "LA's Mediterranean climate means year-round construction is possible. Summer months (June-September) are busiest for renovation projects. Spring and fall offer ideal conditions for outdoor work without extreme heat.",
    permits: "Los Angeles requires permits for dumpsters placed on public streets. Contact LA Department of Transportation for street use permits. Most residential driveways don't require permits. HOA communities may have additional restrictions.",
    whyChooseUs: "With decades of experience serving the LA metro area, we understand the unique challenges of dumpster rental in Los Angeles - from navigating tight Hollywood Hills driveways to handling heavy construction debris from Downtown LA renovations.",
    neighborhoods: [
      { name: "Hollywood", slug: "hollywood", description: "Entertainment district with historic homes and modern condos", zipCodes: "90028, 90038, 90068" },
      { name: "Downtown LA", slug: "downtown-la", description: "Urban core with commercial and residential high-rises", zipCodes: "90012, 90013, 90014, 90015, 90017" },
      { name: "Santa Monica", slug: "santa-monica", description: "Coastal community known for beach living and renovation projects", zipCodes: "90401, 90402, 90403, 90404, 90405" },
      { name: "Beverly Hills", slug: "beverly-hills", description: "Upscale residential area with luxury home renovations", zipCodes: "90210, 90211, 90212" },
      { name: "West LA", slug: "west-la", description: "Diverse neighborhoods including Brentwood and Westwood", zipCodes: "90025, 90049, 90024" },
      { name: "Sherman Oaks", slug: "sherman-oaks", description: "San Fernando Valley residential community", zipCodes: "91403, 91411, 91423" },
      { name: "Pasadena", slug: "pasadena", description: "Historic city with craftsman homes and annual renovations", zipCodes: "91101, 91103, 91104, 91105, 91106" },
      { name: "Long Beach", slug: "long-beach", description: "Port city with mix of residential and commercial projects", zipCodes: "90802, 90803, 90804, 90805, 90806" },
      { name: "Burbank", slug: "burbank", description: "Entertainment industry hub with studio and residential work", zipCodes: "91501, 91502, 91504, 91505, 91506" },
      { name: "Glendale", slug: "glendale", description: "Growing city with active construction market", zipCodes: "91201, 91202, 91203, 91204, 91205" },
    ],
  },

  // Houston
  {
    slug: "houston-tx",
    latitude: 29.7604,
    longitude: -95.3698,
    county: "Harris County",
    population: "~2.3 million",
    climate: "Houston's humid subtropical climate brings hot summers and mild winters. Hurricane season (June-November) may affect scheduling. Spring and fall are ideal for major outdoor projects.",
    permits: "Houston generally doesn't require permits for dumpsters on private property. Street placement requires approval from Houston Public Works. Flood zone properties may have additional requirements.",
    whyChooseUs: "Houston's expansive metro area and frequent construction activity make reliable dumpster service essential. We serve the entire Greater Houston area with same-day delivery to keep your project moving.",
    neighborhoods: [
      { name: "Downtown Houston", slug: "downtown-houston", description: "Urban core with commercial and high-rise construction", zipCodes: "77002, 77003, 77010" },
      { name: "The Heights", slug: "the-heights", description: "Historic neighborhood with ongoing renovation projects", zipCodes: "77007, 77008, 77009" },
      { name: "Montrose", slug: "montrose", description: "Eclectic area with diverse housing and frequent remodels", zipCodes: "77006, 77019" },
      { name: "River Oaks", slug: "river-oaks", description: "Affluent neighborhood with luxury home projects", zipCodes: "77019, 77027" },
      { name: "Katy", slug: "katy", description: "Growing suburb with new construction and renovations", zipCodes: "77449, 77450, 77493, 77494" },
      { name: "Sugar Land", slug: "sugar-land", description: "Master-planned community with active building", zipCodes: "77478, 77479, 77498" },
      { name: "The Woodlands", slug: "the-woodlands", description: "Planned community with commercial and residential growth", zipCodes: "77380, 77381, 77382, 77384" },
      { name: "Clear Lake", slug: "clear-lake", description: "NASA area with established homes needing updates", zipCodes: "77058, 77059, 77062" },
      { name: "Pearland", slug: "pearland", description: "Fast-growing suburb south of Houston", zipCodes: "77581, 77584, 77588" },
      { name: "Galleria", slug: "galleria", description: "Uptown area with commercial and condo projects", zipCodes: "77056, 77057" },
    ],
  },

  // Phoenix
  {
    slug: "phoenix-az",
    latitude: 33.4484,
    longitude: -112.074,
    county: "Maricopa County",
    population: "~1.6 million",
    climate: "Phoenix's desert climate allows year-round construction. Summer temperatures exceed 100°F - plan outdoor loading for morning hours. Winter is prime renovation season with perfect weather conditions.",
    permits: "Phoenix requires permits for dumpsters on public rights-of-way. Private property placement typically doesn't need permits. Check with HOA for community restrictions.",
    whyChooseUs: "The Valley of the Sun's constant growth means construction never stops. We provide reliable service across the entire Phoenix metro, from Scottsdale to Chandler, with dumpsters built to handle desert conditions.",
    neighborhoods: [
      { name: "Scottsdale", slug: "scottsdale", description: "Upscale area with resort and residential construction", zipCodes: "85250, 85251, 85254, 85255, 85257, 85258" },
      { name: "Tempe", slug: "tempe", description: "College town with constant renovation activity", zipCodes: "85281, 85282, 85283, 85284" },
      { name: "Mesa", slug: "mesa", description: "Large suburb with diverse construction needs", zipCodes: "85201, 85202, 85203, 85204, 85205, 85206" },
      { name: "Chandler", slug: "chandler", description: "Tech hub with growing commercial and residential projects", zipCodes: "85224, 85225, 85226, 85248, 85249" },
      { name: "Gilbert", slug: "gilbert", description: "Fast-growing family community with new construction", zipCodes: "85233, 85234, 85295, 85296, 85297, 85298" },
      { name: "Glendale", slug: "glendale-az", description: "West Valley city with sports venues and homes", zipCodes: "85301, 85302, 85303, 85304, 85305, 85306" },
      { name: "Peoria", slug: "peoria", description: "Growing Northwest Valley community", zipCodes: "85345, 85381, 85382, 85383" },
      { name: "Downtown Phoenix", slug: "downtown-phoenix", description: "Urban core with commercial revitalization", zipCodes: "85003, 85004, 85006, 85007" },
      { name: "Paradise Valley", slug: "paradise-valley", description: "Luxury residential area with high-end renovations", zipCodes: "85253" },
      { name: "Ahwatukee", slug: "ahwatukee", description: "South Mountain community with established homes", zipCodes: "85044, 85045, 85048" },
    ],
  },

  // Dallas
  {
    slug: "dallas-tx",
    latitude: 32.7767,
    longitude: -96.797,
    county: "Dallas County",
    population: "~1.3 million",
    climate: "Dallas has hot summers and mild winters, with year-round construction possible. Spring storm season (March-May) may cause scheduling adjustments. Fall is ideal for major projects.",
    permits: "Dallas requires street use permits for dumpsters on public property. Private driveways typically don't need permits. Some neighborhoods have HOA restrictions on container placement.",
    whyChooseUs: "From historic Oak Lawn renovations to new construction in Frisco, we serve the entire DFW metroplex with reliable dumpster delivery and pickup.",
    neighborhoods: [
      { name: "Downtown Dallas", slug: "downtown-dallas", description: "Urban core with high-rise and commercial construction", zipCodes: "75201, 75202, 75207" },
      { name: "Uptown", slug: "uptown-dallas", description: "Trendy area with condo and commercial projects", zipCodes: "75204, 75219" },
      { name: "Highland Park", slug: "highland-park", description: "Affluent enclave with luxury home renovations", zipCodes: "75205" },
      { name: "Oak Lawn", slug: "oak-lawn", description: "Diverse neighborhood with frequent remodels", zipCodes: "75219, 75204" },
      { name: "Preston Hollow", slug: "preston-hollow", description: "Upscale residential with large estate projects", zipCodes: "75220, 75230, 75240, 75252" },
      { name: "Plano", slug: "plano", description: "Major suburb with corporate and residential growth", zipCodes: "75023, 75024, 75025, 75074, 75075" },
      { name: "Frisco", slug: "frisco", description: "Fast-growing city with extensive new construction", zipCodes: "75033, 75034, 75035" },
      { name: "Irving", slug: "irving", description: "Central location with commercial development", zipCodes: "75038, 75039, 75060, 75061, 75062, 75063" },
      { name: "Richardson", slug: "richardson", description: "Established suburb with renovation activity", zipCodes: "75080, 75081, 75082, 75083" },
      { name: "Garland", slug: "garland", description: "Large suburb with diverse housing stock", zipCodes: "75040, 75041, 75042, 75043, 75044" },
    ],
  },

  // Las Vegas
  {
    slug: "las-vegas-nv",
    latitude: 36.1699,
    longitude: -115.1398,
    county: "Clark County",
    population: "~650,000",
    climate: "Las Vegas has a hot desert climate with year-round construction possible. Summer temperatures exceed 110°F - schedule heavy loading for early morning or evening hours. Winter is ideal for major outdoor projects.",
    permits: "Clark County requires permits for dumpsters on public roads. Private property placement typically doesn't need permits. Some master-planned communities have strict HOA rules.",
    whyChooseUs: "Vegas never stops building. From Strip renovations to Henderson home projects, we deliver dumpsters across the entire Las Vegas Valley with the reliability your timeline demands.",
    neighborhoods: [
      { name: "The Strip", slug: "the-strip", description: "World-famous casino corridor with constant construction", zipCodes: "89109, 89119, 89158" },
      { name: "Downtown Las Vegas", slug: "downtown-las-vegas", description: "Historic downtown with revitalization projects", zipCodes: "89101, 89104" },
      { name: "Summerlin", slug: "summerlin", description: "Master-planned community with active building", zipCodes: "89134, 89135, 89138, 89144, 89145" },
      { name: "Henderson", slug: "henderson", description: "Large suburb with diverse construction needs", zipCodes: "89002, 89011, 89012, 89014, 89015, 89052, 89074" },
      { name: "North Las Vegas", slug: "north-las-vegas", description: "Growing area with new construction", zipCodes: "89030, 89031, 89032, 89081, 89084, 89085" },
      { name: "Green Valley", slug: "green-valley", description: "Established community with renovation projects", zipCodes: "89014, 89052, 89074" },
      { name: "Spring Valley", slug: "spring-valley-nv", description: "Central valley location with diverse housing", zipCodes: "89102, 89103, 89117, 89118, 89146, 89147" },
      { name: "Enterprise", slug: "enterprise-nv", description: "Growing southwest area", zipCodes: "89113, 89118, 89139, 89141, 89178, 89179" },
      { name: "Paradise", slug: "paradise-nv", description: "Unincorporated area near The Strip", zipCodes: "89109, 89119, 89120, 89121, 89123, 89169" },
      { name: "Mountains Edge", slug: "mountains-edge", description: "Master-planned community with new homes", zipCodes: "89141, 89178" },
    ],
  },

  // Milwaukee
  {
    slug: "milwaukee-wi",
    latitude: 43.0389,
    longitude: -87.9065,
    county: "Milwaukee County",
    population: "~577,000",
    climate: "Milwaukee's four-season climate affects project timing. Harsh winters (December-February) limit outdoor work. Spring thaw brings renovation season. Summer and early fall are peak construction periods.",
    permits: "Milwaukee requires permits for dumpsters on city streets. Private property placement usually doesn't need permits. Check Milwaukee Department of Neighborhood Services for current requirements.",
    whyChooseUs: "From the Historic Third Ward to the suburbs, we know Milwaukee's neighborhoods and their unique dumpster needs. Our local team provides reliable service despite Wisconsin's challenging weather.",
    neighborhoods: [
      { name: "Downtown Milwaukee", slug: "downtown-milwaukee", description: "Urban core with commercial and condo development", zipCodes: "53202, 53203" },
      { name: "Third Ward", slug: "third-ward", description: "Historic district with loft conversions and retail", zipCodes: "53202" },
      { name: "East Side", slug: "east-side", description: "Trendy area with older homes needing updates", zipCodes: "53202, 53211, 53217" },
      { name: "Bay View", slug: "bay-view", description: "Hip neighborhood with craftsman homes", zipCodes: "53207" },
      { name: "Wauwatosa", slug: "wauwatosa", description: "Family-friendly suburb with established homes", zipCodes: "53213, 53222, 53226" },
      { name: "Brookfield", slug: "brookfield", description: "Upscale suburb with renovation activity", zipCodes: "53005, 53045" },
      { name: "West Allis", slug: "west-allis", description: "Working-class community with bungalows", zipCodes: "53214, 53219, 53227" },
      { name: "Shorewood", slug: "shorewood", description: "Compact village with historic homes", zipCodes: "53211" },
      { name: "Whitefish Bay", slug: "whitefish-bay", description: "Affluent lakefront community", zipCodes: "53217" },
      { name: "Greenfield", slug: "greenfield", description: "Southwest suburb with mix of housing", zipCodes: "53220, 53228" },
    ],
  },

  // Jacksonville
  {
    slug: "jacksonville",
    latitude: 30.3322,
    longitude: -81.6557,
    county: "Duval County",
    population: "~950,000",
    climate: "Jacksonville's humid subtropical climate allows year-round construction. Hurricane season (June-November) may affect scheduling. Spring and fall offer ideal conditions. Summer heat requires hydration and early starts.",
    permits: "Jacksonville requires permits for dumpsters on public roads. Private property typically doesn't need permits. Some neighborhoods have deed restrictions affecting placement.",
    whyChooseUs: "As Florida's largest city by area, we've built expertise serving Jacksonville's diverse neighborhoods - from beach communities to downtown revitalization projects.",
    neighborhoods: [
      { name: "Downtown Jacksonville", slug: "downtown-jax", description: "Urban core with commercial revitalization", zipCodes: "32202, 32204, 32206" },
      { name: "Jacksonville Beach", slug: "jacksonville-beach", description: "Coastal community with beach home projects", zipCodes: "32250" },
      { name: "Neptune Beach", slug: "neptune-beach", description: "Small beach town with renovations", zipCodes: "32266" },
      { name: "Riverside", slug: "riverside-jax", description: "Historic district with craftsman homes", zipCodes: "32204, 32205" },
      { name: "San Marco", slug: "san-marco", description: "Upscale area with Mediterranean-style homes", zipCodes: "32207" },
      { name: "Mandarin", slug: "mandarin", description: "Large suburban area with family homes", zipCodes: "32223, 32257, 32258" },
      { name: "Southside", slug: "southside-jax", description: "Commercial and residential growth area", zipCodes: "32216, 32256, 32246" },
      { name: "Arlington", slug: "arlington-jax", description: "Established neighborhood with older homes", zipCodes: "32211, 32225" },
      { name: "Westside", slug: "westside-jax", description: "Growing area with new construction", zipCodes: "32210, 32221, 32244" },
      { name: "Ortega", slug: "ortega", description: "Historic riverfront community", zipCodes: "32210, 32205" },
    ],
  },

  // San Antonio
  {
    slug: "san-antonio-tx",
    latitude: 29.4241,
    longitude: -98.4936,
    county: "Bexar County",
    population: "~1.5 million",
    climate: "San Antonio's mild winters and hot summers allow year-round construction. Summer heat (June-August) requires early morning work. Spring and fall are ideal for major outdoor projects.",
    permits: "San Antonio requires permits for dumpsters on public property. Private driveways typically don't need permits. Historic districts have additional requirements.",
    whyChooseUs: "From historic King William to the growing Far West Side, we serve all of San Antonio with reliable dumpster delivery that keeps your Alamo City project on track.",
    neighborhoods: [
      { name: "Downtown San Antonio", slug: "downtown-sa", description: "Urban core with tourism and renovation", zipCodes: "78205, 78207" },
      { name: "Alamo Heights", slug: "alamo-heights", description: "Affluent area with historic homes", zipCodes: "78209" },
      { name: "King William", slug: "king-william", description: "Historic district with Victorian renovation", zipCodes: "78204" },
      { name: "Stone Oak", slug: "stone-oak", description: "North side growth area with new construction", zipCodes: "78258, 78259, 78260" },
      { name: "The Dominion", slug: "the-dominion", description: "Gated luxury community", zipCodes: "78257" },
      { name: "Helotes", slug: "helotes", description: "Growing Northwest suburb", zipCodes: "78023" },
      { name: "Boerne", slug: "boerne", description: "Hill Country suburb with ranch properties", zipCodes: "78006, 78015" },
      { name: "Southtown", slug: "southtown", description: "Arts district with loft conversions", zipCodes: "78204, 78210" },
      { name: "Medical Center", slug: "medical-center-sa", description: "Major employment center area", zipCodes: "78229, 78240" },
      { name: "Far West Side", slug: "far-west-side", description: "Fast-growing new construction area", zipCodes: "78253, 78245" },
    ],
  },

  // Austin
  {
    slug: "austin-tx",
    latitude: 30.2672,
    longitude: -97.7431,
    county: "Travis County",
    population: "~1 million",
    climate: "Austin's warm climate allows year-round construction. Summer heat (June-September) is intense but manageable with early starts. Spring brings frequent rain. Winter is ideal for major projects.",
    permits: "Austin requires permits for dumpsters on public property. Most residential areas allow driveway placement without permits. Check with Austin Code for specific requirements.",
    whyChooseUs: "Austin's explosive growth means constant construction. We keep up with the pace, delivering dumpsters across the metro from Round Rock to Buda.",
    neighborhoods: [
      { name: "Downtown Austin", slug: "downtown-austin", description: "Urban core with high-rise and commercial", zipCodes: "78701, 78702" },
      { name: "East Austin", slug: "east-austin", description: "Rapidly gentrifying area with renovations", zipCodes: "78702, 78721, 78722" },
      { name: "South Austin", slug: "south-austin", description: "Eclectic neighborhoods with diverse housing", zipCodes: "78704, 78745, 78748" },
      { name: "West Lake Hills", slug: "west-lake-hills", description: "Affluent area with luxury home projects", zipCodes: "78746" },
      { name: "Round Rock", slug: "round-rock", description: "Major suburb with active construction", zipCodes: "78664, 78665, 78681" },
      { name: "Cedar Park", slug: "cedar-park", description: "Growing northwest suburb", zipCodes: "78613" },
      { name: "Pflugerville", slug: "pflugerville", description: "Fast-growing northeast suburb", zipCodes: "78660" },
      { name: "Mueller", slug: "mueller", description: "New urbanist community with new builds", zipCodes: "78723" },
      { name: "Tarrytown", slug: "tarrytown", description: "Established neighborhood with renovations", zipCodes: "78703" },
      { name: "Domain", slug: "domain", description: "Mixed-use development with commercial growth", zipCodes: "78758" },
    ],
  },

  // San Diego
  {
    slug: "san-diego-ca",
    latitude: 32.7157,
    longitude: -117.1611,
    county: "San Diego County",
    population: "~1.4 million",
    climate: "San Diego's Mediterranean climate allows year-round construction with ideal conditions. Coastal fog can affect morning work. Fire season (fall) may impact hillside projects.",
    permits: "San Diego requires permits for dumpsters on public streets. Private property placement typically doesn't need permits. Check with specific city departments for La Jolla, Del Mar, etc.",
    whyChooseUs: "From Ocean Beach to Poway, we serve the entire San Diego metro with reliable dumpster service. Our experience with coastal communities means we understand local requirements.",
    neighborhoods: [
      { name: "Downtown San Diego", slug: "downtown-sd", description: "Urban core with condo and commercial projects", zipCodes: "92101, 92102" },
      { name: "La Jolla", slug: "la-jolla", description: "Upscale coastal community with luxury homes", zipCodes: "92037, 92038" },
      { name: "Pacific Beach", slug: "pacific-beach", description: "Beach community with rental renovations", zipCodes: "92109" },
      { name: "Ocean Beach", slug: "ocean-beach", description: "Eclectic beach neighborhood", zipCodes: "92107" },
      { name: "North Park", slug: "north-park", description: "Hip neighborhood with craftsman homes", zipCodes: "92104" },
      { name: "Hillcrest", slug: "hillcrest", description: "Vibrant community with diverse housing", zipCodes: "92103" },
      { name: "Carlsbad", slug: "carlsbad", description: "North County beach city", zipCodes: "92008, 92009, 92010, 92011" },
      { name: "Escondido", slug: "escondido-sd", description: "Inland city with diverse projects", zipCodes: "92025, 92026, 92027, 92029" },
      { name: "Chula Vista", slug: "chula-vista-sd", description: "South Bay's largest city", zipCodes: "91910, 91911, 91913, 91914, 91915" },
      { name: "Poway", slug: "poway", description: "Suburban community with ranch properties", zipCodes: "92064" },
    ],
  },
];

async function main() {
  console.log("Enhancing priority cities with neighborhoods and coordinates...");

  for (const cityData of priorityCities) {
    console.log(`Processing ${cityData.slug}...`);

    // Find the city
    const city = await prisma.city.findUnique({
      where: { slug: cityData.slug },
    });

    if (!city) {
      console.log(`  City not found: ${cityData.slug}, skipping...`);
      continue;
    }

    // Update city with enhanced data
    await prisma.city.update({
      where: { id: city.id },
      data: {
        latitude: cityData.latitude,
        longitude: cityData.longitude,
        county: cityData.county,
        population: cityData.population,
        climate: cityData.climate,
        permits: cityData.permits,
        whyChooseUs: cityData.whyChooseUs,
      },
    });

    // Delete existing neighborhoods for this city
    await prisma.neighborhood.deleteMany({
      where: { cityId: city.id },
    });

    // Create neighborhoods
    for (const neighborhood of cityData.neighborhoods) {
      await prisma.neighborhood.create({
        data: {
          name: neighborhood.name,
          slug: neighborhood.slug,
          description: neighborhood.description,
          zipCodes: neighborhood.zipCodes,
          cityId: city.id,
        },
      });
    }

    console.log(`  Enhanced with ${cityData.neighborhoods.length} neighborhoods`);
  }

  console.log("\nPriority city enhancement complete!");
  console.log(`Enhanced ${priorityCities.length} cities`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
