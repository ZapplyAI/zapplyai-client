import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const LavaShaderMaterial: React.FC = () => {
  const cloudTexture = useLoader(THREE.TextureLoader, '/3D/textures/cloud.png');
  const lavaTexture = useLoader(THREE.TextureLoader, '/3D/textures/lavatile.jpg');

  cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;
  lavaTexture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(
    () => ({
      fogDensity: { value: 0.45 },
      fogColor: { value: new THREE.Vector3(0, 0, 0) },
      time: { value: 1.0 },
      uvScale: { value: new THREE.Vector2(3.0, 1.0) },
      texture1: { value: cloudTexture },
      texture2: { value: lavaTexture },
    }),
    [cloudTexture, lavaTexture]
  );

  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value += 0.2 * clock.getDelta();
    }
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={`
        uniform vec2 uvScale;
        varying vec2 vUv;

        void main() {
          vUv = uvScale * uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `}
      fragmentShader={`
        uniform float time;
        uniform float fogDensity;
        uniform vec3 fogColor;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;

        void main(void) {
          vec2 position = -1.0 + 2.0 * vUv;

          vec4 noise = texture2D(texture1, vUv);
          vec2 T1 = vUv + vec2(1.5, -1.5) * time * 0.02;
          vec2 T2 = vUv + vec2(-0.5, 2.0) * time * 0.01;

          T1.x += noise.x * 2.0;
          T1.y += noise.y * 2.0;
          T2.x -= noise.y * 0.2;
          T2.y += noise.z * 0.2;

          float p = texture2D(texture1, T1 * 2.0).a;
          vec4 color = texture2D(texture2, T2 * 2.0);
          vec4 temp = color * (vec4(p, p, p, p) * 2.0) + (color * color - 0.1);

          if(temp.r > 1.0) { temp.bg += clamp(temp.r - 2.0, 0.0, 100.0); }
          if(temp.g > 1.0) { temp.rb += temp.g - 1.0; }
          if(temp.b > 1.0) { temp.rg += temp.b - 1.0; }

          gl_FragColor = temp;

          float depth = gl_FragCoord.z / gl_FragCoord.w;
          const float LOG2 = 1.442695;
          float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
          fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);

          gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);
        }
      `}
    />
  );
};

const LavaMesh: React.FC = () => {
  const gltf = useLoader(GLTFLoader, '/3D/brand/ElasticLogo_3D_Smooth.glb');

  // Debug with a simple box
  if (!gltf.scene.children.length) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>
    );
  }

  return (
    <mesh geometry={(gltf.scene.children[0] as THREE.Mesh).geometry}>
      <LavaShaderMaterial />
    </mesh>
  );
};

export default LavaMesh;
