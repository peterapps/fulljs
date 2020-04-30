import express from 'express';
import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs'); // Effective JavaScript


import serverRender from './serverRender';

server.get(['/','/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
  .then(({initialMarkup, initialData}) => {
    res.render('index', {
      initialMarkup,
      initialData
    });
  })
  .catch(console.error);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express server listening on port', config.port);
});
