const { createClient } = require('@libsql/client');

const client = createClient({
  url: 'libsql://dumpsterchamps-joeybeyer.aws-us-east-2.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzExNzMyMDcsImlkIjoiZjE4ZDg2N2UtYzc4MS00Y2VmLTg5MWUtMDg1ODZlYWMzMWYzIiwicmlkIjoiYzM0YmNiNTUtMzFkNy00ZDFmLTg5MDYtN2VhYzFjNGQ5ZGU5In0.XB0pX1WPepWleHo-bQQ4uDZCU4BCyKN4MmoqoyL3MnvMBE6eUWXpsTiJxcI9yPZcf-65vm2xAZwQDESNZaO4Dw'
});

async function main() {
  // Get all states with city counts
  const states = await client.execute(`
    SELECT s.name, s.abbr, s.id, COUNT(c.id) as cityCount 
    FROM State s 
    LEFT JOIN City c ON c.stateId = s.id 
    GROUP BY s.id 
    ORDER BY cityCount DESC, s.name
  `);
  
  console.log('\n=== STATES WITH CITY COUNTS ===\n');
  let total = 0;
  for (const row of states.rows) {
    console.log(`${row.abbr}: ${row.cityCount} cities`);
    total += row.cityCount;
  }
  console.log(`\nTOTAL CITIES: ${total}`);
  
  // Get cities with neighborhoods
  const citiesWithNeighborhoods = await client.execute(`
    SELECT c.name, c.slug, s.abbr, COUNT(n.id) as neighborhoodCount
    FROM City c
    JOIN State s ON c.stateId = s.id
    LEFT JOIN Neighborhood n ON n.cityId = c.id
    GROUP BY c.id
    HAVING neighborhoodCount > 0
    ORDER BY neighborhoodCount DESC
    LIMIT 20
  `);
  
  console.log('\n=== TOP CITIES WITH NEIGHBORHOODS ===\n');
  for (const row of citiesWithNeighborhoods.rows) {
    console.log(`${row.name}, ${row.abbr}: ${row.neighborhoodCount} neighborhoods`);
  }
}

main().catch(console.error);
