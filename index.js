const express = require('express');
const morgan = require('morgan');
const getMem = require('./getMem.js');
const getCpu = require('./getCpu.js');
const getCpuTemperatura = require('./getCpuTemperatura.js');
const getGpuTemperatura = require('./getGpuTemperatura.js');
const getAlmacenamiento = require('./getAlmacenamiento.js');
let app = express();
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  //proximamente crear un objeto y devolverlo en la respuesta
  var cpu=[];
  var memTotal;
  var memLibre;
  var memUsada;
  var porcentajeMemLibre;
  var porcentajeMemUsada;
  var promesa1 = getMem.getMemTotal().then(function(resolve){
    memTotal = resolve;
    console.log('esto es la memoria total:' + memTotal+'Gb')
  },function(err){
    console.log(err)
  });
  var promesa2 = getMem.getMemLibre().then(function(resolve){
    memLibre = resolve;
    console.log('esto es la memoria libre:' + memLibre+'Gb')
    
  },function(err){
    console.log(err)
  });
  var promesa3 = getCpu.getCpu().then(function(resolve){
     console.log('esto es respuesta: '+resolve);
     cpu.push(resolve);
     console.log('y esto es cpu:'+cpu);
 
  },function(err){
    console.log(err);
  });
  Promise.all([promesa1, promesa2, promesa3]).then(function(valores){
    memUsada = memTotal - memLibre;
    porcentajeMemUsada = Math.round(memUsada*100/memTotal);
    porcentajeMemLibre = 100 - porcentajeMemUsada;
    res.send('Dato de cpu:'+cpu+'%<br/>Esto los datos de la memoria.<br/> MemTotal: '+memTotal+'Gb<br/>MemLibre:'+memLibre+'<br/>MemUsada:'+memUsada+'Gb<br/>%memLibre:'+porcentajeMemLibre+'%<br/> %MemUsada:'+porcentajeMemUsada+'%<br/>')
  });
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});