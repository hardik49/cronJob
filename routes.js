const express =  require('express');

const {enableCronJob} = require('./controller/userController');
const app = express();

app.get('/hit', enableCronJob);

module.exports = app;