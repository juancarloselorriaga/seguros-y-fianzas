<template>
  <div class="pendientes">
    <v-container fluid class="mx-0 pa-0">
      
      <v-flex xs6>
        <v-text-field
          clearable
          color="white"
          v-model="newTodo"
          id="newTodo"
          name="newTodo"
          label="Agregar pendiente"
          @keyup.enter="addTodo"
          class="mb-3"
        ></v-text-field>
      </v-flex>

      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">por nombre</span>
          </v-btn>
          <span>Ordenar por nombre</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">por fecha</span>
          </v-btn>
          <span>Ordenar por fecha</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="(pendiente, index) in pendientes" :key="index">
        <PendientesItem
          :index="index"
          :titulo="pendiente.titulo"
          :fecha="pendiente.fecha"
          :checked="pendiente.checked"
        ></PendientesItem>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import PendientesItem from "@/components/pendientes/PendientesItem.vue";

export default {
  name: "pendientes-list",
  components: {
    PendientesItem
  },
  data() {
    return {
      
      pendientes: [
        {
          titulo: "Comprar tinta para la impresora",
          fecha: "06 Junio 19",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
          checked: true
        },
        {
          titulo: "Pagar Bancomer",
          fecha: "06 Junio 19",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
          checked: true
        }
      ]
    };
  },

  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style scoped>
</style>

