import { defineComponent, ref } from 'vue'
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
      <div class="app-root">
        <h1>{t('app.title')}</h1>
        <main class="main-layout" role="main" aria-label={t('app.title')}>
          <section class="form-column" aria-label="Form">
            <PromptFormWithValidation onGenerate={onGenerate} onPreview={onPreview} loadedSnapshot={latestSnapshot.value} />
          </section>
          <aside class="preview-column" aria-label="Preview and history">
            <Preview prompt={prompt.value} />
            <div class="action-bar" role="region" aria-label="Actions">
              <button data-testid="save-current" aria-label={t('app.save')} onClick={saveCurrent}>{t('app.save')}</button>
            </div>
            <div style={{ marginTop: '12px' }}>
              <HistoryList reloadSignal={historyReload.value} onLoad={(e: any) => { prompt.value = e.generatedPrompt; latestSnapshot.value = e.formSnapshot }} />
            </div>
          </aside>
        </main>
      </div>
    )
  },
})
