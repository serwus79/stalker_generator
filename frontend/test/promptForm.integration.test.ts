import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App'

describe('PromptFormWithValidation integration (App)', () => {
  it('applies preset defaults and generates prompt', async () => {
    const wrapper = mount(App)

    const presetSelect = wrapper.find('[data-testid="preset-select"]') as any
    await presetSelect.setValue('pseudodog')

    const generateButton = wrapper.find('button')
    await generateButton.trigger('click')

    await new Promise(r => setTimeout(r, 80))

    const generated = wrapper.find('[data-testid="preview-text"]')
    expect(generated.text()).toContain('Cute pseudodog')
  })

  it('updates preview when selecting an artifact as primary subject', async () => {
    const wrapper = mount(App)

    const subjectType = wrapper.find('select#subject-type')
    await subjectType.setValue('artifact')

    // wait for artifact select to appear
    await new Promise(r => setTimeout(r, 40))

    const artifactSelect = wrapper.find('[data-testid="primary-subject-artifact"]')
    await artifactSelect.setValue('Crystal')

    await new Promise(r => setTimeout(r, 40))

    const preview = wrapper.find('[data-testid="preview-text"]')
    expect(preview.text()).toContain('Crystal')
  })
})
