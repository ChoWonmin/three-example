$('#next-btn').click(function() {
    location.href = '/geoBufferPlane';
});

const fractals = {'/fractal': new Fractal(), '/fractalByBuffer': new FractalByBuffer()};

const r = fractals[window.location.pathname];

const inputs = $('input');
const vals = $('.val');

for (let i = 0; i < inputs.length - 2; i++) {
    const input = inputs[i];
    const val = vals[i];

    val.innerHTML = input.value;

    $(input).change(() => {
        val.innerHTML = input.value;
    });

}

$(".gen-btn").click(function() {
    const inputs = $(".side input");

    const data = {};
    _.forEach(inputs, r => {
        data[r.name] = (isFinite(r.value))?r.value*1:r.value;
        $(`#${r.name}`).val(r.val);
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
    window.location = '/fractal';
});
