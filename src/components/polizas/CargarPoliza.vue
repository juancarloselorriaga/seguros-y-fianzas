<template>
  <div>
    <v-card  color="white" height="380px" flat>
      <v-card-title>
        <span class="headline ml-2  font-weight-medium">Elige el método de captura de la póliza</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-container fluid fill-height v-if="!uploadDetails">
        <v-layout justify-center align-center  column class="mt-5">
          <v-layout align-center>
            <v-flex class="text-xs-center">
              <PdfPolicyReader :clientId="clientId" @fileRead="fileRead"/>
            </v-flex>
            <span class="title mx-3">ó</span>
            <v-flex class="text-xs-center">
              <v-btn flat large dark color="blue-grey lighten-1 elevation-0">Captura manual
                <v-icon right>text_fields</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        <v-flex>
            <span class="body-1">Si el tipo de póliza no aparece en la lista, por favor haz una captura manual</span>
          </v-flex>
      </v-layout>
      </v-container>

      <v-container fluid fill-height v-if="uploadDetails">
        <v-layout>
          <v-layout align-start>
            <v-flex>
              <h2>Completa los datos de la póliza</h2>
            </v-flex>
          </v-layout>
      </v-layout>
      </v-container>
    </v-card>

    <v-layout>
      <v-spacer></v-spacer>
      <v-btn flat class="mt-5 blue-grey--text">Cancelar</v-btn>
    </v-layout>
  </div>
</template>

<script>

import PdfPolicyReader from "@/components/utilities/PdfPolicyReader.vue";

export default {
  name: "CargarPoliza",
  components: {
    PdfPolicyReader
  },
  props: {
    clientId: String
  },
  data () {
    return {
      uploadDetails: null
    }
  },
  methods: {
    fileRead(info) {
      this.uploadDetails = info;
    }
  }
};
</script>

<style scoped>

button {
  border-radius: 30px;
}
</style>


