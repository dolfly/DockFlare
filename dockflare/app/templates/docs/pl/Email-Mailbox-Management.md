# Zarządzanie skrzynkami i limitami

Karta **Zarządzanie skrzynkami** na stronie Poczta e-mail to miejsce, w którym kontrolujesz, kto może odbierać pocztę i ile miejsca może używać.

## Tworzenie skrzynek

1.  Kliknij **Dodaj skrzynkę**.
2.  **Adres:** Wprowadź żądany prefiks (np. `info`). Domena jest dodawana automatycznie.
3.  **Nazwa wyświetlana:** Nazwa widoczna dla odbiorców (np. `Zespół wsparcia`).
4.  **Limit:** Wybierz początkowy limit przestrzeni dyskowej.

## Opis systemu limitów

DockFlare używa wielopoziomowego systemu limitów, aby zapewnić, że na serwerze nie zabraknie miejsca, zapewniając jednocześnie użytkownikom dobre doświadczenie.

### Miękki limit (Quota)
Gdy skrzynka przekroczy skonfigurowany limit:
*   System wstawia **e-mail ostrzegawczy** z adresu systemowego do skrzynki odbiorczej użytkownika.
*   Użytkownik nadal może odbierać pocztę do momentu osiągnięcia twardego limitu.
*   Pasek limitu w interfejsie Master zmieni kolor na **żółty**.

### Twardy limit (Odrzucenie)
Twardy limit jest automatycznie obliczany jako **Miękki limit + 15% (minimalne 10 MB bufora)**.
*   **Odrzucenie na brzegu sieci:** Odrzucenie następuje na brzegu sieci Cloudflare. Serwer pocztowy nadawcy otrzymuje błąd SMTP **5.2.2 Mailbox full**.
*   E-mail nigdy nie trafia do zasobnika R2 ani na lokalny serwer, oszczędzając przepustowość.
*   Pasek limitu w interfejsie Master zmieni kolor na **czerwony**.

## Skrzynki Catch-all

Skrzynka catch-all odbiera wszystkie e-maile wysłane do Twojej domeny, które nie pasują do żadnej istniejącej, konkretnej skrzynki.
1.  Kliknij **Skonfiguruj Catch-all**.
2.  Wybierz docelową skrzynkę.
3.  Kliknij **Włącz**.

## Autoresponder (Tryb urlopowy)

Możesz skonfigurować automatyczne odpowiedzi dla dowolnej skrzynki:
1.  Kliknij ikonę **Autorespondera** (robot) obok skrzynki.
2.  Wprowadź treść wiadomości i temat.
3.  Ustaw **Zakres dat**, w którym autoresponder ma być aktywny.
4.  **Interwał odpowiedzi:** Ustaw, jak często autoresponder ma odpowiadać temu samemu nadawcy (np. raz na 24 godziny), aby zapobiec „pętlom e-mail".
