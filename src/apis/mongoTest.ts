  import * as http from 'http';
  
  export async function connectMongo()
  {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = {
      "name": "thirdUser",
      "emailId": "jeff99998888@yahoo.com",
      "password": "lolol",
      "gender":"male", 
      "address": "000000000000000000"
      };
    
    console.log(JSON.stringify(raw));

    const requestOptions = {
      method: 'POST',
      headers: new Headers({'Content-Type':'application/json'}),
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:4000/user", {
      method: 'POST',
      mode :'no-cors',
      headers: {'Content-Type':'application/json',
                'Host':'localhost:4000'},
      body: JSON.stringify(raw),
      redirect: 'follow'})
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    console.log(response);

    /*const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const resource = {
      "name": "thirdUser",
      "emailId": "jeff99998888@yahoo.com",
      "password": "lolol",
      "gender":"male", 
      "address": "000000000000000000"
      };
      console.log(JSON.stringify(resource));
      console.log(JSON.stringify(resource).length.toString());


      await fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(resource),
      mode: 'no-cors',
      redirect: 'follow'
    }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/
    
    
    
    /*.then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )*/
/*const req = request(
  {
    
    host: 'localhost',
    port: '4000',
    path: '/user/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  response => {
    console.log(response.statusCode); // 200
  }
);
 
req.end();*/
  }