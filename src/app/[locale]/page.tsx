import Link from "next/link";
import Image from "next/image";
import { Phone, Truck, Clock, Shield, Star, ChevronRight, HelpCircle, Calculator, FileText } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { prisma } from "@/lib/prisma";
import { LocalBusinessSchema, FAQSchema, AggregateRatingSchema, ReviewSchema } from "@/components/seo/SchemaMarkup";
import { LocalFAQAccordion, DEFAULT_CITY_FAQS } from "@/components/city/LocalFAQAccordion";
import { TestimonialStrip } from "@/components/ui/TestimonialStrip";
import { DeliveryCounter, ResponseTimeStat } from "@/components/ui/TrustBadges";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get translations
  const t = await getTranslations();

  const dumpsterSizes = [
    {
      size: 10,
      name: t("sizes.10yard"),
      dimensions: t("dimensions.10yard"),
      ideal: t("dumpsterIdealFor.10yard"),
      price: "$495",
    },
    {
      size: 15,
      name: t("sizes.15yard"),
      dimensions: t("dimensions.15yard"),
      ideal: t("dumpsterIdealFor.15yard"),
      price: "$550",
    },
    {
      size: 20,
      name: t("sizes.20yard"),
      dimensions: t("dimensions.20yard"),
      ideal: t("dumpsterIdealFor.20yard"),
      price: "$595",
    },
    {
      size: 30,
      name: t("sizes.30yard"),
      dimensions: t("dimensions.30yard"),
      ideal: t("dumpsterIdealFor.30yard"),
      price: "$695",
    },
    {
      size: 40,
      name: t("sizes.40yard"),
      dimensions: t("dimensions.40yard"),
      ideal: t("dumpsterIdealFor.40yard"),
      price: "$795",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: t("features.fastDelivery"),
      description: t("features.fastDeliveryDesc"),
    },
    {
      icon: Clock,
      title: t("features.flexibleRentals"),
      description: t("features.flexibleRentalsDesc"),
    },
    {
      icon: Shield,
      title: t("features.noHiddenFees"),
      description: t("features.noHiddenFeesDesc"),
    },
    {
      icon: Star,
      title: t("features.fiveStarService"),
      description: t("features.fiveStarServiceDesc"),
    },
  ];
  // Get featured states for the locations section
  const states = await prisma.state.findMany({
    take: 12,
    orderBy: { name: "asc" },
  });

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Hero Section - Optimized for Conversion */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Column - Content & Form (natural left-to-right reading flow) */}
            <div>
              {/* Kicker - Social Proof */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-primary-400 font-medium text-sm">
                  {t("hero.trustedBy")}
                </span>
              </div>

              {/* Headline - Problem-focused with action verb */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                {t("hero.headline")}
              </h1>

              {/* Description - Addresses pain points */}
              <p className="text-lg text-secondary-200 mb-4 leading-relaxed">
                {t("hero.description")} <strong className="text-white">$495</strong> — {t("hero.noHiddenFees")}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Clock className="h-4 w-4 text-primary-400" />
                  <span>{t("hero.sameDayDelivery")}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Shield className="h-4 w-4 text-primary-400" />
                  <span>{t("hero.noHiddenFeesShort")}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{t("hero.googleRating")}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-start mb-4">
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="bg-primary-600 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 text-lg lg:text-xl"
                >
                  <Phone className="h-5 w-5 lg:h-6 lg:w-6" />
                  {t("hero.callNow")} {phone}
                </a>
                <span className="text-primary-300 text-xs mt-1.5 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {t("hero.speakRealPerson")}
                </span>
              </div>

              {/* Delivery Counter & Response Time - Social proof */}
              <div className="flex flex-wrap gap-3 mb-3">
                <DeliveryCounter variant="dark" />
                <ResponseTimeStat variant="dark" />
              </div>

              {/* Quote Form */}
              <div id="quote-form" className="bg-white rounded-xl p-5 shadow-2xl">
                <h2 className="text-xl font-bold text-secondary-900 mb-3">
                  {t("hero.getYourPrice")}
                </h2>
                <QuoteForm />
              </div>

              {/* Mobile Hero Image - shown below form on small screens */}
              <div className="lg:hidden relative mt-8">
                <div className="relative aspect-[4/3] max-w-sm mx-auto">
                  <Image
                    src="/images/hero/hero-homeowner-mobile.jpg"
                    alt="Roll-off dumpster being delivered to residential driveway"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image (Dumpster delivery in action) */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <Image
                  src="/images/hero/hero-homeowner-desktop.jpg"
                  alt="Roll-off dumpster truck delivering dumpster to home"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Social Proof */}
      <TestimonialStrip />

      {/* Dumpster Sizes Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              {t("sizeSection.title")}
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {t("sizeSection.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dumpsterSizes.map((dumpster) => (
              <Link
                key={dumpster.size}
                href={`/${dumpster.size}-yard-dumpster`}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group relative ${
                  dumpster.size === 20 ? "ring-2 ring-primary-500 shadow-md" : ""
                }`}
              >
                {dumpster.size === 20 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t("sizes.mostPopular")}
                  </div>
                )}
                <div className="text-center">
                  <div className="bg-primary-600 text-white text-3xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {dumpster.size}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {dumpster.name}
                  </h3>
                  <p className="text-sm text-secondary-500 mb-2">
                    {dumpster.dimensions}
                  </p>
                  <p className="text-sm text-secondary-600 mb-3">
                    {dumpster.ideal}
                  </p>
                  <p className="text-lg font-semibold text-primary-600">
                    {dumpster.price}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary-600 mt-3 group-hover:gap-2 transition-all">
                    {t("sizeSection.learnMore")} <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-xl text-secondary-600">
              {t("howItWorks.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: t("howItWorks.step1Title"),
                description: t("howItWorks.step1Desc"),
              },
              {
                step: 2,
                title: t("howItWorks.step2Title"),
                description: t("howItWorks.step2Desc"),
              },
              {
                step: 3,
                title: t("howItWorks.step3Title"),
                description: t("howItWorks.step3Desc"),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-primary-600 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      {states.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
                {t("locations.title")}
              </h2>
              <p className="text-xl text-secondary-600">
                {t("locations.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {states.map((state) => (
                <Link
                  key={state.id}
                  href={`/dumpster-rental-${state.slug}`}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-secondary-900 hover:text-primary-600">
                    {state.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
              >
                {t("locations.viewAll")} <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Helpful Guides Section - Internal Linking for PAA Pages */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              {t("guides.title")}
            </h2>
            <p className="text-secondary-600">
              {t("guides.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/what-size-dumpster-do-i-need"
              className="group bg-secondary-50 hover:bg-primary-50 rounded-xl p-6 transition-colors"
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600">
                {t("guides.sizeGuideTitle")}
              </h3>
              <p className="text-sm text-secondary-600">
                {t("guides.sizeGuideDesc")}
              </p>
            </Link>
            <Link
              href="/how-much-does-dumpster-rental-cost"
              className="group bg-secondary-50 hover:bg-primary-50 rounded-xl p-6 transition-colors"
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600">
                {t("guides.costGuideTitle")}
              </h3>
              <p className="text-sm text-secondary-600">
                {t("guides.costGuideDesc")}
              </p>
            </Link>
            <Link
              href="/do-i-need-permit-for-dumpster"
              className="group bg-secondary-50 hover:bg-primary-50 rounded-xl p-6 transition-colors"
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <HelpCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600">
                {t("guides.permitGuideTitle")}
              </h3>
              <p className="text-sm text-secondary-600">
                {t("guides.permitGuideDesc")}
              </p>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-secondary-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Get answers to the most common questions about dumpster rental costs, sizing, and delivery.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <LocalFAQAccordion 
              faqs={DEFAULT_CITY_FAQS}
              cityName="your area"
              stateName="your state"
            />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("cta.readyToStart")}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t("cta.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              {t("cta.getFreeQuote")}
            </Link>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema />
      <AggregateRatingSchema ratingValue={4.9} reviewCount={500} />
      <ReviewSchema
        reviews={[
          { author: "Mike R.", reviewBody: "Ordered Monday, delivered Tuesday. Couldn't be easier! Great price and the driver was super careful with my driveway.", ratingValue: 5 },
          { author: "Sarah M.", reviewBody: "Used them for my kitchen remodel. The 15-yard was perfect. No hidden fees like other companies tried to charge me.", ratingValue: 5 },
          { author: "James T.", reviewBody: "As a contractor, I've used many dumpster companies. These guys are reliable and their pricing is transparent. Highly recommend.", ratingValue: 5 },
          { author: "Linda K.", reviewBody: "Cleaned out my parents' house after 40 years. The team was compassionate and made a hard time easier. Thank you!", ratingValue: 5 },
          { author: "Robert D.", reviewBody: "Same-day delivery when I needed it most. My roof was leaking and I needed debris gone ASAP. Lifesavers!", ratingValue: 5 },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "How much does a dumpster rental cost?", answer: "Dumpster rental prices start at $495 for a 10-yard container, with all-inclusive pricing that covers delivery, pickup, 7-day rental, and weight allowance. Our 15-yard is $550, 20-yard is $595, 30-yard is $695, and 40-yard is $795. No hidden fees." },
          { question: "What size dumpster do I need?", answer: "The size depends on your project. A 10-yard dumpster is great for small cleanouts and bathroom remodels. A 20-yard handles kitchen remodels and large cleanouts. A 30-40 yard is best for major construction or whole-house cleanouts. Use our free size calculator or call for recommendations." },
          { question: "How do I find dumpster rental near me?", answer: "Dumpster Champs provides dumpster rental services nationwide. Enter your zip code or call us to get instant availability and pricing for your area. We offer same-day delivery in most locations." },
          { question: "How long can I keep the dumpster?", answer: "Standard rental period is 7 days, included in your price. Need more time? Extensions are available for $10-$20 per day depending on dumpster size. Just call before your rental period ends." },
          { question: "What can I put in the dumpster?", answer: "Most household items, furniture, appliances (without freon), yard waste, renovation debris, roofing shingles, and construction materials are accepted. Prohibited items include hazardous waste, paint, chemicals, tires, batteries, and electronics in some areas." },
          { question: "Do you offer same-day delivery?", answer: "Yes! We offer same-day or next-day delivery in most service areas. Call before noon for best availability on same-day orders." },
          { question: "Will a dumpster damage my driveway?", answer: "We place wooden boards under the dumpster wheels to protect your driveway surface. Most driveways handle dumpsters without any issues. Let us know if you have concerns about your specific surface." },
        ]}
      />
    </>
  );
}
