"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, CheckCircle, TrendingUp, AlertTriangle } from "lucide-react";

export default function Home() {
  const [projetosAtivos] = useState(3);
  const [valorTotal] = useState(15000);
  const [valorRecebido] = useState(7200);
  const [metaMensal] = useState(5000);

  const progresso = Math.min((valorRecebido / metaMensal) * 100, 100);

  const COLORS = ["#facc15", "#1f1f1f"];

  const statusData = [
    { name: "Em produção", value: 80 },
    { name: "Enviados", value: 65 },
    { name: "Aguardando aprovação", value: 45 },
    { name: "Em ajustes", value: 25 },
  ];

  const barData = [
    { name: "Produção", valor: 80 },
    { name: "Enviados", valor: 65 },
    { name: "Aprovação", valor: 45 },
    { name: "Ajustes", valor: 25 },
  ];

  return (
    <div className="space-y-10 text-white w-full">
      {/* Header */}
      <header className="flex flex-col">
        <h1 className="text-4xl font-bold">Beshboard</h1>
        <p className="text-gray-400 text-lg">
          Bem-vindo, <span className="text-yellow-400 font-semibold">Arthur 👋</span>
        </p>
      </header>

      {/* Cards principais */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard title="Projetos Ativos" icon={CheckCircle} gradient="from-yellow-500 to-amber-600">
          <p className="text-3xl font-bold mt-2 text-yellow-400">{projetosAtivos}</p>
        </GlassCard>

        <GlassCard title="Valor Total" icon={DollarSign} gradient="from-green-500 to-emerald-600">
          <p className="text-3xl font-bold mt-2 text-green-400">
            R$ {valorTotal.toLocaleString("pt-BR")}
          </p>
        </GlassCard>

        <GlassCard title="Valor Recebido" icon={DollarSign} gradient="from-blue-500 to-cyan-600">
          <p className="text-3xl font-bold mt-2 text-blue-400">
            R$ {valorRecebido.toLocaleString("pt-BR")}
          </p>
        </GlassCard>
      </section>

      {/* Linha intermediária */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progresso circular */}
        <GlassCard
          title="Meta Mensal"
          icon={TrendingUp}
          gradient="from-yellow-500 to-amber-600"
        >
          <div className="flex items-center justify-center h-48">
            <ResponsiveContainer width="80%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Progresso", value: progresso },
                    { name: "Restante", value: 100 - progresso },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-yellow-400">{progresso.toFixed(0)}%</span>
              <span className="text-gray-400 text-sm mt-1">
                R$ {valorRecebido.toLocaleString("pt-BR")} de R$ {metaMensal.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Clientes mais rentáveis */}
        <GlassCard title="Clientes Mais Rentáveis" icon={Users} gradient="from-blue-500 to-cyan-600">
          <ul className="text-gray-300 text-sm space-y-2 mt-3">
            <li>
              <span className="text-yellow-400 font-medium">Silve</span> — Silva & Associados
            </li>
            <li>TechStartup</li>
            <li>Pedro Costa</li>
          </ul>
        </GlassCard>

        {/* Alertas de prazos */}
        <GlassCard title="Alertas de Prazos" icon={AlertTriangle} gradient="from-red-500 to-orange-600">
          <ul className="text-gray-300 text-sm space-y-2 mt-3">
            <li>📅 Silva & Associados — <span className="text-red-400">2 dias atrasado</span></li>
            <li>🕐 AS Event — <span className="text-yellow-400">3 dias para entrega</span></li>
          </ul>
        </GlassCard>
      </section>

      {/* Status das entregas */}
      <GlassCard title="Status das Entregas" gradient="from-gray-700 to-gray-800">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="valor" fill="#facc15" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
