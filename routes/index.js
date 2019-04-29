var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/backend', function(req, res, next) {
  res.render('backend');
});

router.get('/whatever', function(req, res, next) {
  res.render('whatever');
});


router.post('/login', function(req, res, next) {
  let accountName = "";
  let accountPassword = "";
  if (req.body.account) {
    accountName = req.body.account;
    accountPassword = req.body.password;
    //next();
    if (accountName === "company" && accountPassword === "company")
    {
      res.redirect('backend');
    }
    if(accountName === "test" && accountPassword === "test")
    {
      res.redirect('whatever');
    }

  }
  res.render('index');
});

module.exports = router;
