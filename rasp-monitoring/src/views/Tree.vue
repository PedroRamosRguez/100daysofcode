<template>
  <div class="container-fluid">
      <div class = "row">
        <sl-vue-tree v-model="patata"/>
      </div>
  </div>

</template>
<script>
const axios = require('axios');

export default {
  name: 'tree',
  data() {
    return {
      directorios: [],
    };
  },
  methods: {
    getTreeDirectory() {
      const self = this;
      axios.get('http://192.168.1.42:3000/tree')
        .then((response) => {
          self.directorios = response.data.children;
          
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          console.log('SIEMPRE SSE EJECUTA ESTO..');
        });
    },
    parseDirectories(directorio){
      var final = []
      var self = this
      if(directorio != null){
        directorio.forEach((item)=>{
	  item.title = item.name
	  if(item.type === 'file'){
            item.isLeaf=true;
          }
          final.push(item);
          if(typeof item.children !== 'undefined' && item.children.length!=0){
            final.concat(self.parseDirectories(item.children));
          }  
        })
      }
      return final;
    }
  },
  created() {
    this.getTreeDirectory();
  },
  computed: {
    patata : function(){
      return this.parseDirectories(this.directorios);  
    }
  }
};
</script>
