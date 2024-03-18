import { useRef, useState, useEffect, useMemo } from 'react'

import { useDarkMode } from './useDarkMode'

const extractCustomProperties = (element: Element, properties: string[]) => {
  const style = global.getComputedStyle(element)
  return properties.reduce((previous, current) => {
    previous[current] = style.getPropertyValue(current) || null
    return previous
  }, {} as Record<string, string | null>)
}

export const useCustomProperties = <K extends string>(
  properties: K[]
): {
  ref: React.Ref<HTMLElement>
  customProperties: Record<K, string | null>
} => {
  const darkMode = useDarkMode()
  const elRef = useRef<HTMLElement>(null)
  const [customProperties, setCustomProperties] = useState(
    {} as Record<K, string | null>
  )

  useEffect(() => {
    if (!elRef.current) return

    setCustomProperties(
      extractCustomProperties(elRef.current, properties) as Record<
        K,
        string | null
      >
    )
  }, [darkMode, ...properties])

  return useMemo(
    () => ({
      ref: elRef,
      customProperties,
    }),
    [customProperties]
  )
}
