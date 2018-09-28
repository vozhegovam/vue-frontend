<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item :disabled="true">
        Проверочные листы
      </v-breadcrumbs-item>
      <v-breadcrumbs-item :disabled="false">
        № {{this.$state.getters.getListTemplateById.name}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div>
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap
                    v-for="item in pointTemplatesByParentId"
                    :key="item.id">
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  <v-flex xs10>
                    <b>№ {{item.name}}</b>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                      <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12>
                    {{item.description}}
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
    data: () => ({
      list: ''
    }),
    computed: {
      pointTemplatesByParentId () {
        return this.$store.getters.getPointsByParent
      }
    },
    methods: {
    },
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATE', { listId: this.id })
      this.$store.dispatch('LOAD_POINT_TEMPLATES', { listId: this.id })
    }
  }
</script>
