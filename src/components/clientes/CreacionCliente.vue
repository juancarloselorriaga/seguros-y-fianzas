<template>
  <v-stepper v-model="next" class="elevation-0">
    <v-stepper-header class="elevation-0">
      <v-stepper-step :complete="next > 1" step="1" color="indigo lighten-1">Información del cliente</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="next > 2" step="2" color="indigo lighten-1">Información de contacto</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" color="indigo lighten-1">Información adicional</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" color="white" height="700px" flat>
          <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
            <v-text-field v-model="nombre" :rules="requiredRules" label="Nombre completo" required></v-text-field>
            <v-menu
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
                <v-text-field v-model="date" label="Fecha de nacimiento" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu = false" locale="es-419"></v-date-picker>
            </v-menu>

            <v-select
              v-model="selectEstadoCivil"
              :items="itemsEstadoCivil"
              :rules="[v => !!v || 'El estado civil es un campo requerido']"
              label="Estado civil"
              required
            ></v-select>

            <v-select
              v-model="selectGenero"
              :items="itemsGenero"
              :rules="[v => !!v || 'El género es un campo requerido']"
              label="Género"
              required
            ></v-select>

            <v-text-field v-model="compania" :rules="requiredRules" label="Compañía" required></v-text-field>

            <v-text-field v-model="ocupacion" :rules="requiredRules" label="Ocupación" required></v-text-field>

            <v-text-field
              v-model="rfc"
              :counter="13"
              :rules="rfcRules"
              label="RFC"
              required
              class="text-uppercase"
            ></v-text-field>

            <v-text-field
              v-model="curp"
              :counter="18"
              :rules="curpRules"
              label="CURP"
              required
              class="text-uppercase"
            ></v-text-field>

            <v-text-field v-model="referencia" :rules="requiredRules" label="Referencia" required></v-text-field>

            <v-textarea
            label="Comentarios"
            v-model="comentarios"
            hint="Tip: Guarda comentarios adicionales sobre este cliente."
          ></v-textarea>

          </v-form>
        </v-card>
  
          <v-btn color="indigo lighten-1" dark @click="saveClientPersonalInfo" class="mt-5">Guardar y continuar</v-btn>
          <v-btn flat class="mt-5">Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="indigo lighten-1" dark @click="next = 3">Continuar</v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="indigo lighten-1" dark @click="next = 1">Continuar</v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

import axios from "axios";

export default {
  name: "CreacionCliente",
  data() {
    return {
      next: 1,
      valid: true,
      nombre: "",
      compania: "",
      ocupacion: "",
      rfc: "",
      curp: "",
      comentarios: "",
      referencia: "",
      requiredRules: [v => !!v || "Este campo es requerido"],
      rfcRules: [
        v => !!v || "Este campo es requerido",
        v => (v && v.length === 13) || "El RFC debe de contener 13 caracteres"
      ],
      curpRules: [
        v => !!v || "Este campo es requerido",
        v => (v && v.length === 18) || "El CURP debe de contener 18 caracteres"
      ],
      email: "",
      emailRules: [
        v => !!v || "Este campo es requerido",
        v => /.+@.+/.test(v) || "Revisa que sea una dirección de correo válida"
      ],
      selectEstadoCivil: null,
      itemsEstadoCivil: ["Soltero", "Casado"],
      selectGenero: null,
      itemsGenero: ["Hombre", "Mujer", "Otro"],
      checkbox: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    saveClientPersonalInfo() {
      this.validate();
      this.next = 2;

      axios.post('http://localhost:3000/clients/add-client', {
        personalInfo: {
          name: this.nombre,
          birthdate: this.date,
          maritalStatus: this.selectEstadoCivil,
          gender: this.selectGenero
          },
        professionalInfo: {
          company: this.compania,
          occupation: this.ocupacion
        },
        legalInfo: {
          rfc: this.rfc,
          curp: this.curp
        },
        additionalInfo: {
          comments: this.comentarios,
          reference: this.referencia
        }
        })
      .then(res => {
        console.log(res.data.data)
      })
      .catch(err => {
          console.log(err)
      })

    }
  }
};
</script>

<style scoped>
button {
  border-radius: 16px;
}
</style>


