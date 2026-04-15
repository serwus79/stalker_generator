/** @jsx h */
import { defineComponent, h, ref, computed } from 'vue'
import useLocale from '../locales/useLocale'

export default defineComponent({
  name: 'Preview',
  props: {
    text: { type: String, default: '' },
    prompt: { type: String, default: '' },
  },
  setup(props) {
    const copied = ref(false)
    const showText = computed(() => (props.prompt || props.text || ''))

    const { t } = useLocale()

    async function copyToClipboard() {
      const text = showText.value || ''
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text)
        } else {
          const ta = document.createElement('textarea')
          ta.value = text
          ta.style.position = 'fixed'
          ta.style.left = '-9999px'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          ta.remove()
        }
        copied.value = true
        setTimeout(() => (copied.value = false), 1400)
      } catch {
        // ignore copy errors in tests/environments
      }
    }

    return () => (
      <div class="card preview-card">
        <div class="preview-container">
          <pre data-testid="preview-text">{showText.value}</pre>
        </div>
        <div style={{ marginTop: '8px' }}>
          <button data-testid="preview-copy" aria-label={t('preview.copy')} onClick={copyToClipboard}>{t('preview.copy')}</button>
          {copied.value && <span data-testid="preview-toast" role="status" aria-live="polite" style={{ marginLeft: '8px' }}>{t('preview.copied')}</span>}
        </div>
      </div>
    )
  },
})
