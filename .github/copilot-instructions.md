## Instrukcje dla Copilot / kodera

Cel:
- Aplikacja ma być napisana w Vue 3 + TypeScript + TSX, z dbałością o testy, modularność i dostępność.

Wymagania technologiczne i konwencje
- Używaj Vue 3 (Composition API) i TSX dla komponentów.
- Stan aplikacji: Pinia.
- Walidacja formularza: Zod.
- Bundler: Vite (projekty w `frontend/`).
- Testy: `vitest` + `@testing-library/vue` dla unit/integration; `playwright` dla E2E (opcjonalnie).
- Nazwy plików, klas i identyfikatorów w kodzie: angielskie (camelCase). Treści UI i komunikaty walidacyjne: język polski.

Jakość kodu
- Kod ma być modularny: małe komponenty, małe funkcje, czytelne API.
- Unikaj nadmiernych optymalizacji przed prototypem; preferuj czytelność i testowalność.
- Dodaj typy (TS) wszędzie tam, gdzie to ma sens; publiczne API modułów powinny mieć eksplicytne typy.
- Dodaj proste unit testy dla krytycznych modułów: `PromptBuilderEngine`, `historyStore`.

Dobre praktyki UI i dostępność
- Używaj semantycznych elementów HTML, `label` dla inputów, `aria-*` gdzie potrzeba.
- Zapewnij klawiaturową nawigację i widoczne focus states.
- Domyślne style i kontrast powinny spełniać podstawowe wymagania dostępności.

Internationalization / lokalizacja
- UI i domyślne prompty mają być w języku polskim. Przechowuj ciągi w `locales/pl.json` i użyj prostego helpera `useLocale()`.
- Pozostaw możliwość wygenerowania promptu w innym języku przez pole `outputLanguage`.

Bezpieczeństwo pracy i ograniczenia agenta
- Nie zakładaj brakujących plików; jeśli wymagany plik nie istnieje, zapytaj użytkownika.
- Kategorycznie nie wykonuj `git commit` lub `git push` za użytkownika. Zamiast tego, pokaż zmiany i zapytaj o potwierdzenie.
- Jeśli nie jesteś pewien jak ustrukturyzować dany moduł, zaproponuj 2-3 alternatywy i poproś o wybór.

Formatowanie i lint
- Projekt powinien używać `prettier` i `eslint` z regułami TypeScript. Dodaj skrypt `lint` w `package.json`.

Developer experience
- Dodaj `README.md` z instrukcjami uruchomienia: `npm install`, `npm run dev`, `npm run build`, `npm run test`.

Postępowanie przy wątpliwościach
- Jeśli brakuje informacji lub pojawia się niejasność, zapytaj użytkownika zamiast zgadywać. Krótkie pytania są preferowane (np. "Chcesz, żeby prompt był domyślnie po polsku czy po angielsku?").

