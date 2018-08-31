exec = require('child_process').exec

module.exports = function getCpuTemperatura(){
var temperaturaCpu = [];  
  setInterval(function(){
    child1 = exec("cat /sys/class/thermal/thermal_zone0/temp",function(error, stdout, stderr){       
      temperaturaCpu.push(parseFloat(Math.round((stdout/1000) * 100) / 100));
      console.log('temperatura CPu: '+temperaturaCpu);
    });
  },5000)
};
