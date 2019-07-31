<template>
  <v-dialog v-model="dialog" width="920">
    <template v-slot:activator="{ on }">
      <v-btn small fab dark color="indigo lighten-1" class="elevation-0" v-on="on"><v-icon dark>add</v-icon></v-btn>
    </template>

    <v-card class="pa-3">
      <v-card-text class="my-0">
        <v-layout>
        <v-flex xs12>
           <NuevaTarjetaContacto :idCliente="items._id" @closeModal="closeModal" @reRenderCard="reRender"/>
        </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import NuevaTarjetaContacto from "@/components/clientes/NuevaTarjetaContacto.vue";

export default {
  name: 'ModalNuevoContacto',
  props: {
    items: Object
  },
  components: {
    NuevaTarjetaContacto
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    closeModal () {
      this.dialog = false;
    },
    reRender() {
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

// :idClienteNuevo="idClienteNuevo"