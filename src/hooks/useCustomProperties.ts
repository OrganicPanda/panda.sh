import React, { useRef, useState, useEffect, useMemo } from 'react'

type Styles = {
  '--🎨-background': string | null
  '--🎨-heading': string | null
  '--🎨-art-accent': string | null
}

type CustomProperties<T extends keyof Styles> = Pick<Styles, T>

export const useCustomProperties = <T extends keyof Styles>(
  properties: T[]
): {
  ref: React.Ref<HTMLElement>
  customProperties: CustomProperties<T> | null
} => {
  const elRef = useRef<HTMLElement>(null)
  const [customProperties, setCustomProperties] = useState<Pick<
    Styles,
    T
  > | null>(null)

  useEffect(() => {
    const extractCustomProperties = () => {
      if (elRef.current) {
        const style = global.getComputedStyle(elRef.current)
        const propertyValues: CustomProperties<T> = properties.reduce(
          (previous, current) => {
            previous[current] = style.getPropertyValue(current) || null
            return previous
          },
          {} as CustomProperties<T>
        )

        setCustomProperties(propertyValues)
      }
    }
    extractCustomProperties()

    const mql = global.window.matchMedia('(prefers-color-scheme: dark)')
    mql.onchange = () => {
      extractCustomProperties()
    }
  }, [])

  return useMemo(
    () => ({
      ref: elRef,
      customProperties
    }),
    [customProperties]
  )
}
