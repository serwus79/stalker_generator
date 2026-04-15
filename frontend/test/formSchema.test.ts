import { describe, it, expect } from 'vitest'
import { FormSchema } from '../src/lib/formSchema'

describe('FormSchema', () => {
  it('parses default snapshot', () => {
    const parsed = FormSchema.parse({})
    expect(parsed.ageGroup).toBeDefined()
    expect(parsed.dpi).toBe(300)
  })

  it('rejects invalid ageGroup', () => {
    try {
      FormSchema.parse({ ageGroup: 'invalid' })
      // should not reach
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
