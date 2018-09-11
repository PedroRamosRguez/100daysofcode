<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br/>
    Esto es la  pagina de inicio...
    <p>Uso de la cpu:{{cpu}}</p>
  </div>

</template>

<script>
const axios = require('axios');

export default {
  name: 'home',
  data() {
    return { 
      temperaturaCpu: 0, 
      temperaturaGpu:0,
      memTotal:0,
      memLibre:0,
      memUsada:0,
      porcentajeMemLibre:0,
      porcentajeMemUsada:0,
      //espacioLibre:0,
      //espacioUsado:0,
    };
  },
  methods: {
    getCpu() {
      self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/cpu')
          .then((response) => {
            self.temperaturaCpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 5000);
    },
    getGpu() {
      self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/gpu')
          .then((response) => {
            self.temperaturaGpu = response
          })
          .catch((error) => {
            console.log(error)
          })
          .then(() => {
            console.log('siempre se ejecuta esto...')
          })
        },5000);
    },
    getMem() {
      self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/storage')
          .then((response) => {
            self.memTotal = response.memTotal
            self.memLibre = response.memLibre
            self.memUsada = response.memUsada
            self.porcentajeMemLibre = response.porcentajeMemLibre
            self.porcentajeMemUsada = response.porcentajeMemUsada
          })
          .catch((error) => {
            console.log(error)
          })
          .then(() => {
            console.log('siempre se ejecuta esto...')
          })
        },5000);
    },
  },
  created() { this.getCpu(); },
};
</script>
