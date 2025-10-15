"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { User } from "@/entities/User";

type Metas = {
  meta_diaria: number;
  meta_semanal: number;
  meta_mensal: number;
};

type Acessos = {
  [modulo: string]: boolean;
};

type Configuracoes = {
  metas: Metas;
  acessos: Acessos;
};

type Usuario = {
  configuracoes: Configuracoes;
};

export default function ConfiguracoesPage() {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    (async () => {
      const data = (await User.me()) as Usuario;
      setUser(data);
    })();
  }, []);

  if (!user) return null;

  const handleMetaChange = (field: keyof Metas, value: number) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            configuracoes: {
              ...prev.configuracoes,
              metas: { ...prev.configuracoes.metas, [field]: value },
            },
          }
        : prev
    );
  };

  const handleAcessoChange = (modulo: string) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            configuracoes: {
              ...prev.configuracoes,
              acessos: {
                ...prev.configuracoes.acessos,
                [modulo]: !prev.configuracoes.acessos[modulo],
              },
            },
          }
        : prev
    );
  };

  const salvar = async () => {
    await User.updateMyUserData(user);
    console.log("Configurações salvas:", user);
  };

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Configurações
      </h1>

      <GlassCard title="Metas de Faturamento" gradient="from-green-500 to-emerald-600">
        <div className="grid sm:grid-cols-3 gap-3">
          <Input
            type="number"
            placeholder="Meta Diária"
            className="input-glass"
            value={user.configuracoes.metas.meta_diaria}
            onChange={(e) => handleMetaChange("meta_diaria", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Meta Semanal"
            className="input-glass"
            value={user.configuracoes.metas.meta_semanal}
            onChange={(e) => handleMetaChange("meta_semanal", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Meta Mensal"
            className="input-glass"
            value={user.configuracoes.metas.meta_mensal}
            onChange={(e) => handleMetaChange("meta_mensal", Number(e.target.value))}
          />
        </div>
      </GlassCard>

      <GlassCard title="Acessos por Módulo" gradient="from-blue-500 to-purple-500">
        <div className="space-y-3">
          {["Dashboard", "Tarefas", "Cadastros", "Materiais", "Relatórios"].map((mod) => (
            <div
              key={mod}
              className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-lg"
            >
              <span className="text-sm">{mod}</span>
              <Switch
                checked={user.configuracoes.acessos[mod]}
                onCheckedChange={() => handleAcessoChange(mod)}
              />
            </div>
          ))}
        </div>
      </GlassCard>

      <Button onClick={salvar} className="button-glow flex items-center gap-2">
        <Save className="w-4 h-4" /> Salvar Configurações
      </Button>
    </div>
  );
}
