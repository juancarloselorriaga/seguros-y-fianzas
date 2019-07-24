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
          <v-layout justify-end="">
            <ModalNuevoCliente @reRenderDataTable="reRender" />
            <v-btn outline color="indigo lighten-1" @click="reRender">Exportar</v-btn>
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
              <v-flex v-if="selectedClient" xs5 class="ml-4" grow>
                <Cliente :items="selectedClient" />
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
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Cliente,
    ListadoClientes,
    ModalNuevoCliente
  },
  data () {
    return {
      selectedClient: null,
      listKey: 100
    }
  },
  methods: {
    ...mapActions(['getClients']),
    reRender() {
      this.selectedClient = null
      setTimeout(() => {
        this.getClients()
      return this.listKey += 1;
      }, 300);
    },
    selectRow(row) {
      this.selectedClient = row
    }
  },
  computed: {
    ...mapState(['clientes']),
  },
  created () {
    this.getClients()
  }
}
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

