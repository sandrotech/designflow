"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tarefa } from "@/entities/Tarefa";

interface HistoricoModalProps {
  open: boolean;
  onClose: () => void;
  tarefa: Tarefa | null;
}

export function HistoricoModal({ open, onClose, tarefa }: HistoricoModalProps) {
  if (!tarefa) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/70 border border-white/10 text-gray-100">
        <DialogHeader>
          <DialogTitle>Histórico de Revisões</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-64">
          <div className="space-y-4 mt-2">
            {tarefa.historico_revisoes?.length ? (
              tarefa.historico_revisoes.map((rev, i) => (
                <div key={i} className="border-b border-white/10 pb-2">
                  <p className="text-sm text-gray-200">{rev.comentario}</p>
                  <p className="text-xs text-gray-400">
                    Data: {rev.data} •{" "}
                    <a
                      href={rev.arquivo_url}
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      Ver Arquivo
                    </a>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Nenhum histórico registrado.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
