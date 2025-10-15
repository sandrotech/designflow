export interface Projeto {
  id?: string;
  nome: string;
  contato_id: string;
  servico_id?: string;
  valor: number;
  status?: "a_fazer" | "em_andamento" | "concluido" | "pago";
}

export const Projeto = {
  async list(): Promise<Projeto[]> {
    return [];
  },
};
