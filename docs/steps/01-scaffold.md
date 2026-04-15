
# Krok 01 — Scaffold projektu

## Status: `completed`

## Created files

Utworzone pliki (szkielet):

- `frontend/package.json`
- `frontend/index.html`
- `frontend/vite.config.ts`
- `frontend/tsconfig.json`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/components/PromptForm.tsx`
- `frontend/src/components/Preview.tsx`
- `frontend/src/lib/promptBuilder.ts`
- `frontend/src/lib/promptBuilderEngine.ts`
- `frontend/src/presets/presets.ts`
- `frontend/src/store/historyStore.ts`
- `frontend/src/locales/pl.json`
- `frontend/vitest.config.ts`
- `frontend/test/promptBuilder.test.ts`

## Notatka agenta

Szablon frontend został wygenerowany lokalnie. Następny krok: uruchomienie instalacji zależności i weryfikacja build'u (`npm install` i `npm run build`) w katalogu `frontend/`. Agent nie wykonuje instalacji automatycznie bez potwierdzenia.

Cel
- Utworzyć szkielet frontendowej aplikacji w `frontend/` (Vite + Vue 3 + TypeScript + TSX).

Wyjście
- `frontend/` z `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx` oraz podstawowymi komponentami.

Planned files to create
- `frontend/package.json`
- `frontend/index.html`
- `frontend/vite.config.ts`
- `frontend/tsconfig.json`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/components/PromptForm.tsx`
- `frontend/src/components/Preview.tsx`
- `frontend/src/lib/promptBuilder.ts`
- `frontend/src/lib/promptBuilderEngine.ts`
- `frontend/src/presets/presets.ts`
- `frontend/src/store/historyStore.ts`
- `frontend/src/locales/pl.json`
- `frontend/vitest.config.ts`
- `frontend/test/promptBuilder.test.ts`

Szczegółowe podzadania
1. Utworzyć folder `frontend/` i dodać powyższe pliki projektu.
2. Przygotować `vite.config.ts` z pluginami Vue i JSX.
3. Dodać minimalny `App.tsx` i komponenty `PromptForm` i `Preview`.
4. Nie instalować pakietów automatycznie — instalacja i build będą uruchamiane po potwierdzeniu (ręcznie lub przez agenta).

Weryfikacja
- Uruchomić (po instalacji zależności):

```bash
cd frontend
npm install
npm run dev   # uruchomienie dev server
npm run build # produkcyjna kompilacja
```

Kryteria akceptacji
- `npm run dev` uruchamia serwer deweloperski bez błędów.
- `npm run build` kończy się sukcesem i generuje `dist/`.

Wskazówka
- Nazwy plików, klas i identyfikatorów w kodzie — wyłącznie po angielsku; etykiety i treści UI — w języku polskim.
