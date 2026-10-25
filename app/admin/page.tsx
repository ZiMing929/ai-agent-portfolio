import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import AdminPanel from "./admin-panel";
import "./admin.css";
export const dynamic="force-dynamic";
export default async function AdminPage(){const user=await requireChatGPTUser("/admin");if(user.email.toLowerCase()!=="ningxiao929@gmail.com")return <main className="admin-shell"><h1>无权访问</h1><p>此后台仅向作品集所有者开放。</p></main>;return <main><div className="admin-account">已登录：{user.email} · <a href={chatGPTSignOutPath("/")} target="_top">退出</a></div><AdminPanel/></main>}
