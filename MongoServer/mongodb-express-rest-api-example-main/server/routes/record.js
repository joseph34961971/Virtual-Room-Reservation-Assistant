const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');
const gapis = require('../googleapis/gapis');

recordRoutes.route('/googleApi/send').post(function (req, res) {
  const googleCal = gapis;

 console.log(req.body.Message);
 googleCal.sentMessage = req.body.Message;
  gapis.sendMail(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

// This section will help you get a list of all the records.
recordRoutes.route('/googleApi/get/:calID/:eventID').get(function (req, res) {
  const googleCal = gapis;



  console.log(req.params.eventID);

googleCal.calendarID = req.params.calID;
googleCal.eventID = req.params.eventID;
  gapis.getEvent(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route('/googleApi/delete').post(function (req, res) {
  const googleCal = gapis;

 console.log(req.body.calendarID);
 googleCal.calendarID = req.body.calendarID;
 googleCal.eventID = req.body.eventID;
  gapis.deleteEvents(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

// This section will help you get a list of all the records.
recordRoutes.route('/googleApi/update').post(function (req, res) {
  const googleCal = gapis;

  /*
    start:any,end:any,title:any,des:any,location:any,calID:any
    const resource = {
      "summary": title,
      "description": des,
        "location": location,
        "start": {
          "dateTime": start
        },
        "end": {
          "dateTime": end
        },
      };
  */
 console.log(req.body);
 googleCal.calendarID = req.body.calendarID;
 googleCal.eventID = req.body.eventID;
  const matchDocument = {
    "summary":req.body.title,
    "description":req.body.des,
    "location":req.body.location,
    "start": {
      "dateTime": req.body.start
    },
    "end": {
      "dateTime": req.body.end
    },
  }
  googleCal.addResource = matchDocument;
  gapis.updateEvents(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

// This section will help you get a list of all the records.
recordRoutes.route('/googleApi/add').post(function (req, res) {
  const googleCal = gapis;

  /*
    start:any,end:any,title:any,des:any,location:any,calID:any
    const resource = {
      "summary": title,
      "description": des,
        "location": location,
        "start": {
          "dateTime": start
        },
        "end": {
          "dateTime": end
        },
      };
  */
 console.log(req.body);
 googleCal.calendarID = req.body.calendarID;
  const matchDocument = {
    "summary":req.body.title,
    "description":req.body.des,
    "location":req.body.location,
    "start": {
      "dateTime": req.body.start
    },
    "end": {
      "dateTime": req.body.end
    },
  }
  googleCal.addResource = matchDocument;
  gapis.addEvents(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

// This section will help you get a list of all the records.
recordRoutes.route('/googleApi/list/:id').get(function (req, res) {
  const googleCal = gapis;

  const matchDocument = {
    calendarID:req.body.id,
  };
  console.log(req.params.id);

googleCal.calendarID = req.params.id;
  gapis.listCalendar(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching listings!');
    } else {
      res.json(result);
    }
  });
});

// This section will help you get a list of all the records.
recordRoutes.route('/listings').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('users')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
  const dbConnect = dbo.getDb();
  /*
  Body:
  const raw = {
      "firstName": firstName,
      "lastName":lastName,
      "userName": userName,
      "password": password,             
      "email": email
      }
  */
  const matchDocument = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    password:req.body.password,
    email:req.body.email,
  };

  dbConnect
    .collection('users')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
  const dbConnect = dbo.getDb();
  /*
  Body:
  const raw = {
      "firstName": firstName,
      "lastName":lastName,
      "userName": userName,
      "password": password,             
      "email": email
      }
  */
  const matchDocument = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    password:req.body.password,
    email:req.body.email,
  };

  dbConnect
    .collection('users')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route('/listings/updateLike').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection('listingsAndReviews')
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log('1 document updated');
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/listings/delete/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection('listingsAndReviews')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log('1 document deleted');
      }
    });
});

module.exports = recordRoutes;
