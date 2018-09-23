<template>
  <div>
    <h1>Шаблоны проверочных листов</h1>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-list three-line>
            <template v-for="item in listTemplates">
              <v-list-tile
                :key="item.id"
                :to="'/template/' + item.id"
                @click=""
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import VListTileAction from 'vuetify/src/components/VList/VListTileAction'

  export default {
    components: {VListTileAction},
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATES')
    },
    computed: {
      listTemplates () {
        return this.$store.getters.getListTemplates
      }
    }
  }
</script>
