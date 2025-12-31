"use client";

import { useState, useMemo } from "react";

const PROJECT_TYPES = [
  { id: "kitchen-remodel", name: "Kitchen Remodel", volumePerSqFt: 0.08, typicalSqFt: 150 },
  { id: "bathroom-remodel", name: "Bathroom Remodel", volumePerSqFt: 0.06, typicalSqFt: 75 },
  { id: "roof-tearoff", name: "Roof Tear-Off", volumePerSqFt: 0.015, typicalSqFt: 2000 },
  { id: "garage-cleanout", name: "Garage Cleanout", volumePerSqFt: 0.04, typicalSqFt: 400 },
  { id: "basement-cleanout", name: "Basement Cleanout", volumePerSqFt: 0.03, typicalSqFt: 800 },
  { id: "whole-house-cleanout", name: "Whole House Cleanout", volumePerSqFt: 0.02, typicalSqFt: 2000 },
  { id: "room-addition", name: "Room Addition/Demo", volumePerSqFt: 0.1, typicalSqFt: 300 },
  { id: "deck-removal", name: "Deck Removal", volumePerSqFt: 0.05, typicalSqFt: 200 },
  { id: "yard-waste", name: "Yard Waste / Landscaping", volumePerSqFt: 0.01, typicalSqFt: 1000 },
  { id: "flooring-removal", name: "Flooring Removal", volumePerSqFt: 0.02, typicalSqFt: 500 },
  { id: "general-construction", name: "General Construction", volumePerSqFt: 0.05, typicalSqFt: 500 },
  { id: "estate-cleanout", name: "Estate Cleanout", volumePerSqFt: 0.025, typicalSqFt: 1500 },
];

const DEBRIS_TYPES = [
  { id: "general-junk", name: "General Household Junk", weightPerCuYd: 150, icon: "🗑️" },
  { id: "furniture", name: "Furniture", weightPerCuYd: 200, icon: "🛋️" },
  { id: "drywall", name: "Drywall", weightPerCuYd: 500, icon: "🧱" },
  { id: "wood", name: "Wood / Lumber", weightPerCuYd: 300, icon: "🪵" },
  { id: "shingles", name: "Roofing Shingles", weightPerCuYd: 750, icon: "🏠" },
  { id: "concrete", name: "Concrete / Brick", weightPerCuYd: 2000, icon: "🪨" },
  { id: "dirt", name: "Dirt / Soil", weightPerCuYd: 2200, icon: "🌍" },
  { id: "yard-waste", name: "Yard Waste / Branches", weightPerCuYd: 250, icon: "🌿" },
  { id: "appliances", name: "Appliances", weightPerCuYd: 400, icon: "🧊" },
  { id: "carpet", name: "Carpet / Flooring", weightPerCuYd: 400, icon: "🟫" },
];

const DUMPSTER_SIZES = [
  { size: 10, dimensions: "12' x 8' x 3.5'", weightLimit: 2000, priceRange: [300, 450], bestFor: "Small cleanouts, bathroom remodels" },
  { size: 15, dimensions: "16' x 7.5' x 4'", weightLimit: 3000, priceRange: [350, 500], bestFor: "Medium projects, single room demos" },
  { size: 20, dimensions: "22' x 7.5' x 4.5'", weightLimit: 4000, priceRange: [400, 575], bestFor: "Kitchen remodels, roof tear-offs, large cleanouts" },
  { size: 30, dimensions: "22' x 7.5' x 6'", weightLimit: 5000, priceRange: [450, 650], bestFor: "Major renovations, construction debris" },
  { size: 40, dimensions: "22' x 7.5' x 8'", weightLimit: 6000, priceRange: [500, 750], bestFor: "Commercial projects, whole house demos" },
];

export function DumpsterCalculator() {
  const [projectType, setProjectType] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [selectedDebris, setSelectedDebris] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleDebris = (debrisId: string) => {
    setSelectedDebris((prev) =>
      prev.includes(debrisId)
        ? prev.filter((id) => id !== debrisId)
        : [...prev, debrisId]
    );
  };

  const results = useMemo(() => {
    if (!projectType || !squareFootage || selectedDebris.length === 0) {
      return null;
    }

    const project = PROJECT_TYPES.find((p) => p.id === projectType);
    if (!project) return null;

    const sqFt = parseFloat(squareFootage);
    if (isNaN(sqFt) || sqFt <= 0) return null;

    const estimatedVolume = sqFt * project.volumePerSqFt;

    const selectedDebrisTypes = DEBRIS_TYPES.filter((d) =>
      selectedDebris.includes(d.id)
    );
    const avgWeightPerCuYd =
      selectedDebrisTypes.reduce((sum, d) => sum + d.weightPerCuYd, 0) /
      selectedDebrisTypes.length;

    const estimatedWeight = estimatedVolume * avgWeightPerCuYd;

    const volumeWithBuffer = estimatedVolume * 1.2;
    let recommendedSize = DUMPSTER_SIZES[0];
    
    for (const size of DUMPSTER_SIZES) {
      if (size.size >= volumeWithBuffer) {
        recommendedSize = size;
        break;
      }
      recommendedSize = size;
    }

    const hasHeavyMaterial = selectedDebris.some((id) =>
      ["concrete", "dirt", "shingles"].includes(id)
    );

    const weightWarningThreshold = recommendedSize.weightLimit * 0.8;
    const isOverweight = estimatedWeight > recommendedSize.weightLimit;
    const isNearLimit = estimatedWeight > weightWarningThreshold;

    let finalRecommendation = recommendedSize;
    if (isOverweight) {
      const currentIndex = DUMPSTER_SIZES.findIndex(
        (s) => s.size === recommendedSize.size
      );
      if (currentIndex < DUMPSTER_SIZES.length - 1) {
        finalRecommendation = DUMPSTER_SIZES[currentIndex + 1];
      }
    }

    return {
      estimatedVolume: Math.round(estimatedVolume * 10) / 10,
      estimatedWeight: Math.round(estimatedWeight),
      recommendedSize: finalRecommendation,
      isOverweight,
      isNearLimit,
      hasHeavyMaterial,
      avgWeightPerCuYd: Math.round(avgWeightPerCuYd),
    };
  }, [projectType, squareFootage, selectedDebris]);

  const handleCalculate = () => {
    if (results) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setProjectType("");
    setSquareFootage("");
    setSelectedDebris([]);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Dumpster Size & Weight Calculator
        </h2>
        <p className="text-orange-100">
          Get the right size and avoid hidden weight fees. Takes 30 seconds.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {!showResults ? (
          <div className="space-y-8">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs mr-2">
                  1
                </span>
                What type of project are you working on?
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              >
                <option value="">Select your project type...</option>
                {PROJECT_TYPES.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Square Footage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs mr-2">
                  2
                </span>
                What&apos;s the approximate square footage?
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  placeholder={
                    projectType
                      ? `Typical: ${PROJECT_TYPES.find((p) => p.id === projectType)?.typicalSqFt || 500} sq ft`
                      : "Enter square footage"
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  sq ft
                </span>
              </div>
              {projectType && (
                <p className="mt-2 text-sm text-gray-500">
                  💡 Typical {PROJECT_TYPES.find((p) => p.id === projectType)?.name}:{" "}
                  {PROJECT_TYPES.find((p) => p.id === projectType)?.typicalSqFt} sq ft
                </p>
              )}
            </div>

            {/* Step 3: Debris Types */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs mr-2">
                  3
                </span>
                What type of debris will you have? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DEBRIS_TYPES.map((debris) => (
                  <button
                    key={debris.id}
                    onClick={() => toggleDebris(debris.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                      selectedDebris.includes(debris.id)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <span className="text-xl">{debris.icon}</span>
                    <span className="text-sm font-medium">{debris.name}</span>
                  </button>
                ))}
              </div>
              {selectedDebris.some((id) =>
                ["concrete", "dirt"].includes(id)
              ) && (
                <p className="mt-3 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                  ⚠️ Heavy materials like concrete and dirt fill up weight limits
                  fast. We&apos;ll factor this into your recommendation.
                </p>
              )}
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!results}
              className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition-all ${
                results
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Calculate My Dumpster Size →
            </button>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {results && (
              <>
                {/* Recommendation Card */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <p className="text-orange-100 text-sm font-medium mb-1">
                    RECOMMENDED SIZE
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold">
                      {results.recommendedSize.size}
                    </span>
                    <span className="text-2xl">Yard Dumpster</span>
                  </div>
                  <p className="text-orange-100">
                    Dimensions: {results.recommendedSize.dimensions}
                  </p>
                  <p className="text-orange-100">
                    Best for: {results.recommendedSize.bestFor}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Estimated Volume</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.estimatedVolume} <span className="text-base font-normal">cubic yards</span>
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Estimated Weight</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.estimatedWeight.toLocaleString()}{" "}
                      <span className="text-base font-normal">lbs</span>
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Weight Limit</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.recommendedSize.weightLimit.toLocaleString()}{" "}
                      <span className="text-base font-normal">lbs</span>
                    </p>
                  </div>
                </div>

                {/* Weight Warning */}
                {results.isNearLimit && !results.isOverweight && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-amber-800">
                        You&apos;re close to the weight limit
                      </p>
                      <p className="text-sm text-amber-700">
                        Your estimated weight is {Math.round((results.estimatedWeight / results.recommendedSize.weightLimit) * 100)}% of the {results.recommendedSize.weightLimit.toLocaleString()} lb limit. 
                        Consider the next size up to avoid overage fees.
                      </p>
                    </div>
                  </div>
                )}

                {results.isOverweight && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
                    <span className="text-2xl">🚨</span>
                    <div>
                      <p className="font-semibold text-red-800">
                        We upgraded your size to avoid overage fees
                      </p>
                      <p className="text-sm text-red-700">
                        Based on your heavy materials, we recommended a larger dumpster 
                        to keep you under the weight limit. Overage fees typically run $50-100 per ton!
                      </p>
                    </div>
                  </div>
                )}

                {/* Price Estimate */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-green-800">
                      Estimated Price Range
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      ${results.recommendedSize.priceRange[0]} - ${results.recommendedSize.priceRange[1]}
                    </p>
                  </div>
                  <p className="text-sm text-green-700">
                    Includes delivery, pickup, and disposal. Final price depends on your location and rental duration.
                  </p>
                </div>

                {/* Pro Tips */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="font-semibold text-blue-800 mb-3">💡 Pro Tips to Save Money</p>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Ask about the weight limit and overage fees BEFORE booking</li>
                    <li>• Request flat-rate pricing that includes a realistic weight allowance</li>
                    <li>• Confirm there are no hidden delivery, fuel, or environmental fees</li>
                    {results.hasHeavyMaterial && (
                      <li>• For heavy materials like concrete, ask about &quot;clean load&quot; discounts</li>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 rounded-xl p-6 text-center">
                  <p className="text-white text-lg mb-4">
                    Ready to get a quote for your {results.recommendedSize.size}-yard dumpster?
                  </p>
                  <a
                    href="tel:8888600710"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now: (888) 860-0710
                  </a>
                  <p className="text-gray-400 text-sm mt-3">
                    Free quotes • No hidden fees • Same-day delivery available
                  </p>
                </div>

                {/* Start Over */}
                <button
                  onClick={handleReset}
                  className="w-full py-3 text-gray-500 hover:text-gray-700 font-medium"
                >
                  ← Calculate for a different project
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
