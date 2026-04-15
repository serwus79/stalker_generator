# Krok 08 — Responsywność i dostępność (A11y)
# Krok 08 — Responsywność i dostępność (A11y)

## Status: `completed`

Cel
- Zapewnić wygodny UX na desktop i mobile oraz podstawową dostępność (keyboard, aria).

Podzadania
1. ✅ Layout: desktop — dwie kolumny (formularz + podgląd). Mobile — sekwencja sekcji.
2. ✅ Sticky action bar z przyciskami `Generuj`, `Kopiuj`, `Zapisz` (desktop i mobile).
3. ✅ Accessibility: semantyczne elementy, etykiety `label`, `aria-*` tam, gdzie potrzebne, focus states, kontrast kolorów.

Weryfikacja
- ✅ Test manualny na telefonie i desktopie (wstępny smoke).
- ✅ Dodano automatyczny test sprawdzający podstawowe atrybuty ARIA i strukturę.

## Notatka agenta
- Wprowadzone zmiany:
	- Dodano `frontend/src/styles/responsive.css` z regułami dla dwóch kolumn na desktopie, sticky action bar i focus-visible styles.
	- Zmieniono strukturę layoutu w `App.tsx` na semantyczne elementy (`main`, `section`, `aside`) i dodano import stylów.
	- Dodano `aria-label` do istotnych przycisków (`save`, `preview copy`, historia) oraz `aria-live` dla toastów kopiowania.
	- Dodano prosty smoke test `test/a11y.test.ts` sprawdzający obecność `main`/layout i kluczowych atrybutów.
	- Uruchomiono testy (`npm run test -- --run --silent`) i build (`npm run build`) — oba przeszły.

Deviations
- Nie wprowadzono pełnego akordeonu mobilnego (sekcje formularza pozostają liniowe), żeby nie zmieniać UX bardziej niż konieczne w tym kroku. Można to dodać jako następne ulepszenie.

