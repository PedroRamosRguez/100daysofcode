const express = require('express');
const morgan = require('morgan');
const getMem = require('./getMem.js');
const getCpu = require('./getCpu.js');
const getCpuTemperatura = require('./getCpuTemperatura.js');
const getGpuTemperatura = require('./getGpuTemperatura.js');
const getAlmacenamiento = require('./getAlmacenamiento.js');
const app = express();
var cpu=[];
var memTotal, memLibre, memUsada, porcentajeMemLibre, porcentajeMemUsada, temperaturaCpu, temperaturaGpu, sistFichero, tamanio, espacioUsado, espacioLibre, porcentajeAlmacenamiento;
app.use(morgan('tiny'))
app.get('/', function (req, res) {
  //proximamente crear un objeto y devolverlo en la respuesta
  
  var promesa1 = getMem.getMemTotal().then(function(resultado){
    memTotal = resultado;
    console.log('esto es la memoria total:' + memTotal+'Gb')
  },function(err){
     console.log(err)
  });

  var promesa2 = getMem.getMemLibre().then(function(resultado){
    memLibre = resultado;
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

  var promesa4 = getCpuTemperatura.getCpuTemperatura().then(function(resultado){
    temperaturaCpu = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa5 = getGpuTemperatura.getGpuTemperatura().then(function(resultado){
    temperaturaGpu = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa6 = getAlmacenamiento.getSistFichero().then(function(resultado){
    sistFichero = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa7 = getAlmacenamiento.getTamanio().then(function(resultado){
    tamanio = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa8 = getAlmacenamiento.getEspacioLibre().then(function(resultado){
    espacioLibre = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa9 = getAlmacenamiento.getEspacioUsado().then(function(resultado){
    espacioUsado = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa10 = getAlmacenamiento.getPorcentaje().then(function(resultado){
    porcentajeAlmacenamiento = resultado;
  },function(err){
     console.log(err); 
  })
  
  Promise.all([promesa1,promesa2, promesa3, promesa4, promesa5, promesa6, promesa7, promesa8, promesa9, promesa10]).then(function(){
    memUsada = memTotal - memLibre;
    porcentajeMemUsada = Math.round(memUsada*100/memTotal);
    porcentajeMemLibre = 100 - porcentajeMemUsada;
    res.send(`Uso de cpu: ${ cpu }. <br/>
    Esto son los datos de la memoria. <br/>
    MemTotal: ${ memTotal } Gb. <br/>
    MemLibre: ${ memLibre } Gb. <br/>
    MemUsada: ${ memUsada }Gb. <br/>
    Porcentaje MemLibre: ${ porcentajeMemLibre } %.<br/>
    Porcentaje MemUsada: ${ porcentajeMemUsada } %.<br/>
    Temperatura de la CPu: ${ temperaturaCpu } ºC. <br/>
    Temperatura de la GPu: ${ temperaturaGpu } ºC. <br/>
    Sistema de ficheros: ${ sistFichero } <br/>
    Tamaño: ${ tamanio }. <br/>
    Espacio Libre: ${ espacioLibre}. <br/>
    Espacio usado: ${ espacioUsado }. <br/>
    Porcentaje almacenamiento ${ porcentajeAlmacenamiento }. <br/>`);
  });
});

//ruta para obtener solo la informacion de la cpu.
app.get('/cpu', function (req, res) {
  getCpu.getCpu().then(function(resolve){
    console.log('esto es respuesta: '+resolve);
    cpu.push(resolve);
    console.log('y esto es cpu:'+cpu);
 },function(err){
    console.log(err);
 });
 res.send(`Uso de la CPu: ${cpu}`);
});

//ruta para obtener la informacion solo de la memoria
app.get('/mem', function(req, res) {
  var promesa1 = getMem.getMemTotal().then(function(resultado){
    memTotal = resultado;
    console.log('esto es la memoria total:' + memTotal+'Gb')
  },function(err){
     console.log(err)
  });

  var promesa2 = getMem.getMemLibre().then(function(resultado){
    memLibre = resultado;
    console.log('esto es la memoria libre:' + memLibre+'Gb')
    
  },function(err){
     console.log(err)
  });
  Promise.all([promesa1, promesa2]).then(function(){
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
  var promesa1 = getCpuTemperatura.getCpuTemperatura().then(function(resultado){
    temperaturaCpu = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa2 = getGpuTemperatura.getGpuTemperatura().then(function(resultado){
    temperaturaGpu = resultado;
  },function(err){
     console.log(err); 
  })
  Promise.all([promesa1, promesa2]).then(function(){
    res.send(`Temperatura de la CPu: ${ temperaturaCpu } ºC. <br/>
    Temperatura de la GPu: ${ temperaturaGpu } ºC. <br/>`)
  });
});

//ruta para obtener el almacenamiento
app.get('/storage',function(req, res){
  var promesa1 = getAlmacenamiento.getSistFichero().then(function(resultado){
    sistFichero = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa2 = getAlmacenamiento.getTamanio().then(function(resultado){
    tamanio = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa3 = getAlmacenamiento.getEspacioLibre().then(function(resultado){
    espacioLibre = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa4 = getAlmacenamiento.getEspacioUsado().then(function(resultado){
    espacioUsado = resultado;
  },function(err){
     console.log(err); 
  })

  var promesa5 = getAlmacenamiento.getPorcentaje().then(function(resultado){
    porcentajeAlmacenamiento = resultado;
  },function(err){
     console.log(err); 
  })
  Promise.all([promesa1, promesa2, promesa3, promesa4, promesa5]).then(function(){
    res.send(`Sistema de ficheros: ${ sistFichero } <br/>
      Tamaño: ${ tamanio }. <br/>
      Espacio Libre: ${ espacioLibre}. <br/>
      Espacio usado: ${ espacioUsado }. <br/>
      Porcentaje almacenamiento ${ porcentajeAlmacenamiento }. <br/>`);  
  })
});
app.listen(3000, function () {
  console.log('Aplicación corriendo en el puerto 3000!');
});