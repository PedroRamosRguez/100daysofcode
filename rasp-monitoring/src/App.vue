<template>
  <div id="app">
    <div class="row wrapper">
      <aside class="col-sm-2 bg-dark">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark align-items-start flex-sm-column flex-row">
          <router-link class="navbar-brand mx-auto" to="/"><i class="fab fa-vuejs fa-fw"></i> RaspMonitoring</router-link>
          <a href class="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
            <span class="navbar-toggler-icon"></span>
          </a>
          <div class="collapse navbar-collapse sidebar">
            <ul class="flex-column navbar-nav w-100 justify-content-between">
              <li class="nav-item">
                <router-link class="nav-link mx-auto" to="/cpu"><i class="fas fa-microchip fa-fw"></i> <span class=""> Cpu</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/temp" data-toggle="collapse" data-target="#m1" aria-expanded="false">
                 <i class="fas fa-thermometer-three-quarters fa-fw"></i> <span class="">Temperature</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/mem"><i class="fas fa-memory"></i> <span class="">  Memory</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/storage"><i class="fas fa-hdd fa-fw"></i> <span class="">  Storage</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/tree"><i class="fas fa-hdd fa-fw"></i> <span class="">  Directories</span></router-link>
              </li>
              <li class="nav-item" v-bind:style = "{visibility: store.store.state.visibility}">
                <button type="submit" v-bind:style="{visibility: store.store.state.visibility}" class="btn btn-danger" @click="shutdown"><i class="fa fa-power-off boton" aria-hidden="true"></i></button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main class="col" style="background-color: #09161D;">
        <h1 v-if="shutdownState" style="color:red">Raspberry Pi will shutdown in {{counter}} secs</h1>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const axios = require('axios');
const store = require('./store');

export default {
  name: 'app',
  data() {
    return {
      counter: 0,
      shutdownState: false,
      store: store,
    };
  },
  methods: {
    shutdown() {
      const self = this;
      axios.get('http://192.168.1.42:3000/shutdown')
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          self.counter = 60;
          self.shutdownStatte = true;
          self.countdown();
        });
    },
    countdown() {
      setInterval(() => {
        const self = this;
        self.counter -= 1;
      }, 1000);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body, html, .container-fluid {
    height: 100%;
}

.wrapper {
    min-height: 100vh;
    max-height: 100%;
}

main {
    max-height: 100%;
    overflow-y: auto;
}

.chart{
    background-color: #343A40;
}

html, body {
  overflow-x: hidden;
}

.boton {
  font-size: 3em;
  /* visibility: hidden; */
}
</style>
