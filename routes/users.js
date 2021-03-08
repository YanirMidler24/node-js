var express = require('express');
var router = express.Router();
const usersBL = require("../BL/usersBL")
const sessionBL = require("../BL/sessionBL")
const session = require("express-session")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  if(data.username != "admin")
  {
    res.redirect("/main");
  }
  let resp = await usersBL.GetUsersList()
  res.render('usersmgmt', { users: resp.users });
});

router.get('/addnewuser', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  if(data.username != "admin")
  {
    res.redirect("/main");
  }

  res.render('addnewuser', {});
});


router.get('/updateuser', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  if(data.username != "admin")
  {
    res.redirect("/main");
  }

  let sess = req.session



  res.render('updateuser', { username: sess.userToUpdate });
});


router.post('/updateUserPost', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()
  if (data.authenticated == "false") {
    res.redirect("/")
  }
  let sess = req.session
  sess.userToUpdate = req.body.updateUserName
  res.redirect('/users/updateuser');
});

router.post('/updateUserPostinData', async function (req, res, next) {
  console.log(req.body.NewUserPassword)
  let sess = req.session
  let resp = await usersBL.GetUsersList()
  let arr = [...resp.users]
  let newuserList = arr.map(x => {
    if (x.username == sess.userToUpdate) {
      x.username = req.body.NewUsername
      x.password = req.body.NewUserPassword
    }
    return x
  })
  let json = {}
  json.users = newuserList
  let result = await usersBL.updateUser(json)
  res.redirect('/users');
});


router.post('/deleteuser', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()

  

  let resp = await usersBL.GetUsersList()
  let arr = [...resp.users]
  arr.map(x => {
    if (x.username == req.body.DelUsername) {
      arr.pop(x)
    }
    return x
  })
  let json = {}
  json.users = arr
  let result = await usersBL.deleteUser(json)
  res.redirect('/users');
});


router.post('/addnewuserPost', async function (req, res, next) {
  let data = await sessionBL.checkSessionData()

  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  let time = cDay + "/" + cMonth + "/" + cYear
  let newUser =
  {
    username: req.body.NewUsername,
    password: req.body.NewUserPassword,
    created_date: time
  }
  let resp = await usersBL.GetUsersList()
  let arr = [...resp.users, newUser]
  let json = {}
  json.users = arr
  let result = await usersBL.addnewUser(json)
  res.redirect("/main/usersmgmt");
});


module.exports = router;
