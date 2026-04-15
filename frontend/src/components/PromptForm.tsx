import { defineComponent, ref } from 'vue'
import { buildPrompt } from '../lib/promptBuilder'

export default defineComponent({
  name: 'PromptForm',
  emits: ['generate'],
  setup(_, { emit }) {
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
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Grupa wiekowa</label>
        <select
          value={snapshot.value.ageGroup}
          onChange={(e: Event) => {
            const t = e.target as HTMLSelectElement
            snapshot.value.ageGroup = t.value
          }}
        >
          <option value="under_5">do 5 lat</option>
          <option value="under_10">do 10 lat</option>
          <option value="under_16">do 16 lat</option>
          <option value="16_plus">16+</option>
        </select>

        <div style={{ marginTop: '8px' }}>
          <button onClick={generate}>Generuj prompt</button>
        </div>
      </div>
    )
  },
})
