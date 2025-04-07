import type { ChangeEvent, Dispatch, SetStateAction } from "react"

export const handleChangeValue = (setValue: Dispatch<SetStateAction<string>>, decimal: boolean = true) => ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
  if (!value) return setValue(value)
    
  const character = value.at(-1)
  if (!decimal && character === '.') return
  
  if (!character || isNaN(+character) && character !== '.') return
  if (character === '.' && value.split('.').length > 2) return

  setValue(value)
}

export function getLocalData <T extends object | string | number> (
  key: string,
  type: 'string' | 'number' | 'object' = 'string'
): T | null {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(key)

    if (!value) return null

    if (type === 'string') {
      return value as T

    } else if (type === 'number') {
      return +value as T

    } else if (type === 'object') {
      try {
        return JSON.parse(value) as T
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }

  return null
}
