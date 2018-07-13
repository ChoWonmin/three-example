const r = new Frcatal();

$(".gen-btn").click(function() {
    const inputs = $(".side input");

    const data = {};
    _.forEach(inputs, r => {
        data[r.name] = (isFinite(r.value))?r.value*1:r.value;
    });

    const parameter = {
        target: document.getElementsByClassName("renderer")[ 0 ],
        cameraView: new THREE.Vector3(0, 0, 100),
        data,
    };

   r.init(parameter);
   r.animate();
});

$(".delete-btn").click(function() {
    r.delete();
});
