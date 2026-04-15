/** @jsx createVNode */
import { defineComponent, ref, watch, h as createVNode, PropType } from 'vue'
import presets from '../presets/presets'
import { artifacts, mutants, locations } from '../lib/taxonomy'
import { FormSchema, FormSnapshot } from '../lib/formSchema'
import { buildPrompt } from '../lib/promptBuilder'
import useLocale from '../locales/useLocale'

export default defineComponent({
  name: 'PromptFormWithValidation',
  props: {
    loadedSnapshot: { type: Object as PropType<Partial<FormSnapshot> | undefined>, default: undefined },
  },
  emits: ['generate', 'preview'],
  setup(props, { emit }) {
    const defaultSnapshot = FormSchema.parse({}) as FormSnapshot
    const snapshot = ref<FormSnapshot>(defaultSnapshot)
    const errors = ref<Record<string, string>>({})
    const generatedPrompt = ref<string>('')
    const { t } = useLocale()

    // Restore snapshot when parent provides one
    watch(() => props.loadedSnapshot, (ns) => {
      if (ns) {
        // Merge provided partial snapshot into current snapshot and validate with Zod
        const merged = { ...snapshot.value, ...(ns as Partial<FormSnapshot>) }
        const parsed = FormSchema.safeParse(merged)
        // Avoid assigning if the merged/parsed snapshot is identical to the current one
        function snapshotsEqual(a: FormSnapshot, b: FormSnapshot) {
          const keys: (keyof FormSnapshot)[] = ['ageGroup','orientation','lineWeight','detailLevel','composition','dpi','marginMm','enforceNoGray','outputLanguage','subjectType','primarySubject','subjectDescription','presetId']
          for (const k of keys) {
            if ((a as any)[k] !== (b as any)[k]) return false
          }
          return true
        }

        if (parsed.success) {
          if (!snapshotsEqual(snapshot.value, parsed.data)) snapshot.value = parsed.data
        } else {
          // Fallback: coerce to FormSnapshot to preserve runtime behavior
          const fallback = merged as FormSnapshot
          if (!snapshotsEqual(snapshot.value, fallback)) snapshot.value = fallback
        }
      }
    }, { deep: true, immediate: true })

    // Emit live preview whenever the snapshot changes (include snapshot)
    watch(snapshot, (val) => {
      try {
        const p = buildPrompt(val)
        emit('preview', { prompt: p, snapshot: val })
      } catch (e) {
        // ignore
      }
    }, { deep: true, immediate: true })

    function validate(): boolean {
      const result = FormSchema.safeParse(snapshot.value)
      if (!result.success) {
        const zErrors: Record<string, string> = {}
        result.error.errors.forEach(e => {
          const key = e.path[0] as string
          zErrors[key] = e.message
        })
        errors.value = zErrors
        return false
      }
      errors.value = {}
      return true
    }

    function applyPreset(presetId?: string) {
      if (!presetId) return
      const p = presets.find(x => x.id === presetId)
      if (!p) return
      snapshot.value.presetId = p.id
      snapshot.value.ageGroup = p.ageGroup as any
      snapshot.value.orientation = p.orientation as any
      if (p.description) snapshot.value.subjectDescription = p.description
      const d: any = p.defaults || {}
      if (d.lineWeight) snapshot.value.lineWeight = d.lineWeight
      if (d.detailLevel) snapshot.value.detailLevel = d.detailLevel
      if (typeof d.enforceNoGray !== 'undefined') snapshot.value.enforceNoGray = !!d.enforceNoGray
    }

    function generate() {
      if (!validate()) return
      const p = buildPrompt(snapshot.value)
      emit('generate', p)
      generatedPrompt.value = p
    }

    return () => (
      <div class="card form-card">
        <div>
          <label htmlFor="preset-select">{t('form.preset')}</label>
          <select id="preset-select" data-testid="preset-select" value={snapshot.value.presetId || ''} onChange={(e: Event) => { const v = (e.target as HTMLSelectElement).value; applyPreset(v) }}>
            <option value="">{t('form.none', '— brak —')}</option>
            {presets.map(p => (
              <option value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age-select">{t('form.ageGroup')}</label>
          <select id="age-select" value={snapshot.value.ageGroup} onChange={(e: Event) => (snapshot.value.ageGroup = (e.target as HTMLSelectElement).value as any)}>
            <option value="under_5">{t('form.ageOptions.under_5')}</option>
            <option value="under_10">{t('form.ageOptions.under_10')}</option>
            <option value="under_16">{t('form.ageOptions.under_16')}</option>
            <option value="16_plus">{t('form.ageOptions.16_plus')}</option>
          </select>
          {errors.value.ageGroup && <div style={{ color: 'red' }}>{errors.value.ageGroup}</div>}
        </div>

        <div style={{ marginTop: '8px' }}>
          <label htmlFor="subject-desc">{t('form.subjectDescription')}</label>
          <input
            id="subject-desc"
            value={snapshot.value.subjectDescription || ''}
            onInput={(e: Event) => (snapshot.value.subjectDescription = (e.target as HTMLInputElement).value)}
            placeholder={t('form.subjectDescriptionPlaceholder')}
          />
        </div>

        <div style={{ marginTop: '8px' }}>
          <label htmlFor="subject-type">{t('form.subjectType')}</label>
          <select id="subject-type" value={snapshot.value.subjectType || ''} onChange={(e: Event) => (snapshot.value.subjectType = (e.target as HTMLSelectElement).value as any)}>
            <option value="">{t('form.choose', '— wybierz —')}</option>
            <option value="character">{t('form.subjectTypeOptions.character', 'character')}</option>
            <option value="artifact">{t('form.subjectTypeOptions.artifact', 'artifact')}</option>
            <option value="anomaly">{t('form.subjectTypeOptions.anomaly', 'anomaly')}</option>
            <option value="mutant">{t('form.subjectTypeOptions.mutant', 'mutant')}</option>
            <option value="location">{t('form.subjectTypeOptions.location', 'location')}</option>
            <option value="mixed">{t('form.subjectTypeOptions.mixed', 'mixed')}</option>
          </select>
        </div>

        {snapshot.value.subjectType === 'artifact' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-artifact">{t('form.artifact')}</label>
            <select id="primary-artifact" data-testid="primary-subject-artifact" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">{t('form.selectArtifact', '— wybierz artefakt —')}</option>
              {artifacts.map(a => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
        )}

        {snapshot.value.subjectType === 'mutant' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-mutant">{t('form.mutant')}</label>
            <select id="primary-mutant" data-testid="primary-subject-mutant" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">{t('form.selectMutant', '— wybierz mutanta —')}</option>
              {mutants.map(m => (
                <option value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}

        {snapshot.value.subjectType === 'location' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-location">{t('form.location')}</label>
            <select id="primary-location" data-testid="primary-subject-location" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">{t('form.selectLocation', '— wybierz miejsce —')}</option>
              {locations.map(l => (
                <option value={l}>{l}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ marginTop: '8px' }}>
          <button aria-label={t('app.generate')} onClick={generate}>{t('app.generate')}</button>
        </div>

        {/* Preview is emitted to parent via 'preview' event — parent is responsible for layout */}

      </div>
    )
  },
})
