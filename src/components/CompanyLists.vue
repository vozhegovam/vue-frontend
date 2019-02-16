<template>
  <div>
    <div>
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item :disabled="false" :href="'/'">
          Фирмы
        </v-breadcrumbs-item>
        <v-breadcrumbs-item v-if="companyById !== null" :disabled="true">
          {{companyById.name}}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </div>
    <template v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="!loading">
      <div>
        <v-card>
          <v-layout row wrap align-center>
            <v-flex xs1>
            </v-flex>
            <v-flex xs3>
              <v-btn small color="primary" dark :to="'/report/' + id" class="mb-2">Сформировать отчёт</v-btn>
            </v-flex>
            <v-flex xs4>
              <v-checkbox
                :label="`Скрыть не относящиеся`"
                v-model="checkbox1"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-checkbox
                :label="`Скрыть проверенные`"
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
                <v-card v-bind:class="getColor(item)">
                  <v-card-title>
                    <v-flex xs12>
                      <v-layout align-center justify-space-between row>
                        <v-flex xs2><a :href="'/list/' + item.exemplarId">№ {{item.templateName}}</a></v-flex>
                        <v-tooltip bottom>
                          <v-btn
                            :loading="updateLoading && (item.exemplarId === exemplar)"
                            slot="activator"
                            @click="excludeIncludeList(item.exemplarId)"
                            icon><v-icon>{{getImage(item.inScope)}}</v-icon>
                          </v-btn>
                          <span>{{getMessage(item.inScope)}}</span>
                        </v-tooltip>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      {{item.templateDescription}}
                    </v-flex>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    name: 'company-lists',
    data: () => ({
      panel: [],
      checkbox: false,
      checkbox1: false,
      exemplar: null
    }),
    methods: {
      getColor (item) {
        if (!item.inScope) {
          return 'v-card theme--light grey'
        } else if (item.checked) {
          return 'v-card theme--light green'
        } else {
          return 'v-card theme--light'
        }
      },
      getMessage (inScope) {
        if (inScope) {
          return 'Убрать из списка на проверку'
        } else {
          return 'Включить в список для проверки'
        }
      },
      getImage (inScope) {
        if (inScope) {
          return 'remove_circle'
        } else {
          return 'add_circle'
        }
      },
      excludeIncludeList (exemplarId) {
        this.exemplar = exemplarId
        this.$store.dispatch('EXCLUDE_INCLUDE_LIST', {listId: exemplarId})
          .then(this.exemplar = null)
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
        if (this.checkbox && this.checkbox1) {
          return this.$store.getters.getListExemplarWithTemplates.filter(list => { return (!list.checked && list.inScope) })
        } else if (this.checkbox) {
          return this.$store.getters.getListExemplarWithTemplates.filter(list => { return (!list.checked) })
        } else if (this.checkbox1) {
          return this.$store.getters.getListExemplarWithTemplates.filter(list => { return (list.inScope) })
        } else {
          return this.$store.getters.getListExemplarWithTemplates
        }
      },
      loading () {
        return this.$store.getters.loading
      },
      updateLoading () {
        return this.$store.getters.updateLoading
      }
    }
  }
</script>

<style scoped>

</style>
