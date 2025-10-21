"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarClientePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nome: "",
        empresa: "",
        email: "",
        telefone: "",
        documento: "",
        status: "Ativo",
        endereco: "",
        observacoes: "",
    });

    useEffect(() => {
        async function fetchCliente() {
            try {
                const res = await fetch(`/api/clientes/${id}`);
                const data = await res.json();
                setForm(data);
            } catch {
                alert("Erro ao carregar cliente");
            } finally {
                setLoading(false);
            }
        }
        fetchCliente();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/clientes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) router.push("/clientes");
            else alert("Erro ao atualizar cliente.");
        } catch {
            alert("Erro de conexão.");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return <div className="p-10 text-center text-gray-400">Carregando dados...</div>;

    return (
        <div className="max-w-[900px] mx-auto">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-8">
                Editar Cliente
            </h1>

            <form
                onSubmit={handleSave}
                className="glass-card border border-amber-200/10 p-6 space-y-6"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm">Nome completo</label>
                        <input name="nome" value={form.nome} onChange={handleChange} className="input" required />
                    </div>
                    <div>
                        <label className="text-sm">Empresa</label>
                        <input name="empresa" value={form.empresa} onChange={handleChange} className="input" required />
                    </div>
                    <div>
                        <label className="text-sm">E-mail</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="text-sm">Telefone</label>
                        <input name="telefone" value={form.telefone} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="text-sm">CNPJ / CPF</label>
                        <input name="documento" value={form.documento} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="text-sm">Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className="input bg-black/20">
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm">Endereço</label>
                        <input name="endereco" value={form.endereco} onChange={handleChange} className="input" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm">Observações</label>
                        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} className="input h-24" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full sm:w-32 text-sm text-gray-400 hover:text-gray-200 transition"
                    >
                        ← Voltar
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className={`w-full sm:w-48 h-11 rounded-lg font-semibold text-black transition ${saving
                                ? "bg-amber-400/60 cursor-not-allowed"
                                : "bg-amber-400 hover:bg-amber-300"
                            }`}
                    >
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </button>
                </div>
            </form>
        </div>
    );
}
