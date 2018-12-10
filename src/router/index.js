import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Companies from '@/components/Companies'
import ListTemplates from '@/components/ListTemplates'
import PointTemplates from '@/components/PointTemplates'
import CompanyLists from '@/components/CompanyLists'
import PointExemplars from '@/components/PointExemplars'
import Report from '@/components/Report'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import types from '../store/auth/auth'

Vue.use(Router)

const hasToken = (to, from, next) => {
  const token = localStorage.getItem('JWT')
  const username = localStorage.getItem('username')
  if (token) {
    this.$store.commit(types.AUTH_SUCCESS, { token, username })
    this.$router.push('/')
  } else {
    next()
  }
}
const requireAuth = (to, from, next) => {
  if (store.getters.isAuth) {
    next()
  } else {
    this.$router.push('/log')
  }
}

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }
//
// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: requireAuth
    },
    {
      path: '/',
      name: 'Companies',
      component: Companies,
      beforeEnter: requireAuth
    },
    // {
    //   path: '/companies',
    //   name: 'Companies',
    //   component: Companies
    // },
    {
      path: '/log',
      name: 'Login',
      component: Login,
      beforeEnter: hasToken
    },
    {
      path: '/reg',
      name: 'Registration',
      component: Registration,
      beforeEnter: requireAuth
    },
    {
      path: '/templates',
      name: 'ListTemplates',
      component: ListTemplates
    },
    {
      path: '/template/:id',
      props: true,
      name: 'PointTemplates',
      component: PointTemplates,
      beforeEnter: requireAuth
    },
    {
      path: '/company/:id',
      props: true,
      name: 'CompanyLists',
      component: CompanyLists,
      beforeEnter: requireAuth
    },
    {
      path: '/list/:id',
      props: true,
      name: 'PointExemplars',
      component: PointExemplars,
      beforeEnter: requireAuth
    },
    {
      path: '/report/:id',
      props: true,
      name: 'Report',
      component: Report,
      beforeEnter: requireAuth
    }
  ],
  mode: 'history'
})
