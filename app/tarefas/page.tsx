"use client";

const COLS = [
  { key: "backlog", title: "Backlog" },
  { key: "producao", title: "Produção" },
  { key: "aprovacao", title: "Aprovação" },
  { key: "pronto", title: "Pronto" },
];

const CARDS = {
  backlog: ["Explorar referências", "Definir paleta do cliente X"],
  producao: ["Layout da landing", "Roteiro de vídeo"],
  aprovacao: ["Manual de marca v1"],
  pronto: ["Logo finalizado", "Posts aprovados"],
} as Record<string, string[]>;

export default function TarefasPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-6">
        Tarefas
      </h1>

      <div className="grid md:grid-cols-4 gap-4">
        {COLS.map((col) => (
          <div key={col.key} className="glass-card border border-amber-200/10 p-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">{col.title}</p>
              <span className="text-xs text-gray-400">{CARDS[col.key].length}</span>
            </div>
            <div className="space-y-3">
              {CARDS[col.key].map((t) => (
                <div key={t} className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                  {t}
                </div>
              ))}
              <button className="w-full text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
                Nova tarefa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
