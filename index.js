const express = require('express');
const morgan = require('morgan')
let app = express();
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});
