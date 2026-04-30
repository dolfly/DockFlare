# Utiliser le Webmail (PWA)

DockFlare inclut un client webmail moderne et responsive qui vous permet de gérer vos e-mails depuis n'importe quel appareil.

## Accéder au Webmail

Deux méthodes permettent de se connecter au Webmail :

1.  **SSO (Authentification unique) :** Si vous êtes un administrateur connecté à l'interface DockFlare Master, cliquez sur **Ouvrir le Webmail** sur la page E-mail. Vous serez authentifié automatiquement et connecté à vos boîtes mail.
2.  **Connexion directe :** Accédez à `https://mail.votredomaine.com`. Si vous avez défini un mot de passe pour votre boîte mail dans l'interface Master, vous pouvez vous connecter directement avec votre adresse e-mail et votre mot de passe.

## Installer en tant que PWA

Le Webmail DockFlare est une **Progressive Web App (PWA)**. Vous pouvez l'installer sur votre appareil pour une expérience similaire à une application native.

### Sur mobile (iOS/Android) (support mobile en cours de développement)
*   Ouvrez l'URL du Webmail dans votre navigateur mobile.
*   **iOS :** Appuyez sur l'icône « Partager » et sélectionnez **Sur l'écran d'accueil**.
*   **Android :** Appuyez sur les trois points et sélectionnez **Installer l'application** ou **Ajouter à l'écran d'accueil**.

### Sur ordinateur (Chrome/Edge/Brave)
*   Recherchez l'icône « Installer » dans la barre d'adresse (généralement un petit écran avec une flèche vers le bas).
*   Cliquez sur **Installer**.

## Fonctionnalités principales

*   **Recherche :** Utilisez la barre de recherche pour trouver des e-mails. DockFlare utilise la recherche plein texte (FTS5) pour indexer vos sujets, expéditeurs et corps de messages localement.
*   **Notifications push :** Activez les notifications dans les paramètres du Webmail pour recevoir des alertes en temps réel pour les nouveaux e-mails sur votre ordinateur ou mobile.

## Sécurité

*   **Authentification EdDSA :** Le Webmail utilise des jetons Web JSON Ed25519 (JWT) haute sécurité émis par le DockFlare Master pour toutes les interactions API.
*   **Assainissement HTML :** Tous les e-mails HTML entrants sont assainis (via DOMPurify) avant le rendu pour vous protéger des attaques de scripts intersites (XSS) et des pixels de suivi.
