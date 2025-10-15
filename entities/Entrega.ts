export interface Entrega {
  id?: string;
  nome_arte: string;
  contato_id: string;
  arquivo_url: string;
  comentarios?: string;
  status?: "pendente" | "aprovado" | "reprovado";
}

export const Entrega = {
  async list(): Promise<Entrega[]> {
    return [];
  },
  async create(data: Entrega) {
    console.log("Entrega criada:", data);
  },
};
