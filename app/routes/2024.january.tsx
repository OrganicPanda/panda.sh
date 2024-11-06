import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { CodeBlock } from '~/components/CodeBlock'
import { PageHeader } from '~/components/PageHeader'
import { useCustomProperties } from '~/hooks/useCustomProperties'
import { useDarkMode } from '~/hooks/useDarkMode'

const ExampleOne = () => {
  const darkMode = useDarkMode()

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 4, 4]} />
      <OrbitControls makeDefault />

      <mesh>
        <torusKnotGeometry />
        <meshStandardMaterial color={darkMode ? 'cyan' : 'hotpink'} />
      </mesh>
    </Canvas>
  )
}

const ExampleTwo = () => {
  const { CustomProperties, customProperties } = useCustomProperties([
    '--🎨-art-accent',
  ])
  const color = customProperties['--🎨-art-accent'] || 'green'

  return (
    <CustomProperties>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 4, 4]} />
        <OrbitControls makeDefault />

        <mesh>
          <torusKnotGeometry />
          <meshStandardMaterial color={color} />
        </mesh>
      </Canvas>
    </CustomProperties>
  )
}

export default function Index() {
  return (
    <>
      <PageHeader />

      <div className="🐼-section 🐼-section-hero">
        <div className="🐼-section-page">
          <div className="🐼-section-item">
            <h1 className="🐼-heading 🐼-heading-1">January 2024</h1>
            <p className="🐼-subheading">Dark mode in WebGL</p>
          </div>
        </div>
      </div>

      <div className="🐼-theme-happyhues-palettes-palette2 🐼-section">
        <div className="🐼-section-item 🐼-section-page-highlight">
          <ExampleOne />
        </div>
      </div>

      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <h2 className="🐼-section-item 🐼-heading">Using matchMedia</h2>
          <p className="🐼-section-item 🐼-text">
            Use <code className="🐼-code">matchMedia</code> and listen for
            changes to get updates when dark mode is toggled.
          </p>
          <p className="🐼-section-item 🐼-text">
            <CodeBlock>{`
import { useEffect, useState } from "react"

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
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

const ExampleOne = () => {
  const darkMode = useDarkMode()

  return (
    <Canvas>
      <TorusKnot color={darkMode ? 'cyan' : 'hotpink'} />
    </Canvas>
  )
}
            `}</CodeBlock>
          </p>
        </div>
      </div>

      <div className="🐼-theme-happyhues-palettes-palette2 🐼-section">
        <div className="🐼-section-item 🐼-section-page-highlight">
          <ExampleTwo />
        </div>
      </div>

      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <h2 className="🐼-section-item 🐼-heading">
            Add CSS Custom Properties
          </h2>
          <p className="🐼-section-item 🐼-text">
            CSS Custom Properties are a powerful tool and are easy to consume in
            CSS, but it gets a bit trickier when you want to use them outside of
            CSS. We can create another hook which will extract custom properties
            and update when dark mode is toggled
          </p>
          <p className="🐼-section-item 🐼-text">
            <CodeBlock>{`
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
  CustomProperties: React.FC<React.HTMLAttributes<HTMLDivElement>>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, ...properties])

  const CustomProperties = ({
    children,
    ...restProps
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div ref={elRef as React.Ref<HTMLDivElement>} {...restProps}>
      {children}
    </div>
  )

  return useMemo(
    () => ({
      ref: elRef,
      customProperties,
      CustomProperties,
    }),
    [customProperties]
  )
}

const ExampleTwo = () => {
  const { CustomProperties, customProperties } = useCustomProperties(['--🎨-art-accent'])
  const color = customProperties['--🎨-art-accent'] || 'green'

  return (
    <CustomProperties>
      <Canvas>
        <TorusKnot color={color} />
      </Canvas>
    </CustomProperties>
  )
}
          `}</CodeBlock>
          </p>
        </div>
      </div>
    </>
  )
}

export const Summary = () => {
  return (
    <>Adding Dark mode support and CSS Custom Properties to a WebGL scene</>
  )
}
