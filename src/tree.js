/*const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function getTreeDirectory(){
  const { stdout,stderr } = await exec("tree -I 'node_modules|cache|bin|lib|test_*'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  return stdout;
}

module.exports = { getTreeDirectory };*/

const PATH = require('path')
const dirTree = require('directory-tree');
function getTreeDirectory(){
  //exclude:[/node_modules/,/cache/,/bin/,/lib/,/test_*/,/.git\/*/,/\.([\w|\d]*\s*)/]}
  const filteredTree = dirTree('/home/pi/Documents',{exclude:[/node_modules/,/.git\/*/,/^\.\w*/]});
  console.log(filteredTree)
  return filteredTree
}
module.exports = { getTreeDirectory };