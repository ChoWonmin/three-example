class geoBufferPlane {

    constructor() {
        this.width = 200;
        this.height = 200;

        this.frame = 0;

        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.width * this.height * 2 * 3 * 3);

        let ind = 0;
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                let x1, y1, z1;
                let x2, y2, z2;
                let x3, y3, z3;

                z1 = 0, z2 = 0, z3 = 0;

                x1 = i - this.width / 2;
                x2 = i + 1 - this.width / 2;
                x3 = i - this.width / 2;
                y1 = j - this.height / 2;
                y2 = j - this.height / 2;
                y3 = j + 1 - this.height / 2;

                this.positions[ ind ] = x1;
                this.positions[ ind + 1 ] = y1;
                this.positions[ ind + 2 ] = z1;
                this.positions[ ind + 3 ] = x2;
                this.positions[ ind + 4 ] = y2;
                this.positions[ ind + 5 ] = z2;
                this.positions[ ind + 6 ] = x3;
                this.positions[ ind + 7 ] = y3;
                this.positions[ ind + 8 ] = z3;

                x1 = i + 1 - this.width / 2;
                x2 = i + 1 - this.width / 2;
                x3 = i - this.width / 2;
                y1 = j - this.height / 2;
                y2 = j + 1 - this.height / 2;
                y3 = j + 1 - this.height / 2;

                this.positions[ ind + 9 ] = x1;
                this.positions[ ind + 10 ] = y1;
                this.positions[ ind + 11 ] = z1;
                this.positions[ ind + 12 ] = x2;
                this.positions[ ind + 13 ] = y2;
                this.positions[ ind + 14 ] = z2;
                this.positions[ ind + 15 ] = x3;
                this.positions[ ind + 16 ] = y3;
                this.positions[ ind + 17 ] = z3;

                ind += 18;
            }
        }

        this.container = document.getElementById('container');

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.z = 200;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.scene.add(new THREE.AmbientLight(0x000000));

        var light = [];
        light.push(new THREE.PointLight(0xffffff, 1, 0));
        light.push(new THREE.PointLight(0xffffff, 1, 0));
        light.push(new THREE.PointLight(0xffffff, 1, 0));

        light[0].position.set(0, 200, 0);
        light[1].position.set(100, 200, 100);
        light[2].position.set(-100, -200, -100);
        this.scene.add(light[0]);
        this.scene.add(light[1]);
        this.scene.add(light[2]);

        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.computeBoundingBox();
        var material = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });

        //var material = new THREE.MeshPhongMaterial({ambient: 0xC0C0C0, color: 0xC0C0C0, specular: 0x555555, shininess: 100, side: THREE.DoubleSide});
        const mesh = new THREE.Mesh(this.geometry, material);
        this.scene.add(mesh);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    render() {
        this.frame++;
        const diff = 0.05;
        const speed = 0.1;
        const offset = this.height * 18;
        const inteval = 20;

        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height * 18; j+=18) {
                this.positions[ j+i*offset + 2 ] = Math.sin(i * diff + this.frame * speed) * inteval;
                this.positions[ j+i*offset + 5 ] = Math.sin((i + 1) * diff + this.frame * speed) * inteval;
                this.positions[ j+i*offset + 8 ] = Math.sin(i * diff + this.frame * speed) * inteval;

                this.positions[ j+i*offset + 11 ] = Math.sin((i + 1) * diff + this.frame * speed) * inteval;
                this.positions[ j+i*offset + 14 ] = Math.sin((i + 1) * diff + this.frame * speed) * inteval;
                this.positions[ j+i*offset + 17 ] = Math.sin(i * diff + this.frame * speed) * inteval;
            }
        }

        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        //this.geometry.computeBoundingBox();
        this.renderer.render(this.scene, this.camera);
    }

};

const r = new geoBufferPlane();

(function a() {
    requestAnimationFrame(a);
    r.render();
})();