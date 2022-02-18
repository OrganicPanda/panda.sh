import React, { useRef } from 'react'
import { suspend } from 'suspend-react'
import { useFrame } from '@react-three/fiber'
import { CSGToBuffers } from './CSGToBuffers'

let worker
if (global?.window?.Worker) {
  worker = new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module'
  })

  worker.onmessage = message => {
    console.log('worker.onmessage', message)
  }
  worker.onerror = message => {
    console.log('worker.onerror', message)
  }
}

// Tiny sham to reformat the params
const getParams = (defs, overrides = {}) => {
  return defs.reduce((acc, def) => {
    acc[def.name] = overrides[def.name] ? overrides[def.name] : def.initial
    return acc
  }, {})
}

let key = 0

const generateModel = (overrides = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const requestKey = key++

      const onMessage = function ({ data }) {
        const { action, payload } = data

        if (action === 'GENERATE_MODEL_SUCCESS') {
          const { key, model } = payload

          if (key === requestKey) {
            // Build using jscad
            const buffers = CSGToBuffers(model)

            worker.removeEventListener('message', onMessage)
            resolve(buffers)
          }
        }
      }

      worker.addEventListener('message', onMessage)

      worker.postMessage({
        action: 'GENERATE_MODEL',
        payload: { key: requestKey, overrides }
      })
    } catch (e) {
      console.log('generateModel error', e)

      reject(e)
    }
  })
}

const ThingTwo = ({ buffers, scale, position }) => {
  const meshRef = useRef()
  const rotationRef = useRef()
  const { vertices, indices } = buffers

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!meshRef.current) return
    if (rotationRef.current == null) rotationRef.current = 0
    rotationRef.current += 0.01
    meshRef.current.rotation.x = meshRef.current.rotation.y =
      rotationRef.current
  })

  // Express that as something rect-three-fiber can render
  return (
    <mesh ref={meshRef} scale={scale / 12} position={position}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
          onUploadCallback={() => console.log('position onUploadCallback')}
        />
        <bufferAttribute
          array={indices}
          attach='index'
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshPhongMaterial attach='material' color='hotpink' flatShading={true} />
    </mesh>
  )
}

const NewThingWrapper = ({ scale, position, wallThickness }) => {
  const buffers = suspend(async () => {
    return await generateModel({
      wallThickness: wallThickness
    })
  }, [wallThickness])

  return <ThingTwo buffers={buffers} scale={scale} position={position} />
}

export default NewThingWrapper

// TODO: does this support events?
// const [hovered, setHover] = useState(false)
// const [active, setActive] = useState(false)
// onClick={(e) => setActive(!active)}
// onPointerOver={(e) => setHover(true)}
// onPointerOut={(e) => setHover(false)}
// TODO: why are the models so big?
