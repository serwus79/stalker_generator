import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Preview',
  props: {
    prompt: { type: String, default: '' },
  },
  setup(props) {
    function copy() {
      if (navigator.clipboard) navigator.clipboard.writeText(props.prompt)
    }
    return () => (
      <div>
        <h2>Podgląd promptu</h2>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '8px' }}>{props.prompt}</pre>
        <button onClick={copy}>Kopiuj</button>
      </div>
    )
  },
})
