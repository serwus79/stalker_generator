import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../src/lib/promptBuilder'
import buildPromptForProfile from '../src/lib/promptBuilderEngine'

describe('buildPrompt', () => {
  it('generates a base prompt in Polish containing subject and orientation', () => {
    const prompt = buildPrompt({ ageGroup: 'under_10', primarySubject: 'pseudodog', lineWeight: 'very_thick', orientation: 'A4_portrait', dpi: 300, marginMm: 10 })
    expect(prompt).toContain('pionowa')
    expect(prompt).toContain('300 DPI')
    expect(prompt).toContain('pseudodog')
  })

  it('adds midjourney suffix for midjourney_v6 profile', () => {
    const prompt = buildPromptForProfile({ orientation: 'A4_portrait' }, 'midjourney_v6')
    expect(prompt).toContain('--ar 3:4')
    expect(prompt).toContain('--style raw')
  })
})
