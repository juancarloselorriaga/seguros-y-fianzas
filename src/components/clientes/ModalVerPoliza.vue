<template>
  <v-dialog v-model="showModal" :checker="isVisibleChecker" persistent width="920">
    <v-card class="pa-3">
      <v-card-text class="my-0">
        <v-tabs slider-color="indigo lighten-1" v-model="tabs" class="mb-4" centered>
          <v-tab
            v-for="tabItem in tabItems"
            :href="`#tab-${tabItem.tabId}`"
            :key="tabItem.titulo"
            class="mr-3"
          >
            <span class="body-2 indigo--text text--lighten-1">{{ tabItem.titulo }}</span>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs" touchless>
          <v-tab-item value="tab-1" :transition="false" :reverse-transition="false">
            <v-card flat class="radius-3">
              <VerPolizaDatosGenerales :editMode="editMode" :policyInfo="policyInfo"/>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <h2>Componente Plan</h2>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <h2>Componente Dirección</h2>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-4" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <h2>Componente gestión de archivos</h2>
                  <v-btn dark color="indigo lighten-1" class="elevation-0 rounded">
                    PDF
                    <v-icon dark right>attach_file</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="indigo lighten-1" class="rounded" @click="$emit('close')">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import axios from "axios";
import VerPolizaDatosGenerales from "@/components/clientes/VerPolizaDatosGenerales.vue";

export default {
  name: "ModalVerPoliza",
  components: {
    VerPolizaDatosGenerales
  },
  props: {
    data: Object,
    index: Number,
    isVisible: Boolean,
    clientId: String
  },
  data() {
    return {
      showModal: false,
      editMode: false,
      tabs: null,
      tabItems: [
        { titulo: "Datos generales", tabId: 1, badge: true },
        { titulo: "Plan", tabId: 2, badge: true },
        { titulo: "Dirección", tabId: 3, badge: true },
        { titulo: "Archivos", tabId: 4, badge: true }
      ],
      policyInfo: null
    };
  },
  methods: {
    getPolicy(clientId, index) {
      const url = "http://localhost:3000/clients/" + this.clientId;
      axios
        .get(url)
        .then(res => {
          this.policyInfo = res.data.data.policies[index].policyId;
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    }
  },
  computed: {
    isVisibleChecker() {
      return (this.showModal = this.isVisible);
    }
  },
  mounted() {
    this.getPolicy(this.clientId, this.index);
  }
};
</script>

<style scoped>
button.rounded {
  border-radius: 16px;
}

.v-sheet {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}
</style>