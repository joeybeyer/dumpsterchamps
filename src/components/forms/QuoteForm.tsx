"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, MapPin, ClipboardList, User } from "lucide-react";

interface QuoteFormProps {
  cityName?: string;
  stateName?: string;
  className?: string;
  source?: string;
}

const projectTypes = [
  "Home Renovation",
  "Construction Project",
  "Yard Cleanup",
  "Moving/Cleanout",
  "Roofing Project",
  "Commercial Project",
  "Other",
];

const dumpsterSizes = [
  "10 Yard",
  "15 Yard",
  "20 Yard (Most Popular)",
  "30 Yard",
  "40 Yard",
  "Not Sure",
];

export function QuoteForm({ cityName, stateName, className, source }: QuoteFormProps) {
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

  // Spam prevention: honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState("");

  // Spam prevention: timestamp when form was loaded
  const [formTimestamp, setFormTimestamp] = useState<number>(0);

  // Set timestamp when component mounts
  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

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
      setErrorMessage("Something went wrong. Please try again or call us directly.");
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
      <div className={cn("bg-green-50 border border-green-200 rounded-lg p-6 text-center", className)}>
        {/* Success confirmation */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-800">Request Received!</h3>
        </div>

        <p className="text-green-700 mb-2">
          We&apos;re calculating your quote now.
        </p>

        <p className="text-green-600 text-sm mb-4">
          ⏱️ Expect a callback within 15 minutes during business hours.
        </p>

        {/* Divider */}
        <div className="border-t border-green-200 my-4" />

        {/* Double-dip CTA */}
        <p className="text-secondary-700 font-medium mb-3">
          In a rush? Skip the wait!
        </p>

        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors w-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {phone} for Instant Quote
        </a>

        {/* Social proof */}
        <p className="text-secondary-500 text-xs mt-4 flex items-center justify-center gap-1">
          ⭐ Rated 4.9/5 by 10,000+ Customers
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
      { icon: MapPin, text: "Location" },
      { icon: ClipboardList, text: "Project" },
      { icon: User, text: "Contact" },
    ];
    const current = labels[step - 1];
    return (
      <div className="flex items-center justify-center gap-2 text-secondary-600 text-sm mb-4">
        <current.icon className="h-4 w-4" />
        <span>Step {step} of 3: {current.text}</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative z-50", className)}>
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
              Enter Your Zip Code *
            </label>
            <input
              type="text"
              id="zipCode"
              required
              maxLength={10}
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-lg text-center font-medium"
              placeholder="Enter zip code"
            />
          </div>
          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.zipCode}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Check Availability
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Step 2: Project Details */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Urgency message after zip code entry */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-amber-800 text-sm font-medium">
              🚚 Only 3 delivery slots left for tomorrow in your area!
            </p>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-secondary-700 mb-1">
              Project Type *
            </label>
            <select
              id="projectType"
              required
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-secondary-900"
            >
              <option value="" className="text-secondary-500">Select your project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="text-secondary-900 bg-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dumpsterSize" className="block text-sm font-medium text-secondary-700 mb-1">
              Dumpster Size *
            </label>
            <select
              id="dumpsterSize"
              required
              value={formData.dumpsterSize}
              onChange={(e) => setFormData({ ...formData, dumpsterSize: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-secondary-900"
            >
              <option value="" className="text-secondary-500">Select a size</option>
              {dumpsterSizes.map((size) => (
                <option key={size} value={size} className="text-secondary-900 bg-white">
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 border-2 border-secondary-300 text-secondary-700 py-3 px-6 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.projectType || !formData.dumpsterSize}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 border-2 border-secondary-300 text-secondary-700 py-3 px-6 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={status === "loading" || !formData.name || !formData.email || !formData.phone}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting..." : "Get My Quote"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
