const StarField = function() {

    let camera, scene, renderer;
    let geometry, material, mesh;
    const that = this;

    const stars = [];
    const starNum = 500;

    this.init = function( object ) {
        camera = new THREE.PerspectiveCamera(60, window.innerHeight/window.innerHeight, 0.01, 1000);
        camera.position.set(0, 0, 50);

        scene = new THREE.Scene();

        for (var i = 0; i < starNum; i++) {
            geometry = new THREE.SphereBufferGeometry(Math.random(), 16, 16);
            material = new THREE.MeshBasicMaterial({color:'#fefefe'});


            mesh = new THREE.Mesh(geometry, material);
            mesh.startingPosition = 10;
            mesh.position.set( (Math.random() - 0.5)*50 , (Math.random() - 0.5)*50, Math.random() * 45);

            scene.add(mesh);
            stars.push(mesh);
        }

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        object.target.appendChild( renderer.domElement);
    }

    this.animate = function() {
        requestAnimationFrame( that.animate );

        _.forEach(stars, star => {
            star.position.z = (star.position.z<45) ? (star.position.z+0.5):0;
        });

        renderer.render( scene, camera );
    }

}
