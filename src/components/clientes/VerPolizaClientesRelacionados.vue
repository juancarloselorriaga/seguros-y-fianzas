<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start v-if="policyInfo !== null">
          <span class="title my-3 mr-3 font-weight-regular">Clientes relacionados</span>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mb-5"></v-divider>
    
    <v-layout column>
      <v-layout wrap>
        <v-flex xs4 class="mb-3">
          <v-layout v-if="editModeStatus" wrap>
            <v-text-field
              v-model="buyerObj.personalInfo.name"
              label="contratante"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="mx-3"
              clearable
            ></v-text-field>
          </v-layout>
          <v-layout column v-else>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Contratante</span>
            <span
              class="body-1 blue-grey--text text--darken-4 text-capitalize"
              v-if="buyerObj.personalInfo !== null && buyerObj.personalInfo !== undefined"
            >{{buyerObj.personalInfo.name}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
          <v-layout v-if="editModeStatus" wrap>
            <v-text-field
              v-model="insuredObjc.personalInfo.name"
              label="contratante"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="mx-3"
              clearable
            ></v-text-field>
          </v-layout>
          <v-layout column v-else>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Asegurado</span>
            <span
              class="body-1 blue-grey--text text--darken-4 text-capitalize"
              v-if="insuredObjc.personalInfo !== null && insuredObjc.personalInfo !== undefined"
            >{{insuredObjc.personalInfo.name}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>
      </v-layout>

      
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "VerPolizaClientesRelacionados",
  props: {
    editMode: Boolean,
    policyInfo: Object
  },
  data() {
    return {
      editModeStatus: false,
      buyerObj: Object,
      insuredObjc: Object
    };
  },
  methods: {
    getBuyer(buyerId) {
      const url = "http://localhost:3000/clients/" + buyerId;
      axios
        .get(url)
        .then(res => {
          this.buyerObj = res.data.data
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    },
    getInsured(buyerId) {
      const url = "http://localhost:3000/clients/" + buyerId;
      axios
        .get(url)
        .then(res => {
          this.insuredObjc = res.data.data
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    }
  },
  mounted () {
   this.editModeStatus = this.editMode;
   if(this.policyInfo._buyer){
     this.getBuyer(this.policyInfo._buyer)
   }
   if(this.policyInfo._insured){
     this.getInsured(this.policyInfo._insured)
   }
  }
};
</script>
