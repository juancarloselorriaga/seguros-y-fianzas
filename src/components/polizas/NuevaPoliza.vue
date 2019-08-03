<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn flat color="indigo lighten-1" v-on="on">Capturar nueva póliza manualmente</v-btn>
      </template>
      <v-card>
        <v-toolbar flat dark color="indigo lighten-1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Nueva póliza</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat large @click="savePolicy" :disabled="!isComplete">Guardar y terminar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid fill-height>
          <v-layout class="mb-5 px-3">
            <v-flex xs4>
              <v-layout column class="px-2">
                <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                  <h2 class="heading blue-grey--text text--darken-4">General</h2>

                  <v-subheader class="pl-0 indigo--text text--lighten-1">Número de póliza</v-subheader>

                  <v-text-field
                    outline
                    v-model="numPoliza"
                    :rules="requiredRules"
                    label="no. de póliza"
                    required
                    color="indigo lighten-1"
                  ></v-text-field>

                  <v-subheader class="pl-0 indigo--text text--lighten-1">Datos de la compañia</v-subheader>

                  <v-text-field
                    outline
                    v-model="compania"
                    :rules="requiredRules"
                    label="compañía"
                    required
                    color="indigo lighten-1"
                  ></v-text-field>

                  <v-layout>
                    <v-text-field
                      outline
                      color="indigo lighten-1"
                      v-model="ramoTitulo"
                      :rules="requiredRules"
                      label="ramo"
                      required
                      class="mr-4"
                    ></v-text-field>

                    <v-text-field
                      outline
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
                          outline
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
                          outline
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
                      outline
                      color="indigo lighten-1"
                      v-model="selectTipoPago"
                      :items="tipoPagoItems"
                      :rules="[v => !!v || 'El tipo de pago es un campo requerido']"
                      label="tipo de pago"
                      class="mr-4"
                      required
                    ></v-select>

                    <v-select
                      outline
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
                      outline
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
              <v-layout column class="px-4">
                <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                  <h2 class="heading blue-grey--text text--darken-4">Plan</h2>
                  <v-subheader class="pl-0 indigo--text text--lighten-1">General</v-subheader>

                  <v-layout>
                    <v-text-field
                      outline
                      color="indigo lighten-1"
                      v-model="nombrePlan"
                      :rules="requiredRules"
                      label="nombre del plan"
                      required
                      class="mr-4"
                    ></v-text-field>

                    <v-text-field
                      outline
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
                    outline
                    color="indigo lighten-1"
                    v-model="cobertura"
                    :rules="requiredRules"
                    label="cobertura"
                    required
                  ></v-text-field>

                  <v-text-field
                    outline
                    color="indigo lighten-1"
                    prefix="$"
                    v-model="primaNeta"
                    :rules="requiredRules"
                    label="prima neta"
                    required
                  ></v-text-field>

                  <v-text-field
                    outline
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
                      outline
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
              <v-layout column class="px-4">
                <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                  <h2 class="heading blue-grey--text text--darken-4">Dirección</h2>
                  <v-subheader class="pl-0 indigo--text text--lighten-1">Dirección</v-subheader>
                  <v-layout>
                    <v-text-field
                      outline
                      ref="address"
                      color="indigo lighten-1"
                      v-model="calle"
                      :rules="requiredRules"
                      label="calle"
                      required
                      class="mr-4"
                    ></v-text-field>
                    <v-text-field
                      outline
                      ref="address"
                      color="indigo lighten-1"
                      v-model="numero"
                      :rules="requiredRules"
                      label="número"
                      required
                      class="ml-4"
                    ></v-text-field>
                  </v-layout>

                  <v-text-field
                    outline
                    ref="address"
                    v-model="colonia"
                    :rules="requiredRules"
                    label="colonia"
                    required
                    color="indigo lighten-1"
                  ></v-text-field>

                  <v-subheader class="pl-0 indigo--text text--lighten-1">Localidad</v-subheader>

                  <v-text-field
                    outline
                    color="indigo lighten-1"
                    ref="city"
                    v-model="municipio"
                    :rules="requiredRules"
                    label="municipio"
                    required
                  ></v-text-field>

                  <v-subheader class="pl-0 indigo--text text--lighten-1">Estado y CP</v-subheader>

                  <v-layout>
                    <v-text-field
                      outline
                      ref="state"
                      color="indigo lighten-1"
                      v-model="estado"
                      :rules="requiredRules"
                      label="estado"
                      required
                      class="mr-4"
                    ></v-text-field>
                    <v-text-field
                      outline
                      ref="zip"
                      v-model="cp"
                      :rules="requiredRules"
                      label="cp"
                      required
                      class="ml-4"
                      color="indigo lighten-1"
                    ></v-text-field>
                  </v-layout>

                  <v-textarea
                    outline
                    color="indigo lighten-1"
                    auto-grow
                    rows="1"
                    label="Comentarios"
                    v-model="comentarios"
                    hint="Tip: Guarda comentarios adicionales sobre esta dirección"
                  ></v-textarea>

                  <v-switch v-model="esContratante" label="Es contratante" color="indigo lighten-1"></v-switch>

                  <v-switch v-model="esAsegurado" label="Es asegurado" color="indigo lighten-1"></v-switch>
                </v-form>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import axios from "axios";

export default {
  props: {
    idClienteNuevo: String
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
      calle: "",
      numero: "",
      colonia: "",
      municipio: "",
      estado: "",
      cp: "",
      comentarios: "",
      selectTipoPago: null,
      tipoPagoItems: ["Mensual", "Trimestral", "Semestral", "Anual"],
      isPagado: false,
      esContratante: false,
      esAsegurado: false,
      buyer: null,
      insured: null
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    savePolicy() {
      
      this.validate();

      if(this.esContratante === false && this.esAsegurado === false){
        alert('Favor de seleccionar si el cliente es comprador, asegurado o ambas.')
        return this.clientTypeRegistered = false
      }

      if (this.esContratante){
        this.buyer = this.idClienteNuevo;
        this.clientTypeRegistered = true;
      }
      if(this.esAsegurado){
        this.insured = this.idClienteNuevo
        this.clientTypeRegistered = true;
      }

      axios
        .post(
          "http://localhost:3000/clients/" +
            this.idClienteNuevo +
            "/add-policy",
          {
            _buyer: this.buyer,
            _insured: this.insured,
            _policyNumber: this.numPoliza,
            address:
            {
              street: this.calle,
              number: this.numero,
              neighborhood: this.colonia,
              municipality: this.municipio,
              state: this.estado,
              cp: this.cp,
              additionalInfo: this.comentarios
            },
            company: this.compania,
            class:
            {
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
            plan:
            {
              title: this.nombrePlan,
              key: this.clavePlan,
              coverage: this.cobertura,
              totalPremium: this.primaTotal,
              netPremium: this.primaNeta
            }
            }
        )
        .then(res => {
          this.insured = null,
          this.buyer = null
          //Resetear todos los campos a sus valores originales
          //Resetear al comprador y al asegurado
          this.$emit("reRender");
          this.dialog = false
          })
        .catch(err => {alert('ocurrió un error, revisa tus datos.')});

      
    }
  },
  computed: {
    extraPremiumHandle () {
      if(!this.tieneExtraPrima){
        this.causaExtraPrima = ''
        console.log(this.causaExtraPrima)
        return false
      }
      return true
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
        this.calle &&
        this.numero &&
        this.colonia &&
        this.municipio &&
        this.estado &&
        this.cp &&
        this.selectTipoPago &&
        this.numPoliza
      );
    }
  }
};
</script>

<style scoped>
button {
  border-radius: 16px;
}
</style>

