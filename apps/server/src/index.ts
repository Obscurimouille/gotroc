import env from './services/env-service.js';
env.init();
import express from 'express';
import router from './routes/router.js';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ReqContext } from './providers/req-context.js';
import { delayMiddleware } from './middlewares/delay.js';

const app = express();
const port = env.get.PORT;

const corsOptions: CorsOptions = {
  origin: env.get.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use((req, _, next) => {
  req.context = new ReqContext();
  next();
});

app.use(delayMiddleware(200, { devOnly: true }), router);
app.use(delayMiddleware(200, { devOnly: true }), express.static('public'));

app.listen(port, () => {
  console.log(`[*] Server is running at http://localhost:${port}`);
});
