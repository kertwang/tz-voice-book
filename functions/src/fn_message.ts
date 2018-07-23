import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');


module.exports = (functions, admin) => {
  const app = express();
  app.use(bodyParser.json());
  const fs = admin.firestore();

  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  app.use(function (err, req, res, next) {
    console.log("error", err);

    if (err.status) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json({ status: 500, message: err.message });
  });

  // app.get('/*', (req, res, next) => {
  //   console.log("GET messages")
  //   const audioUrl = "https://api.twilio.com/2010-04-01/Accounts/ACc628835716a7f404b36a44114e05719b/Recordings/RE933f0591c47390f7fa4092e6c3e945d9.mp3";
  //   res.json({audioUrl});
  // });

  app.get('/latest', (req, res, next) => {
    //Get the latest n recordings from firebase
    const limit = 2;
    fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
    .then(doc => {
      const data = doc.data();
      console.log('data', data);

    });
  });

  app.post('/*', (req, res, next) => {
    const { params, body, query } = req;

    console.log("params", params);
    console.log("body", body);
    console.log("query", query);

    //TODO: Add createdAt field
   
    res.json(true);
  });


  return functions.https.onRequest(app);
};