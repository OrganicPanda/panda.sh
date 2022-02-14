import React, {
  useRef,
  useState,
  useEffect,
  useTransition,
  Suspense
} from 'react'
import { suspend } from 'suspend-react'
import { useFrame } from '@react-three/fiber'
import { CSGToBuffers } from './CSGToBuffers'
import buffersToObject3D from './BuffersToObject3D'

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
          console.log(
            `generateModel: key from worker:`,
            key,
            key === requestKey
          )
          console.log(`generateModel: model from worker:`, model)

          if (key === requestKey) {
            // Build using jscad
            const buffers = CSGToBuffers(model)
            const object3d = buffersToObject3D(buffers)

            worker.removeEventListener('message', onMessage)
            console.log(`generateModel: resolving:`, object3d)
            resolve(object3d)
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

const Thing = ({ model, scale, position }) => {
  const meshRef = useRef()
  const rotationRef = useRef()
  const object3d = model
  const cloned = object3d.clone()

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
    <primitive
      object={cloned}
      ref={meshRef}
      scale={scale / 12}
      position={position}
    />
  )
}

const NewThingWrapper = ({ scale, position, wallThickness }) => {
  const model = suspend(async () => {
    return await generateModel({
      wallThickness: wallThickness
    })
  }, [wallThickness])

  return <Thing model={model} scale={scale} position={position} />
}

export default NewThingWrapper

// TODO: how to set the material?
// material={new THREE.MeshStandardMaterial('hotpink')}
// TODO: does primative support events?
// const [hovered, setHover] = useState(false)
// const [active, setActive] = useState(false)
// onClick={(e) => setActive(!active)}
// onPointerOver={(e) => setHover(true)}
// onPointerOut={(e) => setHover(false)}
// TODO: why are the models so big?
