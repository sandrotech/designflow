"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  CheckSquare,
  FileCheck,
  Users,
  FileText,
  BarChart2,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

type Child = { label: string; href: string };
type Item = { label: string; href?: string; icon: any; children?: Child[] };

// Navegação atualizada com as novas telas criadas
const NAV: Item[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  {
    label: "Projetos",
    icon: FolderKanban,
    children: [
      { label: "Todos os projetos", href: "/projetos" },
      { label: "Novo projeto (K1/K2)", href: "/projetos/novo" },
    ],
  },

  {
    label: "Tarefas",
    icon: ClipboardList,
    children: [
      { label: "Minhas tarefas", href: "/tarefas" },
      { label: "Em aprovação", href: "/tarefas/aprovacao" },
    ],
  },

  {
    label: "Entregas",
    icon: FileCheck,
    children: [
      { label: "Todas as entregas", href: "/entregas" },
    ],
  },

  {
    label: "Financeiro",
    icon: Wallet,
    children: [
      { label: "Propostas", href: "/financeiro/propostas" },
      { label: "Faturas", href: "/financeiro/faturas" },
      { label: "Recebimentos", href: "/financeiro/recebimentos" },
    ],
  },

  {
    label: "Relatórios",
    icon: BarChart2,
    children: [
      { label: "Visão geral", href: "/relatorios" },
      { label: "Produtividade", href: "/relatorios/produtividade" },
      { label: "Financeiro", href: "/relatorios/financeiro" },
    ],
  },

  {
    label: "Configurações",
    icon: Settings,
    children: [
      { label: "Perfil", href: "/configuracoes/perfil" },
      { label: "Workspace", href: "/configuracoes/workspace" },
      { label: "Permissões", href: "/configuracoes/permissoes" },
    ],
  },
];

export default function NeoDock() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);

  const activeRoot = useMemo(() => {
    const root = "/" + (pathname?.split("/")[1] || "");
    return root === "/" ? "/dashboard" : root;
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("userLogged");
    router.replace("/");
  };

  return (
    <>
      {/* Dock lateral futurista */}
      <aside
        className="
          hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50
          flex-col gap-3 p-2 rounded-2xl
          bg-[rgba(18,18,22,0.65)] backdrop-blur-xl border border-amber-400/15
          shadow-[0_18px_50px_rgba(250,204,21,0.06)]
        "
        onMouseLeave={() => setOpen(null)}
      >
        {NAV.map((item, i) => {
          const Icon = item.icon;
          const isActive =
            item.href
              ? activeRoot === item.href
              : item.children?.some((c) => activeRoot.startsWith("/" + c.href.split("/")[1]));

          return (
            <div key={item.label} className="relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`
                    group flex items-center justify-center w-12 h-12 rounded-xl transition
                    ${isActive ? "bg-amber-400/15 border border-amber-300/40" : "border border-white/10 hover:bg-white/5"}
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-amber-300 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : "text-zinc-400 group-hover:text-amber-200"
                      } transition`}
                  />
                  <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-black/80 border border-white/10 text-[11px] text-zinc-100 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <button
                  onMouseEnter={() => setOpen(i)}
                  className="
                    group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10
                    hover:bg-white/5 transition
                  "
                >
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-amber-200" />
                  <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-black/80 border border-white/10 text-[11px] text-zinc-100 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    {item.label}
                  </span>
                </button>
              )}

              {/* Submenu flutuante */}
              {item.children && open === i && (
                <div
                  className="
                    absolute right-full top-1/2 -translate-y-1/2 mr-3 p-2 rounded-2xl
                    bg-[rgba(18,18,22,0.85)] backdrop-blur-xl border border-amber-400/20
                    shadow-[0_18px_50px_rgba(250,204,21,0.12)]
                    min-w-[220px]
                  "
                >
                  <div className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wide text-amber-200/70">
                    {item.label}
                  </div>
                  <div className="grid">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-white/5 transition"
                      >
                        <span>{c.label}</span>
                        <FileText className="w-4 h-4 opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="my-1 h-px bg-white/10" />

        {/* Botão de logout */}
        <button
          onClick={logout}
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 hover:bg-white/5 transition"
        >
          <LogOut className="w-5 h-5 text-zinc-400 group-hover:text-amber-300 transition" />
          <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-black/80 border border-white/10 text-[11px] text-zinc-100 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
            Sair
          </span>
        </button>
      </aside>

      {/* Dock inferior (mobile) */}
      <nav
        className="
          lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-2 px-2 py-2 rounded-2xl
          bg-[rgba(18,18,22,0.7)] backdrop-blur-xl border border-amber-400/20
          shadow-[0_10px_40px_rgba(250,204,21,0.08)]
        "
      >
        {[NAV[0], NAV[1], NAV[2], NAV[3], NAV[4]].map((item) => {
          const Icon = item.icon;
          const root = item.href ?? "/" + (item.children?.[0].href.split("/")[1] ?? "");
          const active = activeRoot === root;
          return (
            <Link
              key={item.label}
              href={item.href ?? item.children?.[0].href ?? "#"}
              className={`
                relative grid place-items-center w-11 h-11 rounded-xl transition
                ${active ? "bg-amber-400/15 border border-amber-300/40" : "border border-white/10 hover:bg-white/5"}
              `}
            >
              <Icon className={`w-5 h-5 ${active ? "text-amber-300" : "text-zinc-400"}`} />
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="grid place-items-center w-11 h-11 rounded-xl border border-white/10 hover:bg-white/5 transition"
        >
          <LogOut className="w-5 h-5 text-zinc-400" />
        </button>
      </nav>
    </>
  );
}
