"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as validate from 'express-validation';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
//@ts-ignore
const morgan_body_1 = __importDefault(require("morgan-body"));
const bodyParser = require('body-parser');
module.exports = (functions, admin) => {
    const app = express_1.default();
    app.use(bodyParser.json());
    const fs = admin.firestore();
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morgan_body_1.default(app);
    }
    /* CORS Configuration */
    const openCors = cors_1.default({ origin: '*' });
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
        let limit = 1;
        const { stringFormat } = req.query;
        if (req.query.limit) {
            limit = req.query.limit;
        }
        return fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
            .then(sn => {
            const messages = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const data = doc.data();
                data.id = doc.id;
                messages.push(data);
            });
            if (stringFormat !== 'true') {
                return res.json({ messages });
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
            return res.json({ messages: urlString });
        });
    });
    app.post('/*', (req, res) => {
        const { body } = req;
        const { audioUrl, phone } = body;
        const createdAt = moment_1.default().toISOString();
        return fs.collection('messages').add({
            audioUrl,
            phone,
            createdAt,
        })
            .then((ref) => {
            res.json({ id: ref.id });
        });
    });
    return functions.https.onRequest(app);
};
