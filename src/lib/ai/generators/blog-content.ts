/**
 * Blog Content Generator
 * Generates AI-powered blog posts with Ferris Wheel linking
 */

import { PrismaClient } from '@prisma/client';
import { generateJSON } from '../openrouter';
import {
  BLOG_SYSTEM_PROMPT,
  BLOG_TOPICS,
  getBlogPostPrompt,
  getNextTopicId,
} from '../prompts/blog-content';

const prisma = new PrismaClient();

interface GeneratedBlogPost {
  title: string;
  slug: string;
  metaTitle: string;
  metaDesc: string;
  excerpt: string;
  content: string;
}

/**
 * Generate a single blog post for a city and topic
 */
export async function generateBlogPost(
  cityId: string,
  topicId: number
): Promise<GeneratedBlogPost> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { state: true },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  const topic = BLOG_TOPICS.find(t => t.id === topicId);
  if (!topic) {
    throw new Error(`Topic not found: ${topicId}`);
  }

  // Get next topic for Ferris Wheel linking
  const nextTopicId = getNextTopicId(topicId);
  const nextTopic = BLOG_TOPICS.find(t => t.id === nextTopicId);
  const nextBlogSlug = `${nextTopic?.category}-guide-${city.slug}`;

  const prompt = getBlogPostPrompt({
    cityName: city.name,
    citySlug: city.slug,
    state: city.state.name,
    stateAbbr: city.state.abbr,
    topic,
    nextBlogSlug,
  });

  const result = await generateJSON<GeneratedBlogPost>(prompt, {
    systemPrompt: BLOG_SYSTEM_PROMPT,
    maxTokens: 5000,
    temperature: 0.7,
  });

  return result;
}

/**
 * Generate all blog posts for a city
 */
export async function generateBlogPostsForCity(cityId: string): Promise<void> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { state: true },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  console.log(`\n📝 Generating ${BLOG_TOPICS.length} blog posts for ${city.name}, ${city.state.abbr}...`);

  const createdBlogs: { id: string; topicId: number }[] = [];

  for (const topic of BLOG_TOPICS) {
    console.log(`  → Topic ${topic.id}/${BLOG_TOPICS.length}: ${topic.topic}...`);

    try {
      const blogData = await generateBlogPost(cityId, topic.id);

      // Create the blog post
      const blog = await prisma.cityBlog.create({
        data: {
          cityId,
          title: blogData.title,
          slug: blogData.slug,
          content: blogData.content,
          excerpt: blogData.excerpt,
          metaTitle: blogData.metaTitle,
          metaDesc: blogData.metaDesc,
          isAiGenerated: true,
          aiGeneratedAt: new Date(),
          templateId: topic.id,
          published: true,
        },
      });

      createdBlogs.push({ id: blog.id, topicId: topic.id });
      console.log(`  ✓ Created: ${blogData.title}`);

      // Small delay between posts
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`  ❌ Error generating topic ${topic.id}:`, error);
    }
  }

  // Set up Ferris Wheel linking (circular)
  console.log('  → Setting up Ferris Wheel links...');
  await linkBlogsInCircle(createdBlogs);

  console.log(`✅ Generated ${createdBlogs.length} blog posts for ${city.name}`);
}

/**
 * Link blogs in a circular Ferris Wheel pattern
 */
async function linkBlogsInCircle(
  blogs: { id: string; topicId: number }[]
): Promise<void> {
  if (blogs.length < 2) return;

  // Sort by topic ID to ensure consistent ordering
  const sorted = [...blogs].sort((a, b) => a.topicId - b.topicId);

  for (let i = 0; i < sorted.length; i++) {
    const nextIndex = (i + 1) % sorted.length;
    const prevIndex = (i - 1 + sorted.length) % sorted.length;

    await prisma.cityBlog.update({
      where: { id: sorted[i].id },
      data: {
        nextBlogId: sorted[nextIndex].id,
        prevBlogId: sorted[prevIndex].id,
      },
    });
  }
}

/**
 * Generate blog posts for all priority cities
 */
export async function generateBlogPostsForPriorityCities(): Promise<void> {
  const priorityCitySlugs = [
    'los-angeles-ca',
    'houston-tx',
    'phoenix-az',
    'dallas-tx',
    'las-vegas-nv',
    'san-diego-ca',
    'san-antonio-tx',
    'austin-tx',
    'jacksonville-fl',
    'north-hollywood-ca',
  ];

  const cities = await prisma.city.findMany({
    where: {
      slug: { in: priorityCitySlugs },
    },
    select: { id: true, name: true },
  });

  console.log(`\n🚀 Generating blog posts for ${cities.length} cities...\n`);
  console.log(`Each city will get ${BLOG_TOPICS.length} unique blog posts.\n`);

  for (const city of cities) {
    try {
      // Check if city already has AI-generated blogs
      const existingCount = await prisma.cityBlog.count({
        where: { cityId: city.id, isAiGenerated: true },
      });

      if (existingCount >= BLOG_TOPICS.length) {
        console.log(`⏭️ Skipping ${city.name} - already has ${existingCount} AI blogs`);
        continue;
      }

      // Clear existing AI blogs for this city before regenerating
      if (existingCount > 0) {
        await prisma.cityBlog.deleteMany({
          where: { cityId: city.id, isAiGenerated: true },
        });
      }

      await generateBlogPostsForCity(city.id);
    } catch (error) {
      console.error(`Error generating blogs for ${city.name}:`, error);
    }
  }

  console.log(`\n✅ Blog post generation complete!`);
}

/**
 * Get cities that need blog generation
 */
export async function getCitiesNeedingBlogs(): Promise<{ id: string; name: string; blogCount: number }[]> {
  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { blogs: { where: { isAiGenerated: true } } },
      },
    },
  });

  return cities
    .filter(c => c._count.blogs < BLOG_TOPICS.length)
    .map(c => ({
      id: c.id,
      name: c.name,
      blogCount: c._count.blogs,
    }));
}

/**
 * Get blog post count by city
 */
export async function getBlogStats(): Promise<{
  totalCities: number;
  citiesWithBlogs: number;
  totalBlogs: number;
  aiGeneratedBlogs: number;
}> {
  const [totalCities, citiesWithBlogs, totalBlogs, aiGeneratedBlogs] = await Promise.all([
    prisma.city.count(),
    prisma.city.count({ where: { blogs: { some: {} } } }),
    prisma.cityBlog.count(),
    prisma.cityBlog.count({ where: { isAiGenerated: true } }),
  ]);

  return { totalCities, citiesWithBlogs, totalBlogs, aiGeneratedBlogs };
}
