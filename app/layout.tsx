import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "王子茗 · AI Agent 开发作品集",
  description: "王子茗的 AI Agent 与全栈产品作品集，记录从需求定义到迭代交付的过程。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
