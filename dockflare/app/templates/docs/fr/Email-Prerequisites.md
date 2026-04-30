# Prérequis et configuration de la Suite e-mail

Avant d'activer la Suite e-mail, assurez-vous que votre environnement et votre compte Cloudflare sont correctement configurés.

## Prérequis Cloudflare

1.  **Gestion de domaine :** Votre domaine doit être actif sur Cloudflare.
2.  **Email Routing :** Le domaine doit être éligible au Cloudflare Email Routing (disponible sur la plupart des plans, y compris le plan gratuit) et à Cloudflare Email Sending (accès bêta requis pour l'envoi sortant).
3.  **Stockage R2 :** R2 doit être activé dans votre tableau de bord Cloudflare. R2 comprend un niveau gratuit de 10 Go, mais vous devrez peut-être ajouter un moyen de paiement pour l'activer.

## Permissions du token API

La Suite e-mail nécessite des permissions supplémentaires sur votre token API DockFlare existant. Mettez-le à jour via **Profil utilisateur > Tokens API** en ajoutant les permissions suivantes :

| Portée | Permission spécifique | Niveau d'accès | Objectif |
| :--- | :--- | :--- | :--- |
| **Compte** | **Workers Scripts** | **Édition** | Déploiement des workers entrants/sortants |
| **Compte** | **Workers KV Storage** | **Édition** | Application des quotas en temps réel à l'edge |
| **Compte** | **R2 Storage** | **Édition** | Création et gestion des buckets de transit |
| **Zone** | **Email Routing** | **Édition** | Activation du routage et gestion des règles |
| **Zone** | **DNS** | **Édition** | Création des enregistrements MX, SPF, DMARC et DKIM |

> **Note de sécurité :** Il est fortement recommandé de restreindre les « Ressources de compte » et les « Ressources de zone » de ce token uniquement au compte et aux domaines que vous souhaitez utiliser avec DockFlare.

## Configuration système requise

*   **DockFlare :** v3.1.0 ou ultérieur.
*   **Docker :** v20.10+.
*   **Docker Compose :** v2.20+ (requis pour la prise en charge des `profiles`).
*   **Stockage :** Assurez-vous d'avoir suffisamment d'espace disque sur la machine hôte pour le volume `mail_data`, qui stockera toutes les bases de données de messagerie et les pièces jointes.
