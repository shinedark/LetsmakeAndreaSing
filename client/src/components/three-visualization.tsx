import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ThreeVisualizationProps {
  isRunning: boolean;
  onStop: () => void;
}

export function ThreeVisualization({ isRunning, onStop }: ThreeVisualizationProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement>();
  const [currentTrack, setCurrentTrack] = useState<string>('');

  // Audio tracks - you can add your own audio files to client/public/audio/
  const audioTracks = [
    '/audio/track1.mp3',
    '/audio/track2.mp3', 
    '/audio/track3.mp3',
    '/audio/track4.mp3',
    '/audio/track5.mp3'
  ];

  const playRandomTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const randomTrack = audioTracks[Math.floor(Math.random() * audioTracks.length)];
    setCurrentTrack(randomTrack);
    
    const audio = new Audio(randomTrack);
    audio.loop = true;
    audio.volume = 0.3; // Lower volume so it doesn't overpower
    audio.play().catch(console.error);
    audioRef.current = audio;
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = undefined;
    }
    setCurrentTrack('');
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create geometry pool
    const geometries = [
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.ConeGeometry(0.5, 1, 8),
      new THREE.CylinderGeometry(0.3, 0.3, 1, 16),
      new THREE.TorusGeometry(0.4, 0.2, 16, 32)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0x45b7d1, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0x96ceb4, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0xfeca57, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0xff9ff3, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0x54a0ff, transparent: true, opacity: 0.8 }),
      new THREE.MeshPhongMaterial({ color: 0x5f27cd, transparent: true, opacity: 0.8 })
    ];

    const objects: THREE.Mesh[] = [];
    const velocities: THREE.Vector3[] = [];

    // Create objects
    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.5;
      mesh.scale.setScalar(scale);
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      scene.add(mesh);
      objects.push(mesh);
      
      // Random velocity
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ));
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b6b, 1, 100);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
    pointLight2.position.set(10, 10, 10);
    scene.add(pointLight2);

    // Animation loop
    const animate = () => {
      if (!isRunning) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Rotate camera
      camera.position.x = Math.cos(Date.now() * 0.0005) * 8;
      camera.position.z = Math.sin(Date.now() * 0.0005) * 8;
      camera.lookAt(0, 0, 0);

      // Animate objects
      objects.forEach((obj, index) => {
        // Move object
        obj.position.add(velocities[index]);
        
        // Rotate object
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.rotation.z += 0.005;
        
        // Bounce off boundaries
        if (Math.abs(obj.position.x) > 10) velocities[index].x *= -1;
        if (Math.abs(obj.position.y) > 10) velocities[index].y *= -1;
        if (Math.abs(obj.position.z) > 10) velocities[index].z *= -1;
        
        // Pulsing scale
        const scale = 0.5 + Math.sin(Date.now() * 0.001 + index) * 0.3;
        obj.scale.setScalar(scale);
        
        // Color cycling
        if (obj.material instanceof THREE.MeshPhongMaterial) {
          const hue = (Date.now() * 0.001 + index * 0.1) % 1;
          obj.material.color.setHSL(hue, 0.8, 0.6);
        }
      });

      // Animate lights
      pointLight.position.x = Math.sin(Date.now() * 0.001) * 15;
      pointLight.position.z = Math.cos(Date.now() * 0.001) * 15;
      
      pointLight2.position.x = Math.sin(Date.now() * 0.001 + Math.PI) * 15;
      pointLight2.position.z = Math.cos(Date.now() * 0.001 + Math.PI) * 15;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());
    };
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      playRandomTrack();
    } else {
      stopAudio();
    }
  }, [isRunning]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '500px' }}
      />
      
      {/* Controls overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={onStop}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Stop Visualization
        </button>
        
        {currentTrack && (
          <div className="px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
            🎵 Playing: {currentTrack.split('/').pop()}
          </div>
        )}
      </div>
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
        <div>Objects: 50</div>
        <div>Shapes: Spheres, Cubes, Cones, Cylinders, Torus</div>
        <div>Audio: Random track selection</div>
      </div>
    </div>
  );
}
