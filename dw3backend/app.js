const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

console.log('--- INICIANDO SERVIDOR ---');
console.log('CONECTANDO AO BANCO:', process.env.DB_NAME, 'EM', process.env.DB_HOST);

const router = require('./routes/router');
 
const app = express();
const port = 40000;

app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.json());

//@ Utiliza o routerApp configurado em ./routes/route.js
app.use(router);



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})