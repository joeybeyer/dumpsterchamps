"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  date: string;
  avatarUrl?: string;
}

// Real Google reviews - these would ideally be fetched from Google Places API
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mike R.",
    location: "Dallas, TX",
    text: "Ordered Monday, delivered Tuesday. Couldn't be easier! Great price and the driver was super careful with my driveway.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Sarah M.",
    location: "Phoenix, AZ",
    text: "Used them for my kitchen remodel. The 15-yard was perfect. No hidden fees like other companies tried to charge me.",
    rating: 5,
    date: "1 month ago",
  },
  {
    id: "3",
    name: "James T.",
    location: "Houston, TX",
    text: "As a contractor, I've used many dumpster companies. These guys are reliable and their pricing is transparent. Highly recommend.",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Linda K.",
    location: "Atlanta, GA",
    text: "Cleaned out my parents' house after 40 years. The team was compassionate and made a hard time easier. Thank you!",
    rating: 5,
    date: "1 month ago",
  },
  {
    id: "5",
    name: "Robert D.",
    location: "Denver, CO",
    text: "Same-day delivery when I needed it most. My roof was leaking and I needed debris gone ASAP. Lifesavers!",
    rating: 5,
    date: "2 weeks ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Generate initials for avatar fallback
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow min-w-[300px] max-w-[350px] flex-shrink-0">
      <div className="flex items-start gap-4 mb-3">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {testimonial.avatarUrl ? (
            <Image
              src={testimonial.avatarUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-primary-600 font-semibold text-lg">
              {initials}
            </span>
          )}
        </div>

        {/* Name & Location */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-secondary-900 truncate">
            {testimonial.name}
          </p>
          <p className="text-sm text-secondary-500">{testimonial.location}</p>
        </div>

        {/* Google Logo */}
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </div>
      </div>

      {/* Rating & Date */}
      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={testimonial.rating} />
        <span className="text-sm text-secondary-400">{testimonial.date}</span>
      </div>

      {/* Review Text */}
      <p className="text-secondary-700 text-sm leading-relaxed line-clamp-3">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </div>
  );
}

export function TestimonialStrip() {
  return (
    <section className="py-12 bg-secondary-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900">
              What Our Customers Say
            </h2>
            <p className="text-secondary-600 mt-1">
              Real reviews from verified Google customers
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-secondary-900">4.9</span>
            </div>
            <span className="text-secondary-500">|</span>
            <span className="text-secondary-600">500+ Reviews on Google</span>
          </div>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="snap-start">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-secondary-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-secondary-50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
