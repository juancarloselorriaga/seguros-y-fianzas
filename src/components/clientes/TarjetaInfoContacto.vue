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
          <h2
            class="subheading font-weight-bold blue-grey--text text--darken-2"
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
          >
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Mail</span>
                <span
                  class="body-1 blue-grey--text text--darken-4 text-truncate"
                >{{contact.contactId.email}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Teléfono</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.phone}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Móvil</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.mobile}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Dirección</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.street}} no. {{contact.contactId.address.number}}, {{contact.contactId.address.neighborhood}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Municipio o delegación</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.municipality}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">Estado</span>
                <span
                  class="body-1 blue-grey--text text--darken-4"
                >{{contact.contactId.address.state}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs6 class="mb-3">
              <v-layout column>
                <span class="subheading blue-grey--text text--lighten-1 my-1">CP</span>
                <span class="body-1 blue-grey--text text--darken-4">{{contact.contactId.address.cp}}</span>
              </v-layout>
            </v-flex>

            <v-flex xs12 class="mb-3">
              <v-layout column>
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
      editMode: false,
      editedCardIndex: Number
    }
  },
  methods: {
    singleCardEdit (cardId, index) {
      this.contactInfo.forEach(e => {
        e.contactId.editMode = false;
      })
      let updatedCard = this.contactInfo[index];
      updatedCard.contactId.editMode = true;
      updatedCard.contactId.title = 'Prueba de edición aprobada 2'
      this.editedCardIndex = index

      this.saveEditSatus(updatedCard, index);
    },
    saveEditSatus(updatedCard, index) {
      let cardId = updatedCard.contactId._id
      console.log(cardId)
      axios
        .put('http://localhost:3000/contact-info/' + cardId, {
          contactInfo: updatedCard
        })
        .then(res => {
          console.log('update correcto')
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
      this.editMode = false;
      // this.saveContactCard()
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
  }
  }
  
};
</script>

<style scoped>
.radius-3 {
  border-radius: 30px;
}
</style>

