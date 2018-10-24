const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getCpu = async () => {
  const { stdout,stderr } = await exec("top -b -n 1 | grep '%Cpu' | awk '{print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return stdout;
}
module.exports = { getCpu };

