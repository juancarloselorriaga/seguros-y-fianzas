<template>
  <div>
    <v-layout column class="mt-0">
      
      <v-flex xs8 class="mx-2">
        <ArchivosDePoliza :policyId="policyId" :key="keyChecker"/>
      </v-flex>

      <v-flex xs4 class="mx-2">
        <SimpleUpload @fileUploaded="fileUploaded" :policyId="policyId"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import SimpleUpload from "@/components/utilities/SimpleUpload.vue";
import ArchivosDePoliza from "@/components/clientes/ArchivosDePoliza.vue";

export default {
  props: {
    policyId: String
  },
  components: {
    SimpleUpload,
    ArchivosDePoliza
  },
  data() {
    return {
      valid: true,
      title: "",
      description: "",
      file: null,
      filesKey: null
    };
  },
  methods: {
    uploadFile() {
      const url = `http://localhost:3000/policies/${this.policyId}/add-file`;
      const data = {
        title: this.title,
        description: this.description,
        file: this.file
      };

      axios
        .post(url, data)
        .then(res => {
          this.file = null;
          this.title = "";
          this.description = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    fileUploaded(res){
      this.filesKey = res.data.file;
    }
  },
  computed: {
    keyChecker () {
      if(this.filesKey !== null){
        return (this.filesKey).toString();
      }
        return this.filesKey
    }
  }
};
</script>



