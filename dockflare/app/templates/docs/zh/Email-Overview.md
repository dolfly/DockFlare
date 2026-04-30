# 邮件套件概述

DockFlare Email 是一套完全自托管的主权电子邮件系统，构建于现有的 DockFlare 基础设施之上。它旨在将云端邮件服务的便利性与自托管的隐私性和掌控力完美结合。

## 主权电子邮件理念

传统上，自托管电子邮件服务器因「家庭 IP 黑名单」问题而困难重重——住宅 IP 地址会被主流邮件服务商屏蔽。DockFlare 通过将 Cloudflare 用作**无状态投递网络**来解决这一问题：

1.  **Cloudflare** 负责繁重的工作：SMTP 投递、MX 路由和临时缓冲。
2.  **DockFlare** 拥有数据所有权。您的邮件、附件和邮箱配置均存储在您自己的硬件上。

任何邮件内容都不会永久存储在 Cloudflare 基础设施中。邮件在传输过程中会短暂缓存于 R2 存储桶，并在本地 Mail Manager 处理完成后立即清除。

## 架构

系统由多个集成组件构成：

*   **收件流程：** 互联网 → Cloudflare 邮件路由 → Inbound Worker → R2 缓冲 → DockFlare Mail Manager Webhook → 本地存储。
*   **发件流程：** 网页邮件界面 → Mail Manager API → Outbound Worker → Cloudflare `send_email` → 互联网。
*   **数据主权：** 所有邮件均在本地 SQLite 数据库中解析和存储，附件保存于本地文件系统。

## 核心功能

*   **多域名支持：** 为您在 Cloudflare 中管理的任意数量的域名托管电子邮件。
*   **边缘配额执行：** 邮箱已满？Cloudflare Workers 在邮件到达您的服务器之前就在 SMTP 层面拒绝（5.2.2），节省带宽。
*   **全文检索：** 通过 SQLite FTS5 实现对所有邮件的闪电级搜索。
*   **隐私优先：** 所有 API 交互使用 EdDSA JWT 认证。HTML 邮件内容在渲染前经过净化，防止 XSS 攻击和追踪像素。
*   **PWA 网页邮件：** 现代化、移动端响应式的网页邮件客户端，可安装到手机或桌面。
*   **推送通知：** 通过 Web Push (VAPID) 实时接收新邮件提醒。
*   **高可用性：** 若您的服务器离线，Cloudflare R2 将缓冲传入邮件，并每 5 分钟自动重试投递。
