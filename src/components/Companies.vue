<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Добавить компанию</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.description" label="Описание"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.owner" label="Пользователь"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.check" label="Преверка пройдена"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="corps"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.owner }}</td>
        <td class="text-xs-right">{{ props.item.check }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Имя', align: 'left', value: 'name' },
        { text: 'Описание', value: 'description' },
        { text: 'Пользователь', value: 'owner' },
        { text: 'Проверка пройдена', value: 'check' }
      ],
      corps: [
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        description: '',
        owner: '',
        check: ''
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
        owner: '',
        check: 'Не пройдена'
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.corps = [
          {
            'id': 1,
            'name': 'Bobs company',
            'description': 'qweasdasdasd2222',
            'owner': null,
            'check': null
          },
          {
            'id': 2,
            'name': '123',
            'description': '321',
            'owner': null,
            'check': null
          },
          {
            'id': 3,
            'name': 'QQqq',
            'description': 'Wwww',
            'owner': null,
            'check': null
          },
          {
            'id': 4,
            'name': '222',
            'description': '111',
            'owner': null,
            'check': null
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.corps.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.corps.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.corps.splice(index, 1)
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
          Object.assign(this.corps[this.editedIndex], this.editedItem)
        } else {
          this.corps.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
