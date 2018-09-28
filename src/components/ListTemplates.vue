<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item :disabled="true">
        Проверочные листы
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div>
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap
                    v-for="item in listTemplates"
                    :key="item.id">
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  <v-flex xs10>
                    <a :href="'/template/' + item.id">№ {{item.name}}</a>
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
  import VListTileAction from 'vuetify/src/components/VList/VListTileAction'

  export default {
    components: {VListTileAction},
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATES')
    },
    computed: {
      listTemplates () {
        return this.$store.getters.getListTemplates
      }
    }
  }
</script>
