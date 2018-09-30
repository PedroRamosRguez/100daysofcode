<template>
  <div class="container-fluid">
      <br/>
      <div class = "row">
        <div class="col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Uso de la Cpu</div>
            <div class="card-block">
              <line-chart :data="usoCpu"
                          :download="true"
                          download="Uso Cpu">
              </line-chart>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'cpu',
  data() {
    return {
      usoCpu: [],
    };
  },
  methods: {
    getCpu() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/cpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.usoCpu.push(value);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 5000);
    },
    
  },
  created() {
    this.getCpu();
  },
};
</script>
