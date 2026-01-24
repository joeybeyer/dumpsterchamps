# High-Converting Quote Form Framework

This document outlines the multi-step quote form framework used on DumpsterChamps.com that has proven to convert well.

---

## Overview

A 3-step progressive form that reduces friction and guides users through the quote request process with smart UX patterns and robust spam prevention.

---

## Architecture

```
src/
├── components/
│   └── forms/
│       └── QuoteForm.tsx          # Main form component
├── app/
│   └── api/
│       └── leads/
│           └── route.ts           # API endpoint with spam detection
└── messages/
    └── en.json                    # Translation keys (i18n)
```

---

## Multi-Step Design

### Step 1: Location (Low Friction Entry)
- Single field: ZIP code
- Auto-lookup city/state via `api.zippopotam.us`
- Visual confirmation of detected location
- Button: "Check Availability"

### Step 2: Project Details
- Project type dropdown (7 options)
- Dumpster size dropdown (6 options)
- Urgency message: "Same-day delivery available!"
- Back/Continue navigation

### Step 3: Contact Information
- First name
- Email address
- Phone number
- Encouragement: "Almost done!"
- Submit button: "Get My Free Quote"

---

## Key UX Features

### Progress Indicator
```tsx
// Visual step counter with checkmarks for completed steps
<div className="flex items-center justify-center gap-2 mb-6">
  {[1, 2, 3].map((s) => (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        s === step ? "bg-primary-600 text-white" :
        s < step ? "bg-primary-600 text-white" : "bg-secondary-200"
      )}
    >
      {s < step ? "✓" : s}
    </div>
  ))}
</div>
```

### Zip Code Auto-Lookup
```tsx
const lookupZipCode = async (zip: string) => {
  if (zip.length !== 5 || !/^\d{5}$/.test(zip)) return;

  const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
  if (response.ok) {
    const data = await response.json();
    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      setFormData((prev) => ({
        ...prev,
        city: place["place name"],
        state: place["state abbreviation"],
      }));
    }
  }
};
```

### Loading States
- Spinner on zip code lookup
- Spinner on form submission
- Disabled buttons during loading

### Urgency & Encouragement Messages
- Step 2: "Same-day delivery available in your area!"
- Step 3: "Almost done! Just need your contact info."

---

## Success State (Post-Conversion)

The success state is designed to maximize engagement after form submission:

### Components:
1. **Green confirmation** with checkmark icon
2. **"What happens next" timeline:**
   - Quote calculation (reviewing details)
   - Call from team (within 15 minutes)
   - Schedule delivery (often available same/next day)
3. **Double-dip CTA:** Phone call option for users who want immediate action
4. **Rotating testimonials:** 5 reviews cycling every 5 seconds
5. **Social proof:** "Rated 4.8/5 by 2,000+ customers"

### Testimonials Array
```tsx
const successTestimonials = [
  { name: "Mike R.", location: "Dallas, TX", text: "Got my quote in 15 minutes..." },
  { name: "Sarah M.", location: "Phoenix, AZ", text: "So easy! Called back within 10 minutes..." },
  { name: "James T.", location: "Houston, TX", text: "Best service I've used..." },
  { name: "Linda K.", location: "Atlanta, GA", text: "They called back right away..." },
  { name: "Robert D.", location: "Denver, CO", text: "Quick quote, no surprises..." },
];
```

---

## Spam Prevention System

### Client-Side (QuoteForm.tsx)

#### Honeypot Field
```tsx
// Hidden field - bots fill it, humans don't see it
<div className="absolute left-[-9999px]" aria-hidden="true">
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
  />
</div>
```

#### Timestamp Tracking
```tsx
// Record when form loads
useEffect(() => {
  setFormTimestamp(Date.now());
}, []);

// Send with form data
body: JSON.stringify({
  ...formData,
  honeypot,
  formTimestamp,
})
```

### Server-Side (route.ts)

#### Spam Check Pipeline
```tsx
async function checkForSpam(body): Promise<SpamCheckResult> {
  const reasons: string[] = [];

  // 1. Honeypot check
  if (body.honeypot && body.honeypot.trim() !== "") {
    reasons.push("honeypot_filled");
  }

  // 2. Timing check (< 3 seconds = bot)
  if (body.formTimestamp) {
    const submissionTime = Date.now() - body.formTimestamp;
    if (submissionTime < 3000) {
      reasons.push("submitted_too_fast");
    }
  }

  // 3. Disposable email check
  if (isDisposableEmail(body.email)) {
    reasons.push("disposable_email");
  }

  // 4. Phone validation
  const phoneCheck = validatePhone(body.phone);
  if (!phoneCheck.valid) {
    reasons.push(phoneCheck.reason);
  }

  // 5. Name validation (gibberish detection)
  const nameCheck = validateName(body.name);
  if (!nameCheck.valid) {
    reasons.push(nameCheck.reason);
  }

  // 6. Duplicate check (24 hours)
  const dupeCheck = await checkDuplicate(body.email, body.phone);
  if (dupeCheck.isDuplicate) {
    reasons.push(`duplicate_${dupeCheck.field}`);
  }

  return { isSpam: reasons.length > 0, reasons };
}
```

#### Disposable Email Domains (40+)
```tsx
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "throwaway.email",
  "guerrillamail.com", "10minutemail.com", "trashmail.com",
  "fakeinbox.com", "getnada.com", "temp-mail.org",
  "yopmail.com", "sharklasers.com", "maildrop.cc",
  // ... 30+ more
]);
```

#### Phone Validation Rules
- Must be 10 or 11 digits
- Area code can't start with 0 or 1
- Exchange code can't start with 0 or 1
- No 555-01xx (reserved for fiction)
- No all-same digits (111-111-1111)
- No sequential digits (123-456-7890)

#### Name Validation Rules
- Minimum 2 characters
- No URLs or HTML
- Must contain vowels (catches "xvzqrth")
- No excessive repeated characters
- Can't be only numbers

### Silent Spam Handling
```tsx
// Always return success (don't reveal detection to bots)
return NextResponse.json({ success: true, id: lead.id }, { status: 201 });

// But only email real leads
if (!spamCheck.isSpam) {
  await sendLeadNotification({ ... });
} else {
  console.log(`Spam lead detected: ${spamCheck.reasons.join(", ")}`);
}
```

---

## Form Data Structure

```typescript
interface FormData {
  zipCode: string;
  name: string;
  email: string;
  phone: string;
  city: string;        // Auto-filled from zip
  state: string;       // Auto-filled from zip
  projectType: string;
  dumpsterSize: string;
  message: string;
}
```

---

## Database Schema (Prisma)

```prisma
model Lead {
  id           String    @id @default(cuid())
  type         String    @default("quote")
  name         String
  email        String
  phone        String?
  city         String?
  state        String?
  projectType  String?
  dumpsterSize String?
  message      String?
  source       String?
  spam         Boolean   @default(false)
  spamReason   String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

---

## Translation Keys (i18n)

```json
{
  "quoteForm": {
    "stepLocation": "Location",
    "stepProject": "Project",
    "stepContact": "Contact",
    "stepOf": "Step {step} of {total}:",
    "enterZipCode": "Enter Your ZIP Code",
    "enterZipCodePlaceholder": "e.g. 90210",
    "checkAvailability": "Check Availability",
    "projectType": "What's your project?",
    "selectProjectType": "Select project type",
    "dumpsterSize": "What size dumpster?",
    "selectSize": "Select dumpster size",
    "sameDayAvailable": "Same-day delivery available in your area!",
    "almostDone": "Almost done! Just need your contact info.",
    "firstName": "First Name",
    "emailAddress": "Email Address",
    "phoneNumber": "Phone Number",
    "getMyQuote": "Get My Free Quote",
    "processing": "Processing...",
    "back": "Back",
    "continue": "Continue",
    "requestReceived": "Request Received!",
    "calculatingQuote": "We're calculating your quote now...",
    "whatHappensNext": "What happens next?",
    "quoteCalculation": "Quote Calculation",
    "reviewingDetails": "We're reviewing your project details",
    "callFromTeam": "Call From Our Team",
    "within15Min": "Expect a call within 15 minutes",
    "scheduleDelivery": "Schedule Delivery",
    "oftenAvailable": "Often available same or next day",
    "inARush": "In a rush? Call us now!",
    "callForInstant": "Call {phone} for Instant Quote",
    "rated": "Rated 4.8/5 by 2,000+ customers",
    "somethingWentWrong": "Something went wrong. Please try again."
  },
  "projectTypes": {
    "homeRenovation": "Home Renovation",
    "constructionProject": "Construction Project",
    "yardCleanup": "Yard Cleanup",
    "movingCleanout": "Moving/Cleanout",
    "roofingProject": "Roofing Project",
    "commercialProject": "Commercial Project",
    "other": "Other"
  },
  "dumpsterSizes": {
    "10Yard": "10 Yard - Small projects",
    "15Yard": "15 Yard - Medium projects",
    "20YardPopular": "20 Yard - Most Popular",
    "30Yard": "30 Yard - Large projects",
    "40Yard": "40 Yard - Major construction",
    "notSure": "Not Sure - Help me choose"
  }
}
```

---

## Why This Converts

1. **Low friction entry** - Just zip code to start
2. **Progressive disclosure** - One step at a time
3. **Instant gratification** - Auto-fill city/state
4. **Urgency without pressure** - "Same-day available"
5. **Clear progress** - Visual step indicator
6. **Encouragement** - "Almost done!"
7. **Post-submit engagement** - Timeline + phone CTA + testimonials
8. **Trust signals** - Ratings, testimonials, professional design
9. **Mobile-optimized** - Large touch targets, clear buttons
10. **Silent spam handling** - Clean lead pipeline

---

## Implementation Checklist

- [ ] Copy `QuoteForm.tsx` component
- [ ] Copy `route.ts` API endpoint
- [ ] Add Lead model to Prisma schema
- [ ] Add translation keys to messages
- [ ] Configure email notification service
- [ ] Update phone number and testimonials
- [ ] Customize project types and sizes for your industry
- [ ] Test spam detection with various inputs
- [ ] Test on mobile devices

---

## Dependencies

```json
{
  "next": "^15.x",
  "next-intl": "^3.x",
  "lucide-react": "^0.x",
  "@prisma/client": "^5.x",
  "resend": "^3.x"  // or your email service
}
```

---

*Last updated: January 2026*
