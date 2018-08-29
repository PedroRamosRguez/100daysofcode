exec = require('child_process').exec
function getMem(){
  setInterval(function(){
    var memTotal;
    child1 = exec("awk '/MemTotal/ { print $2/1048576 }' /proc/meminfo",function(error, stdout, stderr){
      memoriaTotal = stdout;
    });
    
    child2 = exec("awk '/MemFree/ {print $2/1048576 }' /proc/meminfo", function(errror, stdout, stderr){
      memoriaLibre = stdout;
      memoriaUsada = memoriaTotal - memoriaLibre;
      porcentajeMemUsada = Math.round(memoriaUsada*100/memoriaTotal);
      porcentajeMemLibre = 100 - porcentajeMemUsada;
      console.log('memoria total en gb: '+memoriaTotal);
      console.log('memoria libre en gb: '+memoriaLibre);
      console.log('memoria usada en gb: '+memoriaUsada);
      console.log('porcentaje memoria usada: '+porcentajeMemUsada);
      console.log('porcentaje memoria libre: '+porcentajeMemLibre); 
    });
  },5000)
}
const express = require('express');
const morgan = require('morgan')
let app = express();
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  prueba = getMem()
  console.log(prueba)
  res.send('Hola Mundo!');
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});