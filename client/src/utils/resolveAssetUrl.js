const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'
const API_ORIGIN = API_URL.replace(/\/api\/v1\/?$/, '')

export function resolveAssetUrl(assetPath) {
  if (!assetPath) return ''
  if (/^https?:\/\//i.test(assetPath)) return assetPath
  return `${API_ORIGIN}${assetPath}`
}
