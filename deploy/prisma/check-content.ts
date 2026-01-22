import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const city = await prisma.city.findUnique({
    where: { slug: 'los-angeles-ca' },
    select: { aiDescription: true }
  });

  console.log('=== RAW AI DESCRIPTION ===\n');
  console.log(city?.aiDescription);

  // Check for markdown links
  const content = city?.aiDescription || '';
  const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);

  console.log('\n=== MARKDOWN LINKS FOUND ===');
  if (linkMatches) {
    linkMatches.forEach((link, i) => {
      console.log(`${i + 1}. ${link}`);
    });
  } else {
    console.log('NO MARKDOWN LINKS FOUND');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
