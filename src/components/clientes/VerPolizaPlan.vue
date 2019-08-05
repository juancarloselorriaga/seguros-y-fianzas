<template>
  <div>
    <v-layout justify-start class="mt-0">
      <v-flex xs12>
        <v-layout align-center justify-start v-if="policyInfo !== null">
          <v-layout v-if="editModeStatus">
            <v-flex xs9>
              <v-text-field
                v-model="policyInfo.plan.title"
                label="titulo del plan"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
                    >
              </v-text-field>
            </v-flex>
          </v-layout>
          <span class="title my-3 mr-3 font-weight-regular" v-else>{{ policyInfo.plan.title }}</span>
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
              v-model="policyInfo.plan.key"
              label="clave del plan"
              hint="Para guardar, cierra el modo edición."
              required
              color="indigo lighten-1"
              class="mx-3"
              clearable
            ></v-text-field>
          </v-layout>
          <v-layout column v-else>
            <span class="subheading blue-grey--text text--lighten-1 my-1">Clave del plan</span>
            <span
              class="body-1 blue-grey--text text--darken-4 text-capitalize"
              v-if="policyInfo !== null"
            >{{policyInfo.plan.key}}</span>
            <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
          </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.plan.coverage"
                label="cobertura"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Cobertura</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.plan.coverage}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.plan.totalPremium"
                label="prima total"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Prima total</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.plan.totalPremium}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.plan.netPremium"
                label="prima neta"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Prima neta</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null"
              >{{policyInfo.plan.netPremium}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-switch
                v-model="policyInfo.hasExtraPremium"
                label="Extra prima"
                color="indigo lighten-1"
                class="mx-3"
                hide-details
              ></v-switch>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Extra prima</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="policyInfo !== null && policyInfo.hasExtraPremium === false"
              >No</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-else-if="policyInfo !== null && policyInfo.hasExtraPremium === true"
              >Sí</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

        <v-flex xs4 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.extraPremiumCause"
                label="causa extra prima"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Causa extra prima</span>
              <span
                class="body-1 blue-grey--text text--darken-4"
                v-if="policyInfo !== null && policyInfo.hasExtraPremium"
              >{{policyInfo.extraPremiumCause}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin extra prima</span>
            </v-layout>
        </v-flex>

        <v-flex xs12 class="mb-3">
            <v-layout v-if="editModeStatus" wrap>
              <v-text-field
                v-model="policyInfo.plan.sumInsured"
                label="suma asegurada"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="mx-3"
                clearable
              ></v-text-field>
            </v-layout>
            <v-layout column v-else>
              <span class="subheading blue-grey--text text--lighten-1 my-1">Suma asegurada</span>
              <span
                class="body-1 blue-grey--text text--darken-4 text-capitalize"
                v-if="policyInfo !== null && policyInfo.plan.sumInsured.length !== 0"
              >{{policyInfo.plan.sumInsured}}</span>
              <span class="body-1 blue-grey--text text--darken-4" v-else>sin información</span>
            </v-layout>
        </v-flex>

      </v-layout>

      
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "VerPolizaPlan",
  props: {
    editMode: Boolean,
    policyInfo: Object
  },
  data() {
    return {
      editModeStatus: false,
    };
  },
    methods: {
    close () {
      this.saveGeneral()
    },
    saveGeneral () {
      axios
      .put("http://localhost:3000/policies/" + this.policyInfo._id, {
          plan: this.policyInfo.plan,
          hasExtraPremium: this.policyInfo.hasExtraPremium,
          extraPremiumCause: this.policyInfo.extraPremiumCause
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
