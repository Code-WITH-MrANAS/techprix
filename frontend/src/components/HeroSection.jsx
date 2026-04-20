import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls, Sphere, MeshDistortMaterial,
  Float, Torus, Box, Octahedron, MeshWobbleMaterial,
  Environment, Stars
} from '@react-three/drei';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';

/* ─── Cursor-reactive camera rig ─────────────────────── */
const CameraRig = ({ mouse }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ─── Central distorted sphere ───────────────────────── */
const MainOrb = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
      ref.current.rotation.z = clock.getElapsedTime() * 0.08;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.6, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#E0E7FF"
          emissive="#6366F1"
          emissiveIntensity={0.15}
          distort={0.35}
          speed={2}
          roughness={0}
          metalness={0.2}
          transparent
          opacity={0.92}
        />
      </Sphere>
    </Float>
  );
};

/* ─── Orbiting torus ring ────────────────────────────── */
const Ring = ({ radius, speed, color, tilt }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });
  return (
    <Torus ref={ref} args={[radius, 0.04, 16, 120]} rotation={[tilt, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </Torus>
  );
};

/* ─── Floating geometric shapes ─────────────────────── */
const FloatingShape = ({ position, color, speed, shape, scale = 1 }) => {
  const ref = useRef();
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + offset.current;
      ref.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
      ref.current.rotation.x = t * 0.3;
      ref.current.rotation.y = t * 0.5;
    }
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.3}
      roughness={0.05}
      metalness={0.8}
      transparent
      opacity={0.85}
    />
  );

  return (
    <group ref={ref} position={position} scale={scale}>
      {shape === 'box'  && <Box args={[0.4, 0.4, 0.4]}>{mat}</Box>}
      {shape === 'oct'  && <Octahedron args={[0.35]}>{mat}</Octahedron>}
      {shape === 'orb'  && <Sphere args={[0.25, 32, 32]}>{mat}</Sphere>}
    </group>
  );
};

/* ─── Particle field ─────────────────────────────────── */
const Particles = ({ count = 120 }) => {
  const mesh = useRef();
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  const palette = [
    new THREE.Color('#6366F1'),
    new THREE.Color('#38BDF8'),
    new THREE.Color('#A78BFA'),
    new THREE.Color('#CBD5E1'),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03;
      mesh.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
};

/* ─── Full 3D scene ──────────────────────────────────── */
const AntiGravityScene = ({ mouse }) => (
  <>
    <ambientLight intensity={0.9} color="#ffffff" />
    <directionalLight position={[5, 8, 5]}  intensity={1.8} color="#ffffff" />
    <directionalLight position={[-5, -4, -3]} intensity={0.6} color="#6366F1" />
    <pointLight position={[3, 3, 3]}   intensity={1.0} color="#38BDF8" />
    <pointLight position={[-3, -3, 3]} intensity={0.8} color="#A78BFA" />

    <CameraRig mouse={mouse} />
    <Particles count={150} />
    <MainOrb />

    <Ring radius={2.4} speed={0.4}  color="#6366F1" tilt={0.5} />
    <Ring radius={3.1} speed={-0.25} color="#38BDF8" tilt={1.2} />

    <FloatingShape position={[ 3.5,  1.5, -1]} color="#6366F1" speed={0.7} shape="box" />
    <FloatingShape position={[-3.8,  0.8, -2]} color="#38BDF8" speed={0.9} shape="oct" />
    <FloatingShape position={[ 2.8, -1.8,  0]} color="#A78BFA" speed={0.6} shape="orb" />
    <FloatingShape position={[-2.5,  2.2, -1]} color="#FDA4AF" speed={0.8} shape="oct" scale={0.8} />
    <FloatingShape position={[ 0.5, -2.5,  1]} color="#38BDF8" speed={1.0} shape="box" scale={0.6} />
    <FloatingShape position={[-1.0,  3.0, -3]} color="#CBD5E1" speed={0.5} shape="orb" scale={0.7} />

    <Stars radius={50} depth={40} count={600} factor={2} saturation={0.3} fade speed={1} />
    <Environment preset="city" />
  </>
);

/* ─── Typing badge ──────────────────────────────────── */
const Badge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1   }}
    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-dark border border-indigo-200/60 text-sm font-semibold text-primary shadow-md mb-8"
  >
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    Now accepting new projects for Q3 2025
  </motion.div>
);

/* ─── Hero Section ───────────────────────────────────── */
const HeroSection = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const springX = useMotionValue(0);
  const springY = useMotionValue(0);
  const sx = useSpring(springX, { stiffness: 60, damping: 20 });
  const sy = useSpring(springY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * -2;
      mouse.current = { x: nx, y: ny };
      springX.set(nx * 8);
      springY.set(ny * 8);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [springX, springY]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-main via-bg-secondary to-indigo-50/40 dark:to-indigo-950/20"
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full bg-sky-100/60 dark:bg-sky-900/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-100/40 dark:bg-violet-900/15 blur-2xl" />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <AntiGravityScene mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Parallax layer driven by cursor */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-24 left-16  w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-300 to-violet-300 opacity-30 float-slow  rotate-12 blur-sm" />
        <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-sky-300 opacity-30 float-medium blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 rounded-xl bg-violet-300 opacity-25 float-fast blur-sm" />
        <div className="absolute bottom-20 right-1/3 w-8  h-8  rounded-full bg-indigo-300 opacity-30 float-slow  blur-sm" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28">
        <Badge />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl xl:text-8xl font-black font-display tracking-tight text-text-main leading-[1.05] mb-6"
          >
            We Build{' '}
            <span className="gradient-text">Digital Gravity</span>
            <br />
            <span className="text-text-secondary font-light italic text-4xl md:text-5xl xl:text-6xl">
              that pulls people in.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10"
          >
            ProProgrammer is a premium digital agency crafting{' '}
            <strong className="text-text-secondary font-semibold">immersive 3D web experiences</strong>,
            strategic marketing, and conversion-focused design — for brands that
            want to <em>float above the rest</em>.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              id="hero-cta-primary"
              href="#projects"
              className="btn-primary px-9 py-4 text-base font-bold w-full sm:w-auto"
            >
              View Our Work →
            </a>
            <a
              id="hero-cta-secondary"
              href="#contact"
              className="btn-outline px-9 py-4 text-base font-semibold w-full sm:w-auto"
            >
              Start a Project
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={item}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6 text-sm text-text-muted"
          >
            <span>
              Trusted by{' '}
              <strong className="text-text-secondary font-semibold">5+ happy clients</strong>{' '}
              worldwide
            </span>
            <span className="hidden sm:block w-px h-5 bg-border-light" />
            <span>★★★★ 4.5 rated agency</span>
          </motion.div>
        </motion.div>
      </div>

     
    </section>
  );
};

export default HeroSection;
