//include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
var email, userid, resp;
const port = 5000;

require('dotenv').config()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
app.use(bodyParser.json(), cors())
app.options('*', cors());
var request = require("request");

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);


//get the form 
app.get('/', (req,res) => res.send(req.body));


// app.all("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
//   })

// app.post('/', (req, res) => {

//     const timestamp = new Date().getTime() - 30000
//     const msg = Buffer.from(process.env.API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
//     const hash = crypto.createHmac('sha256', process.env.API_SECRET).update(msg).digest('base64')
//     const signature = Buffer.from(`${process.env.API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')
  
//     res.json({
//       signature: signature
//     })
//   })

app.post('/createmeeting', (req, res) => {
    console.log("request",req);
    // email = req.body.email;
    // topic =req.body.topic;
    email = "umadevisse123@gmail.com";
    // console.log(topic,"topic")
    console.log(email);    
    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
      body: {
        topic: "zoom Integration",
        type: 1,
        settings: {
          host_video: "false",
          participant_video: "false"
        }
      },
      auth: {
        bearer: token
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
         authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjljY0p1QUh5U3RXY18yMTI3OEhpRGciLCJleHAiOjE2MTgxMjE1NjcsImlhdCI6MTYxNzUxNjc2N30.PosfafBkOG2QqoxUaip5QS6kY6baWbXhN519QSA54AY"
      },
      json: true //Parse the JSON string in the response
    };
  
    rp(options)
      .then(function(response) {
        console.log("response is: ", response);
        res.send(JSON.stringify(response));
      })
      .catch(function(err) {
        // API call failed...
        console.log("API call failed, reason ", err);
      });
  });



  app.get('/getmeeting', (req, res) =>{
  var options = {
    method: 'GET',
    // Use the `me` keyword for the request below. 
    url: 'https://api.zoom.us/v2/users/umadevisse123@gmail.com',
        headers: {
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjljY0p1QUh5U3RXY18yMTI3OEhpRGciLCJleHAiOjE2MTgxMjE1NjcsImlhdCI6MTYxNzUxNjc2N30.PosfafBkOG2QqoxUaip5QS6kY6baWbXhN519QSA54AY',
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
    res.send(JSON.stringify(response));
  });
});




  


app.listen(port, () => console.log(`Example app listening on port ${port}!`));