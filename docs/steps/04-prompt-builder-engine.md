# Krok 04 — PromptBuilderEngine

Cel
- Zaimplementować silnik składania promptów: przyjmuje snapshot formularza i zwraca pojedynczy blok tekstu gotowy do kopiuj-wklej.

Wejście / Wyjście
- Wejście: `formSnapshot` (typescript object zgodny z `form-fields.md`).
- Wyjście: `string` — finalny prompt zgodny z `docs/prompt-format.md`.

Podzadania
1. Napisać funkcję `buildPrompt(snapshot, profile)` z profilem docelowego generatora.
2. Zaimplementować reguły wiekowe (modyfikujące lineWeight, detailLevel).
3. Dodać opcjonalne suffixy dla Midjourney/SD (AR, style, resolution).
4. Napisać testy jednostkowe sprawdzające przykładowe snapshoty -> oczekiwane prompty.

Weryfikacja
- Unit testy dla kilku scen (Vitest/Jest) przechodzą.
- `npm run build` kompiluje moduł bez błędów.
