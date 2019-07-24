<template>
  <v-layout justify-center class="mt-0">
    <v-flex xs11>
      <h2
        class="title font-weight-regular mb-4 blue-grey--text text--darken-2"
      >Resumen general pólizas</h2>
      <v-layout my-5>
        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">Vigentes</span>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">En periodo de renovación</span>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">Vencidas</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: "TarjetaDashboard",
  props: {
    items: Object
  },
  computed: {
    
  }
};
</script>

