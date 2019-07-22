<template>
    <v-container fluid class="pa-0">
      <v-layout column>
        <v-flex xs12 class="mb-5">
          <v-layout>
          <v-layout align-center>
            <h1 class="display-2 mr-3">Clientes</h1>
            <v-avatar color="amber lighten-2">
              <span class="blue-grey--text headline">3</span>
            </v-avatar>
          </v-layout>
          <v-spacer></v-spacer>
          <v-layout justify-end="">
            <v-btn dark flat class="red lighten-1">Nuevo cliente</v-btn>
            <v-btn flat>Exportar</v-btn>
          </v-layout>
          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-layout>
            <v-flex xs8>
              <ListadoClientes />
            </v-flex>

            <v-flex xs4>
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

export default {
  components: {
    Cliente,
    ListadoClientes
  }
}
</script>

<style scoped>
 
button {
   border-radius: 8px;
 }

</style>

