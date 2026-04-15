import { defineComponent, ref } from 'vue'
import { buildPrompt } from '../lib/promptBuilder'
import useLocale from '../locales/useLocale'

export default defineComponent({
  name: 'PromptForm',
  emits: ['generate'],
  setup(_, { emit }) {
    const { t } = useLocale()
    const snapshot = ref<any>({
      ageGroup: 'under_10',
      primarySubject: 'pseudodog',
      lineWeight: 'very_thick',
      detailLevel: 'low',
      orientation: 'A4_portrait',
      dpi: 300,
      marginMm: 10,
    })

    function generate() {
      const p = buildPrompt(snapshot.value)
      emit('generate', p)
    }

    return () => (
      <div class="card form-card">
        <label style={{ display: 'block', marginBottom: '4px' }}>{t('form.ageGroup')}</label>
        <select
          value={snapshot.value.ageGroup}
          onChange={(e: Event) => {
            const t = e.target as HTMLSelectElement
            snapshot.value.ageGroup = t.value
          }}
        >
          <option value="under_5">{t('form.ageOptions.under_5')}</option>
          <option value="under_10">{t('form.ageOptions.under_10')}</option>
          <option value="under_16">{t('form.ageOptions.under_16')}</option>
          <option value="16_plus">{t('form.ageOptions.16_plus')}</option>
        </select>

        <div style={{ marginTop: '8px' }}>
          <button aria-label={t('app.generate')} onClick={generate}>{t('app.generate')}</button>
        </div>
      </div>
    )
  },
})
