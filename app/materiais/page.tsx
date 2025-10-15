"use client";

import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Save } from "lucide-react";

export default function MateriaisPage() {
  const [form, setForm] = useState({
    cliente: "",
    logo: "",
    paleta: "",
    tipografia: "",
    referencias: "",
    observacoes: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, logo: url }));
    }
  };

  const salvar = () => {
    console.log("Dados salvos:", form);
  };

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Materiais e Identidade Visual
      </h1>

      <GlassCard title="Informações de Identidade" gradient="from-blue-500 to-cyan-500">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            placeholder="Cliente / Agência"
            className="input-glass"
            value={form.cliente}
            onChange={(e) => handleChange("cliente", e.target.value)}
          />

          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              id="logo-upload"
              className="hidden"
            />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer button-glow px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Enviar Logo
            </label>
            {form.logo && (
              <img
                src={form.logo}
                alt="Logo"
                className="w-12 h-12 object-cover rounded-lg border border-white/10"
              />
            )}
          </div>

          <Input
            placeholder="Paleta de cores (ex: #000000, #FFFFFF)"
            className="input-glass"
            value={form.paleta}
            onChange={(e) => handleChange("paleta", e.target.value)}
          />
          <Input
            placeholder="Tipografia (ex: Poppins, Montserrat)"
            className="input-glass"
            value={form.tipografia}
            onChange={(e) => handleChange("tipografia", e.target.value)}
          />
        </div>
      </GlassCard>

      <GlassCard title="Referências e Observações" gradient="from-purple-500 to-pink-500">
        <Textarea
          placeholder="Links de referência, observações, conceitos de design..."
          className="textarea-glass"
          value={form.referencias}
          onChange={(e) => handleChange("referencias", e.target.value)}
        />

        <Textarea
          placeholder="Observações adicionais (briefing, feedback, etc.)"
          className="textarea-glass mt-3"
          value={form.observacoes}
          onChange={(e) => handleChange("observacoes", e.target.value)}
        />

        <Button onClick={salvar} className="button-glow mt-4 flex items-center gap-2">
          <Save className="w-4 h-4" /> Salvar Informações
        </Button>
      </GlassCard>
    </div>
  );
}
