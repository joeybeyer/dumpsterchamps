import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cities = await prisma.city.findMany({
    where: {
      AND: [
        { latitude: { not: null } },
        { longitude: { not: null } },
      ],
    },
    include: { state: true },
    orderBy: [{ state: { name: "asc" } }, { name: "asc" }],
  });

  const baseUrl = "https://www.dumpsterchamps.com";
  const phone = "(888) 860-0710";

  const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Dumpster Champs Service Locations</name>
    <description>Dumpster rental service locations across the United States. Call ${phone} for a free quote.</description>

    <Style id="dumpsterIcon">
      <IconStyle>
        <color>ff4444ff</color>
        <scale>1.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/shapes/truck.png</href>
        </Icon>
      </IconStyle>
      <LabelStyle>
        <scale>0.8</scale>
      </LabelStyle>
    </Style>

    ${cities
      .map(
        (city) => `
    <Placemark>
      <name>Dumpster Champs - ${city.name}, ${city.state.abbr}</name>
      <description><![CDATA[
        <h3>Dumpster Rental in ${city.name}, ${city.state.abbr}</h3>
        <p>Affordable roll-off dumpster rentals. 10-40 yard containers available.</p>
        <ul>
          <li>10 Yard: $495</li>
          <li>15 Yard: $550</li>
          <li>20 Yard: $595 (Most Popular)</li>
          <li>30 Yard: $695</li>
          <li>40 Yard: $795</li>
        </ul>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><a href="${baseUrl}/dumpster-rental-${city.slug}">Get a Free Quote</a></p>
      ]]></description>
      <styleUrl>#dumpsterIcon</styleUrl>
      <Point>
        <coordinates>${city.longitude},${city.latitude},0</coordinates>
      </Point>
      <ExtendedData>
        <Data name="phone"><value>${phone}</value></Data>
        <Data name="website"><value>${baseUrl}/dumpster-rental-${city.slug}</value></Data>
        <Data name="state"><value>${city.state.name}</value></Data>
        <Data name="services"><value>Dumpster Rental, Roll Off Containers, Construction Dumpsters, Residential Dumpsters</value></Data>
      </ExtendedData>
    </Placemark>`
      )
      .join("\n")}

  </Document>
</kml>`;

  return new NextResponse(kmlContent, {
    headers: {
      "Content-Type": "application/vnd.google-earth.kml+xml",
      "Content-Disposition": 'attachment; filename="dumpster-champs-locations.kml"',
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
}
