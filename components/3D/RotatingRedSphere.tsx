import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

const fragmentShader = `
    uniform float time;
    uniform float fogDensity;
    uniform vec3 fogColor;
    uniform sampler2D texture1;
    uniform sampler2D texture2;

    varying vec2 vUv;

    void main( void ) {
        vec2 position = - 1.0 + 2.0 * vUv;

        // Sample noise texture
        vec4 noise = texture2D( texture1, vUv );
        
        // Modify UV coordinates based on noise and time
        vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
        vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

        // Adjust UV coordinates based on noise
        T1.x += noise.x * 2.0;
        T1.y += noise.y * 2.0;
        T2.x -= noise.y * 0.2;
        T2.y += noise.z * 0.2;

        // Sample textures
        float p = texture2D( texture1, T1 ).a;
        vec4 color = texture2D( texture2, T2 );

        // Combine colors with some effects
        vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

        // Ensure color values are clamped
        temp.r = min(temp.r, 1.0);
        temp.g = min(temp.g, 1.0);
        temp.b = min(temp.b, 1.0);

        // Apply fog effect
        float depth = gl_FragCoord.z / gl_FragCoord.w;
        const float LOG2 = 1.442695;
        float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
        fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

        gl_FragColor = mix( temp, vec4( fogColor, temp.w ), fogFactor );
    }
`

const vertexShader = `
    uniform vec2 uvScale;
    varying vec2 vUv;

    void main()
    {
        vUv = uvScale * uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
`

const RotatingRedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  const textureLoader = new THREE.TextureLoader()
  const cloudTexture = textureLoader.load('/3D/textures/cloud.png')
  const lavaTexture = textureLoader.load('/3D/textures/lavatile.jpg')

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          fogDensity: { value: 0.45 },
          fogColor: { value: new THREE.Vector3(0, 0, 0) },
          time: { value: 1.0 },
          uvScale: { value: new THREE.Vector2(1.0, 1.0) },
          texture1: { value: cloudTexture },
          texture2: { value: lavaTexture },
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
