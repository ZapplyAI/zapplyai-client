import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Html, OrbitControls, useProgress } from '@react-three/drei'

import ElasticLogo3D from '@/components/3D/ElasticLogo3D'

export default function ElasticScene() {
  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight color="red" position={[0, 0, 5]} />

        <ElasticLogo3D />
      </Suspense>

      <CameraControls />
    </Canvas>
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
