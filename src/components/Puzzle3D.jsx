import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Pyraminx - Proper tetrahedron with 4 triangular faces
const PyraminxMesh = ({ colors }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  const safeColors = [...colors];
  while (safeColors.length < 4) safeColors.push('#cccccc');

  // Tetrahedron vertices
  const a = 1.5;
  const v0 = [0, a, 0];                // top
  const v1 = [-a, -a/2, a];             // front-left
  const v2 = [a, -a/2, a];              // front-right
  const v3 = [0, -a/2, -a];             // back

  const faces = [
    { verts: [...v0, ...v1, ...v2], color: safeColors[0] },
    { verts: [...v0, ...v2, ...v3], color: safeColors[1] },
    { verts: [...v0, ...v3, ...v1], color: safeColors[2] },
    { verts: [...v1, ...v3, ...v2], color: safeColors[3] }
  ];

  return (
    <group ref={meshRef} rotation={[0.2, 0, 0]}>
      {faces.map((face, i) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(face.verts), 3));
        geometry.computeVertexNormals();
        return (
          <mesh key={i} geometry={geometry}>
            <meshStandardMaterial
              color={face.color}
              side={THREE.DoubleSide}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>
        );
      })}
      {/* Edge wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.TetrahedronGeometry(a * 1.01)]} />
        <lineBasicMaterial color="#000000" />
      </lineSegments>
    </group>
  );
};

// Megaminx - Dodecahedron with vertex-colored faces
const MegaminxMesh = ({ colors }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });

  const safeColors = [];
  for (let i = 0; i < 12; i++) {
    safeColors.push(colors[i % colors.length] || `hsl(${i * 30}, 70%, 55%)`);
  }

  // Build colored dodecahedron by coloring each face
  const geometry = new THREE.DodecahedronGeometry(1.5, 0);
  const positionAttr = geometry.attributes.position;
  const colorAttr = new Float32Array(positionAttr.count * 3);
  // Each face is 3 triangles (9 vertices), 12 faces total = 36 triangles = 108 vertices
  const trianglesPerFace = 3;
  const vertsPerTriangle = 3;
  const vertsPerFace = trianglesPerFace * vertsPerTriangle;
  for (let face = 0; face < 12; face++) {
    const color = new THREE.Color(safeColors[face]);
    for (let v = 0; v < vertsPerFace; v++) {
      const idx = (face * vertsPerFace + v) * 3;
      colorAttr[idx] = color.r;
      colorAttr[idx + 1] = color.g;
      colorAttr[idx + 2] = color.b;
    }
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));

  return (
    <group ref={meshRef} rotation={[0.3, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.DodecahedronGeometry(1.51, 0)]} />
        <lineBasicMaterial color="#000000" />
      </lineSegments>
    </group>
  );
};

// Skewb - Cube with diagonal-split stickers per face
const SkewbMesh = ({ colors }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  const s = 1.2;
  const safeColors = [...colors];
  while (safeColors.length < 6) safeColors.push('#cccccc');

  // For each face, render 4 corner triangles + 1 center diamond
  const faceDefs = [
    { rotation: [0, 0, 0], position: [0, 0, s], colors: [safeColors[0], safeColors[5]] },
    { rotation: [0, Math.PI, 0], position: [0, 0, -s], colors: [safeColors[1], safeColors[4]] },
    { rotation: [0, Math.PI/2, 0], position: [s, 0, 0], colors: [safeColors[2], safeColors[0]] },
    { rotation: [0, -Math.PI/2, 0], position: [-s, 0, 0], colors: [safeColors[3], safeColors[1]] },
    { rotation: [-Math.PI/2, 0, 0], position: [0, s, 0], colors: [safeColors[4], safeColors[2]] },
    { rotation: [Math.PI/2, 0, 0], position: [0, -s, 0], colors: [safeColors[5], safeColors[3]] }
  ];

  return (
    <group ref={meshRef} rotation={[0.3, 0.3, 0]}>
      {faceDefs.map((face, i) => {
        const t = s * 0.95;
        // 4 triangular corner stickers
        const corners = [
          [[-t, -t, 0], [t, -t, 0], [0, 0, 0]],   // bottom
          [[t, -t, 0], [t, t, 0], [0, 0, 0]],     // right
          [[t, t, 0], [-t, t, 0], [0, 0, 0]],     // top
          [[-t, t, 0], [-t, -t, 0], [0, 0, 0]]    // left
        ];
        return (
          <group key={i} position={face.position} rotation={face.rotation}>
            {corners.map((tri, j) => {
              const verts = new Float32Array([...tri[0], ...tri[1], ...tri[2]]);
              const geom = new THREE.BufferGeometry();
              geom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
              geom.computeVertexNormals();
              return (
                <mesh key={j} geometry={geom} position={[0, 0, 0.005]}>
                  <meshStandardMaterial
                    color={j % 2 === 0 ? face.colors[0] : face.colors[1]}
                    side={THREE.DoubleSide}
                    metalness={0.3}
                    roughness={0.3}
                  />
                </mesh>
              );
            })}
            {/* Center diamond sticker */}
            <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI/4]}>
              <planeGeometry args={[t * 0.7, t * 0.7]} />
              <meshStandardMaterial
                color={face.colors[0]}
                metalness={0.3}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(s * 2.02, s * 2.02, s * 2.02)]} />
        <lineBasicMaterial color="#000000" />
      </lineSegments>
    </group>
  );
};

// Square-1 - Cube with irregular shape-shifting layers
const Square1Mesh = ({ colors }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  const safeColors = [...colors];
  while (safeColors.length < 6) safeColors.push('#cccccc');

  return (
    <group ref={meshRef} rotation={[0.3, 0.3, 0]}>
      {/* Top layer - 4 irregular pieces */}
      <mesh position={[-0.45, 0.65, 0.45]}>
        <boxGeometry args={[0.7, 0.4, 0.7]} />
        <meshStandardMaterial color={safeColors[0]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.65, 0.5]}>
        <boxGeometry args={[0.9, 0.4, 0.8]} />
        <meshStandardMaterial color={safeColors[2]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.65, -0.5]}>
        <boxGeometry args={[0.7, 0.4, 0.7]} />
        <meshStandardMaterial color={safeColors[1]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, 0.65, -0.5]}>
        <boxGeometry args={[0.9, 0.4, 0.8]} />
        <meshStandardMaterial color={safeColors[3]} metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Middle layer - thin strip */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.7, 0.15, 1.7]} />
        <meshStandardMaterial color={safeColors[4]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.7, 0.15, 1.7]} />
        <meshStandardMaterial color={safeColors[5]} metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Bottom layer - 4 irregular pieces */}
      <mesh position={[-0.5, -0.4, 0.5]}>
        <boxGeometry args={[0.9, 0.5, 0.8]} />
        <meshStandardMaterial color={safeColors[5]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, -0.4, 0.5]}>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshStandardMaterial color={safeColors[0]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, -0.4, -0.45]}>
        <boxGeometry args={[0.9, 0.5, 0.7]} />
        <meshStandardMaterial color={safeColors[1]} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, -0.4, -0.5]}>
        <boxGeometry args={[0.7, 0.5, 0.8]} />
        <meshStandardMaterial color={safeColors[2]} metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Mirror Cube - 3x3 cube with varying piece sizes (metallic)
const MirrorCubeMesh = ({ colors }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  // Build 27 pieces with varying sizes
  const sliceWidths = [0.6, 0.4, 0.8];
  const rowHeights = [0.5, 0.8, 0.3];
  const colDepths = [0.7, 0.4, 0.9];

  const pieces = [];
  let yPos = 0;
  for (let row = 0; row < 3; row++) {
    const h = rowHeights[row];
    let zPos = 0;
    for (let col = 0; col < 3; col++) {
      const d = colDepths[col];
      let xPos = 0;
      for (let slice = 0; slice < 3; slice++) {
        const w = sliceWidths[slice];
        pieces.push({
          position: [
            xPos + w / 2 - 0.9,
            yPos + h / 2 - 0.8,
            zPos + d / 2 - 1.0
          ],
          size: [w * 0.95, h * 0.95, d * 0.95]
        });
        xPos += w;
      }
      zPos += d;
    }
    yPos += h;
  }

  return (
    <group ref={meshRef} rotation={[0.3, 0.3, 0]}>
      {pieces.map((piece, i) => (
        <mesh key={i} position={piece.position}>
          <boxGeometry args={piece.size} />
          <meshStandardMaterial
            color="#D4D4D8"
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Puzzle3D = ({ type, colors }) => {
  return (
    <div className="w-full h-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          {type === 'pyraminx' && <PyraminxMesh colors={colors} />}
          {type === 'megaminx' && <MegaminxMesh colors={colors} />}
          {type === 'skewb' && <SkewbMesh colors={colors} />}
          {type === 'square1' && <Square1Mesh colors={colors} />}
          {type === 'mirror' && <MirrorCubeMesh colors={colors} />}
        </Suspense>
      </Canvas>
    </div>
  );
};
