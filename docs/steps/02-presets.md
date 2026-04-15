# Krok 02 — Presets (Przeniesienie 16 scen)

## Status: `completed`

Cel
- Przenieść i ustrukturyzować 16 presetów scen z `dzieci_zony_prompty.md` do modułu `frontend/src/presets/presets.ts`.

Wyjście
- `frontend/src/presets/presets.ts` z tablicą presetów: każdy preset ma `id`, `title`, `ageGroup`, `orientation`, `description`, `defaults`.

Utworzone pliki
- `frontend/src/presets/presets.ts` — zawiera 16 presetów scen.
- `frontend/test/presets.test.ts` — test jednostkowy sprawdzający liczbę presetów i wymagane pola.

Podzadania
1. Otworzyć `dzieci_zony_prompty.md` i zmapować każdą scenę na obiekt preset.
2. Dodać krótkie opisy i domyślne wartości pól formularza (lineWeight, detailLevel, enforceNoGray itp.).
3. Utrzymać licencję i źródło: dokument jest Twoim materiałem — używamy go jako treści referencyjnej.

Weryfikacja
- Test jednostkowy `frontend/test/presets.test.ts` sprawdza, że eksport zawiera 16 presetów i pola wymagane.
- Po instalacji zależności: `npm run test` i `npm run build` powinny przechodzić.

## Notatka agenta
- Testy jednostkowe przeszły pomyślnie (`vitest`) i produkcyjny build (`vite build`) zakończył się sukcesem podczas weryfikacji lokalnej.

