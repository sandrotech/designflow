import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "clientes.json");

export async function GET() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const clientes = JSON.parse(data);
        return NextResponse.json(clientes);
    } catch (error) {
        // se o arquivo ainda não existir
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    try {
        const novoCliente = await req.json();

        // Lê arquivo existente (ou cria)
        let clientes: any[] = [];
        try {
            const data = await fs.readFile(filePath, "utf-8");
            clientes = JSON.parse(data);
        } catch {
            clientes = [];
        }

        // Adiciona um ID simples automático
        const id = `C-${String(clientes.length + 1).padStart(3, "0")}`;
        const clienteComId = { id, ...novoCliente };

        clientes.push(clienteComId);

        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(clientes, null, 2));

        return NextResponse.json(clienteComId, { status: 201 });
    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        return NextResponse.json(
            { message: "Erro ao salvar cliente" },
            { status: 500 }
        );
    }
}
