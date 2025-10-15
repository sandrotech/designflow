export interface Contato {
  id?: string;
  nome: string;
  email?: string;
  telefone?: string;
  empresa?: string;
  tipo: "cliente_final" | "agencia";
  foto_url?: string;
  briefing?: string;
  logo_url?: string;
  paleta_cores?: string;
  tipografia?: string;
  referencias?: string;
  observacoes?: string;
}

export const Contato = {
  async list(): Promise<Contato[]> {
    // simulação de fetch
    return [];
  },
  async create(data: Contato) {
    console.log("Contato criado:", data);
  },
  async filter(params: Partial<Contato>): Promise<Contato[]> {
    console.log("Filtro de contatos:", params);
    return [];
  },
};
