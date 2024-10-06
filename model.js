import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function loadModel(canvas) {
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(clamp(300, innerWidth/2, 500), clamp(300, innerWidth/2, 500), true);

// scene.background = new THREE.TextureLoader().load('/assets/stars.webp');
scene.background = 0x000000;
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(0, 0, 1);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
light2.position.set(0, 0, -1);
scene.add(light2);

const camera = new THREE.PerspectiveCamera(15, 1, 1, 100);
camera.position.set(4, -1, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;
controls.enableZoom = false;

const loader = new GLTFLoader();
loader.load('/assets/model.glb', function (gltf) {

  const model = gltf.scene;
  model.position.set(0.1, 0.1, 0);
  model.scale.set(0.1, 0.1, 0.1);
  scene.add(model);
  renderer.render(scene, camera);

}, undefined, function (e) {
  console.error(e);
});

window.onresize = function () {
  camera.aspect = 1;
  camera.updateProjectionMatrix();
  renderer.setSize(clamp(300, innerWidth/2, 500), clamp(300, innerWidth/2, 500), true);
};


function animate() {
  controls.update();
  scene.rotation.y += 0.001;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
}

export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}