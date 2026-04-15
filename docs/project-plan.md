# Stalker Prompt Generator — Plan projektu (SPA: Vue + TSX)

Data: 15 kwietnia 2026

## Cel

- Aplikacja SPA generująca gotowe prompty do wklejenia do popularnych chatów AI.
- Prompt jest tworzony deterministycznie z formularza i predefiniowanych szablonów (bez AI po stronie aplikacji).
- Umożliwi zapis historii promptów w `localStorage` oraz odtworzenie formularza z historii.

## Zakres funkcjonalny

- Wybór grupy wiekowej i sceny (16 presetów).
- Parametry dodatkowe związane z uniwersum S.T.A.L.K.E.R. (frakcje, artefakty, anomalie, mutanty, lokacje).
- Generowanie gotowego, jednolitego promptu gotowego do kopiuj-wklej.
- Kopiowanie jednym kliknięciem, zapis i odtworzenie z historii.

## Stack i architektura

- Frontend: Vue 3 + TypeScript + TSX (Vite).
- Stan: Pinia.
- Routing: Vue Router.
- Walidacja: Zod.
- UI: lekkie komponenty TSX (design tokens), responsywność adaptacyjna.
- Persistencja: `localStorage` przez warstwę repository z wersjonowaniem schematu.
- Lokalizacja: UI i etykiety w języku polskim; generowane prompty domyślnie w języku polskim. Nazwy plików i identyfikatory w kodzie pozostają po angielsku.

## Główne moduły

1. PromptPresetCatalog — statyczna biblioteka presetów (16 scen).
2. UniverseTaxonomy — słowniki: frakcje, artefakty, anomalie, mutanty, lokacje.
3. PromptBuilderEngine — reguły składania promptu i profile dla różnych generatorów (ChatGPT, Midjourney, SD...).
4. FormStateStore — stan formularza, walidacja, snapshoty.
5. PromptHistoryStore — zapis/odczyt historii w `localStorage`.
6. UX Layer — formularz, live preview, przyciski akcji, mobile-friendly.

## UX i responsywność

- Desktop: dwukolumnowy layout (formularz + podgląd promptu), sticky action bar.
- Mobile: single column z akordeonami sekcji, sticky bottom bar (Generate / Copy / Save).
- Szybkie akcje: kopiuj z potwierdzeniem, przywróć z historii, duplikuj wpis.

## Reguły generatora promptów

- Preset ładuje domyślną konfigurację sceny i orientacji (A4 portrait/landscape).
- Reguły wiekowe modyfikują style i poziom detalu (under_5 → very thick lines, minimal details).
- Blokady spójności (np. młodsze grupy blokują wybór przerażających mutantów lub automatycznie obniżają grozę).
- Profile docelowe (Midjourney, DALL·E, Stable Diffusion, ChatGPT) wkładają dodatkowe suffixy/parametry.

## Format wynikowego promptu

- Prompt jest jednowierszowym (lub jednoblokowym) blokiem tekstu gotowym do kopiuj-wklej.
- Składa się z: nagłówka technicznego (format, DPI, orientacja), opisu świata (inspired by S.T.A.L.K.E.R.), opisu sceny i stylu, ograniczeń (no text, no watermark), opcjonalnego suffixu anty-szary.

## Historia i `localStorage`

- Struktura wpisu: `id`, `createdAt`, `title`, `formSnapshot`, `generatedPrompt`, `targetProfile`, `tags`, `version`.
- Funkcje: save current, load to form, copy saved prompt, delete, clear all.
- Ograniczenie: ustawialny limit wpisów (np. 100), stary wpis usuwa się FIFO.

## Plan etapowy

Poniższa tabela dzieli plan na mniejsze kroki; kolumna `Docs` linkuje do szczegółowych instrukcji w `docs/steps/`.

|   # | Krok                                                        |   Status    | Dokumentacja                                                                                   |
| --: | ----------------------------------------------------------- | :---------: | ---------------------------------------------------------------------------------------------- |
|   1 | Scaffold projektu (Vite + Vue 3 + TSX + Pinia + Router)     | Not started | [docs/steps/01-scaffold.md](docs/steps/01-scaffold.md)                                         |
|   2 | Przenieść presety (16 scen) do `PromptPresetCatalog`        | Not started | [docs/steps/02-presets.md](docs/steps/02-presets.md)                                           |
|   3 | Zaimplementować `UniverseTaxonomy` (słowniki)               | Not started | [docs/steps/03-taxonomy.md](docs/steps/03-taxonomy.md)                                         |
|   4 | Napisać `PromptBuilderEngine` (reguły i profile)            | Not started | [docs/steps/04-prompt-builder-engine.md](docs/steps/04-prompt-builder-engine.md)               |
|   5 | Zbudować formularz z walidacją (Zod) i dependency fields    | Not started | [docs/steps/05-form-validation.md](docs/steps/05-form-validation.md)                           |
|   6 | Dodać live preview, kopiowanie i zapis                      | Not started | [docs/steps/06-live-preview-copy.md](docs/steps/06-live-preview-copy.md)                       |
|   7 | Dodać historię w `localStorage` i eksport/import snapshotów | Not started | [docs/steps/07-history-localstorage.md](docs/steps/07-history-localstorage.md)                 |
|   8 | Lokalizacja UI — język polski (i plik `locales/pl.json`)    | Not started | [docs/steps/12-localization.md](docs/steps/12-localization.md)                                 |
|   9 | Responsywność, dostępność (A11y) i UX polish                | Not started | [docs/steps/08-responsiveness-accessibility.md](docs/steps/08-responsiveness-accessibility.md) |
|  10 | Testy jednostkowe i integracyjne                            | Not started | [docs/steps/09-tests.md](docs/steps/09-tests.md)                                               |
|  11 | Dokumentacja i README                                       | Not started | [docs/steps/10-docs-readme.md](docs/steps/10-docs-readme.md)                                   |
|  12 | Punkty weryfikacji buildów (CI/local)                       | Not started | [docs/steps/11-build-checkpoints.md](docs/steps/11-build-checkpoints.md)                       |

## Build verification checkpoints

Poniżej znajdują się punkty kontrolne, po których wykonamy sprawdzenie, czy aplikacja się buduje i działa poprawnie.

- [ ] After scaffold: start dev server and run production build (`npm run dev`, `npm run build`) — confirm build succeeds and dev server runs.
- [ ] After presets added: run `npm run build` — confirm no build errors.
- [ ] After `PromptBuilderEngine`: run `npm run build` and unit tests (`npm test`) — confirm compilation and tests pass.
- [ ] After form implementation: run `npm run build` and perform a smoke UI test (open app, check console errors).
- [ ] After history support: run `npm run build` and verify persistence across reloads.
- [ ] Final full verification: `npm run build`, `npm test`, manual QA on desktop and mobile.

Typical verification commands (adapt to your package manager):

```bash
npm install
npm run dev
npm run build
npm test
```

Make sure CI or local environment runs these checks after the listed milestones.

## Kryteria akceptacji

- Wszystkie 16 presetów generuje prompt zgodny ze stylem i orientacją.
- Prompt jest gotowy do kopiuj-wklej bez dalszych poprawek.
- Historia działa po odświeżeniu i odtwarza formularz.
- UX działający na desktop i mobile.

## Następne kroki

- Chcesz, żebym od razu wygenerował scaffold projektu (Vite + Vue 3 + TSX) i podstawowe pliki?
