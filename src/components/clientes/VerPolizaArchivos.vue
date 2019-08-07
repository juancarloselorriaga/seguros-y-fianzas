<template>
  <div>
    <v-layout justify-space-around class="mt-0">
      <v-flex xs6 class="mx-2">
        <SimpleUpload />
      </v-flex>
      <v-flex xs6 class="mx-2">
        <MultipleUpload />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import SimpleUpload from "@/components/utilities/SimpleUpload.vue";
import MultipleUpload from "@/components/utilities/MultipleUpload.vue";

export default {
  props: {
    policyId: String
  },
  components: {
    SimpleUpload,
    MultipleUpload
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
    }
  }
};
</script>



