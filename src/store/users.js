
export default {
  state: {
    users: [
    {
      name: 'Bob',
      login: '1',
      password: '1',
      email: '1',
      role: 'Администратор'
    },
    {
      name: 'Bob1',
      login: '2',
      password: '1',
      email: '1',
      role: 'Пользователь'
    }
  ]
  },
  mutations: {},
  actions: {},
  getters: {
    getUsers (state) {
      return state.users
    }
  }
}
