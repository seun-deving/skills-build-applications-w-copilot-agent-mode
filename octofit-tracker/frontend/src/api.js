const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export function getApiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidates = [payload.results, payload.data, payload.items, payload.documents]
  return candidates.find(Array.isArray) ?? []
}

export async function fetchResource(resource, signal) {
  const response = await fetch(getApiUrl(resource), { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return getItems(await response.json())
}

export function displayName(value, fallback = 'Unknown') {
  if (!value) return fallback
  if (typeof value === 'string') return value
  return value.name ?? value.username ?? ([value.firstName, value.lastName].filter(Boolean).join(' ') || fallback)
}

export function formatDate(value) {
  if (!value) return 'Not recorded'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Not recorded' : date.toLocaleDateString()
}
