import { buildPrompt } from './promptBuilder'

export function buildPromptForProfile(snapshot: any, profile = 'chat_plain') {
  const lang = snapshot?.outputLanguage || 'pl'
  let prompt = buildPrompt(snapshot, lang)

  if (profile === 'midjourney_v6') {
    const ar = snapshot && snapshot.orientation === 'A4_landscape' ? '--ar 4:3' : '--ar 3:4'
    prompt = `${prompt} ${ar} --style raw`
  } else if (profile === 'stable_diffusion') {
    const res = snapshot && snapshot.orientation === 'A4_landscape' ? '3508x2480' : '2480x3508'
    prompt = `${prompt} (suggested resolution: ${res}, LoRA: coloring book lineart)`
  }

  return prompt
}

export default buildPromptForProfile
