<template>
  <v-app id="app">
    <Navigation></Navigation>
    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout row>
          <v-flex xs12>
            <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Navigation from "@/components/layout/Navigation.vue";

export default {
  components: {
    Navigation
  },
  props: {
    source: String
  }
};
</script>

<style>
/***********************
  Page transition animation
  ***********************/

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/***********************
  Global classes
  ***********************/

#app .v-navigation-drawer__border {
  display: none;
}
</style>






