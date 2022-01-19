import {gapi} from 'gapi-script';

  const CLIENT_ID = '231149043691-hcppd28j8ar799dei8c1fep3h3u5vhfn.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyBSRSGlpRY5WxxwglKjpqqi2rDQKCR3ymI';

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest","https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.send";

  /**
    *  On load, called to load the auth2 library and API client library.
    */
  export function handleClientLoad() {
    gapi.load('client:auth2', initClient);   
  }

  export function initAuth()
  {
    //Good One
    handleAuthClick('lol');
  }

  export function testAdd()
  {
    insertEvents('2022-01-14T09:00:00-07:00','2022-01-14T15:00:00-07:00','title','description','ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com');
  }

  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
  function updateSigninStatus(isSignedIn : any) {
    console.log("signed in");
  }

  /**
    *  Sign in the user upon button click.
    */
  export function handleAuthClick(event : any) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
    *  Sign out the user upon button click.
    */
  export function handleSignoutClick(event : any) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
    * Append a pre element to the body containing the given message
    * as its text node. Used to display the results of the API call.
    *
    * @param {string} message Text to be placed in pre element.
    */
  function appendPre(message: any) {
    const pre = document.getElementById('contents');
    const textContent = document.createTextNode(message + '\n');
    if(pre != null)
    {
      pre.appendChild(textContent);
    }
  }


  export function insertEvents(start:any,end:any,title:any,des:any,calID:any) {
      const userNames = {
        "UserID":"User01",
        "email":"aowjdia@ofwef.com"
      };
      JSON.stringify(userNames)

      const resource = {
      "summary": title,
      "description": des,
        "location": "Tapie",
        "start": {
          "dateTime": start
        },
        "end": {
          "dateTime": end
        }
      };
      
      const request = gapi.client.calendar.events.insert({
        'calendarId': calID,
        'resource': resource
      });
      request.execute(function(resp:any) {
        console.log(resp);
      });
    }   

    export function deleteEvents(calID:any,eventID:any) {
      const userNames = {
        "UserID":"User01",
        "email":"aowjdia@ofwef.com"
      };
      JSON.stringify(userNames)
      
      const request = gapi.client.calendar.events.delete({
        'calendarId': calID,
        'eventId': eventID
      });
      request.execute(function(resp:any) {
        console.log(resp);
      });
    }   

    export function sendMail(To:any,Subject:any,Messsage:any) {   
      /*const email = 'To' + ": "+ 'yp93ruby@gmail.com' + "\r\n" 
                  + 'Subject' + ": "+ 'Reservation Confirmation' + "\r\n"
                  + "\r\n" + "You have reserved a meeting in Room A at 2022/1/17 12:00. Modification of the meetings' details can be made on VRRA, thank you.";*/

      const email = 'To' + ": "+ To + "\r\n" 
                  + 'Subject' + ": "+ 'Reservation Confirmation' + "\r\n"
                  + "\r\n" + Messsage;
      const resource = {
        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
      };
      
      const request = gapi.client.gmail.users.messages.send({
        'userId':'me',
        'resource':resource
      });
      request.execute(function(resp:any) {
        console.log(resp);
      });
    }   

    export interface IIEvent{
      kind: string,
      etag: string,
      id: string,
      status: string,
      htmlLink: string,
      created: string,
      updated: string,
      summary: string,
    }

    export interface IEvent {
      kind: string
      etag: string,
      summary: string,
      updated: string,
      timeZone: string
      accessRole: string
      items: IIEvent[]
    }

    export async function listUpcomingEvents(calID:any):Promise<any> {        
      const request = gapi.client.calendar.events.list({
        'calendarId': calID,
        //'timeMin': (new Date()).toISOString(),
        // 'showDeleted': false,
        // 'singleEvents': false,
        // 'maxResults': 10,
        // 'orderBy': 'startTime'
      });
      return new Promise(resolve=>{
        request.execute(function(resp:any) {
          if(!resp.error) {
            const calendarIds = [];
            
            for(let i = 0; i < resp.items.length; i++) {
              calendarIds.push(resp.items[i]);
            }         
            const reEvent = calendarIds;
            console.log(calendarIds.length);
            //console.log(calendarIds[0].start.dateTime);
            if (calendarIds.length > 0) {
                  for (let j = 0; j < calendarIds.length; j++) {
                    const event = calendarIds[j];
                    const when = event.start.dateTime;
                    console.log(event.summary + ' (' + when + ')');
                  }
                  resolve(calendarIds); 
                } else {
                  console.log('No upcoming events found.');
                  resolve(0);
                }
          }
          else {
            console.log('bad');
            resolve(0);
          }
        });
      }) 
    }