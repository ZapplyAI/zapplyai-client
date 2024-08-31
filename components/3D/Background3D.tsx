import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Loader, OrbitControls } from '@react-three/drei'
import Blob from './Blob'
import Marble from './Marble'
import { Debug, Physics } from '@react-three/cannon'
import Lighting from './Lighting'
import TextComponent from '@/components/3D/Text'
import Floor from '@/components/3D/Floor'
import Ring from '@/components/3D/Ring'

function Background3D() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Canvas
        orthographic
        shadows
        camera={{
          // position: [-674.32, 401.86, 878.18],
          near: -10000,
          far: 10000,
          zoom: 1.5 * 100,
        }}
        style={{
          // opacity: loaded ? 1 : 0,
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        <color args={['#020014']} attach="background" />

        <Suspense fallback={null}>
          {/*<Physics>*/}
          {/*  <Bounds fit>*/}
          {/*    <TextComponent />*/}
          {/*  </Bounds>*/}

          {/*  <Floor />*/}
          {/*  <Marble setLoaded={setLoaded} />*/}
          {/*</Physics>*/}

          <Ring />

          <Blob position={[-2, -0.5, -3]} />
          <Blob position={[-2, 1.5, 0]} />
          <Blob position={[2, 0.8, 1]} />
          <Blob position={[-2, -0.2, 4]} />
          <Blob position={[2, 1, -2]} />
        </Suspense>
        <Lighting />

        {/*<gridHelper args={[200, 100, '#1100ff', '#1100ff']} position={[0, -1.26, 0]} />*/}
        {/*<gridHelper args={[200, 1000, '#1100ff', '#1100ff']} position={[0, -1.27, 0]} />*/}
        {/* <OrbitControls enablePan={false} minZoom={90} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0} /> */}
        <OrbitControls />
      </Canvas>
      {/*{loaded && <Tag />}*/}

      <Loader />
    </>
  )
}

export default Background3D
