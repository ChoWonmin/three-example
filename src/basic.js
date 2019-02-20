const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
const scene = new THREE.Scene();

const geometry = new THREE.CubeGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1000);

scene.add(mesh);

function animate() {
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.05;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
