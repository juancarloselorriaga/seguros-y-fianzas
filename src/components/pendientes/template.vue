<template>
  <div class="pendientes">
    <v-container fluid fill-height color="white">

      <v-layout row class="my-1">
        <v-flex xs12>
          
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>

export default {
  name: 'template',
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

