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
    <p style="color:red">{{store.store.state.count}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
 
</template>

<script>
const axios = require('axios');
const store = require('../store');
export default {
  name: 'temperature',
  data() {
    return {
      temperaturaCpu: [],
      temperaturaGpu: [],
      store:store,
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
    increment(){
      store.store.commit('increment');
      console.log(store.store.state)
      console.log(store.store.state.count)
      console.log(store.store.state.visibility)
    },
    decrement(){
      store.store.commit('decrement');
      console.log(store.store.state.count)

    },
    checkTemperature(){
      const self = this;
      setInterval(() => {
        if(store.store.state.count > 10){
          console.log('estoy en el if...')
          this.ocultar()
          console.log(store.store.state.visibility)
        }else{
          console.log('estoy en el else...')
          this.mostrar()
          console.log(store.store.state.visibility)
        }
      },5000)
      
    },
    ocultar(){
      store.store.commit('ocultar');
    },
    mostrar(){
      store.store.commit('mostrar');
    }
  },
  created() {
    this.getCpuTemperature();
    this.getGpuTemperature();
    this.checkTemperature();
    // if(store.store.state.count > 10){
    //   //console.log('estoy en el if...')
    //   // this.ocultar()
    //   // console.log(store.store.state.visibility)
    // }else{
    //   //console.log('estoy en el else...')
    //   // this.mostrar()
    //   // console.log(store.store.state.visibility)
    // }
  },
  computed:{
    count (){
      return store.getters.count
    },
  },
};
</script>
