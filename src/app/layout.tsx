import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import ScrollSuave from "@/components/dilnic/ScrollSuave";
import "./globals.css";

const sans = Schibsted_Grotesk({ variable: "--fuente-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--fuente-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const mono = IBM_Plex_Mono({ variable: "--fuente-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Odontólogo en Puente Aranda y Engativá | Dental Ser · Bogotá",
  description:
    "Odontología general, odontopediatría, ortodoncia, implantes, estética dental y endodoncia en Bogotá. Sedes en Puente Aranda (Calle 11 #60-30) y Engativá (CC Nuestro). Agenda tu cita por WhatsApp.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}>
      <body>
        <ScrollSuave>{children}</ScrollSuave>
      </body>
    </html>
  );
}
