"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
  "20 Yard",
  "30 Yard",
  "40 Yard",
  "Not Sure",
];

export function QuoteForm({ cityName, stateName, className, source }: QuoteFormProps) {
  const [formData, setFormData] = useState({
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: cityName || "",
        state: stateName || "",
        projectType: "",
        dumpsterSize: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or call us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("bg-green-50 border border-green-200 rounded-lg p-6 text-center", className)}>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We&apos;ve received your request and will contact you shortly with a quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="John Smith"
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
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Los Angeles"
          />
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-secondary-700 mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-secondary-900"
          >
            <option value="" className="text-secondary-500">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="text-secondary-900 bg-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dumpsterSize" className="block text-sm font-medium text-secondary-700 mb-1">
            Dumpster Size
          </label>
          <select
            id="dumpsterSize"
            value={formData.dumpsterSize}
            onChange={(e) => setFormData({ ...formData, dumpsterSize: e.target.value })}
            className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-secondary-900"
          >
            <option value="" className="text-secondary-500">Select a size</option>
            {dumpsterSizes.map((size) => (
              <option key={size} value={size} className="text-secondary-900 bg-white">
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Get Your Free Quote"}
      </button>
    </form>
  );
}
