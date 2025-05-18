import { startServer, stopServer } from '@anmiles/express-tools';
import express from 'express';

const app = express();
app.use(express.static('dist'));
startServer(app, { open: true }).catch(stopServer);
