"use client";

import "@/app/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className="min-h-screen w-full flex items-center justify-center bg-black text-gray-100 font-sans relative overflow-hidden">
                {/* Fundo com gradientes suaves e motion blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(0,212,255,0.15),_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(183,148,246,0.15),_transparent_60%)]" />
                <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full -top-40 -left-40 animate-pulse" />
                <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full -bottom-40 -right-40 animate-pulse" />

                <main className="relative z-10 w-full flex items-center justify-center p-6">
                    {children}
                </main>
            </body>
        </html>
    );
}
