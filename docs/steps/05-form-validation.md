# Krok 05 — Formularz i walidacja (Zod)

## Status: `completed`

Cel
- Zbudować formularz w Vue + TSX oraz schemat walidacji Zod zgodny z `docs/form-fields.md`.

Podzadania
1. ✅ Zdefiniować Zod schema odpowiadający `form-fields.md`.
2. ✅ Stworzyć komponent formularza `PromptFormWithValidation` korzystający z Composition API i prostego hooka do formularza.
3. ✅ Obsłużyć zależne pola (preset nadpisuje orientację etc.).

Weryfikacja
- ✅ Walidacja pól działa i blokuje niezgodne kombinacje.
- ✅ `npm run test -- --run --silent` i `npm run build` przechodzą (12 tests, build successful).

## Notatka agenta
- Dodano `frontend/src/lib/formSchema.ts` (Zod schema z 13 polami).
- Dodano komponent `frontend/src/components/PromptFormWithValidation.tsx` z:
  - Integracją presetów (16 prezetów STALKER).
  - Warunkowym wyświetlaniem listy artefaktów, mutantów, lokacji na podstawie `subjectType`.
  - Walidacją Zod z obsługą błędów.
  - Wyświetlaniem wygenerowanego promptu.
- Dodano `frontend/test/promptForm.integration.test.ts` — test komponenty aplikuje preset i generuje prompt.
- Zainstalowano `zod@^4.3.6`, `@vue/test-utils@latest` (dla testów komponenty).
- Wszystkie testy przeszły (12 tests), build Vite udany.

