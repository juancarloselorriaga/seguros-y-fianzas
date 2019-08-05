<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <SimpleUpload />
        <!-- <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="title" label="título del archivo" required type="text"></v-text-field>
          <v-text-field v-model="description" label="descripción del archivo" required type="text"></v-text-field>
          <v-text-field v-model="file" label="archivo" required type="file"></v-text-field>
          
          <v-btn dark :disabled="!valid" color="indigo lighten-1" class="elevation-0 rounded" @click="uploadFile">
                    Subir archivo
                    <v-icon dark right>attach_file</v-icon>
                  </v-btn>
        </v-form> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";
import SimpleUpload from "@/components/utilities/SimpleUpload.vue"; 

export default {
  props: {
    policyId: String
  },
  components: {
    SimpleUpload
  },
  data() {
    return {
      valid: true,
      title: "",
      description: "",
      file: null
    };
  },
  methods: {
    uploadFile () {
      const url = `http://localhost:3000/policies/${this.policyId}/add-file`
      const data = {
        title: this.title,
        description: this.description,
        file: this.file
      }

      axios
        .post(url, data)
        .then(res => {
          this.file = null
          this.title = ''
          this.description = ''
        })
        .catch(err => {console.log(err)});
    }
  }
};
</script>

