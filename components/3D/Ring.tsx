import { useRef, useMemo } from 'react'
import { useFrame, GroupProps } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import { LayerMaterial, Depth, Displace, Fresnel, Noise } from 'lamina'
import * as THREE from 'three'
import { DisplaceProps } from 'lamina/types'
import { Mesh, Vector3, MathUtils } from 'three';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';
import { Displace as DisplaceType } from 'lamina/vanilla';

export default function Ring({
  displaceProps,
  ...props
}: GroupProps & {
  displaceProps?: DisplaceProps
}) {
  const ringRef = useRef<Mesh>(null!)
  const displaceRef = useRef<
    DisplaceType & { strength: number; offset: Vector3 }
  >(null!)
  const strength = useRef(0.2) // Always use a certain displacement strength

  // Create a Perlin noise texture
  const perlinTexture = useMemo(() => {
    const size = 256
    const data = new Uint8Array(size * size)
    const noise = new ImprovedNoise()
    let quality = 1
    for (let i = 0; i < size * size; i++) {
      const x = i % size
      const y = Math.floor(i / size)
      data[i] = Math.abs(noise.noise(x / quality, y / quality, 0) * 128)
    }

    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.LuminanceFormat
    )
    texture.needsUpdate = true
    return texture
  }, [])

  useFrame((_, dt) => {
    displaceRef.current.offset.x += 0.3 * dt // Continuously animate the texture offset
  })

  return (
    <group {...props}>
      <Torus ref={ringRef} args={[1, 0.3, 128, 128]}>
        <LayerMaterial
          color={'#ffffff'}
          lighting={'physical'}
          transmission={1}
          roughness={0.1}
          thickness={2}
        >
          <Depth
            near={0.5}
            far={1}
            origin={[-0.5, 0.5, 0]}
            colorA={'#ff00ff'} // Magenta
            colorB={'#00ffff'} // Cyan
          />
          <Noise scale={5} type="perlin" colorA="white" colorB="purple" />
          <Displace
            ref={displaceRef}
            strength={0.2}
            scale={5}
            offset={[0, 0, 0]}
          />
          <Fresnel
            color={'#fefefe'}
            bias={-0.3}
            intensity={4}
            power={3.5}
            factor={1.2}
            mode={'screen'}
          />
        </LayerMaterial>
      </Torus>
    </group>
  )
}
