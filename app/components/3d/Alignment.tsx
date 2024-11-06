import type { ReactElement } from 'react'
import { cloneElement, isValidElement } from 'react'

import { Vector3 } from 'three'

import type { BoxSize } from './types'
import { AxisAlignment, withAxisAlignment } from './utils/withAxisAlignment'

interface AlignmentProps {
  children: ReactElement<{
    position?: Vector3
    size: BoxSize
  }>
  x?: AxisAlignment
  y?: AxisAlignment
  z?: AxisAlignment
  offsets?: Vector3
}

export const Alignment = ({
  children,
  x = AxisAlignment.CENTER,
  y = AxisAlignment.CENTER,
  z = AxisAlignment.CENTER,
  offsets,
}: AlignmentProps) => {
  if (!isValidElement(children)) {
    throw new Error('Alignment requires a single React element as child')
  }

  const { position = new Vector3(0, 0, 0), size } = children.props

  if (!size) {
    throw new Error('Child component must have a size prop')
  }

  const alignedPosition = withAxisAlignment({
    position,
    size,
    x,
    y,
    z,
    offsets,
  })

  return cloneElement(children, {
    position: alignedPosition,
  })
}
