import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App'
import { clearHistory } from '../src/store/historyStore'

describe('History UI integration', () => {
  beforeEach(() => {
    try { clearHistory() } catch { /* ignore */ }
  })

  it('saves current prompt and loads it back into the form', async () => {
    const wrapper = mount(App)

    // Add subject
    const addSubjectBtns = wrapper.findAll('button').filter(b => b.text().includes('Dodaj temat'))
    if (addSubjectBtns.length > 0) {
      await addSubjectBtns[0].trigger('click')
      await new Promise(r => setTimeout(r, 40))
    }

    const inputs = wrapper.findAll('input[type="text"]')
    if (inputs.length > 0) {
      await inputs[0].setValue('history test subject')
    }

    // wait for preview update
    await new Promise(r => setTimeout(r, 60))

    const saveBtn = wrapper.find('[data-testid="save-current"]')
    await saveBtn.trigger('click')

    // wait for history to be saved
    await new Promise(r => setTimeout(r, 60))

    const list = wrapper.find('[data-testid="history-list"]')
    expect(list.exists()).toBe(true)
    const items = list.findAll('li')
    expect(items.length).toBeGreaterThanOrEqual(1)

    // change form
    if (inputs.length > 0) {
      await inputs[0].setValue('changed')
    }
    await new Promise(r => setTimeout(r, 20))

    // click load on first entry
    const loadBtn = items[0].find('[data-testid="history-load"]')
    await loadBtn.trigger('click')

    await new Promise(r => setTimeout(r, 60))

    const updatedInputs = wrapper.findAll('input[type="text"]')
    if (updatedInputs.length > 0) {
      expect((updatedInputs[0].element as HTMLInputElement).value).toContain('history test subject')
    }
  })
})
