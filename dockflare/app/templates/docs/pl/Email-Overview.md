# Przegląd pakietu poczty e-mail

DockFlare Email to w pełni samodzielnie hostowany, suwerenny system poczty elektronicznej zbudowany na istniejącej infrastrukturze DockFlare. Zaprojektowany tak, aby łączyć wygodę poczty chmurowej z prywatnością i kontrolą płynącą z samodzielnego hostingu.

## Koncepcja suwerennej poczty e-mail

Tradycyjnie samodzielne hostowanie poczty e-mail jest trudne ze względu na „blokowanie domowych adresów IP" — adresy IP z sieci domowych są blokowane przez głównych dostawców poczty. DockFlare rozwiązuje ten problem, wykorzystując Cloudflare jako **bezstanową sieć dostarczania**:

1.  **Cloudflare** wykonuje ciężką pracę: dostarczanie SMTP, routing MX i tymczasowe buforowanie.
2.  **DockFlare** posiada dane. Twoje wiadomości, załączniki i konfiguracje skrzynek są przechowywane na Twoim własnym sprzęcie.

Żadna treść e-mail nie jest trwale przechowywana w infrastrukturze Cloudflare. Podczas tranzytu jest krótko buforowana w zasobniku R2 i usuwana natychmiast po przetworzeniu przez lokalny Mail Manager.

## Architektura

System składa się z kilku zintegrowanych komponentów:

*   **Przepływ przychodzący:** Internet → Cloudflare Email Routing → Inbound Worker → Bufor R2 → Webhook DockFlare Mail Manager → Lokalne przechowywanie.
*   **Przepływ wychodzący:** Interfejs Webmail → API Mail Manager → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Suwerenność danych:** Wszystkie e-maile są parsowane i przechowywane w lokalnej bazie danych SQLite, a załączniki są zapisywane w lokalnym systemie plików.

## Wysyłanie wychodzące – Plany i ograniczenia

Cloudflare Email Sending (Beta) oferuje dwa poziomy w zależności od posiadanego planu Cloudflare:

| Odbiorca | Plan bezpłatny | Workers Paid Plan (5 $/mies.) |
| :--- | :--- | :--- |
| Zweryfikowane adresy Cloudflare (potwierdzone na koncie CF) | ✅ Dozwolone | ✅ Dozwolone |
| Dowolny adres zewnętrzny | ❌ Niedozwolone | ✅ Dozwolone |

DockFlare automatycznie konfiguruje rekordy podpisu DKIM i subdomenę wysyłki (`mail.twojadomena.com`) podczas konfiguracji domeny. Jednak **pełne wysyłanie do adresów zewnętrznych wymaga dwóch dodatkowych kroków ręcznych:**

1. **Upgrade do Cloudflare Workers Paid Plan** – dostępny za 5 $/miesiąc w panelu Cloudflare.
2. **Aktywacja CF Email Sending (Beta)** – przejdź do [Panelu Cloudflare → Email → Email Sending](https://dash.cloudflare.com/) i włącz tę funkcję dla swojego konta.

Do czasu wykonania tych kroków poczta wychodząca z klienta webmail będzie dostarczana wyłącznie na adresy e-mail zweryfikowane na Twoim koncie Cloudflare. Badge statusu domeny na stronie zarządzania pocztą w DockFlare odzwierciedla, czy DKIM jest skonfigurowany (`Sending: Active`) czy jeszcze nie (`Sending: Pending`).

## Kluczowe funkcje

*   **Obsługa wielu domen:** Hostuj pocztę dla tylu domen, ile zarządzasz w Cloudflare.
*   **Egzekwowanie limitów na brzegu sieci:** Skrzynka pełna? Cloudflare Workers odrzucają wiadomość na poziomie SMTP (5.2.2), zanim dotrze do Twojego serwera, oszczędzając przepustowość.
*   **Wyszukiwanie pełnotekstowe:** Błyskawiczne przeszukiwanie wszystkich e-maili dzięki SQLite FTS5.
*   **Prywatność przede wszystkim:** Wszystkie interakcje API używają uwierzytelniania EdDSA JWT. Treść HTML e-maili jest oczyszczana przed renderowaniem, aby zapobiegać XSS i pikselom śledzącym.
*   **Webmail PWA:** Nowoczesny, responsywny klient webmail, który można zainstalować na telefonie lub komputerze.
*   **Powiadomienia push:** Otrzymuj powiadomienia o nowych wiadomościach w czasie rzeczywistym przez Web Push (VAPID).
*   **Odporność na awarie:** Jeśli Twój serwer przejdzie w tryb offline, Cloudflare R2 buforuje przychodzące e-maile i automatycznie ponawia próby dostarczenia co 5 minut.
