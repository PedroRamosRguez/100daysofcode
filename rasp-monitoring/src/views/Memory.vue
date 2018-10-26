<template>
  <div class="container-fluid">
    <br/>
    <div class="memory">
      <div class = "row">
        <div class = "col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Ram Memory Info (Gb)</div>
            <div class="card blockl freeMem">
              <pie-chart
                :data="[['Mem. Free.',memFree], ['Mem. Used',memUsed]]"
                :library="library"
                :colors="['#66ff66','#ff3333']"
              />
            </div>
            Amount of Total Ram Memory {{memTotal}}<br/>
            Amount of Free Ram Memory {{memFree}}<br/>
            Amount of Ram Used {{memUsed}}<br/>
          </div>
        </div>
        <div class = "col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Percentage Ram Memory</div>
            <div class="card blockl">
              <pie-chart :data="[['Free Mem.',percentageMemFree],
                                ['Used Mem.',percentageMemUsed]]"
                         :library="library"
                         :colors="['#66ff66','#ac3973']"/>
            </div>
            Percentage Memory Ram Free {{percentageMemFree}} %<br/>
            <br/>
            Percentage Memory Ram Used {{percentageMemUsed}} %<br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const addressFile = require('../assets/address.json');
const address = addressFile.eth == '' ? addressFile.wlan: address.eth
export default {
  name: 'memory',
  data() {
    return {
      address: address,
      memTotal: 0,
      memFree: 0,
      memUsed: 0,
      percentageMemFree: 0,
      percentageMemUsed: 0,
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
    getMem() {
      const self = this;
      setInterval(() => {
        axios.get('http://'+address+':3000/mem')
          .then((response) => {
            self.memTotal = response.data.memTotal;
            self.memFree = response.data.memFree;
            self.memUsed = response.data.memUsed;
            self.percentageMemFree = response.data.percentageMemFree;
            self.percentageMemUsed = response.data.percentageMemUsed;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
  },
  created() {
    this.getMem();
  },
};
</script>
