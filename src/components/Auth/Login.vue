<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Форма входа</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                autocomplete="foo"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Пароль"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
                autocomplete="foo"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <a :href="'/reg'">Зарегистрироваться</a>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :disabled="!valid"
            >Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    data () {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Введите E-mail',
          v => emailRegex.test(v) || 'Не верный формат E-mail'
        ],
        passwordRules: [
          v => !!v || 'Введите пароль',
          v => (v && v.length >= 2) || 'Пароль должен быть больше 3 символов'
        ]
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const userData = {
            username: this.email,
            password: this.password
          }
          console.log(userData)
          this.$store.dispatch('AUTH_REQUEST', { userData: userData })
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => console.log(err.message))
        }
      }
    }
  }
</script>
