<template>
  <v-card class="pt-2 pb-2 radius-3" >
    <v-layout column class="white">
      <v-card-title>
        <span class="headline blue-grey--text text--darken-4 ml-2 my-1">{{items.personalInfo.name}}</span>
        <v-spacer></v-spacer>
        <Menu :items="clientOptions" icon="more_vert" @menuItemClicked="menuCallsBackendFor" />
        <confirm ref="confirm"></confirm>
      </v-card-title>

      <v-divider class="mb-3"></v-divider>

      <v-tabs slider-color="indigo lighten-1" v-model="tabs" class="mb-4" centered >
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
          <v-card flat class="py-3 radius-3">
            <v-layout justify-center class="mt-0">
              <v-flex xs11>
                <TarjetaInfoCliente
                  :clientId="items._id"
                  @reRenderCard="reRenderCard"
                />
              </v-flex>
            </v-layout>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-2" :transition="false" :reverse-transition="false">
          <v-card flat class="py-3 radius-3">
            <v-layout justify-center class="mt-0">
              <v-flex xs11>
                <TarjetaInfoContacto
                  :contactInfo="items.contactInfo"
                  :items="items"
                  @reRenderCard="reRenderCard"
                />
              </v-flex>
            </v-layout>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-3" :transition="false" :reverse-transition="false">
          <v-card flat class="py-3 radius-3">
            <TarjetaDashboard :items="items" />

            <v-divider class="my-3"></v-divider>
            <v-layout justify-center class="mt-0">
              <v-flex xs11>
                <TarjetaPolizasRelacionadas :clientId="items._id" @reRenderCard="reRenderCard" @reRenderDataTable="reRender"/>
              </v-flex>
            </v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-layout>
  </v-card>
</template>

<script>
import TarjetaInfoContacto from "@/components/clientes/TarjetaInfoContacto.vue";
import TarjetaInfoCliente from "@/components/clientes/TarjetaInfoCliente.vue";
import TarjetaDashboard from "@/components/clientes/TarjetaDashboard.vue";
import TarjetaPolizasRelacionadas from "@/components/clientes/TarjetaPolizasRelacionadas.vue";
import Menu from "@/components/utilities/Menu.vue";
import Confirm from "@/components/utilities/Confirm.vue";
import axios from "axios";

export default {
  name: "Clientes",
  props: {
    items: Object,
    reRenderKey: Number
  },
  components: {
    TarjetaInfoContacto,
    TarjetaInfoCliente,
    TarjetaPolizasRelacionadas,
    Menu,
    TarjetaDashboard,
    Confirm
  },
  data() {
    return {
      tabs: null,
      tabItems: [
        { titulo: "General", tabId: 1, badge: true },
        { titulo: "Contacto", tabId: 2, badge: true },
        { titulo: "Pólizas", tabId: 3, badge: true }
      ],
      clientOptions: [
        {
          title: "Eliminar cliente",
          icon: "delete",
          url: `http://localhost:3000/clients/${this.items._id}`
        }
      ]
    };
  },
  methods: {
    reRender() {
      this.$emit("reRenderDataTable");
    },
    reRenderCard() {
      this.$emit("reRenderCard");
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
          .delete(`${this.clientOptions[index].url}`, {})
          .then(res => {
            this.$emit("reRenderDataTable");
          })
          .catch(err => {});
      } else {
        //Cancel
      }
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
