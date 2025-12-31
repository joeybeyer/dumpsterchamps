"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Roll Off Dumpster Rental", href: "/roll-off-dumpster-rental" },
      { name: "Construction Dumpsters", href: "/construction-dumpsters" },
      { name: "Residential Dumpsters", href: "/residential-dumpsters" },
    ],
  },
  {
    name: "Dumpster Sizes",
    href: "/dumpster-sizes",
    children: [
      { name: "10 Yard Dumpster", href: "/10-yard-dumpster" },
      { name: "15 Yard Dumpster", href: "/15-yard-dumpster" },
      { name: "20 Yard Dumpster", href: "/20-yard-dumpster" },
      { name: "30 Yard Dumpster", href: "/30-yard-dumpster" },
      { name: "40 Yard Dumpster", href: "/40-yard-dumpster" },
    ],
  },
  { name: "Calculator", href: "/calculator" },
  { name: "Locations", href: "/locations" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>Affordable Dumpster Rentals Nationwide</span>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 hover:text-primary-100 transition-colors font-semibold"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">
              Dumpster<span className="text-secondary-800">Champs</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors flex items-center gap-1",
                    item.children && "cursor-pointer"
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 mt-0">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap text-sm"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-secondary-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-secondary-700 hover:text-primary-600 font-medium"
                  onClick={() => !item.children && setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 border-l-2 border-primary-100 ml-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-2 text-sm text-secondary-600 hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="block mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Free Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
