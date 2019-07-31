<template>
<div v-if="contactInfo.length !== 0 && typeof contactInfo !== 'null'" class="mb-3" >
  <v-layout align-center justify-space-between class="pr-3 mb-3">
    <v-flex xs-10>

    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Tarjetas de contacto</h2>
    </v-flex>
    <v-flex xs2 class="text-xs-right">
    <ModalNuevoContacto :items="items" @reRenderCard="reRender"/>
    </v-flex>
  </v-layout>
  
  <div flat v-for="(contact, index) in contactInfo" :key="index">
<v-card v-if="contact.contactId !== null" class="radius-3 my-4" :key="reRenderKey">
    <v-card-title>
      <h2 class="subheading font-weight-bold blue-grey--text text--darken-2">{{ contact.contactId.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn small fab flat dark color="blue-grey" class="elevation-0"><v-icon dark>edit</v-icon></v-btn>
      <v-btn small fab flat dark color="red lighten-1" class="elevation-0"><v-icon dark>delete</v-icon></v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-layout wrap>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Mail</span>
            <span class="body-1 blue-grey--text text--darken-4 text-truncate">{{contact.contactId.email}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Teléfono</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.phone}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Móvil</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.mobile}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Dirección</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.street}} no. {{contact.contactId.address.number}}, {{contact.contactId.address.neighborhood}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Municipio o delegación</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.municipality}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Estado</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.state}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">CP</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.cp}}</span>
          </v-layout>
        </v-flex>

        <v-flex xs12 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Información adicional</span>
            <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.additionalInfo}}</span>
          </v-layout>
        </v-flex>

      </v-layout>
    </v-card-text>
  </v-card>
  </div>
  
</div>
<div v-else class="mb-3">
  <v-layout align-center justify-space-between class="pr-3 mb-3">
    <v-flex xs-10>

    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Sin información de contacto</h2>
    </v-flex>
    <v-flex xs2 class="text-xs-right">
    <ModalNuevoContacto :items="items" @reRenderCard="reRender" />
    </v-flex>
  </v-layout>
</div>
</template>

<script>

import ModalNuevoContacto from "@/components/clientes/ModalNuevoContacto.vue";

export default {
  name: "TarjetaInfoCliente",
  components: {
    ModalNuevoContacto
  },
  props: {
    contactInfo: Array,
    items: Object,
    reRenderKey: Number
  },
  data() {
    return {
    }
  },
  methods: {
    reRender() {
      this.$emit("reRenderCard");
    }
  }
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}
</style>

