export default function EntregasPage() {
    const items = [
        { projeto: "Campanha Novembro", item: "KV + 8 posts", versao: "v2", status: "Aguardando aprovação" },
        { projeto: "Identidade Visual - Studio Wave", item: "Logo + Manual", versao: "final", status: "Entregue" },
    ];

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-6">
                Entregas
            </h1>

            <div className="glass-card border border-amber-200/10">
                <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
                    <div className="col-span-4">Projeto</div>
                    <div className="col-span-4">Entrega</div>
                    <div className="col-span-2">Versão</div>
                    <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y divide-white/10">
                    {items.map((e, i) => (
                        <div key={i} className="grid grid-cols-12 px-4 py-4">
                            <div className="col-span-4">{e.projeto}</div>
                            <div className="col-span-4 text-gray-300">{e.item}</div>
                            <div className="col-span-2">{e.versao}</div>
                            <div className="col-span-2">
                                <span className="badge-demo">{e.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
