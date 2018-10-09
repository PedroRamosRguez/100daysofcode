const Vuex = require('vuex');
const store = new Vuex.Store({
  state: {
    visibility: 'hidden',
  },
  getters: {
    visibility: state => state.visibility
  },
  mutations: {
    hide : state => state.visibility = 'hidden',
    show: state => state.visibility = 'visible'
  }
})
module.exports = {store}