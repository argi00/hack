import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/programmes", label: "Programmes" },
    { href: "/projets", label: "Projets incubés" },
    { href: "/success-stories", label: "Success Stories" },
  ],
  services: [
    { href: "/jeu-educatif", label: "Jeu Éducatif" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/#comment-ca-marche", label: "Incubation" },
    { href: "/ressources", label: "Ressources" },
    { href: "/mentoring", label: "Mentoring" },
  ],
  ressources: [
    { href: "/ressources#guides", label: "Guides pratiques" },
    { href: "/ressources#templates", label: "Templates" },
    { href: "/ressources#webinaires", label: "Webinaires" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
  ],
};

const socialLinks = [
  { href: "#", label: "Facebook", icon: "f" },
  { href: "#", label: "X (Twitter)", icon: "𝕏" },
  { href: "#", label: "LinkedIn", icon: "in" },
  { href: "#", label: "Instagram", icon: "📷" },
];

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="container-custom py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Colonne 1 - Logo & Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo-ism.png"
                alt="Groupe ISM"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-lg font-bold text-white">
                INCUBATEUR
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-[#CCCCCC]">
              L&apos;incubateur du{" "}
              <a
                href="https://www.groupeism.sn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6600] hover:underline"
              >
                Groupe ISM
              </a>{" "}
              accompagne les porteurs de projets innovants de l&apos;idéation
              jusqu&apos;au lancement.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-[#FF6600]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FF6600]">
              NAVIGATION
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#CCCCCC] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FF6600]">
              SERVICES
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#CCCCCC] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Ressources */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FF6600]">
              RESSOURCES
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#CCCCCC] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 5 - Contact */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FF6600]">
              CONTACT
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#CCCCCC]">
              <li>📍 Dakar, Sénégal</li>
              <li>
                <a
                  href="mailto:contact@ism-incubateur.sn"
                  className="hover:text-white"
                >
                  📧 contact@ism-incubateur.sn
                </a>
              </li>
              <li>📞 +221 33 XXX XX XX</li>
              <li>🕐 Lun-Ven 9h-18h</li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 sm:mt-16 border-t border-[#666666] pt-6 sm:pt-8">
          <p className="text-center text-sm text-[#999999]">
            © 2026 ISM Incubateur - Groupe ISM. Tous droits réservés.
          </p>
          <p className="mt-2 text-center text-xs text-[#999999]">
            Mentions légales • Politique de confidentialité • Conditions
            d&apos;utilisation
          </p>
        </div>
      </div>
    </footer>
  );
}
