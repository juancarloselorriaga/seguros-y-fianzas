<template>
  <v-menu :nudge-width="200" transition="slide-y-transition" bottom origin="center center">
    <template v-slot:activator="{ on }">
      <v-toolbar-title v-on="on" class="ml-0">
        <v-icon light>{{icon}}</v-icon>
      </v-toolbar-title>
    </template>

    <v-list>
      <v-list-tile v-for="(item, index) in items" :key="item.title" @click="callBackendFor(index)">
        <v-list-tile-title>
          <v-layout>
            <span>{{item.title}}</span>
            <v-spacer></v-spacer>
            <v-icon small color="blue-grey">{{item.icon}}</v-icon>
          </v-layout>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "Menu",
  props: {
    items: Array,
    icon: String
  },
  methods: {
    callBackendFor(index) {
      this.$emit('menuItemClicked', index)
    }
    }
  };
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}

.radius-2 {
  border-radius: 16px;
}

</style>




