"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

const baseNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contact", label: "Contact" },
];

function getNavLinks(user: { id: string } | null) {
  if (!user) return baseNavLinks;
  return [
    baseNavLinks[0],
    { href: "/mes-projets", label: "Mes projets" },
    ...baseNavLinks.slice(1),
  ];
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    if (pathname !== "/") router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#704214] shadow-lg">
      <div className="container-custom">
        <div className="flex h-[70px] md:h-[90px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 sm:px-4 sm:py-2">
              <Image
                src="/logo-ism.png"
                alt="Groupe ISM"
                width={36}
                height={36}
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                priority
              />
              <span className="font-display text-[10px] sm:text-xs font-semibold text-[#FF6600]">
                INCUBATEUR
              </span>
            </div>
          </Link>

          {/* Desktop Nav — Accueil, Mes projets (si connecté), Hackathons, Ressources, Contact */}
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Navigation principale">
            {getNavLinks(user).map((link) => (
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

          {/* CTA - connecté ou non */}
          <div className="hidden items-center gap-4 lg:flex">
            {user ? (
              <>
                <span className="font-display text-sm text-white/90">
                  Bonjour, {user.firstName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="font-display text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
              {getNavLinks(user).map((link) => (
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
                {user ? (
                  <>
                    <span className="py-2 text-center font-display text-white">
                      Bonjour, {user.firstName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="rounded-full border-2 border-white py-3 font-display font-semibold text-white"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
