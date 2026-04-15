import { ref } from 'vue'
import pl from './pl.json'

const current = ref('pl')
const messages: Record<string, any> = { pl }

export function useLocale() {
  function setLocale(l: string) {
    if (messages[l]) current.value = l
  }

  function t(path: string, fallback?: string) {
    const parts = path.split('.')
    let obj: any = messages[current.value] || messages['pl']
    for (const p of parts) {
      obj = obj?.[p]
      if (obj === undefined) break
    }
    return obj ?? fallback ?? path
  }

  return { locale: current, setLocale, t }
}

export default useLocale
