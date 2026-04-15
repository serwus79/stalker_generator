import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../src/App'

describe('Responsiveness & Accessibility (basic smoke)', () => {
  it('renders semantic layout and accessible controls', () => {
    const wrapper = mount(App)

    // main layout exists
    expect(wrapper.find('.main-layout').exists()).toBeTruthy()

    // Save button has aria-label
    const saveBtn = wrapper.get('[data-testid="save-current"]')
    expect(saveBtn.attributes('aria-label')).toBe('Zapisz')

    // Preview copy button has aria-label
    const previewBtn = wrapper.get('[data-testid="preview-copy"]')
    expect(previewBtn.attributes('aria-label')).toBe('Kopiuj')

    // Preset label exists and is associated with input
    expect(wrapper.find('label[for="preset-select"]').exists()).toBeTruthy()
  })
})
