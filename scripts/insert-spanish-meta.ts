/**
 * Inserts pre-translated Spanish meta tags for GBP cities.
 * Run: npx tsx --env-file=.env scripts/insert-spanish-meta.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const DESC_ES = '¿Buscas renta de contenedores en {CITY}? Dumpster Champs ofrece contenedores roll-off asequibles para proyectos residenciales y comerciales.';

const updates: { id: string; metaTitleEs: string; metaDescEs: string; descriptionEs?: string }[] = [
  {
    id: 'cmjqcxrxo00b2cfpg2q5lthk5', // Atlanta, GA
    metaTitleEs: 'Renta de Contenedor en Atlanta, GA | $495 Tarifa Fija | Mismo Día',
    metaDescEs: 'Renta de contenedor en Atlanta desde $495 todo incluido. Entrega el mismo día en el área metropolitana. Contenedores de 10-40 yardas para proyectos del hogar, construcción y limpieza.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Atlanta'),
  },
  {
    id: 'cmjqcxrcv004ccfpgkei9qa5x', // Bakersfield, CA
    metaTitleEs: 'Renta de Contenedor en Bakersfield, CA | $495 | Mismo Día',
    metaDescEs: '¿Necesita un contenedor en Bakersfield? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Bakersfield'),
  },
  {
    id: 'cmjqcxs0y00c4cfpg5m0mhge4', // Baltimore, MD
    metaTitleEs: 'Renta de Contenedor en Baltimore, MD | $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Baltimore, MD desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Baltimore'),
  },
  {
    id: 'cmjqcxrje006ocfpgc1g0zz8g', // Bridgeport, CT
    metaTitleEs: 'Renta de Contenedor en Bridgeport, CT | 10-40 Yardas Desde $495',
    metaDescEs: '¿Necesita un contenedor en Bridgeport? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Bridgeport'),
  },
  {
    id: 'cmjqfdxwd000bcf5oa26tvok7', // Charlotte, NC
    metaTitleEs: 'Renta de Contenedor en Charlotte, NC | $495 Tarifa Fija | Entrega Rápida',
    metaDescEs: 'Renta de contenedor en Charlotte desde $495 todo incluido. Entrega el mismo día. Contenedores de 10-40 yardas para construcción, remodelaciones y limpieza. ¡Sin cargos ocultos!',
  },
  {
    id: 'cmjqcxs5a00dgcfpgu7x8aetu', // Columbus, OH
    metaTitleEs: 'Renta de Contenedor en Columbus, OH | $495 Tarifa Fija | Mismo Día',
    metaDescEs: 'Renta de contenedor en Columbus desde $495 todo incluido. Entrega el mismo día disponible. Contenedores de 10-40 yardas para construcción, limpieza y remodelaciones. ¡Sin cargos ocultos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Columbus'),
  },
  {
    id: 'cmjqcxs9e00eocfpgb5v1lnrv', // El Paso, TX
    metaTitleEs: 'Renta de Contenedor en El Paso, TX | $495 Todo Incluido | Mismo Día',
    metaDescEs: 'Renta de contenedor en El Paso desde $495 tarifa fija. Entrega el mismo día disponible. Contenedores de 10-40 yardas para cualquier proyecto. Precio todo incluido, ¡sin cargos ocultos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'El Paso'),
  },
  {
    id: 'cmjqfdxw90009cf5othng5mps', // Fontana, CA
    metaTitleEs: 'Renta de Contenedor en Fontana | Desde $495 | Servicio el Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Fontana, CA desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
  },
  {
    id: 'cmjqcxs9a00emcfpggzykmdtb', // Fort Worth, TX
    metaTitleEs: 'Renta de Contenedor en Fort Worth, TX | $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Fort Worth, TX desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Fort Worth'),
  },
  {
    id: 'cmjqcxrc30044cfpgwlnv7z5o', // Fresno, CA
    metaTitleEs: 'Renta de Contenedor en Fresno | $495 y Más | Entrega Rápida',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Fresno, CA desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Fresno'),
  },
  {
    id: 'cmjqcxrk1006scfpgn23aje9p', // Hartford, CT
    metaTitleEs: 'Renta un Contenedor en Hartford, CT | Desde $495',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Hartford, CT desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Hartford'),
  },
  {
    id: 'cmjqcxs8g00eecfpg8ki1a64q', // Houston, TX
    metaTitleEs: 'Renta de Contenedor en Houston | $495 y Más | Entrega Rápida',
    metaDescEs: 'Renta de contenedor en Houston, TX desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Houston'),
  },
  {
    id: 'cmjqcxrk5006ucfpg1clcnzg5', // Jacksonville, FL (1)
    metaTitleEs: 'Renta de Contenedor en Jacksonville, FL | $495 | Entrega el Mismo Día',
    metaDescEs: '¿Necesita un contenedor en Jacksonville? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Jacksonville'),
  },
  {
    id: 'cmjqfdxwl000fcf5ochhquyhy', // Jacksonville, FL (2)
    metaTitleEs: 'Renta de Contenedor en Jacksonville, FL | Desde $495 | Mismo Día',
    metaDescEs: 'Renta de contenedor en Jacksonville desde $495 todo incluido. Entrega el mismo día en el Condado Duval. Contenedores de 10-40 yardas. Tarifa fija, ¡sin cargos ocultos!',
  },
  {
    id: 'cmjqcxs8c00eccfpgo822lzce', // Knoxville, TN
    metaTitleEs: 'Renta de Contenedor en Knoxville, TN | $495 | Entrega el Mismo Día',
    metaDescEs: '¿Necesita un contenedor en Knoxville? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Knoxville'),
  },
  {
    id: 'cmjqcxrco0048cfpghp6i8p9v', // Long Beach, CA
    metaTitleEs: 'Renta de Contenedor en Long Beach | Desde $495 | Servicio el Mismo Día',
    metaDescEs: 'Renta de contenedor en Long Beach, CA desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Long Beach'),
  },
  {
    id: 'cmjqfdxws000jcf5osumguyww', // Louisville, KY
    metaTitleEs: 'Renta de Contenedor en Louisville, KY | Desde $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta de contenedor en Louisville desde $495 todo incluido. Entrega rápida el mismo día. Contenedores de 10-40 yardas. Ideal para proyectos del hogar. ¡Sin sorpresas!',
  },
  {
    id: 'cmjqcxs8800eacfpgawgtctus', // Memphis, TN
    metaTitleEs: 'Renta un Contenedor en Memphis, TN | Desde $495',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Memphis, TN desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Memphis'),
  },
  {
    id: 'cmjqcxsc000fccfpgh0gt8nhw', // Milwaukee, WI
    metaTitleEs: 'Renta de Contenedor en Milwaukee | Desde $495 | Entrega Rápida el Mismo Día',
    metaDescEs: 'Renta de contenedor en Milwaukee desde $495 todo incluido. Entrega el mismo día. Contenedores de 10-40 yardas para proyectos del hogar, construcción y limpieza. ¡Sin sorpresas!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Milwaukee'),
  },
  {
    id: 'cmjqcxrjx006qcfpg9dvvcoo2', // New Haven, CT
    metaTitleEs: 'Renta de Contenedor en New Haven | Desde $495 | Servicio el Mismo Día',
    metaDescEs: 'Renta de contenedor en New Haven, CT desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'New Haven'),
  },
  {
    id: 'cmjqcxs4800d4cfpgwgjc8lxd', // Newark, NJ
    metaTitleEs: 'Renta de Contenedor en Newark | Desde $495 | Servicio el Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Newark, NJ desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Newark'),
  },
  {
    id: 'cmjqfdxvm0001cf5okmjh162n', // North Hollywood, CA
    metaTitleEs: 'Renta un Contenedor en North Hollywood, CA | Desde $495',
    metaDescEs: 'Renta de contenedor en North Hollywood, CA desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
  },
  {
    id: 'cmjqcxrcr004acfpgk4c60bma', // Oakland, CA
    metaTitleEs: 'Renta un Contenedor en Oakland, CA | Desde $495',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Oakland, CA desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Oakland'),
  },
  {
    id: 'cmjqcxs4100d0cfpgb7p20chm', // Omaha, NE
    metaTitleEs: 'Renta de Contenedor en Omaha | $495 y Más | Entrega Rápida',
    metaDescEs: '¿Necesita un contenedor en Omaha? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Omaha'),
  },
  {
    id: 'cmjqcxrkj0072cfpgglre7fcp', // Orlando, FL (1)
    metaTitleEs: 'Renta un Contenedor en Orlando, FL | Desde $495',
    metaDescEs: 'Renta de contenedor en Orlando, FL desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Orlando'),
  },
  {
    id: 'cmjqfdxwp000hcf5oszwerczm', // Orlando, FL (2)
    metaTitleEs: 'Renta de Contenedor en Orlando, FL | 10-40 Yardas Desde $495',
    metaDescEs: '¿Necesita un contenedor en Orlando? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
  },
  {
    id: 'cmjqcxrnb007ycfpghuxgp908', // Pompano Beach, FL
    metaTitleEs: 'Renta de Contenedor en Pompano Beach, FL | $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en Pompano Beach, FL desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Pompano Beach'),
  },
  {
    id: 'cmjqfdxvx0005cf5ohvzop28g', // Richmond, CA
    metaTitleEs: 'Renta de Contenedor en Richmond | $495 y Más | Entrega Rápida',
    metaDescEs: '¿Necesita un contenedor en Richmond? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
  },
  {
    id: 'cmjqcxrd7004icfpgmql3wfh6', // Riverside, CA
    metaTitleEs: 'Renta de Contenedor en Riverside | Desde $495 | Servicio el Mismo Día',
    metaDescEs: '¿Necesita un contenedor en Riverside? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Riverside'),
  },
  {
    id: 'cmjqcxrbu003ycfpg8o1albay', // San Diego, CA
    metaTitleEs: 'Renta de Contenedor en San Diego | Desde $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta de contenedor en San Diego desde $495 todo incluido. Entrega el mismo día en todo el condado. Contenedores de 10-40 yardas para renovaciones, limpiezas y construcción.',
    descriptionEs: DESC_ES.replace('{CITY}', 'San Diego'),
  },
  {
    id: 'cmjqcxrc00042cfpgdl3dtl6t', // San Francisco, CA
    metaTitleEs: 'Renta de Contenedor en San Francisco, CA | $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta de contenedor en San Francisco, CA desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'San Francisco'),
  },
  {
    id: 'cmjqcxrda004kcfpg8h7u3tlo', // Stockton, CA
    metaTitleEs: 'Renta un Contenedor en Stockton, CA | Desde $495',
    metaDescEs: 'Renta de contenedor en Stockton, CA desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
    descriptionEs: DESC_ES.replace('{CITY}', 'Stockton'),
  },
  {
    id: 'cmjqcxrkf0070cfpgq24lozpw', // Tampa, FL (1)
    metaTitleEs: 'Renta de Contenedor en Tampa | Desde $495 | Servicio el Mismo Día',
    metaDescEs: '¿Necesita un contenedor en Tampa? Contenedores de 10-40 yardas desde $495 con entrega el mismo día. Sin cargos ocultos, protección de entrada incluida.',
    descriptionEs: DESC_ES.replace('{CITY}', 'Tampa'),
  },
  {
    id: 'cmjqfdxwh000dcf5oqlx3arbn', // Tampa, FL (2)
    metaTitleEs: 'Renta de Contenedor en Tampa, FL | $495 | Entrega el Mismo Día',
    metaDescEs: 'Renta de contenedor en Tampa, FL desde $495. Contenedores de 10-40 yardas con entrega el mismo día. ¡Llame al (888) 860-0710 - cotizaciones gratis en minutos!',
  },
  {
    id: 'cmjqfdxww000lcf5og0kj6r1x', // Tulsa, OK
    metaTitleEs: 'Renta de Contenedor en Tulsa, OK | $495 Todo Incluido | Mismo Día',
    metaDescEs: 'Renta de contenedor en Tulsa desde $495 tarifa fija. Entrega rápida el mismo día. Contenedores de 10-40 yardas para renovaciones, techos y limpieza. ¡Sin cargos ocultos!',
  },
  {
    id: 'cmjqfdxvs0003cf5olduwaj4s', // West Sacramento, CA
    metaTitleEs: 'Renta de Contenedor en West Sacramento, CA | $495 | Mismo Día',
    metaDescEs: 'Renta un contenedor de 10-40 yardas en West Sacramento, CA desde $495. Entrega el mismo día, sin cargos ocultos. Llame al (888) 860-0710 para precios inmediatos.',
  },
];

async function main() {
  console.log(`Updating Spanish meta tags for ${updates.length} cities...`);
  let done = 0;
  for (const u of updates) {
    await prisma.city.update({
      where: { id: u.id },
      data: {
        metaTitleEs: u.metaTitleEs,
        metaDescEs: u.metaDescEs,
        ...(u.descriptionEs && { descriptionEs: u.descriptionEs }),
      },
    });
    done++;
    process.stdout.write(`\r  ${done}/${updates.length}`);
  }
  console.log('\nDone!');
  await prisma.$disconnect();
}

main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1); });
