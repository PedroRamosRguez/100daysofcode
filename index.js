const express = require('express');
const morgan = require('morgan');
const getMem = require('./getMem.js');
const getCpu = require('./getCpu.js');
let app = express();
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  memoria = getMem()
  cpu = getCpu()
  console.log(memoria)
  console.log(cpu);
  res.send('Hola Mundo!');
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});