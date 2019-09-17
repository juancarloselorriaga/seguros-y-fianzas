<template>
    <v-flex xs12>
      <form enctype="multipart/form-data" @submit.prevent="sendFile">
        <v-layout justify-start column>
          <v-layout class="pa-4 outline radius-3" justify-center align-center>
            <label>
              <v-layout column align-center>
                <input multiple type="file" ref="files" @change="selectFile" style="visibility:hidden" />
                <v-flex xs12>
                  <v-icon color="indigo lighten-1" light left x-large>cloud_upload</v-icon>
                </v-flex>
                <v-flex xs12 class="mt-3">
                  <span class="title indigo--text text--lighten-1">Selecciona tus archivos</span>
                </v-flex>
              </v-layout>
            </label>
          </v-layout>
          <v-layout>
            <v-flex xs12 class="my-3 text-xs-center">
              <!-- File management system -->
            </v-flex>
          </v-layout>

          <v-layout
            v-if="message"
            :class="`message ${error ? 'text--red' : 'green--text text--darken-4'}`"
            justify-center
            align-center
          >
            <v-flex xs-6 class="text-xs-center"><span class="subheading my-3">{{message}}</span>
            <v-icon right color="green darken-4" v-if="!error">check_circle</v-icon>
            </v-flex>
          </v-layout>

          <v-layout column>
            <v-flex xs8 v-for="(file, index) in files" :key="index" :class="`${file.invalidMessage && 'red--text'}`">
              <v-layout align-center>
                <span class="blue-grey--text text--darken-2 subheading">{{file.name}}</span>
                <span v-if="file.invalidMessage" class="caption">&nbsp;- {{ file.invalidMessage }}</span>
                <v-spacer></v-spacer>
                <v-btn small fab flat color="red lighten-1" @click="files.splice(index, 1); uploadFiles.splice(index, 1)"><v-icon small>cancel</v-icon></v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <!-- Left -->
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <button class="button indigo my-3">Guardar archivos</button>
            </v-flex>
          </v-layout>
        </v-layout>
      </form>
    </v-flex>
</template>

<script>
import axios from "axios";
import _ from 'lodash';

export default {
  name: "MultipleUpload",
  data() {
    return {
      files: [],
      uploadFiles: [],
      message: "",
      error: false
    };
  },
  methods: {
    selectFile() {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.files, ...files];

      this.files = [
        ...this.files,
        ..._.map(files,file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ]
    },
    validate(file){
      const MAX_SIZE = 2000000;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];

      if(file.size >  MAX_SIZE) {
        return `Tamñano máximo: ${MAX_SIZE/1000}Kb`
      }
      if(!allowedTypes.includes(file.type)){
        return 'Formato inválido';
      }
      return '';
    },
    async sendFile() {
      const url = `${process.env.VUE_APP_HOST}/policies/${this.policyId}/add-files`;
      const formData = new FormData();

      _.forEach(this.uploadFiles, file => {
        if(this.validate(file) === ''){
          formData.append('files', file);
        }
      });

      try{
        await axios.post(url, formData);
        this.message = 'Los archivos han sido guardados';
        this.files = [];
        this.uploadFiles = []
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
    }
  }
};
</script>


<style scoped>
.indigo {
  background-color: #5c6bc0;
}

button {
  padding: 8px 16px;
  text-transform: uppercase;
  border-radius: 16px;
  color: white;
  font-weight: 500;
}

.radius-3 {
  border-radius: 30px;
}

.outline {
  border: 1px solid #FFCA28;
}
</style>

