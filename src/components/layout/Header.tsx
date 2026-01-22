"use client";

import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations();

  const navigation = [
    { name: t("navigation.home"), href: "/" },
    {
      name: t("navigation.services"),
      href: "/services",
      children: [
        { name: t("services.rollOff"), href: "/roll-off-dumpster-rental" },
        { name: t("services.construction"), href: "/construction-dumpster-rental" },
        { name: t("services.residential"), href: "/residential-dumpster-rental" },
      ],
    },
    {
      name: t("navigation.dumpsterSizes"),
      href: "/dumpster-sizes",
      children: [
        { name: t("sizes.10yard"), href: "/10-yard-dumpster" },
        { name: t("sizes.15yard"), href: "/15-yard-dumpster" },
        { name: t("sizes.20yard"), href: "/20-yard-dumpster" },
        { name: t("sizes.30yard"), href: "/30-yard-dumpster" },
        { name: t("sizes.40yard"), href: "/40-yard-dumpster" },
      ],
    },
    { name: t("navigation.calculator"), href: "/calculator" },
    { name: t("navigation.locations"), href: "/locations" },
    { name: t("navigation.blog"), href: "/blog" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.contact"), href: "/contact" },
  ];

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline text-sm">{t("common.tagline")}</span>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 hover:text-primary-100 transition-colors font-bold text-base lg:text-lg whitespace-nowrap"
          >
            <Phone className="h-5 w-5" />
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

          {/* Right side: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap text-sm"
            >
              {t("navigation.getQuote")}
            </Link>
          </div>

          {/* Mobile: Language switcher + menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 text-secondary-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
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
              {t("navigation.getQuote")}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
