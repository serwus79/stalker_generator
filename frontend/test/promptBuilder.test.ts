import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../src/lib/promptBuilder'

describe('buildPrompt', () => {
  it('generates a base prompt containing subject', () => {
    const prompt = buildPrompt({ ageGroup: 'under_10', primarySubject: 'pseudodog', lineWeight: 'very_thick', orientation: 'A4_portrait', dpi: 300, marginMm: 10 })
    expect(prompt).toContain('pseudodog')
    expect(prompt).toContain('A4 portrait')
  })
})
