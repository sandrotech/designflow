export interface Revisao {
  arquivo_url: string;
  comentario: string;
  data: string;
}

export interface Tarefa {
  id?: string;
  titulo: string;
  descricao?: string;
  cliente_nome: string;
  servico_id?: string;
  prazo: string;
  status?: "pendente" | "em_andamento" | "revisao" | "concluida";
  prioridade?: "baixa" | "media" | "alta" | "urgente";
  arquivo_url?: string;
  historico_revisoes?: Revisao[];
  observacoes?: string;
}

export const Tarefa = {
  async list(): Promise<Tarefa[]> {
    return [];
  },
  async create(data: Tarefa) {
    console.log("Tarefa criada:", data);
  },
};
