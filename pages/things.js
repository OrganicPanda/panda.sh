import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import styled from 'styled-components'
import Layout from '../components/layout'
import Header from '../components/header'
import PageHeader from '../components/pageheader'

const CanvasWrapperStyled = styled.div`
  border: 1px solid red;
  width: 100%;
  position: relative;

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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const ThingsPage = () => {
  return (
    <Layout>
      <PageHeader isSticky />
      <p>Things are here</p>

      <CanvasWrapperStyled>
        <Canvas
          style={{ position: 'absolute', top: 0, left: 0 }}
          mode='concurrent'
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[-1.2, 1, 1]} />
          <Box position={[1.2, 1, 1]} />
          {/* <Thing wallThickness={wallThickness} scale={0.2} position={[-2, -1, 0]} />
          <Thing scale={0.2} position={[2, -1, 0]} /> */}
          <OrbitControls />
        </Canvas>
      </CanvasWrapperStyled>

      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>{i} things are here</p>
      ))}
    </Layout>
  )
}

ThingsPage.propTypes = {
  isLoading: PropTypes.bool
}

export default ThingsPage
