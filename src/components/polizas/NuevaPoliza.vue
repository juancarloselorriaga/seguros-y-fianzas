<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition radius-3">
      <template v-slot:activator="{ on }">
        <v-btn flat color="indigo lighten-1" v-on="on">Capturar nueva póliza manualmente</v-btn>
      </template>
      <v-card class="radius-3">
        <v-container fluid fill-height>
          <v-layout column>
            <v-card-title>
              <h2>Nueva póliza</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout class="mb-5 px-3" justify-center>
                <v-flex xs4>
                  <v-layout column class="px-5">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                      <h2 class="heading blue-grey--text text--darken-4">General</h2>

                      <v-subheader class="pl-0 indigo--text text--lighten-1">Número de póliza</v-subheader>

                      <v-text-field
                        v-model="numPoliza"
                        :rules="requiredRules"
                        label="no. de póliza"
                        required
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-subheader class="pl-0 indigo--text text--lighten-1">Datos de la compañia</v-subheader>

                      <v-text-field
                        v-model="compania"
                        :rules="requiredRules"
                        label="compañía"
                        required
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-layout>
                        <v-text-field
                          color="indigo lighten-1"
                          v-model="ramoTitulo"
                          :rules="requiredRules"
                          label="ramo"
                          required
                          class="mr-4"
                        ></v-text-field>

                        <v-text-field
                          v-model="ramoClave"
                          :rules="requiredRules"
                          label="clave del ramo"
                          required
                          class="ml-4"
                          color="indigo lighten-1"
                        ></v-text-field>
                      </v-layout>
                      <v-subheader class="pl-0 indigo--text text--lighten-1">Vigencia</v-subheader>
                      <v-layout>
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
                              v-model="fechaEmision"
                              label="Fecha de emisión"
                              readonly
                              v-on="on"
                              color="indigo lighten-1"
                              class="mr-4"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fechaEmision"
                            @input="menu = false"
                            locale="es-419"
                            color="indigo lighten-1"
                          ></v-date-picker>
                        </v-menu>

                        <v-menu
                          color="indigo lighten-1"
                          v-model="menu1"
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
                              v-model="fechaVencimiento"
                              label="Fecha de vencimiento"
                              readonly
                              v-on="on"
                              color="indigo lighten-1"
                              class="ml-4"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fechaVencimiento"
                            @input="menu1 = false"
                            locale="es-419"
                            color="indigo lighten-1"
                          ></v-date-picker>
                        </v-menu>
                      </v-layout>

                      <v-subheader class="pl-0 indigo--text text--lighten-1">Datos de pago</v-subheader>

                      <v-layout>
                        <v-select
                          color="indigo lighten-1"
                          v-model="selectTipoPago"
                          :items="tipoPagoItems"
                          :rules="[v => !!v || 'El tipo de pago es un campo requerido']"
                          label="tipo de pago"
                          class="mr-4"
                          required
                        ></v-select>

                        <v-select
                          color="indigo lighten-1"
                          v-model="selectMoneda"
                          :items="monedaItems"
                          :rules="[v => !!v || 'La moneda es un campo requerido']"
                          label="moneda"
                          class="mr-4"
                          required
                        ></v-select>
                      </v-layout>

                      <v-select
                        color="indigo lighten-1"
                        v-model="selectMetodoDePago"
                        :items="metodoDePagoItems"
                        :rules="[v => !!v || 'El conducto de pago es un campo requerido']"
                        label="conducto de pago"
                        class="mr-4"
                        required
                      ></v-select>

                      <v-layout>
                        <v-checkbox
                          v-model="isPagado"
                          label="Póliza pagada"
                          color="indigo"
                          class="mr-4"
                        ></v-checkbox>
                      </v-layout>
                    </v-form>
                  </v-layout>
                </v-flex>

                <v-flex xs4>
                  <v-layout column class="px-5">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                      <h2 class="heading blue-grey--text text--darken-4">Plan</h2>
                      <v-subheader class="pl-0 indigo--text text--lighten-1">General</v-subheader>

                      <v-layout>
                        <v-text-field
                          color="indigo lighten-1"
                          v-model="nombrePlan"
                          :rules="requiredRules"
                          label="nombre del plan"
                          required
                          class="mr-4"
                        ></v-text-field>

                        <v-text-field
                          color="indigo lighten-1"
                          v-model="clavePlan"
                          :rules="requiredRules"
                          label="clave del plan"
                          required
                          class="mr-4"
                        ></v-text-field>
                      </v-layout>

                      <v-subheader class="pl-0 indigo--text text--lighten-1">Cobertura y montos</v-subheader>

                      <v-text-field
                        color="indigo lighten-1"
                        v-model="cobertura"
                        :rules="requiredRules"
                        label="cobertura"
                        required
                      ></v-text-field>

                      <v-text-field
                        color="indigo lighten-1"
                        prefix="$"
                        v-model="primaNeta"
                        :rules="requiredRules"
                        label="prima neta"
                        required
                      ></v-text-field>

                      <v-text-field
                        color="indigo lighten-1"
                        prefix="$"
                        v-model="primaTotal"
                        :rules="requiredRules"
                        label="prima total"
                        required
                      ></v-text-field>

                      <v-layout column>
                        <v-switch
                          v-model="tieneExtraPrima"
                          label="Extra prima"
                          color="indigo lighten-1"
                        ></v-switch>
                        <v-text-field
                          v-if="tieneExtraPrima"
                          v-model="causaExtraPrima"
                          label="causa de extra prima"
                          required
                          color="indigo lighten-1"
                        ></v-text-field>
                      </v-layout>
                    </v-form>
                  </v-layout>
                </v-flex>

                <v-flex xs4>
                  <v-layout column class="px-5">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                      <h2 class="heading blue-grey--text text--darken-4">Dirección</h2>
                      <v-subheader class="pl-0 indigo--text text--lighten-1">Dirección</v-subheader>
                      <v-layout>
                        <v-switch
                          v-model="googleAddress"
                          label="Direcciones de Google"
                          color="indigo lighten-1"
                        ></v-switch>
                      </v-layout>
                      <v-layout>
                        <v-flex xs12>
                          <vue-google-autocomplete
                            ref="address"
                            id="map"
                            class="form-control subheading"
                            placeholder="Favor de ingresar una dirección"
                            v-on:placechanged="getAddressData"
                            country="mx"
                            v-if="googleAddress"
                          ></vue-google-autocomplete>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-text-field
                          v-if="!googleAddress"
                          ref="address"
                          color="indigo lighten-1"
                          v-model="address"
                          :rules="requiredRules"
                          label="dirección"
                          required
                          class="mr-4"
                        ></v-text-field>
                      </v-layout>

                      <v-subheader v-if="!googleAddress" class="pl-0 indigo--text text--lighten-1">Comentarios</v-subheader>

                      <v-textarea
                        color="indigo lighten-1"
                        auto-grow
                        rows="1"
                        label="Comentarios"
                        v-model="comentarios"
                        hint="Tip: Guarda comentarios adicionales sobre esta dirección"
                      ></v-textarea>

                      <v-switch
                        v-model="esContratante"
                        label="Es contratante"
                        color="indigo lighten-1"
                      ></v-switch>

                      <v-switch v-model="esAsegurado" label="Es asegurado" color="indigo lighten-1"></v-switch>
                    </v-form>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="indigo lighten-1"
                light
                flat
                large
                @click="savePolicy"
              >Guardar y terminar</v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";

import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  props: {
    idClienteNuevo: String
  },
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      dialog: false,
      valid: true,
      requiredRules: [v => !!v || "Este campo es requerido"],
      numPoliza: "",
      compania: "",
      ramoClave: "",
      ramoTitulo: "",
      fechaEmision: new Date().toISOString().substr(0, 10),
      fechaVencimiento: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu1: false,
      selectMoneda: null,
      monedaItems: ["USD", "MXN", "EUR", "UDI"],
      selectMetodoDePago: null,
      metodoDePagoItems: ["Agente", "Cargo automático", "Via Telefónica"],
      tieneExtraPrima: false,
      causaExtraPrima: "",
      nombrePlan: "",
      clavePlan: "",
      cobertura: "",
      primaTotal: "",
      primaNeta: "",
      comentarios: "",
      selectTipoPago: null,
      tipoPagoItems: ["Mensual", "Trimestral", "Semestral", "Anual"],
      isPagado: false,
      esContratante: false,
      esAsegurado: false,
      buyer: null,
      insured: null,
      address: '',
      googleAddress: false
    };
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      if(addressData.street_number === undefined){
        this.googleAddress = false;
        return this.address = `${addressData.route}, ${addressData.locality}, ${addressData.administrative_area_level_1}. CP ${addressData.postal_code}`;
      }
        return this.address = `${addressData.route}, ${addressData.street_number}, ${addressData.locality}, ${addressData.administrative_area_level_1}. CP ${addressData.postal_code}`;
    },
        
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    savePolicy() {
      this.validate();

      if (this.esContratante === false && this.esAsegurado === false) {
        alert(
          "Favor de seleccionar si el cliente es comprador, asegurado o ambas."
        );
        return (this.clientTypeRegistered = false);
      }

      if (this.esContratante) {
        this.buyer = this.idClienteNuevo;
        this.clientTypeRegistered = true;
      }
      if (this.esAsegurado) {
        this.insured = this.idClienteNuevo;
        this.clientTypeRegistered = true;
      }

      axios
        .post(
          `${process.env.VUE_APP_HOST}/clients/${this.idClienteNuevo}/add-policy`,
          {
            _buyer: this.buyer,
            _insured: this.insured,
            _policyNumber: this.numPoliza,
            additionalInfo: this.comentarios,
            address: this.address,
            company: this.compania,
            class: {
              title: this.ramoTitulo,
              key: this.ramoClave
            },
            issuanceDate: this.fechaEmision,
            expirationDate: this.fechaVencimiento,
            paymentType: this.selectTipoPago,
            paymentMethod: this.selectMetodoDePago,
            paymentStatus: this.isPagado,
            currency: this.selectMoneda,
            hasExtraPremium: this.tieneExtraPrima,
            extraPremiumCause: this.causaExtraPrima,
            plan: {
              title: this.nombrePlan,
              key: this.clavePlan,
              coverage: this.cobertura,
              totalPremium: this.primaTotal,
              netPremium: this.primaNeta
            }
          }
        )
        .then(res => {
          (this.insured = null), (this.buyer = null);
          //Resetear todos los campos a sus valores originales
          //Resetear al comprador y al asegurado
          this.$emit("reRender");
          this.dialog = false;
        })
        .catch(err => {
          alert("ocurrió un error, revisa tus datos.");
        });
    }
  },
  computed: {
    extraPremiumHandle() {
      if (!this.tieneExtraPrima) {
        this.causaExtraPrima = "";
        console.log(this.causaExtraPrima);
        return false;
      }
      return true;
    },
    isComplete() {
      return (
        this.compania &&
        this.ramoClave &&
        this.ramoTitulo &&
        this.fechaEmision &&
        this.fechaVencimiento &&
        this.selectMetodoDePago &&
        this.selectMoneda &&
        this.nombrePlan &&
        this.clavePlan &&
        this.cobertura &&
        this.primaTotal &&
        this.primaNeta &&
        this.address &&
        this.selectTipoPago &&
        this.numPoliza
      );
    }
  },
  mounted(){
  this.$refs.address.focus();
}
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}

.radius-2 {
  border-radius: 16px;
}

.form-control {
  width: 100%;
  padding: 14px 16px 2px 2px;
  border-bottom: 2px solid lightgray;
  text-transform: lowercase;
  margin: 8px 0 16px 0;
}

.form-control:focus {
  outline: none;
  border-bottom: 2px solid #5c6bc0;
}
</style>

