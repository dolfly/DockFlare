# Gestion des boîtes mail et des quotas

La carte **Gestion des boîtes mail** sur la page E-mail vous permet de contrôler qui peut recevoir des e-mails et quelle quantité de stockage chacun peut utiliser.

## Créer des boîtes mail

1.  Cliquez sur **Ajouter une boîte mail**.
2.  **Adresse :** Saisissez le préfixe souhaité (ex. `contact`). Le domaine est automatiquement ajouté.
3.  **Nom d'affichage :** Le nom affiché aux destinataires (ex. `Équipe support`).
4.  **Quota :** Sélectionnez la limite de stockage initiale.

## Comprendre le système de quotas

DockFlare utilise un système de quotas à deux niveaux pour éviter que votre serveur manque d'espace disque tout en offrant une expérience fluide aux utilisateurs.

### Limite souple (Quota)
Lorsqu'une boîte mail dépasse son quota configuré :
*   Le système insère un **e-mail d'avertissement** d'une adresse système dans la boîte de réception de l'utilisateur.
*   L'utilisateur peut toujours recevoir des e-mails jusqu'à ce qu'il atteigne la limite stricte.
*   La barre de quota dans l'interface Master devient **jaune**.

### Limite stricte (Rejet)
La limite stricte est calculée automatiquement comme **Limite souple + 15 % (buffer minimum de 10 Mo)**.
*   **Rejet à l'edge :** Le rejet s'effectue au niveau de l'edge Cloudflare. Le serveur de messagerie de l'expéditeur reçoit l'erreur SMTP **5.2.2 Mailbox full**.
*   L'e-mail n'entre jamais dans votre bucket R2 de transit ni dans votre serveur local, économisant ainsi de la bande passante.
*   La barre de quota dans l'interface Master devient **rouge**.

## Boîtes mail Catch-all

Une boîte mail catch-all reçoit tous les e-mails envoyés à votre domaine qui ne correspondent à aucune boîte mail spécifique existante.
1.  Cliquez sur **Configurer le Catch-all**.
2.  Sélectionnez une boîte mail de destination.
3.  Cliquez sur **Activer**.

## Répondeurs automatiques (Mode absence)

Vous pouvez configurer des réponses automatiques pour n'importe quelle boîte mail :
1.  Cliquez sur l'icône **Répondeur automatique** (robot) à côté d'une boîte mail.
2.  Saisissez votre message et le sujet.
3.  Définissez une **Plage de dates** pendant laquelle le répondeur doit être actif.
4.  **Intervalle de réponse :** Définissez la fréquence à laquelle le répondeur doit répondre au même expéditeur (ex. une fois toutes les 24 heures) pour éviter les « boucles d'e-mails ».
