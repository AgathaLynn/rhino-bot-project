var express = require('express');
var router = express.Router();
var data = require('../models/access.js');
var format = require('../scripts/message/responses.js');

router.post('/', function(req, res) {

  // get user selected challenge from user response
  var request_info = JSON.parse(req.body.payload);
  var selection = request_info.actions[0].selected_options[0].value;

  // respond with challenge info
  data.challengeInfo(selection)
  .then(
    function fulfilled(info) {
      res.json(format.challengeInfo(info));
    },
    function rejected(reason) {
      console.log(reason);
      res.json(format.challengeInfo());
    }
  );
});

module.exports = router;