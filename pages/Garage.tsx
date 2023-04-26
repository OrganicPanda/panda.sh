import React from 'react'
import { ColorRepresentation, Vector3 } from 'three'

import { PageHeader } from '../src/components/PageHeader'
import { useCustomProperties } from '../src/hooks/useCustomProperties'
import { BasicLayout } from '../src/components/layout/BasicLayout'
import { ExampleScene } from '../src/components/3d/ExampleScene'

type GarageProps = {
  wallColour: ColorRepresentation
  floorColour: ColorRepresentation
  furnitureColour: ColorRepresentation
}

const parameters = {
  GARAGE_WIDTH: 4,
  GARAGE_HEIGHT: 2.1,
  GARAGE_DEPTH: 2.55,
  WALL_THICKNESS: 0.05
}

const GarageScene = ({
  wallColour,
  floorColour,
  furnitureColour
}: GarageProps) => {
  return (
    <>
      <Floor color={floorColour} />

      <Wall color={wallColour} />

      <mesh
        castShadow
        position={new Vector3(0, parameters.WALL_THICKNESS + 1, 1)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={furnitureColour} />
      </mesh>
    </>
  )
}

const ExampleOne = () => {
  const { ref, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-art-accent'
  ])

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <ExampleScene>
        <GarageScene
          wallColour={customProperties?.['--🎨-background'] ?? 'white'}
          floorColour={customProperties?.['--🎨-background'] ?? 'white'}
          furnitureColour={customProperties?.['--🎨-art-accent'] ?? 'white'}
        />
      </ExampleScene>
    </div>
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
        <div className="🐼-section-item 🐼-section-page-highlight">
          <ExampleOne />
        </div>
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
