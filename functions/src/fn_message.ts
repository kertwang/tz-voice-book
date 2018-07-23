import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin')



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

  app.post('/message', (req, res, next) => {
    const { params, body, query } = req;

    console.log("params", params);
    console.log("body", body);
    console.log("query", query);
   
    res.json(true);
  });


  return functions.https.onRequest(app);
};