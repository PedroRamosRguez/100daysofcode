<template>
  <div class="container-fluid">
    <br/>
    <div class="home">
      <div class = "row">
        <div class="col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Uso de la Cpu</div>
            <div class="card-block">
              <line-chart :data="usoCpu"
                          :library="library"
                          :download="true"
                          download="Uso Cpu">
              </line-chart>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class="row">
        <div class="col-sm-5 offset-sm-1">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Cpu</div>
            <div class="card-block">
              <line-chart :data="temperaturaCpu"
                          :download="true"
                          download="Temperatura Cpu">
              </line-chart>
            </div>
          </div>
        </div>
        <div class="col-sm-5 ">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Gpu</div>
            <div class="card blockl">
              <line-chart :data="temperaturaGpu"
                          :download="true"
                          download="Temperatura Gpu">
              </line-chart>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class = "row">
        <div class = "col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Memoria RAM (Gb)</div>
            <div class="card blockl memLibre">
              <pie-chart :data="[['Mem. Libre',memLibre],
                         ['Mem.Usada',memUsada]]"
                         :library="library" :colors="['#66ff66','#ff3333']"
                         :download="true" download="Ram Info"/>
            </div>
            Cantidad Memoria Ram Total {{memTotal}}<br/>
            Cantidad Memoria Ram Libre {{memLibre}}<br/>
            Cantidad Memoria Ram Usada {{memUsada}}<br/>
          </div>
        </div>
        <div class = "col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Porcentaje memoria RAM</div>
            <div class="card blockl">
              <pie-chart :data="[['Mem. Libre',porcentajeMemLibre],
                         ['Mem.Usada',porcentajeMemUsada]]"
                         :library="library" :colors="['#66ff66','#ac3973']"/>
            </div>
            Porcentaje Memoria Ram Libre {{porcentajeMemLibre}} %<br/>
            <br/>
            Porcentaje Memoria Ram Usada {{porcentajeMemUsada}} %<br/>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class="row">
        <template v-for="item in storage">
          <div class = "col-sm-3" :key="item.sistFicheros">
            <div class="card">
              <div class="card-header card-primary no-margin">{{item.sistFicheros}}</div>
              <div class="card blockl">
                <pie-chart :data="[['Espacio Usado (Gb)',item.espacioUsado],
                           ['Espacio Libre (Gb)',item.espacioLibre]]"
                           :library="library" :colors="['#ff4d4d','#80ff80']"/>
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
  name: 'home',
  data() {
    return {
      usoCpu: [],
      temperaturaCpu: [],
      temperaturaGpu: [],
      memTotal: 0,
      memLibre: 0,
      memUsada: 0,
      porcentajeMemLibre: 0,
      porcentajeMemUsada: 0,
      storage: [],
      maxTamanio: 0,
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
    getCpu() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/cpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.usoCpu.push(value);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 3000);
    },
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempcpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.temperaturaCpu.push(value);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 3000);
    },
    getGpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempgpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.temperaturaGpu.push(value);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 3000);
    },
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
      }, 3000);
    },
  },
  created() {
    this.getCpu();
    this.getCpuTemperature();
    this.getGpuTemperature();
    this.getMem();
    this.getStorage();
  },
};
</script>

library: {
            responsive:true,
            cutoutPercentage: 45,
            pieceLabel: {
                mode: "percentaje",
                fontColor: '#060666',
            }
        },
