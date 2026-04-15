import { describe, it, expect } from 'vitest'
import taxonomy, { artifacts, factions, mutants, locations, anomalies } from '../src/lib/taxonomy'

describe('taxonomy', () => {
  it('exports non-empty factions', () => {
    expect(factions.length).toBeGreaterThan(0)
  })

  it('contains crystal artifact', () => {
    const ids = artifacts.map(a => a.id)
    expect(ids).toContain('crystal')
  })

  it('contains pseudodog mutant', () => {
    expect(mutants).toContain('pseudodog')
  })

  it('contains cordon location', () => {
    expect(locations).toContain('cordon')
  })

  it('taxonomy default export matches keys', () => {
    expect(Object.keys(taxonomy)).toEqual(expect.arrayContaining(['factions', 'artifacts', 'anomalies', 'mutants', 'locations']))
  })
})
