"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
type Project={id:string;title:string;description:string;role:string;status:string;href:string;tags:string[];hidden?:boolean};
export default function AdminPanel(){
 const [projects,setProjects]=useState<Project[]>([]); const [message,setMessage]=useState("");
 const load=()=>fetch("/api/projects").then(r=>r.json()).then(setProjects);
 useEffect(()=>{load()},[]);
 async function add(formData:FormData){setMessage("正在保存…");const payload=Object.fromEntries(formData.entries());const response=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...payload,tags:String(payload.tags||"").split(",").map(v=>v.trim()).filter(Boolean)})});setMessage(response.ok?"项目已保存":"保存失败，请检查内容");if(response.ok)load()}
 async function remove(id:string){if(!window.confirm("确定删除这个项目吗？此操作会让它从公开页面消失。"))return;const response=await fetch(`/api/projects?id=${encodeURIComponent(id)}`,{method:"DELETE"});setMessage(response.ok?"项目已删除":"删除失败");if(response.ok)load()}
 return <div className="admin-shell"><header><p className="eyebrow">PORTFOLIO ADMIN</p><h1>项目管理</h1><p>新增项目会自动出现在首页。删除前会再次确认。</p></header><form action={add} className="admin-form"><label>项目名称<input name="title" required/></label><label>线上链接<input name="href" type="url" required/></label><label>一句话简介<textarea name="description" rows={3}/></label><div className="form-grid"><label>我的工作<input name="role" placeholder="需求设计 · Agent 协作 · 部署"/></label><label>项目状态<input name="status" placeholder="持续迭代"/></label></div><label>标签（用逗号分隔）<input name="tags" placeholder="Codex, MCP, 产品迭代"/></label><button className="button primary" type="submit"><Plus size={17}/>保存项目</button><output aria-live="polite">{message}</output></form><section className="admin-list"><h2>数据库项目</h2>{projects.filter(p=>!p.hidden).length===0?<p className="empty-state">还没有通过后台添加的项目。</p>:projects.filter(p=>!p.hidden).map(project=><article key={project.id}><div><strong>{project.title}</strong><span>{project.status}</span><p>{project.description}</p></div><button type="button" onClick={()=>remove(project.id)} aria-label={`删除${project.title}`}><Trash2 size={17}/></button></article>)}</section></div>
}
