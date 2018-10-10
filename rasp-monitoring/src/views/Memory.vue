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
                :data="[['Mem. Libre',freeMem], ['Mem.Usada',usedMem]]"
                :library="library"
                :colors="['#66ff66','#ff3333']"
              />
            </div>
            Amount of Total Ram Memory {{memTotal}}<br/>
            Amount of Free Ram Memory {{freeMem}}<br/>
            Amount of Ram Used {{usedMem}}<br/>
          </div>
        </div>
        <div class = "col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Percentage Ram Memory</div>
            <div class="card blockl">
              <pie-chart :data="[['Mem. Libre',percentageFreeMem],
                                ['Mem.Usada',percentageUsedMem]]"
                         :library="library"
                         :colors="['#66ff66','#ac3973']"/>
            </div>
            Porcentaje Memoria Ram Libre {{percentageFreeMem}} %<br/>
            <br/>
            Porcentaje Memoria Ram Usada {{porcentajeusedMem}} %<br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'memory',
  data() {
    return {
      memTotal: 0,
      freeMem: 0,
      usedMem: 0,
      percentageFreeMem: 0,
      porcentajeusedMem: 0,
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
        axios.get('http://192.168.1.42:3000/mem')
          .then((response) => {
            self.memTotal = response.data.memTotal;
            self.freeMem = response.data.freeMem;
            self.usedMem = response.data.usedMem;
            self.percentageFreeMem = response.data.percentageFreeMem;
            self.porcentajeusedMem = response.data.porcentajeusedMem;
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
