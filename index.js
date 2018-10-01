const express = require('express');
const morgan = require('morgan');
const getMem = require('./src/getMem');
const getCpu = require('./src/getCpu');
const getCpuTemperatura = require('./src/getCpuTemperatura');
const getGpuTemperatura = require('./src/getGpuTemperatura');
const getAlmacenamiento = require('./src/getAlmacenamiento');
const getTreeDirectory = require('./src/tree');
const app = express();
let sistFichero,
    tamanio,
    maxTamanio,
    espacioUsado,
    espacioLibre,
    porcentajeAlmacenamiento;
let memoria = { 
  'memTotal': 0,
  'memLibre': 0,
  'memUsada': 0,
  'porcentajeMemUsada': 0,
  'porcentajeMemLibre': 0
}
app.use(morgan('tiny'))

//esto es para entorno desarrollo y que axios pueda obtener los datos desde el servidor...
app.use((req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//ruta para obtener solo la informacion de la cpu.
app.get('/cpu', (req, res) => {
  getCpu.getCpu().then(function(respuesta){
    res.send(JSON.stringify(respuesta))
  },function(err){
    console.log(err);
  });
});

//ruta para obtener la información sobre la temperatura de la gpu
app.get('/tempgpu', (req, res) => {
  getGpuTemperatura.getGpuTemperatura().then(function(respuesta){
    res.send(JSON.stringify(respuesta))
  },function(err){
    console.log(err);
  });
});

//ruta para obtener la información sobre la temperatura de la cpu
app.get('/tempcpu', (req, res) => {
  getCpuTemperatura.getCpuTemperatura().then(function(respuesta){
    res.send(JSON.stringify(respuesta))
  },function(err){
    console.log(err);
  });
});

//ruta para obtener la informacion solo de la memoria
app.get('/mem', (req, res) => {
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

//ruta para obtener el arbol de directorios de documentos
app.get('/tree', (req, res) => {
  directorios = [getTreeDirectory.getTreeDirectory()]
  directorios.forEach((item)=>{
    item.title = item.name
    if(item.type === 'file'){
      item.extension = (item.name.split('.').slice(-1)).toString();
    }
  });
  directorios = directorios[0]
  res.send(JSON.stringify(directorios));
});

//ruta para obtener el almacenamiento
app.get('/storage', (req, res) => {
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
    Promise.all([sistFichero, tamanio, espacioLibre, espacioUsado, porcentajeAlmacenamiento,
                 maxTamanio,sdCardUsed, sdCardFree]).then(function(storageItem){
      for(var i=0;i<storageItem[0].length; i++){
        storage.push(
          {
            'sistFicheros': storageItem[0][i], 
            'tamanio': storageItem[1][i].slice(0, -1),
            'espacioLibre': storageItem[2][i].slice(0, -1),
            'espacioUsado':storageItem[3][i].slice(0, -1),
            'porcentaje': storageItem[4][i].slice(0, -1)
          }
        )
      }
      storage.push(
        {
          'sistFicheros': 'SD Card',
          'tamanio': storageItem[5],
          'espacioLibre': parseInt(storageItem[7]),
          'espacioUsado': parseInt(storageItem[6]),
          'porcentaje': (storageItem[6]*100)/storageItem[2]
        }
      );
      res.send(JSON.stringify(storage))
   })
});

app.listen(3000, () => {
  console.log('Aplicación corriendo en el puerto 3000!');
});
