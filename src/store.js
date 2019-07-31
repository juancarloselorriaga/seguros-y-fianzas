import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientes: []
  },
  mutations: {
    setClients(state, clients){
      state.clientes = clients;
    }
  },
  actions: {
    async getClients({ commit }){
      let clients = []
      const url = 'http://localhost:3000/clients';

      axios.get(url)
        .then((res) => {
          clients = res.data.data;
          commit('setClients', clients)
        })
        .catch((err) => {
          alert('Error al consultar listado de clientes', err)
      })
      
    }
  }
})
