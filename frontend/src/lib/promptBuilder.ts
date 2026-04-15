export function buildPrompt(snapshot: any = {}) {
  const s = snapshot || {}
  const ageMap: any = {
    under_5: 'toddlers age 2-5',
    under_10: 'children age 6-10',
    under_16: 'teenagers age 11-16',
    '16_plus': 'adults and older teens',
  }
  const ageText = ageMap[s.ageGroup] || 'all ages'
  const lineWeight = s.lineWeight || 'medium'
  const subject = s.primarySubject || 'a subject from the Zone'
  const orientation = s.orientation === 'A4_landscape' ? 'landscape' : 'portrait'
  const dpi = s.dpi || 300
  const margin = s.marginMm || 10
  return `Black and white coloring page for ${ageText}, ${lineWeight} outlines, white background, printable. FORMAT: A4 ${orientation} orientation (${dpi} DPI), print-ready, safe print margins ${margin}mm on all sides. Inspired by the S.T.A.L.K.E.R. video game universe by GSC Game World. Subject: ${subject}. Style: ${s.detailLevel || 'medium'} details. No text, no watermarks.`
}
