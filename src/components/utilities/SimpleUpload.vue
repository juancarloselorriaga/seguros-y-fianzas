<template>
    <v-flex xs12>
      <form enctype="multipart/form-data" @submit.prevent="sendFile">
        <v-layout justify-start column>
          <v-layout class="pa-4 outline radius-3" justify-center align-center>
            <label>
              <v-layout column align-center>
                <input type="file" ref="file" @change="selectFile" style="visibility:hidden" />
                <v-flex xs12>
                  <v-icon color="indigo lighten-1" light left x-large>cloud_upload</v-icon>
                </v-flex>
                <v-flex xs12 class="mt-3">
                  <span class="title indigo--text text--lighten-1">Selecciona un archivo</span>
                </v-flex>
              </v-layout>
            </label>
          </v-layout>
          <v-layout>
            <v-flex xs12 class="my-3 text-xs-center">
              <span
                v-if="file"
                class="blue-grey--text text--darken-2 subheading"
              >Archivo seleccionado: {{file.name}}</span>
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

          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <button class="button indigo my-3">Guardar archivo</button>
            </v-flex>
          </v-layout>
        </v-layout>
      </form>
    </v-flex>
</template>

<script>
import axios from "axios";

export default {
  name: "SimpleUpload",
  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploadedFiles: []
    };
  },
  methods: {
    selectFile() {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
      const file = this.$refs.file.files[0];
      const MAX_SIZE = 2000000;
      const tooLarge = file.size > MAX_SIZE;

      //Error hadling del lado del cliente
      if(allowedTypes.includes(file.type) && !tooLarge){
          this.file = file;
          this.error = false;
          this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge ? `Archivo muy grande. El tamaño máximo es de ${MAX_SIZE / 1000} Kb` : 'Error: solo se permiten archivos png, jpeg y PDF.'
      }
    },
    async sendFile() {
      const url = `http://localhost:3000/policies/${this.policyId}/save-file`;
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        await axios.post(url, formData);
        this.message = "El archivo ha sido guardado";
        this.file = "";
        this.error = false;
      } catch (err) {
        this.message = err.response.data.err
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
  border: 1px solid #5c6bc0;
}
</style>

