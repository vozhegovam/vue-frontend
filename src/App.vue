<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-divider></v-divider>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items"
                       :key="item.title"
                       @click=""
                       :to="item.url">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group
            v-if="isAuth"
            prepend-icon="account_circle"
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Администрирование</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="item in admins"
                         :key="item.title"
                         @click=""
                         :to="item.url">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Охрана труда</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!isAuth" icon :to="'/log'">
          <v-icon>lock</v-icon>
        </v-btn>
        <!--<p class="text-sm-center">{{getCurUserName}}</p>-->
        <div v-if="isAuth">
          <v-btn icon @click="logoutFrom()">
            <v-icon>lock_open</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        {icon: 'account_balance', title: 'Фирмы', url: '/'}
      ],
      admins: [
        {icon: 'contacts', title: 'Пользователи', url: '/users'},
        {icon: 'assignment', title: 'Проверочные листы', url: '/templates'}
      ],
      right: null
    }),
    props: {
      source: String
    },
    computed: {
      isAuth () {
        const token = localStorage.getItem('JWT')
        return (token !== null)
      },
      getCurUserName () {
        return this.$store.getters.getCurrentUserName
      }
    },
    methods: {
      logoutFrom () {
        this.$store.dispatch('AUTH_LOGOUT')
        this.$router.push('/log')
      }
    }
  }
</script>
