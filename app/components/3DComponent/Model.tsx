import React from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";
interface ModelProps {
  objPath: string;
  mtlPath: string;
}

function Model({ objPath, mtlPath }: ModelProps) {
  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader: any) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  useFrame(() => {
    if (obj) {
      const axis = new THREE.Vector3(0, 2, 0);
      const angle = 0.005;
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, angle);
      obj.applyQuaternion(quaternion);
    }
  });
  obj.position.set(0, -2, -3);
  obj.rotation.y = Math.PI / 0.001;

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={obj} />;
}

export default function ObjViewer() {
  return (
    <Canvas shadows>
      <ambientLight intensity={5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024} // เพิ่มขนาดของแผนที่เงาเพื่อความละเอียดที่สูงขึ้น
        shadow-mapSize-height={1024}
        shadow-radius={200}
      />
      <spotLight
        position={[0, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024} // เพิ่มขนาดของแผนที่เงาเพื่อความละเอียดที่สูงขึ้น
        shadow-mapSize-height={1024}
        shadow-radius={10} // ปรับค่ารัศมีเพื่อเบลอเงา
      />
      <mesh
        receiveShadow
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <OrbitControls minDistance={1} maxDistance={2} />
      <Model
        objPath="/Model/Fox/LittleFox-1.obj"
        mtlPath="/Model/Fox/LittleFox-1.mtl"
      />
    </Canvas>
  );
}
