import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
//@ts-ignore
import morganBody from 'morgan-body';

import admin from './routes/fn_admin'
import twiml from './routes/fn_twiml'
import health from './routes/health'
import ErrorHandler from './utils/ErrorHandler';

const app = express()
import { PORT } from './utils/Env'

/* Register Middleware */
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

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

/* TODO: auth middleware */

/* Register All Handlers */
app.use('/admin', admin)
app.use('/twiml', twiml)
app.use('/health', health)

/*
  TODO: add other handlers!
  - message?

*/

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`vb-server listening on port ${PORT}`))

