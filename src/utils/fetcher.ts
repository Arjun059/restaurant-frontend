// utils/fetcher.ts
import { BASE_URL } from './constants'

export const fetcher = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  })

  const data = await res.json()

  if (!res.ok) {
    // Optional: throw structured error
    const message = data?.message || 'An error occurred'
    throw new Error(message)
  }

  return data.data
}
