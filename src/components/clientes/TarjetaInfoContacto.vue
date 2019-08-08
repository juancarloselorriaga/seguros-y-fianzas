<template>
  <div v-if="contactInfo.length !== 0 && typeof contactInfo !== 'null'" class="mb-3">
    <v-layout align-center justify-space-between class="pr-3 mb-3">
      <v-flex xs-10>
        <h2 class="title font-weight-regular blue-grey--text text--darken-2">Tarjetas de contacto</h2>
      </v-flex>
      <v-flex xs2 class="text-xs-right">
        <ModalNuevoContacto :items="items" @reRenderCard="reRender" />
        <confirm ref="confirm"></confirm>
      </v-flex>
    </v-layout>

    <div flat v-for="(contact, index) in contactInfo" :key="index">
      <v-card v-if="contact.contactId !== null" class="radius-3 my-4" :key="reRenderKey">
        <v-card-title>
          <v-layout v-if="contact.contactId.editMode">
            <v-flex xs9>
                <v-text-field
                  v-model="contact.contactId.title"
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
          <h2
            class="subheading font-weight-bold blue-grey--text text--darken-2"
            v-else
          >{{ contact.contactId.title }}</h2>
          <v-spacer></v-spacer>
          <v-btn
            small
            fab
            ligth
            flat
            color="indigo lighten-1"
            class="elevation-0"
            @click="singleCardEdit(contact.contactId._id, index)"
            :checker="editModeChecker"
            v-if="!contact.contactId.editMode"
          >
            <v-icon small dark>edit</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            dark
            color="green lighten-1"
            class="elevation-0"
            v-if="contact.contactId.editMode"
            @click="close"
          >
            <v-icon small dark>check</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            flat
            dark
            color="red lighten-1"
            class="elevation-0"
            @click="deleteCard(contact.contactId._id)"
            v-if="contact.contactId.editMode"
          >
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.email"
                label="email"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Mail</span>
                <span
                  class="body-1 blue-grey--text text--darken-4 text-truncate"
                >{{contact.contactId.email}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.phone"
                label="teléfono"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Teléfono</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.phone}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.mobile"
                label="móvil"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Móvil</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.mobile}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.address.street"
                label="dirección"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>

                <v-text-field
                v-model="contact.contactId.address.number"
                label="número"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>


                <v-text-field
                v-model="contact.contactId.address.neighborhood"
                label="colonia"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Dirección</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.street}} no. {{contact.contactId.address.number}}, {{contact.contactId.address.neighborhood}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.address.municipality"
                label="municipio o delegación"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Municipio o delegación</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.municipality}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.address.state"
                label="estado"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Estado</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.state}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.address.cp"
                label="CP"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">CP</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.cp}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs12 class="mb-3">
              <v-layout column v-if="editedCardIndex === index">
                <v-text-field
                v-model="contact.contactId.address.additionalInfo"
                label="información adicional"
                hint="Para guardar, cierra el modo edición."
                required
                color="indigo lighten-1"
                class="ma-3"
                clearable
                    >
              </v-text-field>
              </v-layout>
              <v-layout column v-else>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Información adicional</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.additionalInfo}}</span>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </div>
  <div v-else class="mb-3">
    <v-layout align-center justify-space-between class="pr-3 mb-3">
      <v-flex xs-10>
        <h2
          class="title font-weight-regular blue-grey--text text--darken-2"
        >Sin información de contacto</h2>
      </v-flex>
      <v-flex xs2 class="text-xs-right">
        <ModalNuevoContacto :items="items" @reRenderCard="reRender" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import ModalNuevoContacto from "@/components/clientes/ModalNuevoContacto.vue";
import Confirm from "@/components/utilities/Confirm.vue";
import axios from "axios";

export default {
  name: "TarjetaInfoCliente",
  components: {
    ModalNuevoContacto,
    Confirm
  },
  props: {
    contactInfo: Array,
    items: Object,
    reRenderKey: Number
  },
  data() {
    return {
      editedCardIndex: null,
      editedCard: {}
    }
  },
  methods: {
    singleCardEdit (cardId, index) {
      this.contactInfo.forEach(e => {
        e.contactId.editMode = false;
      })
      let updatedCard = this.contactInfo[index];
      updatedCard.contactId.editMode = true;
      this.editedCardIndex = index
      this.editedCard = updatedCard
    },
    saveEditStatus(updatedCard, index) {
      let cardId = updatedCard.contactId._id
      axios
        .put('http://localhost:3000/contact-info/' + cardId, {
          title: updatedCard.contactId.title,
          email: updatedCard.contactId.email,
          phone: updatedCard.contactId.phone,
          mobile: updatedCard.contactId.mobile,
          address: {
            street: updatedCard.contactId.address.street,
            number: updatedCard.contactId.address.number,
            neighborhood: updatedCard.contactId.address.neighborhood,
            municipality: updatedCard.contactId.address.municipality,
            state: updatedCard.contactId.address.state,
            cp: updatedCard.contactId.address.cp,
            additionalInfo: updatedCard.contactId.address.additionalInfo,
          }
        })
        .then(res => {
          updatedCard.contactId.editMode = false;
          this.editedCard = {},
          this.editedCardIndex = null
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo editar el registro, favor de intentar más tarde."
          );
        });
        //Tengo que poner todos los campos editables para poder guardar la info.
        //Tengo que hacer métodos get para poder tener actualizada la información y en tiempo real.
    },
    close () {
      this.saveEditStatus(this.editedCard, this.editedCardIndex);
    },
    async deleteCard(cardId) {
       if (await this.$refs.confirm.open('Borrar tarjeta de contacto', '¿Estás seguro de querer borrar ésta tarjeta de contacto? Esta acción es irreversible', { color: 'red' })) {
      axios
          .delete('http://localhost:3000/contact-info/' + cardId, {})
          .then(res => {
            this.$emit("reRenderCard");
          })
          .catch(err => {});
      }
      else {
        // cancel
      }
    },
    reRender() {
      this.$emit("reRenderCard");
    },
  },
  computed: {
editModeChecker () {
    return !this.contactInfo[this.editedCardIndex]
  },
  }
  
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}
</style>

