const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);


app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);







