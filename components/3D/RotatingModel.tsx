import React, { useRef, Suspense, CSSProperties } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CircularProgress } from '@mui/material'

const Model = () => {
  const { scene } = useGLTF('/3D/VoxelDrawing.glb')
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })

  // Ensure the model casts and receives shadows
  scene.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true
      object.receiveShadow = true
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, -2]}
    />
  )
}

const RotatingModel = () => {
  // const rotatingLightRef = useRef<THREE.DirectionalLight>(null!)
  //
  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime()
  //   if (rotatingLightRef.current) {
  //     rotatingLightRef.current.position.x = 10 * Math.sin(time * 0.5)
  //     rotatingLightRef.current.position.z = 10 * Math.cos(time * 0.5)
  //   }
  // })

  return (
    <div style={style.fullscreenContainer}>
      <Suspense fallback={<LoadingIndicator />}>
        <Canvas style={style.canvas} shadows>
          {/* Lights that cast shadows */}
          <ambientLight color="#EB7DFF" intensity={0.7} />

          {/* Directional light that moves in a circular pattern */}
          <directionalLight
            // ref={rotatingLightRef}
            position={[10, 10, 5]}
            castShadow
            intensity={1.2}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#EB7DFF"
          />

          {/* Pulsating point light to fill in shadows */}
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#EB7DFF"
          />

          {/* Add the rotating model */}
          <Model />
        </Canvas>
      </Suspense>
    </div>
  )
}

useGLTF.preload('/3D/VoxelDrawing.glb')

const style: { [key: string]: CSSProperties } = {
  fullscreenContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
}

const LoadingIndicator = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </div>
)

export default RotatingModel
