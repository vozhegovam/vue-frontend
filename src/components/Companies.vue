<template>
  <div>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" small color="primary" dark class="mb-2">Добавить компанию</v-btn>
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
                  <v-text-field v-model="editedItem.description" label="Заметки"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-if="hasAccess"
                    :items="this.$store.getters.getUsersAsList"
                    v-model="editedItem.user"
                    label="Пользователь"
                    single-line
                  ></v-select>
                </v-flex>
                <!--<v-flex xs12 sm6 md4>-->
                <!--<v-select-->
                <!--:items="yesNoList"-->
                <!--v-model="editedItem.checked"-->
                <!--label="Преверка пройдена"-->
                <!--single-line-->
                <!--&gt;</v-select>-->
                <!--</v-flex>-->
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
            <v-btn color="blue darken-1" flat @click.native="createUpdateCompany(editedItem)">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <b>Баланс: {{getCurrentUserBalance}}</b>
    </div>
    <v-data-table
      :headers="getHeaders"
      :items="this.$store.getters.getCompanies"
      hide-actions
      :loading="loading"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left"><a v-bind:href="'/company/' + props.item.id">{{ props.item.name }}</a></td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td v-if="hasAccess" class="text-xs-left">{{ getUserByValue(props.item.user) }}</td>
        <td class="text-xs-left">{{ getListValueByValue(props.item.checked)}}</td>
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
        { text: 'Имя', align: 'left', value: 'name', isAdmin: false },
        { text: 'Описание', align: 'left', value: 'description', isAdmin: false },
        { text: 'Пользователь', align: 'left', value: 'user', isAdmin: true },
        { text: 'Проверка пройдена', align: 'left', value: 'checked', isAdmin: false }
      ],
      corps: [
      ],
      yesNoList: [
        { text: 'Да', value: true },
        { text: 'Нет', value: false }
      ],
      userList: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        description: '',
        user: '',
        checked: ''
      },
      defaultItem: {
        id: null,
        name: '',
        description: '',
        user: '',
        checked: false
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить фирму' : 'Редактировать'
      },
      hasAccess () {
        return this.$store.getters.isUserAdmin
      },
      getHeaders () {
        if (!this.hasAccess) {
          return this.headers.filter(r => !r.isAdmin)
        } else {
          return this.headers
        }
      },
      getCurrentUserBalance () {
        return this.$store.getters.getCurrentUserBalance
      },
      getCurrentUserId () {
        return this.$store.getters.getCurrentUserId
      },
      loading () {
        return this.$store.getters.loading
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      if (this.hasAccess) {
        this.$store.dispatch('LOAD_USERS')
      }
      this.$store.dispatch('LOAD_COMPANIES')
    },

    methods: {
      createUpdateCompany (company) {
        company.user = this.$store.getters.getCurrentUserId
        if (company.id === null) {
          company.checked = false
          this.$store.dispatch('ADD_NEW_COMPANY', { company: company })
        } else {
          this.$store.dispatch('UPDATE_COMPANY', { company: company })
        }
        this.close()
      },
      editItem (company) {
        this.editedItem = Object.assign({}, company)
        this.dialog = true
      },
      deleteItem (company) {
        confirm('Уверены что хотите удалить этоу фирму?') && this.$store.dispatch('REMOVE_COMPANY', { company })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      getListValueByValue (value) {
        if (value) {
          return 'Да'
        } else {
          return 'Нет'
        }
      },
      getUserByValue (id) {
        if (id === null || !this.hasAccess || !this.$store.getters.isTokenPresented) {
          return null
        }
        const user = this.$store.getters.getUsers.find(item => { return item.id === id })
        if (user === null && user === undefined) {
          return null
        }
        return user.email
      }
    }
  }
</script>
