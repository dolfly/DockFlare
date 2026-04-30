# Usar el Webmail (PWA)

DockFlare incluye un cliente webmail moderno y adaptable que le permite gestionar sus correos desde cualquier dispositivo.

## Acceder al Webmail

Hay dos formas de iniciar sesión en el Webmail:

1.  **SSO (Inicio de sesión único):** Si es un administrador con sesión iniciada en la interfaz DockFlare Master, haga clic en **Abrir Webmail** en la página de Correo electrónico. Se autenticará automáticamente y accederá a sus buzones.
2.  **Inicio de sesión directo:** Navegue a `https://mail.sudominio.com`. Si ha establecido una contraseña para su buzón en la interfaz Master, puede iniciar sesión directamente con su dirección de correo y contraseña.

## Instalar como PWA

El Webmail de DockFlare es una **Aplicación Web Progresiva (PWA)**. Esto significa que puede instalarla en su dispositivo para una experiencia similar a una aplicación nativa.

### En móvil (iOS/Android) (soporte móvil actualmente en desarrollo)
*   Abra la URL del Webmail en su navegador móvil.
*   **iOS:** Toque el ícono «Compartir» y seleccione **Agregar a la pantalla de inicio**.
*   **Android:** Toque los tres puntos y seleccione **Instalar aplicación** o **Agregar a la pantalla de inicio**.

### En escritorio (Chrome/Edge/Brave)
*   Busque el ícono «Instalar» en la barra de direcciones (generalmente una pequeña pantalla con una flecha hacia abajo).
*   Haga clic en **Instalar**.

## Características principales

*   **Búsqueda:** Use la barra de búsqueda para encontrar correos. DockFlare utiliza búsqueda de texto completo (FTS5) para indexar asuntos, remitentes y cuerpos de mensajes localmente.
*   **Notificaciones push:** Active las notificaciones en la configuración del Webmail para recibir alertas en tiempo real sobre nuevos correos en su escritorio o dispositivo móvil.

## Seguridad

*   **Autenticación EdDSA:** El Webmail usa tokens JSON Web de alta seguridad Ed25519 (JWT) emitidos por el DockFlare Master para todas las interacciones API.
*   **Saneamiento HTML:** Todos los correos HTML entrantes se sanean (usando DOMPurify) antes de renderizarse para protegerle de ataques de secuencias de comandos en sitios cruzados (XSS) y píxeles de seguimiento.
