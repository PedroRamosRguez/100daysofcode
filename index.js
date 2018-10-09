const express = require('express');
const morgan = require('morgan');
const getMem = require('./src/getMem');
const getCpu = require('./src/getCpu');
const getCpuTemperature = require('./src/getCpuTemperature');
const getGpuTemperature = require('./src/getGpuTemperature');
const getAlmacenamiento = require('./src/getStorage');
const getTreeDirectory = require('./src/tree');
const app = express();
let fileSyst,
    size,
    maxTamanio,
    usedSpace,
    freeSpace,
    sizePercentage;
let memory = { 
  'memTotal': 0,
  'memLibre': 0,
  'memUsada': 0,
  'porcentajeMemUsada': 0,
  'porcentajeMemLibre': 0
}
app.use(morgan('tiny'))

//header for connecting via localhost or ipaddress
app.use((req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//get request to get cpu percentage
app.get('/cpu', (req, res) => {
  getCpu.getCpu().then(function(respuesta){
    res.send(JSON.stringify(respuesta))
  },function(err){
    console.log(err);
  });
});

//get request to get gpu temperature information
app.get('/tempgpu', (req, res) => {
  getGpuTemperature.getGpuTemperature().then(function(response){
    res.send(JSON.stringify(response))
  },function(err){
    console.log(err);
  });
});

//get request to get cpu temperature information
app.get('/tempcpu', (req, res) => {
  getCpuTemperature.getCpuTemperature().then(function(response){
    res.send(JSON.stringify(response))
  },function(err){
    console.log(err);
  });
});

//get request to get the memory information
app.get('/mem', (req, res) => {
  Promise.all([getMem.getMemTotal(), getMem.getMemLibre()]).then(function(memResult){
    memory.memTotal = memResult[0]
    memory.memLibre = memResult[1]
    memory.memUsada = parseFloat(memory.memTotal - memory.memLibre).toFixed(3);
    memory.porcentajeMemUsada = Math.round(memory.memUsada*100/memory.memTotal);
    memory.porcentajeMemLibre = 100 - memory.porcentajeMemUsada;
    console.log(JSON.stringify(memory))
    res.send(JSON.stringify(memory))
  });
});

//get request to get the tree directory
app.get('/tree', (req, res) => {
  directories = [getTreeDirectory.getTreeDirectory()]
  directories.forEach((item)=>{
    item.title = item.name
    if(item.type === 'file'){
      item.extension = (item.name.split('.').slice(-1)).toString();
    }
  });
  directories = directories[0]
  res.send(JSON.stringify(directories));
});

//get request to get storage information
app.get('/storage', (req, res) => {
    storage = []
    fileSyst = getAlmacenamiento.getSistFichero()
    size = getAlmacenamiento.getTamanio()
    maxSize = getAlmacenamiento.getMaxTamanio()
    freeSpace = getAlmacenamiento.getEspacioLibre()
    usedSpace = getAlmacenamiento.getEspacioUsado()
    sizePercentage = getAlmacenamiento.getPorcentaje()
    var sdCardUsed=getAlmacenamiento.getTotalUsado();
    var sdCardFree=getAlmacenamiento.getTotalLibre();
    // var percentajeSdCard=0;
    Promise.all([fileSyst, size, freeSpace, usedSpace, sizePercentage,
                sdCardUsed, sdCardFree]).then(function(storageItem){
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

//post request to shutdown the raspberry pi when emergency button is pushed
app.post('/shutdown',(req, res) => {
  shutdown()
});

app.listen(3000, () => {
  console.log('Aplicación corriendo en el puerto 3000!');
});
