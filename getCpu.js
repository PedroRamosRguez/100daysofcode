const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function getCpu(){
  const { stdout,stderr } = await exec("top -b -n 1 | grep '%Cpu' | awk '{print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  console.log(`stdout : ${stdout}`);
  return stdout;
}
module.exports = { getCpu };

