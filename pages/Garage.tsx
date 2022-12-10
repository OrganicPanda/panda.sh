import React, { useRef } from 'react'
import { BoxGeometryProps, Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Edges,
  GizmoHelper,
  GizmoViewport,
  PivotControls,
  Instances,
  Instance
} from '@react-three/drei'
import {
  Brush,
  Subtraction,
  Addition,
  Difference,
  Intersection,
  BrushRef
} from '@react-three/csg'
import { atom, useAtom } from 'jotai'

import styles from './Garage.module.css'
import { PageHeader } from '../src/components/PageHeader'
import { useCustomProperties } from '../src/hooks/useCustomProperties'
import BasicLayout from '../src/components/layout/BasicLayout'
import { ColorRepresentation, Mesh, Vector3 } from 'three'

const orbitLockAtom = atom(false)

type GarageProps = {
  wallColour: ColorRepresentation
  floorColour: ColorRepresentation
  furnitureColour: ColorRepresentation
}

const useAnimatedBrushRotation = (
  brush: React.RefObject<BrushRef>,
  amount = 0.025
) => {
  useFrame(() => {
    if (!brush.current) return
    brush.current.rotation.x += amount
    brush.current.needsUpdate = true
  })
}

const useAnimatedMeshRotation = (
  mesh: React.RefObject<Mesh>,
  amount = 0.025
) => {
  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x += amount
  })
}

// <mesh ref={outline} position={new Vector3(0, 0, 0)}>
//   <DebugBox args={[40, 10, 10]} />
// </mesh>
const DebugBox = (boxProps: BoxGeometryProps) => {
  return (
    <>
      <boxGeometry {...boxProps} />
      <meshStandardMaterial transparent opacity={0.5} />
      <Edges />
    </>
  )
}

// <mesh castShadow position={new Vector3(0, 0, 0)}>
//   <Subtraction>
//     <Brush a>
//       <boxGeometry args={[50, 2, 20]} />
//     </Brush>
//     <Brush b ref={brush}>
//       <boxGeometry args={[40, 10, 10]} />
//     </Brush>
//   </Subtraction>
//   <meshStandardMaterial color={furnitureColour} />
// </mesh>

const parameters = {
  GARAGE_WIDTH: 4,
  GARAGE_HEIGHT: 2.1,
  GARAGE_DEPTH: 2.55,
  WALL_THICKNESS: 0.05
}

const PivotControlsWithLock = ({ children }: { children: React.ReactNode }) => {
  const [_, setOrbitLock] = useAtom(orbitLockAtom)

  return (
    <PivotControls
      onDragStart={() => setOrbitLock(true)}
      onDragEnd={() => setOrbitLock(false)}
    >
      {children}
    </PivotControls>
  )
}

const GarageScene = ({
  wallColour,
  floorColour,
  furnitureColour
}: GarageProps) => {
  const brush = useRef<BrushRef>(null)
  const outline = useRef<Mesh>(null)

  useAnimatedBrushRotation(brush)
  useAnimatedMeshRotation(outline)

  return (
    <>
      <PivotControlsWithLock>
        <mesh castShadow position={new Vector3(0, 0, 0)}>
          <boxGeometry
            args={[
              parameters.GARAGE_WIDTH,
              parameters.WALL_THICKNESS,
              parameters.GARAGE_DEPTH
            ]}
          />
          <meshStandardMaterial color={furnitureColour} />
        </mesh>
      </PivotControlsWithLock>

      {/* <mesh castShadow position={new Vector3(0, 0, 0)}>
        <boxGeometry
          args={[
            parameters.GARAGE_WIDTH,
            parameters.WALL_THICKNESS,
            parameters.GARAGE_DEPTH
          ]}
        />
        <meshStandardMaterial color={furnitureColour} />
      </mesh> */}
    </>
  )
}

// From: https://codesandbox.io/s/lxvqek?file=/src/App.js:3212-3920
const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, 0, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group
          key={`${x}:${y}`}
          position={[
            x * 2 - Math.floor(number / 2) * 2,
            0,
            y * 2 - Math.floor(number / 2) * 2
          ]}
        >
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, 0, 0]} />
  </Instances>
)

const ExampleOne = () => {
  const [orbitLock, setOrbitLock] = useAtom(orbitLockAtom)
  const { ref, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-heading',
    '--🎨-art-accent'
  ])

  return (
    <>
      <div className="🐼-section-item 🐼-section-page-highlight">
        <div
          className={styles['canvas-wrapper']}
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
          >
            <Grid />

            <GarageScene
              wallColour={customProperties?.['--🎨-background'] ?? 'white'}
              floorColour={customProperties?.['--🎨-background'] ?? 'white'}
              furnitureColour={customProperties?.['--🎨-art-accent'] ?? 'white'}
            />

            <OrbitControls enabled={!orbitLock} />

            <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
              <GizmoViewport
                axisColors={['red', 'green', 'blue']}
                labelColor="black"
              />
            </GizmoHelper>
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default function Garage() {
  return (
    <BasicLayout>
      <PageHeader isSticky />

      <div className="🐼-section 🐼-section-hero">
        <div className="🐼-section-page">
          <h1 className="🐼-section-item 🐼-heading 🐼-heading-1">
            Garage layout designs
          </h1>
          <p className="🐼-section-item 🐼-subheading">
            Having fun with <code className="🐼-code">react-three-fiber</code>
          </p>
        </div>
      </div>

      <div className="🐼-theme-happyhues-palettes-palette1 🐼-section">
        <ExampleOne />
      </div>

      <div className="🐼-theme-happyhues-palettes-palette2 🐼-section">
        <div className="🐼-section-page">
          <h1 className="🐼-section-item 🐼-heading">Heading</h1>
          <p className="🐼-section-item 🐼-text">This is some text</p>
          <p className="🐼-section-item 🐼-text">More text</p>
          <button type="button" className="🐼-section-item 🐼-button">
            This is a button
          </button>
          <div className="🐼-section-item 🐼-tag">This is a tag</div>
          <div className="🐼-section-item 🐼-card">This is a card</div>
        </div>
      </div>

      <div className="🐼-section">
        <div className="🐼-section-page">
          <h1 className="🐼-section-item 🐼-heading">Heading</h1>
          <p className="🐼-section-item 🐼-text">This is some text</p>
          <p className="🐼-section-item 🐼-text">More text</p>
          <button type="button" className="🐼-section-item 🐼-button">
            This is a button
          </button>
          <div className="🐼-section-item 🐼-tag">This is a tag</div>
          <div className="🐼-section-item 🐼-card">This is a card</div>
        </div>
      </div>
    </BasicLayout>
  )
}
