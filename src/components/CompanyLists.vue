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
    <div>
      <v-card>
        <v-layout row wrap align-center>
          <v-flex xs1>
          </v-flex>
          <v-flex xs3>
            <v-btn small block :to="'/report/' + id" class="mb-2">Сформировать отчёт</v-btn>
          </v-flex>
          <v-flex xs4>
          </v-flex>
          <v-flex xs3>
            <v-checkbox
              :label="`Только незаполненные`"
              v-model="checkbox"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap
                    v-for="item in listExemplarsWithTemplate"
                    :key="item.exemplarId">
            <v-flex xs12>
              <v-card v-bind:class="getColor(item.checked)">
                <v-card-title>
                  <v-flex xs12>
                    <a :href="'/list/' + item.exemplarId">№ {{item.templateName}}</a>
                  </v-flex>
                  <v-flex xs12>
                    {{item.templateDescription}} + {{item.checked}}
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
    props: ['id'],
    name: 'company-lists',
    data: () => ({
      panel: [],
      checkbox: false
    }),
    methods: {
      getColor (isChecked) {
        if (isChecked) {
          return 'v-card theme--light green'
        } else {
          return 'v-card theme--light'
        }
      }
    },
    created () {
      this.$store.dispatch('LOAD_COMPANY', {companyId: this.id})
      this.$store.dispatch('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY', { companyId: this.id })
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
      },
      companyById () {
        return this.$store.getters.getCompany
      },
      listExemplarsWithTemplate () {
        return this.$store.getters.getListExemplarWithTemplates
      }
    }
  }
</script>

<style scoped>

</style>
