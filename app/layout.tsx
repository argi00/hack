import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ISM Incubateur | Transformez votre idée en entreprise innovante",
  description: "L'incubateur du Groupe ISM accompagne les porteurs de projets innovants de l'idéation jusqu'au lancement. Jeu éducatif, hackathons et mentoring.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
