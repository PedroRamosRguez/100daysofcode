const express = require('express');
const morgan = require('morgan');
const getMem = require('./src/getMem');
const getCpu = require('./src/getCpu');
const getCpuTemperature = require('./src/getCpuTemperature');
const getGpuTemperature = require('./src/getGpuTemperature');
const getStorage = require('./src/getStorage');
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
  'memFree': 0,
  'memUsed': 0,
  'percentageMemUsed': 0,
  'percentageMemFree': 0
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
  Promise.all([getMem.getMemTotal(), getMem.getMemFree()]).then(function(memResult){
    memory.memTotal = memResult[0]
    memory.memFree = memResult[1]
    memory.memUsed = parseFloat(memory.memTotal - memory.memFree).toFixed(3);
    memory.percentageMemUsed = Math.round(memory.memUsed*100/memory.memTotal);
    memory.percentageMemFree = 100 - memory.percentageMemUsed;
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
    fileSyst = getStorage.getFileSystem()
    size = getStorage.getSize()
    maxSize = getStorage.getMaxSize()
    freeSpace = getStorage.getFreeSpace()
    usedSpace = getStorage.getUsedSpace()
    sizePercentage = getStorage.getPercentage()
    let sdCardUsed=getStorage.getTotalUsed();
    let sdCardFree=getStorage.getTotalFree();
    let percentajeSdCard=0;
    Promise.all([fileSyst, size, freeSpace, usedSpace, sizePercentage,
                maxSize,sdCardUsed, sdCardFree]).then(function(storageItem){
      for(var i=0;i<storageItem[0].length; i++){
        storage.push(
          {
            'fileSystem': storageItem[0][i], 
            'size': storageItem[1][i].slice(0, -1),
            'spaceFree': storageItem[2][i].slice(0, -1),
            'spaceUsed':storageItem[3][i].slice(0, -1),
            'percentage': storageItem[4][i].slice(0, -1)
          }
        )
      }
      storage.push(
        {
          'fileSystem': 'SD Card',
          'size': storageItem[5],
          'spaceFree': parseInt(storageItem[7]),
          'spaceUsed': parseInt(storageItem[6]),
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
