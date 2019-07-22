<template>
    <v-container fluid class="pa-0">
      <v-layout column>
        <v-flex xs12 class="mb-4">
          <v-layout>
          <v-layout align-center>
            <h1 class="display-2 mr-3">Clientes</h1>
            <v-avatar color="amber lighten-2">
              <span class="blue-grey--text headline">3</span>
            </v-avatar>
          </v-layout>
          <v-spacer></v-spacer>
          <v-layout justify-end="">
            <v-btn dark flat class="indigo lighten-1">Nuevo cliente</v-btn>
            <v-btn outline color="indigo lighten-1">Exportar</v-btn>
          </v-layout>
          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-layout>
            <v-flex xs7>
              <ListadoClientes :clientes="clientes" />
            </v-flex>

            <v-flex xs5 class="ml-4">
              <Cliente />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      
    </v-container>
</template> 

<script>

import Cliente from "@/components/clientes/Cliente.vue";
import ListadoClientes from "@/components/clientes/ListadoClientes.vue";
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Cliente,
    ListadoClientes
  },
  methods: {
    ...mapActions(['getClients']),
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

