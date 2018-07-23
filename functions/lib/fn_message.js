"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const moment = require("moment");
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
    //Get the latest n recordings from firebase
    app.get('/*', (req, res, next) => {
        const limit = 1;
        return fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
            .then(sn => {
            const messages = [];
            sn.forEach(doc => {
                //Get each document, put in the id
                const data = doc.data();
                data.id = doc.id;
                messages.push(data);
            });
            res.json(messages);
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
            res.json({ id: ref.id });
        });
    });
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_message.js.map