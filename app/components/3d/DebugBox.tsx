import React, { useCallback, useRef, useState } from 'react'

import { Edges } from '@react-three/drei'
import type { Vector3 } from '@react-three/fiber'
import type { ColorRepresentation, Mesh } from 'three'

import type { BoxSize } from './types'

export const DebugBox = ({
  position,
  size,
  color = '#eee',
}: {
  position?: Vector3
  size: BoxSize
  color?: ColorRepresentation
}) => {
  const mesh = useRef<Mesh>(null)
  const [showControls, setShowControls] = useState<boolean>(false)

  // This gets called at 60fps, can we remove it once it's set?
  const handleAfterRender = useCallback(() => {
    if (showControls) return
    if (mesh.current) {
      setShowControls(true)
    }
  }, [showControls, setShowControls])

  return (
    <>
      {/* {mesh.current ? (
        <TransformControls object={mesh.current} mode="translate" />
      ) : null} */}
      <mesh ref={mesh} onAfterRender={handleAfterRender} position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
        <Edges />
      </mesh>
    </>
  )
}
