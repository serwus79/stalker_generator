# Stalker Prompt Generator — frontend

Krótki przewodnik jak uruchomić i rozwijać frontend aplikacji Generatora promptów.

Quick start

1. Zainstaluj zależności:

```bash
cd frontend
npm install
```

2. Uruchom tryb developerski:

```bash
npm run dev
```

3. Buduj produkcyjnie:

```bash
npm run build
```

Testy

- Uruchom pełny test (interaktywne/bez --run):

```bash
npm run test
```

- Dla CI / zautomatyzowanych uruchomień zawsze dodaj `-- --run` (vitest domyślnie uruchamia watch):

```bash
npm run test -- --run --silent
npm run test:unit
```

Struktura i dodawanie presetów

- Presety (sceny) znajdują się w `frontend/src/presets/presets.ts` jako tablica obiektów. Każdy preset powinien zawierać pola: `id`, `title`, `ageGroup`, `orientation`, `description?`, `defaults?`.
- Aby dodać nowy preset: dopisz nowy obiekt do listy i uruchom build/test.

Jak działa generator

- Generator składa prompt deterministycznie na podstawie snapshotu formularza. Logika znajduje się w `frontend/src/lib/promptBuilder.ts` oraz `promptBuilderEngine.ts`.
- Snapshot formularza (przykład i format) opisany jest w `docs/snapshots.md`.
- Historia promptów zapisywana jest w `localStorage` pod kluczem `stalker_prompt_history_v1`.

Agent i automatyzacja

- W repozytorium może być skrypt agenta do automatyzacji zadań (`scripts/agent.js`). Skrypt agenta nie wykonuje `git commit` ani `git push` automatycznie — wszelkie zmiany muszą być potwierdzone ręcznie przez developera.
- Jeśli uruchamiasz agenta lokalnie, sprawdź zawartość skryptu i parametry przed wykonaniem.

Kontrybucja

- Uruchom testy jednostkowe: `npm run test:unit`.
- Formatowanie: `npm run format`.
- Linting: `npm run lint`.

Kontakt

W razie pytań dodaj issue w repozytorium lub skontaktuj się z autorem projektu.
