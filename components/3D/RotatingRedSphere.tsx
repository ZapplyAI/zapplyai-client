import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

const fragmentShader = `
    varying vec3 vNormal;
    varying vec2 vUv;
    
    uniform vec3 color;
    uniform sampler2D colorTexture;
    
    void main() {
    
    vec3 light = vec3( 0.5, 0.2, 1.0 );
    light = normalize( light );
    
    float dProd = dot( vNormal, light ) * 0.5 + 0.5;
    
    vec4 tcolor = texture2D( colorTexture, vUv );
    vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );
    
    gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );

  }

`

const vertexShader = `
    uniform float amplitude;

    attribute float displacement;

    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
    
    vNormal = normal;
    vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );
    
    vec3 newPosition = position + amplitude * normal * vec3( displacement );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
`

const RotatingRedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  useEffect(() => {
    if (geometryRef.current) {
      const geometry = geometryRef.current
      const displacement = new Float32Array(geometry.attributes.position.count)
      for (let i = 0; i < displacement.length; i++) {
        displacement[i] = Math.random() * 5
      }
      geometry.setAttribute(
        'displacement',
        new THREE.BufferAttribute(displacement, 1)
      )
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry ref={geometryRef} args={[1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          amplitude: { value: 1.0 },
          color: { value: new THREE.Color(0xff2200) },
          colorTexture: {
            value: new THREE.TextureLoader().load('/3D/textures/cloud.png'),
          },
          time: { value: 1.0 },
          uvScale: { value: new THREE.Vector2(1.0, 1.0) },
        }}
        // wireframe
      />
    </mesh>
  )
}

const App: React.FC = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <RotatingRedSphere />
      <OrbitControls />
    </Canvas>
  )
}

export default App
