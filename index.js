
'use strict';

require('dotenv').config();

const PORT = process.env.PORT;
const server = require('./src/app.js');

server.start(PORT);