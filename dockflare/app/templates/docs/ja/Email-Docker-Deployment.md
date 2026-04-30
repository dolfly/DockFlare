# Docker デプロイメント (メールプロファイル)

DockFlare メールスイートは、**Mail Manager** と **Webmail PWA** という 2 つの追加マイクロサービスで構成されています。これらのサービスはオプションであり、Docker Compose の**プロファイル**を使用して管理されます。

## メールプロファイルの有効化

メールサポートを有効にして DockFlare を起動するには、Docker Compose コマンドに `email` プロファイルを含める必要があります。

### コンテナの起動
```bash
docker compose --profile email up -d
```

### コンテナの停止
`docker compose down` を実行すると、メールを含むすべてのサービスが停止します。メールを含めて再起動するには、プロファイルを忘れずに指定してください。
```bash
docker compose --profile email up -d
```

## Docker Compose の設定

メールサービスはデフォルトの `docker-compose.yml` にすでに含まれています。関連するセクションは以下のとおりです。

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # ご自身のドメインに変更
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # ご自身のドメインに変更
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

> **重要:** メールプロファイルを起動する前に、`dockflare-webmail` サービスの 2 つのプレースホルダー値を更新してください。
> - `DOCKFLARE_MASTER_URL` — DockFlare Master の公開 HTTPS URL (例: `https://dockflare.example.com`)
> - `dockflare.hostname` ラベル — Webmail にアクセスできるサブドメイン (例: `mail.example.com`)

## サービスの説明

| サービス | 説明 | ポート |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | MIME 処理、SQLite 管理、Webhook 処理を行うバックエンドエンジン。 | 内部のみ |
| `dockflare-webmail` | ユーザー向けの Vue ベースのフロントエンドアプリケーション。 | 80 (内部) |

## 永続ボリューム

メールスイートは新しいボリューム `mail_data` を導入します。

*   **場所:** `mail-manager` コンテナ内の `/data`。
*   **内容:**
    *   `/data/db/mail.db`: すべてのメッセージメタデータと検索インデックスを含む SQLite データベース。
    *   `/data/attachments/`: すべての添付ファイルのファイルシステムストレージ。
*   **重要:** 保存されているすべてのメールを完全に削除する場合を除いて、**このボリュームは絶対に削除しないでください**。このボリュームがホストレベルのバックアップ戦略に含まれていることを確認してください。

## 確認

コンテナが起動したら、DockFlare Master UI のナビゲーション項目 **メール** でステータスを確認してください。**コンテナステータス** カードに、両方のサービスの緑色の「実行中」ステータスが表示されるはずです。
