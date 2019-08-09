<template>
  <div>
    <v-card color="white" flat>
      <v-card-title>
        <span
          v-if="!uploadDetails"
          class="headline ml-2 font-weight-medium"
        >Elige el método de captura de la póliza</span>
        <span class="headline ml-2 font-weight-medium">Completa los datos de la póliza</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-container fluid fill-height v-if="!uploadDetails">
        <v-layout justify-center align-center column class="mt-5">
          <v-layout align-center>
            <v-flex class="text-xs-center">
              <PdfPolicyReader :clientId="clientId" @fileRead="fileRead" />
            </v-flex>
            <span class="title mx-3">ó</span>
            <v-flex class="text-xs-center">
              <v-btn flat large dark color="blue-grey lighten-1 elevation-0">
                Captura manual
                <v-icon right>text_fields</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-flex class="mt-4">
            <span
              class="body-1"
            >Si el tipo de póliza no aparece en la lista, por favor haz una captura manual</span>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid fill-height v-if="uploadDetails">
        <v-layout>
          <v-layout align-start>
            <v-flex xs6 class="px-4">
              <v-subheader class="pl-0 indigo--text text--lighten-1">Cobertura</v-subheader>

              <v-text-field
                color="indigo lighten-1"
                v-model="cobertura"
                :rules="requiredRules"
                label="cobertura"
                required
              ></v-text-field>

              <v-subheader class="pl-0 indigo--text text--lighten-1">Opcionales</v-subheader>

              <v-layout column>
                <v-switch v-model="tieneExtraPrima" label="Extra prima" color="indigo lighten-1"></v-switch>
                <v-text-field
                  v-if="tieneExtraPrima"
                  v-model="causaExtraPrima"
                  label="causa de extra prima"
                  required
                  color="indigo lighten-1"
                ></v-text-field>

                <v-textarea
                  color="indigo lighten-1"
                  auto-grow
                  rows="1"
                  label="Comentarios"
                  v-model="comentarios"
                  hint="Tip: Guarda comentarios adicionales sobre esta dirección"
                ></v-textarea>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="px-4">
              <v-subheader class="pl-0 indigo--text text--lighten-1">Datos de pago</v-subheader>

              <v-layout column>
                <v-select
                  color="indigo lighten-1"
                  v-model="selectTipoPago"
                  :items="tipoPagoItems"
                  :rules="[v => !!v || 'El tipo de pago es un campo requerido']"
                  label="tipo de pago"
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
                <v-checkbox v-model="isPagado" label="Póliza pagada" color="indigo" class="mr-4"></v-checkbox>
              </v-layout>

              <v-layout>
                <v-switch v-model="esContratante" label="Es contratante" color="indigo lighten-1"></v-switch>

                <v-switch v-model="esAsegurado" label="Es asegurado" color="indigo lighten-1"></v-switch>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="indigo lighten-1"
        light
        flat
        @click="savePolicy"
        :disabled="!isComplete"
        v-if="uploadDetails"
      >Guardar y terminar</v-btn>
      <v-btn flat class="blue-grey--text" @click="cancelar">Cancelar</v-btn>
      </v-card-actions>
    </v-card>

    
  </div>
</template>

<script>
import PdfPolicyReader from "@/components/utilities/PdfPolicyReader.vue";
import axios from "axios";

export default {
  name: "CargarPoliza",
  components: {
    PdfPolicyReader
  },
  props: {
    clientId: String
  },
  data() {
    return {
      uploadDetails: null,
      requiredRules: [v => !!v || "Este campo es requerido"],
      numPoliza: "",
      compania: "",
      ramoTitulo: "",
      fechaEmision: "",
      fechaVencimiento: "",
      selectMoneda: "",
      selectMetodoDePago: null,
      metodoDePagoItems: ["Agente", "Cargo automático", "Via Telefónica"],
      tieneExtraPrima: false,
      causaExtraPrima: "",
      nombrePlan: "",
      clavePlan: "",
      cobertura: "",
      primaTotal: "",
      primaNeta: "",
      selectTipoPago: null,
      tipoPagoItems: ["Mensual", "Trimestral", "Semestral", "Anual"],
      isPagado: false,
      esContratante: false,
      esAsegurado: false,
      buyer: null,
      insured: null,
      address: "",
      comentarios: ""
    };

    
  },
  methods: {
    cancelar () {
      this.$emit('cancelar')
      this.uploadDetails = null
    },
    fileRead(info) {
      this.uploadDetails = info;

      this.numPoliza = info.numeroDePoliza;
      this.compania = info.compania;
      this.ramoTitulo = info.ramo;
      this.selectMoneda = info.moneda;
      this.nombrePlan = info.plan;
      this.clavePlan = info.clavePlan;
      this.primaTotal = info.primaTotal;
      this.primaNeta = info.primaNeta;
      this.address = info.direccion;

      this.fechaEmision = info.fechaEmision;
      this.fechaVencimiento = info.fechaVencimiento;

      console.log(this.fechaEmision, this.fechaVencimiento)
    },
    savePolicy() {

      if (this.esContratante === false && this.esAsegurado === false) {
        alert(
          "Favor de seleccionar si el cliente es comprador, asegurado o ambas."
        );
        return (this.clientTypeRegistered = false);
      }

      if (this.esContratante) {
        this.buyer = this.clientId;
        this.clientTypeRegistered = true;
      }
      if (this.esAsegurado) {
        this.insured = this.clientId;
        this.clientTypeRegistered = true;
      }

      axios
        .post(
          "http://localhost:3000/clients/" +
            this.clientId +
            "/add-policy",
          {
            _buyer: this.buyer,
            _insured: this.insured,
            _policyNumber: this.numPoliza,
            additionalInfo: this.comentarios,
            address: this.address,
            company: this.compania,
            class: {
              title: this.ramoTitulo
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
          console.log(res.data.data)
          //Resetear todos los campos a sus valores originales
          //Resetear al comprador y al asegurado
          this.$emit("reRenderCard");
          this.dialog = false;
        })
        .catch(err => {
          alert("ocurrió un error, revisa tus datos.");
        });
    }
  },
    computed: {
    isComplete () {
    return this.numPoliza && this.compania && this.ramoTitulo && this.fechaEmision && this.fechaVencimiento && this.selectMoneda && this.selectMetodoDePago && this.nombrePlan && this.clavePlan && this.cobertura && this.primaTotal && this.primaNeta && this.selectTipoPago && this.address;
  }
    }
};
</script>

<style scoped>
button {
  border-radius: 30px;
}
</style>


