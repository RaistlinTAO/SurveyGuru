var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1qaz2wsx",
    database: "survey"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('survey', {serveries : result});
    });

});


router.get('/show', function(req, res, next) {
    var sql = "SELECT * FROM survey WHERE surveyID = " + req.query.surveyID;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('show',{survey:result});
    });

});

router.post('/create', function(req, res, next) {
    var sql = "INSERT INTO survey (surveyTitle, surveyCategory, surveyAgeGroup,surveyIncomeGroup,surveyEduGroup,surveyStatus) VALUES ('" + req.body.title +
        "', '" + req.body.category + "', '" + req.body.agegroup + "', '" + req.body.incomegroup + "', '" + req.body.edugroup + "', 0)";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
   res.redirect('/survey')
});

router.post('/addQuestion', function(req, res, next) {

    res.redirect('/survey')
});

router.get('/manage', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/result', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
