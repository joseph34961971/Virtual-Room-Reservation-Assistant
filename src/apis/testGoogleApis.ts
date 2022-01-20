import { Result } from "element-ui";
import { json} from "express";
import { UserRefreshClient } from "google-auth-library";
import { Agent } from "http";
import { HttpsProxyAgent } from "https-proxy-agent";

  export async function MongoAddUser(firstName:any,lastName:any,userName:any,email:any,password:any)
  {    
    const raw = {
      "firstName": firstName,
      "lastName":lastName,
      "userName": userName,
      "password": password,             
      "email": email
      }
    
      //http://localhost:4000/user
    await fetch("http://localhost:5000/listings/recordSwipe", {
      method: 'POST',
      //mode :'no-cors',
      headers: {'Content-Type':'application/json',
                'Host':'localhost:4000'},
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
    

    //http://localhost:4000
    // return new Promise(resolve=>{
    //   const proxyAgent = new HttpsProxyAgent('http://localhost:4000');
    // window.fetch("/user", {
    //   method: 'GET',
    //   //mode :'no-cors',
    //   headers: {'Content-Type':'application/json',
    //             'Host':'localhost:4000',
    //             'Cache-Control':'no-cache',
    //             'redirect': 'follow'},    
    //   },
    //   ) 
    //   .then(response => {
    //     // if(response.status === 0){
    //     //   response.json()
    //     //   .then((json) => {
    //     //     const {message,stackTrace} = json;
    //     //     resolve(message)
    //     //   })
    //     // }
    //     console.log(response);
    //     const ol = response;
    //     Promise.resolve(ol.body);
    //   })
    //   .then(result => {
    //     console.log(result);
    //     Promise.resolve(result);
    //   })
    //   .then(user => {
    //     console.log('user:'+user);
    //   })
    //   .catch(error => console.log('error', error));
    // })
    
  }
    
  