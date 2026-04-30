# Docker 部署（邮件配置文件）

DockFlare 邮件套件由两个额外的微服务组成：**Mail Manager** 和 **Webmail PWA**。这些服务是可选的，通过 Docker Compose 的**配置文件（profiles）**进行管理。

## 启用邮件配置文件

要启动带有邮件支持的 DockFlare，必须在 Docker Compose 命令中包含 `email` 配置文件。

### 启动容器
```bash
docker compose --profile email up -d
```

### 停止容器
运行 `docker compose down` 将停止所有服务，包括邮件服务。若要重新启动邮件服务，请记得包含配置文件：
```bash
docker compose --profile email up -d
```

## Docker Compose 配置

邮件服务已包含在默认的 `docker-compose.yml` 中。相关配置如下：

```yaml
  dockflare-mail-manager:
    image: alplat/dockflare-mail-manager:stable
    container_name: dockflare-mail-manager
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=http://dockflare:5000
      - MAIL_DATA_PATH=/data
    volumes:
      - mail_data:/data
    depends_on:
      dockflare:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

  dockflare-webmail:
    image: alplat/dockflare-webmail:stable
    container_name: dockflare-webmail
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # 替换为您的域名
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # 替换为您的域名
      - dockflare.service=http://dockflare-webmail:80
    depends_on:
      dockflare-mail-manager:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

volumes:
  mail_data:
```

> **重要：** 在启动邮件配置文件之前，请更新 `dockflare-webmail` 服务中的两个占位符：
> - `DOCKFLARE_MASTER_URL` — 您的 DockFlare Master 的公网 HTTPS 地址（如 `https://dockflare.example.com`）
> - `dockflare.hostname` 标签 — Webmail 将访问的子域名（如 `mail.example.com`）

## 服务说明

| 服务 | 描述 | 端口 |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | 处理 MIME、管理 SQLite 并处理 Webhook 的后端引擎。 | 仅内部 |
| `dockflare-webmail` | 面向用户的基于 Vue 的前端应用程序。 | 80（内部） |

## 持久化卷

邮件套件引入了新卷：`mail_data`。

*   **位置：** `mail-manager` 容器内的 `/data`。
*   **内容：**
    *   `/data/db/mail.db`：包含所有邮件元数据和搜索索引的 SQLite 数据库。
    *   `/data/attachments/`：所有邮件附件的文件系统存储。
*   **重要提示：** **切勿删除此卷**，除非您希望永久清除所有存储的邮件。请确保此卷包含在主机级备份策略中。

## 验证

容器启动后，请在 DockFlare Master 界面的 **邮件** 导航项下检查其状态。在 **容器状态** 卡片中，您应该看到两个服务均显示绿色的「运行中」状态。
