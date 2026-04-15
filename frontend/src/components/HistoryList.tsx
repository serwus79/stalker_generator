/** @jsx createVNode */
import { defineComponent, ref, onMounted, watch, h as createVNode } from 'vue'
import historyStore, { loadHistory, deleteEntry as deleteEntryStore } from '../store/historyStore'

export default defineComponent({
  name: 'HistoryList',
  props: {
    reloadSignal: { type: Number, default: 0 },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const entries = ref<any[]>([])

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
      } catch (err) {
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
      } catch (err) {
        // ignore
      }
    }

    return () => (
      <div>
        <h3>Historia</h3>
        <ul data-testid="history-list">
          {entries.value.map(en => (
            <li class="history-item" data-entry-id={en.id} key={en.id} style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{en.title || en.generatedPrompt.slice(0, 80)}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{new Date(en.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: '6px', fontSize: '12px', color: '#333' }}>
                  <span>Grupa: {en.formSnapshot?.ageGroup || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>Preset: {en.formSnapshot?.presetId || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>Orientacja: {en.formSnapshot?.orientation || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>Temat: {en.formSnapshot?.primarySubject || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>Linia: {en.formSnapshot?.lineWeight || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>Detale: {en.formSnapshot?.detailLevel || '—'}</span>
                  <span style={{ marginLeft: '10px' }}>DPI: {en.formSnapshot?.dpi ?? '—'}</span>
                </div>
                <div style={{ marginTop: '6px' }}>
                <button data-testid="history-load" onClick={() => handleLoad(en)}>Load</button>
                <button data-testid="history-copy" onClick={() => handleCopy(en)} style={{ marginLeft: '6px' }}>Copy</button>
                <button data-testid="history-delete" onClick={() => handleDelete(en.id)} style={{ marginLeft: '6px' }}>Delete</button>
                <button data-testid="history-export" onClick={() => handleExport(en)} style={{ marginLeft: '6px' }}>Export</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
