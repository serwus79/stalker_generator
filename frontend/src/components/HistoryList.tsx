import { defineComponent, ref, onMounted, watch } from 'vue'
import { loadHistory, deleteEntry as deleteEntryStore } from '../store/historyStore'
import useLocale from '../locales/useLocale'

export default defineComponent({
  name: 'HistoryList',
  props: {
    reloadSignal: { type: Number, default: 0 },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const entries = ref<any[]>([])
    const { t } = useLocale()

    function refresh() {
      entries.value = loadHistory()
    }

    onMounted(() => refresh())

    watch(() => props.reloadSignal, () => refresh())

    function handleLoad(e: any) {
      emit('load', e)
    }

    function handleCopy(e: any) {
      const text = e.generatedPrompt || ''
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
        } else {
          const ta = document.createElement('textarea')
          ta.value = text
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          ta.remove()
        }
      } catch {
        // ignore
      }
    }

    function handleDelete(id: string) {
      deleteEntryStore(id)
      refresh()
    }

    function handleExport(e: any) {
      try {
        const json = JSON.stringify(e)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json)
        }
      } catch {
        // ignore
      }
    }

    return () => (
      <div class="card history-card">
        <h3>{t('app.history')}</h3>
        <ul data-testid="history-list">
          {entries.value.map(en => (
            <li class="history-item" data-entry-id={en.id} key={en.id} style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{en.title || en.generatedPrompt.slice(0, 80)}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{new Date(en.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: '6px', fontSize: '12px', color: '#333' }}>
                  <span>{t('form.ageGroup', 'Grupa')}: {en.formSnapshot?.ageGroup || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.preset', 'Preset')}: {en.formSnapshot?.presetId || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.orientation', 'Orientacja')}: {en.formSnapshot?.orientation || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.subjectType', 'Temat')}: {en.formSnapshot?.primarySubject || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.lineWeight', 'Linia')}: {en.formSnapshot?.lineWeight || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.detailLevel', 'Detale')}: {en.formSnapshot?.detailLevel || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>{t('form.dpi', 'DPI')}: {en.formSnapshot?.dpi ?? '—'}</span>
                </div>
                <div style={{ marginTop: '6px' }}>
                <button data-testid="history-load" aria-label={t('history.load')} onClick={() => handleLoad(en)}>{t('history.load')}</button>
                <button data-testid="history-copy" aria-label={t('history.copy')} onClick={() => handleCopy(en)} style={{ marginLeft: '6px' }}>{t('history.copy')}</button>
                <button data-testid="history-delete" aria-label={t('history.delete')} onClick={() => handleDelete(en.id)} style={{ marginLeft: '6px' }}>{t('history.delete')}</button>
                <button data-testid="history-export" aria-label={t('history.export')} onClick={() => handleExport(en)} style={{ marginLeft: '6px' }}>{t('history.export')}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
