import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/router.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(router);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`[*] Server is running at http://localhost:${port}`);
});