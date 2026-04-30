# Configuration du domaine

Une fois vos conteneurs Docker démarrés avec le profil `email`, vous pouvez commencer le processus de configuration automatisé dans l'interface web DockFlare.

## L'assistant de configuration e-mail

1.  Accédez à la page **E-mail** dans la barre latérale gauche.
2.  Cliquez sur **Configurer un domaine e-mail**.
3.  Sélectionnez la **Zone Cloudflare** (domaine) que vous souhaitez configurer.
4.  Cliquez sur **Confirmer la configuration**.

### Que se passe-t-il lors de la configuration ?
DockFlare effectue plusieurs étapes automatisées via l'API Cloudflare :
*   **Active l'Email Routing** sur votre zone.
*   **Configure le DNS :** Crée les enregistrements MX, SPF (TXT), DMARC (TXT) et DKIM (CNAME) requis par Cloudflare Email Routing.
*   **Provisionne le stockage :** Crée un bucket R2 dédié pour la mise en tampon temporaire du transit.
*   **Déploie les Workers :** Déploie un Inbound Worker (pour recevoir les e-mails) et un Outbound Worker (pour envoyer les e-mails).
*   **Initialise le KV :** Crée un namespace Cloudflare KV pour suivre les quotas des boîtes mail à l'edge.

## Vérification de l'état DNS

Les modifications DNS peuvent prendre du temps à se propager. Sur la page E-mail, vous verrez une carte **Enregistrements DNS**.
*   Cliquez sur **Vérifier le DNS** pour contrôler l'état actuel de vos enregistrements MX, SPF et DMARC. (DKIM est géré automatiquement par Cloudflare Email Routing et n'est pas vérifié séparément ici.)
*   Le système affichera des badges verts lorsque les enregistrements sont correctement détectés dans le DNS public.

## Mise à jour / Redéploiement des Workers

Si vous mettez à jour votre version de DockFlare ou modifiez vos permissions API, vous devrez peut-être actualiser vos Workers.
*   Cliquez sur le bouton **Redéployer les Workers**.
*   Cela rechargera la dernière logique des Workers et resynchronisera toutes les liaisons (R2, KV, Secrets Webhook) sans affecter vos données d'e-mail stockées.

## Suppression d'un domaine

Si vous souhaitez arrêter l'hébergement de la messagerie pour un domaine :
*   Cliquez sur **Supprimer le domaine**.
*   Cela supprimera les règles de routage, les Workers entrants/sortants, le bucket R2 de transit et les enregistrements DNS de Cloudflare.
*   **Note :** Cela ne supprime *pas* vos données d'e-mail locales dans le volume `mail_data`. Activez **Inclure les données locales** dans la boîte de dialogue de suppression si vous souhaitez également effacer les messages et pièces jointes stockés sur votre serveur.
