# Krok 07 — Historia promptów w `localStorage`

Cel
- Zapewnić zapisywanie, przeglądanie i odtwarzanie historii wygenerowanych promptów po stronie klienta.

Podzadania
1. Stworzyć prosty store `frontend/src/store/historyStore.ts` z funkcjami `loadHistory`, `saveEntry`, `deleteEntry`.
2. Struktura wpisu: `id`, `createdAt`, `title`, `formSnapshot`, `generatedPrompt`, `targetProfile`, `tags`, `version`.
3. UI: lista historii z możliwością `Load` (wczytaj snapshot do formularza), `Copy`, `Delete`, `Export`.

Weryfikacja
- Po odświeżeniu strony wpisy pozostają w localStorage.
- Funkcja `Load` poprawnie odtwarza stan formularza.
