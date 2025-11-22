// utils/fetcher.ts
const API_URL = import.meta.env.VITE_API_URL ?? 'https://restaurant-backend-srp6.onrender.com'
import useStore from "../store"

export const fetcher = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const rawHeaders: Record<string, any> = options?.headers || {};

  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useStore.getState().token}`,
    ...rawHeaders,
  };

  // Remove content-type if explicitly unset
  for (const key of Object.keys(rawHeaders)) {
    if (key.toLowerCase() === "content-type" && rawHeaders[key] === "unset") {
      delete headers[key];
    }
  }

  const res = await fetch(API_URL + url, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";

  // --- Handle non-200 first ---
  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(errorBody?.message || "Error");
    } else {
      const errorText = await res.text().catch(() => "");
      throw new Error(errorText || `Request failed (${res.status})`);
    }
  }

  // --- Handle 204 No Content ---
  if (res.status === 204) {
    return {} as T;
  }

  // --- Parse JSON Response ---
  if (contentType.includes("application/json")) {
    const body = await res.json();

    // If backend uses "data", return it, else return entire JSON
    if ("data" in body) return body.data as T;
    return body as T;
  }

  // --- Non-JSON success response ---
  return (await res.text()) as T;
};
