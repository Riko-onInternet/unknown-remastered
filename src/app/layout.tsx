import type { Metadata } from "next";
import "./globals.css";

// ----- Providers -----
import { HeroUI } from "@/providers/HeroUI";

export const metadata: Metadata = {
  title: "unKnown",
  description: `Il nostro motto è: "Facciamo scoprire lo sconosciuto"`,
  manifest: "/manifest.json",
  robots: "noindex, nofollow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className="relative min-h-dvh">
          <HeroUI>{children}</HeroUI>
      </body>
    </html>
  );
}
