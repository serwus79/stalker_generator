import { describe, it, expect, beforeEach } from 'vitest'
import { clearHistory, loadHistory, saveEntry, deleteEntry } from '../src/store/historyStore'

describe('historyStore', () => {
  beforeEach(() => {
    try {
      clearHistory()
    } catch (e) {}
  })

  it('saves and loads entries', () => {
    const entry = saveEntry({ title: 't1', formSnapshot: { a: 1 }, generatedPrompt: 'p1' })
    const all = loadHistory()
    expect(all.length).toBeGreaterThanOrEqual(1)
    expect(all[0].generatedPrompt).toBe('p1')
    expect(all[0].formSnapshot.a).toBe(1)
    expect(all[0].id).toBeDefined()
  })

  it('deletes an entry', () => {
    const e1 = saveEntry({ title: 't1', formSnapshot: {}, generatedPrompt: 'p1' })
    const e2 = saveEntry({ title: 't2', formSnapshot: {}, generatedPrompt: 'p2' })
    deleteEntry(e1.id)
    const all = loadHistory()
    expect(all.find(x => x.id === e1.id)).toBeUndefined()
    expect(all.find(x => x.id === e2.id)).toBeDefined()
  })
})
