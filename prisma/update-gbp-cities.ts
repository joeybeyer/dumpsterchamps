/**
 * Update GBP cities with phone numbers and map embeds
 * Run with: npx tsx prisma/update-gbp-cities.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GBP cities data: slug -> { phone, embed }
interface GBPData {
  phone: string;
  embed: string;
}

const GBP_CITIES: Record<string, GBPData> = {
  'long-beach-ca': {
    phone: '(562) 312-2260',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d157208.48850796028!2d-118.156115!3d33.800208!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa073129980cfaee5%3A0x48e97288c7ecb439!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767021551131!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'stockton-ca': {
    phone: '(209) 797-6720',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d298149.20511750283!2d-121.3433894!3d38.0021317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x223f16ea63558aff%3A0x41576859be8bb68c!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767021451266!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'pompano-beach-fl': {
    phone: '(754) 305-0680',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d679331.0214232776!2d-80.3154259!3d26.1409927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1c47bf570e18e2f%3A0xde674290053097d5!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018767505!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'el-paso-tx': {
    phone: '(915) 339-0007',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20086.54195184379!2d-106.5368863!3d31.8537921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ddf93139467d7f%3A0x9b610e8c3658e672!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018902885!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'fort-worth-tx': {
    phone: '(888) 860-0710',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4966.141495632755!2d-97.2096539!3d32.8587282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e794dcbf8284b%3A0xe18ef95c5a726b16!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018932365!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'atlanta-ga': {
    phone: '(470) 801-8243',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d314537.5079431024!2d-84.42020704999999!3d33.7673845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5016520066d5b%3A0x70927154a9028b19!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018680378!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'tulsa-ok': {
    phone: '(918) 601-8611',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4773.598379445635!2d-95.8998919!3d36.153176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6f3d8d24fa94d%3A0x6f54e5d8000aa94c!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018612135!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'san-francisco-ca': {
    phone: '(415) 230-2429',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d598061.1861686019!2d-122.7278025!3d37.7848269!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858709696b0347%3A0x98489bcf8d4d69a8!2sDumpsters%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018505327!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'louisville-ky': {
    phone: '(502) 497-3989',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4644.596881436591!2d-85.7429945!3d38.2217196!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690d35ef34c39f%3A0xcd2d725a0b06dfc4!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767018293030!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'columbus-oh': {
    phone: '(216) 412-7066',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4523.53892464945!2d-82.9788689!3d40.0800398!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388b527c1da5bb%3A0x7757000f805bfd3!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767016059608!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'orlando-fl': {
    phone: '(689) 272-3252',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d663736.7800693829!2d-81.6220176!3d28.704871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e71dad36ad24a7%3A0x792dc677f040de64!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017769844!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'milwaukee-wi': {
    phone: '(414) 279-8233',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d276460.2231083956!2d-87.96740805!3d43.0577975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88051984f024b435%3A0xca4b79f7fb2a9c3f!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017713076!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'jacksonville-fl': {
    phone: '(888) 860-0710',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20427.56642754585!2d-81.5702575!3d30.2519392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5cb7ae1aba30d%3A0xd13d65fc4d5fce6!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017652750!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'newark-nj': {
    phone: '(862) 391-7086',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17922.553444102694!2d-74.199295!3d40.721532!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c253b3579c1db9%3A0x992467a030e65df9!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017577791!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'tampa-fl': {
    phone: '(813) 790-6846',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d667955.484662926!2d-82.2883416!3d28.0326151!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c9ffda081f87%3A0x64fe0f149d4abaec!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017456260!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'charlotte-nc': {
    phone: '(704) 228-4304',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19316.97836499206!2d-80.8413568!3d35.2287921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a1f0f1aad3fb%3A0x67ec439ddb57cabe!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017434634!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'omaha-ne': {
    phone: '(402) 448-1462',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17777.48543917311!2d-95.9519528!3d41.2573912!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87938f789c2e380b%3A0x9f059132515fc206!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017358957!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'knoxville-tn': {
    phone: '(865) 284-3643',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19139.10710949821!2d-83.906523!3d35.969136!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c17290679aedf%3A0x7ac33df8664deb09!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017174354!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'memphis-tn': {
    phone: '(865) 252-7699',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19337.20190804397!2d-90.0402732!3d35.1437596!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d57fe69c265419%3A0x2ba5379ae12b20b0!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767017059417!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'hartford-ct': {
    phone: '(860) 217-2048',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17646.04158190392!2d-72.6530901!3d41.7380369!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6537c801fcbbf%3A0x3f9720c94ade2522!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767016857114!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'san-diego-ca': {
    phone: '(858) 321-4730',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1272471.8015653396!2d-117.013414!3d32.7791297!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7156b2469872b8d%3A0xce1e5d6b11175c98!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767016748679!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'new-haven-ct': {
    phone: '(475) 326-3676',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142130.519578611!2d-72.92917849999999!3d41.298415999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x28c1a95f733decfb%3A0x4d9bd8d796cdea78!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015975804!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'bridgeport-ct': {
    phone: '(203) 721-9006',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71188.96266716855!2d-73.19897005!3d41.184755949999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dc3f028048eab5d%3A0x868d0496826b5eee!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015889313!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'oakland-ca': {
    phone: '(510) 288-8611',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4671.544544487329!2d-122.2203389!3d37.797613199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f870dadfe7671%3A0xd985f8c884d2ac9e!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015721820!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'fontana-ca': {
    phone: '(909) 300-4609',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d78346.34756614754!2d-117.4550195!3d34.0799946!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb3d82b3dd8d7%3A0xa2ae09682a4fe509!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015568612!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'fresno-ca': {
    phone: '(559) 465-8252',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4736.9993598772!2d-119.7780535!3d36.750167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945f0dc35a7337%3A0x3db88f4dba6e9fe5!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015501012!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'bakersfield-ca': {
    phone: '(661) 462-3621',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9866207.778580688!2d-122.7389747!3d35.4258957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea418443106bb7%3A0xe7a01e236c74d937!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015430388!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'riverside-ca': {
    phone: '(951) 355-0387',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9866207.778580688!2d-122.7389747!3d35.4258957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb118d152d709%3A0xa46fe0276a4606d8!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015405480!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'richmond-ca': {
    phone: '(510) 323-9423',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4663.911693526788!2d-122.3572059!3d37.9181489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085837ae015a3bb%3A0x526a267ab15758d!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015192939!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'north-hollywood-ca': {
    phone: '(213) 714-8441',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4890.033244461952!2d-118.4110618!3d34.1942088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2974b8cadefa1%3A0xfcd2fda886121682!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767014987937!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  'west-sacramento-ca': {
    phone: '(916) 222-9561',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4624.191831316722!2d-121.55762790000001!3d38.540222799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ad3fb08414e51%3A0x9df3a7c90c04556!2sDumpster%20Rental%20Champs!5e1!3m2!1sen!2sus!4v1767015112228!5m2!1sen!2sus" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
};

async function main() {
  console.log('\n📍 Updating GBP Cities (Phone + Map Embed)\n');
  console.log(`Total GBP cities: ${Object.keys(GBP_CITIES).length}\n`);

  let updated = 0;
  let notFound = 0;

  for (const [slug, data] of Object.entries(GBP_CITIES)) {
    try {
      const result = await prisma.city.update({
        where: { slug },
        data: {
          phone: data.phone,
          gbpEmbed: data.embed,
        },
      });
      updated++;
      console.log(`✅ ${result.name}: ${data.phone}`);
    } catch (error) {
      notFound++;
      console.error(`❌ Not found: ${slug}`);
    }
  }

  await prisma.$disconnect();
  console.log('\n' + '━'.repeat(40));
  console.log(`\n✅ Updated: ${updated} cities`);
  if (notFound > 0) {
    console.log(`❌ Not found: ${notFound} cities`);
  }
}

main().catch(console.error);
