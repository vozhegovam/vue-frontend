<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" small color="primary" dark class="mb-2">Добавить Пользователя</v-btn>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!--<v-flex xs12 sm6 md4>-->
                <!--<v-text-field v-model="editedItem.name" label="Имя"></v-text-field>-->
              <!--</v-flex>-->
              <!--<v-flex xs12 sm6 md4>-->
                <!--<v-text-field v-model="editedItem.login" label="Логин"></v-text-field>-->
              <!--</v-flex>-->
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>
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
          <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click.native="createUpdateUser(editedItem)">Сохранить</v-btn>
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
        <!--<td>{{ props.item.name }}</td>-->
        <!--<td class="text-xs-right">{{ props.item.login }}</td>-->
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.password }}</td>
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
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        // { text: 'Пользователь', align: 'left', value: 'name' },
        // { text: 'Логин', value: 'login' },
        { text: 'Email', value: 'email' },
        { text: 'Пароль', value: 'password' },
        { text: 'Роль', value: 'role' }
      ],
      roles: [
        { text: 'Администратор' },
        { text: 'Пользователь' }
      ],
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
        return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.$store.dispatch('LOAD_USERS')
    },

    methods: {
      createUpdateUser (user) {
        if (user.id === null) {
          this.$store.dispatch('ADD_NEW_USER', { user: user })
        } else {
          this.$store.dispatch('UPDATE_USER', { user: user })
        }
        this.close()
      },

      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.editedItem.password = ''
        this.dialog = true
      },

      deleteItem (user) {
        confirm('Уверены что хотите удалить этого пользователя?') && this.$store.dispatch('REMOVE_USER', { user })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    }
  }
</script>
