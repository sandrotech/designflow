export interface User {
  id?: string;
  nome?: string;
  email?: string;
  configuracoes?: {
    metas?: {
      meta_diaria: number;
      meta_semanal: number;
      meta_mensal: number;
    };
    acessos?: Record<string, boolean>;
  };
}

export const User = {
  async me(): Promise<User> {
    return {
      nome: "Usuário Teste",
      email: "teste@designflow.dev",
      configuracoes: {
        metas: { meta_diaria: 250, meta_semanal: 1250, meta_mensal: 5000 },
        acessos: {},
      },
    };
  },
  async updateMyUserData(data: Partial<User>) {
    console.log("Configurações atualizadas:", data);
  },
};
