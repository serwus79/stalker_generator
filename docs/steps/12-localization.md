# Krok 12 — Lokalizacja (UI w języku polskim)

Cel
- UI aplikacji i wszystkie etykiety, komunikaty i domyślne treści powinny być w języku polskim. Nazwy techniczne i identyfikatory w kodzie pozostają po angielsku.

Podzadania
1. Dodać prosty mechanizm lokalizacji (np. `frontend/src/locales/pl.json`) i helper `useLocale()` lub prosty `messages` object.
2. Przetłumaczyć wszystkie etykiety formularza, przyciski, toasty i komunikaty walidacyjne na polski.
3. Generowane prompty domyślnie w języku polskim; dodać opcję zmiany języka (np. `outputLanguage`), jeżeli użytkownik chce prompt po angielsku.

Weryfikacja
- UI wyświetla polskie teksty po uruchomieniu aplikacji.
- Przy generowaniu promptu (domyślnie) tekst jest po polsku; opcja przełączenia jezykowego działa poprawnie.
