let {google} = require('googleapis');
let privatekey = require("../../../../serviceAccount.json");


// configure a JWT auth client
let jwtClient;

let calendar;
module.exports.calendarID;

module.exports= {
    listCalendar: function (callback){
    //Google Calendar API
    console.log(this.calendarID);
    calendar = google.calendar('v3');
    calendar.events.list({
        auth: jwtClient,
        calendarId: this.calendarID,
    }, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
       return callback(err);
   }
   var events = response.data;
   console.log(response.data);
   if (events.length == 0) {
       console.log('No events found.');
   } else {
       console.log('Event from Google Calendar:');
    //    for (let event of response.data) {
    //        console.log('Event name: %s, Creator name: %s, Create date: %s', events[i].summary, events[i].start.dateTime, events[i].id);           
    //    }
       return callback(false,response.data);
   }
    });
},
initJWT: function () {
jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive',
     'https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log("GAPI Successfully connected!");
//return callback();
}
});
},
};