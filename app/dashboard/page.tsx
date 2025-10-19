export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-6 pb-24">
      {/* Hero */}
{/* Hero futurista */}
<section className="relative text-center mb-12">
  {/* Linha sutil decorativa por trás */}
  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[260px] h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-[1px]" />

  {/* Título */}
  <h1
    className="
      text-4xl md:text-5xl font-extrabold tracking-tight relative z-10
      bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300
      bg-clip-text text-transparent animate-gradient-x
      drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]
    "
    style={{
      WebkitTextStroke: "1px rgba(250,204,21,0.15)",
    }}
  >
    <span className="inline-block mr-2">Bem-vindo de volta</span>
    <span className="inline-block animate-pulse">👋</span>
  </h1>

  {/* Subtítulo */}
  <p className="text-sm text-gray-400 mt-3 max-w-[540px] mx-auto leading-relaxed">
    Acompanhe seus números, metas e módulos em tempo real.
  </p>
</section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { t: "Projetos ativos", v: "03" },
          { t: "Faturamento (mês)", v: "R$ 7.200" },
          { t: "Tarefas em aprovação", v: "08" },
          { t: "Pendências (cliente)", v: "02" },
        ].map((k) => (
          <div
            key={k.t}
            className="glass-card p-5 text-center border border-amber-200/10 hover:border-amber-300/30 transition"
          >
            <p className="text-[13px] text-gray-400">{k.t}</p>
            <p className="mt-1 text-xl font-semibold text-amber-300">{k.v}</p>
          </div>
        ))}
      </section>

      {/* Ações rápidas */}
      <section className="glass-card p-6 border border-amber-200/10 mb-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 className="text-base font-semibold">Ações rápidas</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gray-100 transition">Criar projeto</button>
            <button className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/25 text-xs text-amber-200 border border-amber-300/40 transition">Nova tarefa</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Novo cliente", d: "Cadastre um cliente" },
            { t: "Criar proposta", d: "Gere uma proposta visual" },
            { t: "Upload de materiais", d: "Envie logos e guias" },
            { t: "Abrir tarefas", d: "Gerencie demandas" },
            { t: "Relatórios", d: "Veja desempenho" },
            { t: "Configurações", d: "Metas e permissões" },
          ].map((x) => (
            <button
              key={x.t}
              className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition group"
            >
              <p className="text-sm font-medium">{x.t}</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{x.d}</p>
              <span className="block mt-3 h-px w-0 bg-amber-400/60 group-hover:w-full transition-all" />
            </button>
          ))}
        </div>
      </section>

      {/* Últimos projetos */}
      <section className="glass-card p-6 border border-amber-200/10">
        <h3 className="text-base font-semibold mb-4">Últimos projetos</h3>
        <div className="divide-y divide-white/10">
          {[
            { n: "Campanha Novembro - Silva & Associados", s: "Em produção" },
            { n: "Identidade Visual - Studio Wave", s: "Aguardando aprovação" },
            { n: "Pacote Social Media - Agência Cria+", s: "Aprovado" },
          ].map((p) => (
            <div key={p.n} className="py-4 flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium">{p.n}</p>
                <p className="text-[12px] text-gray-400">Status: {p.s}</p>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition">
                Abrir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
