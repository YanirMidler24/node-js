var express = require('express');
var router = express.Router();
const updateMovie = require("../BL/moviesBL")
const sessionBL = require("../BL/sessionBL")
const moviesData = require("../DALS/moviesDAL")

/* GET home page. */

// movie data page
router.get('/:name',async function(req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  if (data.num_of_tranactions >= 10) {
    res.redirect("/");
  }
  if (data.username == "admin") {
    data.num_of_tranactions = 0

  } else {
    data.num_of_tranactions += 1
    if (data.num_of_tranactions >= 10) {
      res.redirect("/");
    }
  }

    let name = req.params.name
    let resp = await updateMovie.getMoviesFromAPIBL(name)
    let sendNewSession = await sessionBL.updatedSessionData(data)

  res.render('moviedata', { data : resp });
});

module.exports = router;
