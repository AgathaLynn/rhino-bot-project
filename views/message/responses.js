var attachments = require('./attachments.js');

/////
// Welcome message (for when no query provided)
/////

function welcome(name) {
  var greetings = [
    `:wave: Hello, ${name}!
  I'm fccBot, at your service.`,
    `Hi, ${name}, you called? :telephone_receiver:`,
    `You're in luck, ${name} :four_leaf_clover:! You've found ME, fccBot!`,
    `:alarm_clock: Looks like it's time for me to get to work. What can I do for you, ${name}?`,
    `:crystal_ball:
  I see... your name is... ${name}. And... what's that... hm. I think I see... _answers_... in your future.
  Seriously, though...`,
  `:tada: :tada: :tada:
  Hooray! You've found ME, fccBot, the one and only!`,
  `Need a hand? I'm fccBot, and I'm :on: :top: of things!`
  ];

  var greeting = greetings[Math.floor(Math.random() * greetings.length)];
  var text = `${greeting}

  If you're looking for information about one of the freeCodeCamp challenges, I'm here to help.
  You can me know what challenge you're working on, like this:

  :small_orange_diamond: */fccbot Tic Tac Toe* _or_ */fccbot tic-tac-toe game*

  Not sure of the challenge name? Tell me what certificate you're working toward, and I'll take it from there:

  :small_orange_diamond: */fccbot front-end development* _or_ */fccbot front end*

  Happy Coding!
  `;

  return {
    response_type: 'ephemeral',
    text
  };
}

/////
// USER STORY RESPONSES (to deliver info on challenges)
/////

function challengeInfo(challenge, message) {

  // if no info, apologize
  if (!challenge) {
    return apology1();
  }

  // else, build and return response
  var text = `Here's what I found on the "${challenge.name}" challenge:`;
  if (message) {
    text = message + "\n" + text;
  }

  return {
    response_type: 'ephemeral',
    text: text,
    attachments: [
      attachments.userStories(challenge.name, challenge.requirements),
      attachments.generalInfo(challenge)
    ]
  };
}

/////
// RESPOND WITH SECTION INFORMATION
/////

function sectionInfo(data, message) {

  // if no challenges, apologize
  if (!data) {
    return apology2();
  }

  var [section, challenges] = data;
  challenges = challenges.map(x => x.name);

  // build text of message
  var text = `Are you looking for one of the ${section} challenges?`;
  if (message) {
    text = message + "\n" + text;
  }

  // return object
  return {
    response_type: 'ephemeral',
    text: text,
    attachments: [
      attachments.challengeSelector(challenges)
    ]
  };
}

/////
// APOLOGY (HELPER) FUNCTIONS
/////

// apology - not implemented
function apology1() {
  return {text: "Sorry - I can't find any information for that challenge."};
}

// apology - haven't a clue
function apology2() {
  return {
    text: "Sorry. I can't find a match for that.",
    attachments: [
      attachments.certificateSelector()
    ]
  };
}

module.exports.welcome = welcome;
module.exports.challengeInfo = challengeInfo;
module.exports.sectionInfo = sectionInfo;
