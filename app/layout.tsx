"use client";

import "./globals.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import NeoDock from "@/components/nav/NeoDock";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/";

  // Proteção simples de rota (visual)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const logged = localStorage.getItem("userLogged");
    if (logged !== "true" && pathname !== "/") router.replace("/");
  }, [pathname, router]);

  return (
    <html lang="pt-BR">
      <body className="bg-amber-neo min-h-dvh text-gray-100 relative font-sans overflow-x-hidden">
        {/* Camadas de fundo */}
        <div className="aurora" />
        <div className="grid-overlay" />
        <div className="vignette" />

        {isLogin ? (
          /* LOGIN */
          <main className="min-h-dvh flex items-center justify-center px-6">
            {children}
          </main>
        ) : (
          <>
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border-b border-white/5">
              <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-4 flex items-center justify-between">
                {/* LOGO */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-amber-400/30 to-yellow-600/10
                    border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.1)]
                    group-hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] transition"
                  >
                    <Image src="/logo.png" alt="Logo" width={28} height={28} className="opacity-90 group-hover:opacity-100 transition" />
                  </span>
                  <span className="text-sm text-amber-200/80 group-hover:text-amber-200 hidden sm:block transition">
                    DesignFlow
                  </span>
                </button>

                {/* SAIR */}
                <button
                  onClick={() => { localStorage.removeItem("userLogged"); router.replace("/"); }}
                  className="text-xs md:text-sm text-amber-300 hover:text-amber-200 transition"
                >
                  sair
                </button>
              </div>
            </header>

            {/* CONTEÚDO */}
            <main className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 pt-[88px] pb-16 min-w-0">
              {children}
            </main>

            {/* DOCK LATERAL */}
            <NeoDock />
          </>
        )}
      </body>
    </html>
  );
}
