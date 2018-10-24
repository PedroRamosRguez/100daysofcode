const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getGpuTemperature = async () => {
  const { stdout, stderr } = await exec("/opt/vc/bin/vcgencmd measure_temp | sed 's/[^0-9.]//g'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return parseFloat(stdout);
}
module.exports = { getGpuTemperature };