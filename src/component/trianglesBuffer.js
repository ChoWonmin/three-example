if (!Detector.webgl) Detector.addGetWebGLMessage();
var container, stats;
var camera, scene, renderer;
var raycaster, mouse;
var mesh, line;

var geometry;
var positions;


init();
animate();

function init() {
    container = document.getElementById('container');
    //
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 1750;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    //scene.fog = new THREE.Fog(0x050505, 2000, 3500); // 선형 보관 , 카메라와의 거리 , 구 형태
    
    /*
    * Light
    * Direction : 태양
    * Spot light : 깔대
    * Point Light : 초
    * Ambient Light(환경광) : 공기 등에 반사, 물체 자체에 색을 입힌다. 시작점이 없다 
    * 
    * */ 
    
    
    scene.add(new THREE.AmbientLight(0xffffff));
    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);
    //
    var triangles = 100;

    geometry = new THREE.BufferGeometry();
    positions = new Float32Array(triangles * 3 * 3);
    //var normals = new Float32Array(triangles * 3 * 3);
    var colors = new Float32Array(triangles * 3 * 3);
    //var color = new THREE.Color();
    var n = 800, n2 = n / 2;	// triangles spread in the cube
    var d = 120, d2 = d / 2;	// individual triangle size
    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();
    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();
    for (var i = 0; i < positions.length; i += 9) {
        // positions
        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;
        var ax = x + Math.random() * d - d2;
        var ay = y + Math.random() * d - d2;
        var az = z + Math.random() * d - d2;
        var bx = x + Math.random() * d - d2;
        var by = y + Math.random() * d - d2;
        var bz = z + Math.random() * d - d2;
        var cx = x + Math.random() * d - d2;
        var cy = y + Math.random() * d - d2;
        var cz = z + Math.random() * d - d2;
        positions[ i ] = ax;
        positions[ i + 1 ] = ay;
        positions[ i + 2 ] = az;

        positions[ i + 3 ] = bx;
        positions[ i + 4 ] = by;
        positions[ i + 5 ] = bz;
        positions[ i + 6 ] = cx;
        positions[ i + 7 ] = cy;
        positions[ i + 8 ] = cz;
        // flat face normals
        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);
        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);
        cb.normalize();
        var nx = cb.x;
        var ny = cb.y;
        var nz = cb.z;
        // normals[ i ] = nx;
        // normals[ i + 1 ] = ny;
        // normals[ i + 2 ] = nz;
        // normals[ i + 3 ] = nx;
        // normals[ i + 4 ] = ny;
        // normals[ i + 5 ] = nz;
        // normals[ i + 6 ] = nx;
        // normals[ i + 7 ] = ny;
        // normals[ i + 8 ] = nz;
        // colors
        var vx = (x / n) + 0.5;
        var vy = (y / n) + 0.5;
        var vz = (z / n) + 0.5;

        // color.setRGB(vx, vy, vz);
        // colors[ i ] = color.r;
        // colors[ i + 1 ] = color.g;
        // colors[ i + 2 ] = color.b;
        // colors[ i + 3 ] = color.r;
        // colors[ i + 4 ] = color.g;
        // colors[ i + 5 ] = color.b;
        // colors[ i + 6 ] = color.r;
        // colors[ i + 7 ] = color.g;
        // colors[ i + 8 ] = color.b;
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    //geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    //geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    var material = new THREE.MeshBasicMaterial({color: 0xff00ff})
    // var material = new THREE.MeshPhongMaterial({
    //     color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
    //     side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    // });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //
    // raycaster = new THREE.Raycaster();
    // mouse = new THREE.Vector2();
    // var geometry = new THREE.BufferGeometry();
    // geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    // var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2, transparent: true });
    // line = new THREE.Line(geometry, material);
    // scene.add(line);
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //
    stats = new Stats();
    container.appendChild(stats.dom);
    //
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    positions[0]++;
    positions[1]++;
    positions[2]++;
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    // geometry.computeBoundingBox();

    renderer.render(scene, camera);
}
