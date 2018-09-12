var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dataset', function(req,res){
    res.json({hello:'world'});
});

router.get('/cam4', function(req, res, next) {
    res.render('cam4');
});

router.get('/cam4Sphere', function(req, res, next) {
    res.render('cam4Sphere');
});

router.get('/fractal', function(req, res, next) {
    res.render('fractal');
});

router.get('/fractalByBuffer', function(req, res, next) {
    res.render('fractalByBuffer');
});

router.get('/geoBuffer', function(req, res, next) {
    res.render('geoBuffer');
});

router.get('/geoBufferPlane', function(req, res, next) {
    res.render('geoBufferPlane');
});

module.exports = router;
