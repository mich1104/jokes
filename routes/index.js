var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { userName: req.session.userName });
});
router.get('/api/addJoke', function(req,res,next){

    res.render('addJoke');
});
router.post('/api/storeJoke', function(req,res,next){

    jokes.addJoke(req.body.joke, function(req,res,next){

        res.render('addJoke');
    });

});
router.get('/api', function(req, res, next){

    res.render('index', {title: 'Users'});
});
router.get('/login', function(req, res, next){

    res.render('login');
});
router.get('/joke', function(req, res, next){

    var _joke;
    function getJoke(_joke, req, res, next, callback){

        _joke = jokes.getRandomJoke();
        callback(_joke, req, res, next);
    }

    getJoke(_joke, req, res, next, function(_joke, req, res, next){

        res.render('joke', {

            title: 'Jokes!!!!',
            joke: _joke
        });
    })
});
module.exports = router;
