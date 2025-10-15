"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/GlassCard";
import { Contato } from "@/entities/Contato";
import { Servico } from "@/entities/Servico";
import { TabelaPrecos } from "@/components/cadastros/TabelaPrecos";
import { PlusCircle } from "lucide-react";

export default function CadastrosPage() {
  const [aba, setAba] = useState("clientes");

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Cadastros
      </h1>

      <Tabs value={aba} onValueChange={setAba}>
        <TabsList className="bg-black/40 backdrop-blur-lg border border-white/10">
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="precos">Preços Especiais</TabsTrigger>
        </TabsList>

        {/* CLIENTES */}
        <TabsContent value="clientes" className="space-y-6 mt-4">
          <GlassCard title="Novo Cliente" gradient="from-cyan-500 to-blue-500">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Nome" className="input-glass" />
              <Input placeholder="E-mail" className="input-glass" />
              <Input placeholder="Telefone" className="input-glass" />
              <Input placeholder="Empresa" className="input-glass" />
            </div>
            <Button className="button-glow mt-4 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Salvar Cliente
            </Button>
          </GlassCard>

          <GlassCard title="Clientes Cadastrados" gradient="from-blue-500 to-purple-500">
            <p className="text-sm text-gray-400">Listagem futura...</p>
          </GlassCard>
        </TabsContent>

        {/* SERVIÇOS */}
        <TabsContent value="servicos" className="space-y-6 mt-4">
          <GlassCard title="Novo Serviço" gradient="from-purple-500 to-pink-500">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Nome do serviço" className="input-glass" />
              <Input placeholder="Valor (R$)" type="number" className="input-glass" />
            </div>
            <Button className="button-glow mt-4 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Salvar Serviço
            </Button>
          </GlassCard>

          <GlassCard title="Serviços Cadastrados" gradient="from-pink-500 to-rose-500">
            <p className="text-sm text-gray-400">Listagem futura...</p>
          </GlassCard>
        </TabsContent>

        {/* PREÇOS ESPECIAIS */}
        <TabsContent value="precos" className="space-y-6 mt-4">
          <TabelaPrecos />
        </TabsContent>
      </Tabs>
    </div>
  );
}
