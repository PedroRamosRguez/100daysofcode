<template>
  <div class="container-fluid">
      <div class = "row">
        {{ directorios }}
        <sl-vue-tree v-model="directorios"/>
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
      nodes: [
               {title: 'Item1', isLeaf: true},
	       {title: 'Item2', isLeaf: true, data: { visible: false }},
	       {title: 'Folder1'},
	       {
	         title: 'Folder2', isExpanded: true, children: [
	           {title: 'Item3', isLeaf: true},
	           {title: 'Item4', isLeaf: true}
	         ]
	       }
             ],
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
          this.parseDirectories(self.directorios);
          /*if(self.directorios!=null){
            for(let i=0;i<self.directorios.length;i++){
              const elemento = self.directorios[i];
              self.directorios[i].title = elemento.name;
	      if(elemento.type === 'file'){
                //añadir como nodo hoja...
                self.directorios[i].isLeaf=true;
              }
              console.log(elemento)
              if(elemento.children !=null){
                if(elemento.children.length >0){
                  this.parseDirectories(self.directorios);
                }
              }
            }
          } */ 
        });
    },
    parseDirectories(directorios){
      console.log('llame al parser');
      const self = this;
      //console.log(directorios);
      if(directorios!=null){
        for(let i=0;i<directorios.length;i++){
          const elemento = directorios[i];
          //console.log(elemento);
          self.directorios[i].title = elemento.name;
	  if(elemento.type === 'file'){
            //añadir como nodo hoja...
            self.directorios[i].isLeaf=true;
          }
        }
      }
    },
  },
  created() {
    this.getTreeDirectory();
  },
};
</script>
