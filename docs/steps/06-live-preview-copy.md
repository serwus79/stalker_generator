# Krok 06 — Live preview i kopiowanie promptu

## Status: `completed`

Cel
- Dodać panel podglądu wygenerowanego promptu oraz przycisk kopiuj (Clipboard API) z potwierdzeniem.

Podzadania
1. Komponent `Preview` wyświetla aktualnie wygenerowany prompt (aktualizacja w czasie rzeczywistym).
2. Przycisk `Kopiuj` używa `navigator.clipboard.writeText(prompt)` z fallbackiem.
3. Pokazywać krótkie potwierdzenie (toast) po skopiowaniu.

Weryfikacja
- Kliknięcie `Kopiuj` wkleja poprawny tekst do schowka.
- Podgląd aktualizuje się po zmianie formularza.

## Notatka agenta
- Rozpoczęto implementację Live Preview i przycisku Kopiuj.
- Następne kroki: dodać komponent `Preview`, podłączyć go do `PromptFormWithValidation`, dodać testy integracyjne i uruchomić testy + build.

## Zrealizowane
- Dodano komponent `frontend/src/components/Preview.tsx` — podgląd promptu, przycisk `Kopiuj` używający `navigator.clipboard.writeText` z fallbackiem i prosty toast potwierdzenia.
- Zmieniono `frontend/src/components/PromptFormWithValidation.tsx` — teraz generuje i przekazuje podgląd w czasie rzeczywistym do `Preview` (używa `computed`), zachowano funkcję ręcznego `Generuj prompt`.
- Dodano test integracyjny `frontend/test/preview.integration.test.ts` (sprawdza update preview i kopiowanie) oraz zaktualizowano `frontend/test/promptForm.integration.test.ts`.
- Uruchomiono `npm run test -- --run --silent` — wszystkie testy przeszły (13 passed).
- Uruchomiono `npm run build` — produkcyjny build udany.
