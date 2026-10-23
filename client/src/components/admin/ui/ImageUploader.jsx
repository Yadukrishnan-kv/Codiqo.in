import React, { useRef, useState } from 'react'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { uploadImageRequest } from '../../../api/upload.api'
import { resolveAssetUrl } from '../../../utils/resolveAssetUrl'

export default function ImageUploader({ value, onChange, aspect = 'aspect-video', className = '' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file) => {
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await uploadImageRequest(file)
      onChange(url)
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className={`relative ${className || 'w-full'} ${aspect} rounded-2xl overflow-hidden border border-border bg-background`}>
          <img src={resolveAssetUrl(value)} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`${className || 'w-full'} ${aspect} rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-60`}
        >
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
          <span className="text-xs font-medium px-2 text-center">{uploading ? 'Uploading…' : 'Click to upload an image'}</span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  )
}
