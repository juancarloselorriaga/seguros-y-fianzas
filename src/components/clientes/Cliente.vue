<template>
  <v-card class="pt-2 pb-2 radius-3">
    <v-layout column class="white">
      <v-card-title>
        <span class="headline blue-grey--text text--darken-4 my-1">{{items.personalInfo.name}}</span>
        <v-spacer></v-spacer>
        <Menu :items="clientOptions" icon="more_vert" />
      </v-card-title>

      <v-divider class="mb-3"></v-divider>

      <v-layout column>
        <TarjetaDashboard :items="items" />

        <v-divider class="my-3"></v-divider>

        <v-layout justify-center class="mt-4">
          <v-flex xs11>
            <TarjetaInfoContacto :contactInfo="items.contactInfo"/>
          </v-flex>
        </v-layout>

        <v-divider class="my-3"></v-divider>

        <v-layout justify-center class="mt-0">
          <v-flex xs11>
            <TarjetaInfoCliente
              :personal="items.personalInfo"
              :professional="items.professionalInfo"
              :legal="items.legalInfo"
              :additional="items.additionalInfo"
              :medical="items.medicalInfo"
              :diseases="items.medicalInfo.diseases"
            />
          </v-flex>
        </v-layout>

        <v-divider class="my-3"></v-divider>

        <v-layout justify-center class="mt-4">
          <v-flex xs11>
            <TarjetaPolizasRelacionadas :polizasRelacionadas="items.policies" />
          </v-flex>
        </v-layout>


      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import TarjetaInfoContacto from "@/components/clientes/TarjetaInfoContacto.vue";
import TarjetaInfoCliente from "@/components/clientes/TarjetaInfoCliente.vue";
import TarjetaDashboard from "@/components/clientes/TarjetaDashboard.vue";
import TarjetaPolizasRelacionadas from "@/components/clientes/TarjetaPolizasRelacionadas.vue";
import Menu from "@/components/utilities/Menu.vue";

export default {
  name: "Clientes",
  props: {
    items: Object
  },
  components: {
    TarjetaInfoContacto,
    TarjetaInfoCliente,
    TarjetaPolizasRelacionadas,
    Menu,
    TarjetaDashboard
  },
  data() {
    return {
      clientOptions: [
        { title: "Eliminar cliente", icon: "delete" }
      ]
    };
  }
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}

.radius-2 {
  border-radius: 16px;
}
</style>
