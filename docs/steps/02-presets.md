# Krok 02 — Presets (Przeniesienie 16 scen)

Cel
- Przenieść i ustrukturyzować 16 presetów scen z `dzieci_zony_prompty.md` do modułu `frontend/src/presets/presets.ts`.

Wyjście
- `frontend/src/presets/presets.ts` z tablicą presetów: każdy preset ma `id`, `title`, `ageGroup`, `orientation`, `description`, `defaults`.

Podzadania
1. Otworzyć `dzieci_zony_prompty.md` i zmapować każdą scenę na obiekt preset.
2. Dodać krótkie opisy i domyślne wartości pól formularza (lineWeight, detailLevel, enforceNoGray itp.).
3. Utrzymać licencję i źródło: dokument jest Twoim materiałem — używamy go jako treści referencyjnej.

Weryfikacja
- Sprawdzić, że `presets.ts` eksportuje tablicę z 16 elementami.
- Uruchomić `npm run build` w `frontend/` i upewnić się, że kompilacja przechodzi.
