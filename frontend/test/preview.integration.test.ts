import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App'

describe('Preview live update and copy (App)', () => {
  it('updates preview on input and copies to clipboard', async () => {
    const writeText = vi.fn()
    try {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText },
        configurable: true,
      })
    } catch (e) {
      ;(navigator as any).clipboard = { writeText }
    }

    const wrapper = mount(App)

    const input = wrapper.find('input#subject-desc')
    await input.setValue('przyjazny pseudodog')

    // wait for emitted preview and DOM update
    await new Promise(r => setTimeout(r, 80))

    const preview = wrapper.find('[data-testid="preview-text"]')
    expect(preview.exists()).toBe(true)
    expect(preview.text()).toContain('przyjazny pseudodog')

    const copyBtn = wrapper.find('[data-testid="preview-copy"]')
    await copyBtn.trigger('click')

    expect(writeText).toHaveBeenCalled()
    const calledArg = writeText.mock.calls[0][0]
    expect(calledArg).toContain('przyjazny pseudodog')
  })
})
