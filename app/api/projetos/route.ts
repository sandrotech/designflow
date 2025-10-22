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
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

async function writeList(list: Projeto[]) {
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
}

function nextId(list: Projeto[]) {
  const n = Math.max(0, ...list.map(p => Number((p.id || "").replace(/\D/g, "")) || 0)) + 1;
  return `P-${String(n).padStart(3, "0")}`;
}

export async function GET() {
  const list = await readList();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Partial<Projeto>;
    if (!body.nome || !body.cliente) {
      return NextResponse.json({ detail: "Campos obrigatórios: nome, cliente" }, { status: 400 });
    }

    const list = await readList();
    const novo: Projeto = {
      id: nextId(list),
      nome: body.nome!,
      cliente: body.cliente!,
      status: (body.status as Projeto["status"]) || "Briefing",
      prazo: body.prazo || "",
      responsavel: body.responsavel || "",
      equipe: body.equipe || "",
      inicio: body.inicio || "",
      entrega: body.entrega || "",
      objetivo: body.objetivo || "",
      escopo: body.escopo || "",
      cronograma: body.cronograma || "",
      orcamento: body.orcamento || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.push(novo);
    await writeList(list);
    return NextResponse.json(novo, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ detail: "Erro ao salvar" }, { status: 500 });
  }
}
