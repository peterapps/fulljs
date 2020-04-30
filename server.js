import express from 'express';
import config from './config';
import apiRouter from './api';

const server = express();

server.set('view engine', 'ejs'); // Effective JavaScript

server.get('/', (req, res) => {
  res.render('index', {
    content: 'This is the content I am passing along'
  });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info('Express server listening on port', config.port);
});
