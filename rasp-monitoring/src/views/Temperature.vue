<template>
  <div class="container-fluid">
    <br/>
    <div class="temperature">
      <div class = "row">
        <div class="col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Cpu Temperature</div>
            <div class="card-block">
              <line-chart
                :data="cpuTemperature"
                :download="true"
                download="Cpu_temperature">
              </line-chart>
            </div>
          </div>
        </div>
        <div class="col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Gpu Temperature</div>
            <div class="card blockl">
              <line-chart
                :data="gpuTemperature"
                :download="true"
                download="Gpu_temperature">
              </line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const axios = require('axios');
const store = require('../store');
const addressFile = require('../assets/address.json');
const address = addressFile.eth == '' ? addressFile.wlan: address.eth
export default {
  name: 'temperature',
  data() {
    return {
      address: address,
      cpuTemperature: [],
      gpuTemperature: [],
      store: store,
    };
  },
  methods: {
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://'+address+':3000/tempcpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.cpuTemperature.push(value);
            self.checkTemperature(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
    getGpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://'+address+':3000/tempgpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.gpuTemperature.push(value);
          })
          .catch((error) => {
            console.log(error);
            self.checkTemperature();
          });
      }, 3000);
    },
    checkTemperature(temperature) {
      if (temperature < 80) {
        this.hide();
      } else {
        this.show();
      }
    },
    hide() {
      store.store.commit('hide');
    },
    show() {
      store.store.commit('show');
    },
  },
  created() {
    this.getCpuTemperature();
    this.getGpuTemperature();
  },
  computed: {
    count() {
      return store.getters.count;
    },
  },
};
</script>
