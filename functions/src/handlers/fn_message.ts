import express from 'express';
import cors from 'cors';
import moment from 'moment';
import morgan from 'morgan';

//@ts-ignore
import morganBody from 'morgan-body';

import fbAdmin from "firebase-admin";
import { ExpressError } from '../types_rn/ExpressTypes';
type Firestore = fbAdmin.firestore.Firestore;

const bodyParser = require('body-parser');

module.exports = (functions: any, admin: any) => {
  const app = express();
  app.use(bodyParser.json());
  const fs: Firestore = admin.firestore();
  
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

  app.use(function (err: ExpressError, req: express.Request, res: express.Response, next: () => void) {
    console.log("error", err);
    if (err.status) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json({ status: 500, message: err.message });
  });



  //Get the latest n recordings from firebase
  app.get('/*', (req, res, next) => {
    let limit = 1;
    const {stringFormat} = req.query;
    if (req.query.limit) {
      limit = req.query.limit;
    }

  
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
      const urlString = messages[0].audioUrl;
      //TODO: undo this hacky lazyness
      // const urlString = messages.reduce((acc, curr, idx) => {
      //   if (idx === messages.length - 1) {
      //     return acc + curr.audioUrl + "\"";
      //   }

      //   return acc + curr.audioUrl + ','
      // }, '\"');
      return res.json({messages: urlString});
    });
  });

  app.post('/*', (req, res) => {
    const { body } = req;
    const { audioUrl, phone } = body;
    const createdAt = moment().toISOString();

    return fs.collection('messages').add({
      audioUrl,
      phone, 
      createdAt,
    })
    .then((ref: any) => {
      res.json({id: ref.id});
    });
  });

  return functions.https.onRequest(app);
};