<template>
  <div class="container-fluid">
      <br/>
      <div class = "row">
        <div class="col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Cpu Use</div>
            <div class="card-block">
              <line-chart
                :data="cpuUse"
                :download="true"
                download="Cpu_use">
              </line-chart>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
const addressFile = require('../assets/address.json');
const address = addressFile.eth == '' ? addressFile.wlan: address.eth
export default {
  name: 'cpu',
  data() {
    return {
      cpuUse: [],
      address: address
    };
  },
  methods: {
    getCpu() {
      const self = this;
      setInterval(() => {
        axios.get('http://'+address+':3000/cpu')
          .then((response) => {
            const value = [new Date(), parseFloat(response.data)];
            self.cpuUse.push(value);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
  },
  created() {
    this.getCpu();
  },
};
</script>
