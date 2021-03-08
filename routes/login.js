var express = require('express');
var router = express.Router();
const session = require("express-session")

const userLoginBL = require("../BL/loginBL")
const sessionBL = require("../BL/sessionBL")

/* login page */
router.get('/', function (req, res, next) {
  res.render("login", {});
});

/* GET user details. */
router.post('/', async function (req, res, next) {
  let obj = {
    username: req.body.username,
    password: req.body.pwd
  }
  if(obj.username == "" || obj.password == "")
  {
    res.redirect("/")
  }
  
  let authenticated = await userLoginBL.loginUser(obj)
  let sess = req.session
  if (!sess.authenticated) {
    if (authenticated) {
      sess.username = obj.username
      
      let data = 
      {
        authenticated: 'true',
        username : obj.username,
        num_of_tranactions : 0

      }
      let resp = await sessionBL.updatedSessionData(data)
      if (resp.num_of_tranactions >= 10) {
        res.redirect("/");

      }
      res.redirect("main");
    } else {
      res.render("login");
    }
  } else if (sess.authenticated == true) {
    if (sess.username != obj.username) {
      sess.username = obj.username
    }

    res.redirect("main");

  } else {
    res.render("login");

  }
});


router.get('/logout',async function (req, res, next) {

  let data = 
  {
    authenticated: 'false'
  }
  let resp = await sessionBL.updatedSessionData(data)
  res.redirect("/");
});



module.exports = router;
