<template>
  <div v-if="polizasRelacionadas !== undefined" class="mb-3" >
    <v-layout align-center justify-space-between class="pr-3 mb-3">
    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Pólizas relacionadas</h2>
    <v-btn small fab dark color="indigo lighten-1" class="elevation-0"><v-icon dark>add</v-icon></v-btn>
  </v-layout>
    <v-list subheader>
      
        <div v-for="item in polizasRelacionadas" :key="item.title" avatar @click>
          <v-list-tile v-if="item.policyId !== null" >
        <v-list-tile-content>
          <v-list-tile-title v-html="item.policyId.plan.title"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action class="pr-3">
          <v-icon color="indigo lighten-2">visibility</v-icon>
        </v-list-tile-action>
        </v-list-tile>
        </div>
      
    </v-list>
  </div>
  <div v-else class="mb-4">
  <v-layout align-center justify-space-between class="pr-3">
    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Sin pólizas relacionadas</h2>
    <v-btn small fab dark color="indigo lighten-1" class="elevation-0"><v-icon dark>add</v-icon></v-btn>
  </v-layout>
</div>
</template>

<script>
export default {
  name: "TarjetaPolizasRelacionadas",
  props: {
    polizasRelacionadas: Array,
  },
  data() {
    return {
    };
  }
};
</script>

