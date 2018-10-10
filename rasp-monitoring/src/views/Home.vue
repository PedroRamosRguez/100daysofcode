<template>
  <div class="container-fluid">
    <br/>
    <div class="home">
      <div class = "row">
        <div class="col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Cpu Use</div>
            <div class="card-block">
              <line-chart
                :data="cpuUse"
                :library="library"
                :download="true"
                download="Cpu_use">
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
            <div class="card-header card-primary no-margin">Cpu Temperature</div>
            <div class="card-block">
              <line-chart
                :data="cpuTemperature"
                :download="true"
                download="Cpu_temperature">
              </line-chart>
            </div>
          </div>
        </div>
        <div class="col-sm-5 ">
          <div class="card">
            <div class="card-header card-primary no-margin">Gpu Temperature</div>
            <div class="card blockl">
              <line-chart
                :data="gpuTemperature"
                :download="true"
                download="Gpu_temperature">
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
            <div class="card-header card-primary no-margin">Ram MemoryInfo (Gb)</div>
            <div class="card blockl freeMem">
              <pie-chart
                :data="[['Free Mem',freeMem],['Used Mem',usedMem]]"
                :library="library"
                :colors="['#66ff66','#ff3333']"
                :download="true"
                download="Ram_info"/>
            </div>
            Amount of Total Ram Memory {{memTotal}}<br/>
            Amount of Free Ram Memory {{freeMem}}<br/>
            Amount of Ram Used {{usedMem}}<br/>
          </div>
        </div>
        <div class = "col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Percentage Ram Memory</div>
            <div class="card blockl">
              <pie-chart
                :data="[['Free Mem',percentageFreeMem], ['Used Mem',percentajeUsedMem]]"
                :library="library"
                :colors="['#66ff66','#ac3973']"
              />
            </div>
            Percentage Free Ram Memory {{percentageFreeMem}} %<br/>
            <br/>
            Percentage Used Ram Mermory {{percentajeUsedMem}} %<br/>
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
                <pie-chart
                  :data="[['Used Space (Gb)',item.espacioUsado],['Free Space (Gb)',item.espacioLibre]]"
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
const store = require('../store');
export default {
  name: 'home',
  data() {
    return {
      cpuUse: [],
      cpuTemperature: [],
      gpuTemperature: [],
      memTotal: 0,
      freeMem: 0,
      usedMem: 0,
      percentageFreeMem: 0,
      percentajeUsedMem: 0,
      storage: [],
      maxSize: 0,
      store:store,
      library: {
        responsive: true,
        cutoutPercentage: 55,
        pieceLabel: {
            mode: 'value',
            fontColor: 'blue',
            fontSize: 34,
            fontStyle: 'bold',
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
            self.cpuUse.push(value);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempcpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.cpuTemperature.push(value);
            //console.log(response.data)
            self.checkTemperature(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
    getGpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempgpu')
          .then((response) => {
            const value = [new Date(), response.data];
            self.gpuTemperature.push(value);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    },
    getMem() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/mem')
          .then((response) => {
            self.memTotal = response.data.memTotal;
            self.freeMem = response.data.freeMem;
            self.usedMem = response.data.usedMem;
            self.percentageFreeMem = response.data.percentageFreeMem;
            self.percentajeUsedMem = response.data.percentajeUsedMem;
          })
          .catch((error) => {
            console.log(error);
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
          });
      }, 3000);
    },
    checkTemperature(temperature){
      if(temperature < 65){
        this.hide()
        // console.log(store.store.state.visibility)
      }else{
        this.show()
        // console.log(store.store.state.visibility)
      }    
    },
    hide(){
      store.store.commit('hide');
    },
    show(){
      store.store.commit('show');
    }
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
