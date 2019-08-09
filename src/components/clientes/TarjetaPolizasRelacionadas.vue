<template>
  <div v-if="polizas !== undefined" class="mb-3" :key="reRenderKey" :checker="checker">
    <v-layout align-center justify-space-between class="pr-3 mb-3">
      <v-flex xs-10>
        <h2 class="title font-weight-regular blue-grey--text text--darken-2">Pólizas relacionada</h2>
      </v-flex>
      <v-flex xs2 class="text-xs-right">
        <ModalCargarPoliza :clientId="clientId" @reRenderCard="reRenderCard"/>
      </v-flex>
    
  </v-layout>
    <v-list subheader>

        <ModalVerPoliza  v-if="modalVisible" @close="terminar" :data="policyData" :index="policyIndex" :clientId="clientId" :isVisible="modalVisible" @reRenderDataTable="reRenderDataTable"/>

        <div v-for="(item, index) in polizas" :key="index" avatar>
          <v-list-tile v-if="item.policyId !== null" >
        <v-list-tile-content>
          <v-list-tile-title v-html="item.policyId.plan.title"></v-list-tile-title>
        </v-list-tile-content>
            <v-btn fab small flat @click="openModal(item, index)"><v-icon color="indigo lighten-2">visibility</v-icon></v-btn>
        </v-list-tile>
        <v-divider class="my-2"></v-divider>
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
import ModalCargarPoliza from "@/components/polizas/ModalCargarPoliza.vue";
import axios from "axios";

export default {
  name: "TarjetaPolizasRelacionadas",
  components: {
    ModalVerPoliza,
    ModalCargarPoliza
  },
  props: {
    clientId: String
  },
  data() {
    return {
      modalVisible: false,
      policyData: null,
      policyIndex: Number,
      reRenderKey: 0,
      polizas: Array
    };
  },
  methods: {
    openModal(data, index) {
      this.policyData = data;
      this.policyIndex = index;
      this.modalVisible = true;
    },
    terminar (arg) {
      this.modalVisible = false
      this.reRenderKey += 1;
      this.getPolicies()
    },
    getPolicies() {
      const url = "http://localhost:3000/clients/" + this.clientId;
      axios
        .get(url)
        .then(res => {
          this.polizas = res.data.data.policies
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    },
    reRenderDataTable () {
      this.$emit('reRenderDataTable')
    },
    reRenderCard () {
      this.$emit('reRenderCard')
    }
  },
  mounted () {
    this.getPolicies()
  },
    computed: {
      checker() {
        return this.terminar(this.clientId)
      }
    }
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px !important;
}

</style>

