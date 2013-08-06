// Code to send notifications with song, artist, and venue info
// Easily adaptable to send artist updates (e.g. "Kaskade will be playing at Twin Peaks in 30 min.")

// For testing purposes, run from CLI using "node push_song_info_script.js"
// Response from AWS will be printed to console

var AWS = require('aws-sdk');

// AWS credentials must be stored locally in json format. More secure than hard-coding them.
AWS.config = new AWS.Config();
AWS.config.loadFromPath('./credentials.json');

// For testing:
console.log("config loaded");

// ** Need to connect with existing wat'son backend. **

artist = "Kaskade";
song = "Atmosphere";
stage = "Twin Peaks";

message = "Now playing: \"" + song + "\" by " + artist + " at " + stage;

// For testing:
console.log("Message:");
console.log(message);

// SMS is limited to 140 ASCII characters. The header "WAT'SON> " (9 characters) is always
// included in the messages (no option to remove it). If the message will exceed 140 characters,
// the stage name is removed to help avoid truncated text.
//
// ** Need to test long artist and song names to avoid truncation. **
if (message.length >= 131) {
   message = "Now playing: \"" + song + "\" by " + artist;
   // For testing:
   console.log("Stage name removed. New message:");
   console.log(message);
}

var sns = new AWS.SNS();

function notify (message) {
   sns.publish({
         'TopicArn': 'arn:aws:sns:us-east-1:830920170994:Eventbrite_Hackathon_2013',
         'Message':  message
      }, function (err, data) {
         if (err) {
            // For testing:
            console.log("Error:");
            // For deployment:
            console.log(err); // an error occurred
         } else {
            // For testing:
            console.log("AWS response:");
            // For deployment:
            console.log(data); // successful response
         }
      });
}

// For testing:
notify(message);
