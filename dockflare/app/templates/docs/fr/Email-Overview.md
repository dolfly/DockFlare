# Vue d'ensemble de la Suite e-mail

DockFlare Email est un système de messagerie souverain, entièrement auto-hébergé, construit sur votre infrastructure DockFlare existante. Il offre la commodité d'un service de messagerie cloud tout en vous garantissant confidentialité et contrôle total de vos données.

## Le concept de messagerie souveraine

L'auto-hébergement d'un serveur de messagerie est traditionnellement difficile en raison du « blacklistage des IP résidentielles » : les adresses IP domestiques sont bloquées par les grands fournisseurs de messagerie. DockFlare résout ce problème en utilisant Cloudflare comme **réseau de livraison sans état** :

1.  **Cloudflare** prend en charge la livraison SMTP, le routage MX et la mise en tampon temporaire.
2.  **DockFlare** détient les données. Vos messages, pièces jointes et configurations de boîtes mail sont stockés sur votre propre matériel.

Aucun contenu d'e-mail ne persiste dans l'infrastructure de Cloudflare. Les messages sont brièvement mis en tampon dans un bucket R2 lors du transit, puis supprimés immédiatement après leur traitement par votre Mail Manager local.

## Architecture

Le système se compose de plusieurs composants intégrés :

*   **Flux entrant :** Internet → Cloudflare Email Routing → Inbound Worker → Tampon R2 → Webhook DockFlare Mail Manager → Stockage local.
*   **Flux sortant :** Interface Webmail → API Mail Manager → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Souveraineté des données :** Tous les e-mails sont analysés et stockés dans une base de données SQLite locale, avec les pièces jointes sauvegardées sur votre système de fichiers local.

## Fonctionnalités principales

*   **Support multi-domaine :** Hébergez la messagerie pour autant de domaines que vous en gérez dans Cloudflare.
*   **Application des quotas à l'edge :** Boîte pleine ? Les Cloudflare Workers rejettent l'e-mail au niveau SMTP (5.2.2) avant même qu'il n'atteigne votre serveur, économisant ainsi de la bande passante.
*   **Recherche plein texte :** Recherche ultra-rapide dans tous vos e-mails grâce à SQLite FTS5.
*   **Confidentialité avant tout :** Toutes les interactions API utilisent l'authentification EdDSA JWT. Le contenu HTML des e-mails est assaini avant le rendu pour prévenir les attaques XSS et les pixels de suivi.
*   **Webmail PWA :** Un client webmail moderne et responsive, installable sur votre téléphone ou votre ordinateur.
*   **Notifications push :** Recevez en temps réel des alertes pour les nouveaux e-mails via Web Push (VAPID).
*   **Résilience :** Si votre serveur se déconnecte, Cloudflare R2 met en tampon vos e-mails entrants et retente la livraison automatiquement toutes les 5 minutes.
