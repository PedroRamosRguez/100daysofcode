<template>
  <div class="container-fluid">
    <br/>
    <div class="storage">
      <div class="row">
        <template v-for="item in storage">
          <div class = "col-sm-3" :key="item.sistFicheros">
            <div class="card">
              <div class="card-header card-primary no-margin">{{item.fileSystem}}</div>
              <div class="card blockl">
                <pie-chart
                  :data="[['Used Space (Gb)',item.spaceUsed], ['Space Free (Gb)',item.spaceFree]]"
                  :library="library"
                  :colors="['#ff4d4d','#80ff80']"
                />
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
const addressFile = require('../assets/address.json');
const address = addressFile.eth == '' ? addressFile.wlan: address.eth
export default {
  name: 'storage',
  data() {
    return {
      address: address,
      storage: [],
      maxSize: 0,
      library: {
        responsive: true,
        cutoutPercentage: 75,
        pieceLabel: {
          mode: 'value',
          fontColor: '#060666',
        },
      },
    };
  },
  methods: {
    getStorage() {
      const self = this;
      setInterval(() => {
        axios.get('http://'+address+':3000/storage')
          .then((response) => {
            self.storage = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
  },
  created() {
    this.getStorage();
  },
};
</script>
