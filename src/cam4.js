var r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[0], new THREE.Vector3(0,0,3));
r.animate();

r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[1], new THREE.Vector3(0,3,0));
r.animate();

r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[2], new THREE.Vector3(3,0,0));
r.animate();

var r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[3], new THREE.Vector3(3,3,3));
r.animate();