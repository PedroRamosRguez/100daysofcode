const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function getCpuTemperatura(){
  const { stdout, stderr } = await exec("cat /sys/class/thermal/thermal_zone0/temp")
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return parseFloat(Math.round((stdout/1000) * 100) / 100)
}
module.exports = { getCpuTemperatura }