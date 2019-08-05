<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start v-if="policyInfo !== null">
          <span class="title my-3 mr-3 font-weight-regular">Dirección de la póliza</span>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              small
              fab
              ligth
              flat
              color="indigo lighten-1"
              class="elevation-0"
              @click="editModeStatus = true"
              v-if="editModeStatus === false"
            >
              <v-icon small dark>edit</v-icon>
            </v-btn>
            <v-btn
              small
              fab
              dark
              color="green lighten-1"
              class="elevation-0"
              v-if="editModeStatus === true"
              @click="close"
            >
              <v-icon small dark>check</v-icon>
            </v-btn>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mb-5"></v-divider>
    <v-layout column>
      <v-layout wrap>
        <v-flex xs4 class="mb-3">
          <v-layout v-if="editModeStatus" wrap>
            <v-text-field
              v-model="policyInfo.address.street"
              label="calle"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="mx-3"
              clearable
            ></v-text-field>
          </v-layout>
          <v-layout column v-else>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Calle</span>
            <span
              class="body-1 blue-grey--text text--darken-4 text-capitalize"
              v-if="policyInfo !== null"
            >{{policyInfo.address.street}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.number"
                label="number"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Numero</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.number}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.neighborhood"
                label="colonia"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Colonia</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.neighborhood}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.municipality"
                label="municipio"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Municipio</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.municipality}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.state"
                label="estado"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Estado</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.state}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.cp"
                label="código postal"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Código postal</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.cp}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.address.additionalInfo"
                label="información adicional"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Información adicional</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.address.additionalInfo}}</span>
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
  name: "VerPolizaDireccion",
  props: {
    editMode: Boolean,
    policyInfo: Object
  },
  data() {
    return {
      editModeStatus: false,
    };
  },
  methods: {
    close () {
      this.saveGeneral()
    },
    saveGeneral () {
      axios
      .put("http://localhost:3000/policies/" + this.policyInfo._id, {
          address: this.policyInfo.address
        })
        .then(res => {
          this.editModeStatus = false;
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo editar el registro, favor de intentar más tarde."
          );
        });
    }
  },
  mounted () {
   this.editModeStatus = this.editMode;
  }
};
</script>
