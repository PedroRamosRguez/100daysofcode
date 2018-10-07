const Vuex = require('vuex');
const store = new Vuex.Store({
  state: {
    // count: 0,
    visibility: 'hidden',
  },
  getters: {
    count: state => state.count
  },
  mutations: {
  	// increment: state => state.count++,
    // decrement: state => state.count--,
    ocultar : state => state.visibility = 'hidden',
    mostrar: state => state.visibility = 'visible'
  }
})
module.exports = {store}