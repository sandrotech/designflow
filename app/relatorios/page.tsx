"use client";

import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, DollarSign, Users, TrendingUp } from "lucide-react";

export default function RelatoriosPage() {
  const [ano, setAno] = useState("2025");

  const anos = ["2025", "2024", "2023"];

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Relatórios e Desempenho
        </h1>

        <Select value={ano} onValueChange={setAno}>
          <SelectTrigger className="w-[120px] input-glass">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {anos.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard title="Faturamento Total" gradient="from-green-500 to-emerald-600" icon={DollarSign}>
          <p className="text-3xl font-bold text-white">R$ 48.200</p>
          <p className="text-sm text-gray-400 mt-1">+12% vs ano anterior</p>
        </GlassCard>

        <GlassCard title="Serviços Mais Vendidos" gradient="from-blue-500 to-cyan-600" icon={BarChart3}>
          <ul className="text-sm space-y-1 mt-2 text-gray-300">
            <li>• Social Media — 32 projetos</li>
            <li>• Branding — 18 projetos</li>
            <li>• Web Design — 12 projetos</li>
          </ul>
        </GlassCard>

        <GlassCard title="Clientes Mais Rentáveis" gradient="from-purple-500 to-pink-600" icon={Users}>
          <ul className="text-sm space-y-1 mt-2 text-gray-300">
            <li>• Agência Cria+ — R$ 12.400</li>
            <li>• MídiaMax — R$ 9.100</li>
            <li>• Studio Wave — R$ 8.700</li>
          </ul>
        </GlassCard>
      </div>

      <GlassCard title="Evolução de Faturamento" gradient="from-amber-500 to-orange-600" icon={TrendingUp}>
        <div className="h-56 flex items-center justify-center text-gray-400 text-sm border border-white/10 rounded-lg bg-black/30">
          <p>Gráfico de evolução (em breve)</p>
        </div>
      </GlassCard>
    </div>
  );
}
