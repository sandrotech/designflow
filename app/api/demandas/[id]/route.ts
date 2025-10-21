import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "demandas.json");

async function readDemandas() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeDemandas(demandas: any[]) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(demandas, null, 2));
}

// GET - Buscar uma demanda específica
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const demandas = await readDemandas();
    const demanda = demandas.find((d: any) => d.id === params.id);
    if (!demanda)
        return NextResponse.json({ message: "Demanda não encontrada" }, { status: 404 });
    return NextResponse.json(demanda);
}

// PUT - Atualizar demanda
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const demandas = await readDemandas();
        const index = demandas.findIndex((d: any) => d.id === params.id);
        if (index === -1)
            return NextResponse.json({ message: "Demanda não encontrada" }, { status: 404 });

        demandas[index] = { ...demandas[index], ...body };
        await writeDemandas(demandas);
        return NextResponse.json(demandas[index]);
    } catch (error) {
        console.error("Erro ao atualizar demanda:", error);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}

// DELETE - Excluir demanda
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const demandas = await readDemandas();
        const novas = demandas.filter((d: any) => d.id !== params.id);
        await writeDemandas(novas);
        return NextResponse.json({ message: "Demanda excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir demanda:", error);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
