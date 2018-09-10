const express = require('express');
const morgan = require('morgan');
const getMem = require('./src/getMem');
const getCpu = require('./src/getCpu');
const getCpuTemperatura = require('./src/getCpuTemperatura');
const getGpuTemperatura = require('./src/getGpuTemperatura');
const getAlmacenamiento = require('./src/getAlmacenamiento');
const app = express();
var cpu, memTotal, memLibre, memUsada, porcentajeMemLibre, porcentajeMemUsada, temperaturaCpu, temperaturaGpu, sistFichero, tamanio, espacioUsado, espacioLibre, porcentajeAlmacenamiento;
app.use(morgan('tiny'))
//esto es para entorno desarrollo y que axios pueda obtener los datos desde el servidor...
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function (req, res) {
  //proximamente crear un objeto y devolverlo en la respuesta

  memTotal = getMem.getMemTotal()
  memLibre = getMem.getMemLibre()
  cpu = getCpu.getCpu()
  temperaturaCpu = getCpuTemperatura.getCpuTemperatura()
  temperaturaGpu = getGpuTemperatura.getGpuTemperatura()
  sistFichero = getAlmacenamiento.getSistFichero()
  tamanio = getAlmacenamiento.getTamanio()
  espacioLibre = getAlmacenamiento.getEspacioLibre()
  espacioUsado = getAlmacenamiento.getEspacioUsado()
  porcentajeAlmacenamiento = getAlmacenamiento.getPorcentaje()
  Promise.all([memTotal, memLibre, cpu, temperaturaCpu, temperaturaGpu, sistFichero, tamanio, espacioLibre, espacioUsado, porcentajeAlmacenamiento]).then(function(datos){
    memUsada = datos[0] - datos[1];
    porcentajeMemUsada = Math.round(memUsada*100/datos[0]);
    porcentajeMemLibre = 100 - porcentajeMemUsada;
    res.send(`Uso de cpu: ${ datos[2] }. <br/>
    Esto son los datos de la memoria. <br/>
    MemTotal: ${ datos[0] } Gb. <br/>
    MemLibre: ${ datos[1] } Gb. <br/>
    MemUsada: ${ memUsada }Gb. <br/>
    Porcentaje MemLibre: ${ porcentajeMemLibre } %.<br/>
    Porcentaje MemUsada: ${ porcentajeMemUsada } %.<br/>
    Temperatura de la CPu: ${ datos[3] } ºC. <br/>
    Temperatura de la GPu: ${ datos[4] } ºC. <br/>
    Sistema de ficheros: ${ datos[5] } <br/>
    Tamaño: ${ datos[6] }. <br/>
    Espacio Libre: ${  datos[7]}. <br/>
    Espacio usado: ${ datos[8] }. <br/>
    Porcentaje almacenamiento ${ datos[9] }. <br/>`);
  });
});
//ruta para obtener solo la informacion de la cpu.
app.get('/cpu', function (req, res) {
  
  getCpu.getCpu().then(function(respuesta){
    console.log('esto es respuesta:'+respuesta);
    cpu = JSON.stringify(respuesta);
    //res.send(`Uso de la CPu: ${cpu}`);
    res.send(cpu)
  },function(err){
    console.log(err);
  });
});

//ruta para obtener la informacion solo de la memoria
app.get('/mem', function(req, res) {
 
  Promise.all([getMem.getMemTotal(), getMem.getMemLibre()]).then(function(memResult){
    memTotal = memResult[0]
    memLibre = memResult[1]
    memUsada = memTotal - memLibre;
    porcentajeMemUsada = Math.round(memUsada*100/memTotal);
    porcentajeMemLibre = 100 - porcentajeMemUsada;
    res.send(` MemTotal: ${ memTotal } Gb. <br/>
    MemLibre: ${ memLibre } Gb. <br/>
    MemUsada: ${ memUsada }Gb. <br/>
    Porcentaje MemLibre: ${ porcentajeMemLibre } %.<br/>
    Porcentaje MemUsada: ${ porcentajeMemUsada } %.<br/>`)
  });
});

//ruta para obtener la temperatura de la gpu y la cpu
app.get('/temp',function(req,res) {
  temperaturaCpu = getCpuTemperatura.getCpuTemperatura()
  temperaturaGpu = getGpuTemperatura.getGpuTemperatura()
  Promise.all([temperaturaCpu, temperaturaGpu]).then(function(temperaturas){
    res.send(`Temperatura de la CPu: ${ temperaturas[0] } ºC. <br/>
    Temperatura de la GPu: ${ temperaturas[1] } ºC. <br/>`)
  });
});

//ruta para obtener el almacenamiento
app.get('/storage',function(req, res){
      sistFichero = getAlmacenamiento.getSistFichero()
      tamanio = getAlmacenamiento.getTamanio()
      espacioLibre = getAlmacenamiento.getEspacioLibre()
      espacioUsado = getAlmacenamiento.getEspacioUsado()
      porcentajeAlmacenamiento = getAlmacenamiento.getPorcentaje()
  Promise.all([sistFichero, tamanio, espacioLibre, espacioUsado, porcentajeAlmacenamiento]).then(function(storage){
    res.send(`Sistema de ficheros: ${ storage[0]} <br/>
      Tamaño: ${ storage[1] }. <br/>
      Espacio Libre: ${ storage[2] }. <br/>
      Espacio usado: ${ storage[3]}. <br/>
      Porcentaje almacenamiento ${ storage[4] }. <br/>`);  
  })
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});