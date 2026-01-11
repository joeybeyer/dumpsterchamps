import { Shield, Award, Truck, CheckCircle, Clock } from "lucide-react";

interface TrustBadgesProps {
  variant?: "light" | "dark";
  className?: string;
  showDeliveryCounter?: boolean;
}

/**
 * Trust badges component displaying credibility signals.
 * Shows licensed & insured, BBB-style accreditation, and satisfaction guarantee.
 */
export function TrustBadges({
  variant = "light",
  className = "",
  showDeliveryCounter = true,
}: TrustBadgesProps) {
  const isDark = variant === "dark";

  const badgeStyles = isDark
    ? "bg-secondary-800/60 text-white border-secondary-700"
    : "bg-white text-secondary-700 border-secondary-200 shadow-sm";

  const iconStyles = isDark ? "text-primary-400" : "text-primary-600";
  const textStyles = isDark ? "text-white" : "text-secondary-800";
  const subtextStyles = isDark ? "text-secondary-400" : "text-secondary-500";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* Licensed & Insured */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${badgeStyles}`}>
        <Shield className={`h-5 w-5 ${iconStyles}`} />
        <div className="text-left">
          <p className={`text-sm font-semibold ${textStyles}`}>Licensed & Insured</p>
          <p className={`text-xs ${subtextStyles}`}>Full coverage</p>
        </div>
      </div>

      {/* Satisfaction Guarantee */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${badgeStyles}`}>
        <Award className={`h-5 w-5 ${iconStyles}`} />
        <div className="text-left">
          <p className={`text-sm font-semibold ${textStyles}`}>Satisfaction Guaranteed</p>
          <p className={`text-xs ${subtextStyles}`}>Or we make it right</p>
        </div>
      </div>

      {/* Delivery Counter */}
      {showDeliveryCounter && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${badgeStyles}`}>
          <Truck className={`h-5 w-5 ${iconStyles}`} />
          <div className="text-left">
            <p className={`text-sm font-semibold ${textStyles}`}>500+ Delivered</p>
            <p className={`text-xs ${subtextStyles}`}>This week</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact inline trust badges for use in hero sections or CTAs.
 */
export function TrustBadgesInline({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";
  const textStyles = isDark ? "text-secondary-300" : "text-secondary-600";
  const iconStyles = isDark ? "text-primary-400" : "text-primary-600";

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm ${textStyles} ${className}`}>
      <span className="flex items-center gap-1">
        <Shield className={`h-4 w-4 ${iconStyles}`} />
        Licensed & Insured
      </span>
      <span className="hidden sm:block">•</span>
      <span className="flex items-center gap-1">
        <CheckCircle className={`h-4 w-4 ${iconStyles}`} />
        Satisfaction Guaranteed
      </span>
      <span className="hidden sm:block">•</span>
      <span className="flex items-center gap-1">
        <Truck className={`h-4 w-4 ${iconStyles}`} />
        500+ Delivered This Week
      </span>
    </div>
  );
}

/**
 * Compact delivery counter for placement near pricing.
 */
export function DeliveryCounter({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  const bgStyles = isDark
    ? "bg-green-900/30 border-green-700/50"
    : "bg-green-50 border-green-200";
  const textStyles = isDark ? "text-green-400" : "text-green-700";
  const iconStyles = isDark ? "text-green-400" : "text-green-600";

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${bgStyles} ${className}`}>
      <div className={`w-2 h-2 rounded-full bg-green-500 animate-pulse`} />
      <Truck className={`h-4 w-4 ${iconStyles}`} />
      <span className={`text-sm font-medium ${textStyles}`}>
        500+ dumpsters delivered this week
      </span>
    </div>
  );
}

/**
 * Response time stat for placement near forms and CTAs.
 */
export function ResponseTimeStat({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  const bgStyles = isDark
    ? "bg-primary-900/30 border-primary-700/50"
    : "bg-primary-50 border-primary-200";
  const textStyles = isDark ? "text-primary-300" : "text-primary-700";
  const iconStyles = isDark ? "text-primary-400" : "text-primary-600";
  const highlightStyles = isDark ? "text-white font-bold" : "text-primary-800 font-bold";

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${bgStyles} ${className}`}>
      <Clock className={`h-4 w-4 ${iconStyles}`} />
      <span className={`text-sm ${textStyles}`}>
        Average response: <span className={highlightStyles}>12 minutes</span>
      </span>
    </div>
  );
}
