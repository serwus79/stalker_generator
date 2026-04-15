# Krok 09 — Testy jednostkowe i integracyjne

## Status: `in-progress`

Cel
- Dodać testy jednostkowe dla `PromptBuilderEngine`, store'ów i wybranych komponentów oraz testy integracyjne (smoke/UI flows).

Podzadania
1. Wybrać narzędzia: `vitest` + `@testing-library/vue` dla unit/integration, `playwright` dla E2E opcjonalnie.
2. Napisać testy jednostkowe przykładowych snapshotów -> promptów.
3. Dodać skrypty npm: `test:unit`, `test:e2e`.

Weryfikacja
- ✅ `npm run test:unit` przechodzi lokalnie.
- E2E smoke test uruchamia aplikację i wykonuje podstawowy flow (generate -> copy -> save -> load).

## Notatka agenta
- Dodano skrypt `test:unit` w `frontend/package.json` uruchamiający `vitest` dla `test/unit`.
- Dodano jednostkowe testy dla `promptBuilder` i `promptBuilderEngine` w `test/unit/promptBuilder.unit.test.ts`.
- Uruchomione `npm run test:unit` — testy jednostkowe przeszły lokalnie.
