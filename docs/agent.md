# Agent (scripts/agent.js) — opis i ograniczenia

Jeśli repozytorium zawiera skrypt automatyzujący kroki deweloperskie (`scripts/agent.js`), postępuj zgodnie z poniższymi zasadami:

- Skrypt może uruchamiać zadania lokalne (formatowanie, uruchomienie testów, tworzenie plików), ale NIE powinien wykonywać `git commit` ani `git push` bez jawnej zgody developera.
- Zanim uruchomisz agenta, przejrzyj treść skryptu i upewnij się, że nie wykonuje operacji sieciowych ani modyfikuje repozytorium bez Twojej zgody.
- Agenta uruchamiasz z katalogu `frontend` (jeśli skrypt jest tam umieszczony):

```bash
node ../scripts/agent.js
```

- Jeśli chcesz, żeby agent zastosował poprawki w plikach, zrób review zmian i ręcznie zatwierdź je przez `git add` i `git commit` — agent może zasugerować zmiany, ale nie powinien ich samodzielnie zatwierdzać.
