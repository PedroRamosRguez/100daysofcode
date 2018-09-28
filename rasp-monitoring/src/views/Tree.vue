<template>
  <div class="container-fluid ">
      <div class = "row">
        <sl-vue-tree v-model="patata">
	  <template slot="title" slot-scope="{ node }">
	      <span class="item-icon">
	        <i class="fab fa-js-square" v-if="node.title[1] === '.js'"></i>
                <i class="fab fa-vuejs" v-if="node.title[1] === '.vue'"></i>
                <i class="fas fa-file-image" v-if="node.title[1] === '.png'"></i>
                <i class="fas fa-file-image" v-if="node.title[1] === '.jpg'"></i>
                <i class="fab fa-html5" v-if="node.title[1] === '.html'"></i>
                <i class="fab fa-css3" v-if="node.title[1] === '.css'"></i>
                <i class="fas fa-file-video" v-if="node.title[1] === '.mkv'"></i>
                <i class="fas fa-file-video" v-if="node.title[1] === '.mp4'"></i>
                <i class="fab fa-markdown" v-if="node.title[1] === '.md'"></i>
                <i class="fas fa-code" v-if="node.title[1] === '.json'"></i>
                <i class="fas fa-file-archive" v-if="node.title[1] === '.zip'"></i>
                <i class="fas fa-file-archive" v-if="node.title[1] === '.rar'"></i>
                <i class="fas fa-file-archive" v-if="node.title[1] === '.tar'"></i>
                <i class="fas fa-file-alt" v-if="node.title[1] === '.txt'"></i>
	        <i class="fa fa-folder" v-if="!node.isLeaf"></i>
	      </span>
	      {{ node.title[0] }}
    	  </template>
	</sl-vue-tree>

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
          //console.log(self.directorios);
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
          console.log(item);
	  item.title = [item.name,item.extension]
	  if(item.type === 'file'){
            item.isLeaf=true;
          }
          item.isSelected=false;
          if(item.type === 'directory'){
            item.isExpanded=true;
          }
          final.push(item);
          if(typeof item.children !== 'undefined' && item.children.length!=0){
            final.concat(self.parseDirectories(item.children));
          }  
        })
        console.log(final);
      }
      
      return final;
    }
  },
  created() {
    this.getTreeDirectory();
  },
  computed: {
    patata :{
      get: function(){
	console.log(this.directorios);
        return this.parseDirectories(this.directorios);
      },
      set:function(){
      }
    }
  }
};
</script>
