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
        /*// create transporter object with smtp server details
        const transporter = nodeMailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'jeff99998888@yahoo.com',
                pass: '2188963421889634'
            }
        });

        // Message object
    let message = {
        from: 'Chiang <jeff99998888@gmail.com>',
        to: 'Hao-Wen <jam99998888@gmail.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return callback(err);
            }
    
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return callback(false,nodemailer.getTestMessageUrl(info));
        });*/

        const msg = {
            to: this.to, // Change to your recipient
            from: 'VRRA Wizard<vrranotification@gmail.com>', // Change to your verified sender
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