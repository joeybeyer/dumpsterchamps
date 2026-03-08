// Check cities via Turso HTTP API
const TURSO_URL = 'https://dumpsterchamps-joeybeyer.aws-us-east-2.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzExNzMyMDcsImlkIjoiZjE4ZDg2N2UtYzc4MS00Y2VmLTg5MWUtMDg1ODZlYWMzMWYzIiwicmlkIjoiYzM0YmNiNTUtMzFkNy00ZDFmLTg5MDYtN2VhYzFjNGQ5ZGU5In0.XB0pX1WPepWleHo-bQQ4uDZCU4BCyKN4MmoqoyL3MnvMBE6eUWXpsTiJxcI9yPZcf-65vm2xAZwQDESNZaO4Dw';

async function query(sql) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql } },
        { type: 'close' }
      ]
    })
  });
  const data = await res.json();
  return data.results?.[0]?.response?.result;
}

async function main() {
  // Get states with city counts
  const statesResult = await query(`
    SELECT s.name, s.abbr, s.id, COUNT(c.id) as cityCount 
    FROM State s 
    LEFT JOIN City c ON c.stateId = s.id 
    GROUP BY s.id 
    ORDER BY cityCount DESC
  `);
  
  console.log('\n=== STATES BY CITY COUNT ===\n');
  let total = 0;
  const cols = statesResult.cols.map(c => c.name);
  for (const row of statesResult.rows) {
    const obj = {};
    row.forEach((val, i) => obj[cols[i]] = val.value);
    console.log(`${obj.abbr}: ${obj.cityCount} cities`);
    total += parseInt(obj.cityCount) || 0;
  }
  console.log(`\nTOTAL: ${total} cities across ${statesResult.rows.length} states`);
  
  // Get sample cities from top states
  const citiesResult = await query(`
    SELECT c.name, c.slug, s.abbr
    FROM City c
    JOIN State s ON c.stateId = s.id
    ORDER BY s.abbr, c.name
    LIMIT 50
  `);
  
  console.log('\n=== SAMPLE CITIES (first 50) ===\n');
  const cityCols = citiesResult.cols.map(c => c.name);
  for (const row of citiesResult.rows) {
    const obj = {};
    row.forEach((val, i) => obj[cityCols[i]] = val.value);
    console.log(`${obj.name}, ${obj.abbr} (${obj.slug})`);
  }
}

main().catch(console.error);
