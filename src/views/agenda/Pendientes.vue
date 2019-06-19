<template>
  <div class="pendientes">
    <h1 block class="display-3 font-weight-medium ">Pendientes</h1>


    <v-container fluid fill-height color="white">

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
                color="orange darken-4"
              >
                <template v-slot:badge>
                  <span>{{ tipo.cantidad }}</span>
                </template>
              </v-badge>
              </v-tab>
          </v-tabs>
         

      <v-tabs-items v-model="tabs">

        <v-tab-item value="tab-1">
          <v-card flat class="py-4">
            <v-card-text>Aquí va el componente de pendientes</v-card-text>
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
export default {
  data() {
    return{
      tabs: null,
      tipos: [
        {titulo: 'Pendientes', tab: 1, badge: true, cantidad: 3},
        {titulo: 'Recados', tab: 2, badge: true, cantidad: 5}
      ]
    }
  }
}
</script>

<style scoped>

</style>

