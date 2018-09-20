<template>
  <div class="container-fluid">
    <div class="storage">
      <div class="row">
        <template v-for="item in storage">
          <div class = "col-sm-3">
            <div class="card">
              <div class="card-header card-primary no-margin">{{item.sistFicheros}}</div>
              <div class="card blockl">
                <pie-chart :data="[['Espacio Usado (Gb)',item.espacioUsado],['Espacio Libre (Gb)',item.espacioLibre]]"/>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'storage',
  data() {
    return {
      storage: [],
      maxTamanio:0,
    };
  },
  methods: {
    getStorage() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/storage')
          .then((response) => {
            self.storage = response.data;
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
    this.getStorage();
  },
};
</script>
