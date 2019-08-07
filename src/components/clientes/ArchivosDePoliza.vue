<template>
  <v-layout column class="mt-5">
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start>
          <span class="title my-3 mr-3 font-weight-regular">Archivos disponibles</span>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mb-5"></v-divider>
    <v-layout wrap class="py-4">

      <v-flex xs2 class="mx-2 text-xs-right" v-for="(file, index) in files" :key="index">
      <v-card class="pa-2 my-1">
        <v-card-title>
          <span class="body-2 font-weight-medium text-uppercase text-truncate">{{ file.Key | nombreArchivo(index)}}</span>
        </v-card-title>
        <v-card-text>
          <v-img class="mb-2" :src="`https://syf-archivos-usuarios.s3.us-east-2.amazonaws.com/${file.Key}`" aspect-ratio="2"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a :href="`https://syf-archivos-usuarios.s3.us-east-2.amazonaws.com/${file.Key}`">
            <v-icon right color="blue-grey lighten-1">cloud_download</v-icon> </a>
        </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  name: "ArchivosDePoliza",
  props: {
    policyId: String,
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    async getFiles() {
      const url = `http://localhost:3000/policies/${this.policyId}/get-files`;

      try {
        const res = await axios.get(url);
        this.files = res.data.policyFiles;
      } catch (err) {
        alert("Error al consultar los archivos de la póliza", err);
      }
    }
  },
  filters: {
    nombreArchivo (value, index) {
      let  newStr = value.split('-')[1].split('.')[0]
      return newStr
    }
  },
  mounted() {
    this.getFiles();
  }
};
</script>

<style scoped>
.v-sheet {
  border-radius: 30px;
  max-height: 300px;
}

a{
  text-decoration: none;
  color: #78909C;
}
</style>

