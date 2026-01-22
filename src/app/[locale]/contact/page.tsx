import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, Clock } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Contact Us | Dumpster Champs",
  description:
    "Contact Dumpster Champs for a free quote. Call us at (888) 860-0710 or fill out our contact form for fast, affordable dumpster rental.",
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";
  const email = "contact@dumpsterchamps.com";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            Ready to rent a dumpster? Get in touch with our team for a free
            quote and fast service.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Phone</h3>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-primary-600 hover:underline text-lg"
                    >
                      {phone}
                    </a>
                    <p className="text-sm text-secondary-500">
                      Call for immediate assistance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {email}
                    </a>
                    <p className="text-sm text-secondary-500">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Hours</h3>
                    <p className="text-secondary-700">Monday - Friday: 7am - 6pm</p>
                    <p className="text-secondary-700">Saturday: 8am - 4pm</p>
                    <p className="text-secondary-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-secondary-600 text-sm mb-4">
                  For urgent requests or same-day delivery inquiries, please
                  call us directly.
                </p>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                  Request a Free Quote
                </h2>
                <p className="text-secondary-600 mb-6">
                  Fill out the form below and we&apos;ll get back to you with a
                  quote for your dumpster rental.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
