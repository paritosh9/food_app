import express from 'express';
import fs from 'fs';

import DAOFactory from './dao/dao_factory.js';
import chefsRouter from './routes/chefs.js';

const startServer = () => {
  const SERVER_PORT = 10000;
  const CFG_FILE = 'src/cfg.json';

  // Setup middleware.
  const app = express();
  app.use(express.static('src/public'));
  app.use((req, res, next) => {
    console.log(`\n${req.method} ${req.url}`);
    next();
  });
  app.use(chefsRouter);

  const cfg = JSON.parse(fs.readFileSync(CFG_FILE));
  DAOFactory.init(cfg);

  app.listen(SERVER_PORT, () => {
    console.log('Listening ...');
  });
};

startServer();

