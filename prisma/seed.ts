import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// All states from the sitemap
const states = [
  { name: "Alabama", abbr: "AL", slug: "alabama" },
  { name: "Arizona", abbr: "AZ", slug: "arizona" },
  { name: "Arkansas", abbr: "AR", slug: "arkansas" },
  { name: "California", abbr: "CA", slug: "california" },
  { name: "Colorado", abbr: "CO", slug: "colorado" },
  { name: "Connecticut", abbr: "CT", slug: "connecticut" },
  { name: "Delaware", abbr: "DE", slug: "delaware" },
  { name: "Florida", abbr: "FL", slug: "florida" },
  { name: "Georgia", abbr: "GA", slug: "georgia" },
  { name: "Hawaii", abbr: "HI", slug: "hawaii" },
  { name: "Idaho", abbr: "ID", slug: "idaho" },
  { name: "Illinois", abbr: "IL", slug: "illinois" },
  { name: "Indiana", abbr: "IN", slug: "indiana" },
  { name: "Iowa", abbr: "IA", slug: "iowa" },
  { name: "Kansas", abbr: "KS", slug: "kansas" },
  { name: "Kentucky", abbr: "KY", slug: "kentucky" },
  { name: "Louisiana", abbr: "LA", slug: "louisiana" },
  { name: "Maine", abbr: "ME", slug: "maine" },
  { name: "Maryland", abbr: "MD", slug: "maryland" },
  { name: "Massachusetts", abbr: "MA", slug: "massachusetts" },
  { name: "Michigan", abbr: "MI", slug: "michigan" },
  { name: "Minnesota", abbr: "MN", slug: "minnesota" },
  { name: "Mississippi", abbr: "MS", slug: "mississippi" },
  { name: "Missouri", abbr: "MO", slug: "missouri" },
  { name: "Montana", abbr: "MT", slug: "montana" },
  { name: "Nebraska", abbr: "NE", slug: "nebraska" },
  { name: "Nevada", abbr: "NV", slug: "nevada" },
  { name: "New Hampshire", abbr: "NH", slug: "new-hampshire" },
  { name: "New Jersey", abbr: "NJ", slug: "new-jersey" },
  { name: "New Mexico", abbr: "NM", slug: "new-mexico" },
  { name: "New York", abbr: "NY", slug: "new-york" },
  { name: "North Carolina", abbr: "NC", slug: "north-carolina" },
  { name: "North Dakota", abbr: "ND", slug: "north-dakota" },
  { name: "Ohio", abbr: "OH", slug: "ohio" },
  { name: "Oklahoma", abbr: "OK", slug: "oklahoma" },
  { name: "Oregon", abbr: "OR", slug: "oregon" },
  { name: "Pennsylvania", abbr: "PA", slug: "pennsylvania" },
  { name: "Rhode Island", abbr: "RI", slug: "rhode-island" },
  { name: "South Carolina", abbr: "SC", slug: "south-carolina" },
  { name: "South Dakota", abbr: "SD", slug: "south-dakota" },
  { name: "Tennessee", abbr: "TN", slug: "tennessee" },
  { name: "Texas", abbr: "TX", slug: "texas" },
  { name: "Virginia", abbr: "VA", slug: "virginia" },
  { name: "Washington", abbr: "WA", slug: "washington" },
  { name: "Wisconsin", abbr: "WI", slug: "wisconsin" },
];

// Cities parsed from the sitemap (city, stateAbbr, slug)
const cities = [
  // Alabama
  { name: "Birmingham", stateAbbr: "AL", slug: "birmingham-al" },
  { name: "Huntsville", stateAbbr: "AL", slug: "huntsville-al" },
  { name: "Mobile", stateAbbr: "AL", slug: "mobile-al" },
  { name: "Montgomery", stateAbbr: "AL", slug: "montgomery-al" },
  { name: "Tuscaloosa", stateAbbr: "AL", slug: "tuscaloosa-al" },
  { name: "Hoover", stateAbbr: "AL", slug: "hoover-al" },
  { name: "Dothan", stateAbbr: "AL", slug: "dothan-al" },
  { name: "Auburn", stateAbbr: "AL", slug: "auburn-al" },
  { name: "Decatur", stateAbbr: "AL", slug: "decatur-al" },
  { name: "Madison", stateAbbr: "AL", slug: "madison-al" },
  { name: "Florence", stateAbbr: "AL", slug: "florence-al" },
  { name: "Gadsden", stateAbbr: "AL", slug: "gadsden-al" },
  { name: "Anniston", stateAbbr: "AL", slug: "anniston-al" },
  { name: "Alabaster", stateAbbr: "AL", slug: "alabaster-al" },
  { name: "Bessemer", stateAbbr: "AL", slug: "bessemer-al" },
  { name: "Prichard", stateAbbr: "AL", slug: "prichard-al" },
  { name: "Homewood", stateAbbr: "AL", slug: "homewood-al" },
  { name: "Cullman", stateAbbr: "AL", slug: "cullman-al" },
  { name: "Phenix City", stateAbbr: "AL", slug: "phenix-city-al" },
  { name: "Athens", stateAbbr: "AL", slug: "athens-al" },
  { name: "Gulf Shores", stateAbbr: "AL", slug: "gulf-shores-al" },
  { name: "Alexander City", stateAbbr: "AL", slug: "alexander-city-al" },
  { name: "Fort Payne", stateAbbr: "AL", slug: "fort-payne-al" },
  { name: "Oxford", stateAbbr: "AL", slug: "oxford-al" },
  { name: "Talladega", stateAbbr: "AL", slug: "talladega-al" },
  { name: "Scottsboro", stateAbbr: "AL", slug: "scottsboro-al" },
  { name: "Foley", stateAbbr: "AL", slug: "foley-al" },
  { name: "Albertville", stateAbbr: "AL", slug: "albertville-al" },
  { name: "Daphne", stateAbbr: "AL", slug: "daphne-al" },
  { name: "Selma", stateAbbr: "AL", slug: "selma-al" },
  { name: "Bay Minette", stateAbbr: "AL", slug: "bay-minette-al" },
  { name: "Fairhope", stateAbbr: "AL", slug: "fairhope-al" },
  { name: "Sheffield", stateAbbr: "AL", slug: "sheffield-al" },
  { name: "Russellville", stateAbbr: "AL", slug: "russellville-al" },
  { name: "Guntersville", stateAbbr: "AL", slug: "guntersville-al" },
  { name: "Monroeville", stateAbbr: "AL", slug: "monroeville-al" },
  { name: "Rainbow City", stateAbbr: "AL", slug: "rainbow-city-al" },
  { name: "Jackson", stateAbbr: "AL", slug: "jackson-al" },
  { name: "Glencoe", stateAbbr: "AL", slug: "glencoe-al" },
  { name: "Arab", stateAbbr: "AL", slug: "arab-al" },
  { name: "Atmore", stateAbbr: "AL", slug: "atmore-al" },
  { name: "Attalla", stateAbbr: "AL", slug: "attalla-al" },
  { name: "Boaz", stateAbbr: "AL", slug: "boaz-al" },
  { name: "Tuscumbia", stateAbbr: "AL", slug: "tuscumbia-al" },
  { name: "Jacksonville", stateAbbr: "AL", slug: "jacksonville-al" },

  // Arizona
  { name: "Phoenix", stateAbbr: "AZ", slug: "phoenix-az" },
  { name: "Buckeye", stateAbbr: "AZ", slug: "buckeye-az" },

  // California
  { name: "Los Angeles", stateAbbr: "CA", slug: "los-angeles-ca" },
  { name: "San Diego", stateAbbr: "CA", slug: "san-diego-ca" },
  { name: "San Jose", stateAbbr: "CA", slug: "san-jose-ca" },
  { name: "San Francisco", stateAbbr: "CA", slug: "san-francisco-ca" },
  { name: "Fresno", stateAbbr: "CA", slug: "fresno-ca" },
  { name: "Sacramento", stateAbbr: "CA", slug: "sacramento-ca" },
  { name: "Long Beach", stateAbbr: "CA", slug: "long-beach-ca" },
  { name: "Oakland", stateAbbr: "CA", slug: "oakland-ca" },
  { name: "Bakersfield", stateAbbr: "CA", slug: "bakersfield-ca" },
  { name: "Anaheim", stateAbbr: "CA", slug: "anaheim-ca" },
  { name: "Santa Ana", stateAbbr: "CA", slug: "santa-ana-ca" },
  { name: "Riverside", stateAbbr: "CA", slug: "riverside-ca" },
  { name: "Stockton", stateAbbr: "CA", slug: "stockton-ca" },
  { name: "Chula Vista", stateAbbr: "CA", slug: "chula-vista-ca" },
  { name: "Fremont", stateAbbr: "CA", slug: "fremont-ca" },
  { name: "Pasadena", stateAbbr: "CA", slug: "pasadena-ca" },
  { name: "Hayward", stateAbbr: "CA", slug: "hayward-ca" },
  { name: "Torrance", stateAbbr: "CA", slug: "torrance-ca" },
  { name: "Lancaster", stateAbbr: "CA", slug: "lancaster-ca" },
  { name: "Pomona", stateAbbr: "CA", slug: "pomona-ca" },
  { name: "Corona", stateAbbr: "CA", slug: "corona-ca" },
  { name: "Salinas", stateAbbr: "CA", slug: "salinas-ca" },
  { name: "Santa Rosa", stateAbbr: "CA", slug: "santa-rosa-ca" },
  { name: "Escondido", stateAbbr: "CA", slug: "escondido-ca" },
  { name: "Orange", stateAbbr: "CA", slug: "orange-ca" },
  { name: "Fullerton", stateAbbr: "CA", slug: "fullerton-ca" },
  { name: "Thousand Oaks", stateAbbr: "CA", slug: "thousand-oaks-ca" },
  { name: "El Monte", stateAbbr: "CA", slug: "el-monte-ca" },
  { name: "Concord", stateAbbr: "CA", slug: "concord-ca" },
  { name: "Visalia", stateAbbr: "CA", slug: "visalia-ca" },
  { name: "Inglewood", stateAbbr: "CA", slug: "inglewood-ca" },
  { name: "Roseville", stateAbbr: "CA", slug: "roseville-ca" },
  { name: "Elk Grove", stateAbbr: "CA", slug: "elk-grove-ca" },
  { name: "Sunnyvale", stateAbbr: "CA", slug: "sunnyvale-ca" },

  // Colorado
  { name: "Denver", stateAbbr: "CO", slug: "denver-co" },
  { name: "Colorado Springs", stateAbbr: "CO", slug: "colorado-springs-co" },
  { name: "Aurora", stateAbbr: "CO", slug: "aurora-co" },
  { name: "Fort Collins", stateAbbr: "CO", slug: "fort-collins-co" },
  { name: "Lakewood", stateAbbr: "CO", slug: "lakewood-co" },
  { name: "Pueblo", stateAbbr: "CO", slug: "pueblo-co" },
  { name: "Boulder", stateAbbr: "CO", slug: "boulder-co" },
  { name: "Greeley", stateAbbr: "CO", slug: "greeley-co" },
  { name: "Longmont", stateAbbr: "CO", slug: "longmont-co" },
  { name: "Loveland", stateAbbr: "CO", slug: "loveland-co" },
  { name: "Broomfield", stateAbbr: "CO", slug: "broomfield-co" },
  { name: "Grand Junction", stateAbbr: "CO", slug: "grand-junction-co" },
  { name: "Centennial", stateAbbr: "CO", slug: "centennial-co" },
  { name: "Commerce City", stateAbbr: "CO", slug: "commerce-city-co" },
  { name: "Castle Rock", stateAbbr: "CO", slug: "castle-rock-co" },
  { name: "Parker", stateAbbr: "CO", slug: "parker-co" },

  // Connecticut
  { name: "Bridgeport", stateAbbr: "CT", slug: "bridgeport-ct" },
  { name: "New Haven", stateAbbr: "CT", slug: "new-haven-ct" },
  { name: "Hartford", stateAbbr: "CT", slug: "hartford-ct" },

  // Florida (many cities)
  { name: "Jacksonville", stateAbbr: "FL", slug: "jacksonville" },
  { name: "Miami", stateAbbr: "FL", slug: "miami" },
  { name: "Miami", stateAbbr: "FL", slug: "miami-fl" },
  { name: "Tampa", stateAbbr: "FL", slug: "tampa" },
  { name: "Orlando", stateAbbr: "FL", slug: "orlando" },
  { name: "St. Petersburg", stateAbbr: "FL", slug: "st-petersburg" },
  { name: "Hialeah", stateAbbr: "FL", slug: "hialeah" },
  { name: "Port St. Lucie", stateAbbr: "FL", slug: "port-st-lucie" },
  { name: "Cape Coral", stateAbbr: "FL", slug: "cape-coral" },
  { name: "Tallahassee", stateAbbr: "FL", slug: "tallahassee" },
  { name: "Fort Lauderdale", stateAbbr: "FL", slug: "fort-lauderdale" },
  { name: "Pembroke Pines", stateAbbr: "FL", slug: "pembroke-pines" },
  { name: "Hollywood", stateAbbr: "FL", slug: "hollywood" },
  { name: "Gainesville", stateAbbr: "FL", slug: "gainesville" },
  { name: "Miramar", stateAbbr: "FL", slug: "miramar" },
  { name: "Coral Springs", stateAbbr: "FL", slug: "coral-springs" },
  { name: "Palm Bay", stateAbbr: "FL", slug: "palm-bay" },
  { name: "West Palm Beach", stateAbbr: "FL", slug: "west-palm-beach" },
  { name: "Clearwater", stateAbbr: "FL", slug: "clearwater" },
  { name: "Lakeland", stateAbbr: "FL", slug: "lakeland" },
  { name: "Pompano Beach", stateAbbr: "FL", slug: "pompano-beach" },
  { name: "Miami Gardens", stateAbbr: "FL", slug: "miami-gardens" },
  { name: "Davie", stateAbbr: "FL", slug: "davie" },
  { name: "Boca Raton", stateAbbr: "FL", slug: "boca-raton" },
  { name: "Plantation", stateAbbr: "FL", slug: "plantation" },
  { name: "Sunrise", stateAbbr: "FL", slug: "sunrise" },
  { name: "Palm Coast", stateAbbr: "FL", slug: "palm-coast" },
  { name: "Deltona", stateAbbr: "FL", slug: "deltona" },
  { name: "Largo", stateAbbr: "FL", slug: "largo" },
  { name: "Melbourne", stateAbbr: "FL", slug: "melbourne" },
  { name: "Deerfield Beach", stateAbbr: "FL", slug: "deerfield-beach" },
  { name: "Boynton Beach", stateAbbr: "FL", slug: "boynton-beach" },
  { name: "Fort Myers", stateAbbr: "FL", slug: "fort-myers" },
  { name: "Lauderhill", stateAbbr: "FL", slug: "lauderhill" },
  { name: "Daytona Beach", stateAbbr: "FL", slug: "daytona-beach" },
  { name: "Delray Beach", stateAbbr: "FL", slug: "delray-beach" },
  { name: "Tamarac", stateAbbr: "FL", slug: "tamarac" },
  { name: "Sarasota", stateAbbr: "FL", slug: "sarasota" },
  { name: "Weston", stateAbbr: "FL", slug: "weston" },
  { name: "Homestead", stateAbbr: "FL", slug: "homestead" },
  { name: "Miami Beach", stateAbbr: "FL", slug: "miami-beach" },
  { name: "Pensacola", stateAbbr: "FL", slug: "pensacola" },
  { name: "North Port", stateAbbr: "FL", slug: "north-port" },
  { name: "Bradenton", stateAbbr: "FL", slug: "bradenton" },
  { name: "Oakland Park", stateAbbr: "FL", slug: "oakland-park" },
  { name: "North Miami", stateAbbr: "FL", slug: "north-miami" },
  { name: "North Lauderdale", stateAbbr: "FL", slug: "north-lauderdale" },
  { name: "Palm Beach Gardens", stateAbbr: "FL", slug: "palm-beach-gardens" },
  { name: "Jupiter", stateAbbr: "FL", slug: "jupiter" },
  { name: "Coconut Creek", stateAbbr: "FL", slug: "coconut-creek" },
  { name: "Margate", stateAbbr: "FL", slug: "margate" },
  { name: "Wellington", stateAbbr: "FL", slug: "wellington" },
  { name: "Port Orange", stateAbbr: "FL", slug: "port-orange" },
  { name: "Titusville", stateAbbr: "FL", slug: "titusville" },
  { name: "Sanford", stateAbbr: "FL", slug: "sanford" },
  { name: "Coral Gables", stateAbbr: "FL", slug: "coral-gables" },
  { name: "North Miami Beach", stateAbbr: "FL", slug: "north-miami-beach" },
  { name: "Ormond Beach", stateAbbr: "FL", slug: "ormond-beach" },
  { name: "Altamonte Springs", stateAbbr: "FL", slug: "altamonte-springs" },
  { name: "Winter Springs", stateAbbr: "FL", slug: "winter-springs" },
  { name: "Pinellas Park", stateAbbr: "FL", slug: "pinellas-park" },
  { name: "Bonita Springs", stateAbbr: "FL", slug: "bonita-springs" },
  { name: "Fort Pierce", stateAbbr: "FL", slug: "fort-pierce" },
  { name: "Hallandale Beach", stateAbbr: "FL", slug: "hallandale-beach" },
  { name: "Winter Haven", stateAbbr: "FL", slug: "winter-haven" },
  { name: "Greenacres", stateAbbr: "FL", slug: "greenacres" },
  { name: "Lauderdale Lakes", stateAbbr: "FL", slug: "lauderdale-lakes" },
  { name: "Royal Palm Beach", stateAbbr: "FL", slug: "royal-palm-beach" },
  { name: "Plant City", stateAbbr: "FL", slug: "plant-city" },
  { name: "Lake Worth", stateAbbr: "FL", slug: "lake-worth" },
  { name: "Oviedo", stateAbbr: "FL", slug: "oviedo" },
  { name: "Ocoee", stateAbbr: "FL", slug: "ocoee" },
  { name: "Ocala", stateAbbr: "FL", slug: "ocala" },
  { name: "Apopka", stateAbbr: "FL", slug: "apopka" },
  { name: "Panama City", stateAbbr: "FL", slug: "panama-city" },
  { name: "Riviera Beach", stateAbbr: "FL", slug: "riviera-beach" },

  // Georgia
  { name: "Atlanta", stateAbbr: "GA", slug: "atlanta-ga" },
  { name: "Marietta", stateAbbr: "GA", slug: "marietta-ga" },
  { name: "Warner Robins", stateAbbr: "GA", slug: "warner-robins-ga" },
  { name: "Johns Creek", stateAbbr: "GA", slug: "johns-creek-ga" },
  { name: "Rome", stateAbbr: "GA", slug: "rome-ga" },
  { name: "Albany", stateAbbr: "GA", slug: "albany-ga" },
  { name: "Alpharetta", stateAbbr: "GA", slug: "alpharetta-ga" },

  // Idaho
  { name: "Boise", stateAbbr: "ID", slug: "boise-city-id" },
  { name: "Pocatello", stateAbbr: "ID", slug: "pocatello-id" },
  { name: "Coeur d'Alene", stateAbbr: "ID", slug: "coeur-d-alene-id" },
  { name: "Caldwell", stateAbbr: "ID", slug: "caldwell-id" },

  // Illinois
  { name: "Chicago", stateAbbr: "IL", slug: "chicago-il" },
  { name: "Skokie", stateAbbr: "IL", slug: "skokie-il" },
  { name: "Palatine", stateAbbr: "IL", slug: "palatine-il" },
  { name: "Bolingbrook", stateAbbr: "IL", slug: "bolingbrook-il" },

  // Indiana
  { name: "Indianapolis", stateAbbr: "IN", slug: "indianapolis-in" },
  { name: "Lawrence", stateAbbr: "IN", slug: "lawrence-in" },
  { name: "Columbus", stateAbbr: "IN", slug: "columbus-in" },

  // Kansas
  { name: "Kansas City", stateAbbr: "KS", slug: "kansas-city-ks" },

  // Maryland
  { name: "Baltimore", stateAbbr: "MD", slug: "baltimore-md" },

  // Massachusetts
  { name: "Boston", stateAbbr: "MA", slug: "boston-ma" },
  { name: "Worcester", stateAbbr: "MA", slug: "worcester-ma" },
  { name: "Lowell", stateAbbr: "MA", slug: "lowell-ma" },
  { name: "Quincy", stateAbbr: "MA", slug: "quincy-ma" },
  { name: "Lynn", stateAbbr: "MA", slug: "lynn-ma" },
  { name: "Somerville", stateAbbr: "MA", slug: "somerville-ma" },
  { name: "Waltham", stateAbbr: "MA", slug: "waltham-ma" },
  { name: "Brockton", stateAbbr: "MA", slug: "brockton-ma" },
  { name: "New Bedford", stateAbbr: "MA", slug: "new-bedford-ma" },
  { name: "Fall River", stateAbbr: "MA", slug: "fall-river-ma" },
  { name: "Taunton", stateAbbr: "MA", slug: "taunton-ma" },
  { name: "Leominster", stateAbbr: "MA", slug: "leominster-ma" },
  { name: "Fitchburg", stateAbbr: "MA", slug: "fitchburg-ma" },
  { name: "Barnstable Town", stateAbbr: "MA", slug: "barnstable-town-ma" },
  { name: "Attleboro", stateAbbr: "MA", slug: "attleboro-ma" },

  // Nebraska
  { name: "Omaha", stateAbbr: "NE", slug: "omaha-ne" },

  // New Hampshire
  { name: "Nashua", stateAbbr: "NH", slug: "nashua-nh" },

  // New Jersey
  { name: "Newark", stateAbbr: "NJ", slug: "newark-nj" },
  { name: "Jersey City", stateAbbr: "NJ", slug: "jersey-city-nj" },

  // New Mexico
  { name: "Albuquerque", stateAbbr: "NM", slug: "albuquerque-nm" },

  // New York
  { name: "New York City", stateAbbr: "NY", slug: "new-york" },
  { name: "White Plains", stateAbbr: "NY", slug: "white-plains-ny" },

  // Ohio
  { name: "Cleveland", stateAbbr: "OH", slug: "cleveland-oh" },
  { name: "Columbus", stateAbbr: "OH", slug: "columbus-oh" },
  { name: "Cincinnati", stateAbbr: "OH", slug: "cincinnati-oh" },
  { name: "Akron", stateAbbr: "OH", slug: "akron-oh" },
  { name: "Parma", stateAbbr: "OH", slug: "parma-oh" },
  { name: "Canton", stateAbbr: "OH", slug: "canton-oh" },
  { name: "Youngstown", stateAbbr: "OH", slug: "youngstown-oh" },
  { name: "Springfield", stateAbbr: "OH", slug: "springfield-oh" },
  { name: "Lorain", stateAbbr: "OH", slug: "lorain-oh" },
  { name: "Cuyahoga Falls", stateAbbr: "OH", slug: "cuyahoga-falls-oh" },
  { name: "Middletown", stateAbbr: "OH", slug: "middletown-oh" },
  { name: "Fairfield", stateAbbr: "OH", slug: "fairfield-oh" },
  { name: "Warren", stateAbbr: "OH", slug: "warren-oh" },

  // Oklahoma
  { name: "Oklahoma City", stateAbbr: "OK", slug: "oklahoma-city-ok" },

  // Oregon
  { name: "Medford", stateAbbr: "OR", slug: "medford-or" },

  // Pennsylvania
  { name: "Philadelphia", stateAbbr: "PA", slug: "philadelphia-pa" },

  // Tennessee
  { name: "Memphis", stateAbbr: "TN", slug: "memphis-tn" },
  { name: "Knoxville", stateAbbr: "TN", slug: "knoxville-tn" },

  // Texas
  { name: "Houston", stateAbbr: "TX", slug: "houston-tx" },
  { name: "Dallas", stateAbbr: "TX", slug: "dallas-tx" },
  { name: "San Antonio", stateAbbr: "TX", slug: "san-antonio-tx" },
  { name: "Austin", stateAbbr: "TX", slug: "austin-tx" },
  { name: "Fort Worth", stateAbbr: "TX", slug: "fort-worth-tx" },
  { name: "El Paso", stateAbbr: "TX", slug: "el-paso-tx" },
  { name: "Arlington", stateAbbr: "TX", slug: "arlington-tx" },
  { name: "Plano", stateAbbr: "TX", slug: "plano-tx" },
  { name: "Laredo", stateAbbr: "TX", slug: "laredo-tx" },
  { name: "Lubbock", stateAbbr: "TX", slug: "lubbock-tx" },
  { name: "Corpus Christi", stateAbbr: "TX", slug: "corpus-christi-tx" },

  // Nevada
  { name: "Las Vegas", stateAbbr: "NV", slug: "las-vegas-nv" },
  { name: "Henderson", stateAbbr: "NV", slug: "henderson-nv" },
  { name: "Reno", stateAbbr: "NV", slug: "reno-nv" },
  { name: "North Las Vegas", stateAbbr: "NV", slug: "north-las-vegas-nv" },
  { name: "Sparks", stateAbbr: "NV", slug: "sparks-nv" },

  // Virginia
  { name: "Arlington", stateAbbr: "VA", slug: "arlington-va" },

  // Wisconsin
  { name: "Milwaukee", stateAbbr: "WI", slug: "milwaukee-wi" },
];

// Dumpster sizes
const dumpsterSizes = [
  {
    size: 10,
    slug: "10-yard-dumpster",
    name: "10 Yard Dumpster",
    dimensions: "12' L x 8' W x 3.5' H",
    capacity: "Equivalent to 3-4 pickup truck loads",
    idealFor: "Small cleanouts, bathroom renovations, garage cleanups, small deck removals, minor landscaping projects",
    priceRange: "$350 - $450",
    description: "Our 10 yard dumpster is perfect for small residential projects. It's compact enough to fit in most driveways while still providing ample space for debris from home improvement projects.",
  },
  {
    size: 15,
    slug: "15-yard-dumpster",
    name: "15 Yard Dumpster",
    dimensions: "16' L x 7.5' W x 4' H",
    capacity: "Equivalent to 5-6 pickup truck loads",
    idealFor: "Medium renovations, yard debris cleanup, basement cleanouts, flooring removal, single-room remodels",
    priceRange: "$400 - $500",
    description: "The 15 yard dumpster offers a balance between capacity and footprint. It's ideal for medium-sized home projects and can handle most residential renovation debris.",
  },
  {
    size: 20,
    slug: "20-yard-dumpster",
    name: "20 Yard Dumpster",
    dimensions: "22' L x 7.5' W x 4.5' H",
    capacity: "Equivalent to 7-8 pickup truck loads",
    idealFor: "Roofing projects, large cleanouts, kitchen/bathroom remodels, deck removals, moving cleanouts",
    priceRange: "$450 - $550",
    description: "Our most popular size! The 20 yard dumpster is versatile enough for both residential and light commercial projects. Perfect for roof tear-offs and major home renovations.",
  },
  {
    size: 30,
    slug: "30-yard-dumpster",
    name: "30 Yard Dumpster",
    dimensions: "22' L x 7.5' W x 6' H",
    capacity: "Equivalent to 10-12 pickup truck loads",
    idealFor: "Large residential projects, construction debris, commercial cleanouts, estate cleanups, major demolition",
    priceRange: "$500 - $650",
    description: "The 30 yard dumpster is designed for larger projects. It can handle significant amounts of construction debris, making it perfect for major renovations and commercial work.",
  },
  {
    size: 40,
    slug: "40-yard-dumpster",
    name: "40 Yard Dumpster",
    dimensions: "22' L x 7.5' W x 8' H",
    capacity: "Equivalent to 14-16 pickup truck loads",
    idealFor: "Large construction projects, commercial demolition, industrial cleanups, major commercial renovations",
    priceRange: "$600 - $850",
    description: "Our largest dumpster size is built for big jobs. The 40 yard container is ideal for commercial construction, large-scale demolition, and industrial waste removal.",
  },
];

// Services
const services = [
  {
    name: "Roll Off Dumpster Rental",
    slug: "roll-off-dumpster-rental",
    description: "Our roll off dumpsters are the most versatile option for waste removal. Available in multiple sizes to fit any project, from small home cleanouts to major construction sites.",
  },
  {
    name: "Construction Dumpsters",
    slug: "construction-dumpsters",
    description: "Heavy-duty dumpsters designed for construction debris. Perfect for renovation waste, demolition materials, concrete, and other construction-related refuse.",
  },
  {
    name: "Residential Dumpsters",
    slug: "residential-dumpsters",
    description: "Dumpster rentals perfect for homeowners. Ideal for garage cleanouts, home renovations, yard waste, moving, and estate cleanups.",
  },
];

async function main() {
  console.log("Starting seed...");

  // Clear existing data (in correct order due to foreign keys)
  await prisma.neighborhood.deleteMany();
  await prisma.cityFAQ.deleteMany();
  await prisma.cityBlog.deleteMany();
  await prisma.city.deleteMany();
  await prisma.state.deleteMany();
  await prisma.dumpsterSize.deleteMany();
  await prisma.service.deleteMany();

  // Seed states
  console.log("Seeding states...");
  for (const state of states) {
    await prisma.state.create({
      data: {
        name: state.name,
        slug: state.slug,
        abbr: state.abbr,
        description: `Find affordable dumpster rental services in ${state.name}. We offer roll-off dumpsters in various sizes for residential and commercial projects.`,
        metaTitle: `Dumpster Rental ${state.name} | Dumpster Champs`,
        metaDesc: `Rent a dumpster in ${state.name}. We offer 10, 15, 20, 30, and 40 yard roll-off dumpsters with fast delivery. Get a free quote today!`,
      },
    });
  }

  // Create a map of state abbreviations to state IDs
  const stateMap = new Map<string, string>();
  const allStates = await prisma.state.findMany();
  for (const state of allStates) {
    stateMap.set(state.abbr, state.id);
  }

  // Seed cities
  console.log("Seeding cities...");
  const uniqueCities = new Map<string, typeof cities[0]>();
  for (const city of cities) {
    uniqueCities.set(city.slug, city);
  }

  for (const city of uniqueCities.values()) {
    const stateId = stateMap.get(city.stateAbbr);
    if (stateId) {
      await prisma.city.create({
        data: {
          name: city.name,
          slug: city.slug,
          stateId: stateId,
          description: `Looking for dumpster rental in ${city.name}? Dumpster Champs offers affordable roll-off dumpster rentals for residential and commercial projects.`,
          metaTitle: `Dumpster Rental ${city.name}, ${city.stateAbbr} | Dumpster Champs`,
          metaDesc: `Need a dumpster in ${city.name}, ${city.stateAbbr}? We offer 10-40 yard roll-off dumpsters with fast delivery. Get a free quote today!`,
        },
      });
    }
  }

  // Seed dumpster sizes
  console.log("Seeding dumpster sizes...");
  for (const size of dumpsterSizes) {
    await prisma.dumpsterSize.create({
      data: {
        size: size.size,
        slug: size.slug,
        name: size.name,
        dimensions: size.dimensions,
        capacity: size.capacity,
        idealFor: size.idealFor,
        priceRange: size.priceRange,
        description: size.description,
        metaTitle: `${size.name} Rental | Dumpster Champs`,
        metaDesc: `Rent a ${size.name.toLowerCase()} for your project. ${size.dimensions}. ${size.capacity}. Prices starting at ${size.priceRange.split(" - ")[0]}.`,
      },
    });
  }

  // Seed services
  console.log("Seeding services...");
  for (const service of services) {
    await prisma.service.create({
      data: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        metaTitle: `${service.name} | Dumpster Champs`,
        metaDesc: service.description,
      },
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
