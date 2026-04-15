# Krok 03 — Universe Taxonomy (słowniki)

Cel
- Stworzyć moduł `frontend/src/lib/taxonomy.ts` zawierający słowniki uniwersum: frakcje, artefakty, anomalie, mutanty, lokacje.

Wyjście
- TS module z typami i tablicami/stringami do użycia w formularzu i autouzupełnianiu.

Przykładowy interfejs

```ts
export interface Taxonomy {
  factions: string[];
  artifacts: { id: string; name: string; short: string }[];
  anomalies: string[];
  mutants: string[];
  locations: string[];
}
```

Weryfikacja
- Import modułu w komponencie formularza i wyświetlenie kilku przykładów.
- `npm run build` bez błędów.
