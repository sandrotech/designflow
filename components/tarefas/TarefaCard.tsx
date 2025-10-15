"use client";

import { Tarefa } from "@/entities/Tarefa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface TarefaCardProps {
  tarefa: Tarefa;
  onClick?: () => void;
}

export function TarefaCard({ tarefa, onClick }: TarefaCardProps) {
  const statusColor: Record<string, string> = {
    pendente: "bg-yellow-500",
    em_andamento: "bg-blue-500",
    revisao: "bg-purple-500",
    concluida: "bg-green-500",
  };

  const prioridadeColor: Record<string, string> = {
    baixa: "text-green-400",
    media: "text-yellow-400",
    alta: "text-orange-400",
    urgente: "text-red-500",
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />;
      case "em_andamento":
        return <FileText className="w-4 h-4" />;
      case "revisao":
        return <AlertCircle className="w-4 h-4" />;
      case "concluida":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card
      onClick={onClick}
      className="bg-black/60 border border-white/10 hover:border-white/30 cursor-pointer transition-all"
    >
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-gray-100 text-sm font-semibold flex items-center gap-2">
          {getStatusIcon(tarefa.status)}
          {tarefa.titulo}
        </CardTitle>
        {tarefa.status && (
          <Badge
            className={`text-xs px-2 py-1 ${statusColor[tarefa.status] || "bg-gray-600"}`}
          >
            {tarefa.status.toUpperCase()}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-gray-300">{tarefa.descricao}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{tarefa.cliente_nome}</span>
          <span className={`${prioridadeColor[tarefa.prioridade || "media"]}`}>
            {tarefa.prioridade?.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Prazo: <span className="text-gray-300">{tarefa.prazo}</span>
        </p>
      </CardContent>
    </Card>
  );
}
