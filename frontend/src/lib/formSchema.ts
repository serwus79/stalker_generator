import { z } from 'zod'

export const FormSchema = z.object({
  ageGroup: z.enum(['under_5', 'under_10', 'under_16', '16_plus']).default('under_10'),
  presetId: z.string().optional(),
  orientation: z.enum(['A4_portrait', 'A4_landscape', 'auto']).default('A4_portrait'),
  subjectType: z.enum(['character', 'artifact', 'anomaly', 'mutant', 'location', 'mixed']).optional(),
  primarySubject: z.string().optional(),
  subjectDescription: z.string().optional(),
  lineWeight: z.enum(['very_thick', 'thick_comic', 'medium', 'fine']).default('medium'),
  detailLevel: z.enum(['low', 'medium', 'medium_high', 'high']).default('medium'),
  composition: z.enum(['centered', 'full_figure', 'panorama', 'low_angle', 'dynamic_action']).default('centered'),
  dpi: z.number().default(300),
  marginMm: z.number().default(10),
  enforceNoGray: z.boolean().default(true),
  outputLanguage: z.string().default('pl'),
})

export type FormSnapshot = z.infer<typeof FormSchema>
