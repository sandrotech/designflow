"use client";

import { useState, useEffect } from "react";
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

  // se já estiver logado, vai direto pro dashboard
  useEffect(() => {
    const logged = localStorage.getItem("userLogged");
    if (logged === "true") router.push("/dashboard");
  }, [router]);

  const handleLogin = () => {
    setLoading(true);
    setErro("");

    setTimeout(() => {
      setLoading(false);
      if (email && senha) {
        localStorage.setItem("userLogged", "true");
        router.push("/dashboard");
      } else {
        setErro("Preencha todos os campos para continuar.");
      }
    }, 700);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <Card className="w-full bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
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

      <p className="text-xs text-gray-500 mt-6">
        Designer Workflow © {new Date().getFullYear()}
      </p>
    </div>
  );
}
