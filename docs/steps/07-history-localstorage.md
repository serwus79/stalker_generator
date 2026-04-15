# Krok 07 — Historia promptów w `localStorage`

Cel
- Zapewnić zapisywanie, przeglądanie i odtwarzanie historii wygenerowanych promptów po stronie klienta.

Podzadania
1. Stworzyć prosty store `frontend/src/store/historyStore.ts` z funkcjami `loadHistory`, `saveEntry`, `deleteEntry`.
2. Struktura wpisu: `id`, `createdAt`, `title`, `formSnapshot`, `generatedPrompt`, `targetProfile`, `tags`, `version`.
3. UI: lista historii z możliwością `Load` (wczytaj snapshot do formularza), `Copy`, `Delete`, `Export`.

## Status: `in-progress`

## Notatka agenta
- Rozpoczęto implementację historii: utworzę `frontend/src/store/historyStore.ts`, komponent `HistoryList` oraz testy jednostkowe dla store i test integracyjny dla zapisu/odczytu z `localStorage`.

## Zrealizowane
- Dodano `frontend/src/store/historyStore.ts` z funkcjami `loadHistory`, `saveEntry`, `deleteEntry`, `clearHistory` (UUID dla identyfikatorów wpisów).
- Dodano komponent UI `frontend/src/components/HistoryList.tsx` z przyciskami `Load`, `Copy`, `Delete`, `Export`.
- Dodano przycisk `Zapisz` w prawej kolumnie w `frontend/src/App.tsx` — zapisuje obecny snapshot i prompt do historii.
- Dodano testy: `frontend/test/historyStore.test.ts` (unit) i `frontend/test/history.integration.test.ts` (integration: save + load).
- Uruchomiono `npm run test -- --run --silent` — testy przeszły (17 passed).
- Uruchomiono `npm run build` — produkcyjny build udany.

Weryfikacja
- Po odświeżeniu strony wpisy pozostają w localStorage.
- Funkcja `Load` poprawnie odtwarza stan formularza.
