"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
//@ts-ignore
var morgan_body_1 = __importDefault(require("morgan-body"));
var fn_admin_1 = __importDefault(require("./routes/fn_admin"));
var fn_twiml_1 = __importDefault(require("./routes/fn_twiml"));
var health_1 = __importDefault(require("./routes/health"));
var ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
var app = express_1["default"]();
var Env_1 = require("./utils/Env");
/* Register Middleware */
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
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
/* TODO: auth middleware */
/* Register All Handlers */
app.use('/admin', fn_admin_1["default"]);
app.use('/twiml', fn_twiml_1["default"]);
app.use('/health', health_1["default"]);
/*
  TODO: add other handlers!
  - message?

*/
app.use(ErrorHandler_1["default"]);
app.listen(Env_1.PORT, function () { return console.log("vb-server listening on port " + Env_1.PORT); });
