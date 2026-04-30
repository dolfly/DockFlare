# Mantenimiento y solución de problemas

DockFlare Email está diseñado para requerir poco mantenimiento, pero comprender cómo manejar las copias de seguridad y los problemas comunes es importante para la fiabilidad a largo plazo.

## Copia de seguridad y restauración

Todos sus datos de correo se almacenan en el volumen Docker `mail_data`. Para realizar una copia de seguridad:

1.  **Copia de seguridad completa del volumen:** Haga una copia de seguridad de toda la carpeta del volumen en su máquina host. Esta es la opción más segura, ya que captura la base de datos SQLite sin procesar y todos los archivos adjuntos.
2.  **Copia de seguridad desde la interfaz:** En la página **Correo electrónico**, encuentre la tarjeta **Copia de seguridad y restauración** y haga clic en **Descargar copia de seguridad**. Esto genera un archivo ZIP con sus datos de correo. Nota: esta copia de seguridad contiene correos y archivos adjuntos en texto claro — guárdela de forma segura.

Para restaurar:
1.  Asegúrese de que el volumen `mail_data` esté montado en su `docker-compose.yml`.
2.  En la página **Correo electrónico**, en la tarjeta **Copia de seguridad y restauración**, seleccione su archivo ZIP y haga clic en **Restaurar copia de seguridad**. Esto sobrescribirá permanentemente los datos de correo existentes.

## Registros (Logs)

Depurar problemas de entrega a menudo requiere revisar los registros del contenedor `dockflare-mail-manager`.

```bash
docker logs -f dockflare-mail-manager
```

La página de Correo electrónico también incluye una tarjeta **Registros de entrega**. Haga clic en **Investigar** para abrir el visor de registros, que tiene dos pestañas:
*   **Registro saliente:** Historial de todos los intentos de envío de correo.
*   **Registro de rebotes:** Historial de todos los fallos de entrega (NDR) para los correos que envió.

## Resiliencia y auto-recuperación

### Búfer R2
Si su servidor se desconecta (ej. corte de luz, interrupción de internet), el Cloudflare Inbound Worker detectará que su webhook local es inaccesible. Mantendrá el correo de forma segura en el **caché temporal R2**.
*   El worker ejecuta un **trabajo Cron** cada 5 minutos.
*   Intentará automáticamente entregar los correos almacenados en búfer hasta que su servidor vuelva a estar en línea.

### Paridad del sistema de archivos
El Mail Manager incluye una rutina de inicio que garantiza que la base de datos y el sistema de archivos estén sincronizados. Si existe un archivo adjunto sin registro en la base de datos (un «huérfano»), se purgará automáticamente para ahorrar espacio.

## Problemas comunes

### «Worker Error» en los registros
Asegúrese de que su token API tenga los permisos `Workers Scripts` y `Workers KV Storage`. Si recientemente actualizó DockFlare, puede que necesite hacer clic en **Redesplegar Workers** en la página de Correo electrónico para sincronizar las nuevas variables de entorno.

### El correo se retrasa
Compruebe los registros **Cron** en el panel de Cloudflare Worker. Si su servidor local está bajo carga pesada o tiene problemas de red, el worker almacenará el correo en búfer en R2 y lo entregará una vez que su servidor responda.
