
# Krok 03 — Universe Taxonomy (słowniki)

## Status: `completed`

Cel
- Stworzyć moduł `frontend/src/lib/taxonomy.ts` zawierający słowniki uniwersum: frakcje, artefakty, anomalie, mutanty, lokacje.

Wyjście
- `frontend/src/lib/taxonomy.ts` — TS module z typami i tablicami/stringami do użycia w formularzu i autouzupełnianiu.

Utworzone pliki
- `frontend/src/lib/taxonomy.ts` — eksportuje `factions`, `artifacts`, `anomalies`, `mutants`, `locations` i domyślny `taxonomy`.
- `frontend/test/taxonomy.test.ts` — test jednostkowy sprawdzający poprawność eksportów.

Weryfikacja
- Import modułu w komponencie formularza i wyświetlenie kilku przykładów.
- Po instalacji zależności: `npm run test` i `npm run build` przechodzą.

## Notatka agenta
- Moduł taxonomy utworzony na podstawie `docs/form-fields.md` i `dzieci_zony_prompty.md`. Dodano prosty zestaw testów jednostkowych; `vitest` oraz `vite build` przeszły lokalnie podczas weryfikacji.

