/** @jsx h */
import { defineComponent, h, ref, watch, PropType } from 'vue'
import type { ZodIssue } from 'zod'
import presets from '../presets/presets'
import { artifacts, mutants, locations } from '../lib/taxonomy'
import { FormSchema, FormSnapshot, SubjectEntry } from '../lib/formSchema'
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
    const showGlobal = ref<boolean>(false)
    const { t } = useLocale()

    function snapshotsEqual(a: FormSnapshot, b: FormSnapshot) {
      const keys: (keyof FormSnapshot)[] = ['ageGroup', 'orientation', 'lineWeight', 'detailLevel', 'composition', 'dpi', 'marginMm', 'enforceNoGray', 'outputLanguage', 'presetId', 'subjects']
      for (const k of keys) {
        if (k === 'subjects') {
          const aSubjects = (a as any)[k] || []
          const bSubjects = (b as any)[k] || []
          if (aSubjects.length !== bSubjects.length) return false
          for (let i = 0; i < aSubjects.length; i++) {
            if (JSON.stringify(aSubjects[i]) !== JSON.stringify(bSubjects[i])) return false
          }
        } else if ((a as any)[k] !== (b as any)[k]) return false
      }
      return true
    }

    // Restore snapshot when parent provides one
    watch(() => props.loadedSnapshot, (ns) => {
      if (ns) {
        // Merge provided partial snapshot into current snapshot and validate with Zod
        const merged = { ...snapshot.value, ...(ns as Partial<FormSnapshot>) }
        const parsed = FormSchema.safeParse(merged)

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
      } catch {
        // ignore
      }
    }, { deep: true, immediate: true })

    function validate(): boolean {
      const result = FormSchema.safeParse(snapshot.value)
      if (!result.success) {
        const zErrors: Record<string, string> = {}
        result.error.issues.forEach((issue: ZodIssue) => {
          const key = issue.path[0] as string
          zErrors[key] = issue.message
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
      if (p.description) {
        // Create single subject from preset description
        snapshot.value.subjects = [
          {
            id: 'preset-subject-' + Date.now(),
            subjectType: 'mixed' as const,
            subjectDescription: p.description,
            primarySubject: undefined,
          },
        ]
      }
      const d: any = p.defaults || {}
      if (d.lineWeight) snapshot.value.lineWeight = d.lineWeight
      if (d.detailLevel) snapshot.value.detailLevel = d.detailLevel
      if (typeof d.enforceNoGray !== 'undefined') snapshot.value.enforceNoGray = !!d.enforceNoGray
    }

    function addSubject() {
      const newSubject: SubjectEntry = {
        id: 'subject-' + Date.now(),
        subjectType: 'character' as const,
        primarySubject: undefined,
        subjectDescription: undefined,
      }
      snapshot.value.subjects.push(newSubject)
    }

    function removeSubject(id: string) {
      const idx = snapshot.value.subjects.findIndex(s => s.id === id)
      if (idx >= 0) {
        snapshot.value.subjects.splice(idx, 1)
      }
    }

    function updateSubject(id: string, field: keyof SubjectEntry, value: any) {
      const subj = snapshot.value.subjects.find(s => s.id === id)
      if (subj) {
        (subj as any)[field] = value
      }
    }

    function generate() {
      if (!validate()) return
      const p = buildPrompt(snapshot.value)
      emit('generate', p)
      generatedPrompt.value = p
    }

    return () => (
      <div class="card form-card">
        {/* Age Group - global, appears once */}
        {/* <div>
          <label htmlFor="age-select">{t('form.ageGroup')}</label>
          <select id="age-select" value={snapshot.value.ageGroup} onChange={(e: Event) => (snapshot.value.ageGroup = (e.target as HTMLSelectElement).value as any)}>
            <option value="under_5">{t('form.ageOptions.under_5')}</option>
            <option value="under_10">{t('form.ageOptions.under_10')}</option>
            <option value="under_16">{t('form.ageOptions.under_16')}</option>
            <option value="16_plus">{t('form.ageOptions.16_plus')}</option>
          </select>
          {errors.value.ageGroup && <div style={{ color: 'red' }}>{errors.value.ageGroup}</div>}
        </div> */}

        {/* Preset */}
        <div style={{ marginTop: '12px' }}>
          <label htmlFor="preset-select">{t('form.preset')}</label>
          <select id="preset-select" data-testid="preset-select" value={snapshot.value.presetId || ''} onChange={(e: Event) => { const v = (e.target as HTMLSelectElement).value; applyPreset(v) }}>
            <option value="">{t('form.none', '— brak —')}</option>
            {presets.map(p => (
              <option value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* Global settings (collapsible) */}
        <div style={{ marginTop: '12px' }}>
          <button
            type="button"
            aria-expanded={showGlobal.value}
            aria-controls="global-settings"
            onClick={(e: Event) => { showGlobal.value = !showGlobal.value }}
            style={{  border: '1px solid #ccc', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            {showGlobal.value ? t('form.hideGlobalSettings', 'Ukryj ustawienia globalne') : t('form.showGlobalSettings', 'Pokaż ustawienia globalne')}
          </button>
        </div>

        {showGlobal.value && (
          <div id="global-settings" style={{ marginTop: '8px' }}>
            <div style={{ marginTop: '8px' }}>
              <label htmlFor="orientation">{t('form.orientation', 'Orientacja')}</label>
              <select id="orientation" value={snapshot.value.orientation} onChange={(e: Event) => (snapshot.value.orientation = (e.target as HTMLSelectElement).value as any)}>
                <option value="A4_portrait">A4 Portrait</option>
                <option value="A4_landscape">A4 Landscape</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="lineWeight">{t('form.lineWeight', 'Grubość linii')}</label>
              <select id="lineWeight" value={snapshot.value.lineWeight} onChange={(e: Event) => (snapshot.value.lineWeight = (e.target as HTMLSelectElement).value as any)}>
                <option value="very_thick">Very Thick</option>
                <option value="thick_comic">Thick Comic</option>
                <option value="medium">Medium</option>
                <option value="fine">Fine</option>
              </select>
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="detailLevel">{t('form.detailLevel', 'Poziom detali')}</label>
              <select id="detailLevel" value={snapshot.value.detailLevel} onChange={(e: Event) => (snapshot.value.detailLevel = (e.target as HTMLSelectElement).value as any)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="medium_high">Medium High</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="composition">{t('form.composition', 'Kompozycja')}</label>
              <select id="composition" value={snapshot.value.composition} onChange={(e: Event) => (snapshot.value.composition = (e.target as HTMLSelectElement).value as any)}>
                <option value="centered">Centered</option>
                <option value="full_figure">Full Figure</option>
                <option value="panorama">Panorama</option>
                <option value="low_angle">Low Angle</option>
                <option value="dynamic_action">Dynamic Action</option>
              </select>
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="dpi">{t('form.dpi', 'DPI')}</label>
              <input
                id="dpi"
                type="number"
                value={snapshot.value.dpi}
                onInput={(e: Event) => (snapshot.value.dpi = parseInt((e.target as HTMLInputElement).value, 10))}
              />
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="margin">{t('form.margin', 'Margines (mm)')}</label>
              <input
                id="margin"
                type="number"
                value={snapshot.value.marginMm}
                onInput={(e: Event) => (snapshot.value.marginMm = parseInt((e.target as HTMLInputElement).value, 10))}
              />
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="enforceNoGray">
                <input
                  id="enforceNoGray"
                  type="checkbox"
                  checked={snapshot.value.enforceNoGray}
                  onChange={(e: Event) => (snapshot.value.enforceNoGray = (e.target as HTMLInputElement).checked)}
                />
                {t('form.enforceNoGray', 'Bez szarościanki')}
              </label>
            </div>
          </div>
        )}

        {/* Subjects array - multiple entries */}
        <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '12px' }}>
          <h3>{t('form.subjects', 'Tematy')}</h3>

          {snapshot.value.subjects && snapshot.value.subjects.length > 0 ? (
            <div>
              {snapshot.value.subjects.map((subj, idx) => (
                <div key={subj.id} style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong>{t('form.subject', 'Temat')} #{idx + 1}</strong>
                    <button type="button" onClick={() => removeSubject(subj.id)} style={{ backgroundColor: '#ff6b6b', color: 'white', padding: '4px 8px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>
                      {t('form.remove', 'Usuń')}
                    </button>
                  </div>

                  <div>
                    <label htmlFor={`subject-type-${subj.id}`}>{t('form.subjectType', 'Typ tematu')}</label>
                    <select
                      id={`subject-type-${subj.id}`}
                      value={subj.subjectType || 'character'}
                      onChange={(e: Event) => updateSubject(subj.id, 'subjectType', (e.target as HTMLSelectElement).value as any)}
                      data-testid={`subject-type-select-${idx}`}
                    >
                      <option value="character">{t('form.subjectTypeOptions.character', 'character')}</option>
                      <option value="artifact">{t('form.subjectTypeOptions.artifact', 'artifact')}</option>
                      <option value="anomaly">{t('form.subjectTypeOptions.anomaly', 'anomaly')}</option>
                      <option value="mutant">{t('form.subjectTypeOptions.mutant', 'mutant')}</option>
                      <option value="location">{t('form.subjectTypeOptions.location', 'location')}</option>
                      <option value="mixed">{t('form.subjectTypeOptions.mixed', 'mixed')}</option>
                    </select>
                  </div>

                  {subj.subjectType === 'artifact' && (
                    <div style={{ marginTop: '6px' }}>
                      <label htmlFor={`primary-artifact-${subj.id}`}>{t('form.artifact')}</label>
                      <select
                        id={`primary-artifact-${subj.id}`}
                        value={subj.primarySubject || ''}
                        onChange={(e: Event) => updateSubject(subj.id, 'primarySubject', (e.target as HTMLSelectElement).value)}
                        data-testid={`primary-subject-artifact-${idx}`}
                      >
                        <option value="">{t('form.selectArtifact', '— wybierz artefakt —')}</option>
                        {artifacts.map(a => (
                          <option value={a.name}>{a.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {subj.subjectType === 'mutant' && (
                    <div style={{ marginTop: '6px' }}>
                      <label htmlFor={`primary-mutant-${subj.id}`}>{t('form.mutant')}</label>
                      <select
                        id={`primary-mutant-${subj.id}`}
                        value={subj.primarySubject || ''}
                        onChange={(e: Event) => updateSubject(subj.id, 'primarySubject', (e.target as HTMLSelectElement).value)}
                        data-testid={`primary-subject-mutant-${idx}`}
                      >
                        <option value="">{t('form.selectMutant', '— wybierz mutanta —')}</option>
                        {mutants.map(m => (
                          <option value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {subj.subjectType === 'location' && (
                    <div style={{ marginTop: '6px' }}>
                      <label htmlFor={`primary-location-${subj.id}`}>{t('form.location')}</label>
                      <select
                        id={`primary-location-${subj.id}`}
                        value={subj.primarySubject || ''}
                        onChange={(e: Event) => updateSubject(subj.id, 'primarySubject', (e.target as HTMLSelectElement).value)}
                        data-testid={`primary-subject-location-${idx}`}
                      >
                        <option value="">{t('form.selectLocation', '— wybierz miejsce —')}</option>
                        {locations.map(l => (
                          <option value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div style={{ marginTop: '6px' }}>
                    <label htmlFor={`subject-desc-${subj.id}`}>{t('form.subjectDescription')}</label>
                    <input
                      id={`subject-desc-${subj.id}`}
                      type="text"
                      value={subj.subjectDescription || ''}
                      onInput={(e: Event) => updateSubject(subj.id, 'subjectDescription', (e.target as HTMLInputElement).value)}
                      placeholder={t('form.subjectDescriptionPlaceholder')}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999' }}>{t('form.noSubjects', 'Brak wybranych tematów. Dodaj przynajmniej jeden.')}</p>
          )}

          <button
            type="button"
            onClick={addSubject}
            style={{ marginTop: '8px', backgroundColor: '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '3px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            {t('form.addSubject', '+ Dodaj temat')}
          </button>
        </div>

        {/* Generate button */}
        <div style={{ marginTop: '20px' }}>
          <button
            aria-label={t('app.generate')}
            onClick={generate}
            style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 16px', borderRadius: '3px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
          >
            {t('app.generate')}
          </button>
        </div>
      </div>
    )
  },
})
