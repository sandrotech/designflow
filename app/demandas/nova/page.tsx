"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function NovaDemandaPage() {
    const router = useRouter();

    const [formatos, setFormatos] = useState<string[]>([]);
    const [modoCompleto, setModoCompleto] = useState(false);
    const [copy, setCopy] = useState("");
    const [prazo, setPrazo] = useState("");
    const [nivel, setNivel] = useState("Padrão (48h úteis)");
    const [antecipada, setAntecipada] = useState("Não");
    const [links, setLinks] = useState("");
    const [saving, setSaving] = useState(false);

    // Campos específicos do modo completo
    const [feedTitulo, setFeedTitulo] = useState("");
    const [feedSubtitulo, setFeedSubtitulo] = useState("");
    const [feedNotas, setFeedNotas] = useState("");

    const [storiesTelas, setStoriesTelas] = useState(1);
    const [storiesNotas, setStoriesNotas] = useState("");

    const [carrosselCards, setCarrosselCards] = useState(1);
    const [carrosselNotas, setCarrosselNotas] = useState("");

    const toggleFormato = (f: string) => {
        setFormatos((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formatos.length === 0) {
            alert("Selecione pelo menos um formato.");
            return;
        }
        if (!copy.trim() && !modoCompleto) {
            alert("A copy é obrigatória no modo simplificado.");
            return;
        }

        const data = {
            cliente: "Cliente Padrão",
            formatos,
            modoCompleto,
            copy,
            prazo,
            nivel,
            antecipada,
            links,
            feedTitulo,
            feedSubtitulo,
            feedNotas,
            storiesTelas,
            storiesNotas,
            carrosselCards,
            carrosselNotas,
        };

        try {
            setSaving(true);
            const res = await fetch("/api/demandas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Erro ao salvar demanda");

            await res.json();
            alert("✅ Demanda salva com sucesso!");
            router.push("/demandas");
        } catch (error) {
            console.error("❌ Erro ao salvar:", error);
            alert("Erro ao salvar demanda. Verifique a API.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[1000px] mx-auto pt-10 pb-24 px-6 relative">
            {/* Header */}
            <header className="flex items-center justify-between mb-10">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 hover:border-amber-300/30 bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar ao Dashboard
                </button>

                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    Nova Demanda
                </h1>
            </header>

            {/* Formulário */}
            <form
                onSubmit={handleSubmit}
                className="glass-card border border-amber-200/10 rounded-lg p-8 space-y-8"
            >
                {/* 1️⃣ Formatos */}
                <section>
                    <h2 className="text-lg font-semibold text-amber-300 mb-3">1️⃣ Formatos</h2>
                    <div className="flex flex-wrap gap-3">
                        {["Feed Estático", "Stories", "Carrossel"].map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => toggleFormato(f)}
                                className={`px-4 py-2 rounded-lg border text-sm transition ${formatos.includes(f)
                                        ? "bg-amber-400/20 border-amber-300/40 text-amber-200"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 2️⃣ Modo */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-amber-300">2️⃣ Modo de Preenchimento</h2>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-sm text-gray-400">{modoCompleto ? "Completo" : "Simplificado"}</span>
                            <input
                                type="checkbox"
                                checked={modoCompleto}
                                onChange={(e) => setModoCompleto(e.target.checked)}
                                className="w-5 h-5 accent-amber-400 cursor-pointer"
                            />
                        </label>
                    </div>

                    {/* Simplificado */}
                    {!modoCompleto ? (
                        <textarea
                            className="input h-28"
                            placeholder="Cole aqui a copy (modo simplificado)"
                            value={copy}
                            onChange={(e) => setCopy(e.target.value)}
                            required
                        />
                    ) : (
                        <div className="space-y-6">
                            {formatos.includes("Feed Estático") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">🔸 Feed Estático</h3>
                                    <input
                                        className="input"
                                        placeholder="Título"
                                        value={feedTitulo}
                                        onChange={(e) => setFeedTitulo(e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        placeholder="Subtítulo"
                                        value={feedSubtitulo}
                                        onChange={(e) => setFeedSubtitulo(e.target.value)}
                                    />
                                    <textarea
                                        className="input h-20"
                                        placeholder="Informações adicionais (tom, observações, etc)"
                                        value={feedNotas}
                                        onChange={(e) => setFeedNotas(e.target.value)}
                                    />
                                </div>
                            )}

                            {formatos.includes("Stories") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">🔸 Stories</h3>
                                    <input
                                        type="number"
                                        className="input"
                                        min={1}
                                        placeholder="Número de telas"
                                        value={storiesTelas}
                                        onChange={(e) => setStoriesTelas(Number(e.target.value))}
                                    />
                                    <textarea
                                        className="input h-20"
                                        placeholder="Notas ou observações sobre as telas"
                                        value={storiesNotas}
                                        onChange={(e) => setStoriesNotas(e.target.value)}
                                    />
                                </div>
                            )}

                            {formatos.includes("Carrossel") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">🔸 Carrossel</h3>
                                    <input
                                        type="number"
                                        className="input"
                                        min={1}
                                        placeholder="Número de cards"
                                        value={carrosselCards}
                                        onChange={(e) => setCarrosselCards(Number(e.target.value))}
                                    />
                                    <textarea
                                        className="input h-20"
                                        placeholder="Notas gerais sobre os cards"
                                        value={carrosselNotas}
                                        onChange={(e) => setCarrosselNotas(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 3️⃣ Campos Comuns */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-amber-300">3️⃣ Campos Comuns</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400">Preciso até</label>
                            <input
                                type="datetime-local"
                                className="input"
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Nível de prazo</label>
                            <select
                                className="input bg-white/5 border border-white/10 text-gray-200"
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value)}
                            >
                                <option>Padrão (48h úteis)</option>
                                <option>Urgente (+30%)</option>
                                <option>Super urgente (+50%)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Aceita antecipada?</label>
                            <select
                                className="input bg-white/5 border border-white/10 text-gray-200"
                                value={antecipada}
                                onChange={(e) => setAntecipada(e.target.value)}
                            >
                                <option>Não</option>
                                <option>Sim</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Links úteis</label>
                            <input
                                className="input"
                                placeholder="Pasta de assets, referências, etc."
                                value={links}
                                onChange={(e) => setLinks(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard")}
                        className="w-full sm:w-40 text-sm text-gray-400 hover:text-gray-200 transition"
                    >
                        ← Voltar
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className={`w-full sm:w-48 h-11 rounded-lg font-semibold text-black transition ${saving ? "bg-amber-400/60 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300"
                            }`}
                    >
                        {saving ? "Salvando..." : "Salvar demanda"}
                    </button>
                </div>
            </form>
        </div>
    );
}
