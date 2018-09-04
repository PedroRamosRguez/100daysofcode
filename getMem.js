const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getMemTotal(){
  const { stdout, stderr } = await exec("awk '/MemTotal/ { print $2/1048576 }' /proc/meminfo");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return stdout;
}

async function getMemLibre(){
  const {stdout, stderr } = await exec("awk '/MemFree/ {print $2/1048576 }' /proc/meminfo");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return stdout;
}

module.exports = { getMemTotal, getMemLibre }