"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const handleLogin = () => {
        setLoading(true);
        setErro("");

        setTimeout(() => {
            setLoading(false);
            if (email && senha) {
                // Simula login → leva para dashboard
                router.push("/dashboard");
            } else {
                setErro("Preencha todos os campos para continuar.");
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Efeito visual de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20 blur-3xl"></div>

            <Card className="relative z-10 w-[380px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-white">
                        Bem-vindo 👋
                    </CardTitle>
                    <p className="text-center text-sm text-gray-400">Acesse sua conta</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-gray-300">E-mail</Label>
                        <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-glass"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Senha</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="input-glass"
                        />
                    </div>

                    {erro && <p className="text-red-400 text-sm">{erro}</p>}

                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="button-glow w-full mt-2"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </CardContent>

                <CardFooter className="flex flex-col items-center text-sm text-gray-400">
                    <p>
                        Não tem conta?{" "}
                        <Link
                            href="/register"
                            className="text-blue-400 hover:underline transition"
                        >
                            Criar conta
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
