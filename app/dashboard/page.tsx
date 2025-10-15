"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Projeto } from "@/entities/Projeto";
import { DollarSign, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Metric {
  title: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
}

export default function Dashboard() {
  const [totalProjetos, setTotalProjetos] = useState(0);
  const [totalFaturado, setTotalFaturado] = useState(0);
  const [metaMensal, setMetaMensal] = useState(5000);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const projetos = await Projeto.list();
    setTotalProjetos(projetos.length);
    const valor = projetos.reduce((sum, p) => sum + (p.valor || 0), 0);
    setTotalFaturado(valor);
  };

  const progresso = Math.min((totalFaturado / metaMensal) * 100, 100);

  const metrics: Metric[] = [
    {
      title: "Projetos Ativos",
      value: totalProjetos.toString(),
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Faturamento Total",
      value: `R$ ${totalFaturado.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Clientes Ativos",
      value: "12",
      icon: Users,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Meta Mensal",
      value: `R$ ${metaMensal.toLocaleString("pt-BR")}`,
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8 text-white">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Dashboard
      </h1>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <GlassCard
            key={metric.title}
            title={metric.title}
            icon={metric.icon}
            gradient={metric.gradient}
          >
            <p className="text-3xl font-semibold mt-2">{metric.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Card de progresso da meta mensal */}
      <GlassCard
        title="Progresso da Meta Mensal"
        icon={TrendingUp}
        gradient="from-indigo-500 to-purple-600"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-300">
            Você atingiu{" "}
            <span className="text-white font-semibold">
              {progresso.toFixed(1)}%
            </span>{" "}
            da sua meta mensal de R$ {metaMensal.toLocaleString("pt-BR")}.
          </p>
          <Progress value={progresso} className="h-2 bg-white/10" />
        </div>
      </GlassCard>

      {/* Placeholder para gráficos futuros */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard
          title="Evolução de Faturamento"
          gradient="from-cyan-500 to-blue-600"
        >
          <Card className="bg-black/40 border border-white/10 h-48 flex items-center justify-center">
            <CardContent className="text-gray-400 text-sm">
              Gráfico em desenvolvimento...
            </CardContent>
          </Card>
        </GlassCard>

        <GlassCard
          title="Serviços mais vendidos"
          gradient="from-fuchsia-500 to-pink-600"
        >
          <Card className="bg-black/40 border border-white/10 h-48 flex items-center justify-center">
            <CardContent className="text-gray-400 text-sm">
              Relatório em desenvolvimento...
            </CardContent>
          </Card>
        </GlassCard>
      </div>
    </div>
  );
}
