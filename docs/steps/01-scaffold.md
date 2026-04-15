# Krok 01 — Scaffold projektu

Cel
- Utworzyć szkielet frontendowej aplikacji w `frontend/` (Vite + Vue 3 + TypeScript + TSX).

Wyjście
- `frontend/` z `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx` oraz podstawowymi komponentami.

Szczegółowe podzadania
1. Utworzyć folder `frontend/` i dodać podstawowe pliki projektu (index.html, src/...).
2. Przygotować `vite.config.ts` z pluginami Vue i JSX.
3. Dodać minimalny `App.tsx` i komponenty `PromptForm` i `Preview`.
4. Nie instalować pakietów automatycznie — instalacja i build będą uruchamiane na żądanie (ręcznie lub przez agent).

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
