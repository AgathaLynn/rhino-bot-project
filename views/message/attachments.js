var format = require('./format.js');

// attachment with buttons to select certificate
function certificateSelector() {
  var certificates = ["Front End", "Data Visualization", "Back End"];
  var fallback = "Try typing `/fccbot` plus one of these certificate names:\n";
  fallback += format.unorderedList("", certificates);

  return {
    text: 'What certificate are you working on?',
    fallback: fallback,
    callback_id: "select-certificate",
    color: "#770000",
    actions: [
      {
        name: "certificate",
        text: "Front End",
        type: "button",
        value: "front end"
      },
      {
        name: "certificate",
        text: "Data Visualization",
        type: "button",
        value: "data visualization"
      },
      {
        name: "certificate",
        text: "Back End",
        type: "button",
        value: "back end"
      }
    ]
  };
}

// attachment with drop-down menu to select challenge
function challengeSelector(challenges) {

  // build action
  var action = {
    name: 'challenges_list',
    text: 'Select a challenge...',
    type: 'select',
    options: []
  };
  for (let i = 0; i < challenges.length; i++) {
    action.options.push({
      'text': challenges[i],
      'value': challenges[i]
    });
  }

  // build attachment
  var attachment = {
    fallback: format.unorderedList('', challenges),
    color: '#770000',
    callback_id: 'select-challenge',
    actions: [action]
  };

  // return
  return attachment;
}

// attachment containing general info about challenge
function generalInfo(challenge) {
  var text = `
  The "${challenge.name}" challenge is one of the ${challenge.category}.
  You can view more information about this challenge at <${challenge.link}|Free Code Camp>.
  `;

  return {
    fallback: text,
    color: '#770000',
    title: "More Info",
    text: text
  };
}

// attachment containing user stories
function userStories(name, requirements) {
  var attachment = {
    fallback: format.userStories(requirements),
    color: '#770000',
    title: name + ": Requirements",
    text: format.userStories(requirements)
  };

  return attachment;
}

module.exports.certificateSelector = certificateSelector;
module.exports.challengeSelector = challengeSelector;
module.exports.userStories = userStories;
module.exports.generalInfo = generalInfo;
