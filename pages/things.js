import React, { useRef, useState, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import styled from 'styled-components'
import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import useCustomProperties from '../hooks/useCustomProperties'
import Thing from '../components/things/thing'
import { QueueLog } from '../components/zust-queue/QueueLog'
import Range from '../components/range'

const CanvasWrapperStyled = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  // Aspect ratio hack
  ::before {
    float: left;
    padding-top: ${(100 / 16) * 9}%;
    content: '';
  }

  ::after {
    display: block;
    content: '';
    clear: both;
  }
`

const Box = props => {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : props.fill} />
    </mesh>
  )
}

const ThingsPage = () => {
  const { ref, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-heading',
    '--🎨-art-accent'
  ])

  const [wallThickness, setWallThickness] = useState(10)

  return (
    <Layout>
      <PageHeader isSticky />

      <div className='🐼-section 🐼-section-hero'>
        <div className='🐼-section-page'>
          <h1 className='🐼-section-item 🐼-heading 🐼-heading-1'>
            Dynamically generated meshes
          </h1>
          <p className='🐼-section-item 🐼-subheading'>
            Having fun with <code className='🐼-code'>react-three-fiber</code>{' '}
            and <code className='🐼-code'>openjscad</code>
          </p>
        </div>
      </div>

      <div className='🐼-theme-happyhues-palettes-palette1 🐼-section'>
        <div className='🐼-section-item 🐼-section-page-highlight'>
          <CanvasWrapperStyled ref={ref}>
            <Canvas
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                border: 'var(--📏-art-stroke-1) solid var(--🎨-border)',
                borderRadius: 'var(--📏-border-radius-2)'
              }}
              mode='concurrent'
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Box
                position={[-1.2, 1, 1]}
                fill={customProperties?.['--🎨-art-accent']}
              />
              <Box
                position={[1.2, 1, 1]}
                fill={customProperties?.['--🎨-art-accent']}
              />
              <Suspense fallback={null}>
                <Thing
                  wallThickness={wallThickness}
                  scale={0.2}
                  position={[-2, -1, 0]}
                  fill={customProperties?.['--🎨-art-accent']}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Thing
                  scale={0.2}
                  position={[2, -1, 0]}
                  fill={customProperties?.['--🎨-art-accent']}
                />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </CanvasWrapperStyled>
        </div>

        <div className='🐼-section-item'>
          <Range
            value={wallThickness}
            onChange={e => {
              setWallThickness(parseInt(e.target.value, 10))
            }}
            min='1'
            max='10'
          />
        </div>

        <div className='🐼-section-item'>
          <QueueLog />
        </div>
      </div>

      <div className='🐼-theme-happyhues-palettes-palette2 🐼-section'>
        <div className='🐼-section-page'>
          <h1 className='🐼-section-item 🐼-heading'>Heading</h1>
          <p className='🐼-section-item 🐼-text'>This is some text</p>
          <p className='🐼-section-item 🐼-text'>More text</p>
          <button type='button' className='🐼-section-item 🐼-button'>
            This is a button
          </button>
          <div className='🐼-section-item 🐼-tag'>This is a tag</div>
          <div className='🐼-section-item 🐼-card'>This is a card</div>
        </div>
      </div>

      <div className='🐼-section'>
        <div className='🐼-section-page'>
          <h1 className='🐼-section-item 🐼-heading'>Heading</h1>
          <p className='🐼-section-item 🐼-text'>This is some text</p>
          <p className='🐼-section-item 🐼-text'>More text</p>
          <button type='button' className='🐼-section-item 🐼-button'>
            This is a button
          </button>
          <div className='🐼-section-item 🐼-tag'>This is a tag</div>
          <div className='🐼-section-item 🐼-card'>This is a card</div>
        </div>
      </div>
    </Layout>
  )
}

ThingsPage.propTypes = {
  isLoading: PropTypes.bool
}

export default ThingsPage
