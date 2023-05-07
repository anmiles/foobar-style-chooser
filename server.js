const path    = require('path');
const express = require('express');
const open    = require('open');

const port = process.env.PORT || 0;
const app  = express();

app.use(express.static(path.resolve('dist')));

const server = app.listen(port);

console.log(`Server started at http://localhost:${server.address().port}`);
open(`http://localhost:${server.address().port}`);
