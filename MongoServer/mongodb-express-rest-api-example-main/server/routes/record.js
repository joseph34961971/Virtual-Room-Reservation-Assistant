const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');
const gapis = require('../googleapis/gapis');

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
  /*dbConnect
    .collection('users')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });*/
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
