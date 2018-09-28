<template>
  <div>

    <div>
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
            <v-icon right>{{getImageByAnswer(point.answer)}}</v-icon> Пункт: {{point.name}}
          </div>
        </v-tab>
        <v-tab-item
          v-for="point in this.$store.getters.getPointExemplars"
          :key="point.exemplarId"
        >
          <v-card flat>
            <v-card-text>
              <div>{{ point.act }}</div>
              <div>{{ point.description }}</div>
              <div>Штраф:{{ point.fine }}</div>
              <div class="text-xs-center mt-3">
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
      active: null
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
        this.next()
      },
      setNo (point) {
        point.answer = 'Нет'
        this.$store.dispatch('UPDATE_POINT_EXEMPLAR', { pointExemplar: point })
        this.next()
      },
      setNotApplicable (point) {
        point.answer = 'Не относится'
        this.$store.dispatch('UPDATE_POINT_EXEMPLAR', { pointExemplar: point })
        this.next()
      },
      next () {
        const active = parseInt(this.active)
        const size = this.$store.getters.getPointExemplars.length - 1
        this.active = (active < size ? active + 1 : 0)
      }
    },
    computed: {
      allFins () {
        const pointWithNo = this.$store.getters.getPointExemplars
          .filter(point => {
            return point.answer === 'Нет'
          }
          )
        if (pointWithNo.length !== 0) {
          return pointWithNo.reduce((result, point) => {
            return result + point.fine
          }, 0)
        } else {
          return 0
        }
      }
    },
    created () {
      console.log('ID = ' + this.id)
      this.$store.dispatch('LOAD_POINT_EXEMPLARS', {listExemplarId: this.id})
    }
  }
</script>

<style scoped>

</style>
