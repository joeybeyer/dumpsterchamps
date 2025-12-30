/**
 * Generate KML File for Geolocation Data
 *
 * Creates a KML file with all service area locations for advanced geo-indexing
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

async function generateKML() {
  console.log('Generating KML file for service areas...\n');

  const cities = await prisma.city.findMany({
    where: {
      latitude: { not: null },
      longitude: { not: null },
    },
    include: {
      state: true,
    },
    orderBy: [
      { state: { name: 'asc' } },
      { name: 'asc' },
    ],
  });

  console.log(`Found ${cities.length} cities with coordinates\n`);

  const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Dumpster Champs Service Areas</name>
    <description>Roll-off dumpster rental service locations across the United States. Flat-rate pricing from $495. Same-day delivery available.</description>

    <Style id="dumpsterChamps">
      <IconStyle>
        <color>ff1c7aee</color>
        <scale>1.2</scale>
        <Icon>
          <href>https://www.dumpsterchamps.com/images/map-marker.png</href>
        </Icon>
      </IconStyle>
      <LabelStyle>
        <color>ff1c7aee</color>
        <scale>0.8</scale>
      </LabelStyle>
    </Style>

${cities.map(city => `    <Placemark>
      <name>Dumpster Rental ${city.name}, ${city.state.abbr}</name>
      <description><![CDATA[
        <h3>Dumpster Champs - ${city.name}, ${city.state.abbr}</h3>
        <p>Affordable roll-off dumpster rental in ${city.name}. 10-40 yard containers with flat-rate pricing.</p>
        <ul>
          <li>Same-day delivery available</li>
          <li>Flat-rate pricing from $495</li>
          <li>No hidden fees</li>
          <li>7-day rental included</li>
        </ul>
        <p><a href="https://www.dumpsterchamps.com/dumpster-rental-${city.slug}">Get a Free Quote</a></p>
        <p>Call: (888) 860-0710</p>
      ]]></description>
      <styleUrl>#dumpsterChamps</styleUrl>
      <Point>
        <coordinates>${city.longitude},${city.latitude},0</coordinates>
      </Point>
      <ExtendedData>
        <Data name="city"><value>${city.name}</value></Data>
        <Data name="state"><value>${city.state.name}</value></Data>
        <Data name="stateAbbr"><value>${city.state.abbr}</value></Data>
        <Data name="url"><value>https://www.dumpsterchamps.com/dumpster-rental-${city.slug}</value></Data>
        <Data name="phone"><value>(888) 860-0710</value></Data>
        <Data name="serviceType"><value>Dumpster Rental</value></Data>
      </ExtendedData>
    </Placemark>
`).join('')}
  </Document>
</kml>`;

  const outputPath = path.join(process.cwd(), 'public', 'service-areas.kml');
  await fs.writeFile(outputPath, kmlContent, 'utf-8');

  console.log(`✓ KML file generated: ${outputPath}`);
  console.log(`  - ${cities.length} service locations included`);

  await prisma.$disconnect();
}

generateKML().catch(console.error);
