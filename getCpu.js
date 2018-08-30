exec = require('child_process').exec

module.exports = function getCpu(){
  setInterval(function(){
    var porcentajeCpuUsado;
    child1 = exec("top -b -n 1 | grep '%Cpu' | awk '{print $2}'",function(error, stdout, stderr){
      porcentajeCpuUsado = stdout;
      console.log('porcentaje de uso de cpu; '+stdout+' %');
      console.log(stderr);
    });
   
  },5000)
};