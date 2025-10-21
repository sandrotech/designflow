export default function PropostasPage() {
    const data = [
        { cod: "PR-101", cliente: "Studio Wave", projeto: "Identidade Visual", valor: "R$ 3.500", status: "Enviada" },
        { cod: "PR-102", cliente: "Silva & Associados", projeto: "Campanha Novembro", valor: "R$ 8.200", status: "Aprovada" },
    ];

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    Propostas
                </h1>
                <div className="flex gap-2">
                    <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs">Modelo</button>
                    <button className="px-3 py-2 rounded-lg bg-amber-400/20 text-amber-200 border border-amber-300/40 text-xs">Nova proposta</button>
                </div>
            </div>

            <div className="glass-card border border-amber-200/10">
                <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
                    <div className="col-span-2">Código</div>
                    <div className="col-span-3">Cliente</div>
                    <div className="col-span-3">Projeto</div>
                    <div className="col-span-2">Valor</div>
                    <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y divide-white/10">
                    {data.map((p) => (
                        <div key={p.cod} className="grid grid-cols-12 px-4 py-4">
                            <div className="col-span-2 text-amber-200">{p.cod}</div>
                            <div className="col-span-3">{p.cliente}</div>
                            <div className="col-span-3 text-gray-300">{p.projeto}</div>
                            <div className="col-span-2">{p.valor}</div>
                            <div className="col-span-2"><span className="badge-demo">{p.status}</span></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
