const util = require('util');
const exec = util.promisify(require('child_process').exec);

const shutdown = async () => {
  const { stdout, stderr } = await exec("shutdown -h 1");
  if(stderr){
    console.log(`error ${stderr}`);
  }
}

module.exports = { shutdown };