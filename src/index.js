for (var i = 0; i < 2; i++) {
    var r = new ThreeRect();

    r.init(document.getElementsByClassName("renderer")[i]);
    r.animate();
}

var r = new ThreeSimpleCube();
r.init(document.getElementsByClassName("renderer")[2]);
r.animate();




var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.getElementsByClassName("renderer")[3].appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

var scene = new THREE.Scene();
var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
var line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );