exec = require('child_process').exec

module.exports = function getGpuTemperatura(){
  var temperaturaGpu = []; 
  setInterval(function(){
    child1 = exec("/opt/vc/bin/vcgencmd measure_temp | sed 's/[^0-9.]//g'",function(error, stdout, stderr){
      temperaturaGpu.push(parseFloat(stdout));
      console.log('temperaturaGpu:' + temperaturaGpu);
    });
  },5000)
};