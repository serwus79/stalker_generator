
# Krok 04 — PromptBuilderEngine

## Status: `completed`

Cel
- Zaimplementować silnik składania promptów: przyjmuje snapshot formularza i zwraca pojedynczy blok tekstu gotowy do kopiuj-wklej.

Wejście / Wyjście
- Wejście: `formSnapshot` (typescript object zgodny z `form-fields.md`).
- Wyjście: `string` — finalny prompt zgodny z `docs/prompt-format.md`.

Utworzone pliki
- `frontend/src/lib/promptBuilder.ts` — główna funkcja `buildPrompt(snapshot, language)` (domyślnie `pl`).
- `frontend/src/lib/promptBuilderEngine.ts` — wrapper `buildPromptForProfile(snapshot, profile)` z suffixami dla Midjourney/SD.
- `frontend/test/promptBuilder.test.ts` — testy jednostkowe sprawdzające generowanie promptu i profile.

Podzadania
1. Napisać funkcję `buildPrompt(snapshot, language)` z profilem docelowego generatora.
2. Zaimplementować reguły wiekowe (modyfikujące `lineWeight`, `detailLevel`).
3. Dodać opcjonalne suffixy dla `midjourney_v6` i `stable_diffusion`.
4. Napisać testy jednostkowe sprawdzające przykładowe snapshoty -> oczekiwane prompty.

Weryfikacja
- Unit testy (`vitest`) przechodzą lokalnie.
- `npm run build` kompiluje projekt bez błędów.

## Notatka agenta
- PromptBuilderEngine generuje domyślnie prompty w języku polskim. Można ustawić `outputLanguage: 'en'` w snapshot, aby otrzymać wersję angielską.
- Dodano suffix `--ar` i `--style raw` dla `midjourney_v6` oraz sugestię rozdzielczości i LoRA dla `stable_diffusion`.

