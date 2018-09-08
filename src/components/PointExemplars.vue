<template>
  <div>
    <div></div>
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
          Пункт: {{point.name}}
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
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <div class="text-xs-center mt-3">
        <v-btn @click="next">Да</v-btn>
        <v-btn @click="next">Нет</v-btn>
        <v-btn @click="next">Не относится</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'point-exemplars',
    data: () => ({
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
      next () {
        const active = parseInt(this.active)
        const size = this.points.length - 1
        this.active = (active < size ? active + 1 : 0)
      }
    }
  }
</script>

<style scoped>

</style>
