
<template>
  <div class="pendientes">
    <v-container fluid class="mx-0 pa-0">
      <v-layout row justify-center class="mb-3">
        <v-flex xs12>
          <v-text-field
            label="Nueva nota o pendiente"
            color="blue-grey"
            background-color="amber lighten-3"
            clearable
            v-model="nuevoPendiente"
            id="nuevoPendiente"
            name="nuevoPendiente"
            @keyup.enter="addTodo"
            class="mb-3"
            outline
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid class="mx-0 pa-0">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top v-for="(filter, index) in filters" :key="index">
          <v-btn small flat :class="{ 'pink--text': isActive(index)}" @click="filterMenu(index)" slot="activator">
            <v-icon small left>{{filter.icono}}</v-icon>
            <span class="caption text-lowercase">{{filter.texto}}</span>
          </v-btn>
          <span>{{filter.tooltip}}</span>
        </v-tooltip>        
      </v-layout>
      
      <transition-group name="slide-fade" mode="in-out">
        <v-subheader class="subheading" v-if="pendientes.length == 0 && !filters[1].activo" :key="'Placeholder'">No tienes nada por el momento</v-subheader>
        <v-subheader class="subheading" v-if="pendientes.length == 0 && filters[1].activo" :key="'Placeholder'">No tienes nada para hoy</v-subheader>
        <v-card flat v-else v-for="(pendiente, index) in pendientes" :key="index">
          <PendientesItem
            :key="pendiente.titulo"
            :index="index"
            :titulo="pendiente.titulo"
            :fecha="pendiente.fecha"
            :notas="pendiente.notas"
            :checked="pendiente.checked"
          ></PendientesItem>
          <v-divider :key="index+2"></v-divider>
      </v-card>
      </transition-group>
      
            
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
      nuevoPendiente: '',
      pendientes: [],
      fecha: '',
      pendientesBkp: [],
      filters: [
        { click: this.saveBkp, icono: 'all_inbox', texto: 'ver todos', tooltip: 'Ver todos los pendientes', activo: true },
        { click: this.filterToday, icono: 'date_range', texto: 'para hoy', tooltip: 'Muestra los pendientes de hoy', activo: false },
        { click: this.sortTitle, icono: 'title', texto: 'por titulo', tooltip: 'Ordena por título', activo: false },
        { click: this.sortDate, icono: 'date_range', texto: 'por fecha', tooltip: 'Ordena por fecha', activo: false },
        ]
    };
  },
  methods: {
    isActive(index){
      return this.filters[index].activo
    },
    filterMenu(index){
      if(index === 0){
        this.filters[0].activo = true;
        this.filters[1].activo = false;
        this.filters[2].activo = false;
        this.filters[3].activo = false;
        this.pendientes = this.pendientesBkp
      }
      else if(index === 1){
        this.filters[0].activo = false;
        this.filters[1].activo = true;
        this.filters[2].activo = false;
        this.filters[3].activo = false;
        this.filterBy('hoy')
      }
      else if(index === 2){
        this.filters[0].activo = false;
        this.filters[1].activo = false;
        this.filters[2].activo = true;
        this.filters[3].activo = false;
        this.pendientes = this.pendientesBkp
        this.sortBy('titulo')
      }
      else if(index === 3){
        this.filters[0].activo = false;
        this.filters[1].activo = false;
        this.filters[2].activo = false;
        this.filters[3].activo = true;
        this.pendientes = this.pendientesBkp
        this.sortBy('fecha')
      }
    },
    sortBy(prop) {
      this.pendientes.sort((a, b) => (a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1));
    },
    filterBy(prop) {
      if(prop === 'hoy'){
        this.pendientesBkp = this.pendientes;
        this.pendientes = [...this.pendientes.filter(e => e.titulo.length === 5)];
      }
    },
    addTodo() {
      let value = this.nuevoPendiente && this.nuevoPendiente.trim();
      this.filters[0].activo = true;
      this.filters[1].activo = false;
      this.filters[2].activo = false;
      this.filters[3].activo = false;
      if (!value) {
        return;
      }
      this.getFecha()
      this.pendientes.push({
        titulo: this.nuevoPendiente,
        fecha: this.fecha,
        notas: 'This is dummy content',
        checked: false
      });
      this.nuevoPendiente = '';
      this.pendientesBkp = this.pendientes;
    },
    getFecha() {
      let hoy = new Date();
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.fecha = hoy.toLocaleDateString("es-ES", options)
      return this.fecha
    }
  }
};
</script>

<style scoped>

/***********************
  Add to list transition animation
  ***********************/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>

