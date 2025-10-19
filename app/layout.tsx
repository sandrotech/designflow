"use client";

import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import NeoDock from "@/components/nav/NeoDock";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/";

  // Proteção visual de login
  useEffect(() => {
    if (typeof window === "undefined") return;
    const logged = localStorage.getItem("userLogged");
    if (logged !== "true" && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <html lang="pt-BR">
      <body className="bg-amber-neo min-h-screen text-gray-100 relative font-sans overflow-hidden">
        {/* Fundo animado */}
        <div className="aurora" />
        <div className="grid-overlay" />
        <div className="vignette" />

        {/* LOGIN — sem nada mais */}
        {isLogin ? (
          <main className="min-h-screen flex items-center justify-center px-6">
            {children}
          </main>
        ) : (
          <>
            {/* Cabeçalho minimalista, fixo e translúcido */}
            <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border-b border-white/5">
              <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
                  <h1 className="text-sm md:text-base font-semibold tracking-wide text-gray-200">
                    Designer Workflow
                  </h1>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("userLogged");
                    router.replace("/");
                  }}
                  className="text-xs md:text-sm text-amber-300 hover:text-amber-200 transition"
                >
                  sair
                </button>
              </div>
            </header>

            {/* Conteúdo principal com recuo para o menu lateral */}
            <div className="pt-24 pr-[90px] pb-16 px-10 lg:px-20 transition-all">
              {children}
            </div>

            {/* Menu lateral flutuante futurista */}
            <NeoDock />
          </>
        )}
      </body>
    </html>
  );
}
