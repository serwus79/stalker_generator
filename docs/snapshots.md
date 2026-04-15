# Snapshot & History formats

Plik `snapshot` (formularz) to prosty obiekt JSON zawierający stan formularza użyty do wygenerowania promptu.

Przykładowy `formSnapshot`:

```json
{
  "presetId": "preset_01",
  "ageGroup": "under_10",
  "subjectType": "artifact",
  "primarySubject": "pseudodog",
  "subjectDescription": "przyjazny pseudodog siedzący i uśmiechający się",
  "lineWeight": "very_thick",
  "detailLevel": "low",
  "orientation": "A4_portrait",
  "dpi": 300,
  "marginMm": 10,
  "enforceNoGray": true
}
```

Struktura wpisu historii (`history entry`):

```json
{
  "id": "uuid-v4",
  "createdAt": "2026-04-15T12:00:00.000Z",
  "title": "Tytuł (opcjonalny)",
  "formSnapshot": { ... },
  "generatedPrompt": "Czarnobiała strona do kolorowania ...",
  "targetProfile": "midjourney_v6",
  "tags": [],
  "version": "v1"
}
```

Klucz `localStorage` używany przez aplikację to: `stalker_prompt_history_v1`.
