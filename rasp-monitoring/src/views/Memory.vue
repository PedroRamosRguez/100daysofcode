<template>
  <div class="container-fluid">
    <br/>
    <div class="memory">
      <div class = "row">
        <div class = "col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Memoria RAM (Gb)</div>
            <div class="card blockl memLibre">
              <pie-chart :data="[['Mem. Libre',memLibre],
                                 ['Mem.Usada',memUsada]]"
                         :library="library"
                         :colors="['#66ff66','#ff3333']"/>
            </div>
            Cantidad Memoria Ram Total {{memTotal}}<br/>
            Cantidad Memoria Ram Libre {{memLibre}}<br/>
            Cantidad Memoria Ram Usada {{memUsada}}<br/>
          </div>
        </div>
        <div class = "col-sm-5 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Porcentaje memoria RAM</div>
            <div class="card blockl">
              <pie-chart :data="[['Mem. Libre',porcentajeMemLibre],
                                ['Mem.Usada',porcentajeMemUsada]]"
                         :library="library"
                         :colors="['#66ff66','#ac3973']"/>
            </div>
            Porcentaje Memoria Ram Libre {{porcentajeMemLibre}} %<br/>
            <br/>
            Porcentaje Memoria Ram Usada {{porcentajeMemUsada}} %<br/>
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
      memLibre: 0,
      memUsada: 0,
      porcentajeMemLibre: 0,
      porcentajeMemUsada: 0,
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
            self.memLibre = response.data.memLibre;
            self.memUsada = response.data.memUsada;
            self.porcentajeMemLibre = response.data.porcentajeMemLibre;
            self.porcentajeMemUsada = response.data.porcentajeMemUsada;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 3000);
    },
  },
  created() {
    this.getMem();
  },
};
</script>
