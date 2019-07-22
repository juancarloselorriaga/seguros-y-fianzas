<template>
  <v-menu :nudge-width="200" transition="slide-y-transition" bottom origin="center center">
    <template v-slot:activator="{ on }">
      <v-toolbar-title v-on="on" class="ml-0">
        <v-icon light>{{icon}}</v-icon>
      </v-toolbar-title>
    </template>

    <v-list>
      <v-list-tile v-for="item in items" :key="item.title">
        <v-list-tile-title>
          <v-layout>
            <span>{{item.title}}</span>
            <v-spacer></v-spacer>
            <v-icon>{{item.icon}}</v-icon>
          </v-layout>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    items: Array,
    icon: String
  }
}
</script>



