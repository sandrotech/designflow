import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "data", "projetos.json");

type Projeto = {
  id: string;
  nome: string;
  cliente: string;
  status: "Briefing" | "Planejamento" | "Produção" | "Aprovação" | "Entregue";
  prazo: string;
  responsavel?: string;
  equipe?: string;
  inicio?: string;
  entrega?: string;
  objetivo?: string;
  escopo?: string;
  cronograma?: string;
  orcamento?: string;
  createdAt?: string;
  updatedAt?: string;
};

async function ensureFile() {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  try { await fs.access(FILE); } catch { await fs.writeFile(FILE, "[]", "utf-8"); }
}
async function readList(): Promise<Projeto[]> {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf-8").catch(() => "[]");
  return JSON.parse(raw || "[]");
}
async function writeList(list: Projeto[]) {
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const list = await readList();
  const item = list.find(p => p.id === params.id);
  if (!item) return NextResponse.json({ detail: "Não encontrado" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await req.json() as Partial<Projeto>;
    const list = await readList();
    const idx = list.findIndex(p => p.id === params.id);
    if (idx === -1) return NextResponse.json({ detail: "Não encontrado" }, { status: 404 });

    list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
    await writeList(list);
    return NextResponse.json(list[idx]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ detail: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const list = await readList();
  const idx = list.findIndex(p => p.id === params.id);
  if (idx === -1) return NextResponse.json({ detail: "Não encontrado" }, { status: 404 });
  const removed = list.splice(idx, 1)[0];
  await writeList(list);
  return NextResponse.json(removed);
}
