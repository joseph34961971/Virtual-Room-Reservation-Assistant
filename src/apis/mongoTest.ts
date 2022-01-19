import { Result } from "element-ui";
import { response } from "express";

  export async function MongoAddUser(name:any,email:any,password:any,gender:any,address:any)
  {    
    const raw = {
      "name": name,
      "emailId": email,
      "password": password,
      "gender":gender, 
      "address": address
      }
    
    await fetch("http://localhost:4000/user", {
      method: 'POST',
      mode :'no-cors',
      headers: {'Content-Type':'application/json',
                'Host':'localhost:4000'},
      body: JSON.stringify(raw),     
      redirect: 'follow'})
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  export async function MongoGetUserList():Promise<any>
  {    
    // return new Promise(resolve=>{
    // const ret = window.fetch("http://localhost:4000/user", {
    //   method: 'GET',
    //   mode :'no-cors',
    //   // headers: {'Content-Type':'application/json',
    //   //           'Host':'localhost:4000'},    
    //   })
    //   .then(response => {
    //     console.log('response:');
    //     console.log( response);
    //     resolve(response.body);
    //   })
    //   .then(result => {
    //     console.log('result:' + result);
    //     resolve(result);
    //   })
    //   .catch(error => console.log('error', error));

    //   resolve(ret);
    // })

    await fetch("http://localhost:4000/user", {
      method: 'GET',
      mode :'no-cors',
      headers: {'Content-Type':'application/json',
                'Host':'localhost:4000',
                'Cache-Control':'no-cache',
                'redirect': 'follow'},    
      }
      ) 
      .then(response => {
        console.log(response.status);
        const ol = response;
        Promise.resolve(ol);
      })
      .then(result => {
        console.log(result);
      })
      .then(user => {
        console.log('user:'+user);
      })
      .catch(error => console.log('error', error));


  }
    
  