<template>
  <div class="pendientes">
    <v-container fluid fill-height class="py-0" color="white">
      <v-layout column justify-center class="my-1">
        <v-flex xs6>
          <h1 block class="display-3 font-weight-medium ">Pendientes</h1>
        </v-flex>
        <v-flex xs6>
          <v-card height="100%" class="py-0" flat light>
            <v-subheader class="headline pl-1 mb-0">{{day}} , {{date}} de {{month}}</v-subheader>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>


    <v-container fluid fill-height class="py-1" color="white">

      <v-layout row class="my-1">
        <v-flex xs12>
          <v-tabs
            color="white"
            slider-color="indigo"
            v-model="tabs"
            class="mx-0"
          >
            <v-tab v-for="tipo in tipos" :href="`#tab-${tipo.tab}`" :key="tipo.titulo" class="mr-5">
              <span class="body-2">{{ tipo.titulo }}</span>
              <v-badge
                v-model="tipo.badge"
                class="ml-2"
                color="amber lighten-2 blue-grey--text"
              >
                <template v-slot:badge>
                  <span>{{ tipo.cantidad }}</span>
                </template>
              </v-badge>
              </v-tab>
          </v-tabs>
         

      <v-tabs-items v-model="tabs">

        <v-tab-item value="tab-1">
          <v-card flat class="py-5">
            <PendientesList></PendientesList>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-2">
          <v-card flat class="py-4">
            <v-card-text>Aquí va el componente de recados</v-card-text>
          </v-card>
        </v-tab-item>


      </v-tabs-items>
        </v-flex>
      </v-layout>

    </v-container>
    
  </div>
</template>

<script>

import PendientesList from "@/components/pendientes/PendientesList.vue";

export default {
  components: {
    PendientesList
  },
  data() {
    return{
      tabs: null,
      tipos: [
        {titulo: 'Notas y pendientes', tab: 1, badge: true, cantidad: 3},
        {titulo: 'Recados', tab: 2, badge: true, cantidad: 5}
      ],
      day: this.todoDay(),
      month: this.todoMonth(),
      date: new Date().getDate(),
      year: new Date().getFullYear(),
    }
  },
  methods: {
    todoDay() {
      var d = new Date();
      var days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ];
      return days[d.getDay()];
    },
    todoMonth() {
      var m = new Date();
      var months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];
      return months[m.getMonth()];
    }
  }
}
</script>

<style scoped>

</style>

