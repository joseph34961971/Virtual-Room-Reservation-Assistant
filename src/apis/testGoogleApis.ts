export async function sendMail(To:any,Subject:any,Messsage:any) {   
    /*const email = 'To' + ": "+ 'yp93ruby@gmail.com' + "\r\n" 
                + 'Subject' + ": "+ 'Reservation Confirmation' + "\r\n"
                + "\r\n" + "You have reserved a meeting in Room A at 2022/1/17 12:00. Modification of the meetings' details can be made on VRRA, thank you.";*/

    const email = 'To' + ": "+ To + "\r\n" 
                + 'Subject' + ": "+ Subject + "\r\n"
                + "\r\n" + Messsage;
    const resource = {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    };

    const raw = {             
        "Message":resource
        }
      
        //http://localhost:4000/user
      await fetch("http://localhost:5000/googleApi/send", {
        method: 'POST',
        //mode :'no-cors',
        headers: {'Content-Type':'application/json',
                  'Host':'localhost:5000'},
        body: JSON.stringify(raw),     
        redirect: 'follow'})
        .then(response => {console.log(response);response.json()})
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }  

export async function deleteEvents(calID:any,eventID:any) {

    const raw = {             
        "eventID": eventID,
        "calendarID": calID
        }
      
        //http://localhost:4000/user
      await fetch("http://localhost:5000/googleApi/delete", {
        method: 'POST',
        //mode :'no-cors',
        headers: {'Content-Type':'application/json',
                  'Host':'localhost:5000'},
        body: JSON.stringify(raw),     
        redirect: 'follow'})
        .then(response => {console.log(response);response.json()})
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


  } 

  export async function updateEvents(start:any,end:any,title:any,des:any,location:any,calID:any,eventID:any) {

    const raw = {
        "start": start,
        "end":end,
        "title": title,
        "location": location,             
        "des": des,
        "calendarID": calID,
        "eventID": eventID
        }
      
        //http://localhost:4000/user
      await fetch("http://localhost:5000/googleApi/update", {
        method: 'POST',
        //mode :'no-cors',
        headers: {'Content-Type':'application/json',
                  'Host':'localhost:5000'},
        body: JSON.stringify(raw),     
        redirect: 'follow'})
        .then(response => {console.log(response);response.json()})
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


  } 

export async function insertEvents(start:any,end:any,title:any,des:any,location:any,calID:any) {

    const raw = {
        "start": start,
        "end":end,
        "title": title,
        "location": location,             
        "des": des,
        "calendarID": calID
        }
      
        //http://localhost:4000/user
      await fetch("http://localhost:5000/googleApi/add", {
        method: 'POST',
        //mode :'no-cors',
        headers: {'Content-Type':'application/json',
                  'Host':'localhost:5000'},
        body: JSON.stringify(raw),     
        redirect: 'follow'})
        .then(response => {console.log(response);response.json()})
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


  } 

  export async function listEvents(calendarID:any):Promise<any>
  {   
    const raw = {
        "calendarID":calendarID
    }
    console.log(JSON.stringify(raw));

    return new Promise(resolve=>{ 
    const res = window.fetch("http://localhost:5000/googleApi/list/"+calendarID, {
      method: 'GET', 
      })
      .then(response => {
        console.log('response:');
            const res = response;;
            resolve(res.text());
            
      })
      .catch(error => console.log('error', error));

    })
    
  }

  export async function getEvents(calID:any,eventID:any):Promise<any>
  {   
    return new Promise(resolve=>{ 
    const res = window.fetch("http://localhost:5000/googleApi/get/"+calID+"/"+eventID, {
      method: 'GET', 
      })
      .then(response => {
        console.log('response:');
            const res = response;;
            resolve(res.text());
            
      })
      .catch(error => console.log('error', error));

    })
  }
    
  