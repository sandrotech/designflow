"use client";

import Link from "next/link";
import {
    Users,
    FolderKanban,
    ClipboardList,
    FileText,
    CalendarDays,
    Clock,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/** Tipos básicos */
type Cliente = { id?: string | number; nome: string; email?: string };
type Demanda = {
    id: string | number;
    cliente: string;
    titulo: string;
    status: string;               // Pendente | Em produção | Aguardando aprovação | Concluída | Aprovada
    responsavel?: string;
    prazo?: string;               // 'YYYY-MM-DD' ou ISO
};

export default function DashboardPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [demandas, setDemandas] = useState<Demanda[]>([]);
    const [loadingClientes, setLoadingClientes] = useState(true);
    const [loadingDemandas, setLoadingDemandas] = useState(true);
    const [tarefasCount, setTarefasCount] = useState<number>(8); // fallback

    // Carregar clientes
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/clientes", { cache: "no-store" });
                if (res.ok) setClientes(await res.json());
            } catch (e) {
                console.error("Erro clientes:", e);
            } finally {
                setLoadingClientes(false);
            }
        })();
    }, []);

    // Carregar demandas
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/demandas", { cache: "no-store" });
                if (res.ok) setDemandas(await res.json());
            } catch (e) {
                console.error("Erro demandas:", e);
            } finally {
                setLoadingDemandas(false);
            }
        })();
    }, []);

    // (Opcional) tentar buscar tarefas se existir endpoint
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/tarefas", { cache: "no-store" });
                if (res.ok) {
                    const arr = await res.json();
                    if (Array.isArray(arr)) setTarefasCount(arr.length);
                }
            } catch {
                /* mantém fallback */
            }
        })();
    }, []);

    // Helpers
    const fmt = (d?: string) =>
        d ? new Date(d).toLocaleDateString("pt-BR") : "—";

    const isDone = (s: string) => s === "Concluída" || s === "Aprovada";

    // Métricas
    const pendentesCount = useMemo(
        () => demandas.filter((d) => !isDone(d.status)).length,
        [demandas]
    );
    const clientesCount = clientes.length;

    // Próximos prazos (próximos 8, ordenados)
    const proximosPrazos = useMemo(() => {
        const today = new Date();
        const valid = demandas
            .map((d) => ({
                ...d,
                prazoDate: d.prazo ? new Date(d.prazo) : null,
            }))
            .filter((d) => d.prazoDate && !isNaN(d.prazoDate!.getTime()))
            .sort((a, b) => (a.prazoDate!.getTime() - b.prazoDate!.getTime()))
            .filter((d) => d.prazoDate! >= new Date(today.toDateString())) // a partir de hoje
            .slice(0, 8);

        return valid;
    }, [demandas]);

    const metricas = [
        { label: "Demandas pendentes", value: pendentesCount, icon: FolderKanban, link: "/demandas" },
        { label: "Tarefas em andamento", value: tarefasCount, icon: ClipboardList, link: "/tarefas" },
        { label: "Clientes cadastrados", value: clientesCount, icon: Users, link: "/clientes" },
        { label: "Projetos finalizados", value: 5, icon: FileText, link: "/projetos" }, // ajuste depois se tiver API
    ];

    const chipClass = (status: string) =>
        `px-2 py-0.5 rounded-md border text-xs ${isDone(status)
            ? "border-green-400/30 text-green-300 bg-green-300/10"
            : status === "Em produção"
                ? "border-yellow-400/30 text-yellow-300 bg-yellow-300/10"
                : status === "Aguardando aprovação"
                    ? "border-blue-400/30 text-blue-300 bg-blue-300/10"
                    : "border-red-400/30 text-red-300 bg-red-300/10"
        }`;

    return (
        <div className="text-gray-100">
            {/* Header */}
            <section className="border-b border-amber-400/10 bg-amber-400/5/50 backdrop-blur-sm">
                <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.35)]">
                        Overview de Demandas
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">
                        Visão geral dos jobs, clientes e prazos.
                    </p>
                </div>
            </section>

            {/* Conteúdo */}
            <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-8 space-y-8">
                {/* Métricas (cards clicáveis) */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 min-w-0">
                    {metricas.map(({ label, value, icon: Icon, link }) => (
                        <Link
                            key={label}
                            href={link}
                            className="group min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-5 hover:border-amber-300/30 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-gray-400 truncate group-hover:text-amber-200 transition">
                                    {label}
                                </p>
                                <Icon className="w-5 h-5 shrink-0 text-amber-300/70 group-hover:text-amber-300 transition" />
                            </div>
                            <p className="mt-2 text-3xl font-bold text-amber-300 group-hover:text-amber-200 transition">
                                {value}
                            </p>
                        </Link>
                    ))}
                </section>

                {/* Agenda (sem calendário) + Clientes */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
                    {/* Agenda de prazos (lista) */}
                    <article className="lg:col-span-8 min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6">
                        <header className="flex items-center justify-between mb-4">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-300">
                                <CalendarDays className="w-5 h-5" />
                                Agenda de Prazos (próximos)
                            </h2>
                            <Link
                                href="/demandas"
                                className="text-xs sm:text-sm text-amber-300 hover:underline"
                            >
                                Ver todas →
                            </Link>
                        </header>

                        {/* Loading/Empty */}
                        {loadingDemandas ? (
                            <div className="h-[220px] grid place-items-center text-gray-400 text-sm">
                                Carregando prazos...
                            </div>
                        ) : proximosPrazos.length === 0 ? (
                            <div className="h-[220px] grid place-items-center text-gray-400 text-sm">
                                Nenhum prazo próximo encontrado.
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                {proximosPrazos.map((d) => (
                                    <li
                                        key={String(d.id)}
                                        className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-100 truncate">
                                                    {d.titulo}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {d.cliente} {d.responsavel ? `• ${d.responsavel}` : ""}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className={chipClass(d.status)}>{d.status}</span>
                                                <span className="inline-flex items-center gap-1 text-xs text-gray-300">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {fmt(d.prazo)}
                                                </span>
                                                <Link
                                                    href="/demandas"
                                                    className="text-xs text-amber-300 hover:underline"
                                                >
                                                    Abrir
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>

                    {/* Clientes (dinâmico) */}
                    <aside className="lg:col-span-4 min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6 flex flex-col">
                        <h3 className="text-base font-semibold text-amber-300 mb-4">
                            Clientes
                        </h3>

                        <div className="flex-1 overflow-y-auto">
                            {loadingClientes ? (
                                <p className="text-sm text-gray-400 text-center mt-10">
                                    Carregando clientes...
                                </p>
                            ) : clientes.length === 0 ? (
                                <div className="grid place-items-center text-center h-full">
                                    <p className="text-sm text-gray-400 max-w-[28ch] leading-relaxed">
                                        Nenhum cliente adicionado ainda.
                                    </p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {clientes.map((c) => (
                                        <li
                                            key={String(c.id ?? c.nome)}
                                            className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-between"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-100 truncate">
                                                    {c.nome}
                                                </p>
                                                {c.email && (
                                                    <p className="text-xs text-gray-400 truncate">
                                                        {c.email}
                                                    </p>
                                                )}
                                            </div>
                                            <Link
                                                href={`/clientes/${c.id ?? ""}`}
                                                className="text-xs text-amber-300 hover:underline"
                                            >
                                                Ver →
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Link
                            href="/clientes/novo"
                            className="mt-6 inline-flex items-center justify-center w-full h-10 rounded-lg border border-amber-300/40 bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 transition"
                        >
                            + Adicionar Cliente
                        </Link>
                    </aside>
                </section>

                {/* Demandas recentes (mock / pode ligar à API se quiser) */}
                <section className="min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6">
                    <header className="flex items-center justify-between gap-3 mb-4">
                        <h2 className="text-lg font-semibold text-amber-300">Demandas recentes</h2>
                        <div className="flex gap-2">
                            <Link
                                href="/demandas/nova"
                                className="h-9 px-3 rounded-md border border-amber-300/40 bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 transition text-sm grid place-items-center"
                            >
                                + Nova
                            </Link>
                            <Link
                                href="/demandas"
                                className="h-9 px-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm grid place-items-center text-gray-300"
                            >
                                Ver todas →
                            </Link>
                        </div>
                    </header>

                    <div className="divide-y divide-white/10">
                        {(demandas.slice(0, 3) as Demanda[]).map((d) => (
                            <div
                                key={String(d.id)}
                                className="py-3 px-2 rounded-md hover:bg-white/5 transition"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-100 truncate">
                                            {d.titulo}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {d.cliente}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs sm:text-sm shrink-0">
                                        <span className={chipClass(d.status)}>{d.status}</span>
                                        <span className="text-gray-400">{fmt(d.prazo)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {demandas.length === 0 && (
                            <div className="py-6 text-sm text-gray-400 text-center">
                                Sem demandas cadastradas ainda.
                            </div>
                        )}
                    </div>
                </section>

                <div className="h-2 xl:h-6" />
            </div>
        </div>
    );
}
