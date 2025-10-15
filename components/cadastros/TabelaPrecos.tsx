"use client";

import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function TabelaPrecos() {
  const [lista, setLista] = useState<
    { servico: string; cliente: string; valor: number }[]
  >([]);

  const [novo, setNovo] = useState({ servico: "", cliente: "", valor: 0 });

  const adicionar = () => {
    if (!novo.servico || !novo.cliente) return;
    setLista((prev) => [...prev, novo]);
    setNovo({ servico: "", cliente: "", valor: 0 });
  };

  return (
    <GlassCard title="Preços Especiais" gradient="from-amber-500 to-orange-500">
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <Input
          placeholder="Serviço"
          className="input-glass"
          value={novo.servico}
          onChange={(e) => setNovo({ ...novo, servico: e.target.value })}
        />
        <Input
          placeholder="Cliente"
          className="input-glass"
          value={novo.cliente}
          onChange={(e) => setNovo({ ...novo, cliente: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Valor"
          className="input-glass"
          value={novo.valor}
          onChange={(e) => setNovo({ ...novo, valor: Number(e.target.value) })}
        />
      </div>
      <Button onClick={adicionar} className="button-glow flex items-center gap-2">
        <PlusCircle className="w-4 h-4" /> Adicionar
      </Button>

      <div className="mt-6 space-y-2">
        {lista.length ? (
          lista.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10"
            >
              <span className="text-sm text-gray-300">
                {item.servico} — {item.cliente}
              </span>
              <span className="text-sm font-semibold text-white">
                R$ {item.valor.toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">Nenhum preço especial cadastrado.</p>
        )}
      </div>
    </GlassCard>
  );
}
