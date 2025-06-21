// utils/fetcher.ts
const API_URL = import.meta.env.VITE_API_URL

// export const fetcher = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
//   try {
//     const res = await fetch(API_URL + url, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(options?.headers || {}),
//       },
//     })

//     if (!res.ok) {
//       // Optional: throw structured error
//       const message = 'An error occurred'
//       throw new Error(message)
//     }

//     const data = await res.json()
//     console.log(data, 'API: add dish resp')
//     if (data.error) {
//       throw new Error(data.message)
//     }

//     return isJson(data.data) ? data.data : {}
//   } catch (e: any) {
//     console.log(e, 'this is ee')
//     throw new Error(e?.message)
//   }
// }

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

    const data = await res.json()

    if (data?.error) {
      throw new Error(data.message)
    }

    return isJson(data?.data) ? data.data : ({} as T)
  } catch (e: any) {
    throw new Error(e?.message || 'Unknown error')
  }
}
