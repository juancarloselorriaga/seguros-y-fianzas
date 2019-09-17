<template>
  <v-dialog v-model="dialog" width="920" persistent>
    <template v-slot:activator="{ on }">
      <v-btn small fab flat dark color="indigo lighten-1" class="elevation-0" v-on="on" @click="reLoad"><v-icon dark>edit</v-icon></v-btn>
    </template>

    <v-card class="pa-3">
      <v-card-text class="my-0">
        <v-layout>
          <v-flex xs12>
            <v-card class="mb-5" color="white" height="380px" flat>
              <v-layout>
                <v-flex xs6>
                  <v-layout column class="pr-5">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                      <h2 class="heading blue-grey--text text--darken-4 mb-3">Personal</h2>
                      <v-text-field
                        outline
                        ref="name"
                        v-model="nombre"
                        color="indigo lighten-1"
                        :rules="requiredRules"
                        label="Nombre completo"
                        required
                      ></v-text-field>

                      <v-select
                        outline
                        color="indigo lighten-1"
                        v-model="selectEstadoCivil"
                        :items="itemsEstadoCivil"
                        :rules="[v => !!v || 'El estado civil es un campo requerido']"
                        label="Estado civil"
                        required
                      ></v-select>

                      <v-select
                        outline
                        color="indigo lighten-1"
                        v-model="selectGenero"
                        :items="itemsGenero"
                        :rules="[v => !!v || 'El género es un campo requerido']"
                        label="Género"
                        required
                      ></v-select>

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
                            v-model="date"
                            label="fecha de nacimiento"
                            readonly
                            v-on="on"
                            color="indigo lighten-1"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menu = false"
                          locale="es-419"
                          color="indigo lighten-1"
                        ></v-date-picker>
                      </v-menu>

                      <v-textarea
                        outline
                        color="indigo lighten-1"
                        auto-grow
                        rows="1"
                        label="Comentarios"
                        v-model="comentarios"
                        hint="Tip: Guarda comentarios adicionales sobre este cliente."
                      ></v-textarea>
                    </v-form>
                  </v-layout>
                </v-flex>

                <v-flex xs6>
                  <v-layout column class="pl-5">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-0">
                      <h2 class="heading blue-grey--text text--darken-4 mb-3">Adicional</h2>

                      <v-text-field
                        outline
                        v-model="compania"
                        :rules="requiredRules"
                        label="Compañía"
                        required
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-text-field
                        outline
                        v-model="ocupacion"
                        :rules="requiredRules"
                        label="Ocupación"
                        required
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-text-field
                        outline
                        v-model="rfc"
                        :counter="13"
                        :rules="rfcRules"
                        label="RFC"
                        class="text-uppercase"
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-text-field
                        outline
                        v-model="curp"
                        :counter="18"
                        :rules="curpRules"
                        label="CURP"
                        class="text-uppercase"
                        color="indigo lighten-1"
                      ></v-text-field>

                      <v-text-field
                        outline
                        v-model="referencia"
                        :rules="requiredRules"
                        label="Referencia"
                        required
                        color="indigo lighten-1"
                      ></v-text-field>
                    </v-form>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                color="indigo lighten-1"
                :disabled="!isComplete"
                flat
                @click="saveClientPersonalInfo"
                class="mt-5"
              >Guardar</v-btn>
              <v-btn flat class="mt-5" @click="reRender">Cancelar</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "ModalEdicionInfoCliente",
  props: {
    clientId: String
  },
  data() {
    return {
      client: '',
      dialog: false,
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
      date: '',
      menu: false
    };
  },
  methods: {
    reLoad() {
       this.getClientData();
    },
    cerrar() {
      this.dialog = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
  reRender() {
      this.$emit('reRenderCard');
    },
    saveClientPersonalInfo() {
      this.validate();

      axios
        .put(`${process.env.VUE_APP_HOST}/clients/${this.clientId}`, {
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
          this.$emit('reRenderCard');
          this.dialog = false;
          // alert('Cliente actualizado con éxito')
        })
        .catch(err => {
          alert('Lo sentimos, no se pudo crear el cliente, favor de intentar más tarde.')
        });
    },
    getClientData () {
      const url = `${process.env.VUE_APP_HOST}/clients/${this.clientId}`;

      axios.get(url)
        .then((res) => {
          this.client = res.data.data;
          this.nombre = this.client.personalInfo.name;
          this.selectEstadoCivil = this.client.personalInfo.maritalStatus;
          this.selectGenero = this.client.personalInfo.gender;
          this.date = new Date(this.client.personalInfo.birthdate).toISOString().substr(0, 10);
          this.comentarios = this.client.additionalInfo.comments;
          this.referencia = this.client.additionalInfo.reference;
          this.compania = this.client.professionalInfo.company;
          this.ocupacion = this.client.professionalInfo.occupation;
          this.rfc = this.client.legalInfo.rfc;
          this.curp = this.client.legalInfo.curp;
        })
        .catch((err) => {
          alert('Error al consultar listado de clientes', err)
      })
      
    }
  },
  computed: {
    isComplete() {
      return (
        this.nombre &&
        this.date &&
        this.selectEstadoCivil &&
        this.selectGenero &&
        this.compania &&
        this.ocupacion &&
        this.rfc &&
        this.curp &&
        this.referencia
      );
    }
  },
  mounted () {
    this.getClientData();
  }
};
</script>

<style scoped>

 .v-sheet {
  border-radius: 30px;
  width: 100%;
  height: 100%;
}

</style>

