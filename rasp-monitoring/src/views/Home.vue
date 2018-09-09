<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"><br/>
    Esto es la  pagina de inicio...
    {{count}}
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return { count: 0 };
  },
  methods: {
    patata() { 
      console.log('patata');
      this.count+=1;
    },
    
  },
  created() { this.patata(); },
};
</script>
