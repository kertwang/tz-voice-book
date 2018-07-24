import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';
import * as morgan from 'morgan';
import * as morganBody from 'morgan-body';

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');

module.exports = (functions, admin) => {
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

  app.use(function (err, req, res, next) {
    console.log("error", err);

    if (err.status) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json({ status: 500, message: err.message });
  });


  //Get the latest n recordings from firebase
  app.get('/*', (req, res, next) => {
    const limit = 5;
    const {stringFormat} = req.query;

  
    return fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
    .then(sn => {
      const messages: any = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        const data = doc.data();
        data.id = doc.id;
        messages.push(data);
      });

      if (stringFormat !== 'true'){
        return res.json({messages});
      } 

      //make a comma separated string of urls
      // const urlString = "\"url1,url2,url3\"";
      const urlString = messages.reduce((acc, curr, idx) => {
        if (idx === messages.length - 1) {
          return acc + curr.audioUrl + "\"";
        }

        return acc + curr.audioUrl + ','
      }, '\"');
      return res.json({messages: urlString});
    });
  });

  app.post('/*', (req, res, next) => {
    const { params, body, query } = req;
    const { audioUrl, phone } = body;
    const createdAt = moment().toISOString();

    return fs.collection('messages').add({
      audioUrl,
      phone, 
      createdAt,
    })
    .then(ref => {
      res.json({id: ref.id});
    });
  });

  return functions.https.onRequest(app);
};