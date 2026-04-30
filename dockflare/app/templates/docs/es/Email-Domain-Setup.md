# Configuración del dominio

Una vez que sus contenedores Docker están en ejecución con el perfil `email`, puede iniciar el proceso de configuración automatizado en la interfaz web de DockFlare.

## El asistente de configuración de correo electrónico

1.  Navegue a la página **Correo electrónico** en la barra lateral izquierda.
2.  Haga clic en **Configurar dominio de correo electrónico**.
3.  Seleccione la **Zona de Cloudflare** (dominio) que desea configurar.
4.  Haga clic en **Confirmar configuración**.

### ¿Qué ocurre durante la configuración?
DockFlare realiza varios pasos automatizados a través de la API de Cloudflare:
*   **Activa el Email Routing** en su zona.
*   **Configura el DNS:** Crea registros MX, SPF (TXT), DMARC (TXT) y DKIM (CNAME) requeridos por Cloudflare Email Routing.
*   **Aprovisiona almacenamiento:** Crea un bucket R2 dedicado para el búfer temporal de tránsito.
*   **Despliega Workers:** Despliega un Inbound Worker (para recibir correo) y un Outbound Worker (para enviar correo).
*   **Inicializa KV:** Crea un namespace KV de Cloudflare para rastrear las cuotas de buzones en el edge.

## Verificar el estado del DNS

Los cambios de DNS pueden tardar en propagarse. En la página de Correo electrónico, verá una tarjeta **Registros DNS**.
*   Haga clic en **Verificar DNS** para comprobar el estado actual de sus registros MX, SPF y DMARC. (DKIM es gestionado automáticamente por Cloudflare Email Routing y no se verifica por separado aquí.)
*   El sistema mostrará insignias verdes cuando los registros se detecten correctamente en el DNS público.

## Actualizar / Redesplegar Workers

Si actualiza su versión de DockFlare o cambia sus permisos de API, puede que necesite actualizar sus Workers.
*   Haga clic en el botón **Redesplegar Workers**.
*   Esto volverá a subir la lógica más reciente de los Workers y resincronizará todos los vínculos (R2, KV, Secrets de Webhook) sin afectar sus datos de correo almacenados.

## Eliminar un dominio

Si desea dejar de alojar correo electrónico para un dominio:
*   Haga clic en **Eliminar dominio**.
*   Esto eliminará las reglas de enrutamiento, los Workers entrantes/salientes, el bucket R2 de tránsito y los registros DNS de Cloudflare.
*   **Nota:** Esto *no* elimina sus datos de correo locales en el volumen `mail_data`. Active **Incluir datos locales** en el diálogo de eliminación si también desea borrar los mensajes y archivos adjuntos almacenados en su servidor.
