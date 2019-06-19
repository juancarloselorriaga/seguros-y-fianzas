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
            <v-tab href="#tab-1">
              <span class="body-2">Pendientes</span>
              <v-badge
                v-model="show"
                color="purple"
                class="ml-2"
              >
                <template v-slot:badge>
                  <span>6</span>
                </template>
              </v-badge>
              
            </v-tab>
            <v-tab class="ml-5" href="#tab-2">
              <span class="body-2 mr-2">Recados</span>
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>

      <v-tabs-items v-model="tabs">

        <v-tab-item value="tab-1">
          <v-card flat class="py-4">
            <v-card-text>Aquí va el componente de pendientes</v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-2">
          <v-card flat>
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
      show: true // Este boolean se tiene que sustituir por el array que recibe la cantidad de pendientes
    }
  }
}
</script>

<style scoped>

</style>

