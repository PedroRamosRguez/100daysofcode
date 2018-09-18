<template>
  <div id="app">
    <div class="row wrapper">
      <aside class="col-12 col-sm-2 bg-dark">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark align-items-start flex-sm-column flex-row">
          <router-link class="navbar-brand mx-auto" to="/"><i class="fab fa-vuejs fa-fw"></i> RaspMonitoring</router-link>
          <a href class="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
            <span class="navbar-toggler-icon"></span>
          </a>
          <div class="collapse navbar-collapse sidebar">
            <ul class="flex-column navbar-nav w-100 justify-content-between">
              <li class="nav-item">
                <router-link class="nav-link" to="/cpu"><i class="fas fa-microchip fa-fw"></i> <span class=""> Cpu</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/temp" data-toggle="collapse" data-target="#m1" aria-expanded="false">
                 <i class="fas fa-thermometer-three-quarters fa-fw"></i> <span class="">Temperatura</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/mem"><i class="fas fa-memory"></i> <span class="">  Memoria</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/storage"><i class="fas fa-hdd fa-fw"></i> <span class="">  Almacenamiento</span></router-link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main class="col bg-faded py-3">
        <!--<div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/cpu">Cpu</router-link>|
          <router-link to="/mem">Memory</router-link>|
          <router-link to="/storage">Storage</router-link>|
          <router-link to="/temp">Temperature</router-link>|
          <router-link to="/about">About</router-link>
        </div>-->
        <router-view/>
      </main>
    </div>
  </div>
</template>
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
</style>
