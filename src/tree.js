const PATH = require('path')
const dirTree = require('directory-tree');
const getTreeDirectory = () => {
  //exclude:[/node_modules/,/cache/,/bin/,/lib/,/test_*/,/.git\/*/,/\.([\w|\d]*\s*)/]}
  const filteredTree = dirTree('/home/pi/Documents',{exclude:[/node_modules/,/.git\/*/,/^\.\w*/]});
  console.log(filteredTree)
  return filteredTree
}
module.exports = { getTreeDirectory };