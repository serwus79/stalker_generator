# Krok 06 — Live preview i kopiowanie promptu

Cel
- Dodać panel podglądu wygenerowanego promptu oraz przycisk kopiuj (Clipboard API) z potwierdzeniem.

Podzadania
1. Komponent `Preview` wyświetla aktualnie wygenerowany prompt (aktualizacja w czasie rzeczywistym).
2. Przycisk `Kopiuj` używa `navigator.clipboard.writeText(prompt)` z fallbackiem.
3. Pokazywać krótkie potwierdzenie (toast) po skopiowaniu.

Weryfikacja
- Kliknięcie `Kopiuj` wkleja poprawny tekst do schowka.
- Podgląd aktualizuje się po zmianie formularza.
