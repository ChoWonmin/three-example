$('#next-btn').click(function() {
    location.href = '/fractal';
});

var r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[0], new THREE.Vector3(0,0,3));
r.animate();

r = new ThreeSphere();
r.init(document.getElementsByClassName("renderer")[1], new THREE.Vector3(0,0,200));
r.animate();

r = new StarField();
r.init({target:document.getElementsByClassName("renderer")[2]});
r.animate();

var r = new ThreeRect();
r.init(document.getElementsByClassName("renderer")[3], new THREE.Vector3(3,0,0));
r.animate();

// new function() {
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
//     document.getElementsByClassName("renderer")[3].appendChild( renderer.domElement );
//
//     var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
//     camera.position.set( 0, 0, 100 );
//     camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
//
//     var scene = new THREE.Scene();
//     var material = new THREE.LineBasicMaterial( { color: 0xffffaa } );
//
//     var geometry = new THREE.BufferGeometry();
// // create a simple square shape. We duplicate the top left and bottom right
// // vertices because each vertex needs to appear once per triangle.
//     var vertices = new Float32Array( [
//         0, 0, 0,
//         7, 0, 0,
//         0, 0, 0,
//
//         7, 0, 0,
//         10.232240292645239, 6.209075832247551, 0,
//         7, 0, 0,
//
//         10.232240292645239, 6.209075832247551, 0,
//         15.966304602668181, 10.224110886704874, 0,
//         10.232240292645239, 6.209075832247551, 0,
//
//         10.232240292645239, 6.209075832247551, 0,
//         10.232240292645239, 13.209075832247551, 0,
//         10.232240292645239, 6.209075832247551, 0,
//
//         7,0,0,
//         3.7677597073547635, 6.209075832247553, 0,
//         7,0,0,
//
//
//
//     ] );
// //    15.966304602668181, 10.224110886704874, 0, 10.232240292645239, 6.209075832247551, 0, 10.232240292645239, 13.209075832247551, 0, 10.232240292645239, 13.209075832247551, 0, 7, 0, 0, 3.7677597073547635, 6.209075832247553, 0, 3.7677597073547635, 6.209075832247553, 0, 3.7677597073547635, 6.209075832247553, 0, 3.767759707354764, 13.209075832247553, 0, 3.767759707354764, 13.209075832247553, 0, 3.7677597073547635, 6.209075832247553, 0, -1.9663046026681772, 10.224110886704878, 0, -1.9663046026681772, 10.224110886704878, 0]
//
// // itemSize = 3 because there are 3 values (components) per vertex
//     geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
//     var line = new THREE.Line( geometry, material );
//     scene.add( line );
//
//     renderer.render( scene, camera );
// }





