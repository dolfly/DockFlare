# Korzystanie z webmaila (PWA)

DockFlare zawiera nowoczesny, responsywny klient webmail, który umożliwia zarządzanie pocztą e-mail z dowolnego urządzenia.

## Dostęp do webmaila

Istnieją dwa sposoby logowania do webmaila:

1.  **SSO (Logowanie jednokrotne):** Jeśli jesteś administratorem zalogowanym do interfejsu DockFlare Master, kliknij **Otwórz webmail** na stronie Poczta e-mail. Zostaniesz automatycznie uwierzytelniony i zalogowany do swoich skrzynek.
2.  **Bezpośrednie logowanie:** Przejdź do `https://mail.twojadomena.com`. Jeśli ustawiłeś hasło dla swojej skrzynki w interfejsie Master, możesz zalogować się bezpośrednio przy użyciu adresu e-mail i hasła.

## Instalacja jako PWA

Webmail DockFlare to **Progresywna Aplikacja Webowa (PWA)**. Możesz ją zainstalować na urządzeniu, aby korzystać z niej jak z natywnej aplikacji.

### Na urządzeniach mobilnych (iOS/Android) (obsługa mobilna jest aktualnie w trakcie opracowywania)
*   Otwórz adres URL webmaila w mobilnej przeglądarce.
*   **iOS:** Dotknij ikony „Udostępnij" i wybierz **Dodaj do ekranu głównego**.
*   **Android:** Dotknij trzech kropek i wybierz **Zainstaluj aplikację** lub **Dodaj do ekranu głównego**.

### Na komputerze (Chrome/Edge/Brave)
*   Poszukaj ikony „Zainstaluj" na pasku adresu (zwykle mały monitor ze strzałką w dół).
*   Kliknij **Zainstaluj**.

## Kluczowe funkcje

*   **Wyszukiwanie:** Użyj paska wyszukiwania, aby znaleźć e-maile. DockFlare używa wyszukiwania pełnotekstowego (FTS5) do lokalnego indeksowania tematów, nadawców i treści wiadomości.
*   **Powiadomienia push:** Włącz powiadomienia w ustawieniach webmaila, aby otrzymywać alerty w czasie rzeczywistym o nowych e-mailach na komputerze lub urządzeniu mobilnym.

## Bezpieczeństwo

*   **Uwierzytelnianie EdDSA:** Webmail używa wysoce bezpiecznych tokenów JSON Web Ed25519 (JWT) wydawanych przez DockFlare Master do wszystkich interakcji API.
*   **Sanityzacja HTML:** Wszystkie przychodzące e-maile HTML są sanityzowane (przy użyciu DOMPurify) przed renderowaniem, aby chronić przed atakami cross-site scripting (XSS) i pikselami śledzącymi.
