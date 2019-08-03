<template>
  <v-container fluid fill-height class="pa-0">
    <v-layout justify-center>
      <v-card align-self-start class="pt-2 pb-5" >
        <v-layout column class="white">
          <v-layout justify-center class="mt-4 mb-2">
            <v-flex xs8>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                color="red lighten-1"
                clearable
                class="radius"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="clientes"
            :search="search"
            rows-per-page-text="Elementos por página"
            no-data-text="No hay datos disponibles"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :pagination.sync="pagination"
            :key="reRender"
          >
            <template v-slot:items="props">
              <tr @click="selectRow(props.item)">
              <td class="text-xs-left blue-grey--text text--darken-4 text-capitalize subheading" v-if="props.item.personalInfo.name"> 
                <v-layout justify-start>{{ props.item.personalInfo.name }}</v-layout>
              </td>
              <td class="text-xs-center blue-grey--text text--darken-4 text-capitalize">
                <v-layout justify-center v-if="props.item.vigentes < 0">
                  <v-avatar size="32" color="green lighten-3">
                    <span
                      class="blue-grey--text text--darken-3 title font-weight-bold"
                    >1</span>
                  </v-avatar>
                </v-layout>
                <v-layout justify-center v-else>
                  <v-avatar size="32" color="green">
                    <span class="white--text text--darken-3 title font-weight-bold">{{props.item.policies.length}}</span>
                  </v-avatar>
                </v-layout>
              </td>
              <td class="justify-center layout px-0 pa-5">
                <v-icon color="indigo lighten-2">chevron_right</v-icon>
              </td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >La búsqueda de "{{ search }}" no coincide con ningún evento.</v-alert>
            </template>
          </v-data-table>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: "ListadoClientes",
  props: {
    clientes: Array,
    reRender: Number
  },
  data() {
    return {
      search: "",
      pagination: {
        rowsPerPage: -1, //default filas al cargar la página
        sortBy: "nombre",
        descending: true
      },
      headers: [
        { text: "Nombre", align: "left", value: "personalInfo.name" },
        { text: "Pólizas vigentes", align: "center", value: "vigentes" },
        { text: "", align: "center", value: "icon" }
      ]
    }
  },
  methods: {
    selectRow (row) {
      this.$emit('selectRow', row)
    }
  },
  computed: {
  },
  mounted() {
  }
};
</script>

<style scoped>
.v-sheet {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}

.radius .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 100px !important;
}
</style>

