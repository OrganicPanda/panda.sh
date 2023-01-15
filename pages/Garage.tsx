import React, { ComponentProps, useRef } from 'react'
import {
  BoxGeometryProps,
  Canvas,
  NodeProps,
  useFrame
} from '@react-three/fiber'
import {
  OrbitControls,
  Edges,
  GizmoHelper,
  GizmoViewport,
  PivotControls,
  Instances,
  Instance,
  Bounds,
  TransformControls
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
// const DebugBox = (boxProps: BoxGeometryProps) => {
//   return (
//     <>
//       <boxGeometry {...boxProps} />
//       <meshStandardMaterial transparent opacity={0.5} />
//       <Edges />
//     </>
//   )
// }

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
      anchor={[1, 1, 1]}
      //   matrix={matrix}
      // autoTransform={false}
      onDrag={(...args) => console.log('transform', ...args)}
    >
      {children}
    </PivotControls>
  )
}

type BoxSize = BoxGeometryProps['args']
const DebugBox = ({
  position,
  size
}: {
  position?: Vector3
  size: BoxSize
}) => {
  const mesh = useRef<Mesh>(null)

  return (
    <>
      {mesh.current ? (
        <TransformControls object={mesh.current} mode="translate" />
      ) : null}
      <mesh ref={mesh} position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial transparent opacity={0.5} />
        <Edges />
      </mesh>
    </>
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
      <Floor color={furnitureColour} />

      <Wall color={furnitureColour} />

      {true ? (
        <DebugBox
          position={new Vector3(1, parameters.WALL_THICKNESS + 5, 1)}
          size={[2, 2, 2]}
        />
      ) : (
        <mesh
          castShadow
          position={new Vector3(0, parameters.WALL_THICKNESS + 1, 0)}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={furnitureColour} />
        </mesh>
      )}
    </>
  )
}

// From: https://codesandbox.io/s/lxvqek?file=/src/App.js:3212-3920
const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, 0, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshStandardMaterial color="#999" />
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
            camera={{ position: [5, 1, 10] }}
          >
            <color
              attach="background"
              args={[customProperties?.['--🎨-background'] ?? 'white']}
            />
            <ambientLight intensity={0.1} />
            <hemisphereLight
              intensity={0.125}
              color="#ffffff"
              groundColor={customProperties?.['--🎨-background'] ?? 'white'}
            />
            <spotLight
              castShadow
              color="white"
              intensity={2}
              position={[2, 50, 15]}
              angle={0.25}
              penumbra={1}
              shadow-mapSize={[128, 128]}
              shadow-bias={0.00005}
            />
            <Grid />
            <Bounds fit clip observe damping={6} margin={1}>
              <GarageScene
                wallColour={customProperties?.['--🎨-background'] ?? 'white'}
                floorColour={customProperties?.['--🎨-background'] ?? 'white'}
                furnitureColour={
                  customProperties?.['--🎨-art-accent'] ?? 'white'
                }
              />
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
      </div>
    </>
  )
}

function Wall({ color }: { color: ColorRepresentation }) {
  return (
    <mesh
      castShadow
      position={
        new Vector3(
          -((parameters.GARAGE_WIDTH - parameters.WALL_THICKNESS) / 2),
          // parameters.WALL_THICKNESS,
          parameters.GARAGE_HEIGHT / 2 + parameters.WALL_THICKNESS,
          0
        )
      }
    >
      <boxGeometry
        args={[
          parameters.WALL_THICKNESS,
          parameters.GARAGE_HEIGHT,
          parameters.GARAGE_DEPTH
        ]}
      />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Floor({ color }: { color: ColorRepresentation }) {
  return (
    <mesh
      castShadow
      position={new Vector3(0, parameters.WALL_THICKNESS / 2, 0)}
    >
      <boxGeometry
        args={[
          parameters.GARAGE_WIDTH,
          parameters.WALL_THICKNESS,
          parameters.GARAGE_DEPTH
        ]}
      />
      <meshStandardMaterial color={color} />
    </mesh>
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
