<template>
  <div>
    <v-layout row wrap align-center>
      <v-flex xs7>
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item :disabled="false" :href="'/'">
            Фирмы
          </v-breadcrumbs-item>
          <v-breadcrumbs-item v-if="companyById !== null" :disabled="true">
            {{companyById.name}}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs1>
        Скачать :
      </v-flex>
      <!--<v-flex xs1>-->
        <!--<v-checkbox-->
          <!--:label="`PDF`"-->
          <!--v-model="isExcel"-->
        <!--&gt;</v-checkbox>-->
      <!--</v-flex>-->
      <!--<v-flex xs1>-->
        <!--<v-radio-group v-model="isExcel" :mandatory="false">-->
          <!--<v-radio label="PDF" value=false></v-radio>-->
          <!--<v-radio label="EXCEL" value=true></v-radio>-->
        <!--</v-radio-group>-->
      <!--</v-flex>-->

      <!--<v-flex xs1>-->
      <!--<v-btn v-if="!reportLoading"-->
      <!--small-->
      <!--color="primary"-->
      <!--:loading="fileLoading"-->
      <!--:disabled="fileLoading"-->
      <!--@click="redirectToPdfFile">Скачать</v-btn>-->
      <!--</v-flex>-->
      <v-flex xs1>
        <v-btn v-if="!reportLoading"
               small
               color="primary"
               :loading="fileLoading"
               :disabled="fileLoading"
               @click="redirectToPdfFile">PDF</v-btn>
      </v-flex>
      <v-flex xs1>
        <v-btn v-if="!reportLoading"
               small color="primary"
               :loading="fileLoading"
               :disabled="fileLoading"
               @click="redirectToExcelFile">EXCEL</v-btn>
      </v-flex>
    </v-layout>
    <template v-if="reportLoading">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="!reportLoading">
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
                v-model="'Лист №' + list.templateName + ' | ' + list.templateDescription"
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
                      <b>Описание : </b> {{point.description}}
                    </v-flex>
                    <v-layout
                      v-for="child in point.children"
                      :key="child.id">
                      <v-flex v-if="child.answer === 'Нет'" xs12>
                        <v-card no wrap>
                          <v-card-title xs12>
                            <v-flex xs12>
                              <b>{{child.name}})</b> {{child.description}}
                            </v-flex>
                            <v-flex v-if="child.act !== ''" xs12>
                              <b>Нормативный правовой акт:</b> {{child.act}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Штраф:</b> {{child.fine}}
                            </v-flex>
                          </v-card-title>
                        </v-card>
                      </v-flex>
                    </v-layout>

                    <v-flex xs12>
                      <b>Правовой акт : </b> {{point.act}}
                    </v-flex>
                    <v-flex v-if="point.children.length === 0"xs12>
                      <b>Штраф : </b> {{point.fine}}
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
    data: () => ({
      isExcel: true,
      isPdf: true
    }),
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
      },
      fileLoading () {
        return this.$store.getters.fileLoading
      },
      reportLoading () {
        return this.$store.getters.reportLoading
      }
    },
    methods: {
      redirectToExcelFile () {
        this.$store.dispatch('LOAD_FILE', { companyId: this.id, fileName: this.id, format: 'xlsx' })
      },
      redirectToPdfFile () {
        this.$store.dispatch('LOAD_FILE', { companyId: this.id, fileName: this.id, format: 'pdf' })
      },
      redirectToFile () {
        if (this.isExcel) {
          this.redirectToExcelFile()
        } else {
          this.redirectToPdfFile()
        }
      }
    }
  }
</script>

<style scoped>

</style>
