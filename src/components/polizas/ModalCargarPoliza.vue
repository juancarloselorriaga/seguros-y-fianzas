<template>
  <v-dialog v-model="dialog" persistent width="920">
    <template v-slot:activator="{ on }">
      <v-btn small fab dark color="indigo lighten-1" class="elevation-0" v-on="on"><v-icon dark>add</v-icon></v-btn>
    </template>

    <v-card class="pa-3">
      <v-card-text class="my-0">
        <v-layout>
        <v-flex xs12>
          <CargarPoliza :clientId="clientId" @cancelar="cancelar" @reRenderCard="reRenderCard"/>
        </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import CargarPoliza from "@/components/polizas/CargarPoliza.vue";
import axios from "axios";

export default {
  name: 'ModalCargarPoliza',
  props: {
    clientId: String
  },
  components: {
    CargarPoliza
  },
  data () {
    return {
      dialog: false,
      contacts: null
    }
  },
  methods: {
    cancelar () {
      this.dialog = false;
    },
    reRenderCard() {
      this.$emit("reRenderCard");
    }
  }
}
</script>

<style scoped>
 .v-sheet {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}


</style>