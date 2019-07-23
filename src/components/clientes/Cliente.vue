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

        <v-divider class="my-3"></v-divider>

        <v-layout justify-center class="mt-0">
          <v-flex xs11>
            <h2 class="title font-weight-regular mb-4 blue-grey--text text--darken-2">Información</h2>
            <InfoCliente :personal="items.personalInfo" :professional="items.professionalInfo" :legal="items.legalInfo" :additional="items.additionalInfo" :medical="items.medicalInfo" :diseases="items.medicalInfo.diseases"/>
          </v-flex>
        </v-layout>

        <v-divider class="my-3"></v-divider>

        <v-layout justify-center class="mt-4">
          <v-flex xs11>
            <h2
              class="title font-weight-regular mb-4 blue-grey--text text--darken-2"
            >Pólizas relacionadas</h2>
            <PolizasRelacionadas />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import InfoCliente from "@/components/clientes/InfoCliente.vue";
import PolizasRelacionadas from "@/components/clientes/PolizasRelacionadas.vue";
import Menu from "@/components/utilities/Menu.vue";

export default {
  name: "Clientes",
  props: {
    items: Object
  },
  components: {
    InfoCliente,
    PolizasRelacionadas,
    Menu,
  },
  data() {
    return {
      clientOptions: [
        { title: "Nueva póliza", icon: "create_new_folder" },
        { title: "Editar cliente", icon: "edit" },
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
