<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs11>
        <v-layout align-center justify-space-between v-if="policyInfo !== null">
          <span class="title my-3 font-weight-regular">Póliza no. <strong>{{ policyInfo._policyNumber }}</strong></span>
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
              @click="editModeStatus = false"
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
              v-model="policyInfo.company"
              label="compañía"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="ma-3"
              clearable
            ></v-text-field>
          </v-layout>
          <v-layout column v-else>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Compañía</span>
            <span
              class="body-1 blue-grey--text text--darken-4 text-capitalize"
              v-if="policyInfo !== null"
            >{{policyInfo.company}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.class.title"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Ramo</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.class.title}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.issuanceDate"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Clave del ramo</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.class.key}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.issuanceDate"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de emisión</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.issuanceDate}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.expirationDate"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de vencimiento</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.expirationDate}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.paymentType"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Tipo de pago</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.paymentType}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>
        
        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.currency"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Moneda</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.currency}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.paymentMethod"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Conducto de pago</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.paymentMethod}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

         <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.paymentStatus"
                label="moneda"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Estatus</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.paymentStatus}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>
        

      </v-layout>

      
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "VerPolizaDatosGenerales",
  props: {
    editMode: Boolean,
    policyInfo: Object
  },
  data() {
    return {
      editModeStatus: false,
    };
  },
  mounted () {
   this.editModeStatus = this.editMode;
  }
};
</script>
