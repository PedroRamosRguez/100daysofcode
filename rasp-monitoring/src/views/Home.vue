<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br/>
    Esto es la  pagina de inicio...
    <p>Uso de la Cpu:{{usoCpu}}</p>
    <p>Temperatura de la Cpu:{{temperaturaCpu}}</p>
    <p>Temperatura de la Gpu:{{temperaturaGpu}}</p>
    <p>Cantidad de memoria RAM total:{{memTotal}}</p>
    <p>Cantidad de memoria RAM libre:{{memLibre}}</p>
    <p>Cantidad de memoria RAM usada:{{memUsada}}</p>
    <p>Cantidad de memoria RAM usada en Porcentaje:{{porcentajeMemLibre}} %</p>
    <p>Cantidad de memoria RAM usada en porcentaje:{{porcentajeMemUsada}} %</p>
  </div>

</template>

<script>
const axios = require('axios');

export default {
  name: 'home',
  data() {
    return {
      usoCpu: 0,
      temperaturaCpu: 0,
      temperaturaGpu: 0,
      memTotal: 0,
      memLibre: 0,
      memUsada: 0,
      porcentajeMemLibre: 0,
      porcentajeMemUsada: 0,
      // espacioLibre: 0,
      // espacioUsado: 0,
    };
  },
  methods: {
    getCpu() {
      const self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/cpu')
          .then((response) => {
            self.usoCpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 5000);
    },
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/tempcpu')
          .then((response) => {
            self.temperaturaCpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
    },
    getGpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/tempgpu')
          .then((response) => {
            self.temperaturaGpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
    },
    getMem() {
      const self = this;
      setInterval(() => {
        axios.get('http://localhost:3000/mem')
          .then((response) => {
            self.memTotal = response.data.memTotal;
            self.memLibre = response.data.memLibre;
            self.memUsada = response.data.memUsada;
            self.porcentajeMemLibre = response.data.porcentajeMemLibre;
            self.porcentajeMemUsada = response.data.porcentajeMemUsada;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
    },
  },
  created() {
    this.getCpu();
    this.getCpuTemperature();
    this.getGpuTemperature();
    this.getMem();
  },
};
</script>
