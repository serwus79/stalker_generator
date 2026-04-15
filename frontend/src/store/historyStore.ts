import { v4 as uuidv4 } from 'uuid'

export interface HistoryEntry {
  id: string
  createdAt: string
  title?: string
  formSnapshot: any
  generatedPrompt: string
  targetProfile?: string
  tags?: string[]
  version?: string
}

const STORAGE_KEY = 'stalker_prompt_history_v1'
const DEFAULT_LIMIT = 100

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return parsed
  } catch (e) {
    console.error('Failed to load history', e)
    return []
  }
}

export function saveEntry(entry: Omit<HistoryEntry, 'id' | 'createdAt'>, limit = DEFAULT_LIMIT): HistoryEntry {
  const existing = loadHistory()
  const now = new Date().toISOString()
  const full: HistoryEntry = { id: uuidv4(), createdAt: now, ...entry }
  existing.unshift(full)
  if (existing.length > limit) existing.length = limit
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch (e) {
    console.error('Failed to save history', e)
  }
  return full
}

export function deleteEntry(id: string) {
  const existing = loadHistory()
  const filtered = existing.filter(e => e.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (e) {
    console.error('Failed to delete history entry', e)
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear history', e)
  }
}

export default {
  loadHistory,
  saveEntry,
  deleteEntry,
  clearHistory,
}
