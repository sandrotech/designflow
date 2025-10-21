"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Pencil } from "lucide-react";

export default function ClientesPage() {
    const router = useRouter();
    const [clientes, setClientes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchClientes() {
            try {
                const res = await fetch("/api/clientes");
                const data = await res.json();
                setClientes(data);
            } catch {
                setClientes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchClientes();
    }, []);

    // 🔍 Filtro simples
    const clientesFiltrados = clientes.filter((c) => {
        const termo = search.toLowerCase();
        return (
            c.nome?.toLowerCase().includes(termo) ||
            c.empresa?.toLowerCase().includes(termo) ||
            c.email?.toLowerCase().includes(termo)
        );
    });

    return (
        <div className="max-w-[1200px] mx-auto pt-10 pb-24 px-6 relative">
            {/* Cabeçalho simples */}
            <header className="flex items-center justify-end mb-12">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 hover:border-amber-300/30 bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Voltar ao Dashboard
                </button>
            </header>

            {/* Título */}
            <section className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-amber-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                    Clientes
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                    Gerencie seus clientes, contratos e contatos comerciais.
                </p>
            </section>

            {/* Barra de ações */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar cliente..."
                    className="w-full sm:flex-1 h-11 rounded-lg px-4 text-sm text-gray-200 bg-white/5 border border-white/10 focus:outline-none focus:border-amber-300/30 placeholder:text-gray-500"
                />
                <Link
                    href="/clientes/novo"
                    className="w-full sm:w-auto px-6 h-11 grid place-items-center rounded-lg font-semibold text-black bg-amber-400 hover:bg-amber-300 transition"
                >
                    Novo cliente
                </Link>
            </div>

            {/* Tabela */}
            <div className="glass-card border border-amber-200/10 rounded-lg overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-12 px-4 py-3 text-[13px] uppercase tracking-wide text-gray-400 bg-white/5">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-3">Empresa</div>
                    <div className="col-span-3">E-mail</div>
                    <div className="col-span-1 text-right">Ações</div>
                </div>

                {loading ? (
                    <div className="p-6 text-center text-gray-400">Carregando...</div>
                ) : clientesFiltrados.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                        Nenhum cliente encontrado.
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {clientesFiltrados.map((c) => (
                            <div
                                key={c.id}
                                className="grid grid-cols-12 px-4 py-4 hover:bg-white/5 transition"
                            >
                                <div className="col-span-2 text-amber-200 font-medium">
                                    {c.id}
                                </div>

                                {/* 🔹 Nome clicável para editar */}
                                <div
                                    className="col-span-3 text-gray-100 cursor-pointer hover:text-amber-300 transition"
                                    onClick={() => router.push(`/clientes/${c.id}/editar`)}
                                    title="Editar cliente"
                                >
                                    {c.nome}
                                </div>

                                <div className="col-span-3 text-gray-300">{c.empresa}</div>
                                <div className="col-span-3 text-gray-400 truncate">
                                    {c.email}
                                </div>

                                <div className="col-span-1 text-right flex justify-end items-center gap-2">
                                    {/* Status visual */}
                                    <span
                                        className={`px-2 py-0.5 rounded-md text-[12px] border ${c.status === "Ativo"
                                                ? "text-amber-200 border-amber-400/30 bg-amber-400/10"
                                                : "text-gray-400 border-white/10 bg-white/5"
                                            }`}
                                    >
                                        {c.status}
                                    </span>

                                    {/* ✏️ Botão Editar */}
                                    <button
                                        onClick={() => router.push(`/clientes/${c.id}/editar`)}
                                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-300/30 transition"
                                        title="Editar cliente"
                                    >
                                        <Pencil className="w-4 h-4 text-gray-300 hover:text-amber-300" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
