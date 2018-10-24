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
                :data="[['Mem. Free',memFree],['Mem. Used',memUsed]]"
                :library="library"
                :colors="['#66ff66','#ff3333']"
                :download="true"
                download="Ram_info"/>
            </div>
            Amount of Total Ram Memory {{memTotal}}<br/>
            Amount of Free Ram Memory {{memFree}}<br/>
            Amount of Ram Used {{memUsed}}<br/>
          </div>
        </div>
        <div class = "col-sm-6 mx-auto">
          <div class="card">
            <div class="card-header card-primary no-margin">Percentage Ram Memory</div>
            <div class="card blockl">
              <pie-chart
                :data="[['Mem. Free',percentageMemFree], ['Mem. Used',percentageMemUsed]]"
                :library="library"
                :colors="['#66ff66','#ac3973']"
              />
            </div>
            Percentage Memory Ram Free {{percentageMemFree}} %<br/>
            <br/>
            Percentage Memory Ram Used {{percentageMemUsed}} %<br/>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class="row">
        <template v-for="item in storage">
          <div class = "col-sm-3" :key="item.fileSystem">
            <div class="card">
              <div class="card-header card-primary no-margin">{{item.fileSystem}}</div>
              <div class="card blockl">
                <pie-chart
                  :data="[['Space Used (Gb)',item.spaceUsed],['Space Free (Gb)',item.spaceFree]]"
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
      memFree: 0,
      memUsed: 0,
      percentageMemFree: 0,
      percentageMemUsed: 0,
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
      if(temperature < 80){
        this.hide();
      }else{
        this.show();
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
