<template>
  <v-dialog v-model="dialog" width="920">
    <template v-slot:activator="{ on }">
      <v-btn dark flat class="indigo lighten-1" v-on="on">Nuevo cliente</v-btn>
    </template>

    <v-card class="pa-3">
      <v-card-text class="my-0">
        <v-layout>
        <v-flex xs12>
           <CreacionCliente @reRenderCard="reRenderCard" @reRender="reRender" @cerrarModal="dialog = false" @terminarProceso="terminar"/>
        </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import CreacionCliente from "@/components/clientes/CreacionCliente.vue";

export default {
  name: 'ModalNuevoCliente',
  components: {
    CreacionCliente
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    reRender() {
      this.$emit('reRender');
    },
    reRenderCard() {
      this.$emit('reRenderCard');
    },
    terminar () {
      this.$emit('terminar');
      this.dialog = false
    }
  }
}
</script>

<style scoped>
button {
   border-radius: 16px;
 }

 .v-sheet {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}
</style>

