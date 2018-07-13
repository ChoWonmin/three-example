const ThreeSphere = function() {
    var camera, scene, renderer;
    var geometry, material, mesh, stats;
    const that = this;

    const spheres = [];
    const scope = 10;
    const radius = 4;

    this.init = function (target, cameraView) {
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
        camera.position.set(cameraView.x, cameraView.y, cameraView.z);

        scene = new THREE.Scene();

        for (var x = -scope; x < scope; x++) {
            for (var z = -5; z < 5; z++) {
                geometry = new THREE.SphereBufferGeometry(radius, 8, 8);
                material = new THREE.MeshNormalMaterial();

                // mesh 에 geometry 와 material 넣어준다.
                mesh = new THREE.Mesh(geometry, material);
                //mesh['yDir'] = 1;
                mesh.position.x = 10 * x - scope;
                mesh.position.z = 10 * z - scope;
                mesh.position.y = z;

                scene.add(mesh);
                spheres.push(mesh);
            }
        }

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        target.appendChild( renderer.domElement );

        new THREE.OrbitControls(camera, renderer.domElement);

        stats = new Stats();
        target.appendChild(stats.dom);
    }

    var frame = 0;
    this.animate = function () {
        requestAnimationFrame( that.animate );

        frame ++;
        // mesh transform : position, scale, rotation
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].position.y = Math.cos(Math.floor(i / 10) * 0.1 + (i % 10) * 0.2 + frame * 0.1) * 60;
        }

        stats.update();
        renderer.render( scene, camera );
    }
}