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
            <ModalNuevoCliente />
            <v-btn outline color="indigo lighten-1">Exportar</v-btn>
          </v-layout>
          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-layout>
            <v-flex xs12 shrink>
              <ListadoClientes :clientes="clientes" @selectRow="selectRow"/>
            </v-flex>

            <v-flex v-if="selectedClient" xs5 class="ml-4" grow>
              <Cliente :items="selectedClient" />
            </v-flex>
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
      selectedClient: null
    }
  },
  methods: {
    ...mapActions(['getClients']),
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
 
button {
   border-radius: 16px;
 }

</style>

