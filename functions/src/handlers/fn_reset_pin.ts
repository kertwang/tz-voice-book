import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as morganBody from 'morgan-body';

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');

module.exports = (functions: any, admin: any) => {
  const app = express();
  app.use(bodyParser.json());
  const fs = admin.firestore();

  if (process.env.VERBOSE_LOG === 'false') {
    console.log('Using simple log');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  } else {
    console.log('Using verbose log');
    morganBody(app);
  }

  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  app.use((err, req, res, next) => {
    console.log("error", err);

    if (err.status) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json({ status: 500, message: err.message });
  });


  //Get the latest n recordings from firebase
  app.get('/*', (req, res, next) => {
    //TODO: generate confidence score etc.
    const { id_number } = req.query;
    if (id_number !== "12345") {
      return res.json();
    }

    return res.send({ "redirect_to_blocks": ["pin_fail"]})
  });


  return functions.https.onRequest(app);
};