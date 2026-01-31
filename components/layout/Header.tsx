"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Navigation simplifiée : 5 liens principaux pour une lecture rapide
const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/incubateur", label: "L'Incubateur" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#704214] shadow-lg">
      <div className="container-custom">
        <div className="flex h-[70px] md:h-[90px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-white px-4 py-2">
              <span className="font-display text-lg font-bold text-[#704214]">
                ISM
              </span>
              <span className="ml-1 block text-xs font-semibold text-[#FF6600]">
                INCUBATEUR
              </span>
            </div>
          </Link>

          {/* Desktop Nav - 5 liens max pour une navigation claire */}
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "border-b-2 border-[#FF6600] pb-1 text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA - 1 action principale visible */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/login"
              className="font-display text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Se connecter
            </Link>
            <Link
              href="/inscription"
              className="btn-primary rounded-full px-5 py-2.5 font-display text-sm"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#5C3317] lg:hidden"
          >
            <nav className="container-custom flex flex-col gap-4 py-6" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-base font-medium text-white hover:text-[#FF6600]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-white/20 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border-2 border-white py-3 text-center font-display font-semibold text-white"
                >
                  Se connecter
                </Link>
                <Link
                  href="/inscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary py-3 text-center font-display"
                >
                  S&apos;inscrire
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
