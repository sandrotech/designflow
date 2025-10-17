"use client";

import { useRef, useState } from "react";

export default function Login() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("admin");
  const [senha, setSenha] = useState("admin");
  const [erro, setErro] = useState("");

  // Tilt 3D leve no card
  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 -> w
    const y = e.clientY - rect.top;  // 0 -> h
    const rx = ((y / rect.height) - 0.5) * -6; // rotação X
    const ry = ((x / rect.width) - 0.5) * 6; // rotação Y
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const resetTilt = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }
    // apenas visual
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <section
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="neo-card w-[min(520px,94vw)] p-8 transition-transform duration-150 will-change-transform"
        style={{ perspective: "1200px" } as any}
      >
        {/* LOGO HERO */}
        <div className="logo-hero mb-6">
          <div className="ring-holo" />
          <div className="ring-dash" />
          <div className="scan" />
          <div className="core">
            <img src="/logo.png" alt="Logo da empresa" draggable={false} />
          </div>
        </div>

        {/* Título */}
        <header className="text-center mb-6">
          <h1 className="h1-grad text-3xl font-extrabold">Bem-vindo</h1>
          <p className="text-muted text-sm mt-1">Acesse sua conta</p>
        </header>

        {/* Credenciais de teste */}
        <div className="text-center text-xs mb-5">
          <span className="badge-demo">Usuário: <b>admin</b></span>
          <span className="mx-2 opacity-40">•</span>
          <span className="badge-demo">Senha: <b>admin</b></span>
        </div>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm">E-mail</label>
            <input
              className="input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Senha</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="text-sm text-red-400">{erro}</p>}

          <button type="submit" className="btn-amber">Entrar</button>
        </form>

        {/* Rodapé */}
        <p className="text-center text-xs text-muted mt-6">
          © {new Date().getFullYear()} Designer Workflow
        </p>
      </section>
    </main>
  );
}
