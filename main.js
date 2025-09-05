import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Models
const loader = new GLTFLoader();
const spaceship = new THREE.Group();
scene.add(spaceship);

const parts = {};

const modelsToLoad = [
    { name: 'hull', path: 'assets/models/hull.glb' },
    { name: 'cockpit', path: 'assets/models/cockpit.glb' },
    { name: 'wing_left', path: 'assets/models/wing_left.glb' },
    { name: 'wing_right', path: 'assets/models/wing_right.glb' },
    { name: 'booster', path: 'assets/models/booster.glb' },
    { name: 'bolt', path: 'assets/models/bolt.glb' }
];

let modelsLoaded = 0;
modelsToLoad.forEach(modelInfo => {
    loader.load(modelInfo.path, (gltf) => {
        const part = gltf.scene;
        spaceship.add(part);
        parts[modelInfo.name] = part;
        modelsLoaded++;

        if (modelsLoaded === modelsToLoad.length) {
            setupAnimation();
        }
    });
});

function setupAnimation() {
    console.log('All models loaded, setting up animation.', parts);

    // Set initial positions
    gsap.set(parts.hull.position, { y: 20 });
    gsap.set(parts.cockpit.position, { z: 20 });
    gsap.set(parts.wing_left.position, { x: -20 });
    gsap.set(parts.wing_right.position, { x: 20 });
    gsap.set(parts.booster.position, { y: -20 });
    gsap.set(parts.bolt.position, { x: 10, y: 10, z: 10});

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".content",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    // Scene 1: Hull arrives
    tl.to(parts.hull.position, { y: 0, duration: 2 }, "scene1");
    tl.to(camera.position, { z: 15, duration: 2 }, "scene1");

    // Scene 2: Wings and Cockpit
    tl.to(parts.wing_left.position, { x: 0, duration: 2 }, "scene2");
    tl.to(parts.wing_right.position, { x: 0, duration: 2 }, "scene2");
    tl.to(parts.cockpit.position, { z: 0, duration: 2 }, "scene2");
    tl.to(camera.rotation, { y: Math.PI / 4, duration: 2 }, "scene2");

    // Bolt animation
    tl.to(parts.bolt.position, { x: 1, y: 1, z: 1, duration: 1 }, "scene2");
    tl.to(parts.bolt.rotation, { y: Math.PI * 4, duration: 2 }, "scene2");


    // Scene 3: Booster
    tl.to(parts.booster.position, { y: 0, duration: 2 }, "scene3");
    tl.to(camera.position, { z: 20, y: 5, duration: 2 }, "scene3");
    tl.to(camera.rotation, { x: -Math.PI / 8, y: 0, duration: 2 }, "scene3");

    // Scene 4: Full assembly and rotation
    tl.to(spaceship.rotation, { y: Math.PI * 2, duration: 3 }, "scene4");
    tl.to(parts.bolt.position, { x: 0.8, y: 0.5, z: 0.8, duration: 1 }, "scene4");


    // Scene 5: Launch
    tl.to(spaceship.position, { y: -50, z: -50, duration: 3 }, "scene5");
    tl.to(spaceship.rotation, { x: Math.PI / 4, duration: 3 }, "scene5");
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
