const util = require('util');
const exec = util.promisify(require('child_process').exec);

const getSistFichero = async () => {
  const { stdout, stderr } = await exec ("df -h |awk '0+$5 > 0 {print $1}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
  const sistFicheros = stdout.split('\n').slice(0,-1);
  return sistFicheros;
}

const getTamanio = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  const tamanio = stdout.split('\n').slice(0,-1);
  return tamanio;
}

const getMaxTamanio = async () => {
  let maxTamanio=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  tamanio = stdout.split('\n').slice(1,-1);
  for(var i=0; i< tamanio.length; i++){
   maxTamanio+=parseInt(tamanio[i]);
  }
  return Math.round(maxTamanio*1e-06)
}

const getEspacioUsado = async () => {
  const { stdout, stderr } = await exec("df -h|awk '0+$5 > 0 {print $3}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  const usado = stdout.split('\n').slice(0,-1);
  return usado
}

const getTotalUsado = async () => {
  let totalUsado=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $3}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  tamanio = stdout.split('\n').slice(1,-1);
  for(var i=0; i< tamanio.length; i++){
   totalUsado+=parseInt(tamanio[i]);
  }
  return Math.round(totalUsado*1e-06)
}

const getEspacioLibre = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $4}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  let libre = stdout.split('\n').slice(0,-1);
  return libre
}

const getTotalLibre = async () => {
  let totalLibre=0;
  const { stdout, stderr } = await exec("df |awk '0+$5 >= 0 {print $4}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  tamanio = stdout.split('\n').slice(1,-1);
  for(var i=0; i< tamanio.length; i++){
   totalLibre+=parseInt(tamanio[i]);
  }
  return Math.round(totalLibre*1e-06)
}

const getPorcentaje = async () => {
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $5}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  const porcentajeUsado = stdout.split('\n').slice(0,-1);
  return porcentajeUsado
}

module.exports = {
  getSistFichero,
  getTamanio,
  getMaxTamanio,
  getEspacioUsado,
  getTotalUsado,
  getEspacioLibre,
  getTotalLibre,
  getPorcentaje
}
