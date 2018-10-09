const util = require('util');
const exec = util.promisify(require('child_process').exec);

const shutdown = async () => {
  const { stdout, stderr } = await exec("shutdown -h now");
  if(stderr){
    console.log(`error ${stderr}`);
  }
}