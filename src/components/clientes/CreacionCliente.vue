<template>
  <v-stepper v-model="next" class="elevation-0">
    <v-stepper-header class="elevation-0">
      <v-stepper-step :complete="next > 1" step="1" color="indigo lighten-1">Información</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="next > 2" step="2" color="indigo lighten-1">Contacto</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" color="indigo lighten-1">Pólizas</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <CreacionClientePaso1 @reRenderDataTable="reRender" @nextStep="nextStep" @clienteCreado="asignarIdClienteNuevo" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <CreacionClientePaso2 @reRenderDataTable="reRender" @nextStep="nextStep" :idClienteNuevo="idClienteNuevo"/>
      </v-stepper-content>

      <v-stepper-content step="3">
          <CreacionClientePaso3 @reRenderDataTable="reRender" @nextStep="nextStep" :idClienteNuevo="idClienteNuevo" @cerrarModal="cerrarModal"/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

import CreacionClientePaso1 from "@/components/clientes/CreacionClientePaso1.vue";
import CreacionClientePaso2 from "@/components/clientes/CreacionClientePaso2.vue";
import CreacionClientePaso3 from "@/components/clientes/CreacionClientePaso3.vue";

export default {
  name: "CreacionCliente",
  components: {
    CreacionClientePaso1,
    CreacionClientePaso2,
    CreacionClientePaso3
  },
  data() {
    return {
      next: 1,
      idClienteNuevo: null
    };
  },
  methods: {
    cerrarModal () {
      this.$emit('cerrarModal')
    },
    asignarIdClienteNuevo (idCliente) {
      this.idClienteNuevo = idCliente;
    },
    nextStep(step) {
      return this.next = step
    },
    reRender() {
      this.$emit('reRenderDataTable');
    }
  }
};
</script>

<style scoped>
button {
  border-radius: 16px;
}
</style>


