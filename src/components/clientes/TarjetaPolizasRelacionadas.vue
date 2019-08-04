<template>
  <div v-if="polizasRelacionadas !== undefined" class="mb-3" >
    <v-layout align-center justify-space-between class="pr-3 mb-3">
    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Pólizas relacionadas</h2>
    <v-btn small fab dark color="indigo lighten-1" class="elevation-0"><v-icon dark>add</v-icon></v-btn>
  </v-layout>
    <v-list subheader>

        <ModalVerPoliza  v-if="modalVisible" @close="modalVisible = false" :data="policyData" :index="policyIndex" :clientId="clientId" :isVisible="modalVisible"/>

        <div v-for="(item, index) in polizasRelacionadas" :key="index" avatar>
          <v-list-tile v-if="item.policyId !== null" >
        <v-list-tile-content>
          <v-list-tile-title v-html="item.policyId.plan.title"></v-list-tile-title>
        </v-list-tile-content>
            <v-btn fab small flat @click="openModal(item, index)"><v-icon color="indigo lighten-2">visibility</v-icon></v-btn>
        </v-list-tile>
        <v-divider class="mt-2"></v-divider>
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

import ModalVerPoliza from "@/components/clientes/ModalVerPoliza.vue";

export default {
  name: "TarjetaPolizasRelacionadas",
  components: {
    ModalVerPoliza
  },
  props: {
    polizasRelacionadas: Array,
    clientId: String
  },
  data() {
    return {
      modalVisible: false,
      policyData: null,
      policyIndex: Number
    };
  },
  methods: {
    openModal(data, index) {
      this.policyData = data;
      this.policyIndex = index;
      this.modalVisible = true;
    }
  }
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px !important;
}

</style>

