# Descripción general de la Suite de correo electrónico

DockFlare Email es un sistema de correo electrónico soberano y completamente auto-alojado, construido sobre su infraestructura DockFlare existente. Está diseñado para ofrecer la comodidad del correo electrónico basado en la nube con la privacidad y el control del auto-alojamiento.

## El concepto de correo electrónico soberano

Tradicionalmente, alojar un servidor de correo propio es difícil debido al «bloqueo de IP domésticas»: las direcciones IP residenciales son bloqueadas por los principales proveedores de correo. DockFlare resuelve este problema utilizando Cloudflare como **red de entrega sin estado**:

1.  **Cloudflare** se encarga del trabajo pesado: entrega SMTP, enrutamiento MX y almacenamiento temporal en búfer.
2.  **DockFlare** es el propietario de los datos. Sus mensajes, archivos adjuntos y configuraciones de buzones se almacenan en su propio hardware.

Ningún contenido de correo electrónico persiste en la infraestructura de Cloudflare. Se almacena brevemente en un bucket R2 durante el tránsito y se purga inmediatamente después de que su Mail Manager local lo procese.

## Arquitectura

El sistema consta de varios componentes integrados:

*   **Flujo entrante:** Internet → Cloudflare Email Routing → Inbound Worker → Búfer R2 → Webhook DockFlare Mail Manager → Almacenamiento local.
*   **Flujo saliente:** Interfaz webmail → API Mail Manager → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Soberanía de datos:** Todos los correos se analizan y almacenan en una base de datos SQLite local, con los archivos adjuntos guardados en su sistema de archivos local.

## Características principales

*   **Soporte multi-dominio:** Aloje correo electrónico para tantos dominios como gestione en Cloudflare.
*   **Aplicación de cuotas en el edge:** ¿Buzón lleno? Los Cloudflare Workers rechazan el correo a nivel SMTP (5.2.2) antes de que llegue a su servidor, ahorrando ancho de banda.
*   **Búsqueda de texto completo:** Búsqueda ultrarrápida en todos sus correos mediante SQLite FTS5.
*   **Privacidad primero:** Todas las interacciones API usan autenticación EdDSA JWT. El contenido HTML de los correos se sanea antes de renderizarse para prevenir XSS y píxeles de seguimiento.
*   **Webmail PWA:** Un cliente webmail moderno y adaptable para móviles, instalable en su teléfono o escritorio.
*   **Notificaciones push:** Reciba alertas en tiempo real sobre nuevos correos mediante Web Push (VAPID).
*   **Resiliencia:** Si su servidor se desconecta, Cloudflare R2 almacena en búfer sus correos entrantes y reintenta la entrega automáticamente cada 5 minutos.
