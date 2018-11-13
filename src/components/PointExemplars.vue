<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item :disabled="false" :href="'/'">
        Фирмы
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-if="listExemplarWithTemplate !== null" :href="'/company/' + listExemplarWithTemplate.companyId"
                          :disabled="false">
        {{listExemplarWithTemplate.companyName}}
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-if="listExemplarWithTemplate !== null"
                          :disabled="true">
        № {{listExemplarWithTemplate.templateName}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div>
      <div v-if="listExemplarWithTemplate !== null" center>
        <v-flex xs12>
          <v-textarea
            box
            auto-grow
            readonly
            label="Проверочный лист"
            v-model="listExemplarWithTemplate.templateDescription"
          ></v-textarea>
        </v-flex>
      </div>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
      >
        <v-tab
          v-for="point in this.$store.getters.getPointExemplars"
          :key="point.name + 'p'"
          ripple
        >
          <div>
            <v-icon small right>{{getImageByAnswer(point.answer)}}</v-icon> Пункт: {{point.name}}
          </div>
        </v-tab>
        <v-tab-item
          v-for="point in this.$store.getters.getPointExemplars"
          :key="point.exemplarId"
        >
          <v-card flat>
            <v-card-text>
              <div><b>Описание : </b>{{ point.description }}</div>
              <v-btn small v-if="point.children.length !== 0" dark @click="setNotApplicable(point)">
                <v-icon dark left>block</v-icon>Не относится
              </v-btn>
              <v-layout
                v-for="child in point.children"
                :key="child.exemplarId">
                <v-flex xs12>
                  <v-card no wrap>
                    <v-card-title xs12>
                      <v-flex xs10>
                        <div>
                          <v-icon small right>{{getImageByAnswer(child.answer)}}</v-icon><b>{{child.name}}) </b> {{child.description}}
                        </div>
                      </v-flex>
                      <v-flex xs2>
                      </v-flex>
                      <v-flex v-if="child.act !== ''" xs12>
                        <b>Нормативный правовой акт : </b> {{child.act}}
                      </v-flex>
                      <v-flex xs12>
                        <b>Штраф : </b> {{child.fine}}
                      </v-flex>
                      <div class="text-xs-center mt-3">
                        <v-btn small color="red" dark @click="setYes(child)">Да
                          <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        <v-btn small color="primary" dark @click="setNo(child)">Нет
                          <v-icon dark right>remove_circle</v-icon>
                        </v-btn>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
              <div><b>Правовой акт : </b> {{ point.act }}</div>
              <div v-if="point.children.length === 0"><b>Штраф:</b>{{ point.fine }}</div>
              <div v-if="point.children.length === 0" class="text-xs-center mt-3">
                <v-btn color="red" dark @click="setYes(point)">Да
                  <v-icon dark right>check_circle</v-icon>
                </v-btn>

                <v-btn color="primary" dark @click="setNo(point)">Нет
                  <v-icon dark right>remove_circle</v-icon>
                </v-btn>

                <v-btn dark @click="setNotApplicable(point)">
                  <v-icon dark left>block</v-icon>Не относится
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
    <div>Cуммарный штраф : {{this.allFins}}</div>
  </div>
</template>

<script>
  export default {
    name: 'point-exemplars',
    props: ['id'],
    data: () => ({
      sum: 0,
      points: [],
      parentPointEx: {},
      active: 0
    }),
    methods: {
      getImageByAnswer (answer) {
        if (answer === 'Да') {
          return 'check_circle'
        }
        if (answer === 'Нет') {
          return 'remove_circle'
        }
        if (answer === 'Не относится') {
          return 'block'
        }
      },
      setYes (point) {
        point.answer = 'Да'
        this.$store.dispatch('UPDATE_POINT_EXEMPLAR', { pointExemplar: point })
        this.next(point)
      },
      setNo (point) {
        point.answer = 'Нет'
        this.$store.dispatch('UPDATE_POINT_EXEMPLAR', { pointExemplar: point })
        this.next(point)
      },
      setNotApplicable (point) {
        point.answer = 'Не относится'
        this.$store.dispatch('UPDATE_POINT_EXEMPLAR', { pointExemplar: point })
        this.next(point)
      },

      next (point) {
        if (point.parentExemplarId === null) {
          this.nextStep()
        } else {
          this.parentPointEx = this.$store.getters.getPointExemplars.find((exemplar) => { return exemplar.exemplarId === point.parentExemplarId })
          const chCount = this.parentPointEx.children.length
          const chWithAnswerCount = this.parentPointEx.children.filter(point => { return point.answer !== null }).length
          if (chWithAnswerCount === chCount) {
            this.nextStep()
          }
        }
      },
      nextStep () {
        const active = parseInt(this.active)
        const size = this.$store.getters.getPointExemplars.length - 1
        this.active = (active < size ? active + 1 : 0)
      }
    },
    computed: {
      allFins () {
        const pointWithNo = this.$store.getters.getPointExemplars
          .filter(point => { return point.answer === 'Нет' })
        if (pointWithNo.length !== 0) {
          return pointWithNo.reduce((result, point) => {
            return result + point.fine
          }, 0)
        } else {
          return 0
        }
      },
      listExemplarWithTemplate () {
        return this.$store.getters.getListExemplarWithTemplate
      }
    },
    created () {
      this.$store.dispatch('LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID', { listId: this.id })
      this.$store.dispatch('LOAD_POINT_EXEMPLARS', {listExemplarId: this.id})
    }
  }
</script>

<style scoped>

</style>
