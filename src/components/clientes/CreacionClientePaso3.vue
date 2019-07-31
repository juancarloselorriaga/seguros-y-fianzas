<template>
  <div>
    <v-card class="mb-5" color="white" height="300px" flat>
      <v-container fluid fill-height>
        <v-layout justify-center align-center class="mt-5">
          <v-flex xs6 class="text-xs-center">
          <v-btn large dark flat class="indigo lighten-1 mb-3">
          Cargar PDF
          <v-icon right>add</v-icon>
          </v-btn>
          <NuevaPoliza :idClienteNuevo="idClienteNuevo" />
          </v-flex>
        
        </v-layout>
      </v-container>
    </v-card>

    <v-layout>
      <v-spacer></v-spacer>
      <v-btn @click="terminar" flat class="blue-grey--text">Terminar</v-btn>
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";
import NuevaPoliza from "@/components/polizas/NuevaPoliza.vue";

export default {
  name: "CreacionClientePaso3",
  components: {
    NuevaPoliza
  },
  props: {
    idClienteNuevo: String
  },
  data() {
    return {
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    terminar () {
      this.$emit("terminar");
    },
  }
};
</script>

<style scoped>
button {
  border-radius: 16px;
}
</style>

