import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import config from './config';
import userRouter from './routers/userRouter';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error);
  });

// -----------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users' , userRouter)
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, ()=> {
  console.log('http://localhost:5000/');
});
