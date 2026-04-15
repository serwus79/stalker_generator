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

    const input = wrapper.find('input#subject-desc')
    await input.setValue('history test subject')

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
    await input.setValue('changed')
    await new Promise(r => setTimeout(r, 20))

    // click load on first entry
    const loadBtn = items[0].find('[data-testid="history-load"]')
    await loadBtn.trigger('click')

    await new Promise(r => setTimeout(r, 60))

    const currentInput = wrapper.find('input#subject-desc')
    expect((currentInput.element as HTMLInputElement).value).toContain('history test subject')
  })
})
