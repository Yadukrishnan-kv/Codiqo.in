import path from 'node:path'
import fs from 'node:fs/promises'
import { uploadsDirPath } from '../middleware/upload.middleware.js'

export async function deleteUploadedFile(relativeUrl) {
  if (!relativeUrl || !relativeUrl.startsWith('/uploads/')) return
  const filePath = path.join(uploadsDirPath, path.basename(relativeUrl))
  await fs.unlink(filePath).catch(() => {})
}
