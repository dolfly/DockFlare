# Gestión de buzones y cuotas

La tarjeta **Gestión de buzones** en la página de Correo electrónico es donde controla quién puede recibir correo y cuánto almacenamiento se le permite usar.

## Crear buzones

1.  Haga clic en **Agregar buzón**.
2.  **Dirección:** Introduzca el prefijo deseado (ej. `info`). El dominio se añade automáticamente.
3.  **Nombre para mostrar:** El nombre que se muestra a los destinatarios (ej. `Equipo de soporte`).
4.  **Cuota:** Seleccione el límite de almacenamiento inicial.

## Entender el sistema de cuotas

DockFlare utiliza un sistema de cuotas por niveles para garantizar que su servidor no se quede sin espacio en disco, al tiempo que ofrece una experiencia fluida a los usuarios.

### Límite suave (Cuota)
Cuando un buzón supera su cuota configurada:
*   El sistema inserta un **correo de advertencia** desde una dirección del sistema en la bandeja de entrada del usuario.
*   El usuario puede seguir recibiendo correo hasta alcanzar el Límite estricto.
*   La barra de cuota en la interfaz Master se vuelve **amarilla**.

### Límite estricto (Rechazo)
El Límite estricto se calcula automáticamente como **Límite suave + 15 % (mínimo 10 MB de margen)**.
*   **Rechazo en el edge:** El rechazo ocurre en el edge de Cloudflare. El servidor de correo del remitente recibe el error SMTP **5.2.2 Mailbox full**.
*   El correo nunca entra en su bucket R2 de tránsito ni en su servidor local, ahorrando ancho de banda.
*   La barra de cuota en la interfaz Master se vuelve **roja**.

## Buzones Catch-all

Un buzón catch-all recibe todos los correos enviados a su dominio que no coincidan con ningún buzón específico existente.
1.  Haga clic en **Configurar Catch-all**.
2.  Seleccione un buzón de destino.
3.  Haga clic en **Activar**.

## Respuestas automáticas (Modo vacaciones)

Puede configurar respuestas automáticas para cualquier buzón:
1.  Haga clic en el icono de **Respuesta automática** (robot) junto a un buzón.
2.  Introduzca su mensaje y el asunto.
3.  Establezca un **Rango de fechas** para cuando el respondedor debe estar activo.
4.  **Intervalo de respuesta:** Configure con qué frecuencia el respondedor debe responder al mismo remitente (ej. una vez cada 24 horas) para evitar «bucles de correo».
