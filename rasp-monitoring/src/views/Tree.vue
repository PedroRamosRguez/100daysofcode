<template>
  <div class="container-fluid">
      <div class = "row">
        {{ directorios }}
      </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'tree',
  data() {
    return {
      directorios: {},
    };
  },
  methods: {
    getTreeDirectory() {
      const self = this;
      axios.get('http://192.168.1.42:3000/tree')
        .then((response) => {
          self.directorios = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          console.log('SIEMPRE SSE EJECUTA ESTO..');
        });
    },
  },
  created() {
    this.getTreeDirectory();
  },
};
</script>
