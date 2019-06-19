<template>
  <div class="navigation">
    <v-navigation-drawer v-model="drawer" fixed clipped class="white" app>
      <v-list class="white">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn v-if="item.edit" small flat color="orange darken-4">edit</v-btn>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

          <v-list-tile v-else :key="i" class="tile" :to="item.link" exact-active-class="is-active">
            <v-list-tile-action>
              <v-icon color="grey darken-3">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                class="grey--text text--darken-3 subheading font-weight-medium"
              >{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo darken-1" dark app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        S
        <span class="font-weight-light">YF</span>
      </span>
      <v-text-field solo-inverted flat hide-details label="Buscar" prepend-inner-icon="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data: () => ({
    drawer: null,
    items: [
      { icon: "dashboard", text: "Inicio", link: "/" },
      { heading: "Agenda", edit: false },
      {
        icon: "assignment_turned_in",
        text: "Pendientes",
        link: "/agenda/pendientes"
      },
      { icon: "calendar_today", text: "Citas", link: "/agenda/citas" },
      { icon: "phone", text: "Llamadas", link: "/agenda/llamadas" },
      { icon: "compare_arrows", text: "Trámites", link: "/agenda/tramites" },
      { divider: true },
      { heading: "Seguros", edit: false },
      { icon: "archive", text: "Pólizas", link: "/seguros/polizas" },
      { icon: "payment", text: "Pólizas por pagar", link: "/seguros/pagos" },
      {
        icon: "refresh",
        text: "Pólizas por renovar",
        link: "/seguros/renovaciones"
      },
      { divider: true },
      {
        icon: "settings",
        text: "Configuración",
        link: "/configuraciones/configuracion"
      },
      { icon: "help", text: "Ayuda", link: "/configuraciones/ayuda" }
    ]
  })
};
</script>

<style scoped>
/***********************
  Navigation classes
  ***********************/

.tile {
  margin: 5px;
  margin-left: 0;
  border-radius: 0px 25px 25px 0px;
  transition: all 0.3s ease-in;
}

.tile:hover {
  background: #9fa8da;
  color: white;
}

.tile:active {
  background: #3f51b5;
}

.is-active{
  background-color: red;
}

</style>


