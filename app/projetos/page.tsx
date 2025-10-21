"use client";

import { useState } from "react";

type Projeto = {
    id: string;
    nome: string;
    cliente: string;
    status: "Briefing" | "Planejamento" | "Produção" | "Aprovação" | "Entregue";
    prazo: string;
};

const MOCK: Projeto[] = [
    { id: "P-001", nome: "Identidade Visual - Studio Wave", cliente: "Studio Wave", status: "Produção", prazo: "15/11" },
    { id: "P-002", nome: "Campanha Novembro", cliente: "Silva & Associados", status: "Aprovação", prazo: "12/11" },
    { id: "P-003", nome: "Website Landing", cliente: "Agência Cria+", status: "Planejamento", prazo: "30/11" },
];

export default function ProjetosPage() {
    const [busca, setBusca] = useState("");

    const data = MOCK.filter((p) =>
        [p.id, p.nome, p.cliente, p.status].join(" ").toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto pt-2 pb-20">
            {/* Headline */}
            <section className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent animate-gradient-x">
                    Projetos
                </h1>
                <p className="text-sm text-gray-400 mt-2">Gerencie o ciclo completo: K1 (Briefing) → K2 (Planejamento) → Produção → Aprovação → Entregas.</p>
            </section>

            {/* Barra de ações */}
            <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar por nome, cliente ou status…"
                    className="input flex-1"
                />
                <a
                    href="/projetos/novo"
                    className="btn-amber grid place-items-center text-center px-4 h-11 rounded-xl"
                >
                    Novo projeto
                </a>
            </div>

            {/* Tabela */}
            <div className="glass-card border border-amber-200/10 overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-4">Projeto</div>
                    <div className="col-span-3">Cliente</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Prazo</div>
                </div>
                <div className="divide-y divide-white/10">
                    {data.map((p) => (
                        <a
                            key={p.id}
                            href={`/projetos/${p.id}`}
                            className="grid grid-cols-12 px-4 py-4 hover:bg-white/5 transition"
                        >
                            <div className="col-span-2 text-amber-200">{p.id}</div>
                            <div className="col-span-4">{p.nome}</div>
                            <div className="col-span-3 text-gray-300">{p.cliente}</div>
                            <div className="col-span-2">
                                <span className="badge-demo">{p.status}</span>
                            </div>
                            <div className="col-span-1 text-right">{p.prazo}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
