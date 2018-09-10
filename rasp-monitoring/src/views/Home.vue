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
    return { cpu: 0 };
  },
  methods: {
    patata() {
      console.log('llame al metodo...');
      self = this;
      setInterval(() => {
        axios.get('http://192.168.1.36:3000/cpu')
          .then((response) => {
            console.log('exito..');
            self.cpu = response.data;
          })
          .catch((error) => {
            console.log('error');
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 5000);
    },
  },
  created() { this.patata(); },
};
</script>
