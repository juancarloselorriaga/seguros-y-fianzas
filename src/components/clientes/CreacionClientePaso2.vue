<template>
  <div>
    <v-card class="mb-5" color="white" height="380px" flat>
      <v-layout>
        <v-flex xs6>
          <v-layout column class="pr-5">
            <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
              <h2 class="heading blue-grey--text text--darken-4">Contacto</h2>
              <v-text-field
              
                color="indigo lighten-1"
                v-model="titulo"
                :rules="requiredRules"
                label="título del contacto"
                required
              ></v-text-field>

              <v-text-field
              
                v-model="email"
                :rules="emailRules"
                label="e-mail"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-text-field
              
                ref="phone"
                mask="phone"
                v-model="telefono"
                :rules="requiredRules"
                label="teléfono"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-text-field
              
                ref="phone"
                mask="phone"
                v-model="movil"
                :rules="requiredRules"
                label="móvil"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-textarea
              
                color="indigo lighten-1"
                auto-grow
                rows="1"
                label="Notas"
                v-model="adicional"
                hint="Tip: Guarda comentarios adicionales sobre este cliente."
              ></v-textarea>
            </v-form>
          </v-layout>
        </v-flex>

        <v-flex xs6>
          <v-layout column class="pl-5">
            <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
              <v-layout>
                <h2 class="heading blue-grey--text text--darken-4">Dirección de contacto</h2>
              </v-layout>
              <v-layout><v-switch v-model="googleAddress" label="Direcciones de Google" color="indigo lighten-1"></v-switch></v-layout>
              <v-layout>
                <v-flex xs12>
                  <vue-google-autocomplete
                    ref="address"
                    id="map"
                    classname="form-control subheading"
                    placeholder="Favor de ingresar una dirección"
                    v-on:placechanged="getAddressData"
                    country="mx"
                    v-if="googleAddress"
                >
                </vue-google-autocomplete>
                </v-flex>
              </v-layout>
              <v-layout v-if="!googleAddress">
                <v-text-field
                  ref="address"
                  color="indigo lighten-1"
                  v-model="calle"
                  :rules="requiredRules"
                  label="calle"
                  required
                  class="mr-4"
                ></v-text-field>
                <v-text-field
                
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
              v-if="!googleAddress"
                ref="address"
                v-model="colonia"
                :rules="requiredRules"
                label="colonia"
                required
                color="indigo lighten-1"
              ></v-text-field>
              <v-text-field
              v-if="!googleAddress"
              color="indigo lighten-1"
              ref="city"
                v-model="municipio"
                :rules="requiredRules"
                label="municipio"
                required
              >color="indigo lighten-1"</v-text-field>

              <v-layout>
                <v-text-field
                v-if="!googleAddress"
                ref="state"
                  color="indigo lighten-1"
                  v-model="estado"
                  :rules="requiredRules"
                  label="estado"
                  required
                  class="mr-4"
                ></v-text-field>
                <v-text-field
                v-if="!googleAddress"
                ref="zip"
                  v-model="cp"
                  :rules="requiredRules"
                  label="cp"
                  required
                  class="ml-4"
                  color="indigo lighten-1"
                ></v-text-field>
              </v-layout>
            </v-form>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>

    <v-layout>
      <v-spacer></v-spacer>
      
      <v-btn @click="saltarPaso" flat class="mt-5 blue-grey--text">Saltar <v-icon  right small>chevron_right</v-icon></v-btn>
      <v-btn
        color="indigo lighten-1"
        :disabled='!isComplete'
        flat
        @click="saveClientContact"
        class="mt-5"
      >Guardar y continuar</v-btn>
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";
import VueGoogleAutocomplete from 'vue-google-autocomplete'


export default {
  name: "CreacionClientePaso2",
  components: {
    VueGoogleAutocomplete
  },
  props: {
    idClienteNuevo: String
  },
  data() {
    return {
      valid: true,
      requiredRules: [v => !!v || "Este campo es requerido"],
      emailRules: [
        v => !!v || "Campo requerido.",
        v =>
          /.+@.+/.test(v) ||
          "Favor de introducir una dirección de correo electrónico válida."
      ],
      titulo: "",
      email: "",
      telefono: "",
      movil: "",
      calle: "",
      numero: "",
      colonia: "",
      municipio: "",
      estado: "",
      cp: "",
      adicional: "",
      address: '',
      googleAddress: false
    };
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
        this.calle = this.address.route
        this.numero = this.address.street_number
        this.municipio = this.address.locality
        this.estado = this.address.administrative_area_level_1
        this.cp = this.address.postal_code
        this.googleAddress = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    saltarPaso () {
      this.next = 3;
      this.$emit("nextStep", this.next);
    },
    saveClientContact() {
      this.validate();
      this.next = 3;
      this.$emit("nextStep", this.next);
      this.$emit("reRenderDataTable");


        axios
        .post(`${process.env.VUE_APP_HOST}/clients/${this.idClienteNuevo}/add-contact`, {
          _client: this.idClienteNuevo,
          title: this.titulo,
          email: this.email,
          phone: this.telefono,
          mobile: this.movil,
          address: {
            street: this.calle,
            number: this.numero,
            neighborhood: this.colonia,
            municipality: this.municipio,
            state: this.estado,
            cp: this.cp,
            additionalInfo: this.adicional
          }
        })
        .then(res => {
        })
        .catch(err => {});
      }
  },
  computed: {
  isComplete () {
    return this.titulo && this.email && this.telefono && this.movil && this.calle && this.numero && this.colonia && this.municipio && this.estado && this.cp;
  }
},
mounted(){
  this.$refs.address.focus();
}
};
</script>

<style scoped>
button {
  border-radius: 16px;
}

.form-control{
  width: 100%;
  padding: 14px 16px 2px 2px;
  border-bottom: 2px solid  lightgray;
  text-transform: lowercase;
  margin: 8px 0 16px 0;
}

.form-control:focus{
  outline: none;
  border-bottom: 2px solid  #5C6BC0;
}
</style>

