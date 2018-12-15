const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./server/queries');
const jwt = require('jsonwebtoken'); 
app.use(express.static(__dirname + '/client')); 
// console.log("before "+process.env.PORT);
const port = process.env.PORT || 3000;
// console.log("after "+process.env.PORT);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);





app.get('/', (request, response) => {
  // response.json({ info: 'Node.js, Express, and Postgres API' });
  response.sendFile(__dirname + '/client/login.html');
});



app.post('/api/login', (req, res) => {

  var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

  // Mock user
  console.log(req.body);
  const user = {
    id: 1, 
    uname: 'sandeep',
    psw: 'sandeep'
  }



  jwt.sign({user}, 'secretkey', { expiresIn: '300s' }, (err, token) => {
    //res.json({
    // token
    //});

console.log(token);


if (typeof localStorage === "undefined" || localStorage === null) {
 var LocalStorage = require('node-localstorage').LocalStorage;
 localStorage = new LocalStorage('./scratch');
}
 
localStorage.setItem('myFirstKey', token);
//console.log(localStorage.getItem('myFirstKey'));
 res.setHeader('token', 'token'); 
    res.sendFile(__dirname + '/client/verify.html');
    
  });
  
});

app.post('/api/posts', (req, res) => {  
  //console.log("-------     before post         "+localStorage.getItem('myFirstKey'));
  jwt.verify(localStorage.getItem('myFirstKey'), 'secretkey', (err, authData) => {
    if(err) {
     // localStorage.setItem('myFirstKey', token);
    //  console.log("-------   in error           "+localStorage.getItem('myFirstKey'));
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
        token: localStorage.getItem('myFirstKey')
      });
    }
  });

  
});






app.get('/users', db.getReal);
app.get('/users/:id', db.getRealById);
app.post('/users', db.createRealUser);
app.put('/users/:id', db.updateRealUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// var express = require('express')
// var app = express();

// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))

// app.get('/', function(request, response) {
//   response.send('Hello World!')
// })

// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'))
// })
