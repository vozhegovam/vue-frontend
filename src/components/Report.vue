<template>
  <div>
    <div>
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item :disabled="false" :href="'/companies'">
          Фирмы
        </v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="companyById !== null" :disabled="true">
          {{companyById.name}}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </div>
    <div v-for="list in listExemplarsWithTeplate">
      <v-card>
        <v-flex xs12>
          <v-textarea
            box
            auto-grow
            readonly
            v-model="'Лист №' + list.templateName + '       Экземпляр: ' + list.exemplarName + '          Описание: ' + list.templateDescription"
          ></v-textarea>
        </v-flex>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap
                    v-for="point in pointExemplars"
                    :key="point.id">
            <v-flex xs12 v-if="point.listExemplarId === list.exemplarId">
              <v-card>
                <v-card-title>
                  <v-flex xs10>
                    <b>№ {{point.name}}</b>
                  </v-flex>
                  <v-flex xs12>
                    Описание: {{point.description}}
                  </v-flex>
                  <v-flex xs12>
                    Закон: {{point.act}}
                  </v-flex>
                  <v-flex xs12>
                    Штраф: {{point.fine}}
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'report',
    props: ['id'],
    created () {
      this.$store.dispatch('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_AND_COMPANY', { companyId: this.id })
      this.$store.dispatch('LOAD_COMPANY', { companyId: this.id })
      this.$store.dispatch('LOAD_POINT_EXEMPLARS_BY_COMPANY', { companyId: this.id })
    },
    computed: {
      listExemplarsWithTeplate () {
        return this.$store.getters.getListExemplarWithTemplates
      },
      pointExemplars () {
        return this.$store.getters.getPointExemplars.filter(point => { return point.answer === 'Нет' })
      },
      companyById () {
        return this.$store.getters.getCompany
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
