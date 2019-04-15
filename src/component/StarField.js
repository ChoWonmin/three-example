const StarField = function() {

    let camera, scene, renderer;
    let geometry, material, mesh;
    const that = this;

    const stars = [];
    const starNum = 500;

    let analyser;
    let dataArray;

    this.init = function( object ) {
        that.audioInit();

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

    this.audioInit = function() {
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

    }

    this.animate = function() {
        requestAnimationFrame( that.animate );

        //analyser.getByteTimeDomainData(dataArray);

        _.forEach(stars, star => {

            if (star.position.z > 45) {
                star.position.set((Math.random() - 0.5)*50 , (Math.random() - 0.5)*50, 0)
            } else {
                star.position.z += 0.5;
            }

        });

        renderer.render( scene, camera );
    }

}

