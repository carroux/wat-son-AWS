// Code to issue a subscribe request for a phone number provided by user
// Subscription verification is automatically handled by SNS to avoid spam

// For testing purposes, run from CLI using "node subscribe_script.js"
// Response from AWS will be printed to console

var AWS = require('aws-sdk');

// AWS credentials must be stored locally in json format. More secure than hard-coding them.
AWS.config = new AWS.Config();
AWS.config.loadFromPath('./credentials.json');

// For testing:
console.log("config loaded");

var sns = new AWS.SNS();

// For testing:
inputtxt = "6502422655";

// For testing:
console.log("inputtxt assigned:");
console.log(inputtxt);

function subscribe(inputtxt)
{
   // Checks the format of input phone number using regex. Should be three digits followed by 
   // three digits followed by four digits. Digit groups can be separated by hyphens, periods,
   // spaces, parentheses or nothing.
   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   if ((inputtxt.match(phoneno)))
   {
      // For testing:
      console.log("input matched conditions");
      // For deployment:
      inputtxt = "1" + inputtxt; // Appends country code. AWS SNS supports only US numbers.
      // For testing:
      console.log("inputtxt with country code appended:");
      console.log(inputtxt);

      sns.subscribe({
         'TopicArn': 'arn:aws:sns:us-east-1:830920170994:Eventbrite_Hackathon_2013',
         'Protocol': 'sms',
         'Endpoint':  inputtxt
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

      // For testing:
      console.log("Success.");
      
      return true;
   }
   else
   {
      console.log("Invalid phone number.");
      return false;
   }
}

// For testing:
subscribe(inputtxt);
