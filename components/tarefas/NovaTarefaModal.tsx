"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tarefa } from "@/entities/Tarefa";

interface NovaTarefaModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (tarefa: Tarefa) => void;
}

export function NovaTarefaModal({ open, onClose, onCreate }: NovaTarefaModalProps) {
  const [novaTarefa, setNovaTarefa] = useState<Tarefa>({
    titulo: "",
    cliente_nome: "",
    prazo: "",
    prioridade: "media",
    status: "pendente",
  });

  const handleChange = (field: keyof Tarefa, value: string) => {
    setNovaTarefa((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!novaTarefa.titulo.trim()) return;
    onCreate(novaTarefa);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/70 backdrop-blur-lg border border-white/10 text-gray-100">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            className="input-glass"
            placeholder="Título"
            value={novaTarefa.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
          />
          <Input
            className="input-glass"
            placeholder="Cliente"
            value={novaTarefa.cliente_nome}
            onChange={(e) => handleChange("cliente_nome", e.target.value)}
          />
          <Input
            className="input-glass"
            type="date"
            value={novaTarefa.prazo}
            onChange={(e) => handleChange("prazo", e.target.value)}
          />
          <Textarea
            className="textarea-glass"
            placeholder="Descrição"
            value={novaTarefa.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
          />
          <Button onClick={handleSubmit} className="button-glow w-full mt-3">
            Criar Tarefa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
