<template>
<div>
  
<v-layout align-center justify-space-between class="pr-3 mb-3">
    <h2 class="title font-weight-regular blue-grey--text text--darken-2">Información</h2>
  </v-layout>
  <v-card  class="radius-3 my-4">

    <v-card-title>
      <h2 class="subheading font-weight-bold blue-grey--text text--darken-2">Datos generales</h2>
      <v-spacer></v-spacer>
      <v-btn small fab flat dark color="blue-grey" class="elevation-0"><v-icon dark>edit</v-icon></v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-layout wrap>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de nacimiento</span>
            <span class="body-1 blue-grey--text text--darken-4" v-if="personal.birthdate !== undefined">{{ moment(personal.birthdate).format('ll')}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Estado civil</span>
            <span class="body-1 blue-grey--text text--darken-4 text-lowercase" v-if="personal.maritalStatus !== undefined">{{personal.maritalStatus}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Género</span>
            <span class="body-1 blue-grey--text text--darken-4 text-lowercase" v-if="personal.gender !== undefined">{{personal.gender}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Compañia</span>
            <span class="body-1 blue-grey--text text--darken-4 text-capitalize" v-if="professional !== undefined">{{professional.company}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Ocupación</span>
            <span class="body-1 blue-grey--text text--darken-4 text-capitalize" v-if="professional !== undefined">{{professional.occupation}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">RFC</span>
            <span class="body-1 blue-grey--text text--darken-4 text-uppercase" v-if="legal !== undefined">{{legal.rfc}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">CURP</span>
            <span class="body-1 blue-grey--text text--darken-4 text-uppercase" v-if="legal !== undefined">{{legal.curp}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Referencia</span>
            <span class="body-1 blue-grey--text text--darken-4" v-if="additional !== undefined">{{additional.reference}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Enfermedades</span>
            <span class="body-1 blue-grey--text text--darken-4" v-if="medical !== undefined && medical.diseases.length === 0">sin registro</span>
            <ul v-else>
              <li v-for="(disease, index) in diseases" :key="index">{{disease}}</li>
            </ul>
          </v-layout>
        </v-flex>

        <v-flex xs6 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Fumador</span>
            <span class="body-1 blue-grey--text text--darken-4" v-if="medical !== undefined && medical.isSmoker === false">No</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else-if="medical !== undefined && medical.isSmoker === true">Sí</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs12 class="mb-3">
          <v-layout column>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Comentarios</span>
            <span class="body-1 blue-grey--text text--darken-4" v-if="additional !== undefined">{{additional.comments}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin comentarios</span>
          </v-layout>
        </v-flex>


      </v-layout>
    </v-card-text>
  </v-card>
</div>
</template>

<script>

var moment = require("moment");
moment.locale("es");

export default {
  name: "TarjetaInfoCliente",
  props: {
    personal: Object,
    professional: Object,
    medical: Object,
    legal: Object,
    additional: Object,
    diseases: Array,
    contactInfo: Object
  },
  data() {
    return {
      moment: moment
    }
  }
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}
</style>
