var express = require('express')
var cors =  require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'my_webboard',
    port: process.env.DB_PORT || 3307
});


app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        connection.execute(
            'INSERT INTO users (email, password, fname, lname) VALUES (?,?,?,?)',
            [req.body.email, hash, req.body.fname, req.body.lname],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return; // Ensure no further execution
                }
                res.json({ status: 'ok' });
            }
        );
    })
});

app.post('/login', jsonParser, function(req,res,next){
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function (err, users, fields) {
            if (err) {res.json({ status: 'error', message: err }); return}
            if (users.length == 0) {res.json({ status: 'error', message: 'no user found' }); return}
            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin){
                if (isLogin) {
                    var token = jwt.sign({email: users[0].email}, process.env.SECRET_KEY, { expiresIn: '1h' }  )
                    res.json({status: 'ok', message: 'login success', token, id: users[0].id})
                } else {
                    res.json({status: 'error', message: 'login failed'})
                }
            });
        }
    );
})



app.post('/authen', jsonParser, function(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.json({status: 'ok', decoded})
    } catch(err) {
        res.json({status: 'error', message: err.message})
    }
})



app.get('/getuser', jsonParser, function(req, res, next) {
    const id = req.query.id;  // Getting id from query parameters

    connection.execute(
        'SELECT * FROM users WHERE id=?',
        [id],
        function(err, user, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (user.length === 0) {
                res.json({ status: 'error', message: 'user not found' });
                return;
            }
            res.json({ status: 'ok', data: user[0] });
        }
    );
});



app.get('/gettopic', jsonParser, function(req, res, next) {
    connection.execute(
        'SELECT * FROM topics',
        function(err, topic, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok', data: topic[0] });
        }
    );
});


app.listen(8080, function(){
    console.log('Server listen to port 8080')
})