<template>
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
      <v-data-table
        :items="getExLists"
        hide-headers
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td><a v-bind:href="'/list/' + props.item.id + '/template_id=' + listId + '/company_id=' + companyId">{{ props.item.name }}</a></td>
          <td>{{ getUserByValue(props.item.userId) }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn small slot="activator" color="primary" dark class="mb-2">Создать</v-btn>
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
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="this.$store.getters.getUsersAsList"
                    v-model="editedItem.userId"
                    label="Пользователь"
                    single-line
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="createUpdateListExemplar(editedItem)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>

<script>
  export default {
    props: ['listId', 'companyId'],
    name: 'list-exemplars',
    data: () => ({
      dialog: false,
      exemplars: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        checkListId: null,
        companyId: null,
        userId: null,
        checked: false
      },
      defaultItem: {
        id: null,
        name: '',
        checkListId: null,
        companyId: null,
        userId: null,
        checked: false
      }
    }),
    methods: {
      createUpdateListExemplar (listExemplar) {
        listExemplar.checkListId = this.listId
        listExemplar.companyId = this.companyId
        if (listExemplar.id === null) {
          this.$store.dispatch('ADD_NEW_LIST_EXEMPLAR', { listExemplar })
        } else {
          this.$store.dispatch('UPDATE_LIST_EXEMPLAR', { listExemplar })
        }
        this.close()
      },

      editItem (listExemplar) {
        this.editedIndex = this.exemplars.indexOf(listExemplar)
        this.editedItem = Object.assign({}, listExemplar)
        this.dialog = true
      },

      deleteItem (listExemplar) {
        confirm('Вы уверены что хотите удалить этот объект?') && this.$store.dispatch('REMOVE_LIST_EXEMPLAR', { listExemplar })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
        this.exemplars = this.$store.getters.getListExemplarsByParentIdAndTemplateId
      },
      getUserByValue (id) {
        return this.$store.getters.getUsers.find(item => { return item.id === id }).name
      }
    },
    created () {
    },
    computed: {
      getExLists () {
        return this.$store.getters.getListExemplarsByParentIdAndTemplateId.filter(item => item.checkListId === this.listId)
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

</style>
