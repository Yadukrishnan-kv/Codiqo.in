import { useCallback, useRef, useState } from 'react'

export function useSavedBanner(duration = 2500) {
  const [saved, setSaved] = useState(false)
  const timeoutRef = useRef(null)

  const trigger = useCallback(() => {
    setSaved(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setSaved(false), duration)
  }, [duration])

  return [saved, trigger]
}
