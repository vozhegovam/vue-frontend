<template>
  <div>
    <v-data-table
      :items="exemplars"
      hide-headers
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
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
                <v-text-field v-model="editedItem.description" label="Описание"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
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
      exemplars: [
        {
          id: 1,
          parentId: '1112',
          companyId: '2',
          name: '23422',
          description: 'qqqq'
        }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        parentId: this.listId,
        companyId: this.companyId,
        description: 0
      },
      defaultItem: {
        id: '',
        name: '',
        parentId: this.listId,
        companyId: this.companyId,
        description: 0
      }
    }),
    methods: {

      getExemplarByListIdAndConpanyId () {
        this.exemplars = this.exemplars.filter(exemplar => {
          console.log(exemplar.name + ' ' + exemplar.parentId + ' ' + exemplar.companyId)
          return ((exemplar.parentId === this.listId.toString()) && (exemplar.companyId === this.companyId))
        })
      },

      editItem (item) {
        this.editedIndex = this.exemplars.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.exemplars.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.exemplars.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.exemplars[this.editedIndex], this.editedItem)
        } else {
          console.log('this.editedItem.parentId = ' + this.editedItem.parentId + ' this.parentId = ' + this.listId + 'this.name = ' + this.editedItem.name)
          this.editedItem.companyId = this.companyId
          this.editedItem.parentId = this.listId
          this.exemplars.push(this.editedItem)
        }
        this.close()
      }
    },
    computed: {
      listTemplates () {
        return this.$store.getters.listTemplates
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    }
  }
</script>

<style scoped>

</style>
