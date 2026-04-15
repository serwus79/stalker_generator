# Krok 12 — Lokalizacja (UI w języku polskim)

## Status: `completed`

Cel
- UI aplikacji i wszystkie etykiety, komunikaty i domyślne treści powinny być w języku polskim. Nazwy techniczne i identyfikatory w kodzie pozostają po angielsku.

Podzadania
1. ✅ Dodać prosty mechanizm lokalizacji (`frontend/src/locales/pl.json`) i helper `useLocale()`.
2. ✅ Przetłumaczyć wszystkie etykiety formularza, przyciski, toasty i komunikaty walidacyjne na polski.
3. ✅ Domyślny język generowanych promptów ustawiony na polski; pole `outputLanguage` pozostaje dostępne do zmiany.

Weryfikacja
- ✅ UI wyświetla polskie teksty po uruchomieniu aplikacji.
- ✅ Przy generowaniu promptu (domyślnie) tekst jest po polsku; opcja przełączenia języka jest dostępna w schemacie formularza.

## Notatka agenta
- Zmiany wprowadzone:
	- Dodano i rozszerzono `frontend/src/locales/pl.json` (age options, subjectType options, placeholdery, etykiety dodatkowe).
	- Dodano helper `useLocale()` (jeśli nie istniał) i użyto go w: `App.tsx`, `PromptForm.tsx`, `PromptFormWithValidation.tsx`, `Preview.tsx`, `HistoryList.tsx`.
	- Zaktualizowano testy i uruchomiono `npm run test -- --run --silent` — wszystkie testy przeszły.
	- Uruchomiono `npm run build` — build produkcyjny udany.
- Decyzje i uwagi:
	- Pozostawiono identyfikatory techniczne po angielsku; tylko UI i komunikaty są po polsku.
	- `useLocale().t()` zwraca klucz jako fallback jeśli tłumaczenie nie istnieje, co ułatwia stopniowe uzupełnianie pliku językowego.

