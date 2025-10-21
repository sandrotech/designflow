import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "demandas.json");

// 🔹 Funções auxiliares
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

// 🔹 GET - Lista todas as demandas
export async function GET() {
    const demandas = await readDemandas();
    return NextResponse.json(demandas);
}

// 🔹 POST - Cria uma nova demanda
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const demandas = await readDemandas();

        const id = `D-${String(demandas.length + 1).padStart(3, "0")}`;
        const novaDemanda = {
            id,
            cliente: body.cliente || "Cliente não informado",
            formatos: body.formatos || [],
            modoCompleto: body.modoCompleto || false,
            copy: body.copy || "",
            prazo: body.prazo || "",
            nivel: body.nivel || "Padrão (48h úteis)",
            antecipada: body.antecipada || "Não",
            links: body.links || "",
            status: body.status || "Pendente",
            dataCriacao: new Date().toISOString(),
            ...body,
        };

        demandas.push(novaDemanda);
        await writeDemandas(demandas);

        return NextResponse.json(novaDemanda, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar demanda:", error);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
