"use client";

import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Tarefa } from "@/entities/Tarefa";
import { TarefaCard } from "@/components/tarefas/TarefaCard";
import { NovaTarefaModal } from "@/components/tarefas/NovaTarefaModal";
import { HistoricoModal } from "@/components/tarefas/HistoricoModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modalNova, setModalNova] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);

  const handleNovaTarefa = (t: Tarefa) => {
    const nova = { ...t, id: String(Date.now()) };
    setTarefas((prev) => [nova, ...prev]);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Minhas Tarefas
        </h1>
        <Button
          onClick={() => setModalNova(true)}
          className="button-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nova Tarefa
        </Button>
      </div>

      <GlassCard title="Tarefas em andamento" gradient="from-blue-600 to-purple-600">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tarefas.length > 0 ? (
            tarefas.map((t) => (
              <TarefaCard
                key={t.id}
                tarefa={t}
                onClick={() => {
                  setTarefaSelecionada(t);
                  setModalHistorico(true);
                }}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">Nenhuma tarefa criada ainda.</p>
          )}
        </div>
      </GlassCard>

      <NovaTarefaModal
        open={modalNova}
        onClose={() => setModalNova(false)}
        onCreate={handleNovaTarefa}
      />

      <HistoricoModal
        open={modalHistorico}
        onClose={() => setModalHistorico(false)}
        tarefa={tarefaSelecionada}
      />
    </div>
  );
}
