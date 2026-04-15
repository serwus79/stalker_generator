import { describe, it, expect } from 'vitest'
import presets from '../src/presets/presets'

describe('presets', () => {
  it('exports 16 presets', () => {
    expect(presets.length).toBe(16)
  })

  it('each preset has required fields', () => {
    const p = presets[0]
    expect(p).toHaveProperty('id')
    expect(p).toHaveProperty('title')
    expect(p).toHaveProperty('ageGroup')
    expect(p).toHaveProperty('orientation')
    expect(p).toHaveProperty('defaults')
  })
})
