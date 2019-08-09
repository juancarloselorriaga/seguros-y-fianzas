<template>
  <v-container fluid class="pa-0">
    <v-layout column>
      <v-flex xs12 class="mb-4">
        <v-layout>
          <v-layout align-center>
            <h1 class="display-2 mr-3">Clientes</h1>
            <v-avatar color="amber lighten-2">
              <span class="blue-grey--text headline">{{clientes.length}}</span>
            </v-avatar>
          </v-layout>
          <v-spacer></v-spacer>
          <v-layout justify-end align-center>
            <ModalNuevoCliente @reRenderCard="reRenderCard" @reRender="reRender" @terminar="terminar" />
            <v-btn flat color="indigo lighten-1" @click="reRender">Actualzar
              <v-icon right>refresh</v-icon>
            </v-btn>
          </v-layout>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-layout>
          <transition name="fade" mode="in-out">
            <v-flex xs12 shrink>
              <ListadoClientes :clientes="clientes" @selectRow="selectRow" :reRender="listKey" />
            </v-flex>
          </transition>

          <transition name="fade" mode="out-in">
            <v-flex v-if="selectedClient" xs6 class="ml-4" grow>
              <Cliente
                :items="selectedClient"
                @reRenderDataTable="reRender"
                @reRenderCard="reRenderCard"
                :key="cardKey"
                :reRenderTab="reRenderTab"
              />
            </v-flex>
          </transition>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
import Cliente from "@/components/clientes/Cliente.vue";
import ListadoClientes from "@/components/clientes/ListadoClientes.vue";
import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente.vue";
import { mapActions, mapState } from "vuex";
import { setTimeout } from "timers";
import axios from "axios";

export default {
  components: {
    Cliente,
    ListadoClientes,
    ModalNuevoCliente,
  },
  data() {
    return {
      selectedClient: null,
      listKey: 100,
      cardKey: 200,
      reRenderTab: null
    };
  },
  methods: {
    ...mapActions(["getClients"]),
    reRender() {
      this.selectedClient = null;
      setTimeout(() => {
        this.getClients();
        return (this.listKey += 1);
      }, 300);
    },
    reRenderCard(tab) {
      this.reRenderTab = tab
      let row = this.selectedClient;
      this.selectRow(row);
      this.getClients().then(res => {
        return (this.cardKey += 1);
      });
    },
    selectRow(row) {
      const url = "http://localhost:3000/clients/" + row._id;
      axios
        .get(url)
        .then(res => {
          this.selectedClient = res.data.data
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    },
    terminar() {
      this.reRender();
    }
  },
  computed: {
    ...mapState(["clientes"])
  },
  created() {
    this.getClients();
  }
};
</script>

<style scoped>
/***********************
  Page transition animation
  ***********************/
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

button {
  border-radius: 16px;
}
</style>

