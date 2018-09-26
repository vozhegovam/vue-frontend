<template>
  <div>
    <v-expansion-panel
      v-model="panel"
      expand
    >
      <v-expansion-panel-content
        v-for="item in listTemplates"
        :key="item.id"
      >
        <div slot="header">
          <h4>№{{item.name}}</h4>
          <p>{{item.description}}</p>
        </div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <list-exemplars :listId ="item.id" :companyId = id ></list-exemplars>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="all">Развернуть всё</v-btn>
      <v-btn @click="none">Свернуь всё</v-btn>
    </div>
  </div>
</template>

<script>
  import ListExemplars from './ListExemplars'

  export default {
    components: {ListExemplars},
    props: ['id'],
    name: 'company-lists',
    data: () => ({
      panel: []
    }),
    methods: {
      all () {
        this.panel = [...Array(this.listTemplates.length).keys()].map(_ => true)
      },
      none () {
        this.panel = []
      }
    },
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATES')
      this.$store.dispatch('LOAD_USERS')
      this.$store.dispatch('LOAD_LIST_EXEMPLARS_BY_COMPANY', {companyId: this.id})
    },
    computed: {
      listTemplates () {
        return this.$store.getters.getListTemplates
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
      }
    }
  }
</script>

<style scoped>

</style>
