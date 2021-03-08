var express = require('express');
var router = express.Router();
const session = require("express-session")
const moviesData = require("../DALS/moviesDAL")
const updateMovie = require("../BL/moviesBL")
const sessionBL = require("../BL/sessionBL")

/* GET users listing. */


//main page router
router.get('/', async function (req, res, next) {

  let data = await sessionBL.checkSessionData()
  console.log(data.authenticated)
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  let arr = []

  let resp = moviesData.getMovies()
  res.render("main", { username: data.username });
});


// search movie router
router.get('/searchmovie', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }

  if (data.num_of_tranactions >= 10) {
    res.redirect("/");
  }
  let resp = await updateMovie.getmovieData()
  res.render("searchmovie", { data: resp });
});

// search movie POST
router.post('/searchmovie', async function (req, res, next) {
  let sess = req.session
  let data = await sessionBL.checkSessionData()

  let SearchMovieObj = {
    movieTitle: req.body.movieTitle,
    movieLanguage: req.body.movielanguage,
    movieGenre: req.body.moviegenere
  }

  try {
    if (SearchMovieObj.movieTitle == "" && SearchMovieObj.movieLanguage == "" && SearchMovieObj.movieGenre == null) {
      res.redirect("/main/searchmovie");

    } else {

      if (data.username == "admin") {
        data.num_of_tranactions = 0

      } else {
        data.num_of_tranactions += 1
        if (data.num_of_tranactions >= 10) {
          res.redirect("/");
        }
      }
      let resp = await updateMovie.getmovieDataFromSearch(SearchMovieObj)

      let sendNewSession = await sessionBL.updatedSessionData(data)



      sess.SearchResults = resp
      sess.movieNameFromSearch = SearchMovieObj
      let DATA = await moviesData.SaveMovieInSession(sess.movieNameFromSearch)   

      res.redirect("/main/SearchResults")

    }
  } catch (err) {
    console.log("err" + err)


  }

});

//Search Results Router
router.get('/SearchResults', async function (req, res, next) {
  let sess = req.session
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }

  if (data.num_of_tranactions >= 10) {
    res.redirect("/");
  }
  let mfs = await moviesData.ReadSaveMovieInSession()

  let resp = await updateMovie.getAnotherMovies(sess.movieNameFromSearch)
  
  let movie = []
  resp.map(x => {
    if (x.name == mfs.movieTitle) {
      movie.push(x)
    }
    return resp
  })
  let arr = []
  resp.forEach(x => {
    if (x.name != mfs.movieTitle) {
      arr.push(x)

    }
  })



  let sendNewSession = await sessionBL.updatedSessionData(data)

  res.render("SearchResults", {
    movies: arr,
    data: movie
  })
})

// create movie Router

router.get('/createmoviemenu', async function (req, res, next) {

  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  res.render("createmoviemenu", {});
});
router.post('/createmoviemenu', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()

  if (data.username == "admin") {
    data.num_of_tranactions = 0

  } else {
    data.num_of_tranactions += 1
    if (data.num_of_tranactions >= 10) {
      res.redirect("/");
    }
  }

  let sendNewSession = await sessionBL.updatedSessionData(data)


  if (data.num_of_tranactions >= 10) {
    res.redirect("/");
  }
  let arr = []
  arr.push(req.body.genres)
  let obj = {
    id: "",
    name: req.body.moviename,
    language: req.body.language,
    genres: arr,
    image:
    {
      medium: req.body.image
    }
  }
  try {
    if (obj.title != "" && obj.language != "" && obj.genres != null) {
      let result = await updateMovie.setNewMovies(obj)

      res.redirect("/main");

    } else {
      res.redirect("createmoviemenu");

    }
  } catch (err) {
    console.log("err" + err)
    res.render("createmoviemenu", {});


  }

});


//User Managmet

router.get('/usersmgmt', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.username != "admin") {
    res.redirect("/main");
  }

  res.redirect("/users");
});
module.exports = router;
