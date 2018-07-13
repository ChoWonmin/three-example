var r = new ThreeSphere();
r.init(document.getElementsByClassName("renderer")[0], new THREE.Vector3(0,0,100));
r.animate();

r = new ThreeSphere();
r.init(document.getElementsByClassName("renderer")[1], new THREE.Vector3(0,300,0));
r.animate();

r = new ThreeSphere();
r.init(document.getElementsByClassName("renderer")[2], new THREE.Vector3(300,0,0));
r.animate();

r = new ThreeSphere();
r.init(document.getElementsByClassName("renderer")[3], new THREE.Vector3(100,100,0));
r.animate();