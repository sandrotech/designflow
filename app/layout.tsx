"use client";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-amber-neo min-h-screen">
        {/* camadas visuais */}
        <div className="aurora" />
        <div className="grid-overlay" />
        <div className="vignette" />
        {children}
      </body>
    </html>
  );
}
