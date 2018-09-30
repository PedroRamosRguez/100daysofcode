const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getSistFichero(){
  const { stdout, stderr } = await exec ("df -h |awk '0+$5 > 0 {print $1}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
  sistFicheros = stdout.split('\n').slice(0,-1);
  return sistFicheros;
}

async function getTamanio(){
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $2}'");
  if(stderr){
    console.log(`error ${stderr}`);  
  }
  tamanio = stdout.split('\n').slice(0,-1);
  return tamanio;
}

async function getMaxTamanio(){
  var maxTamanio=0;
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

async function getEspacioUsado(){
  const { stdout, stderr } = await exec("df -h|awk '0+$5 > 0 {print $3}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  usado = stdout.split('\n').slice(0,-1);
  return usado
}

async function getTotalUsado(){
  var totalUsado=0;
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

async function getEspacioLibre(){
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $4}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  libre = stdout.split('\n').slice(0,-1);
  return libre
}

async function getTotalLibre(){
  var totalLibre=0;
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

async function getPorcentaje(){
  const { stdout, stderr } = await exec("df -h |awk '0+$5 > 0 {print $5}'");
  if(stderr){
    console.log(`error ${stderr}`);
  }
  porcentajeUsado = stdout.split('\n').slice(0,-1);
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
