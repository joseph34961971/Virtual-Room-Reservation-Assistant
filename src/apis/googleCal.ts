import {gapi} from 'gapi-script';
// import { JWT } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
// const sa = require('../../serviceAccount.json');


  const CLIENT_ID = '231149043691-hcppd28j8ar799dei8c1fep3h3u5vhfn.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyBSRSGlpRY5WxxwglKjpqqi2rDQKCR3ymI';

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

  // var authorizeButton = document.getElementById('authorize_button');
  // var signoutButton = document.getElementById('signout_button');

  /**
    *  On load, called to load the auth2 library and API client library.
    */
  export function handleClientLoad() {
    gapi.load('client:auth2', initClient);
    
  }

  export function initAuth()
  {
    // gapi.auth2.init({
    //   client_id: CLIENT_ID,
    //   scope: SCOPES
    // });
    // insertEvents('2022-01-13T09:00:00-07:00','2022-01-13T15:00:00-07:00','title','description');

    //Good One
    handleAuthClick('lol');

    // gapi.client.load('calendar','v3');
    // gapi.auth.setToken();
    // gapi.auth.authorize({
    //   client_id:'231149043691-hcppd28j8ar799dei8c1fep3h3u5vhfn.apps.googleusercontent.com',
    //   response_type:'id_token permission',
    //   scope:"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
    //   immediate:false
    // },function(response) {
    //   console.log(response);
    // });
    // console.log(retVal);
  }

  export function testAdd()
  {
    insertEvents('2022-01-14T09:00:00-07:00','2022-01-14T15:00:00-07:00','title','description');
  }

  function testAuthorize()
  {
    
  } 

  /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // insertEvents('2022-01-13T09:00:00-07:00','2022-01-13T15:00:00-07:00','title','description');

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
  function updateSigninStatus(isSignedIn : any) {
    // if (isSignedIn) {
    //   authorizeButton.style.display = 'none';
    //   signoutButton.style.display = 'block';
    //   $("#showBlock").toggle("slow");
    // } else {
    //   authorizeButton.style.display = 'block';
    //   signoutButton.style.display = 'none';
    // }
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
    // $("#showBlock").hide(1000);
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

  function insertEvents(start:any,end:any,title:any,des:any) {
      // const start = document.getElementById("start").value;
      // const end = document.getElementById("end").value;
      // const title = document.getElementById('title');
      // const des = document.getElementById('des');

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
        'calendarId': 'ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com',
        'resource': resource
      });
      request.execute(function(resp:any) {
        console.log(resp);
      });
    }   
    
    // function listUpcomingEvents() {
    //   gapi.client.calendar.events.list({
    //     'calendarId': 'primary',
    //     'timeMin': (new Date()).toISOString(),
    //     'showDeleted': false,
    //     'singleEvents': true,
    //     'maxResults': 10,
    //     'orderBy': 'startTime'
    //   }).then(function(response) {
    //      events = response.result.items;
    //     appendPre('Upcoming events:');

    //     if (events.length > 0) {
    //       for (i = 0; i < events.length; i++) {
    //         var event = events[i];
    //         var when = event.start.dateTime;
    //         if (!when) {
    //           when = event.start.date;
    //         }
    //         appendPre(event.summary + ' (' + when + ')')
    //       }
    //     } else {
    //       appendPre('No upcoming events found.');
    //     }
    //   });
    // }


  const authUrl = "https://www.googleapis.com/oauth2/v4/token";
  const scope = "https://www.googleapis.com/auth/cloud-platform";

const getSignedJwt = () => {
  const token = {
    iss: "room-assistant@test-vueapi.iam.gserviceaccount.com",
    // iat: parseInt(Date.now() / 1000),
    // exp: parseInt(Date.now() / 1000) + 60 * 60, // 60 minutes
    iat: Date.now() / 1000,
    exp: Date.now() / 1000 + 60 * 60, // 60 minutes
    aud: authUrl,
    scope,
  };

  
  return jwt.sign(token, "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrq0Ez0NcUj6D8\nkIE0AELUWGu9nbCQqmRWlcLgCWk8MRiAHm+4r2SX1rxF0cMHdCUB2DT5V/ifrIWs\nKsucNS6EAny1bgLuCeYZ+hFCVD17fkOLdx6D0LcWFWhncM0r2DN3PGokgz846zak\nEE2cWJ9MoEjCfKis6vlextBF0gMUmxGBAl174AVe/nTc7ortlbEmeJO7p6Bj/kh7\neRmeBMy5O0MP2xSi1MzT/27U7gu2iQoxll/rxhoX57x+tGwoLzyqu/GsKh1/0Ors\nGRvfvuFePYpKhkieciMuHpMQFOaNfIe6n7Z52ys0sRZ3/mFk1daWszqXIPLlDPWT\n90WsxZ65AgMBAAECggEAEtrGWIiRduKnjdXZOvrkXCox+yt8nwb36kKcmrqt4jyK\nMlglcSViaQLevtRhFUp+Xgt/FfvBhNgP/m7c2hVFPJ6BT/P7QmW37hZ3Gs/hyNR/\nWqwEn/mmgjhrtSDAiBZA4NGz3rrDkN7Uq4RW4dsh8+qO0z2Z0RQlu3EeouyEBhkr\n75EDM+AdyQcgpdHmSZR3ebjDOe6TmPb7Bs7XDxfzcAA8jkRcgUtTrusNBfBDyeMC\n292Q+bxSzVEpNkLjS0zLvDRshp3t+LB67WgUVdpzLiLXfsuwVNakdyeTGuI7IyVQ\nZmeo97F1WBmVMClu7sSznvU0COCGbyMbg8n2B4fg4QKBgQDT47B/vztLUuG+SzWW\nmxtKYk2nlaTr58/X3DwaXjNH5uF0kMGTqxjGtUMaefQbuMj/IByCwTmYoYuClCm6\nj6Hkg3tVg8PBXD3Nb1M4iKP47rAELB5jgY9m8dHuy5BYZyEIwsbmlQF9QeDOuL+g\n+7xgy/IsdIFb/ALkKMA/OJj7BQKBgQDPaBSGJKk4VcVydpomoVXfrptGh/b8M4lG\nPEzK+HAxYwrnFwCm0lNbCqaQyAuWbps993+GRORngypGB2rXyVg+cILy+LnYvPzm\ngdvON369KtbxrnmRBHQCYLeKyVe9+NFOCkSGy17MsVcZPI48q0Oge45f7tH5gnwj\nhnoJdZmrJQKBgQDLSuMmTbV3+Vc5GjOaAcrXPSXAKeUHqWtSca0Ap2yQCcY57kCr\nizbEP1jYaDV6+3lsvcRc90JpXGTbrYezxObQtg146GjCddud5Ld1wDOCPI+IEUQ+\nuCl73XtLnucoyhl5rFblGAVLxg8Ih1zj+WKthD8fw8/xDwM/IJIClizAeQKBgGc0\ncDoL1hSNQZHiiHQ+hb+nX+ap03HNpzpG2SOKmjFJCmzRWmaodAfydc3HbVSutxsP\no+pJL6p+bzOnjzfPHdT8IX0L3VaHPATri1fC75Lr1UcvvZg2sg9Y1xv9cma6gFQn\n8c9tNT//4spRAqoXwrABq2f7K4rPrjvzN5irZwrtAoGBALaZ70Vj5hJEVo/K4aUl\nFNjghpxEBlhj/+dsHnj6+96jzjeSmjoPwS4W7/9tuaLbph+bxI+NT0uif5teWopP\nMJGnvxYRMvpNk0C4fjR8+HLS4jDvEGdTTAlJzZ3XXxWNSx0zqKkfAiXPV0yPus9z\nEtUsmGuOpSyF07E/+zPVerr1\n-----END PRIVATE KEY-----\n",
   { algorithm: "RS256" });
};

const getGoogleAccessToken = async () => {
  const signedJwt = getSignedJwt();
  const body = new URLSearchParams();

  body.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  body.append("assertion", signedJwt);

  const response = await fetch(authUrl, {
    method: "post",
    headers: {
      Authorization: `Bearer ${signedJwt}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  return response.json();
};

(async () => {
  const tokenResp = await getGoogleAccessToken();
  console.log(tokenResp);
})();


    