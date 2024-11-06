import { Vector3 } from 'three'

import type { BoxSize } from '../types'

export enum AxisAlignment {
  START = 'START',
  CENTER = 'CENTER',
  END = 'END',
}

export const withAxisAlignment = ({
  position = new Vector3(0, 0, 0),
  size,
  x = AxisAlignment.CENTER,
  y = AxisAlignment.CENTER,
  z = AxisAlignment.CENTER,
  offsets = new Vector3(0, 0, 0),
}: {
  position?: Vector3
  size: BoxSize
  x?: AxisAlignment
  y?: AxisAlignment
  z?: AxisAlignment
  offsets?: Vector3
}) => {
  const [width, height, depth] = size
  const positionCopy = position.clone()

  // Center alignment is the default
  let alignedX = 0
  let alignedY = 0
  let alignedZ = 0

  if (x === AxisAlignment.START) alignedX = width / 2
  if (x === AxisAlignment.END) alignedX = -width / 2
  if (y === AxisAlignment.START) alignedY = -height / 2
  if (y === AxisAlignment.END) alignedY = height / 2
  if (z === AxisAlignment.START) alignedZ = -depth / 2
  if (z === AxisAlignment.END) alignedZ = depth / 2

  return positionCopy
    .add(new Vector3(alignedX, alignedY, alignedZ))
    .add(offsets)
}
