<template>
  <v-layout justify-center class="mt-0">
    <v-flex xs11>
      <h2
        class="title font-weight-regular mb-4 blue-grey--text text--darken-2"
      >Resumen general pólizas</h2>
      <v-card class="elevation-1 pa-3 my-5 radius-3"> 

      <v-layout my-5 >
        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">Vigentes</span>
            <v-icon large class="mt-3" color="green lighten-1">check_circle</v-icon>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">En periodo de renovación</span>
            <v-icon large class="mt-3" color="amber lighten-1">warning</v-icon>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column justify-center>
            <span class="headline text-xs-center mb-2">{{items.policies.length}}</span>
            <span class="body-1 text-xs-center">Vencidas</span>
            <v-icon large class="mt-3" color="red lighten-1">error</v-icon>
          </v-layout>
        </v-flex>
      </v-layout>
      </v-card>
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


<style scoped>
.radius-3 {
  border-radius: 30px !important;
}

</style>
