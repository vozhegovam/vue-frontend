<template>
  <div>
    <v-layout row wrap>
      <v-flex xs8>
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item :disabled="false" :href="'/companies'">
            Фирмы
          </v-breadcrumbs-item>
          <v-breadcrumbs-item v-if="companyById !== null" :disabled="true">
            {{companyById.name}}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs3>
        <v-btn small block color="primary" dark class="mb-2" @click="redirectToFile">Выгрузить в PDF</v-btn>
      </v-flex>
      <v-flex xs1>
        Файл: <a v-if="this.$store.getters.getReportPath != null" :href="this.$store.getters.getReportPath">Скачать</a>
      </v-flex>
    </v-layout>
    <div v-for="list in listExemplarsWithTemplate">
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-flex xs12>
            <v-textarea
              box
              auto-grow
              readonly
              v-model="'Лист №' + list.templateName + '   Описание: ' + list.templateDescription"
            ></v-textarea>
          </v-flex>
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
                    <b>Описание:</b> {{point.description}}
                  </v-flex>
                  <v-flex xs12>
                    <b>Закон:</b> {{point.act}}
                  </v-flex>
                  <v-flex xs12>
                    <b>Штраф:</b> {{point.fine}}
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
      this.$store.dispatch('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY_ID_FOR_REPORT', { companyId: this.id })
      this.$store.dispatch('LOAD_COMPANY', { companyId: this.id })
      this.$store.dispatch('LOAD_POINT_EXEMPLARS_BY_COMPANY', { companyId: this.id })
    },
    computed: {
      listExemplarsWithTemplate () {
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
      redirectToFile () {
        console.log('START')
        this.$store.dispatch('LOAD_REPORT', { companyId: this.id })
//        this.$route.router.go(this.$store.getters.getReportPath)
      }
    }
  }
</script>

<style scoped>

</style>
