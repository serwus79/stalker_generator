import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/lib/promptBuilder'

describe('promptBuilder parameter coverage', () => {
  it('includes primarySubject for location (x18)', () => {
    const p = buildPrompt({ subjectType: 'location', primarySubject: 'x18' })
    expect(p).toContain('x18')
  })

  it('uses subjectDescription when provided instead of primarySubject', () => {
    const p = buildPrompt({ primarySubject: 'x18', subjectDescription: 'Laboratorium X18, tajne' })
    expect(p).toContain('Laboratorium X18, tajne')
    expect(p).not.toContain('Temat: x18')
  })

  it('reflects DPI and orientation', () => {
    const p = buildPrompt({ orientation: 'A4_landscape', dpi: 600 })
    expect(p).toContain('600 DPI')
    expect(p).toContain('pozioma')
  })

  it('includes composition mapping for panorama', () => {
    const p = buildPrompt({ composition: 'panorama' })
    expect(p).toContain('szeroka panorama')
  })

  it('appends anti-gray suffix when enforceNoGray is true', () => {
    const p = buildPrompt({ enforceNoGray: true })
    expect(p).toContain('absolutely no gray fills')
  })

  it('maps lineWeight to human text', () => {
    const p = buildPrompt({ lineWeight: 'very_thick' })
    expect(p).toContain('bardzo grube kontury')
  })
})
