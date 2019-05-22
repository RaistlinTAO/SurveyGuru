var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1qaz2wsx",
    database: "survey"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

router.get('/survey', function (req, res, next) {
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('timeline', {serveries: result});
    });
});

router.get('/orders', function (req, res, next) {
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('orders', {serveries: result});
    });
});

module.exports = router;
