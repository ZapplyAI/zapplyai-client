import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Loader } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer, Bloom, RenderPass } from '@react-three/postprocessing'
import LavaMesh from '@/components/3D/LavaShaderMaterial'
import Ring from '@/components/3D/Ring'

const ElasticLogo3D: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{
        near: -10000,
        far: 10000,
        zoom: 150,
      }}
      style={{
        transition: 'opacity 200ms ease-in-out',
      }}
    >
      <color args={['#020014']} attach="background" />
      <Suspense fallback={null}>
        {/*<Ring/>*/}
        <LavaMesh />
      </Suspense>
      <OrbitControls />
      <EffectComposer>
        <Bloom intensity={1.25} />
      </EffectComposer>
    </Canvas>
  )
}

export default ElasticLogo3D
