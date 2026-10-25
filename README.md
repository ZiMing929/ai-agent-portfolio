# 王子茗 · AI Agent 开发作品集

一个基于 Vinext、React、TypeScript 与 Cloudflare Workers 构建的个人作品集。公开页面展示项目与求职信息，`/admin` 提供登录保护的项目管理功能。

## 在 WebStorm 中运行

1. 安装 Node.js 22.13 或更高版本。
2. 在 WebStorm 中选择“打开”，打开本项目根目录。
3. 打开 WebStorm Terminal，运行：

```bash
npm install
npm run dev
```

4. 浏览器打开终端中显示的本地地址，通常是 `http://localhost:5173`。

`package.json` 已配置以下脚本：

- `npm run dev`：启动开发服务器并支持热更新。
- `npm run build`：构建生产版本。
- `npm run start`：本地预览构建后的 Worker。
- `npm run db:generate`：修改数据库结构后生成迁移。

## 上传到 GitHub

可以直接把这个目录作为 GitHub 仓库提交：

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

GitHub 可以托管源码，但 GitHub Pages 不能直接运行本项目的 Worker、D1 数据库和登录后台。若只需要展示静态首页，可以另做静态导出；要保留完整后台功能，建议继续使用当前 Sites 部署，或把 GitHub 仓库连接到支持服务端运行和数据库的平台。

## 项目结构

- `app/page.tsx`：作品集首页。
- `app/admin/`：受保护的项目管理后台。
- `app/api/projects/`：项目增删接口。
- `db/` 与 `drizzle/`：D1 数据库结构与迁移。
- `public/`：站点图标等静态资源。

## 当前求职信息

- 当前阶段：研二
- 到岗安排：可全天到岗
- 实习时长：6 个月以上
