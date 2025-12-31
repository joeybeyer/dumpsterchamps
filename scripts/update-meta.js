const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // City updates
  const cityUpdates = [
    { slug: 'new-york-city-ny', metaTitle: 'Dumpster Rental NYC | Same-Day Delivery from $495 | 5-Star Rated', metaDesc: 'NYC dumpster rental from $495 all-inclusive. Same-day delivery to Manhattan, Brooklyn, Queens, Bronx & Staten Island. 10-40 yard roll-offs. No hidden fees!' },
    { slug: 'columbus-oh', metaTitle: 'Dumpster Rental Columbus OH | $495 Flat Rate | Same-Day Delivery', metaDesc: 'Columbus dumpster rentals from $495 all-in. Same-day delivery available. 10-40 yard roll-off containers for construction, cleanouts & remodels. No hidden fees!' },
    { slug: 'milwaukee-wi', metaTitle: 'Dumpster Rental Milwaukee | From $495 | Fast Same-Day Delivery', metaDesc: 'Milwaukee dumpster rental starting at $495 all-inclusive. Same-day delivery. 10-40 yard containers for home projects, construction & cleanouts. No surprises!' },
    { slug: 'tulsa-ok', metaTitle: 'Dumpster Rental Tulsa OK | $495 All-In | Same-Day Delivery', metaDesc: 'Tulsa dumpster rental from $495 flat rate. Fast same-day delivery. Roll-off containers 10-40 yards for renovations, roofing & cleanouts. No hidden fees!' },
    { slug: 'jacksonville-fl', metaTitle: 'Dumpster Rental Jacksonville FL | From $495 | Same-Day Service', metaDesc: 'Jacksonville dumpster rental starting at $495 all-inclusive. Same-day delivery across Duval County. 10-40 yard roll-offs. Flat-rate pricing, no hidden fees!' },
    { slug: 'charlotte-nc', metaTitle: 'Dumpster Rental Charlotte NC | $495 Flat Rate | Fast Delivery', metaDesc: 'Charlotte dumpster rental from $495 all-in. Same-day delivery to Charlotte metro. 10-40 yard containers for construction, remodels & cleanouts. No hidden fees!' },
    { slug: 'louisville-ky', metaTitle: 'Dumpster Rental Louisville KY | From $495 | Same-Day Delivery', metaDesc: 'Louisville dumpster rental starting at $495 all-inclusive. Fast same-day delivery. Roll-off containers 10-40 yards. Perfect for home projects. No surprises!' },
    { slug: 'el-paso-tx', metaTitle: 'Dumpster Rental El Paso TX | $495 All-In | Fast Same-Day Delivery', metaDesc: 'El Paso dumpster rental from $495 flat rate. Same-day delivery available. 10-40 yard roll-off dumpsters for any project. All-inclusive pricing, no hidden fees!' },
    { slug: 'san-diego-ca', metaTitle: 'Dumpster Rental San Diego | From $495 | Same-Day Delivery', metaDesc: 'San Diego dumpster rental starting at $495 all-inclusive. Same-day delivery county-wide. 10-40 yard containers for renovations, cleanouts & construction!' },
    { slug: 'atlanta-ga', metaTitle: 'Dumpster Rental Atlanta GA | $495 Flat Rate | Same-Day Service', metaDesc: 'Atlanta dumpster rental from $495 all-in. Same-day delivery across metro Atlanta. 10-40 yard roll-offs for home projects, construction & cleanouts!' },
  ];

  for (const city of cityUpdates) {
    const result = await prisma.city.updateMany({ where: { slug: city.slug }, data: { metaTitle: city.metaTitle, metaDesc: city.metaDesc } });
    console.log('City', city.slug + ':', result.count, 'updated');
  }

  // State updates
  const stateUpdates = [
    { slug: 'alabama', metaTitle: 'Dumpster Rental Alabama | Serving Birmingham, Mobile & Montgomery', metaDesc: 'Dumpster rental across Alabama from $495 all-inclusive. Same-day delivery to Birmingham, Huntsville, Mobile, Montgomery. 10-40 yard roll-offs. No hidden fees!' },
    { slug: 'florida', metaTitle: 'Dumpster Rental Florida | Miami, Orlando, Tampa & Jacksonville', metaDesc: 'Florida dumpster rental from $495 all-in. Same-day delivery statewide. Serving Miami, Orlando, Tampa, Jacksonville. 10-40 yard containers. No hidden fees!' },
    { slug: 'illinois', metaTitle: 'Dumpster Rental Illinois | Chicago, Springfield & Peoria', metaDesc: 'Illinois dumpster rental starting at $495 all-inclusive. Same-day delivery to Chicago metro & beyond. 10-40 yard roll-offs for any project. No hidden fees!' },
    { slug: 'arizona', metaTitle: 'Dumpster Rental Arizona | Phoenix, Tucson, Mesa & Scottsdale', metaDesc: 'Arizona dumpster rental from $495 flat rate. Same-day delivery to Phoenix, Tucson, Mesa area. 10-40 yard containers for construction & cleanouts!' },
  ];

  for (const state of stateUpdates) {
    const result = await prisma.state.updateMany({ where: { slug: state.slug }, data: { metaTitle: state.metaTitle, metaDesc: state.metaDesc } });
    console.log('State', state.slug + ':', result.count, 'updated');
  }

  await prisma.$disconnect();
  console.log('Done!');
}

main().catch(console.error);
