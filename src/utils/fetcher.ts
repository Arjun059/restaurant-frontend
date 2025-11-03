// utils/fetcher.ts
const API_URL = import.meta.env.VITE_API_URL ?? 'https://restaurant-backend-srp6.onrender.com'

function isJson(value: any) {
  try {
    JSON.stringify(value)
    return true
  } catch {
    return false
  }
}

export const fetcher = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const rawHeaders = options?.headers || {}

    // Build final headers
    let headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...rawHeaders,
    }

    // Detect and remove content-type regardless of casing if set to null or undefined
    for (const key of Object.keys(rawHeaders)) {
      // @ts-ignore
      if (key.toLowerCase() === 'content-type' && rawHeaders[key] === 'unset') {
        delete headers[key]
      }
    }

    const res = await fetch(API_URL + url, {
      ...options,
      headers,
    })

    if (!res.ok) {
      // Try to parse error body
      let errorMessage = 'An error occurred'
      try {
        const errorBody = await res.json()
        errorMessage = errorBody?.message || errorMessage
      } catch {
        // response is not JSON
        const text = await res.text()
        errorMessage = text || errorMessage
      }
      throw new Error(errorMessage)
    }

    // Check content-type header before parsing as JSON
    const contentType = res.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      const rawText = await res.text()
      throw new Error(rawText)
    }

    const responseJson = await res.json()

    if (responseJson?.error) {
      throw new Error(responseJson.message)
    }

    return isJson(responseJson?.data) ? responseJson.data : ({} as T)
  } catch (e: any) {
    throw e
  }
}
