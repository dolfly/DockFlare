# Konserwacja i rozwiązywanie problemów

DockFlare Email jest zaprojektowany z myślą o niskich wymaganiach konserwacyjnych, ale zrozumienie procedur tworzenia kopii zapasowych i typowych problemów jest ważne dla długoterminowej niezawodności.

## Kopia zapasowa i przywracanie

Wszystkie dane e-mail są przechowywane w wolumenie Docker `mail_data`. Aby wykonać kopię zapasową:

1.  **Pełna kopia zapasowa wolumenu:** Wykonaj kopię zapasową całego folderu wolumenu na maszynie hosta. Jest to najbezpieczniejsza opcja, ponieważ przechwytuje surową bazę danych SQLite i wszystkie pliki załączników.
2.  **Kopia zapasowa przez interfejs:** Na stronie **Poczta e-mail** znajdź kartę **Kopia zapasowa i przywracanie** i kliknij **Pobierz kopię zapasową**. Spowoduje to wygenerowanie archiwum ZIP Twoich danych e-mail. Uwaga: ta kopia zapasowa zawiera e-maile i załączniki w postaci zwykłego tekstu — przechowuj ją bezpiecznie.

Aby przywrócić:
1.  Upewnij się, że wolumen `mail_data` jest zamontowany w pliku `docker-compose.yml`.
2.  Na stronie **Poczta e-mail**, w karcie **Kopia zapasowa i przywracanie**, wybierz plik ZIP i kliknij **Przywróć kopię zapasową**. Spowoduje to trwałe nadpisanie istniejących danych e-mail.

## Dzienniki

Debugowanie problemów z dostarczaniem często wymaga sprawdzenia dzienników kontenera `dockflare-mail-manager`.

```bash
docker logs -f dockflare-mail-manager
```

Strona Poczta e-mail zawiera również kartę **Dzienniki dostarczania**. Kliknij **Zbadaj**, aby otworzyć przeglądarkę dzienników z dwiema zakładkami:
*   **Dziennik wychodzący:** Historia wszystkich prób wysyłania e-mail.
*   **Dziennik odrzuceń:** Historia wszystkich błędów dostarczania (NDR) dla wysłanych e-maili.

## Odporność na awarie i samoleczenie

### Buforowanie R2
Jeśli Twój serwer przejdzie w tryb offline (np. awaria zasilania, przerwa w dostępie do internetu), Cloudflare Inbound Worker wykryje, że lokalny webhook jest nieosiągalny. Wiadomość zostanie bezpiecznie zachowana w **tymczasowej pamięci podręcznej R2**.
*   Worker uruchamia **zadanie Cron** co 5 minut.
*   Automatycznie ponawia próby dostarczenia buforowanych e-maili do momentu przywrócenia serwera.

### Parytet systemu plików
Mail Manager zawiera rutynę startową, która zapewnia synchronizację bazy danych i systemu plików. Jeśli plik załącznika istnieje, ale nie ma odpowiedniego rekordu w bazie danych (plik „sierota"), zostanie automatycznie usunięty, aby zaoszczędzić miejsce.

## Typowe problemy

### „Worker Error" w dziennikach
Upewnij się, że Twój token API posiada uprawnienia `Workers Scripts` i `Workers KV Storage`. Jeśli niedawno zaktualizowałeś DockFlare, może być konieczne kliknięcie **Wdróż ponownie Workery** na stronie Poczta e-mail w celu synchronizacji nowych zmiennych środowiskowych.

### Opóźnienia w dostarczaniu poczty
Sprawdź dzienniki **Cron** w panelu Cloudflare Worker. Jeśli lokalny serwer jest mocno obciążony lub ma problemy z siecią, Worker buforuje pocztę w R2 i dostarczy ją, gdy serwer odpowie.
