"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, MapPin, ClipboardList, User, Star, Home, Building2, Hammer, TreePine, Trash2, Briefcase, Car } from "lucide-react";
import { useQuoteFormContext } from "@/context/QuoteFormContext";

interface QuoteFormProps {
  cityName?: string;
  stateName?: string;
  className?: string;
  source?: string;
}

// Testimonials for rotation in success state
const successTestimonials = [
  { name: "Mike R.", location: "Dallas, TX", text: "Got my quote in 15 minutes. Dumpster arrived next morning!" },
  { name: "Sarah M.", location: "Phoenix, AZ", text: "So easy! Called back within 10 minutes with pricing." },
  { name: "James T.", location: "Houston, TX", text: "Best dumpster service I've used. Fast response, fair prices." },
  { name: "Linda K.", location: "Atlanta, GA", text: "They called back right away and had the dumpster same day!" },
  { name: "Robert D.", location: "Denver, CO", text: "Quick quote, no surprises. Highly recommend these guys." },
];

export function QuoteForm({ cityName, stateName, className, source }: QuoteFormProps) {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: "",
    name: "",
    email: "",
    phone: "",
    city: cityName || "",
    state: stateName || "",
    projectType: "",
    dumpsterSize: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [zipLookupLoading, setZipLookupLoading] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [callPulse, setCallPulse] = useState(false);
  const [priorityCountdown, setPriorityCountdown] = useState(299); // 4:59
  const [contactStep, setContactStep] = useState<1 | 2 | 3>(1);

  // Refs for sequential auto-focus in step 3
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Spam prevention: honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState("");

  // Spam prevention: timestamp when form was loaded
  const [formTimestamp, setFormTimestamp] = useState<number>(0);

  // LLM traffic attribution: capture referrer on load (ChatGPT, Perplexity, Claude, etc.)
  const [referrer] = useState(() => typeof document !== 'undefined' ? document.referrer : '');

  // Context for sharing form state with scarcity banner
  const { updateFormState } = useQuoteFormContext();

  // Sync form state to context for scarcity banner
  useEffect(() => {
    updateFormState({
      zipCode: formData.zipCode,
      city: formData.city,
      state: formData.state,
    });
  }, [formData.zipCode, formData.city, formData.state, updateFormState]);

  // Project types with icons for visual selection
  const projectTypes = [
    { value: "Home Renovation", label: t("projectTypes.homeRenovation"), icon: Home, emoji: "🏠" },
    { value: "Construction Project", label: t("projectTypes.constructionProject"), icon: Building2, emoji: "🏗️" },
    { value: "Yard Cleanup", label: t("projectTypes.yardCleanup"), icon: TreePine, emoji: "🌿" },
    { value: "Moving/Cleanout", label: t("projectTypes.movingCleanout"), icon: Trash2, emoji: "📦" },
    { value: "Roofing Project", label: t("projectTypes.roofingProject"), icon: Hammer, emoji: "🔨" },
    { value: "Commercial Project", label: t("projectTypes.commercialProject"), icon: Briefcase, emoji: "🏢" },
  ];

  // Dumpster sizes with visual scale references and pricing
  const dumpsterSizes = [
    { 
      value: "10 Yard", 
      label: "10 Yard", 
      trucks: 3, 
      bestFor: "Garage cleanout, small bathroom remodel",
      dimensions: "12' × 8' × 3.5'",
      price: "$495",
      scaleRef: "Compact SUV size",
      scaleIcon: "🚗",
      capacity: "Fits 3 pickup truck loads",
      tons: "1 ton included",
      heightFt: 3.5,
    },
    { 
      value: "20 Yard", 
      label: "20 Yard", 
      trucks: 6, 
      bestFor: "Kitchen remodel, roofing (up to 25 sq)",
      dimensions: "22' × 7.5' × 4.5'",
      price: "$595",
      scaleRef: "Large sedan length",
      scaleIcon: "🚙",
      capacity: "Fits 6 pickup truck loads",
      popular: true,
      tons: "2 tons included",
      heightFt: 4.5,
    },
    { 
      value: "30 Yard", 
      label: "30 Yard", 
      trucks: 10, 
      bestFor: "Major renovation, construction",
      dimensions: "22' × 7.5' × 6'",
      price: "$695",
      scaleRef: "Chest height (6 ft)",
      scaleIcon: "🧍",
      capacity: "Fits 10 pickup truck loads",
      tons: "3 tons included",
      heightFt: 6,
    },
    { 
      value: "40 Yard", 
      label: "40 Yard", 
      trucks: 14, 
      bestFor: "Large demolition, commercial",
      dimensions: "22' × 7.5' × 8'",
      price: "$795",
      scaleRef: "Taller than most people (8 ft)",
      scaleIcon: "🏗️",
      capacity: "Fits 14 pickup truck loads",
      tons: "4 tons included",
      heightFt: 8,
    },
  ];

  // Set timestamp when component mounts
  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

  // Rotate testimonials in success state
  useEffect(() => {
    if (status === "success") {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % successTestimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Pulse the call CTA every 5 seconds on the thank-you state
  useEffect(() => {
    if (status === "success") {
      const interval = setInterval(() => {
        setCallPulse(true);
        setTimeout(() => setCallPulse(false), 800);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Priority queue countdown (starts at 4:59, stops at 0)
  useEffect(() => {
    if (status === "success") {
      setPriorityCountdown(299);
      const interval = setInterval(() => {
        setPriorityCountdown((prev) => {
          if (prev <= 1) { clearInterval(interval); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Reset contact sub-step when navigating away from step 3
  useEffect(() => {
    if (step !== 3) setContactStep(1);
  }, [step]);

  // Auto-focus the active contact field
  useEffect(() => {
    if (step === 3) {
      const refs = [nameRef, emailRef, phoneRef];
      setTimeout(() => refs[contactStep - 1]?.current?.focus(), 80);
    }
  }, [step, contactStep]);

  // Scroll form into view when step changes (important for mobile UX)
  useEffect(() => {
    if (step > 1 && formRef.current) {
      // Small delay to let DOM update, then scroll
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [step]);

  // Scroll to success message when form is submitted
  useEffect(() => {
    if (status === "success" && successRef.current) {
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [status]);

  // Zip code auto-lookup
  const lookupZipCode = async (zip: string) => {
    if (zip.length !== 5 || !/^\d{5}$/.test(zip)) return;

    setZipLookupLoading(true);
    const startTime = Date.now();
    try {
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
    } catch {
      // Silently fail - user can still proceed without auto-fill
    } finally {
      // Enforce 650ms minimum display time to signal value of the availability check
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 650 - elapsed);
      setTimeout(() => setZipLookupLoading(false), remaining);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "quote",
          source: typeof window !== "undefined" ? window.location.href : "",
          // Spam prevention fields
          honeypot,
          formTimestamp,
          // LLM traffic attribution (ChatGPT, Perplexity, Claude, etc.)
          referrer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      // Fire Facebook Pixel Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      setFormData({
        zipCode: "",
        name: "",
        email: "",
        phone: "",
        city: cityName || "",
        state: stateName || "",
        projectType: "",
        dumpsterSize: "",
        message: "",
      });
      setHoneypot("");
      setStep(1);
    } catch (error) {
      setStatus("error");
      setErrorMessage(t("quoteForm.somethingWentWrong"));
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.zipCode) {
      return; // Don't advance without zip code
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const phone = "(888) 860-0710";

  if (status === "success") {
    const mins = Math.floor(priorityCountdown / 60);
    const secs = priorityCountdown % 60;
    const countdownDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return (
      <div ref={successRef} className={cn("bg-white rounded-lg p-6", className)}>
        {/* Success confirmation */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-700 font-medium text-sm">Request received! Our team is reviewing it now.</p>
        </div>

        {/* PRIMARY CTA — visual dominance */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-secondary-900 text-center mb-1">Want it faster? Call for an Instant Quote.</h3>
          <p className="text-secondary-500 text-sm text-center mb-4">
            Your request is in our queue <strong>(Current wait: ~8 mins)</strong>. Call now to bypass the queue and speak to an expert immediately.
          </p>

          {/* Live agents signal */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-700 text-sm font-semibold">Agents Live Now</span>
          </div>

          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className={cn(
              "flex items-center justify-center gap-3 bg-primary-600 text-white px-6 py-5 rounded-xl font-bold text-xl hover:bg-primary-700 transition-all w-full shadow-lg active:scale-[0.98] touch-manipulation",
              callPulse && "animate-bounce"
            )}
          >
            <svg className="w-7 h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Skip the Queue — Call Now</span>
          </a>
          <p className="text-center text-secondary-400 text-xs mt-2">{phone}</p>

          {/* Priority countdown */}
          <div className={cn(
            "mt-3 text-center text-xs font-medium",
            priorityCountdown > 0 ? "text-amber-600" : "text-secondary-400"
          )}>
            {priorityCountdown > 0
              ? `Priority quote line open for: ${countdownDisplay}`
              : "Priority line has closed — wait for our callback"}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 border-t border-secondary-200" />
          <span className="text-secondary-400 text-xs font-medium">or wait for our callback</span>
          <div className="flex-1 border-t border-secondary-200" />
        </div>

        {/* What happens next timeline — secondary */}
        <div className="bg-secondary-50 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-secondary-700 mb-3">{t("quoteForm.whatHappensNext")}</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-medium text-secondary-900">{t("quoteForm.quoteCalculation")}</p>
                <p className="text-xs text-secondary-500">{t("quoteForm.reviewingDetails")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-medium text-secondary-900">{t("quoteForm.callFromTeam")}</p>
                <p className="text-xs text-secondary-500">{t("quoteForm.within15Min")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-medium text-secondary-900">{t("quoteForm.scheduleDelivery")}</p>
                <p className="text-xs text-secondary-500">{t("quoteForm.oftenAvailable")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rotating testimonial */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-secondary-700 text-sm italic">
            &ldquo;{successTestimonials[testimonialIndex].text}&rdquo;
          </p>
          <p className="text-secondary-500 text-xs mt-1">
            — {successTestimonials[testimonialIndex].name}, {successTestimonials[testimonialIndex].location}
          </p>
        </div>

        {/* Social proof */}
        <p className="text-secondary-500 text-xs mt-3 flex items-center justify-center gap-1">
          {t("quoteForm.rated")}
        </p>
      </div>
    );
  }

  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
              s === step
                ? "bg-primary-600 text-white"
                : s < step
                ? "bg-primary-600 text-white"
                : "bg-secondary-200 text-secondary-500"
            )}
          >
            {s < step ? "✓" : s}
          </div>
          {s < 3 && (
            <div
              className={cn(
                "w-8 h-1 mx-1",
                s < step ? "bg-primary-600" : "bg-secondary-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Step labels
  const StepLabel = () => {
    const labels = [
      { icon: MapPin, text: t("quoteForm.stepLocation") },
      { icon: ClipboardList, text: t("quoteForm.stepProject") },
      { icon: User, text: t("quoteForm.stepContact") },
    ];
    const current = labels[step - 1];
    return (
      <div className="flex items-center justify-center gap-2 text-secondary-600 text-sm mb-4">
        <current.icon className="h-4 w-4" />
        <span>{t("quoteForm.stepOf", { step, total: 3 })} {current.text}</span>
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={cn("relative z-50", className)}>
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-4">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field - hidden from humans, visible to bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <ProgressIndicator />
      <StepLabel />

      {/* Step 1: Location */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
              {t("quoteForm.enterZipCode")} *
            </label>
            <div className="relative">
              <input
                type="text"
                id="zipCode"
                required
                maxLength={5}
                value={formData.zipCode}
                onChange={(e) => {
                  const zip = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, zipCode: zip });
                  if (zip.length === 5) {
                    lookupZipCode(zip);
                  }
                }}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-lg text-center font-medium"
                placeholder={t("quoteForm.enterZipCodePlaceholder")}
              />
              {zipLookupLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <svg className="animate-spin h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xs text-primary-600 font-medium">Searching inventory…</span>
                </div>
              )}
            </div>
            {formData.city && formData.state && (
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {formData.city}, {formData.state}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.zipCode}
            className="w-full bg-primary-600 text-white py-3.5 px-6 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
          >
            Get My Instant Quote
            <ChevronRight className="h-5 w-5" />
          </button>
          {/* What's included micro-copy to reduce anxiety */}
          <p className="text-xs text-secondary-500 text-center mt-2 flex items-center justify-center gap-1">
            <svg className="h-3.5 w-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Includes delivery, pickup & 7-day rental. Pricing from $495.
          </p>
        </div>
      )}

      {/* Step 2: Project Details - Icon-based selection for reduced friction */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Urgency message + sunk cost messaging */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-amber-800 text-sm font-medium">
              {t("quoteForm.sameDayAvailable")}
            </p>
          </div>

          {/* Project Type - Icon Grid */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              {t("quoteForm.projectType")} *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {projectTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = formData.projectType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type.value })}
                    className={cn(
                      "flex flex-col items-center p-3 border-2 rounded-xl transition-all active:scale-[0.98]",
                      isSelected
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-secondary-200 hover:border-primary-300 hover:bg-primary-50/50"
                    )}
                  >
                    <IconComponent className={cn(
                      "h-6 w-6 mb-1",
                      isSelected ? "text-primary-600" : "text-secondary-500"
                    )} />
                    <span className={cn(
                      "text-xs font-medium text-center leading-tight",
                      isSelected ? "text-primary-700" : "text-secondary-700"
                    )}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dumpster Size - Visual Cards with Scale Reference */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              {t("quoteForm.dumpsterSize")} *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {dumpsterSizes.map((size) => {
                const isSelected = formData.dumpsterSize === size.value;
                const sizeNum = parseInt(size.value);
                return (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, dumpsterSize: size.value })}
                    className={cn(
                      "relative flex flex-col p-3 border-2 rounded-xl transition-all active:scale-[0.98] text-left",
                      isSelected
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-secondary-200 hover:border-primary-300 hover:bg-primary-50/50",
                      size.popular && !isSelected && "border-primary-300 bg-primary-50/40"
                    )}
                  >
                    {/* Popular badge */}
                    {size.popular && (
                      <span className="absolute -top-2 -right-2 text-[10px] bg-primary-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                        BEST VALUE
                      </span>
                    )}
                    
                    {/* Size header with visual scale */}
                    <div className="flex items-start justify-between mb-2">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold",
                        isSelected ? "bg-primary-600 text-white" : "bg-secondary-100 text-secondary-700"
                      )}>
                        <span className="text-lg leading-none">{sizeNum}</span>
                        <span className="text-[8px] uppercase tracking-wide">yard</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Visual scale reference with icon */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {/* Person silhouette for scale */}
                      <svg className={cn("w-4 h-4 flex-shrink-0", isSelected ? "text-primary-600" : "text-secondary-400")} viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="4" r="2"/>
                        <path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06C9.17 7 8.5 7.72 8.11 8.11L4 12l1.41 1.41L8 10.83V20h2v-6h4v6h2V10.83l2.59 2.58L20 12l-4.11-3.89z"/>
                      </svg>
                      <span className={cn(
                        "text-[10px] leading-tight",
                        isSelected ? "text-primary-700" : "text-secondary-500"
                      )}>
                        {size.scaleRef}
                      </span>
                    </div>

                    {/* Capacity */}
                    <p className={cn(
                      "text-xs font-medium mb-1",
                      isSelected ? "text-primary-700" : "text-secondary-700"
                    )}>
                      {size.capacity}
                    </p>

                    {/* Best for */}
                    <p className="text-[10px] text-secondary-500 leading-tight mb-2">
                      {size.bestFor}
                    </p>

                    {/* Price and what's included */}
                    <div className="mt-auto pt-2 border-t border-secondary-200">
                      <div className="flex items-baseline justify-between">
                        <span className={cn(
                          "text-lg font-bold",
                          isSelected ? "text-primary-600" : "text-secondary-900"
                        )}>
                          {size.price}
                        </span>
                        <span className="text-[10px] text-secondary-500">{size.tons}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* What's included reminder */}
            <p className="text-xs text-secondary-500 text-center mt-3 bg-secondary-50 rounded-lg p-2">
              ✓ All prices include delivery, pickup & 7-day rental — no hidden fees
            </p>
          </div>

          {/* Progress messaging */}
          <p className="text-xs text-secondary-500 text-center">
            Step 2 of 3 — Just a few more details for your flat-rate quote
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 border-2 border-secondary-300 text-secondary-700 py-3 px-6 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              {t("quoteForm.back")}
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.projectType || !formData.dumpsterSize}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {t("quoteForm.continue")}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info — single-field sequential reveal */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Mini step progress */}
          <div className="flex items-center justify-center gap-2">
            {(["Name", "Email", "Phone"] as const).map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  contactStep > i + 1
                    ? "bg-green-500 text-white"
                    : contactStep === i + 1
                    ? "bg-primary-600 text-white"
                    : "bg-secondary-200 text-secondary-400"
                )}>
                  {contactStep > i + 1 ? "✓" : i + 1}
                </div>
                {i < 2 && (
                  <div className={cn("w-8 h-0.5 transition-colors", contactStep > i + 1 ? "bg-green-400" : "bg-secondary-200")} />
                )}
              </div>
            ))}
          </div>

          {/* Completed fields summary (sunk cost anchor) */}
          {contactStep > 1 && (
            <div className="bg-secondary-50 rounded-lg px-4 py-3 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500">Name</span>
                <span className="text-secondary-900 font-medium">{formData.name}</span>
              </div>
              {contactStep > 2 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-500">Email</span>
                  <span className="text-secondary-900 font-medium">{formData.email}</span>
                </div>
              )}
            </div>
          )}

          {/* Name field */}
          {contactStep === 1 && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                {t("quoteForm.firstName")} *
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter" && formData.name) { e.preventDefault(); setContactStep(2); } }}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder={t("quoteForm.firstNamePlaceholder")}
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border-2 border-secondary-300 text-secondary-700 py-3 px-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  disabled={!formData.name}
                  onClick={() => setContactStep(2)}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {t("quoteForm.continue")}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Email field */}
          {contactStep === 2 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                {t("quoteForm.emailAddress")} *
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter" && formData.email) { e.preventDefault(); setContactStep(3); } }}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder={t("quoteForm.emailPlaceholder")}
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setContactStep(1)}
                  className="border-2 border-secondary-300 text-secondary-700 py-3 px-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  disabled={!formData.email}
                  onClick={() => setContactStep(3)}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {t("quoteForm.continue")}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Phone field */}
          {contactStep === 3 && (
            <div>
              {/* Localized social proof trust banner */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center mb-3">
                <p className="text-green-800 text-sm font-medium">
                  {formData.city
                    ? `Join 450+ happy homeowners in ${formData.city} who rented this month`
                    : "Join 450+ happy homeowners who rented this month"}
                </p>
              </div>
              <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                {t("quoteForm.phoneNumber")} *
              </label>
              <input
                ref={phoneRef}
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder={t("quoteForm.phonePlaceholder")}
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setContactStep(2)}
                  className="border-2 border-secondary-300 text-secondary-700 py-3 px-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={status === "loading" || !formData.phone}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("quoteForm.processing")}
                    </>
                  ) : (
                    t("quoteForm.getMyQuote")
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
