const express = require('express');
const morgan = require('morgan');
const getMem = require('./getMem.js');
const getCpu = require('./getCpu.js');
const getCpuTemperatura = require('./getCpuTemperatura.js');
const getGpuTemperatura = require('./getGpuTemperatura.js')
let app = express();
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  memoria = getMem()
  cpu = getCpu()
  temperaturaCpu = getCpuTemperatura();
  temperaturaGpu = getGpuTemperatura();
  res.send('Hola Mundo!');
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});