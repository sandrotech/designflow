export interface PrecoEspecial {
  id?: string;
  servico_id: string;
  contato_id: string;
  valor_especial: number;
}

export const PrecoEspecial = {
  async filter(params: Partial<PrecoEspecial>): Promise<PrecoEspecial[]> {
    return [];
  },
  async create(data: PrecoEspecial) {
    console.log("Preço especial criado:", data);
  },
  async update(id: string, data: Partial<PrecoEspecial>) {
    console.log("Preço especial atualizado:", id, data);
  },
};
