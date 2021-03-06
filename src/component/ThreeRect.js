const ThreeRect = function() {
    var camera, scene, renderer;
    var geometry, material, mesh, stats;
    const that = this;

    const rect = [];
    var size = 10;

    this.init = function (target, cameramView) {
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.set(cameramView.x, cameramView.y, cameramView.z);

        scene = new THREE.Scene();

        for (var i = 0; i < size; i++){
            geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            material = new THREE.MeshNormalMaterial();

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            rect.push(mesh);
        }

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        target.appendChild( renderer.domElement );

        new THREE.OrbitControls(camera, renderer.domElement);

        stats = new Stats();
        target.appendChild(stats.dom);
    }

    this.createTexture = function (text) {
        var loader = new THREE.FontLoader();

        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            var geometry = new THREE.TextGeometry( 'Hello three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );
        } );
    }

    var radius = 0;
    var flag = 0;
    var acc = 0;

    this.animate = function () {
        requestAnimationFrame( that.animate );

        if (radius > 0.8)
            flag = 1;
        else if (radius < 0.2)
            flag = 0;

        if (flag == 0)
            radius += 0.002;
        else
            radius -= 0.002;

        for (var i = 0; i < size; i++) {
            var angle = 360 / size * i;


            rect[ i ].position.x = radius * Math.cos(angle * Math.PI / 180);
            rect[ i ].position.y = radius * Math.sin(angle * Math.PI / 180);

            if (radius > 0.3 && radius <0.7) {
                if (flag == 0)
                    acc += 0.2;
                else
                    acc -= 0.2;

                angle += acc;
                rect[ i ].position.x = radius * Math.cos(angle * Math.PI / 180);
                rect[ i ].position.y = radius * Math.sin(angle * Math.PI / 180);
            }

            rect[i].rotation.x += 0.1;
            rect[i].rotation.y += 0.1;
        }

        stats.update();
        renderer.render( scene, camera );
    }
}

const ThreeSimpleCube = function() {

    const that = this;
    let scene, camera, renderer;
    let cube, geometry, material;

    this.init =  function(target) {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        target.appendChild( renderer.domElement );

        geometry = new THREE.BoxGeometry( 1, 1, 1 );
        material = new THREE.MeshNormalMaterial();
        cube = new THREE.Mesh( geometry, material );

        var material = new THREE.LineBasicMaterial( { color: 0xffffaa } );
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );

        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        var line = new THREE.Line( geometry, material );

        scene.add( cube );
        scene.add( line );

        camera.position.z = 5;
    }

    this.animate = function () {
        requestAnimationFrame( that.animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

}

