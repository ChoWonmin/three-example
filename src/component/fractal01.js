const Frcatal = function() {
    var camera, scene, renderer;
    var geometry, material, mesh, stats;
    const that = this;

    const size = 5;
    const depth = 5;
    const offsetAngle = 45;
    const length = window.innerHeight / 90;

    this.init = function(target, cameramView) {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(cameramView.x, cameramView.y, cameramView.z);

        scene = new THREE.Scene();

        for (var i = 0; i < size; i++) {
            material = new THREE.LineBasicMaterial({ color: 0x0000ff });

            const angle = 360 * i / size;
            const position = new THREE.Vector3(Math.cos(angle * Math.PI / 180) * length,
                Math.sin(angle * Math.PI / 180) * length, 0);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
            geometry.vertices.push(position);

            mesh = new THREE.Line(geometry, material);
            scene.add(mesh);

            that.makeFractalLine(position, 5, angle);
        }

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth * 3 / 4, window.innerHeight);
        target.appendChild(renderer.domElement);

        new THREE.OrbitControls(camera, renderer.domElement);
    }

    this.makeFractalLine = function(startingPosition, depth, angle) {
        if (depth < 1)
            return null;

        geometry = new THREE.Geometry();

        let startAngle = -(2 - 1) * offsetAngle / 2 + angle*1;

        for (var i = 0; i < 2; i++) {
            geometry.vertices.push(startingPosition);
            angle += offsetAngle;

            let position = new THREE.Vector3(Math.cos(angle * Math.PI / 180) * length + startingPosition.x,
                Math.sin(angle * Math.PI / 180) * length + startingPosition.y, 0);
            geometry.vertices.push(position);
            mesh = new THREE.Line(geometry, material);
            scene.add(mesh);

            that.makeFractalLine(position, depth-1, startAngle);
            startAngle += offsetAngle;
        }

    }

    this.animate = function() {
        requestAnimationFrame(that.animate);
        renderer.render( scene, camera );
    }
}

var r = new Frcatal();
r.init(document.getElementsByClassName("renderer")[ 0 ], new THREE.Vector3(0, 0, 100));
r.animate();

// generate = (data) => {
//

// }
// drawLineByAngle(x1, y1, degree, length, color);
