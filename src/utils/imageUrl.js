const API_BASE_URL = "http://localhost:5205"

export function getImageUrl(imagePath) {
  if (!imagePath) return null
  if (imagePath.startsWith("http")) return imagePath
  return `${API_BASE_URL}${imagePath}`
}