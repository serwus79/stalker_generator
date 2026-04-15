# Krok 05 — Formularz i walidacja (Zod)

Cel
- Zbudować formularz w Vue + TSX oraz schemat walidacji Zod zgodny z `docs/form-fields.md`.

Podzadania
1. Zdefiniować Zod schema odpowiadający `form-fields.md`.
2. Stworzyć komponent formularza `PromptFormWithValidation` korzystający z Composition API i `useForm()` (dowolna biblioteka albo prosty hook).
3. Obsłużyć zależne pola (preset nadpisuje orientację etc.).

Przykładowy snippet Zod

```ts
import { z } from 'zod'
export const FormSchema = z.object({
  ageGroup: z.enum(['under_5','under_10','under_16','16_plus']),
  presetId: z.string().optional(),
  orientation: z.enum(['A4_portrait','A4_landscape','auto']),
  primarySubject: z.string().optional(),
  lineWeight: z.enum(['very_thick','thick_comic','medium','fine'])
})
```

Weryfikacja
- Walidacja pól działa i blokuje niezgodne kombinacje.
- `npm run build` i testy jednostkowe przechodzą.
