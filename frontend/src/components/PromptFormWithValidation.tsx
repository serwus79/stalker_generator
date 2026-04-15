/** @jsx createVNode */
import { defineComponent, ref, h as createVNode } from 'vue'
import presets from '../presets/presets'
import { artifacts, mutants, locations } from '../lib/taxonomy'
import { FormSchema, FormSnapshot } from '../lib/formSchema'
import { buildPrompt } from '../lib/promptBuilder'

export default defineComponent({
  name: 'PromptFormWithValidation',
  emits: ['generate'],
  setup(_, { emit }) {
    const defaultSnapshot = FormSchema.parse({}) as FormSnapshot
    const snapshot = ref<FormSnapshot>(defaultSnapshot)
    const errors = ref<Record<string, string>>({})
    const generatedPrompt = ref<string>('')

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
      <div>
        <div>
          <label htmlFor="preset-select">Preset</label>
          <select id="preset-select" data-testid="preset-select" value={snapshot.value.presetId || ''} onChange={(e: Event) => { const v = (e.target as HTMLSelectElement).value; applyPreset(v) }}>
            <option value="">— brak —</option>
            {presets.map(p => (
              <option value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age-select">Grupa wiekowa</label>
          <select id="age-select" value={snapshot.value.ageGroup} onChange={(e: Event) => (snapshot.value.ageGroup = (e.target as HTMLSelectElement).value as any)}>
            <option value="under_5">do 5 lat</option>
            <option value="under_10">do 10 lat</option>
            <option value="under_16">do 16 lat</option>
            <option value="16_plus">16+</option>
          </select>
          {errors.value.ageGroup && <div style={{ color: 'red' }}>{errors.value.ageGroup}</div>}
        </div>

        <div style={{ marginTop: '8px' }}>
          <label htmlFor="subject-desc">Opis tematu (opcjonalnie)</label>
          <input
            id="subject-desc"
            value={snapshot.value.subjectDescription || ''}
            onInput={(e: Event) => (snapshot.value.subjectDescription = (e.target as HTMLInputElement).value)}
            placeholder="np. przyjazny pseudodog siedzący i uśmiechający się"
          />
        </div>

        <div style={{ marginTop: '8px' }}>
          <label htmlFor="subject-type">Rodzaj tematu</label>
          <select id="subject-type" value={snapshot.value.subjectType || ''} onChange={(e: Event) => (snapshot.value.subjectType = (e.target as HTMLSelectElement).value as any)}>
            <option value="">— wybierz —</option>
            <option value="character">character</option>
            <option value="artifact">artifact</option>
            <option value="anomaly">anomaly</option>
            <option value="mutant">mutant</option>
            <option value="location">location</option>
            <option value="mixed">mixed</option>
          </select>
        </div>

        {snapshot.value.subjectType === 'artifact' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-artifact">Artefakt</label>
            <select id="primary-artifact" data-testid="primary-subject-artifact" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">— wybierz artefakt —</option>
              {artifacts.map(a => (
                <option value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        )}

        {snapshot.value.subjectType === 'mutant' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-mutant">Mutant</label>
            <select id="primary-mutant" data-testid="primary-subject-mutant" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">— wybierz mutanta —</option>
              {mutants.map(m => (
                <option value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}

        {snapshot.value.subjectType === 'location' && (
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="primary-location">Miejsce</label>
            <select id="primary-location" data-testid="primary-subject-location" value={snapshot.value.primarySubject || ''} onChange={(e: Event) => (snapshot.value.primarySubject = (e.target as HTMLSelectElement).value)}>
              <option value="">— wybierz miejsce —</option>
              {locations.map(l => (
                <option value={l}>{l}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ marginTop: '8px' }}>
          <button onClick={generate}>Generuj prompt</button>
        </div>

        {generatedPrompt.value && (
          <pre data-testid="generated-prompt" style={{ marginTop: '12px', whiteSpace: 'pre-wrap' }}>{generatedPrompt.value}</pre>
        )}

      </div>
    )
  },
})
