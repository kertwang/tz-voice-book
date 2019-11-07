"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var moment_1 = __importDefault(require("moment"));
var morgan_1 = __importDefault(require("morgan"));
//@ts-ignore
var morgan_body_1 = __importDefault(require("morgan-body"));
var bodyParser = require('body-parser');
module.exports = function (functions, admin) {
    var app = express_1["default"]();
    app.use(bodyParser.json());
    var fs = admin.firestore();
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan_1["default"](':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morgan_body_1["default"](app);
    }
    /* CORS Configuration */
    var openCors = cors_1["default"]({ origin: '*' });
    app.use(openCors);
    app.use(function (err, req, res, next) {
        if (err.status) {
            return res.status(err.status).json(err);
        }
        return res.status(500).json({ status: 500, message: err.message });
    });
    //Get the latest n recordings from firebase
    app.get('/*', function (req, res, next) {
        var limit = 1;
        var stringFormat = req.query.stringFormat;
        if (req.query.limit) {
            limit = req.query.limit;
        }
        return fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
            .then(function (sn) {
            var messages = [];
            sn.forEach(function (doc) {
                //Get each document, put in the id
                var data = doc.data();
                data.id = doc.id;
                messages.push(data);
            });
            if (stringFormat !== 'true') {
                return res.json({ messages: messages });
            }
            //make a comma separated string of urls
            var urlString = messages[0].audioUrl;
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
    app.post('/*', function (req, res) {
        var body = req.body;
        var audioUrl = body.audioUrl, phone = body.phone;
        var createdAt = moment_1["default"]().toISOString();
        return fs.collection('messages').add({
            audioUrl: audioUrl,
            phone: phone,
            createdAt: createdAt
        })
            .then(function (ref) {
            res.json({ id: ref.id });
        });
    });
    return functions.https.onRequest(app);
};
