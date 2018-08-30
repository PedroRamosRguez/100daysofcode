exec = require('child_process').exec

module.exports = function getMem(){
  setInterval(function(){
    var memoriaTotal;
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
};