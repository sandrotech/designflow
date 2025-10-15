export interface Servico {
  id?: string;
  nome: string;
  valor: number;
}

export const Servico = {
  async list(): Promise<Servico[]> {
    return [];
  },
  async create(data: Servico) {
    console.log("Serviço criado:", data);
  },
};
