import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function ElasticLogo3Dc3D(props) {
  const gltf = useLoader(GLTFLoader, '/3D/brand/ElasticLogo_3D_Smooth.gltf')
  return (
    <mesh>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
