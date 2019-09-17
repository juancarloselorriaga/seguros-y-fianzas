<template>
  <div>
    <v-layout align-center justify-space-between class="pr-3 mb-3">
      <h2 class="title font-weight-regular blue-grey--text text--darken-2">Información</h2>
    </v-layout>
    <v-card class="radius-3 my-4">
      <v-card-title>
        <v-layout v-if="generalInfoEditMode">
          <v-flex xs9>

              <v-text-field
                v-model="general.personalInfo.name"
                label="nombre"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
                    >
              </v-text-field>
          </v-flex>
            </v-layout>
        <h2 class="subheading font-weight-bold blue-grey--text text--darken-2" v-else>Datos generales</h2>
        <v-spacer></v-spacer>
        <v-btn
                  small
                  fab
                  ligth
                  flat
                  color="indigo lighten-1"
                  class="elevation-0"
                  @click="generalInfoEditMode = true"
                  v-if="generalInfoEditMode === false"
                >
                  <v-icon small dark>edit</v-icon>
                </v-btn>
                <v-btn
                  small
                  fab
                  dark
                  color="green lighten-1"
                  class="elevation-0"
                  v-if="generalInfoEditMode === true"
                  @click="closeGeneral"
                >
                  <v-icon small dark>check</v-icon>
                </v-btn>
      </v-card-title>

      <v-card-text>
        
        <v-layout column>
          <v-layout wrap :key="updateGeneral">
          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
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
                            v-model="general.personalInfo.birthdate"
                            label="Fecha de nacimiento"
                            readonly
                            v-on="on"
                            color="indigo lighten-1"
                            class="ma-3"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="general.personalInfo.birthdate"
                          @input="menu = false"
                          locale="es-419"
                          color="indigo lighten-1"
                        ></v-date-picker>
                      </v-menu>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de nacimiento</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="general.personalInfo !== undefined"
              >{{ moment(new Date(general.personalInfo.birthdate).toISOString().substr(0, 10)).format('ll') }}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-select
                color="indigo lighten-1"
                v-model="general.personalInfo.maritalStatus"
                :items="itemsEstadoCivil"
                label="género"
                required
                class="ma-3"
              ></v-select>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Estado civil</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-lowercase"
                v-if="general.personalInfo !== undefined"
              >{{general.personalInfo.maritalStatus}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-select
                color="indigo lighten-1"
                v-model="general.personalInfo.gender"
                :items="itemsGenero"
                label="género"
                required
                class="ma-3"
              ></v-select>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Género</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-lowercase"
                v-if="general.personalInfo !== undefined"
              >{{general.personalInfo.gender}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode" wrap>
              <v-text-field
                v-model="general.professionalInfo.company"
                label="compañía"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Compañia</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="general.professionalInfo !== undefined"
              >{{general.professionalInfo.company}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-text-field
                v-model="general.professionalInfo.occupation"
                label="ocupación"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Ocupación</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="general.professionalInfo !== undefined"
              >{{general.professionalInfo.occupation}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-text-field
                v-model="general.legalInfo.rfc"
                label="RFC"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">RFC</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-uppercase"
                v-if="general.legalInfo !== undefined"
              >{{general.legalInfo.rfc}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-text-field
                v-model="general.legalInfo.curp"
                label="CURP"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">CURP</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-uppercase"
                v-if="general.legalInfo !== undefined"
              >{{general.legalInfo.curp}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-text-field
                v-model="general.additionalInfo.reference"
                label="referencia"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Referencia</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="general.additionalInfo !== undefined"
              >{{general.additionalInfo.reference}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-3">
            <v-layout v-if="generalInfoEditMode">
              <v-text-field
                v-model="general.additionalInfo.comments"
                label="comentarios"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Comentarios</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="general.additionalInfo !== undefined"
              >{{general.additionalInfo.comments}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin comentarios</span>
            </v-layout>
          </v-flex>
          </v-layout>

          <v-layout column v-if="this.medical.diseases" :key="updateMedical"> 
          <h2 class="subheading font-weight-bold blue-grey--text text--darken-2 my-4">Datos médicos</h2>

          <v-flex xs12 class="mb-3">
            <v-layout column>
              <v-layout align-center>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Fumador</span>
                <v-btn
                  small
                  fab
                  ligth
                  flat
                  color="indigo lighten-1"
                  class="elevation-0"
                  @click="smokerToggle"
                >
                  <v-icon small dark>compare_arrows</v-icon>
                </v-btn>
              </v-layout>
              
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="medical !== undefined && medical.isSmoker === false"
              >No</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-else-if="medical !== undefined && medical.isSmoker === true"
              >Sí</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-3">
            <v-layout column>
              <v-layout align-center>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Enfermedades</span>
                <v-btn
                  small
                  fab
                  ligth
                  flat
                  color="indigo lighten-1"
                  class="elevation-0"
                  v-if="diseaseInput === false"
                  @click="diseaseInput = true"
                >
                  <v-icon small dark>edit</v-icon>
                </v-btn>
                <v-btn
                  small
                  fab
                  dark
                  flat 
                  class="elevation-0 green lighten-1"
                  v-if="diseaseInput === true"
                  @click="close"
                >
                  <v-icon small dark>check</v-icon>
                </v-btn>
              </v-layout>
              <v-flex v-if="medical.diseases.length === 0 && this.diseaseInput === false">
                <span class="body-2 blue-grey--text text--darken-4">sin información</span>
              </v-flex>
              <v-flex xs8 v-if="this.diseaseInput === true">
                <v-layout align-center>
                  <v-text-field
                    v-model="newDisease"
                    label="introduce un nuevo registro"
                    hint="Para terminar, presiona enter."
                    required
                    color="indigo lighten-1"
                    class="my-3"
                    clearable
                    @keydown.enter="addDiseaseToArray"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <ul v-if="medical.diseases.length !== 0" class="pa-0">
                <li class="my-0" v-for="(disease, index) in medical.diseases" :key="index">
                  <v-btn
                    flat
                    fab
                    small
                    color="red lighten-1"
                    v-if="diseaseInput"
                    @click="deleteDiseaseFromArray(index)"
                  >
                    <v-icon small>delete</v-icon>
                  </v-btn>
                  <v-btn flat fab small color="indigo lighten-1" v-else>
                    <v-icon small>fiber_manual_record</v-icon>
                  </v-btn>
                  {{disease}}
                </li>
              </ul>
            </v-layout>
          </v-flex>
          </v-layout>

        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

var moment = require("moment");
moment.locale("es");

export default {
  name: "TarjetaInfoCliente",
  props: {
    clientId: String
  },
  data() {
    return {
      moment: moment,
      medical: {},
      diseaseInput: false,
      newDisease: "",
      updatedDiseases: [],
      isSmoker: Boolean,
      generalInfoEditMode: false,
      general: {},
      itemsGenero: ["Hombre", "Mujer", "Otro"],
      itemsEstadoCivil: ["Soltero", "Casado"],
      menu: false,
      professionalInfoKey: 0
    };
  },
  methods: {
    close () {
      this.saveDiseases()
    },
    closeGeneral () {
      this.saveGeneral()
    },
    reRender() {
      this.$emit("reRenderCard");
    },
    addDiseaseToArray() {
      this.medical.diseases.push(this.newDisease);
      this.newDisease = '';
    },
    deleteDiseaseFromArray(index) {
      this.medical.diseases.splice(index, 1);
    },
    saveDiseases() {
      axios
        .put(`${process.env.VUE_APP_HOST}/clients/${this.clientId}`, {
          medicalInfo: this.medical
        })
        .then(res => {
          this.diseaseInput = false;
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo editar el registro, favor de intentar más tarde."
          );
        });
    },
    saveGeneral() {
      axios
        .put(`${process.env.VUE_APP_HOST}/clients/${this.clientId}`, {
          personalInfo: this.general.personalInfo,
          professionalInfo: this.general.professionalInfo,
          legalInfo: this.general.legalInfo,
          additionalInfo: this.general.additionalInfo
        })
        .then(res => {
          this.generalInfoEditMode = false;
          // this.reRender();
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo editar el registro, favor de intentar más tarde."
          );
        });
    },
    smokerToggle() {
      this.medical.isSmoker = !this.medical.isSmoker

      axios
        .put(`${process.env.VUE_APP_HOST}/clients/${this.clientId}`, {
          medicalInfo: this.medical
        })
        .then(res => {
          this.newDisease = "";
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo cambiar el registro, favor de intentar más tarde."
          );
        });
    },
    getMedical(clientId) {
      const url = `${process.env.VUE_APP_HOST}/clients/${clientId}`;
      axios
        .get(url)
        .then(res => {
          this.medical = res.data.data.medicalInfo
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    },
    getGeneral(clientId) {
      const url = `${process.env.VUE_APP_HOST}/clients/${this.clientId}`;
      axios
        .get(url)
        .then(res => {
          this.general = res.data.data
        })
        .catch(err => {
          alert("Error al consultar cliente", err);
        });
    }
  },
  computed: {
    updateMedical () {
      this.generalInfoEditMode = false;
      return this.getMedical(this.clientId)
    },
    updateGeneral () {
      this.generalInfoEditMode = false;
      return this.getGeneral(this.clientId)
    },
    
  },
  mounted() {
    this.getMedical(this.clientId);
    this.getGeneral(this.clientId)
  }
};
</script>



<style scoped>
.radius-2 {
  border-radius: 16px;
}

.radius-3 {
  border-radius: 30px;
}

li {
  list-style-type: none;
}
</style>
