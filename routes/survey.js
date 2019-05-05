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

/* GET users listing. */
router.get('/', function (req, res, next) {
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('survey', {serveries: result});
    });

});


router.get('/show', function (req, res, next) {
    var sql = "SELECT * FROM survey WHERE surveyID = " + req.query.surveyID;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('show', {survey: result});
    });

});

router.post('/create', function (req, res, next) {
    var sql = "INSERT INTO survey (surveyTitle, surveyCategory, surveyAgeGroup,surveyIncomeGroup,surveyEduGroup,surveyStatus) VALUES ('" + req.body.title +
        "', '" + req.body.category + "', '" + req.body.agegroup + "', '" + req.body.incomegroup + "', '" + req.body.edugroup + "', 0)";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect('/survey')
});

router.get('/answerSurvey', function (req, res, next) {
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('csurvey', {serveries: result});
    });

});

router.get('/answer', function (req, res, next) {
    var sql = "SELECT * FROM survey WHERE surveyID = " + req.query.surveyID;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        var sql = "SELECT * FROM question WHERE questionBelong = " + req.query.surveyID;
        console.log(sql);
        con.query(sql, function (err, result2, fields) {
            if (err) throw err;
            console.log(result2);
            res.render('opshow', {survey: result, questions: result2});
        });
    });

});

router.post('/answerQuestion', function (req, res, next) {
    console.log(req.body);
    answers = req.body.questions.split('|');
    answers.forEach(function (question)
    {
        if(question.trim() !== '')
        {
            var sql = "INSERT INTO answer (questionID, answerValue) VALUES ('" + question.trim() +
                "', '" + req.body[question.trim()] + "')";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
    con.query("SELECT * FROM survey", function (err, result, fields) {
        if (err) throw err;
        //serveries = {'serveries': result};
        console.log(result);
        res.render('csurvey', {serveries: result});
    });
});

router.post('/addQuestion', function (req, res, next) {
    if (req.body.q1title !== "") {
        var sql = "INSERT INTO question (questionTitle, questionType, questionAnswer,questionBelong) VALUES ('" + req.body.q1title +
            "', '" + req.body.q1type + "', '" + req.body.q1a1 + "|" + req.body.q1a2 + "|" + req.body.q1a3 + "|" + req.body.q1a4 + "|" + req.body.q1a5 + "', " + req.body.surveyID + ")";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
    if (req.body.q2title !== "") {
        var sql = "INSERT INTO question (questionTitle, questionType, questionAnswer,questionBelong) VALUES ('" + req.body.q2title +
            "', '" + req.body.q2type + "', '" + req.body.q2a1 + "|" + req.body.q2a2 + "|" + req.body.q2a3 + "|" + req.body.q2a4 + "|" + req.body.q2a5 + "', " + req.body.surveyID + ")";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
    if (req.body.q3title !== "") {
        var sql = "INSERT INTO question (questionTitle, questionType, questionAnswer,questionBelong) VALUES ('" + req.body.q3title +
            "', '" + req.body.q3type + "', '" + req.body.q3a1 + "|" + req.body.q3a2 + "|" + req.body.q3a3 + "|" + req.body.q3a4 + "|" + req.body.q3a5 + "', " + req.body.surveyID + ")";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
    if (req.body.q4title !== "") {
        var sql = "INSERT INTO question (questionTitle, questionType, questionAnswer,questionBelong) VALUES ('" + req.body.q4title +
            "', '" + req.body.q4type + "', '" + req.body.q4a1 + "|" + req.body.q4a2 + "|" + req.body.q4a3 + "|" + req.body.q4a4 + "|" + req.body.q4a5 + "', " + req.body.surveyID + ")";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
    res.redirect('/survey')
});

router.get('/manage', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/result', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
