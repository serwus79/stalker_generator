import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/lib/promptBuilder'
import buildPromptForProfile from '../../src/lib/promptBuilderEngine'

describe('promptBuilder unit tests', () => {
  it('builds landscape prompt with specified DPI and subject', () => {
    const p = buildPrompt({
      ageGroup: 'under_10',
      subjects: [{ id: '1', subjectType: 'artifact', primarySubject: 'artifactX' }],
      lineWeight: 'very_thick',
      orientation: 'A4_landscape',
      dpi: 600,
      marginMm: 5,
    })
    expect(p).toContain('pozioma')
    expect(p).toContain('600 DPI')
    expect(p).toContain('artifactX')
  })

  it('appends stable_diffusion suggested resolution for profile', () => {
    const base = { orientation: 'A4_portrait' }
    const p = buildPromptForProfile(base, 'stable_diffusion')
    expect(p).toContain('suggested resolution')
    expect(p).toContain('2480x3508')
  })
})
