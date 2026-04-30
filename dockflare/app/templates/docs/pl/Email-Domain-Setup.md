# Konfiguracja domeny

Po uruchomieniu kontenerów Docker z profilem `email` możesz rozpocząć automatyczny proces konfiguracji w interfejsie webowym DockFlare.

## Kreator konfiguracji poczty e-mail

1.  Przejdź do strony **Poczta e-mail** w lewym pasku bocznym.
2.  Kliknij **Skonfiguruj domenę poczty e-mail**.
3.  Wybierz **Strefę Cloudflare** (domenę), którą chcesz skonfigurować.
4.  Kliknij **Potwierdź konfigurację**.

### Co się dzieje podczas konfiguracji?
DockFlare wykonuje kilka automatycznych kroków za pomocą interfejsu API Cloudflare:
*   **Włącza Email Routing** w Twojej strefie.
*   **Konfiguruje DNS:** Tworzy rekordy MX, SPF (TXT), DMARC (TXT) i DKIM (CNAME) wymagane przez Cloudflare Email Routing.
*   **Inicjuje magazyn:** Tworzy dedykowany zasobnik R2 do tymczasowego buforowania tranzytu.
*   **Wdraża Workery:** Wdraża Inbound Worker (do odbierania poczty) i Outbound Worker (do wysyłania poczty).
*   **Inicjalizuje KV:** Tworzy przestrzeń nazw Cloudflare KV do śledzenia limitów skrzynek na brzegu sieci.

## Weryfikacja stanu DNS

Propagacja zmian DNS może zająć trochę czasu. Na stronie Poczta e-mail zobaczysz kartę **Rekordy DNS**.
*   Kliknij **Weryfikuj DNS**, aby sprawdzić bieżący status rekordów MX, SPF i DMARC. (DKIM jest zarządzany automatycznie przez Cloudflare Email Routing i nie jest tu weryfikowany oddzielnie.)
*   System wyświetli zielone znaczniki, gdy rekordy zostaną prawidłowo wykryte w publicznym DNS.

## Aktualizacja / Ponowne wdrożenie Workerów

Jeśli zaktualizujesz wersję DockFlare lub zmienisz uprawnienia API, może być konieczne odświeżenie Workerów.
*   Kliknij przycisk **Wdróż ponownie Workery**.
*   Spowoduje to ponowne przesłanie najnowszej logiki Workerów i ponowną synchronizację wszystkich powiązań (R2, KV, sekrety Webhook) bez wpływu na przechowywane dane e-mail.

## Usuwanie domeny

Jeśli chcesz zaprzestać hostowania poczty dla domeny:
*   Kliknij **Usuń domenę**.
*   Spowoduje to usunięcie reguł routingu, Workerów przychodzących/wychodzących, zasobnika R2 i rekordów DNS z Cloudflare.
*   **Uwaga:** Nie powoduje to *usunięcia* lokalnych danych e-mail w wolumenie `mail_data`. Włącz opcję **Dołącz lokalne dane** w oknie dialogowym usuwania, jeśli chcesz również wyczyścić wiadomości i załączniki przechowywane na serwerze.
