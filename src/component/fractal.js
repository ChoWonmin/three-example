const Fractal = function() {
    var camera, scene, renderer;
    var geometry, material, mesh, stats;
    const that = this;

    const length = 7;
    let data;
    let target;

    this.init = function(parameter) {
        target = parameter.target;
        data = parameter.data;

        const cameraView = parameter.cameraView;

        that.generateColor(0.5);

        camera = new THREE.PerspectiveCamera(60, target.clientWidth / target.clientHeight, 1, 500);
        camera.position.set(cameraView.x, cameraView.y, cameraView.z);

        scene = new THREE.Scene();

        that.generate();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(target.clientWidth, target.clientHeight);
        target.appendChild(renderer.domElement);

        new THREE.OrbitControls(camera, renderer.domElement);
    }

    this.generate = function() {
        const degree = 360 / data.startingBranchNum;

        for (var i = 0; i < data.startingBranchNum; i++) {
            material = new THREE.LineBasicMaterial({ color: data.startColor });
            material.transparent = true;
            material.blending = THREE[ "AdditiveBlending" ];
            geometry = new THREE.Geometry();

            const point = new THREE.Vector3(Math.cos(degree * i * Math.PI / 180) * length, Math.sin(degree * i * Math.PI / 180) * length, 0);
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
            geometry.vertices.push(point);

            mesh = new THREE.Line(geometry, material);
            scene.add(mesh);

            that.drawFractalLine(point, 1, degree * i, 7, that.generateColor(0));
        }

    }

    this.drawFractalLine = function(startingPosition, depth, degree, length, color) {
        if (depth > data.depth)
            return null;

        let startAngle = -(data.branchNum - 1) * data.branchAngle / 2 + degree * 1;
        for (var i = 0; i < data.branchNum; i++) {
            geometry = new THREE.Geometry();
            geometry.vertices.push(startingPosition);

            let position = new THREE.Vector3(Math.cos(startAngle * Math.PI / 180) * length + startingPosition.x,
                Math.sin(startAngle * Math.PI / 180) * length + startingPosition.y, 0);
            geometry.vertices.push(position);

            material = new THREE.LineBasicMaterial({ color: color });
            material.opacity = 1 - Math.pow((depth) / (data.depth),2);
            material.transparent = true;
            material.blending = THREE[ "AdditiveBlending" ];
            mesh = new THREE.Line(geometry, material);
            scene.add(mesh);

            that.drawFractalLine(position, depth + 1, startAngle, 7 * Math.pow(data.length, depth), that.generateColor((depth) / (data.depth)));
            startAngle += data.branchAngle;
        }

    }

    this.generateColor = function(ratio) {
        const r1 = parseInt(data.startColor.substring(1, 3), 16);
        const g1 = parseInt(data.startColor.substring(3, 5), 16);
        const b1 = parseInt(data.startColor.substring(5, 7), 16);

        const r2 = parseInt(data.endColor.substring(1, 3), 16);
        const g2 = parseInt(data.endColor.substring(3, 5), 16);
        const b2 = parseInt(data.endColor.substring(5, 7), 16);

        let r = (Math.floor(r1 * (1 - ratio) + r2 * ratio)).toString(16);
        let g = (Math.floor(g1 * (1 - ratio) + g2 * ratio)).toString(16);
        let b = (Math.floor(b1 * (1 - ratio) + b2 * ratio)).toString(16);

        r = (r.length == 1) ? '0' + r : r;
        g = (g.length == 1) ? '0' + g : g;
        b = (b.length == 1) ? '0' + b : b;

        return '#' + r + g + b;

    }

    this.delete = function() {
        target.innerHTML = '';
        camera, scene, renderer, geometry, material, mesh, stats = null;
    };

    this.animate = function() {
        requestAnimationFrame(that.animate);
        renderer.render(scene, camera);
    };

}
