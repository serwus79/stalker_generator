export type Snapshot = {
  ageGroup?: string
  primarySubject?: string
  subjectDescription?: string
  lineWeight?: string
  detailLevel?: string
  orientation?: string
  dpi?: number
  marginMm?: number
  composition?: string
  enforceNoGray?: boolean
  outputLanguage?: string
}

export function buildPrompt(snapshot: Snapshot = {}, language = 'pl') {
  const s = snapshot || {}
  const lang = (s.outputLanguage || language || 'pl').toLowerCase()

  const orientationIsLandscape = s.orientation === 'A4_landscape'
  const dpi = s.dpi || 300
  const margin = s.marginMm || 10

  if (lang === 'en') {
    const ageMap: any = {
      under_5: 'toddlers age 2-5',
      under_10: 'children age 6-10',
      under_16: 'teenagers age 11-16',
      '16_plus': 'adults and older teens',
    }
    const ageText = ageMap[s.ageGroup ?? ''] || 'all ages'
    const lineWeight = s.lineWeight || 'medium'
    const subject = s.subjectDescription || s.primarySubject || 'a subject from the Zone'
    const orientationText = orientationIsLandscape ? 'landscape' : 'portrait'
    const detailText = s.detailLevel || 'medium'

    let prompt = `Black and white coloring page for ${ageText}, ${lineWeight} outlines, ${detailText} details, white background, printable. FORMAT: A4 ${orientationText} orientation, ${dpi} DPI, print-ready, safe print margins ${margin}mm on all sides. Inspired by the S.T.A.L.K.E.R. video game universe by GSC Game World. Subject: ${subject}. Style: ${detailText}. No text, no watermarks.`
    if (s.enforceNoGray) {
      prompt += ' absolutely no gray fills, no shading, white areas only between black lines, coloring book style, print-ready'
    }
    return prompt
  }

  // Polish (default)
  const ageMapPl: any = {
    under_5: 'dla dzieci w wieku 2-5 lat',
    under_10: 'dla dzieci w wieku 6-10 lat',
    under_16: 'dla nastolatków 11-16 lat',
    '16_plus': 'dla dorosłych i starszych nastolatków',
  }
  const ageText = ageMapPl[s.ageGroup ?? ''] || 'dla wszystkich grup wiekowych'

  const lineWeightMapPl: any = {
    very_thick: 'bardzo grube kontury',
    thick_comic: 'grube kontury w stylu komiksowym',
    medium: 'średnie kontury',
    fine: 'drobne kontury',
  }
  const lineWeightText = lineWeightMapPl[s.lineWeight ?? ''] || 'średnie kontury'

  const detailMapPl: any = {
    low: 'bardzo proste kształty, duże puste obszary do kolorowania',
    medium: 'średni poziom detali, duże obszary do kolorowania',
    medium_high: 'średnio wysoki poziom detali',
    high: 'wysoki poziom detali',
  }
  const detailText = detailMapPl[s.detailLevel ?? ''] || 'średni poziom detali'

  const orientationTextPl = orientationIsLandscape ? 'pozioma' : 'pionowa'
  const compositionTextPl = s.composition === 'panorama' ? 'szeroka panorama' : s.composition === 'full_figure' ? 'pełna postać' : 'kompozycja wyśrodkowana'

  const subject = s.subjectDescription || s.primarySubject || 'obiekt ze Strefy'

  let prompt = `Czarnobiała strona do kolorowania ${ageText}, ${lineWeightText}, ${detailText}, białe tło, gotowe do druku. FORMAT: A4 ${orientationTextPl} (${dpi} DPI), print-ready, bezpieczne marginesy ${margin}mm po wszystkich stronach, ${compositionTextPl}. Inspiracja: universum S.T.A.L.K.E.R. (GSC Game World). Temat: ${subject}. Styl: ${detailText}. Brak tekstu, brak znaków wodnych.`

  if (s.enforceNoGray) {
    // the anti-gray suffix is helpful for many generators — keep it in English as a strict instruction
    prompt += ' absolutely no gray fills, no shading, white areas only between black lines, coloring book style, print-ready'
  }

  return prompt
}

