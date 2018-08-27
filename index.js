const express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});
