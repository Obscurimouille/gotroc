import env from './services/env-service.js';
env.init();
import express from 'express';
import router from './routes/router.js';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ReqContext } from './providers/req-context.js';

const app = express();
const port = process.env.PORT || 3000;

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

app.use(router);
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`[*] Server is running at http://localhost:${port}`);
});
