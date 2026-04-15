import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PromptFormWithValidation from '../src/components/PromptFormWithValidation'

describe('PromptFormWithValidation integration', () => {
  it('applies preset defaults and generates prompt', async () => {
    const wrapper = mount(PromptFormWithValidation)

    const presetSelect = wrapper.find('[data-testid="preset-select"]') as any
    await presetSelect.setValue('pseudodog')

    const generateButton = wrapper.find('button')
    await generateButton.trigger('click')

    await new Promise(r => setTimeout(r, 50))

    const generated = wrapper.find('[data-testid="generated-prompt"]')
    expect(generated.text()).toContain('Cute pseudodog')
  })
})
