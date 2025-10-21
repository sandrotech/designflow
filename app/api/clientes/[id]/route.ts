import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "clientes.json");

async function readClientes() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeClientes(clientes: any[]) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(clientes, null, 2));
}

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const clientes = await readClientes();
    const cliente = clientes.find((c: any) => c.id === params.id);
    if (!cliente)
        return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 });
    return NextResponse.json(cliente);
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const updated = await req.json();
    const clientes = await readClientes();
    const idx = clientes.findIndex((c: any) => c.id === params.id);

    if (idx === -1)
        return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 });

    clientes[idx] = { ...clientes[idx], ...updated };
    await writeClientes(clientes);

    return NextResponse.json(clientes[idx]);
}

export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const clientes = await readClientes();
    const novos = clientes.filter((c: any) => c.id !== params.id);
    await writeClientes(novos);
    return NextResponse.json({ success: true });
}
