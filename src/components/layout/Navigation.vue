<template>
  <div class="navigation">
    <v-navigation-drawer
      fixed
      clipped
      class="border-right"
      app
      v-model="drawer"
      :mini-variant="mini"
      hide-overlay
      stateless
    >
      <v-list class="white">
        <template v-for="(item, i) in items">
          <v-list-tile
            v-if="!item.divider && !item.heading"
            :key="i"
            :class="item.link === $route.path ? 'tile' : ''"
            exact-active-class="is-active"
          >
            <router-link :to="item.link">
                  <v-list-tile-action>
                    <v-icon color="blue-grey">{{ item.icon }}</v-icon>
                  </v-list-tile-action>
            </router-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="white blue-grey--text text--darken-3 pa-0" flat dark app>
      <v-toolbar-title>
        <span class="title mr-5">S<strong class="font-weight-light blue-grey--text text--darken-3">YF</strong>
      </span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-layout shrink justify-center align-center>
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <Menu :items="profileOptions" icon="arrow_drop_down"/>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script>

import Menu from "@/components/utilities/Menu.vue";

export default {
  name: "navigation",
  components: {
    Menu
  },
  data: () => ({
    drawer: true,
    mini: true,
    right: null,
    items: [
      // { icon: "dashboard", text: "Inicio", link: "/" },
      // { heading: "Agenda", edit: false },
      // {
      //   icon: "assignment_turned_in",
      //   text: "Pendientes",
      //   link: "/pendientes"
      // },
      // { icon: "calendar_today", text: "Citas", link: "/citas" },
      // { icon: "phone", text: "Llamadas", link: "/llamadas" },
      // { icon: "compare_arrows", text: "Trámites", link: "/tramites" },
      // { divider: true },
      // { heading: "Seguros", edit: false },
      { icon: "people", text: "Clientes", link: "/clientes" },
    //   { icon: "archive", text: "Pólizas", link: "/polizas" },
    //   { icon: "payment", text: "Pólizas por pagar", link: "/pagos" },
    //   {
    //     icon: "update",
    //     text: "Pólizas por renovar",
    //     link: "/renovaciones"
    //   },
    //   { divider: true },
    //   {
    //     icon: "settings",
    //     text: "Configuración",
    //     link: "/configuracion"
    //   },
      { icon: "help", text: "Ayuda", link: "/ayuda" }
    ],
    profileOptions: [
      { title: "Configurar cuenta", icon: "settings" },
      { title: "Salir", icon: "exit_to_app" }
    ]
})}
</script>

<style scoped>
/***********************
  Navigation classes
  ***********************/

a {
  text-decoration: none;
}

.tile {
  margin: 5px;
  margin-left: 0;
  border-radius: 0px 25px 25px 0px;
  transition: all 0.3s ease-in;
  background: #ffe082;
}
.is-active {
  background-color: red;
}

.border-right {
  border-right: 1px solid #cfd8dc;
}

.v-toolbar {
  border-bottom: 1px solid #cfd8dc !important;
}

.theme--light.v-list .v-list__tile--link:hover {
  background-color: transparent !important;
}
</style>


