# Maintenance et dépannage

DockFlare Email est conçu pour nécessiter peu de maintenance, mais comprendre la gestion des sauvegardes et les problèmes courants est important pour une fiabilité à long terme.

## Sauvegarde et restauration

Toutes vos données d'e-mail sont stockées dans le volume Docker `mail_data`. Pour effectuer une sauvegarde :

1.  **Sauvegarde complète du volume :** Sauvegardez l'intégralité du dossier du volume sur votre machine hôte. C'est l'option la plus sûre car elle capture la base de données SQLite brute et tous les fichiers de pièces jointes.
2.  **Sauvegarde via l'interface :** Sur la page **E-mail**, trouvez la carte **Sauvegarde & Restauration** et cliquez sur **Télécharger la sauvegarde**. Cela génère une archive ZIP de vos données d'e-mail. Note : cette sauvegarde contient les e-mails et pièces jointes en texte clair — conservez-la en lieu sûr.

Pour restaurer :
1.  Assurez-vous que le volume `mail_data` est monté dans votre `docker-compose.yml`.
2.  Sur la page **E-mail**, dans la carte **Sauvegarde & Restauration**, sélectionnez votre fichier ZIP et cliquez sur **Restaurer la sauvegarde**. Cela écrasera définitivement les données d'e-mail existantes.

## Journaux

Le débogage des problèmes de livraison nécessite souvent de consulter les journaux du conteneur `dockflare-mail-manager`.

```bash
docker logs -f dockflare-mail-manager
```

La page E-mail inclut également une carte **Journaux de livraison**. Cliquez sur **Examiner** pour ouvrir le lecteur de journaux, qui comporte deux onglets :
*   **Journal sortant :** Historique de toutes les tentatives d'envoi d'e-mails.
*   **Journal des rebonds :** Historique de tous les échecs de livraison (NDR) pour les e-mails que vous avez envoyés.

## Résilience et auto-réparation

### Mise en tampon R2
Si votre serveur se déconnecte (ex. panne de courant, coupure internet), le Cloudflare Inbound Worker détectera que votre webhook local est inaccessible. Il conservera l'e-mail en sécurité dans le **cache temporaire R2**.
*   Le worker exécute un **Job Cron** toutes les 5 minutes.
*   Il tentera automatiquement de livrer les e-mails mis en tampon jusqu'au retour en ligne de votre serveur.

### Parité du système de fichiers
Le Mail Manager inclut une routine de démarrage qui garantit la synchronisation entre la base de données et le système de fichiers. Si un fichier de pièce jointe existe sans enregistrement dans la base de données (un « orphelin »), il sera automatiquement supprimé pour libérer de l'espace.

## Problèmes courants

### « Worker Error » dans les journaux
Assurez-vous que votre token API dispose des permissions `Workers Scripts` et `Workers KV Storage`. Si vous avez récemment mis à jour DockFlare, vous devrez peut-être cliquer sur **Redéployer les Workers** sur la page E-mail pour synchroniser les nouvelles variables d'environnement.

### Les e-mails sont retardés
Vérifiez les journaux **Cron** dans le tableau de bord Cloudflare Worker. Si votre serveur local est fortement chargé ou a des problèmes réseau, le worker mettra les e-mails en tampon dans R2 et les livrera dès que votre serveur répondra.
