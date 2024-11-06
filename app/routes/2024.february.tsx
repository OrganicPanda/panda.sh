import { Vector3 } from 'three'

import { Alignment } from '~/components/3d/Alignment'
import { DebugBox } from '~/components/3d/DebugBox'
import { ExampleScene } from '~/components/3d/ExampleScene'
import { AxisAlignment } from '~/components/3d/utils/withAxisAlignment'
import { CodeBlock } from '~/components/CodeBlock'
import { PageHeader } from '~/components/PageHeader'
import { Anchor, Code } from '~/components/Typography'
import { useCustomProperties } from '~/hooks/useCustomProperties'

const ExampleOne = () => {
  const { CustomProperties, customProperties } = useCustomProperties([
    '--🎨-art-accent',
  ])
  const color = customProperties?.['--🎨-art-accent'] || 'green'

  return (
    <CustomProperties>
      <ExampleScene>
        <DebugBox
          color={color}
          position={new Vector3(0, 0, 0)}
          size={[1, 1, 1]}
        />
      </ExampleScene>
    </CustomProperties>
  )
}

const ExampleTwo = () => {
  const { CustomProperties, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-art-accent',
  ])

  return (
    <CustomProperties>
      <ExampleScene>
        <DebugBox
          color={customProperties?.['--🎨-background'] || 'green'}
          position={new Vector3(0, 0, 0)}
          size={[0.5, 0.5, 0.5]}
        />

        <Alignment
          x={AxisAlignment.CENTER}
          y={AxisAlignment.CENTER}
          z={AxisAlignment.CENTER}
        >
          <DebugBox
            color={customProperties?.['--🎨-art-accent'] || 'red'}
            position={new Vector3(0.25, 0.25, 0.25)}
            size={[0.5, 0.5, 0.5]}
          />
        </Alignment>
      </ExampleScene>
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
            <p className="🐼-subheading">
              Getting aligned with <code className="🐼-code">three.js</code> and{' '}
              <code className="🐼-code">react-three-fiber</code>
            </p>
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
          <h2 className="🐼-section-item 🐼-heading">
            The problem with alignment
          </h2>
          <p className="🐼-section-item 🐼-text">
            In the world of <Anchor href="https://threejs.org">three.js</Anchor>{' '}
            everything is aligned centred on each axis by default. This means
            that if you place an object at a position of interest it will likely
            overlap something else in a way you did not intend it to. In the
            above example I&apos;m rendering a simple box at position{' '}
            <Code>[0, 0, 0]</Code> and, as you can see, it appears to have sunk
            in to the floor. I suspect this is expected if you think in 3d but I
            don&apos;t so let&apos;s see if we can fix it.
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
          <h2 className="🐼-section-item 🐼-heading">Getting aligned</h2>
          <p className="🐼-section-item 🐼-text">
            To fix this I&apos;m using an <Code>{'<Alignment />'}</Code>{' '}
            component and <Code>{`withAxisAlignment`}</Code> hook that can shift
            the position of a child component to align it how you want
          </p>

          <CodeBlock>{`
const ExampleTwo = () => {
  const { CustomProperties, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-art-accent',
  ])

  return (
    <CustomProperties>
      <ExampleScene>
        <DebugBox
          color={customProperties?.['--🎨-background'] || 'green'}
          position={new Vector3(0, 0, 0)}
          size={[0.5, 0.5, 0.5]}
        />

        <Alignment
          x={AxisAlignment.CENTER}
          y={AxisAlignment.CENTER}
          z={AxisAlignment.CENTER}
        >
          <DebugBox
            color={customProperties?.['--🎨-art-accent'] || 'red'}
            position={new Vector3(0.25, 0.25, 0.25)}
            size={[0.5, 0.5, 0.5]}
          />
        </Alignment>
      </ExampleScene>
    </CustomProperties>
  )
}
          `}</CodeBlock>

          <CodeBlock>{`
const Alignment = ({
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
          `}</CodeBlock>

          <CodeBlock>{`
const withAxisAlignment = ({
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
          `}</CodeBlock>
        </div>
      </div>
    </>
  )
}

export const Summary = () => {
  return (
    <>
      In the world of <Anchor href="https://threejs.org">three.js</Anchor>{' '}
      everything is aligned centred on each axis by default. This means that if
      you place an object at a position of interest it will likely overlap
      something else in a way you did not intend it to. Let&apos;s see if we can
      fix it.
    </>
  )
}
