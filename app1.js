// require packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// for formatting reponses
var data = require('./data.js');
var format = require('./responses.js');

require('dotenv').config();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// start listening
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// for testing
app.get('/', function(req, res) {
  res.send("Working! Path Hit: " + req.url);
});

// for authentication
app.get('/oauth', function(req, res) {
  console.log(req.query);
  if (!req.query.code) {
    res.status(500);
    res.send({"error": "looks like we're not getting code"});
    console.log("error: looks like we're not getting code");
  }
  else {
    request({
      url: "https://slack.com/api/oauth.access",
      qs: {code: req.query.code, client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET},
      method: "GET",
    }, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(body);
      }
    });
  }
});

// now we're in business
app.post('/fccbot', function(req, res) {

  // declare response variable
  var response;

  // get information about request
  console.log(req.body);

  // if user provides no info, let's help them along
  if (req.body.text === '') {
    response = format.welcome(req.body.user_name);
  }

  // otherwise, let's see if they sent a challenge name
  else {
    let challenge = data.findChallenge(req.body.text);

    // if we find a challenge, send back info (or apology)
    if (challenge) {
      let challenge_info = data.findChallengeInfo(challenge);
      response = challenge_info ? format.userStories(challenge_info) : format.apology1();
    }

    // if not, let's try to find a category
    else {
      let category = data.findChallengesByCategory(req.body.text);
      response = category ? format.categorySelector(category) : format.apology2();
    }
  }

  // okay... let's send back our response
  res.json(response);
});

// handles response to "select challenge from category" drop-down menu
app.post('/select-challenge', function(req, res) {
  var request_info = JSON.parse(req.body.payload);
  var selection = request_info.actions[0].selected_options[0].value;
  var challenge_info = data.findChallengeInfo(selection);
  if (challenge_info) {
    res.json(format.userStories(challenge_info));
  }
  else {
    res.json({text: "Sorry - Information for that challenge hasn't been implemented yet."});
  }
});
