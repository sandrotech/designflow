"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Pencil, Trash2 } from "lucide-react";

export default function DemandasPage() {
    const router = useRouter();
    const [demandas, setDemandas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    async function fetchDemandas() {
        try {
            const res = await fetch("/api/demandas");
            const data = await res.json();
            setDemandas(data);
        } catch {
            setDemandas([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDemandas();
    }, []);

    const demandasFiltradas = demandas.filter((d) =>
        [d.id, d.cliente, d.formatos?.join(", "), d.status]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    async function handleDelete(id: string) {
        if (!confirm("Deseja realmente excluir esta demanda?")) return;
        await fetch(`/api/demandas/${id}`, { method: "DELETE" });
        fetchDemandas();
    }

    return (
        <div className="max-w-[1200px] mx-auto pt-10 pb-24 px-6 relative">
            {/* Cabeçalho */}
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
                    Demandas
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                    Acompanhe e gerencie as solicitações de design criadas pelos clientes.
                </p>
            </section>

            {/* Barra de ações */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar demanda..."
                    className="w-full sm:flex-1 h-11 rounded-lg px-4 text-sm text-gray-200 bg-white/5 border border-white/10 focus:outline-none focus:border-amber-300/30 placeholder:text-gray-500"
                />
                <Link
                    href="/demandas/nova"
                    className="w-full sm:w-auto px-6 h-11 grid place-items-center rounded-lg font-semibold text-black bg-amber-400 hover:bg-amber-300 transition"
                >
                    Nova demanda
                </Link>
            </div>

            {/* Tabela */}
            <div className="glass-card border border-amber-200/10 rounded-lg overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-12 px-4 py-3 text-[13px] uppercase tracking-wide text-gray-400 bg-white/5">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-3">Cliente</div>
                    <div className="col-span-3">Formatos</div>
                    <div className="col-span-2">Prazo</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Ações</div>
                </div>

                {loading ? (
                    <div className="p-6 text-center text-gray-400">Carregando...</div>
                ) : demandasFiltradas.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                        Nenhuma demanda encontrada.
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {demandasFiltradas.map((d) => (
                            <div
                                key={d.id}
                                className="grid grid-cols-12 px-4 py-4 hover:bg-white/5 transition"
                            >
                                <div className="col-span-2 text-amber-200 font-medium">{d.id}</div>
                                <div className="col-span-3 text-gray-100">{d.cliente}</div>
                                <div className="col-span-3 text-gray-300 truncate">
                                    {d.formatos?.join(", ")}
                                </div>
                                <div className="col-span-2 text-gray-400">
                                    {d.prazo
                                        ? new Date(d.prazo).toLocaleString("pt-BR")
                                        : "-"}
                                </div>
                                <div className="col-span-1 text-center">
                                    <span
                                        className={`px-2 py-0.5 rounded-md text-[12px] border ${d.status === "Concluída"
                                                ? "text-green-300 border-green-300/30 bg-green-300/10"
                                                : d.status === "Em andamento"
                                                    ? "text-amber-200 border-amber-400/30 bg-amber-400/10"
                                                    : "text-gray-400 border-white/10 bg-white/5"
                                            }`}
                                    >
                                        {d.status || "Pendente"}
                                    </span>
                                </div>

                                <div className="col-span-1 text-right flex justify-end items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/demandas/${d.id}/editar`)}
                                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-300/30 transition"
                                        title="Editar demanda"
                                    >
                                        <Pencil className="w-4 h-4 text-gray-300 hover:text-amber-300" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(d.id)}
                                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/30 transition"
                                        title="Excluir demanda"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
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
