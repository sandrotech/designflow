import path from "node:path";
import { promises as fs } from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");

export async function ensureFile(file: string, fallback: any) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(fallback, null, 2), "utf-8");
  }
}

export async function readJson<T = unknown>(file: string): Promise<T> {
  await ensureFile(file, []);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJson<T = unknown>(file: string, data: T) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}
