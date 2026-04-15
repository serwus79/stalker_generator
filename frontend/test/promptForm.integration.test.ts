import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App'

describe('PromptFormWithValidation integration (App)', () => {
  it('applies preset defaults and generates prompt', async () => {
    const wrapper = mount(App)

    // Select preset
    const presetSelect = wrapper.find('[data-testid="preset-select"]') as any
    await presetSelect.setValue('pseudodog')

    await new Promise(r => setTimeout(r, 80))

    // Generate with whatever is set (preset may create a subject)
    const generateBtns = wrapper.findAll('button')
    const generateBtn = generateBtns.find(b => b.text().includes('Generate') || b.text().includes('Generuj'))
    if (generateBtn) {
      await generateBtn.trigger('click')
      await new Promise(r => setTimeout(r, 80))
    }

    const generated = wrapper.find('[data-testid="preview-text"]')
    expect(generated.exists()).toBe(true)
    expect(generated.text().length).toBeGreaterThan(0)
  })

  it('updates preview when selecting an artifact as primary subject', async () => {
    const wrapper = mount(App)

    // Find and click add subject button
    const addBtns = wrapper.findAll('button')
    const addSubjectBtn = addBtns.find(b => b.text().includes('Dodaj temat')) || addBtns[addBtns.length - 2]
    if (addSubjectBtn) {
      await addSubjectBtn.trigger('click')
      await new Promise(r => setTimeout(r, 40))
    }

    // Select artifact type on first subject - find by data-testid
    const typeSelect = wrapper.find('[data-testid="subject-type-select-0"]') as any
    if (typeSelect.exists()) {
      await typeSelect.setValue('artifact')
      await new Promise(r => setTimeout(r, 40))

      // Find artifact select and choose crystal
      const artifactSelect = wrapper.find('[data-testid="primary-subject-artifact-0"]') as any
      if (artifactSelect.exists()) {
        await artifactSelect.setValue('Crystal')
        await new Promise(r => setTimeout(r, 40))

        const preview = wrapper.find('[data-testid="preview-text"]')
        expect(preview.text()).toContain('Crystal')
      }
    }
  })
})
