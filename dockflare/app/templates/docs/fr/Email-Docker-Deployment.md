# Déploiement Docker (profil e-mail)

La Suite e-mail DockFlare comprend deux microservices supplémentaires : le **Mail Manager** et le **Webmail PWA**. Ces services sont optionnels et gérés via les **profils** Docker Compose.

## Activation du profil e-mail

Pour démarrer DockFlare avec la prise en charge de la messagerie, vous devez inclure le profil `email` dans vos commandes Docker Compose.

### Démarrer les conteneurs
```bash
docker compose --profile email up -d
```

### Arrêter les conteneurs
Si vous exécutez `docker compose down`, tous les services, y compris la messagerie, seront arrêtés. Pour redémarrer avec la messagerie, n'oubliez pas d'inclure le profil :
```bash
docker compose --profile email up -d
```

## Configuration Docker Compose

Les services de messagerie sont déjà inclus dans le fichier `docker-compose.yml` par défaut. Les sections pertinentes sont :

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # remplacer par votre domaine
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # remplacer par votre domaine
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

> **Important :** Avant de démarrer le profil e-mail, mettez à jour les deux valeurs de remplacement dans le service `dockflare-webmail` :
> - `DOCKFLARE_MASTER_URL` — l'URL HTTPS publique de votre DockFlare Master (ex. `https://dockflare.example.com`)
> - Label `dockflare.hostname` — le sous-domaine où le Webmail sera accessible (ex. `mail.example.com`)

## Description des services

| Service | Description | Port |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | Le moteur backend qui traite les MIME, gère SQLite et les webhooks. | Interne uniquement |
| `dockflare-webmail` | L'application frontend Vue.js pour les utilisateurs. | 80 (Interne) |

## Volumes persistants

La Suite e-mail introduit un nouveau volume : `mail_data`.

*   **Emplacement :** `/data` à l'intérieur du conteneur `mail-manager`.
*   **Contenu :**
    *   `/data/db/mail.db` : La base de données SQLite contenant toutes les métadonnées des messages et les index de recherche.
    *   `/data/attachments/` : Le stockage filesystem pour toutes les pièces jointes.
*   **Important :** **Ne supprimez jamais ce volume** sauf si vous souhaitez effacer définitivement tous les e-mails stockés. Assurez-vous que ce volume est inclus dans votre stratégie de sauvegarde.

## Vérification

Une fois les conteneurs démarrés, vérifiez leur statut dans l'interface DockFlare Master sous l'élément de navigation **E-mail**. Vous devriez voir un statut « En cours d'exécution » (vert) pour les deux services dans la carte **Statut des conteneurs**.
