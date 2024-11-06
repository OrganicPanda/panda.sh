import React from 'react'

import { Instances, Instance } from '@react-three/drei'
import type { ColorRepresentation} from 'three';
import { DoubleSide, Vector3 } from 'three'

// Originally from: https://codesandbox.io/s/lxvqek?file=/src/App.js:3212-3920
const Grid = ({
  number = 10,
  lineWidth = 0.026,
  markerSize = 0.5,
  width = 200,
  height = 200,
  color = '#eee',
  markerColor = '#999',
}: {
  number?: number
  lineWidth?: number
  markerSize?: number
  width?: number
  height?: number
  color?: ColorRepresentation
  markerColor?: ColorRepresentation
}) => (
  <>
    {/* Renders a grid and crosses as instances */}
    <Instances position={[0, 0, 0]}>
      <planeGeometry args={[lineWidth, markerSize]} />
      {/* Flat shading is to try to get rid of z-fighting. Doesn't really work */}
      {/* Also tried depthWrite but it breaks z-order in a weird way */}
      <meshStandardMaterial color={markerColor} flatShading={true} />
      {Array.from({ length: number }, (_, y) =>
        Array.from({ length: number }, (_, x) => (
          <group
            key={`${x}:${y}`}
            position={[
              x * 2 - Math.floor(number / 2) * 2,
              0,
              y * 2 - Math.floor(number / 2) * 2,
            ]}
          >
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
      <gridHelper
        args={[width, width / 2, '#bbb', '#bbb']}
        position={[0, 0, 0]}
      />
    </Instances>

    <mesh position={new Vector3(0, 0, 0)} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, height, width, height]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.25}
        side={DoubleSide}
        flatShading={true}
      />
    </mesh>
  </>
)

export default Grid
