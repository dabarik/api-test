var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var url = require('url');
var bodyParser = require('body-parser');


app.use(cors());


// Database

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "twitter",
    port : '8889'
})

con.connect(function(err) {
    if (!err) {
        console.log('connected')
    } else {
        console.log('pas connecté')
    }
 }) 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post("/createPost", function (req, res, next){
    var pseudo = req.body.pseudo;
    var post = req.body.post;
    var sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
    var inserts = ['user', 'pseudo', 'post', pseudo, post];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) {
            res.status(200).json({'error': err})
        }
        else
        {
            res.status(200).json({'sucess': 'the project was successfully created'})
        }
    });
})

app.get("/getPost", function(req, res, next){
    var sql = "SELECT * FROM ??";
    var insert = ["post"];
    sql = mysql.format(sql, insert);
    con.query(sql, function (err, rows) {
        if (err) {
            res.status(200).json({'error': err})
        }
        else
        {
            res.status(200).json({'posts': rows})
        }
    });
})

app.get("/createUser", function(req, res, next){
    var name = req.params.pseudo;
    var adress = req.params.adress;
    var password = req.params.password;

    var sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
    var insert = ['users', 'name', 'adress', 'password', name, adress, password];
    sql = mysql.format(insert, sql);

    con.query(sql, function(err, result){
        if(err){
            res.status(200).json({'error' : err});
        }
        else{
            res.status(200).json({'success' : 'yess'});
        }
    });

})


app.listen(1717);