# Krok 11 — Punkty weryfikacji buildów

Cel
- Mieć jasne punkty kontrolne, po których wykonujemy kompilację i sprawdzamy, czy projekt się buduje.

Punkty kontrolne
1. After scaffold: `cd frontend && npm install && npm run build` — dev server i build.
2. After presets added: `npm run build` — brak błędów kompilacji.
3. After PromptBuilderEngine: `npm run build` + `npm test` — kompilacja i testy.
4. After form implementation: `npm run build` + szybki smoke test UI (otwórz app, sprawdź console).
5. After history support: `npm run build` i test persistence.
6. Final verification: `npm run build`, `npm test`, manual QA na desktop i mobile.

Przykładowe komendy

```bash
cd frontend
npm install
npm run dev
npm run build
npm run test
```
