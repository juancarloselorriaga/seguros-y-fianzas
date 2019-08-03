<template>
  <div>
    <v-layout align-center justify-space-between class="pr-3 mb-3">
      <h2 class="title font-weight-regular blue-grey--text text--darken-2">Información</h2>
    </v-layout>
    <v-card class="radius-3 my-4">
      <v-card-title>
        <h2 class="subheading font-weight-bold blue-grey--text text--darken-2">Datos generales</h2>
        <v-spacer></v-spacer>
        <ModalEdicionInfoCliente :clientId="clientId" @reRenderCard="reRender" />
      </v-card-title>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Fecha de nacimiento</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="personal.birthdate !== undefined"
              >{{ moment(new Date(personal.birthdate).toISOString().substr(0, 10)).format('ll') }}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Estado civil</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-lowercase"
                v-if="personal.maritalStatus !== undefined"
              >{{personal.maritalStatus}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Género</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-lowercase"
                v-if="personal.gender !== undefined"
              >{{personal.gender}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Compañia</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="professional !== undefined"
              >{{professional.company}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Ocupación</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="professional !== undefined"
              >{{professional.occupation}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">RFC</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-uppercase"
                v-if="legal !== undefined"
              >{{legal.rfc}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">CURP</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-uppercase"
                v-if="legal !== undefined"
              >{{legal.curp}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Referencia</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="additional !== undefined"
              >{{additional.reference}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="mb-3">
            <v-layout column>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Comentarios</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="additional !== undefined"
              >{{additional.comments}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin comentarios</span>
            </v-layout>
          </v-flex>

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
                  v-if="diseaseInput === false && this.updatedDiseases.length !== 0"
                  @click="diseaseInput = true"
                >
                  <v-icon small dark>edit</v-icon>
                </v-btn>
                <v-btn
                  small
                  fab
                  ligth
                  flat
                  color="red lighten-1"
                  class="elevation-0"
                  v-else-if="diseaseInput === true && this.updatedDiseases.length !==0"
                  @click="diseaseInput = false"
                >
                  <v-icon small dark>close</v-icon>
                </v-btn>
              </v-layout>
              <v-flex xs12>
                <v-layout justify-center>
                  <v-flex xs6>
                    <v-text-field
                      v-model="newDisease"
                      label="introduce un nuevo registro"
                      hint="Para terminar, presiona enter."
                      required
                      color="indigo lighten-1"
                      class="mt-3 partial-width"
                      clearable
                      @keydown.enter="addDisease"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>

              <ul v-if="medical.diseases.length !== 0">
                <li class="my-0" v-for="(disease, index) in diseases" :key="index">
                  <v-btn
                    flat
                    fab
                    small
                    color="red lighten-1"
                    v-if="diseaseInput"
                    @click="deleteDisease(index)"
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ModalEdicionInfoCliente from "@/components/clientes/ModalEdicionInfoCliente.vue";
import axios from "axios";

var moment = require("moment");
moment.locale("es");

export default {
  name: "TarjetaInfoCliente",
  components: {
    ModalEdicionInfoCliente
  },
  props: {
    personal: Object,
    professional: Object,
    medical: Object,
    legal: Object,
    additional: Object,
    diseases: Array,
    contactInfo: Object,
    clientId: String
  },
  data() {
    return {
      moment: moment,
      diseaseInput: false,
      newDisease: "",
      updatedDiseases: [],
      isSmoker: Boolean
    };
  },
  methods: {
    reRender() {
      this.$emit("reRenderCard");
    },
    addDisease() {
      this.updatedDiseases.push(this.newDisease);

      axios
        .put("http://localhost:3000/clients/" + this.clientId, {
          medicalInfo: {
            diseases: this.updatedDiseases,
            isSmoker: this.isSmoker
          }
        })
        .then(res => {
          this.reRender;
          this.newDisease = "";
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo agregar el registro, favor de intentar más tarde."
          );
        });
    },
    deleteDisease(index) {
      this.updatedDiseases.splice(index, 1);

      axios
        .put("http://localhost:3000/clients/" + this.clientId, {
          medicalInfo: {
            diseases: this.updatedDiseases,
            isSmoker: this.isSmoker
          }
        })
        .then(res => {
          this.reRender();
          this.newDisease = "";
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo eliminar el registro, favor de intentar más tarde."
          );
        });
    },
    smokerToggle() {
      this.isSmoker = !this.isSmoker;


      axios
        .put("http://localhost:3000/clients/" + this.clientId, {
          medicalInfo: {
            diseases: this.updatedDiseases,
            isSmoker: this.isSmoker
          }
        })
        .then(res => {
          this.isSmoker = this.medical.isSmoker;
          this.reRender();
          this.newDisease = "";
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo cambiar el registro, favor de intentar más tarde."
          );
        });
    }
  },
  created() {
    this.updatedDiseases = this.diseases;
    this.isSmoker = this.medical.isSmoker;
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
