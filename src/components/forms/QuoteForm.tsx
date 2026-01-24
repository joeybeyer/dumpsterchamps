"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, MapPin, ClipboardList, User, Star, Home, Building2, Hammer, TreePine, Trash2, Briefcase } from "lucide-react";

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

  // Spam prevention: honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState("");

  // Spam prevention: timestamp when form was loaded
  const [formTimestamp, setFormTimestamp] = useState<number>(0);

  // Project types with icons for visual selection
  const projectTypes = [
    { value: "Home Renovation", label: t("projectTypes.homeRenovation"), icon: Home, emoji: "🏠" },
    { value: "Construction Project", label: t("projectTypes.constructionProject"), icon: Building2, emoji: "🏗️" },
    { value: "Yard Cleanup", label: t("projectTypes.yardCleanup"), icon: TreePine, emoji: "🌿" },
    { value: "Moving/Cleanout", label: t("projectTypes.movingCleanout"), icon: Trash2, emoji: "📦" },
    { value: "Roofing Project", label: t("projectTypes.roofingProject"), icon: Hammer, emoji: "🔨" },
    { value: "Commercial Project", label: t("projectTypes.commercialProject"), icon: Briefcase, emoji: "🏢" },
  ];

  // Dumpster sizes with truck load equivalents
  const dumpsterSizes = [
    { value: "10 Yard", label: t("dumpsterSizes.10Yard"), trucks: 4, bestFor: "Small cleanouts" },
    { value: "15 Yard", label: t("dumpsterSizes.15Yard"), trucks: 6, bestFor: "Medium projects" },
    { value: "20 Yard (Most Popular)", label: t("dumpsterSizes.20YardPopular"), trucks: 8, bestFor: "Renovations", popular: true },
    { value: "30 Yard", label: t("dumpsterSizes.30Yard"), trucks: 12, bestFor: "Large jobs" },
    { value: "40 Yard", label: t("dumpsterSizes.40Yard"), trucks: 16, bestFor: "Major projects" },
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

  // Scroll form into view when step changes (important for mobile UX)
  useEffect(() => {
    if (step > 1 && formRef.current) {
      // Small delay to let DOM update, then scroll
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [step]);

  // Zip code auto-lookup
  const lookupZipCode = async (zip: string) => {
    if (zip.length !== 5 || !/^\d{5}$/.test(zip)) return;

    setZipLookupLoading(true);
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
      setZipLookupLoading(false);
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
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
    return (
      <div className={cn("bg-green-50 border border-green-200 rounded-lg p-6", className)}>
        {/* Success confirmation */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-800">{t("quoteForm.requestReceived")}</h3>
        </div>

        <p className="text-green-700 mb-4 text-center">
          {t("quoteForm.calculatingQuote")}
        </p>

        {/* What happens next timeline */}
        <div className="bg-white rounded-lg p-4 mb-4">
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

        {/* Divider */}
        <div className="border-t border-green-200 my-4" />

        {/* Double-dip CTA */}
        <p className="text-secondary-700 font-medium mb-3 text-center">
          {t("quoteForm.inARush")}
        </p>

        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors w-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {t("quoteForm.callForInstant", { phone })}
        </a>

        {/* Rotating testimonial */}
        <div className="bg-secondary-50 rounded-lg p-3 mt-4">
          <div className="flex items-start gap-2">
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-secondary-700 text-sm mt-2 italic">
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
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {t("quoteForm.checkAvailability")}
            <ChevronRight className="h-5 w-5" />
          </button>
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

          {/* Dumpster Size - Visual Selection */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              {t("quoteForm.dumpsterSize")} *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {dumpsterSizes.map((size) => {
                const isSelected = formData.dumpsterSize === size.value;
                return (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, dumpsterSize: size.value })}
                    className={cn(
                      "flex items-center justify-between p-3 border-2 rounded-xl transition-all active:scale-[0.99]",
                      isSelected
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-secondary-200 hover:border-primary-300 hover:bg-primary-50/50",
                      size.popular && !isSelected && "border-primary-200 bg-primary-50/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                        isSelected ? "bg-primary-600 text-white" : "bg-secondary-100 text-secondary-700"
                      )}>
                        {size.value.split(" ")[0]}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-semibold text-sm",
                            isSelected ? "text-primary-700" : "text-secondary-900"
                          )}>
                            {size.label}
                          </span>
                          {size.popular && (
                            <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-secondary-500">
                          ≈ {size.trucks} pickup truck loads • {size.bestFor}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
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

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Almost done encouragement */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-800 text-sm font-medium">
              {t("quoteForm.almostDone")}
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
              {t("quoteForm.firstName")} *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder={t("quoteForm.firstNamePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
              {t("quoteForm.emailAddress")} *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder={t("quoteForm.emailPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
              {t("quoteForm.phoneNumber")} *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder={t("quoteForm.phonePlaceholder")}
            />
          </div>

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
              type="submit"
              disabled={status === "loading" || !formData.name || !formData.email || !formData.phone}
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
    </form>
  );
}
