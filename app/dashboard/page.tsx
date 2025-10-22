"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  FolderKanban,
  ClipboardList,
  FileText,
} from "lucide-react";

/**
 * Dashboard responsivo e minimalista (modelo Aprova Aí + visual DesignFlow)
 * - Container fixo (max 1200px) + xl:pr-28 (reserva do Dock)
 * - Grids com min-w-0 e overflow-x-hidden no layout => sem quebra
 * - Hierarquia clara: header, métricas, agenda+clientes, demandas recentes
 */
type Cliente = { id?: string | number; nome: string; email?: string };

export default function DashboardPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clientes", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setClientes(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Erro ao carregar clientes:", e);
      } finally {
        setLoadingClientes(false);
      }
    })();
  }, []);

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
          {[
            {
              label: "Demandas pendentes",
              value: 4,
              icon: FolderKanban,
              href: "/demandas?status=pendente",
            },
            {
              label: "Tarefas em andamento",
              value: 8,
              icon: ClipboardList,
              href: "/tarefas?status=andamento",
            },
            {
              label: "Clientes cadastrados",
              value: clientes.length,
              icon: Users,
              href: "/clientes",
            },
            {
              label: "Projetos finalizados",
              value: 5,
              icon: FileText,
              href: "/projetos?status=finalizado",
            },
          ].map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              aria-label={`Ir para ${label}`}
              className="group block min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-5 hover:border-amber-300/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-400 truncate">{label}</p>
                <Icon className="w-5 h-5 shrink-0 text-amber-300/70 group-hover:text-amber-300 transition-colors" />
              </div>
              <p className="mt-2 text-3xl font-bold text-amber-300">{value}</p>
            </Link>
          ))}
        </section>

        {/* Agenda + Clientes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
          {/* Calendário (placeholder) */}
          <article className="lg:col-span-8 min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6">
            <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-300">
                <CalendarDays className="w-5 h-5" /> Agenda de Prazos
              </h2>
              <div className="flex gap-2">
                {["Mês", "Semana"].map((v) => (
                  <button
                    key={v}
                    className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 supports-[hover:hover]:hover:bg-white/10 text-xs sm:text-sm text-gray-300 transition"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </header>
            <div className="h-[380px] sm:h-[460px] lg:h-[520px] grid place-items-center rounded-xl border border-white/10 bg-zinc-950/60">
              <p className="text-gray-500 text-sm">📅 O calendário de demandas será exibido aqui</p>
            </div>
          </article>

          {/* Clientes – DINÂMICO */}
          <aside className="lg:col-span-4 min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6 flex flex-col">
            <h3 className="text-base font-semibold text-amber-300 mb-4">Clientes</h3>

            <div className="flex-1 overflow-y-auto">
              {loadingClientes ? (
                <p className="text-sm text-gray-400 text-center mt-10">Carregando clientes...</p>
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
                        <p className="text-sm font-medium text-gray-100 truncate">{c.nome}</p>
                        {c.email && <p className="text-xs text-gray-400 truncate">{c.email}</p>}
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
              className="mt-6 inline-flex items-center justify-center w-full h-10 rounded-lg border border-amber-300/40 bg-amber-400/20 text-amber-200 supports-[hover:hover]:hover:bg-amber-400/30 transition"
            >
              + Adicionar Cliente
            </Link>
          </aside>
        </section>

        {/* Demandas recentes */}
        <section className="min-w-0 rounded-2xl border border-amber-300/10 bg-white/5 backdrop-blur-md p-6">
          <header className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-amber-300">Demandas recentes</h2>
            <div className="flex gap-2">
              <Link
                href="/demandas/nova"
                className="h-9 px-3 rounded-md border border-amber-300/40 bg-amber-400/20 text-amber-200 supports-[hover:hover]:hover:bg-amber-400/30 transition text-sm grid place-items-center"
              >
                + Nova
              </Link>
              <Link
                href="/demandas"
                className="h-9 px-3 rounded-md border border-white/10 bg-white/5 supports-[hover:hover]:hover:bg-white/10 transition text-sm grid place-items-center text-gray-300"
              >
                Ver todas →
              </Link>
            </div>
          </header>

          <div className="divide-y divide-white/10">
            {[
              { id: "D-001", cliente: "Agência Cria+", status: "Em produção", prazo: "2025-10-28" },
              { id: "D-002", cliente: "Silva & Associados", status: "Pendente", prazo: "2025-10-30" },
              { id: "D-003", cliente: "Studio Wave", status: "Concluída", prazo: "2025-10-15" },
            ].map((d) => (
              <div
                key={d.id}
                className="py-3 px-2 rounded-md supports-[hover:hover]:hover:bg-white/5 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-100 truncate">{d.id}</p>
                    <p className="text-xs text-gray-400 truncate">{d.cliente}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-md border ${
                        d.status === "Concluída"
                          ? "border-green-400/30 text-green-300 bg-green-300/10"
                          : d.status === "Pendente"
                          ? "border-yellow-400/30 text-yellow-300 bg-yellow-300/10"
                          : "border-blue-400/30 text-blue-300 bg-blue-300/10"
                      }`}
                    >
                      {d.status}
                    </span>
                    <span className="text-gray-400">
                      {new Date(d.prazo).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-2 xl:h-6" />
      </div>
    </div>
  );
}
