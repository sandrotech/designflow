"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const STATUS = ["Briefing", "Planejamento", "Produção", "Aprovação", "Entregue"] as const;

export default function EditarProjetoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: "",
    nome: "",
    cliente: "",
    prazo: "",
    status: STATUS[0] as (typeof STATUS)[number],
    responsavel: "",
    equipe: "",
    inicio: "",
    entrega: "",
    objetivo: "",
    escopo: "",
    cronograma: "",
    orcamento: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/projetos/${id}`);
        const data = await res.json();
        setForm((prev) => ({ ...prev, ...data }));
      } catch {
        alert("Erro ao carregar projeto.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/projetos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/projetos");
      else alert("Erro ao atualizar projeto.");
    } catch {
      alert("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Carregando dados...</div>;

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-8">
        Editar Projeto {form.id}
      </h1>

      <form onSubmit={onSave} className="glass-card border border-amber-200/10 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Nome do projeto</label>
            <input name="nome" value={form.nome} onChange={onChange} className="input" required />
          </div>
          <div>
            <label className="text-sm">Cliente</label>
            <input name="cliente" value={form.cliente} onChange={onChange} className="input" required />
          </div>
          <div>
            <label className="text-sm">Prazo</label>
            <input name="prazo" value={form.prazo} onChange={onChange} className="input" />
          </div>
          <div>
            <label className="text-sm">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="input bg-black/20">
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm">Responsável</label>
            <input name="responsavel" value={form.responsavel} onChange={onChange} className="input" />
          </div>
          <div>
            <label className="text-sm">Equipe</label>
            <input name="equipe" value={form.equipe} onChange={onChange} className="input" />
          </div>
          <div>
            <label className="text-sm">Início</label>
            <input name="inicio" value={form.inicio} onChange={onChange} className="input" placeholder="dd/mm/aaaa" />
          </div>
          <div>
            <label className="text-sm">Entrega</label>
            <input name="entrega" value={form.entrega} onChange={onChange} className="input" placeholder="dd/mm/aaaa" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm">Objetivo</label>
            <textarea name="objetivo" value={form.objetivo} onChange={onChange} className="input h-24" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Escopo</label>
            <textarea name="escopo" value={form.escopo} onChange={onChange} className="input h-24" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Cronograma</label>
            <textarea name="cronograma" value={form.cronograma} onChange={onChange} className="input h-24" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Orçamento</label>
            <input name="orcamento" value={form.orcamento} onChange={onChange} className="input" placeholder="R$ 0,00" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mt-6">
          <button type="button" onClick={() => router.back()} className="w-full sm:w-32 text-sm text-gray-400 hover:text-gray-200 transition">
            ← Voltar
          </button>
          <button type="submit" disabled={saving} className={`w-full sm:w-48 h-11 rounded-lg font-semibold text-black transition ${saving ? "bg-amber-400/60 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300"}`}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
