import express from 'express';
import router from './src/back-end/routers';
import bodyParser from 'body-parser';
import db from './src/database';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3009;

app.set(db);
app.use('/', router);

app.use((req, res) => {
  return res
    .status(404)
    .json({ message: 'Não foi possível encontrar a página solicitada.' });
});

app.listen(`${port}`, () => {
  console.log(`>>>>> server run port: ${port}`);
});

export default app;