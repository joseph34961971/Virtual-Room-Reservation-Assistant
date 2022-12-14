let {google, GoogleApis} = require('googleapis');
var nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')
const path = require('path');
let privatekey = require("../../../../serviceAccount.json");


// configure a JWT auth client
let jwtClient;
let calendar;
let mail;

module.exports.to;
module.exports.subject;
module.exports.message;
module.exports.calendarID;
module.exports.eventID;
module.exports.addResource;

module.exports= {
    sendMail: function (callback){
        const msg = {
            to: this.to, // Change to your recipient
            from: 'VRRA<vrranotification@gmail.com>', // Change to your verified sender
            subject: this.subject,
            text: this.message,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent');
              return callback(false, 'Email sent');
            })
            .catch((error) => {
              console.error(error)
              return callback(error)
            })
    },

    updateEvents: function (callback){
        //Google Calendar API
        console.log(this.calendarID);
        calendar = google.calendar('v3');
        calendar.events.update({
            auth: jwtClient,
            calendarId: this.calendarID,
            eventId: this.eventID,
            requestBody: this.addResource
        }, function (err, response) {
       if (err) {
           console.log('The API returned an error: ' + err);
           return callback(err);
       }
       var events = response;
       console.log(response);
        return callback(false,response);

        });
    },

    deleteEvents: function (callback){
        //Google Calendar API
        console.log(this.calendarID);
        calendar = google.calendar('v3');
        calendar.events.delete({
            auth: jwtClient,
            calendarId: this.calendarID,
            eventId: this.eventID,
        }, function (err, response) {
       if (err) {
           console.log('The API returned an error: ' + err);
           return callback(err);
       }
       var events = response;
       console.log(response);
        return callback(false,response);

        });
    },

    addEvents: function (callback){
        //Google Calendar API
        console.log(this.calendarID);
        calendar = google.calendar('v3');
        calendar.events.insert({
            auth: jwtClient,
            calendarId: this.calendarID,
            requestBody: this.addResource
        }, function (err, response) {
       if (err) {
           console.log('The API returned an error: ' + err);
           return callback(err);
       }
       var events = response;
       console.log(response);
        return callback(false,response);

        });
    },

    getEvent: function (callback){
        //Google Calendar API
        console.log(this.calendarID);
        calendar = google.calendar('v3');
        calendar.events.get({
            auth: jwtClient,
            calendarId: this.calendarID,
            eventId: this.eventID
        }, function (err, response) {
       if (err) {
           console.log('The API returned an error: ' + err);
           return callback(err);
       }
       var events = response.data;
       console.log(response.data);
        return callback(false,response.data);
        });
    },

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
     'https://www.googleapis.com/auth/calendar',
     'https://www.googleapis.com/auth/gmail.readonly',
     'https://mail.google.com/']);
//authenticate request
sgMail.setApiKey('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');
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