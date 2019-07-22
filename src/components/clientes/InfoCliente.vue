<template>
  <v-card flat>
    
    <v-card-text>
      <v-layout wrap>
        <v-flex xs6 v-for="(item, index) in items" :key="index" class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Title</span>
            <span class="body-1 blue-grey--text text--darken-4">Content</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "InfoCliente",
  props: {
    items: Array
  }
};
</script>
