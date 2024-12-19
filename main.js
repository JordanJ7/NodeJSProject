import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import './style.css';
import javascriptLogo from '../javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from '../counter.js';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Object Texture Mapping
const smileTexture = new THREE.TextureLoader().load('images/KevinCube.png');
const smileMaterial = new THREE.MeshBasicMaterial({ map: smileTexture });

// Cube 1
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cube1 = new THREE.Mesh(cubeGeometry, smileMaterial);
scene.add(cube1);
cube1.position.set(15, 0, 15);

// Cube 2
const cube2 = new THREE.Mesh(cubeGeometry, smileMaterial);
scene.add(cube2);
cube2.position.set(-15, 0, 15);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const smileSphere = new THREE.Mesh(sphereGeometry, smileMaterial);
scene.add(smileSphere);
smileSphere.position.set(0, 0, -15);

// Movement Variables
const objects = [
    { mesh: cube1, direction: new THREE.Vector3(1, 0, 0), speed: 0.1 },
    { mesh: cube2, direction: new THREE.Vector3(-1, 0, 0), speed: 0.1 },
    { mesh: smileSphere, direction: new THREE.Vector3(0, 0, 1), speed: 0.1 },
];

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, -10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Move objects
    objects.forEach(({ mesh, direction, speed }) => {
        mesh.position.addScaledVector(direction, speed);

        // Check boundaries and reverse direction
        if (mesh.position.x > 30 || mesh.position.x < -30) direction.x *= -1;
        if (mesh.position.y > 30 || mesh.position.y < -30) direction.y *= -1;
        if (mesh.position.z > 30 || mesh.position.z < -30) direction.z *= -1;
    });

    // Update OrbitControls if damping is enabled
    controls.update();

    renderer.render(scene, camera);
}
animate();

// Handle Window Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Background
const spaceTexture = new THREE.TextureLoader().load('images/peakpx.jpg');
scene.background = spaceTexture;

// HTML Content
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;
setupCounter(document.querySelector('#counter'));
