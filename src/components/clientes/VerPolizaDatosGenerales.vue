<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start v-if="policyInfo !== null">
          <v-layout v-if="editModeStatus">
            <v-flex xs9>
              <v-text-field
                v-model="policyInfo._policyNumber"
                label="número de póliza"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
                    >
              </v-text-field>
            </v-flex>
          </v-layout>
          <span class="title my-3 mr-3 font-weight-regular" v-else>{{ policyInfo._policyNumber }}</span>
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
              v-model="policyInfo.company"
              label="compañía"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="mx-3"
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
                label="ramo"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
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
                v-model="policyInfo.class.key"
                label="clave del ramo"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
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
              <v-menu
                        color="indigo lighten-1"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="policyInfo.issuanceDate"
                            label="Fecha de emisión"
                            readonly
                            v-on="on"
                            color="indigo lighten-1"
                            class="mx-3"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="policyInfo.issuanceDate"
                          @input="menu = false"
                          locale="es-419"
                          color="indigo lighten-1"
                        ></v-date-picker>
                      </v-menu>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de emisión</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="policyInfo !== null"
              >{{moment(new Date(policyInfo.issuanceDate).toISOString().substr(0, 10)).format('ll')}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-menu
                        color="indigo lighten-1"
                        v-model="menuExp"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="policyInfo.expirationDate"
                            label="Fecha de emisión"
                            readonly
                            v-on="on"
                            color="indigo lighten-1"
                            class="mx-3"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="policyInfo.expirationDate"
                          @input="menuExp = false"
                          locale="es-419"
                          color="indigo lighten-1"
                        ></v-date-picker>
                      </v-menu>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de vencimiento</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{moment(new Date(policyInfo.expirationDate).toISOString().substr(0, 10)).format('ll')}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus">
              <v-select
                color="indigo lighten-1"
                v-model="policyInfo.paymentType"
                :items="tipoPagoItems"
                label="tipo de pago"
                class="mx-3"
                required
              ></v-select>
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
              <v-select
                color="indigo lighten-1"
                v-model="policyInfo.currency"
                :items="monedaItems"
                label="moneda"
                class="mx-3"
                required
              ></v-select>
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
              <v-select
                color="indigo lighten-1"
                v-model="policyInfo.paymentMethod"
                :items="metodoDePagoItems"
                label="conducto de pago"
                class="mx-3"
                required
              ></v-select>
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
              <v-select
                color="indigo lighten-1"
                v-model="policyInfo.paymentStatus"
                :items="estatusPagoItems"
                label="estatus"
                class="mx-3"
                required
              ></v-select>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Estatus</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-lowercase"
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

import axios from "axios";

var moment = require("moment");
moment.locale("es");

export default {
  name: "VerPolizaDatosGenerales",
  props: {
    editMode: Boolean,
    policyInfo: Object
  },
  data() {
    return {
      moment: moment,
      editModeStatus: false,
      menu: false,
      menuExp: false,
      tipoPagoItems: ["Mensual", "Trimestral", "Semestral", "Anual"],
      monedaItems: ["USD", "MXN", "EUR", "UDI"],
      metodoDePagoItems: ["Agente", "Cargo automático", "Via Telefónica"],
      estatusPagoItems: ["pagado", "sin pago", "vencido"],
    };
  },
  methods: {
    close () {
      this.saveGeneral()
    },
    saveGeneral () {
      axios
      .put("http://localhost:3000/policies/" + this.policyInfo._id, {
          _policyNumber: this.policyInfo._policyNumber,
          company: this.policyInfo.company,
          class: {
            title: this.policyInfo.class.title,
            key: this.policyInfo.class.key
          },
          issuanceDate: this.policyInfo.issuanceDate,
          expirationDate: this.policyInfo.expirationDate,
          paymentType: this.policyInfo.paymentType,
          currency: this.policyInfo.currency,
          paymentMethod: this.policyInfo.paymentMethod,
          paymentStatus: this.policyInfo.paymentStatus
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
