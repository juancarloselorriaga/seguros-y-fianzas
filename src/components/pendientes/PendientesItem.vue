<template>
  <v-layout row wrap align-center justify-start class="mt-3 pa-3">
    <v-flex xs2 sm4 md1 class="v-input__slot">
      <div class>
        <v-checkbox v-model="done" color="amber lighten-2" value="checked" hide-details></v-checkbox>
      </div>
    </v-flex>
    <v-flex xs12 md8>
      <div>{{ titulo }}</div>
    </v-flex>
    <v-flex xs6 sm4 md2>
      <div>{{ fecha }}</div>
    </v-flex>

    

    <v-flex xs2 sm4 md1></v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'pendientes-item',
  props:{
    id: String,
    index: Number,
    titulo: String,
    fecha: String,
    checked: Boolean
  },
  data(){
    return{
      done: false
    }
  }
}
</script>

<style scoped>
  .project.complete {
    border-left: 4px solid #66BB6A;
  }
  .project.ongoing {
    border-left: 4px solid #FFCA28;
  }
  .project.overdue {
    border-left: 4px solid #EF5350;
  }
  .v-chip.complete {
    background: #66BB6A;
  }
  .v-chip.ongoing {
    background: #FFCA28;
  }
  .v-chip.overdue {
    background: #EF5350;
  }

  .v-input__slot {
    align-items: center;
    justify-content: center;
  }

  .v-input--selection-controls {
    margin: 0;
  }
</style>
