<template>
  <div class="container-fluid">
    <br/>
    <div class="temperature">
      <div class = "row">
        <div class="col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Cpu</div>
            <div class="card-block"><line-chart :data="temperaturaCpu" :download="true" download="Temperatura Cpu"></line-chart></div>
          </div>
        </div>
        <div class="col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Gpu</div>
            <div class="card blockl"><line-chart :data="temperaturaGpu" :download="true" download="Temperatura Gpu"></line-chart></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'temperature',
  data() {
    return {
      temperaturaCpu: [],
      temperaturaGpu: [],
    };
  },
  methods: {
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempcpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.temperaturaCpu.push(value);
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
        axios.get('http://192.168.1.42:3000/tempgpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.temperaturaGpu.push(value);
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
    this.getCpuTemperature();
    this.getGpuTemperature();
  },
};
</script>
