/** @jsx createVNode */
import { defineComponent, ref, h as createVNode } from 'vue'
import PromptFormWithValidation from './components/PromptFormWithValidation'
import Preview from './components/Preview'

export default defineComponent({
  name: 'App',
  setup() {
    const prompt = ref('')

    function onGenerate(p: string) {
      prompt.value = p
    }

    function onPreview(p: string) {
      prompt.value = p
    }

    return () => (
      <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
        <h1>Generator promptów — Dzieci Zony</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <PromptFormWithValidation onGenerate={onGenerate} onPreview={onPreview} />
          </div>
          <div style={{ width: '45%' }}>
            <Preview prompt={prompt.value} />
          </div>
        </div>
      </div>
    )
  },
})
