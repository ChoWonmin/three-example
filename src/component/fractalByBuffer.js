const FractalByBuffer = function() {
    let camera, scene, renderer;
    let geometry, material, mesh;
    const that = this;
    this.length = 7;

    let verticeBuffer = [];
    let depthBuffer = [];
    const colorBuffer = [];

    const defaultLength = 7;
    let data;
    let target;

    this.init = function(parameter) {
        target = parameter.target;
        data = parameter.data;

        console.log(data);

        const cameraView = parameter.cameraView;

        camera = new THREE.PerspectiveCamera(60, parameter.target.clientWidth / parameter.target.clientHeight, 1, 500);
        camera.position.set(cameraView.x, cameraView.y, cameraView.z);

        scene = new THREE.Scene();

        geometry = new THREE.BufferGeometry();
        that.generate();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(parameter.target.clientWidth, parameter.target.clientHeight);
        parameter.target.appendChild(renderer.domElement);

        const vertices = new Float32Array(verticeBuffer);
        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        material.transparent = true;
        material.blending = THREE[ "AdditiveBlending" ];
        mesh = new THREE.Line( geometry, material );
        scene.add( mesh );

        console.log(verticeBuffer)

        //new THREE.OrbitControls(camera, renderer.domElement);

    };

    this.generate = function() {
        const degree = 360 / data.startingBranchNum;

        for (var i = 0; i < 1; i++) {
            const position = {
                x: Math.cos(degree * i * Math.PI / 180) * defaultLength,
                y: Math.sin(degree * i * Math.PI / 180) * defaultLength,
                z: 0.0
            };

            that.insertVertice({x:0.0, y:0.0, z:0.0}, position);
            depthBuffer.push(0);
            that.generateFractalLine(position, 1, degree, defaultLength);
        }

    }

    this.generateFractalLine = function(startingPosition, depth, degree, length) {
        if (depth > data.depth)
            return null;

        let startAngle = -(data.branchNum - 1) * data.branchAngle / 2 + degree * 1;

        for (var i = 0; i < data.branchNum; i++) {
            const position = {
                x: Math.cos(startAngle * Math.PI / 180) * length + startingPosition.x,
                y: Math.sin(startAngle * Math.PI / 180) * length + startingPosition.y,
                z: 0.0,
            };
            that.insertVertice(startingPosition, position);
            depthBuffer.push(depth);

            that.generateFractalLine(position, depth + 1, startAngle, 7 * Math.pow(data.length, depth));
            startAngle += data.branchAngle;
        }

    }

    this.insertVertice = function(source, dest) {
        verticeBuffer.push(source.x, source.y, source.z);
        verticeBuffer.push(dest.x, dest.y, dest.z);
        verticeBuffer.push(source.x, source.y, source.z);
    }

    this.delete = function() {
        target.innerHTML = '';
        camera, scene, renderer, geometry, material, mesh = null;
        verticeBuffer = [];
    };

    this.animate = function() {
        requestAnimationFrame(that.animate);
        renderer.render(scene, camera);
    };

}