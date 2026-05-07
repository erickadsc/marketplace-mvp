import "./globals.css";

export const metadata = {
  title: "Marketplace Reverso Imobiliario",
  description: "MVP para locacao com leads qualificados, propostas expiram em 72h e score para corretores."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
