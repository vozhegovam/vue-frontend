<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <template v-for="item in pointTemplatesByParentId">
            <v-list-tile
              :key="item.name"
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
</template>


<script>
  export default {
    props: ['id'],
    computed: {
      pointTemplatesByParentId () {
        const id = this.id
        return this.$store.getters.pointTemplatesByParentId(id)
      }
    }
  }
</script>
