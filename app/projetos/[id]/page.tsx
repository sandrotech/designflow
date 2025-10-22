"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Projeto } from "@/app/api/projetos/route";
import { STATUS as STATUS_LIST } from "@/app/api/projetos/route";

function StatusStep({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          active ? "bg-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.45)]" : "bg-white/20"
        }`}
      />
      <span className={`text-xs ${active ? "text-amber-200" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}

export default function ProjetoDetalhePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/projetos/${params.id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      setItem((await res.json()) as Projeto);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const stepIndex = useMemo(
    () => (item ? STATUS_LIST.indexOf(item.status) : 0),
    [item]
  );

  async function avancarStatus() {
    if (!item) return;
    const next = STATUS_LIST[Math.min(STATUS_LIST.length - 1, stepIndex + 1)];
    if (next === item.status) return;
    setWorking(true);
    try {
      const res = await fetch(`/api/projetos/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      setItem(await res.json());
    } catch (e) {
      console.error(e);
      alert("Erro ao avançar status.");
    } finally {
      setWorking(false);
    }
  }

  async function excluir() {
    if (!item) return;
    if (!confirm(`Excluir o projeto ${item.id}? Essa ação não pode ser desfeita.`)) return;
    setWorking(true);
    try {
      const res = await fetch(`/api/projetos/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      router.push("/projetos");
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir.");
    } finally {
      setWorking(false);
    }
  }

  if (loading) {
    return (
      <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-8">
        <p className="text-gray-400">Carregando…</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-8">
        <p className="text-gray-400">Projeto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="neo-container px-4 sm:px-6 lg:px-8 xl:pr-28 py-8 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-300">
            {item.nome}
          </h1>
          <p className="text-sm text-gray-400">
            <span className="text-amber-200">{item.id}</span> • Cliente:{" "}
            <span className="text-gray-300">{item.cliente}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/projetos/${item.id}/editar`}
            className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
          >
            Editar
          </Link>
          <button
            onClick={avancarStatus}
            disabled={working || stepIndex >= STATUS_LIST.length - 1}
            className="btn-amber disabled:opacity-50 px-3 py-2 rounded-lg"
          >
            {stepIndex >= STATUS_LIST.length - 1 ? "Concluído" : "Avançar status"}
          </button>
          <button
            onClick={excluir}
            disabled={working}
            className="px-3 py-2 rounded-lg border border-red-500/30 text-red-300 bg-red-500/10 text-sm"
          >
            Excluir
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="glass-card border border-amber-200/10 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STATUS_LIST.map((s, i) => (
            <StatusStep key={s} label={s} active={i <= stepIndex} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card border border-amber-200/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-300">Resumo</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Info label="Responsável" value={item.responsavel} />
            <Info label="Time" value={item.equipe} />
            <Info label="Início" value={item.inicio} />
            <Info label="Entrega" value={item.entrega} />
            <Info label="Prazo" value={item.prazo} />
            <Info label="Orçamento" value={item.orcamento} />
          </div>

          <Block label="Objetivo" value={item.objetivo} />
          <Block label="Escopo" value={item.escopo} />
          <Block label="Cronograma" value={item.cronograma} />
        </div>

        <div className="glass-card border border-amber-200/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-300">Status</h2>
          <p className="text-sm text-gray-300">
            Atual: <span className="text-amber-200">{item.status}</span>
          </p>
          <p className="text-xs text-gray-500">
            Criado em {item.createdAt ? new Date(item.createdAt).toLocaleString("pt-BR") : "-"}
            <br />
            Atualizado em {item.updatedAt ? new Date(item.updatedAt).toLocaleString("pt-BR") : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-200">{value || "—"}</p>
    </div>
  );
}

function Block({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-gray-200 whitespace-pre-wrap min-h-[48px]">
        {value || "—"}
      </div>
    </div>
  );
}
