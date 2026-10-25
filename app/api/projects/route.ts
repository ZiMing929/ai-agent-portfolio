import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
const OWNER = "ningxiao929@gmail.com";
export async function GET() {
  try {
    const result = await env.DB.prepare("SELECT id,title,description,role,status,href,tags,hidden FROM projects ORDER BY created_at DESC").all();
    return Response.json(result.results.map((row: any) => ({ ...row, hidden: Boolean(row.hidden), tags: JSON.parse(row.tags || "[]") })));
  } catch { return Response.json([]); }
}
export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== OWNER) return Response.json({ error: "无权操作" }, { status: 403 });
  const body = await request.json() as Record<string, unknown>;
  const title = String(body.title || "").trim(), href = String(body.href || "").trim();
  if (!title || !href) return Response.json({ error: "项目名称和链接不能为空" }, { status: 400 });
  const id = String(body.id || `P-${Date.now()}`);
  const tags = Array.isArray(body.tags) ? body.tags.slice(0,8).map(String) : [];
  await env.DB.prepare("INSERT INTO projects (id,title,description,role,status,href,tags,hidden,created_at) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,description=excluded.description,role=excluded.role,status=excluded.status,href=excluded.href,tags=excluded.tags,hidden=0")
    .bind(id,title,String(body.description||""),String(body.role||"需求设计 · Agent 协作 · 部署"),String(body.status||"持续迭代"),href,JSON.stringify(tags),0,Date.now()).run();
  return Response.json({ ok:true,id });
}
export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== OWNER) return Response.json({ error:"无权操作" }, { status:403 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error:"缺少项目 ID" }, { status:400 });
  await env.DB.prepare("INSERT INTO projects (id,title,description,role,status,href,tags,hidden,created_at) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET hidden=1").bind(id,"已隐藏项目","","","已隐藏","#","[]",1,Date.now()).run();
  return Response.json({ ok:true });
}
