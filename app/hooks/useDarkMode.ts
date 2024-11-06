import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const defaultState = global.window
    ? global.window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
  const [isDarkMode, setIsDarkMode] = useState(defaultState)

  useEffect(() => {
    if (!global?.window) return
    const mediaQuery = global.window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isDarkMode
}
