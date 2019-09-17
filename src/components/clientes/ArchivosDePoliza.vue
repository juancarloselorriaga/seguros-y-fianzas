<template>
  <v-layout column class="mt-2" :checker="updateItems">
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start v-if="files.length !== 0">
          <span class="title my-3 mr-3 font-weight-regular">Archivos disponibles</span>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mb-5" v-if="files.length !== 0"></v-divider>
    <v-layout wrap class="py-2">
      <v-flex xs3 class="mx-2 text-xs-right" v-for="(file, index) in files" :key="index">
      <v-card class="pa-2 my-1">
        <v-card-title>
          <span class="caption font-weight-regular text-uppercase text-truncate">{{ file.Key | nombreArchivo(index)}} </span>
        </v-card-title>
        <v-card-text>
          <!-- <v-img class="mb-2" :src="`https://syf-archivos-usuarios.s3.us-east-2.amazonaws.com/${file.Key}`" aspect-ratio="2"></v-img> -->
          <v-layout justify-center>
            <v-icon large color="indigo lighten-1">attach_file</v-icon>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn fab flat small>
              <a @click="deleteItem(index)">
            <v-icon color="red lighten-1">delete</v-icon>
            </a></v-btn>
            <v-btn fab flat small>
              <a :href="`https://syf-archivos-usuarios.s3.us-east-2.amazonaws.com/${file.Key}`" target="_blank">
                <v-icon color="blue-grey lighten-1">cloud_download</v-icon>
            </a></v-btn>
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
    checker: String,
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    async getFiles() {
      const url = `${process.env.VUE_APP_HOST}/policies/${this.policyId}/get-files`;
      try {
        const res = await axios.get(url);
        this.files = res.data.policyFiles;
      } catch (err) {
        alert("Error al consultar los archivos de la póliza", err);
      }
    },
    async deleteItem(index){
      let fileKey = {Key: this.files[index].Key};
      const url = `${process.env.VUE_APP_HOST}/policies/${this.policyId}/delete-file`;

      try {
          const res = await axios.post(url, fileKey)
          this.getFiles();
        } catch (err) {
          this.message = err.response.data.err;
          this.error = true;
        }
    }
  },
  filters: {
    nombreArchivo (value, index) {
      let  newStr = value.split('-')[1].split('.')[0] + ' ' + value.split('-')[1].split('.')[1]
      return newStr
    }
  },
  computed: {
    updateItems () {
      this.getFiles()
      return this.checker
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

