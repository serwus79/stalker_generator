export function loadHistory(key = 'stalker_prompts_v1') {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export function saveEntry(entry: any, key = 'stalker_prompts_v1') {
  const list = loadHistory(key)
  list.unshift(entry)
  if (list.length > 100) list.pop()
  localStorage.setItem(key, JSON.stringify(list))
}

export function deleteEntry(id: string, key = 'stalker_prompts_v1') {
  const list = loadHistory(key).filter((e: any) => e.id !== id)
  localStorage.setItem(key, JSON.stringify(list))
}
