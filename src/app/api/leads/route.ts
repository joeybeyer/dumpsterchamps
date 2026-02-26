import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";

// ============ SPAM DETECTION UTILITIES ============

// Disposable email domains (expand as needed)
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "throwaway.email", "guerrillamail.com",
  "10minutemail.com", "trashmail.com", "fakeinbox.com", "getnada.com",
  "temp-mail.org", "disposablemail.com", "yopmail.com", "sharklasers.com",
  "guerrillamail.info", "grr.la", "spam4.me", "dispostable.com",
  "mailnesia.com", "tempr.email", "discard.email", "tmpmail.org",
  "tmpmail.net", "mohmal.com", "tempail.com", "emailondeck.com",
  "mintemail.com", "mt2009.com", "20minutemail.com", "33mail.com",
  "maildrop.cc", "getairmail.com", "fakemail.fr", "spamgourmet.com",
  "mytemp.email", "burnermail.io", "tempmailo.com", "mailsac.com",
]);

// Check if email uses a disposable domain
function isDisposableEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  return DISPOSABLE_DOMAINS.has(domain);
}

// Validate US phone number format and detect fake patterns
function validatePhone(phone: string | null | undefined): { valid: boolean; reason?: string } {
  if (!phone) return { valid: true }; // Phone is optional

  // Strip all non-digits
  const digits = phone.replace(/\D/g, "");

  // Must be 10 or 11 digits (11 if starts with 1)
  if (digits.length === 11 && digits.startsWith("1")) {
    // Remove leading 1
    const tenDigits = digits.slice(1);
    return validateTenDigitPhone(tenDigits);
  } else if (digits.length === 10) {
    return validateTenDigitPhone(digits);
  } else {
    return { valid: false, reason: "invalid_phone_length" };
  }
}

function validateTenDigitPhone(digits: string): { valid: boolean; reason?: string } {
  // Area code can't start with 0 or 1
  if (digits[0] === "0" || digits[0] === "1") {
    return { valid: false, reason: "invalid_area_code" };
  }

  // Exchange code (digits 4-6) can't start with 0 or 1
  if (digits[3] === "0" || digits[3] === "1") {
    return { valid: false, reason: "invalid_exchange_code" };
  }

  // Reject 555-01xx through 555-01xx (reserved for fiction)
  if (digits.slice(3, 6) === "555" && digits.slice(6, 8) === "01") {
    return { valid: false, reason: "fake_555_number" };
  }

  // Reject all same digits (e.g., 111-111-1111)
  if (/^(\d)\1{9}$/.test(digits)) {
    return { valid: false, reason: "all_same_digits" };
  }

  // Reject sequential digits (e.g., 123-456-7890)
  if (digits === "1234567890" || digits === "0987654321") {
    return { valid: false, reason: "sequential_digits" };
  }

  // Reject obvious test patterns
  const testPatterns = ["0000000000", "1111111111", "2222222222", "9999999999"];
  if (testPatterns.includes(digits)) {
    return { valid: false, reason: "test_pattern" };
  }

  return { valid: true };
}

// Validate name - detect gibberish
function validateName(name: string): { valid: boolean; reason?: string } {
  const trimmed = name.trim();

  // Too short
  if (trimmed.length < 2) {
    return { valid: false, reason: "name_too_short" };
  }

  // Contains URLs
  if (/https?:\/\/|www\./i.test(trimmed)) {
    return { valid: false, reason: "name_contains_url" };
  }

  // Contains HTML
  if (/<[^>]+>/i.test(trimmed)) {
    return { valid: false, reason: "name_contains_html" };
  }

  // All consonants (no vowels) - likely gibberish like "xvzqrth"
  const letters = trimmed.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (letters.length >= 4) {
    const vowels = letters.replace(/[^aeiou]/g, "");
    if (vowels.length === 0) {
      return { valid: false, reason: "name_no_vowels" };
    }
    // Vowel ratio too low (less than 15% for long names)
    if (letters.length >= 6 && vowels.length / letters.length < 0.15) {
      return { valid: false, reason: "name_low_vowel_ratio" };
    }
  }

  // Repeated characters (e.g., "aaaaaaa" or "abababab")
  if (/(.)\1{4,}/.test(trimmed) || /(.{2,})\1{3,}/.test(trimmed)) {
    return { valid: false, reason: "name_repeated_chars" };
  }

  // Only numbers
  if (/^\d+$/.test(trimmed)) {
    return { valid: false, reason: "name_only_numbers" };
  }

  return { valid: true };
}

// Check for duplicate submissions in the last 24 hours
async function checkDuplicate(email: string, phone: string | null | undefined): Promise<{ isDuplicate: boolean; field?: string }> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Check email duplicate
  const emailDupe = await prisma.lead.findFirst({
    where: {
      email: email.toLowerCase(),
      createdAt: { gte: twentyFourHoursAgo },
    },
  });

  if (emailDupe) {
    return { isDuplicate: true, field: "email" };
  }

  // Check phone duplicate (if provided)
  if (phone) {
    const normalizedPhone = phone.replace(/\D/g, "");
    const phoneDupe = await prisma.lead.findFirst({
      where: {
        phone: { not: null },
        createdAt: { gte: twentyFourHoursAgo },
      },
    });

    // Compare normalized phone numbers
    if (phoneDupe && phoneDupe.phone) {
      const existingNormalized = phoneDupe.phone.replace(/\D/g, "");
      if (existingNormalized === normalizedPhone ||
          (normalizedPhone.length === 11 && normalizedPhone.slice(1) === existingNormalized) ||
          (existingNormalized.length === 11 && existingNormalized.slice(1) === normalizedPhone)) {
        return { isDuplicate: true, field: "phone" };
      }
    }
  }

  return { isDuplicate: false };
}

// Validate email format
function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============ SPAM DETECTION RESULT ============
interface SpamCheckResult {
  isSpam: boolean;
  reasons: string[];
}

async function checkForSpam(body: {
  name: string;
  email: string;
  phone?: string | null;
  honeypot?: string;
  formTimestamp?: number;
}): Promise<SpamCheckResult> {
  const reasons: string[] = [];

  // 1. Honeypot check - if filled, it's a bot
  if (body.honeypot && body.honeypot.trim() !== "") {
    reasons.push("honeypot_filled");
  }

  // 2. Timing check - form submitted too fast (less than 3 seconds)
  if (body.formTimestamp) {
    const submissionTime = Date.now() - body.formTimestamp;
    if (submissionTime < 3000) { // Less than 3 seconds
      reasons.push("submitted_too_fast");
    }
  }

  // 3. Email validation
  if (!isValidEmailFormat(body.email)) {
    reasons.push("invalid_email_format");
  } else if (isDisposableEmail(body.email)) {
    reasons.push("disposable_email");
  }

  // 4. Phone validation
  const phoneCheck = validatePhone(body.phone);
  if (!phoneCheck.valid && phoneCheck.reason) {
    reasons.push(phoneCheck.reason);
  }

  // 5. Name validation
  const nameCheck = validateName(body.name);
  if (!nameCheck.valid && nameCheck.reason) {
    reasons.push(nameCheck.reason);
  }

  // 6. Duplicate check (within 24 hours)
  const dupeCheck = await checkDuplicate(body.email, body.phone);
  if (dupeCheck.isDuplicate) {
    reasons.push(`duplicate_${dupeCheck.field}`);
  }

  return {
    isSpam: reasons.length > 0,
    reasons,
  };
}

// ============ LLM REFERRER DETECTION ============

// Known LLM/AI chat platforms that might send traffic
const LLM_REFERRERS = [
  { pattern: /chatgpt\.com|chat\.openai\.com/i, name: "ChatGPT" },
  { pattern: /perplexity\.ai/i, name: "Perplexity" },
  { pattern: /claude\.ai|anthropic\.com/i, name: "Claude" },
  { pattern: /gemini\.google\.com|bard\.google\.com/i, name: "Google Gemini" },
  { pattern: /copilot\.microsoft\.com|bing\.com\/chat/i, name: "Microsoft Copilot" },
  { pattern: /you\.com/i, name: "You.com" },
  { pattern: /poe\.com/i, name: "Poe" },
  { pattern: /character\.ai/i, name: "Character.AI" },
  { pattern: /phind\.com/i, name: "Phind" },
  { pattern: /kagi\.com/i, name: "Kagi" },
];

function detectLLMReferrer(referrer: string | undefined | null): string | null {
  if (!referrer) return null;
  
  for (const llm of LLM_REFERRERS) {
    if (llm.pattern.test(referrer)) {
      return llm.name;
    }
  }
  
  return null;
}

// ============ API ROUTES ============

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      type, name, email, phone, city, state,
      projectType, dumpsterSize, message, source,
      honeypot, formTimestamp, // Spam prevention fields
      referrer // LLM traffic attribution (ChatGPT, Perplexity, Claude, etc.)
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Run spam checks
    const spamCheck = await checkForSpam({
      name,
      email,
      phone,
      honeypot,
      formTimestamp,
    });

    // Detect LLM referral source
    const llmSource = detectLLMReferrer(referrer);
    
    // Create lead in database (mark as spam if detected)
    const lead = await prisma.lead.create({
      data: {
        type: type || "quote",
        name,
        email: email.toLowerCase(),
        phone,
        city,
        state,
        projectType,
        dumpsterSize,
        message,
        source,
        referrer, // Store raw referrer for analytics
        spam: spamCheck.isSpam,
        spamReason: spamCheck.isSpam ? spamCheck.reasons.join(", ") : null,
      },
    });

    // Only send email notification for non-spam leads
    if (!spamCheck.isSpam) {
      try {
        await sendLeadNotification({
          name,
          email,
          phone,
          city,
          state,
          projectType,
          dumpsterSize,
          message,
          source,
          referrer, // Include raw referrer
          llmSource, // Include detected LLM name (if any)
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    } else {
      console.log(`Spam lead detected (ID: ${lead.id}): ${spamCheck.reasons.join(", ")}`);
    }

    // Always return success to not reveal spam detection to bots
    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Simple admin endpoint to list leads (add auth in production)
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const includeSpam = searchParams.get("spam") === "true";

  try {
    const leads = await prisma.lead.findMany({
      where: includeSpam ? {} : { spam: false },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
