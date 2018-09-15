<template>
  <div class="container-fluid">
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png"><br/>
      Esto es la  pagina de inicio... -->
      <div class = "row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Uso de la Cpu</div>
            <div class="card-block">{{usoCpu}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Cpu</div>
            <div class="card-block">{{temperaturaCpu}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Temperatura de la Gpu</div>
            <div class="card blockl">{{temperaturaGpu}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class = "row">
        <div class = "col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Cantidad de memoria RAM total</div>
            <div class="card blockl">{{memTotal}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
        <div class = "col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Cantidad de memoria RAM libre</div>
            <div class="card blockl">{{memLibre}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
        <div class = "col-sm-4">
          <div class="card">
            <div class="card-header card-primary no-margin">Cantidad de memoria RAM usada</div>
            <div class="card blockl">{{memUsada}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div class = "row">
        <div class = "col-sm-6">
          <div class="card">
            <div class="card-header card-primary no-margin">Cantidad de memoria RAM libre en Porcentaje</div>
            <div class="card blockl">{{porcentajeMemLibre}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
        <div class = "col-sm-6">
          <div class="card">
            <div class="card-header card-primary no-margin">Cantidad de memoria RAM usada en porcentaje</div>
            <div class="card blockl">{{porcentajeMemUsada}}</div>
            <img src="https://camo.githubusercontent.com/8299979afd2e8a2fce33e9d68e89d2f1c3e5ecf3/687474703a2f2f63646e2e6d616b657573656f662e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031322f30322f7261737062657272795f70695f6c6f676f2e706e673f366632356337">
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <table class="table">
        <thead>
          <tr>
            <th scope = "col">Sistema Ficheros</th>
            <th scope = "col">Tamaño</th>
            <th scope = "col">Espacio Libre</th>
            <th scope = "col">Espacio Usado</th>
            <th scope = "col">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
        <template v-for="item in storage">
          <tr>
            <td scope="row">{{item.sistFicheros}}</td>
            <td scope="row">{{item.tamanio}}</td>
            <td scope="row">{{item.espacioLibre}}</td>
            <td scope="row">{{item.espacioUsado}}</td>
            <td scope="row">{{item.porcentaje}}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'home',
  data() {
    return {
      usoCpu: 0,
      temperaturaCpu: 0,
      temperaturaGpu: 0,
      memTotal: 0,
      memLibre: 0,
      memUsada: 0,
      porcentajeMemLibre: 0,
      porcentajeMemUsada: 0,
      storage: [],
    };
  },
  methods: {
    getCpu() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/cpu')
          .then((response) => {
            self.usoCpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('SIEMPRE SSE EJECUTA ESTO..');
          });
      }, 5000);
    },
    getCpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempcpu')
          .then((response) => {
            self.temperaturaCpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
    },
    getGpuTemperature() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/tempgpu')
          .then((response) => {
            self.temperaturaGpu = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
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
      }, 5000);
    },
    getStorage() {
      const self = this;
      setInterval(() => {
        axios.get('http://192.168.1.42:3000/storage')
          .then((response) => {
            console.log(response);
            console.log(response.data);
            self.storage = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('siempre se ejecuta esto...');
          });
      }, 5000);
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
