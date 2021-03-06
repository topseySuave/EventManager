import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import eventRouter from './routes/event-routes';
import centerRouter from './routes/center-routes';

const port = process.env.PORT || 8088; // port which server runs on
const app = express(); // init express

//= ========MIDDLEWARE=====================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//= ==================ROUTER=================

app.use('/v1/', centerRouter);
app.use('/v1/', eventRouter);

app.use('/', (req, res) => {
  res.status(200).send('Welcome to my Event Manager route');
});

//= ======== DEFAULT ROUTE==========
app.use((req, res) => {
  // Invalid request
  res.status(404).json({
    error: {
      name: 'Error',
      message: 'Invalid URL Request'
    }
  });
});


app.listen(port, () => {
  console.log('Server running on port', port);
});
export default app;