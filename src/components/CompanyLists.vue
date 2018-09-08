<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Создать лист</v-btn>
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
          <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="all">Развернуть всё</v-btn>
      <v-btn @click="none">Свернуь всё</v-btn>
    </div>
    <v-expansion-panel
      v-model="panel"
      expand
    >
      <v-expansion-panel-content
        v-for="item in listTemplates"
        :key="item.id"
      >
        <div slot="header">
          <h4>№{{item.name}}</h4>
          <p>{{item.description}}</p>
        </div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <v-data-table
              :items="exemplars"
              hide-headers
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td ><a v-bind:href="'/list/' + props.item.id">{{ props.item.name }}</a></td>
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

          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
  export default {
    name: 'company-lists',
    data: () => ({
      dialog: false,
      panel: [],
      items: 15,
      exemplars: [
        {
          id: 1,
          name: '23422',
          description: 'qqqq'
        }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        description: 0
      },
      defaultItem: {
        id: '',
        name: '',
        description: 0
      }
    }),
    methods: {
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      none () {
        this.panel = []
      },
      initialize () {
        this.exemplars = [
          {
            id: 1,
            name: '23422',
            description: 'qqqq'
          }
        ]
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
