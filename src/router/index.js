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
import store from '../store'

Vue.use(Router)

const hasToken = (to, from, next) => {
  const isToken = store.getters.isTokenPresented
  if (isToken) {
    next('/')
  } else {
    next()
  }
}
const ifAuthenticated = (to, from, next) => {
  const isToken = store.getters.isTokenPresented
  if (isToken) {
    next()
  } else {
    next('/log')
  }
}
const ifAdminAuthenticated = (to, from, next) => {
  const isToken = store.getters.isTokenPresented
  const isAdmin = store.getters.isUserAdmin
    // localStorage.getItem('isAdmin').role === 'Администратор'
  if (isToken && isAdmin) {
    next()
  } else {
    next('/log')
  }
}

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: ifAdminAuthenticated
    },
    {
      path: '/',
      name: 'Companies',
      component: Companies,
      beforeEnter: ifAuthenticated
    },
    // {
    //   path: '/companies',
    //   name: 'Companies',
    //   component: Companies,
    //   beforeEnter: ifAuthenticated
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
      component: Registration
    },
    {
      path: '/activate/:code',
      name: 'Activation',
      component: Registration
    },
    {
      path: '/templates',
      name: 'ListTemplates',
      component: ListTemplates,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/template/:id',
      props: true,
      name: 'PointTemplates',
      component: PointTemplates,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/company/:id',
      props: true,
      name: 'CompanyLists',
      component: CompanyLists,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/list/:id',
      props: true,
      name: 'PointExemplars',
      component: PointExemplars,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/report/:id',
      props: true,
      name: 'Report',
      component: Report,
      beforeEnter: ifAuthenticated
    }
  ],
  mode: 'history'
})
