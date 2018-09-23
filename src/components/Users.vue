<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Добавить Пользователя</v-btn>
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
                <v-text-field v-model="editedItem.login" label="Логин"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.email" label="Почта"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="roles"
                  v-model="editedItem.role"
                  label="Роль"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="createUpdateUser(editedItem)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="this.$store.getters.getUsers"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.login }}</td>
        <td class="text-xs-right">{{ props.item.password }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.role }}</td>
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
        {
          text: 'Пользователь',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Логин', value: 'login' },
        { text: 'Пароль', value: 'password' },
        { text: 'Email', value: 'email' },
        { text: 'Роль', value: 'role' }
      ],
      roles: [
        { text: 'Администратор' },
        { text: 'Пользователь' }
      ],
      users: [ ],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        login: '',
        password: '',
        email: '',
        role: ''
      },
      defaultItem: {
        id: null,
        name: '',
        login: '',
        password: '',
        email: '',
        role: ''
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
      this.$store.dispatch('LOAD_USERS')
      this.users = this.$store.getters.getUsers
    },

    mounted: function () {

    },

    methods: {
      initialize () {
        console.log('START')
        console.log('USERS = ' + this.$store.getters.getUsers)
        this.users = this.$store.getters.getUsers
        return null
      },

      createUpdateUser (user) {
        console.log('USER.ID = ' + user.id)
        if (user.id === null) {
          console.log('CREATE')
          this.$store.dispatch('ADD_NEW_USER', { user: user })
        } else {
          console.log('UPDATE')
          this.$store.dispatch('UPDATE_USER', { user: user })
        }
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.users.indexOf(item)
        confirm('Уверены что хотите удалить этого пользователя?') && this.users.splice(index, 1)
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
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
