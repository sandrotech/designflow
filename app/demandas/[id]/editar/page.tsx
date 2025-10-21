"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function EditarDemandaPage() {
    const router = useRouter();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [demanda, setDemanda] = useState<any>(null);

    const [formatos, setFormatos] = useState<string[]>([]);
    const [modoCompleto, setModoCompleto] = useState(false);
    const [copy, setCopy] = useState("");
    const [prazo, setPrazo] = useState("");
    const [nivel, setNivel] = useState("Padrão (48h úteis)");
    const [antecipada, setAntecipada] = useState("Não");
    const [links, setLinks] = useState("");
    const [status, setStatus] = useState("Pendente");

    // Campos modo completo
    const [feedTitulo, setFeedTitulo] = useState("");
    const [feedSubtitulo, setFeedSubtitulo] = useState("");
    const [feedNotas, setFeedNotas] = useState("");

    const [storiesTelas, setStoriesTelas] = useState(1);
    const [storiesNotas, setStoriesNotas] = useState("");

    const [carrosselCards, setCarrosselCards] = useState(1);
    const [carrosselNotas, setCarrosselNotas] = useState("");

    useEffect(() => {
        async function fetchDemanda() {
            try {
                const res = await fetch(`/api/demandas/${id}`);
                if (!res.ok) throw new Error("Erro ao buscar demanda");
                const data = await res.json();
                setDemanda(data);

                setFormatos(data.formatos || []);
                setModoCompleto(data.modoCompleto || false);
                setCopy(data.copy || "");
                setPrazo(data.prazo || "");
                setNivel(data.nivel || "Padrão (48h úteis)");
                setAntecipada(data.antecipada || "Não");
                setLinks(data.links || "");
                setStatus(data.status || "Pendente");

                setFeedTitulo(data.feedTitulo || "");
                setFeedSubtitulo(data.feedSubtitulo || "");
                setFeedNotas(data.feedNotas || "");

                setStoriesTelas(data.storiesTelas || 1);
                setStoriesNotas(data.storiesNotas || "");

                setCarrosselCards(data.carrosselCards || 1);
                setCarrosselNotas(data.carrosselNotas || "");
            } catch {
                alert("Erro ao carregar demanda");
                router.push("/demandas");
            } finally {
                setLoading(false);
            }
        }
        fetchDemanda();
    }, [id, router]);

    const toggleFormato = (f: string) => {
        setFormatos((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
        );
    };

    async function handleSubmit(e: React.FormEvent) {
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
            ...demanda,
            formatos,
            modoCompleto,
            copy,
            prazo,
            nivel,
            antecipada,
            links,
            status,
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
            const res = await fetch(`/api/demandas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Erro ao salvar alterações");
            alert("✅ Demanda atualizada com sucesso!");
            router.push("/demandas");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar demanda.");
        } finally {
            setSaving(false);
        }
    }

    if (loading)
        return (
            <div className="text-center text-gray-400 py-20">Carregando...</div>
        );

    return (
        <div className="max-w-[1000px] mx-auto pt-10 pb-24 px-6 relative">
            <header className="flex items-center justify-between mb-10">
                <button
                    onClick={() => router.push("/demandas")}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 hover:border-amber-300/30 bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                </button>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    Editar {demanda?.id || ""}
                </h1>
            </header>

            <form
                onSubmit={handleSubmit}
                className="glass-card border border-amber-200/10 rounded-lg p-8 space-y-8"
            >
                {/* STATUS */}
                <section>
                    <h2 className="text-lg font-semibold text-amber-300 mb-3">
                        Status da Demanda
                    </h2>
                    <select
                        className="input bg-white/5 border border-white/10 text-gray-200"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Pendente</option>
                        <option>Em andamento</option>
                        <option>Concluída</option>
                    </select>
                </section>

                {/* FORMATOS */}
                <section>
                    <h2 className="text-lg font-semibold text-amber-300 mb-3">
                        1️⃣ Formatos
                    </h2>
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

                {/* MODO */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-amber-300">
                            2️⃣ Modo de Preenchimento
                        </h2>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-sm text-gray-400">
                                {modoCompleto ? "Completo" : "Simplificado"}
                            </span>
                            <input
                                type="checkbox"
                                checked={modoCompleto}
                                onChange={(e) => setModoCompleto(e.target.checked)}
                                className="w-5 h-5 accent-amber-400 cursor-pointer"
                            />
                        </label>
                    </div>

                    {!modoCompleto ? (
                        <textarea
                            className="input h-28"
                            placeholder="Cole aqui a copy (modo simplificado)"
                            value={copy}
                            onChange={(e) => setCopy(e.target.value)}
                        />
                    ) : (
                        <div className="space-y-6">
                            {formatos.includes("Feed Estático") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">
                                        🔸 Feed Estático
                                    </h3>
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
                                        placeholder="Informações adicionais"
                                        value={feedNotas}
                                        onChange={(e) => setFeedNotas(e.target.value)}
                                    />
                                </div>
                            )}

                            {formatos.includes("Stories") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">
                                        🔸 Stories
                                    </h3>
                                    <input
                                        type="number"
                                        className="input"
                                        min={1}
                                        value={storiesTelas}
                                        onChange={(e) => setStoriesTelas(Number(e.target.value))}
                                    />
                                    <textarea
                                        className="input h-20"
                                        placeholder="Notas ou observações"
                                        value={storiesNotas}
                                        onChange={(e) => setStoriesNotas(e.target.value)}
                                    />
                                </div>
                            )}

                            {formatos.includes("Carrossel") && (
                                <div className="space-y-3">
                                    <h3 className="text-gray-300 text-sm font-medium">
                                        🔸 Carrossel
                                    </h3>
                                    <input
                                        type="number"
                                        className="input"
                                        min={1}
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

                {/* CAMPOS COMUNS */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-amber-300">
                        3️⃣ Campos Comuns
                    </h2>

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
                                value={links}
                                onChange={(e) => setLinks(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* BOTÃO */}
                <div className="flex justify-end pt-6 border-t border-white/10">
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
