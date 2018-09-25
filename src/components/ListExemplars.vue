<template>
  <div>
    <v-data-table
      :items="getExLists"
      hide-headers
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td><a v-bind:href="'/list/' + props.item.id">{{ props.item.name }}</a></td>
        <td>{{ props.item.description }}</td>
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
                <v-text-field v-model="editedItem.userId" label="Пользователь"></v-text-field>
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
          console.log('CREATE listExemplar')
          this.$store.dispatch('ADD_NEW_LIST_EXEMPLAR', { listExemplar })
        } else {
          console.log('UPDATE')
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
      }
    },
    created () {
      this.$store.dispatch('LOAD_LIST_EXEMPLARS_BY_COMPANY', {companyId: this.companyId})
    },
    computed: {
      getExLists () {
        console.log('this.$store.state.listExemplars = ' + this.$store.state.listExemplars.length)
        const listId = this.listId
        return this.$store.state.listExemplars.filter(item => item.checkListId === listId)
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    }
  }
</script>

<style scoped>

</style>
