# 域名设置与配置

Docker 容器以 `email` 配置文件运行后，您可以在 DockFlare Web 界面中开始自动化设置流程。

## 邮件设置向导

1.  在左侧边栏中导航到 **邮件** 页面。
2.  点击 **设置邮件域名**。
3.  选择要配置的 **Cloudflare 区域**（域名）。
4.  点击 **确认设置**。

### 设置过程中发生了什么？
DockFlare 通过 Cloudflare API 执行以下自动化步骤：
*   在您的区域**启用邮件路由**。
*   **配置 DNS：** 创建 Cloudflare Email Routing 所需的 MX 记录、SPF (TXT)、DMARC (TXT) 和 DKIM (CNAME) 记录。
*   **预置存储：** 创建专用的 R2 存储桶用于临时中转缓冲。
*   **部署 Worker：** 部署一个 Inbound Worker（接收邮件）和一个 Outbound Worker（发送邮件）。
*   **初始化 KV：** 创建 Cloudflare KV 命名空间，在边缘追踪邮箱配额。

## 验证 DNS 健康状态

DNS 更改可能需要一定时间传播。在邮件页面上，您将看到 **DNS 记录** 卡片。
*   点击 **验证 DNS** 以检查 MX、SPF 和 DMARC 记录的当前状态。（DKIM 由 Cloudflare Email Routing 自动管理，此处不单独验证。）
*   当记录在公共 DNS 中正确检测到后，系统将显示绿色徽章。

## 更新/重新部署 Worker

如果您更新了 DockFlare 版本或更改了 API 权限，可能需要刷新 Worker。
*   点击 **重新部署 Worker** 按钮。
*   这将重新上传最新的 Worker 逻辑并重新同步所有绑定（R2、KV、Webhook 密钥），而不会影响已存储的邮件数据。

## 删除域名

如果您希望停止为某个域名托管邮件：
*   点击 **删除域名**。
*   这将从 Cloudflare 中删除路由规则、Inbound/Outbound Worker、R2 中转存储桶和 DNS 记录。
*   **注意：** 此操作*不会*删除 `mail_data` 卷中的本地邮件数据。如果还要清除存储在服务器上的邮件和附件，请在删除对话框中启用 **包含本地数据**。
