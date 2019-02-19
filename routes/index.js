var express = require('express');
var router = express.Router();

const renderList = {
    '': 'index',
    cam4: 'cam4',
    cam4Sphere: 'cam4Sphere',
    fractal: 'fractal',
    fractalByBuffer: 'fractalByBuffer',
    geoBuffer: 'geoBuffer',
    geoBufferPlane: 'geoBufferPlane'
};

for (let key in Object.keys(renderList)) {
    router.get(`/${key}`, function(req, res, next) {
        res.render(renderList[key], { title: 'Express' });
    });

}

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });
//
// router.get('/dataset', function(req,res){
//     res.json({hello:'world'});
// });
//
// router.get('/cam4', function(req, res, next) {
//     res.render('cam4');
// });
//
// router.get('/cam4Sphere', function(req, res, next) {
//     res.render('cam4Sphere');
// });
//
// router.get('/fractal', function(req, res, next) {
//     res.render('fractal');
// });
//
// router.get('/fractalByBuffer', function(req, res, next) {
//     res.render('fractalByBuffer');
// });
//
// router.get('/geoBuffer', function(req, res, next) {
//     res.render('geoBuffer');
// });
//
// router.get('/geoBufferPlane', function(req, res, next) {
//     res.render('geoBufferPlane');
// });

module.exports = router;
