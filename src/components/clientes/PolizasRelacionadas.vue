<template>
  <v-list subheader>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              avatar
              @click=""
            >
  
              <v-list-tile-content>
                <v-list-tile-title v-html="item"></v-list-tile-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-icon color="indigo lighten-2">visibility</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
</template>

<script>
export default {
    data () {
    return {
      items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ]
    }
  }
}
</script>

