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
          v-for="point in points"
          :key="point.name"
          ripple
        >
          <div>
            <v-icon right>{{getImageByAnswer(point.answer)}}</v-icon> Пункт: {{point.name}}
          </div>
        </v-tab>
        <v-tab-item
          v-for="point in points"
          :key="point.name"
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
    <div>Cуммарный штраф : {{sum}}</div>
  </div>
</template>

<script>
  export default {
    name: 'point-exemplars',
    data: () => ({
      sum: 0,
      points: [
        {
          'id': 21794,
          'parentId': 1185,
          'name': '33',
          'description': 'Рабочие места сварщиков при выполнении сварки под флюсом труб и других крупногабаритных конструкций оборудованы специальными кабинами с подачей приточного воздуха, тепло- и звукоизоляцией наружных поверхностей и пультом управления сварочным процессом.',
          'fine': 1000,
          'act': 'Пункт 80 Правил',
          'answer': ''
        },
        {
          'id': 21795,
          'parentId': 1185,
          'name': '34',
          'description': 'В местах возможного скопления газа в производственных помещениях установлены газоанализаторы, извещающие об утечках газа звуковыми и световыми сигналами.',
          'fine': 1000,
          'act': 'Пункт 3.21 ПОТ РО-14000-003-98',
          'answer': ''
        },
        {
          'id': 21796,
          'parentId': 1185,
          'name': '35',
          'description': 'Рабочие места сварщиков ограждены экранами или ширмами из негорючих материалов высотой не менее 1,6 м.',
          'fine': 1000,
          'act': 'Пункт 7.17 ПОТ РО-14000-003-98',
          'answer': ''
        },
        {
          'id': 21797,
          'parentId': 1185,
          'name': '36',
          'description': ' Места проведения погрузочно-разгрузочных работ оборудованы знаками безопасности.',
          'fine': 1000,
          'act': 'Пункт 5.30 ПОТ Р М 006-97',
          'answer': ''
        }
      ],
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
        this.next()
        console.log('point = ' + point)
      },
      setNo (point) {
        point.answer = 'Нет'
        this.next()
        console.log('point = ' + point)
      },
      setNotApplicable (point) {
        point.answer = 'Не относится'
        this.next()
        console.log('point = ' + point)
      },
      next () {
        const active = parseInt(this.active)
        const size = this.points.length - 1
        this.active = (active < size ? active + 1 : 0)
        this.allFins()
      },
      allFins () {
        const pointWithNo = this.points
          .filter(point => {
            return point.answer === 'Нет'
          }
          )
        console.log('pointWithNo.length = ' + pointWithNo.length)
        if (pointWithNo.length !== 0) {
          this.sum = pointWithNo.reduce((result, point) => {
            return result + point.fine
          }, 0)
        } else {
          this.sum = 0
        }
      }
    }
  }
</script>

<style scoped>

</style>
