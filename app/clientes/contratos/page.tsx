"use client";

export default function ContratosPage() {
    const contratos = [
        {
            codigo: "CT-059/2024",
            vigencia: "03/12/2024 a 03/12/2025",
            ementa:
                "Contratação de Medicamentos Gerais IV para atender as necessidades da Fundação de Apoio à Gestão Integrada em Saúde de Fortaleza – FAGIFOR.",
            link: "https://pncp.gov.br/app/contratos/49286753000102/2024/45",
        },
        {
            codigo: "CT-047/2024",
            vigencia: "29/11/2024 a 29/11/2025",
            ementa:
                "Contratação de Materiais Médicos Hospitalares Gerais III para atender a FAGIFOR, itens 21, 28 e 30.",
            link: "https://pncp.gov.br/app/contratos/49286753000102/2024/42",
        },
    ];

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-8">
                Contratos
            </h1>

            <div className="glass-card border border-amber-200/10">
                <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
                    <div className="col-span-2">Código</div>
                    <div className="col-span-3">Vigência</div>
                    <div className="col-span-7">Ementa</div>
                </div>
                <div className="divide-y divide-white/10">
                    {contratos.map((c, i) => (
                        <div key={i} className="grid grid-cols-12 px-4 py-4 hover:bg-white/5 transition">
                            <div className="col-span-2 text-amber-200">
                                <a href={c.link} target="_blank" rel="noopener noreferrer">
                                    {c.codigo}
                                </a>
                            </div>
                            <div className="col-span-3">{c.vigencia}</div>
                            <div className="col-span-7 text-gray-300 text-sm">{c.ementa}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
