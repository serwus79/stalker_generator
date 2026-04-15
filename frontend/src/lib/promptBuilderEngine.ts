import { buildPrompt } from './promptBuilder'

export function buildPromptForProfile(snapshot: any, profile = 'chat_plain') {
  // Simple wrapper to extend prompt for different targets in future.
  const base = buildPrompt(snapshot)
  if (profile === 'midjourney_v6') {
    const ar = snapshot.orientation === 'A4_landscape' ? '--ar 4:3' : '--ar 3:4'
    return `${base} ${ar} --style raw`
  }
  return base
}

export default buildPromptForProfile
