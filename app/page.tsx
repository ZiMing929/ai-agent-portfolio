"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, GitBranch, Mail, MapPin } from "lucide-react";

const initialProjects = [
  { id: "P-001", title: "个人效率工作台", description: "从日常使用出发，持续迭代日历、待办与个人工作流。", role: "产品定义 · Agent 协作 · 测试部署", status: "持续迭代", featured: true, href: "https://8a8f23373c9e417d88eb34507fb2b99e.bj9.agentos-app.net/?restart=true", tags: ["WorkBuddy", "产品迭代", "工作流"] },
  { id: "P-002", title: "临港每日天气", description: "从固定地点天气页，迭代为支持主动城市检索的生活工具。", role: "需求补全 · 页面验收 · 部署", status: "已上线", href: "https://daily-weather-lingang-0905.wangziming88.chatgpt.site/", tags: ["Codex", "Skills", "天气"] },
  { id: "P-003", title: "番茄时刻", description: "包含任务设定、专注统计与通知设置的完整番茄钟。", role: "需求设计 · Agent 协作 · 调试", status: "已上线", href: "https://fanqie-shike.wangziming88.chatgpt.site/", tags: ["专注工具", "交互", "通知"] },
  { id: "P-004", title: "离线开发日志", description: "面向本地开发过程的离线记录与复盘实验。", role: "产品构思 · 页面验收 · 部署", status: "实验中", href: "https://offline-dev-journal.wangziming88.chatgpt.site/", tags: ["离线优先", "开发日志", "实验"] },
  { id: "P-005", title: "上海无畏 2026", description: "围绕城市主题展开的内容型网页设计与发布实验。", role: "内容结构 · 视觉反馈 · 部署", status: "已上线", href: "https://shanghai-fearless-2026.wangziming88.chatgpt.site/", tags: ["城市专题", "网页设计", "内容"] },
];

export default function Home() {
  const [projects, setProjects] = useState(initialProjects);
  useEffect(() => {
    fetch("/api/projects").then(response => response.ok ? response.json() : []).then(saved => {
      if (!Array.isArray(saved) || saved.length === 0) return;
      const map = new Map(initialProjects.map(project => [project.id, project]));
      for (const project of saved) project.hidden ? map.delete(project.id) : map.set(project.id, project);
      setProjects(Array.from(map.values()));
    }).catch(() => undefined);
  }, []);
  return <main>
    <nav className="topbar" aria-label="主导航"><a className="brand" href="#top" aria-label="返回首页"><span className="brand-mark">WZ</span><span>王子茗 / PORTFOLIO</span></a><div className="nav-links"><a href="#projects">项目</a><a href="#method">方法</a><a href="#contact">联系</a></div></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">AI AGENT DEVELOPMENT · SHANGHAI</p><h1>把需求变成<br/><span>可用的小产品。</span></h1><p className="hero-intro">软件工程硕士在读。通过 Codex、WorkBuddy、Skills 与 MCP 完成产品定义、Agent 协作、调试和部署，正在系统补齐独立工程能力。</p><div className="hero-actions"><a className="button primary" href="#projects">查看项目</a><a className="button ghost" href="mailto:ningxiao929@gmail.com">联系我 <ArrowUpRight size={16}/></a></div></div><aside className="availability" aria-label="求职信息"><div className="availability-head"><span className="status-dot"/><span>OPEN TO INTERNSHIP</span></div><dl><div><dt>目标岗位</dt><dd>AI Agent / 全栈开发</dd></div><div><dt>教育背景</dt><dd>上海海事大学 · 软件工程</dd></div><div><dt>当前阶段</dt><dd>研二</dd></div><div><dt>到岗安排</dt><dd>可全天到岗 · 6 个月以上</dd></div></dl></aside></section>
    <section className="project-section" id="projects"><header className="section-head"><div><p className="eyebrow">SELECTED BUILDS</p><h2>产品不是一次完成的。</h2></div><p>从可用版本开始，在真实使用中发现缺口，再推动下一次改进。</p></header><div className="project-list">{projects.map((project)=><article className={`project-row ${project.featured?"featured":""}`} key={project.id}><div className="project-index"><span>{project.id}</span>{project.featured&&<strong>主项目</strong>}</div><div className="project-main"><div className="project-title-line"><h3>{project.title}</h3><span className="project-status">{project.status}</span></div><p>{project.description}</p><span className="project-role">我的工作：{project.role}</span><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`打开${project.title}`}><ArrowUpRight size={22}/></a></article>)}</div></section>
    <section className="method" id="method"><div className="method-heading"><p className="eyebrow">HOW I BUILD</p><h2>以迭代形成能力，<br/>以交付验证判断。</h2></div><ol className="iteration-track"><li><span>01</span><div><strong>定义问题</strong><p>从真实使用场景中确认页面究竟要解决什么。</p></div></li><li><span>02</span><div><strong>编排工具</strong><p>选择合适的 Agent、Skills 与 MCP，给出清晰约束。</p></div></li><li><span>03</span><div><strong>完成可用版</strong><p>先跑通最小闭环，再检查结构、交互与部署结果。</p></div></li><li><span>04</span><div><strong>真实使用</strong><p>记录缺失功能与使用阻力，把感受转成具体修改。</p></div></li><li><span>05</span><div><strong>再次验证</strong><p>持续迭代，保留每次决策与结果的证据。</p></div></li></ol></section>
    <footer id="contact"><div><p className="eyebrow">CONTACT</p><h2>寻找 AI Agent / 全栈开发实习机会。</h2></div><div className="contact-links"><a href="mailto:ningxiao929@gmail.com"><Mail size={18}/> ningxiao929@gmail.com</a><a href="https://github.com/ZiMing929" target="_blank" rel="noreferrer"><GitBranch size={18}/> github.com/ZiMing929</a><span><MapPin size={18}/> 上海</span></div><p className="footer-note">稳定 · 踏实 · 责任心强 / 持续更新中</p></footer>
  </main>;
}
