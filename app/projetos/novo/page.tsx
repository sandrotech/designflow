"use client";

import { useState } from "react";

const STEPS = ["K1 • Briefing", "K2 • Planejamento", "Resumo"];

export default function NovoProjetoPage() {
    const [step, setStep] = useState(0);

    return (
        <div className="max-w-[900px] mx-auto">
            {/* Steps */}
            <div className="flex items-center justify-center gap-3 mb-8">
                {STEPS.map((s, i) => (
                    <div key={s} className={`px-3 py-1.5 rounded-full text-xs border ${i <= step ? "border-amber-300/50 text-amber-200 bg-amber-300/10" : "border-white/10 text-gray-400"}`}>
                        {s}
                    </div>
                ))}
            </div>

            <div className="glass-card border border-amber-200/10 p-6 space-y-6">
                {step === 0 && (
                    <>
                        <h2 className="text-lg font-semibold">K1 • Briefing</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Nome do projeto</label>
                                <input className="input" placeholder="Ex.: Identidade Visual – Cliente X" />
                            </div>
                            <div>
                                <label className="text-sm">Cliente</label>
                                <input className="input" placeholder="Selecione/Digite o cliente" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-sm">Objetivo</label>
                                <textarea className="input h-24" placeholder="Qual o objetivo principal?" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-sm">Escopo (itens do pacote)</label>
                                <textarea className="input h-24" placeholder="Liste os entregáveis… (ex.: logo, manual, posts…)" />
                            </div>
                            <div>
                                <label className="text-sm">Prazo desejado</label>
                                <input className="input" placeholder="dd/mm/aaaa" />
                            </div>
                            <div>
                                <label className="text-sm">Orçamento sugerido</label>
                                <input className="input" placeholder="R$ 0,00" />
                            </div>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <h2 className="text-lg font-semibold">K2 • Planejamento</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Responsável</label>
                                <input className="input" placeholder="Quem lidera?" />
                            </div>
                            <div>
                                <label className="text-sm">Time envolvido</label>
                                <input className="input" placeholder="Design, Conteúdo, Motion…" />
                            </div>
                            <div>
                                <label className="text-sm">Data de início</label>
                                <input className="input" placeholder="dd/mm/aaaa" />
                            </div>
                            <div>
                                <label className="text-sm">Data de entrega</label>
                                <input className="input" placeholder="dd/mm/aaaa" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-sm">Cronograma</label>
                                <textarea className="input h-24" placeholder="Marcos: kickoff, 1ª versão, revisão, entrega…" />
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold">Resumo do projeto</h2>
                        <p className="text-gray-400 text-sm">Aqui apenas um preview visual do que foi preenchido (não salva nada).</p>
                        <div className="mt-3 grid sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Status inicial</p>
                                <p className="text-sm font-medium">Briefing</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Próximo passo</p>
                                <p className="text-sm font-medium">Planejamento</p>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                    >
                        Voltar
                    </button>
                    {step < 2 ? (
                        <button
                            onClick={() => setStep((s) => Math.min(2, s + 1))}
                            className="btn-amber w-36"
                        >
                            Continuar
                        </button>
                    ) : (
                        <a href="/projetos" className="btn-amber w-36 grid place-items-center">Concluir</a>
                    )}
                </div>
            </div>
        </div>
    );
}
