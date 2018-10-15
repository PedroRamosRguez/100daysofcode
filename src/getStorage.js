const util = require('util');
const exec = util.promisify(require('child_process').exec);

const getFileSystem = async () => {
  const { stdout, stderr } = await exec ("df -h |awk '0+$5 > 0 {print $1}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
  const fileSystem = stdout.split('\n').slice(0,-1);
  return fileSystem;
}

const getSize = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  const size = stdout.split('\n').slice(0,-1);
  return size;
}

const getMaxSize = async () => {
  let maxSize=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  let size = stdout.split('\n').slice(1,-1);
  for(var i=0; i< size.length; i++){
   maxSize +=parseInt(size[i]);
  }
  return Math.round(maxSize*1e-06)
}

const getUsedSpace = async () => {
  const { stdout, stderr } = await exec("df -h|awk '0+$5 > 0 {print $3}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  const usedSpace = stdout.split('\n').slice(0,-1);
  return usedSpace
}

const getTotalUsed = async () => {
  let totalUsed=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $3}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  let size = stdout.split('\n').slice(1,-1);
  for(var i=0; i< size.length; i++){
   totalUsed +=parseInt(size[i]);
  }
  return Math.round(totalUsed*1e-06)
}

const getFreeSpace = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $4}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  let freeSpace = stdout.split('\n').slice(0,-1);
  return freeSpace
}

const getTotalFree = async () => {
  let totalFree=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $4}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  let size = stdout.split('\n').slice(1,-1);
  for(var i=0; i< size.length; i++){
   totalFree +=parseInt(size[i]);
  }
  return Math.round(totalFree*1e-06)
}

const getPercentage = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $5}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  const percentageUsed = stdout.split('\n').slice(0,-1);
  return percentageUsed
}

module.exports = {
  getFileSystem,
  getSize,
  getMaxSize,
  getUsedSpace,
  getTotalUsed,
  getFreeSpace,
  getTotalFree,
  getPercentage
}
