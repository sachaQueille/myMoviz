var express = require('express');
var router = express.Router();
var request = require("sync-request");

let movieModel = require('../models/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req,res, next) {
  let moviesByPopularity = request('GET','https://api.themoviedb.org/3/discover/movie?api_key=822e4d410201718dc46aae25f62115ed&language=fr&sort_by=popularity.desc')
  let moviesByPopularityAPI = JSON.parse(moviesByPopularity.body)
  console.log(moviesByPopularityAPI)
  res.json({result: true, movies:moviesByPopularityAPI.results})
});

router.post('/wishlist-movie', async (req, res, next) => {

  let newMovie = new movieModel ({
    title: req.body.title,
    img: req.body.img
  })
  let movieSaved = await newMovie.save();

  let result = false

  if(movieSaved.title){
    result = true
  }

  res.json({result});
});

router.delete('/wishlist-movie/:name', async (req, res, next) => {


   let returnDb = await movieModel.deleteOne({title: req.params.name})

   let result = false
   if(returnDb.deletedCount == 1){
     result = true
   }

  res.json({result});
});

router.get('/wishlist-movie', async (req, res, next) => {

  let movies = await movieModel.find();

  res.json(movies);
});

module.exports = router;
