/**
 * OpenRouter API Client
 * Uses Claude Opus 4.5 via OpenRouter for content generation
 */

interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

// Rate limiting configuration
const RATE_LIMIT = {
  requestsPerMinute: 50,
  minDelayMs: 1200, // Minimum delay between requests
};

let lastRequestTime = 0;

/**
 * Delay to respect rate limits
 */
async function rateLimitDelay(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT.minDelayMs) {
    const delay = RATE_LIMIT.minDelayMs - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  lastRequestTime = Date.now();
}

/**
 * Generate content using OpenRouter API
 */
export async function generateContent(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const {
    maxTokens = 4000,
    temperature = 0.7,
    systemPrompt = 'You are an expert SEO content writer specializing in local service businesses.',
  } = options;

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-opus-4-5-20250514';

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  await rateLimitDelay();

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt },
  ];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://dumpsterchamps.com',
      'X-Title': 'Dumpster Champs Content Generator',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data: OpenRouterResponse = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('No content in OpenRouter response');
  }

  // Log usage for cost tracking
  if (data.usage) {
    console.log(`[OpenRouter] Tokens used: ${data.usage.total_tokens} (in: ${data.usage.prompt_tokens}, out: ${data.usage.completion_tokens})`);
  }

  return data.choices[0].message.content;
}

/**
 * Generate structured JSON content
 */
export async function generateJSON<T>(
  prompt: string,
  options: GenerateOptions = {}
): Promise<T> {
  const jsonPrompt = `${prompt}

IMPORTANT: Return ONLY valid JSON. No markdown, no code blocks, no explanation. Just the raw JSON object.`;

  const content = await generateContent(jsonPrompt, {
    ...options,
    temperature: 0.5, // Lower temperature for more consistent JSON
  });

  // Try to extract JSON from the response
  let jsonStr = content.trim();

  // Remove markdown code blocks if present
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7);
  } else if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3);
  }

  jsonStr = jsonStr.trim();

  try {
    return JSON.parse(jsonStr) as T;
  } catch (error) {
    console.error('Failed to parse JSON response:', jsonStr);
    throw new Error(`Invalid JSON response from OpenRouter: ${error}`);
  }
}

/**
 * Batch generate content with progress tracking
 */
export async function batchGenerate<T>(
  items: T[],
  generateFn: (item: T, index: number) => Promise<string>,
  options: {
    batchSize?: number;
    delayBetweenBatches?: number;
    onProgress?: (completed: number, total: number) => void;
  } = {}
): Promise<string[]> {
  const {
    batchSize = 5,
    delayBetweenBatches = 5000,
    onProgress,
  } = options;

  const results: string[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map((item, idx) => generateFn(item, i + idx))
    );

    results.push(...batchResults);

    if (onProgress) {
      onProgress(results.length, items.length);
    }

    // Delay between batches (unless it's the last batch)
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }

  return results;
}
