import React, { ComponentProps } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Bounds
} from '@react-three/drei'
import { atom, useAtom } from 'jotai'

import styles from './ExampleScene.module.css'
import { useCustomProperties } from '../../hooks/useCustomProperties'
import Grid from './Grid'

const orbitLockAtom = atom(false)

export const ExampleScene = ({
  canvasProps = {},
  children
}: {
  canvasProps?: Partial<ComponentProps<typeof Canvas>>
  children: React.ReactNode
}) => {
  const [orbitLock] = useAtom(orbitLockAtom)
  const { ref, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-heading',
    '--🎨-art-accent'
  ])

  return (
    <div
      className={`🐼-theme-happyhues-palettes-palette1 ${styles['canvas-wrapper']}`}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <Canvas
        shadows
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: 'var(--📏-art-stroke-1) solid var(--🎨-border)',
          borderRadius: 'var(--📏-border-radius-2)'
        }}
        camera={{ position: [5, 1, 10] }}
        {...canvasProps}
      >
        <color
          attach="background"
          args={[customProperties?.['--🎨-background'] ?? 'white']}
        />
        <ambientLight intensity={0.3} />
        <hemisphereLight intensity={0.5} color="#ffffff" />
        {/* <spotLight
          castShadow
          color="white"
          intensity={2}
          position={[2, 50, 15]}
          angle={0.25}
          penumbra={1}
          shadow-mapSize={[128, 128]}
          shadow-bias={0.00005}
        /> */}
        <Grid />
        <Bounds observe damping={6} margin={1}>
          {children}
        </Bounds>
        <OrbitControls enabled={!orbitLock} makeDefault />
        <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor="black"
          />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}
