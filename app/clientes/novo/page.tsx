"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoClientePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push("/clientes");
            } else {
                alert("Erro ao salvar cliente.");
            }
        } catch {
            alert("Erro de conexão.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[900px] mx-auto">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-8">
                Novo Cliente
            </h1>

            <form
                onSubmit={handleSave}
                className="glass-card border border-amber-200/10 p-6 space-y-6"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm">Nome completo</label>
                        <input
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            className="input"
                            placeholder="Nome do responsável"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm">Empresa</label>
                        <input
                            name="empresa"
                            value={form.empresa}
                            onChange={handleChange}
                            className="input"
                            placeholder="Nome da empresa"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm">E-mail</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="exemplo@email.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Telefone</label>
                        <input
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            className="input"
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                    <div>
                        <label className="text-sm">CNPJ / CPF</label>
                        <input
                            name="documento"
                            value={form.documento}
                            onChange={handleChange}
                            className="input"
                            placeholder="00.000.000/0001-00"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="input bg-black/20"
                        >
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm">Endereço</label>
                        <input
                            name="endereco"
                            value={form.endereco}
                            onChange={handleChange}
                            className="input"
                            placeholder="Rua, número, cidade..."
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm">Observações</label>
                        <textarea
                            name="observacoes"
                            value={form.observacoes}
                            onChange={handleChange}
                            className="input h-24"
                            placeholder="Informações adicionais..."
                        />
                    </div>
                </div>

                {/* Botões */}
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
                        className={`w-full sm:w-48 h-11 rounded-lg font-semibold text-black transition 
          ${saving
                                ? "bg-amber-400/60 cursor-not-allowed"
                                : "bg-amber-400 hover:bg-amber-300"
                            }`}
                    >
                        {saving ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
