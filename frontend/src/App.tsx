import { defineComponent, ref } from 'vue'
import PromptForm from './components/PromptForm'
import Preview from './components/Preview'

export default defineComponent({
  name: 'App',
  setup() {
    const prompt = ref('')

    function onGenerate(p: string) {
      prompt.value = p
    }

    return () => (
      <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
        <h1>Generator promptów — Dzieci Zony</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <PromptForm onGenerate={onGenerate} />
          </div>
          <div style={{ width: '45%' }}>
            <Preview prompt={prompt.value} />
          </div>
        </div>
      </div>
    )
  },
})
