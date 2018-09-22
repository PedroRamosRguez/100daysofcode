/*const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function getTreeDirectory(){
  const { stdout,stderr } = await exec("tree -I 'node_modules|cache|bin|lib|test_*'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  console.log(typeof(stdout))
  console.log('soy getTree');
  console.log(`stdout : ${stdout}`);
  return stdout;
}
module.exports = { getTreeDirectory };*/


const dirTree = require('directory-tree');
function getTreeDirectory(){
  const filteredTree = dirTree('/home/pi/Documents', {exclude:[/node_modules/,/cache/,/bin/,/lib/,/test_*/,/.git\/*/,/\.([\w|\d]*\s*)/]});
  console.log(filteredTree);
  return filteredTree
}
module.exports = { getTreeDirectory };