<template>
  <div>
    <v-card class="mb-5" color="white" height="380px" flat>
      <v-layout>
        <v-flex xs6>
          <v-layout column class="pr-5">
            <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
              <h2 class="heading blue-grey--text text--darken-4 mb-3">Contacto</h2>
              <v-text-field
              outline
                color="indigo lighten-1"
                v-model="titulo"
                :rules="requiredRules"
                label="título del contacto"
                required
              ></v-text-field>

              <v-text-field
              outline
                v-model="email"
                :rules="emailRules"
                label="e-mail"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-text-field
              outline
                ref="phone"
                mask="phone"
                v-model="telefono"
                :rules="requiredRules"
                label="teléfono"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-text-field
              outline
                ref="phone"
                mask="phone"
                v-model="movil"
                :rules="requiredRules"
                label="móvil"
                required
                color="indigo lighten-1"
              ></v-text-field>

              <v-textarea
              outline
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
              <h2 class="heading blue-grey--text text--darken-4 mb-3">Dirección de contacto</h2>
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
              <v-text-field
              outline
              color="indigo lighten-1"
              ref="city"
                v-model="municipio"
                :rules="requiredRules"
                label="municipio"
                required
              >color="indigo lighten-1"</v-text-field>

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
            </v-form>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>

    <v-layout>
      <v-spacer></v-spacer>
      <v-btn
        color="indigo lighten-1"
        :disabled='!isComplete'
        flat
        @click="saveClientContact"
        class="mt-5"
      >Guardar</v-btn>
      <v-btn @click="cerrar" flat class="mt-5 blue-grey--text">Cancelar</v-btn>
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "NuevaTarjetaContacto",
  props: {
    idCliente: String
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
      adicional: ""
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    cerrar () {
      this.$emit('closeModal')
    },
    saveClientContact() {
      this.validate();
      this.$emit('closeModal')

      axios
        .post('http://localhost:3000/clients/' + this.idCliente + '/add-contact', {
          _client: this.idCliente,
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
          this.$emit("reRenderCard");
          // alert('Tarjeta creada con éxito')
        })
        .catch(err => {
          alert('Error en la creación de la tarjeta, intente más tarde.')
        });

    }
  },
  computed: {
  isComplete () {
    return this.titulo && this.email && this.telefono && this.movil && this.calle && this.numero && this.colonia && this.municipio && this.estado && this.cp;
  }
}
};
</script>

<style scoped>
button {
  border-radius: 16px;
}
</style>

