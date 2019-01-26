<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item :disabled="true">
        Проверочные листы
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <template v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="!loading">
      <v-btn small color="info" @click="migrateUpdateList()">Мигрировать из файла</v-btn>
      <div>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Имя"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea auto-grow v-model="editedItem.description" label="Описание"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
              <v-btn color="blue darken-1" flat @click.native="createUpdateList(editedItem)">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
                      <v-btn icon class="mx-0" @click="editItem(item)">
                        <!--:loading="updateloading && editedItem.id === item.id"-->
                        <!--:disabled="updateloading && editedItem.id === item.id"-->
                        <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon class="mx-0" @click="deleteItem(item)">
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
    </template>
  </div>
</template>

<script>
  import VListTileAction from 'vuetify/src/components/VList/VListTileAction'

  export default {
    data: () => ({
      list: '',
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        description: ''
      },
      defaultItem: {
        id: null,
        name: '',
        description: ''
      }
    }),
    components: {VListTileAction},
    methods: {
      createUpdateList (listTemplate) {
        if (listTemplate.id !== null) {
          this.$store.dispatch('UPDATE_LIST_TEMPLATE', { listTemplate: listTemplate })
        }
        this.close()
      },

      migrateUpdateList () {
        this.$store.dispatch('MIGRATE_LIST_TEMPLATES')
      },

      editItem (listTemplate) {
        this.editedItem = Object.assign({}, listTemplate)
        this.dialog = true
      },

      deleteItem (listTemplate) {
        confirm('Уверены что хотите удалить этот проверочный лист?') && this.$store.dispatch('REMOVE_LIST_TEMPLATE', { listTemplate })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    },
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATES')
    },
    computed: {
      listTemplates () {
        return this.$store.getters.getListTemplates
      },
      loading () {
        return this.$store.getters.loading
      },
      updateloading () {
        return this.$store.getters.updateLoading
      }
    }
  }
</script>
