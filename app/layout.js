import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"]
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"]
});

export const metadata = {
  title: "Marketplace Reverso Imobiliario",
  description: "MVP para locacao com leads qualificados, propostas expiram em 72h e score para corretores."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
