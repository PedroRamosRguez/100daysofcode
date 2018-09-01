exec = require('child_process').exec

module.exports = function getAlmacenamiento(){
  setInterval(function(){
    var sistFicheros = [];
    var tamanio = [];
    var usado = [];
    var libre = [];
    var porcentajeUso = [];
    child1 = exec("df -h |awk '0+$5 > 0 {print $1}'",function(error, stdout, stderr){
      //slice elimina el ultimo elemento del array que es un ''	
      sistFicheros = stdout.split('\n').slice(0,-1);
      console.log('Sistema de ficheros: ' + sistFicheros);
    });
    child2 = exec("df -h |awk '0+$5 > 0 {print $2}'",function(error, stdout, stderr){
      //slice elimina el ultimo elemento del array que es un ''	
      tamanio = stdout.split('\n').slice(0,-1);
      console.log('Tamaño: ' + tamanio);
    });
    child3 = exec("df -h |awk '0+$5 > 0 {print $3}'",function(error, stdout, stderr){
      //slice elimina el ultimo elemento del array que es un ''	
      usado = stdout.split('\n').slice(0,-1);
      console.log('espacio usado: ' + usado);
    });
    child4 = exec("df -h |awk '0+$5 > 0 {print $4}'",function(error, stdout, stderr){
      //slice elimina el ultimo elemento del array que es un ''	
      libre = stdout.split('\n').slice(0,-1);
      console.log('Espacio libre:' + libre);
    });
    child5 = exec("df -h |awk '0+$5 > 0 {print $5}'",function(error, stdout, stderr){
      //slice elimina el ultimo elemento del array que es un ''	
      porcentajeUsado = stdout.split('\n').slice(0,-1);
      console.log('porcentaje Usado: ' + porcentajeUsado);
    });
  },5000)
};
