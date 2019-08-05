<template>
  <v-dialog v-model="showModal" :checker="isVisibleChecker" persistent width="920">
    <v-card class="pa-3" v-if="policyInfo !== null">
      <v-card-title>
        <span class="headline ml-2 my-3 font-weight-medium">Póliza no. {{ policyInfo._policyNumber }}</span>
        <v-spacer></v-spacer>
        <Menu :items="policyOptions" icon="more_vert" @menuItemClicked="menuCallsBackendFor"/>
        <confirm ref="confirm"></confirm>
      </v-card-title>
      <v-divider></v-divider>
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
            <v-card flat class="py-3 radius-3 elevation-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <VerPolizaDatosGenerales :editMode="editMode" :policyInfo="policyInfo"/>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3 elevation-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <VerPolizaPlan :editMode="editMode" :policyInfo="policyInfo"/>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3 elevation-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <VerPolizaDireccion :editMode="editMode" :policyInfo="policyInfo"/>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-4" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3 elevation-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <h2>Componente gestión de archivos - PENDIENTE</h2>
                  <!-- <v-btn dark color="indigo lighten-1" class="elevation-0 rounded">
                    PDF
                    <v-icon dark right>attach_file</v-icon>
                  </v-btn> -->
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-5" :transition="false" :reverse-transition="false">
            <v-card flat class="py-3 radius-3 elevation-3">
              <v-layout justify-center class="mt-0">
                <v-flex xs11>
                  <VerPolizaClientesrelacionados :editMode="editMode" :policyInfo="policyInfo"/>
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
import VerPolizaPlan from "@/components/clientes/VerPolizaPlan.vue";
import VerPolizaDireccion from "@/components/clientes/VerPolizaDireccion.vue";
import VerPolizaClientesrelacionados from "@/components/clientes/VerPolizaClientesRelacionados.vue";
import Confirm from "@/components/utilities/Confirm.vue";
import Menu from "@/components/utilities/Menu.vue";

export default {
  name: "ModalVerPoliza",
  components: {
    VerPolizaDatosGenerales,
    VerPolizaPlan,
    VerPolizaDireccion,
    VerPolizaClientesrelacionados,
    Menu,
    Confirm
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
        { titulo: "Archivos", tabId: 4, badge: true },
        { titulo: "Clientes relacionados", tabId: 5, badge: true }
      ],
      policyOptions: [
      { title: "Eliminar póliza", icon: "delete", url: `http://localhost:3000/policies/${this.data.policyId._id}`},
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
    },
    async menuCallsBackendFor(index) {
      if (
        await this.$refs.confirm.open(
          "Borrar cliente",
          "¿Estás seguro de querer borrar al cliente? Esta acción es irreversible y podrías perder sus pólizas",
          {
            color: "red lighten-1"
          }
        )
      ) {
        axios
          .delete(`${this.policyOptions[index].url}`, {})
          .then(res => {
            this.getClient()
            this.$emit("reRenderDataTable");
          })
          .catch(err => {});
      } else {
        //Cancel
      }
    },
    getClient() {
      const url = "http://localhost:3000/clients/" + this.clientId;
      axios
        .get(url)
        .then(res => {
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
  min-height: 350px;;
}
</style>