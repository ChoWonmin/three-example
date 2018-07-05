const ThreeSphere = function() {

    const that = this;
    let scene, camera, renderer;
    let cube, geometry, material;

    this.init =  function(target) {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        target.appendChild( renderer.domElement );

        geometry = new THREE.BoxGeometry( 1, 1, 1 );
        material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;
    }

    this.animate = function () {
        requestAnimationFrame( that.animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

}