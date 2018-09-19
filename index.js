const express = require('express');
const morgan = require('morgan');
const getMem = require('./src/getMem');
const getCpu = require('./src/getCpu');
const getCpuTemperatura = require('./src/getCpuTemperatura');
const getGpuTemperatura = require('./src/getGpuTemperatura');
const getAlmacenamiento = require('./src/getAlmacenamiento');
const app = express();
var cpu, gpu, temperaturaCpu, temperaturaGpu, sistFichero, tamanio, maxTamanio, espacioUsado, espacioLibre, porcentajeAlmacenamiento;
var memoria = { "memTotal": 0, "memLibre" : 0, "memUsada": 0, "porcentajeMemUsada": 0, "porcentajeMemLibre": 0 }
var storage = []
app.use(morgan('tiny'))
//esto es para entorno desarrollo y que axios pueda obtener los datos desde el servidor...
app.use(function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
  maxTamanio = getAlmacenamiento.getMaxTamanio()
  espacioLibre = getAlmacenamiento.getEspacioLibre()
  espacioUsado = getAlmacenamiento.getEspacioUsado()
  porcentajeAlmacenamiento = getAlmacenamiento.getPorcentaje()
  Promise.all([memTotal, memLibre, cpu, temperaturaCpu, temperaturaGpu, sistFichero, tamanio, maxTamanio, espacioLibre, espacioUsado, porcentajeAlmacenamiento]).then(function(datos){
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
    Maximo tamaño: ${ datos[7] }. <br/>
    Espacio Libre: ${  datos[8]}. <br/>
    Espacio usado: ${ datos[9] }. <br/>
    Porcentaje almacenamiento ${ datos[10] }. <br/>`);
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

app.get('/tempgpu', function (req, res) {
  
  getGpuTemperatura.getGpuTemperatura().then(function(respuesta){
    console.log('esto es respuesta:'+respuesta);
    temperaturaGpu = JSON.stringify(respuesta);
    //res.send(`Uso de la CPu: ${cpu}`);
    res.send(temperaturaGpu)
  },function(err){
    console.log(err);
  });
});
app.get('/tempcpu', function (req, res) {
  
  getCpuTemperatura.getCpuTemperatura().then(function(respuesta){
    console.log('esto es respuesta:'+respuesta);
    temperaturaCpu = JSON.stringify(respuesta);
    res.send(temperaturaCpu)
  },function(err){
    console.log(err);
  });
});
//ruta para obtener la informacion solo de la memoria
app.get('/mem', function(req, res) {
  Promise.all([getMem.getMemTotal(), getMem.getMemLibre()]).then(function(memResult){
    memoria.memTotal = memResult[0]
    memoria.memLibre = memResult[1]
    memoria.memUsada = parseFloat(memoria.memTotal - memoria.memLibre).toFixed(3);
    memoria.porcentajeMemUsada = Math.round(memoria.memUsada*100/memoria.memTotal);
    memoria.porcentajeMemLibre = 100 - memoria.porcentajeMemUsada;
    console.log(JSON.stringify(memoria))
    res.send(JSON.stringify(memoria))
  });
});

//ruta para obtener la temperatura de la gpu y la cpu
// app.get('/temp',function(req,res) {
//   temperaturaCpu = getCpuTemperatura.getCpuTemperatura()
//   temperaturaGpu = getGpuTemperatura.getGpuTemperatura()
//   Promise.all([temperaturaCpu, temperaturaGpu]).then(function(temperaturas){
//     res.send(`Temperatura de la CPu: ${ temperaturas[0] } ºC. <br/>
//     Temperatura de la GPu: ${ temperaturas[1] } ºC. <br/>`)
//   });
// });

//ruta para obtener el almacenamiento
app.get('/storage',function(req, res){
    storage = []
    sistFichero = getAlmacenamiento.getSistFichero()
    tamanio = getAlmacenamiento.getTamanio()
    maxTamanio = getAlmacenamiento.getMaxTamanio()
    espacioLibre = getAlmacenamiento.getEspacioLibre()
    espacioUsado = getAlmacenamiento.getEspacioUsado()
    porcentajeAlmacenamiento = getAlmacenamiento.getPorcentaje()
    var sdCardUsed=getAlmacenamiento.getTotalUsado();
    var sdCardFree=getAlmacenamiento.getTotalLibre();
    var percentajeSdCard=0;
    Promise.all([sistFichero, tamanio, espacioLibre, espacioUsado, porcentajeAlmacenamiento, maxTamanio,sdCardUsed, sdCardFree]).then(function(storageItem){
      for(var i=0;i<storageItem[0].length; i++){
        storage.push({"sistFicheros":storageItem[0][i], 
                      "tamanio":storageItem[1][i].slice(0, -1),
                      "espacioLibre":storageItem[2][i].slice(0, -1),
                      "espacioUsado":storageItem[3][i].slice(0, -1),
                      "porcentaje": storageItem[4][i].slice(0, -1)}
                    )
      }
      storage.push({"sistFicheros":"SD Card","tamanio":storageItem[5],"espacioLibre":parseInt(storageItem[7]),"espacioUsado":parseInt(storageItem[6]),"porcentaje":(storageItem[6]*100)/storageItem[2]});
      res.send(JSON.stringify(storage))
   })
});

app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});