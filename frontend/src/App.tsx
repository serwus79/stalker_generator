/** @jsx createVNode */
/** @jsx createVNode */
import { defineComponent, ref, h as createVNode } from 'vue'
import PromptFormWithValidation from './components/PromptFormWithValidation'
import Preview from './components/Preview'
import HistoryList from './components/HistoryList'
import useLocale from './locales/useLocale'
import { saveEntry } from './store/historyStore'

export default defineComponent({
  name: 'App',
  setup() {
    const prompt = ref('')
    const { t } = useLocale()

    function onGenerate(p: string) {
      prompt.value = p
    }

    const latestSnapshot = ref<any>(null)

    function onPreview(payload: any) {
      // payload: { prompt, snapshot }
      prompt.value = payload?.prompt || ''
      latestSnapshot.value = payload?.snapshot || null
    }

    const historyReload = ref(0)

    function saveCurrent() {
      const entry = {
        title: (latestSnapshot.value?.subjectDescription) || undefined,
        formSnapshot: latestSnapshot.value || {},
        generatedPrompt: prompt.value || '',
        targetProfile: undefined,
        tags: [],
        version: 'v1',
      }
      saveEntry(entry)
      historyReload.value += 1
    }

    return () => (
      <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
        <h1>{t('app.title')}</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <PromptFormWithValidation onGenerate={onGenerate} onPreview={onPreview} loadedSnapshot={latestSnapshot.value} />
          </div>
          <div style={{ width: '45%' }}>
            <Preview prompt={prompt.value} />
            <div style={{ marginTop: '12px' }}>
              <button data-testid="save-current" onClick={saveCurrent}>{t('app.save')}</button>
            </div>
            <div style={{ marginTop: '12px' }}>
              <HistoryList reloadSignal={historyReload.value} onLoad={(e: any) => { prompt.value = e.generatedPrompt; latestSnapshot.value = e.formSnapshot }} />
            </div>
          </div>
        </div>
      </div>
    )
  },
})
