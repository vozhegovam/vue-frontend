import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Companies from '@/components/Companies'
import ListTemplates from '@/components/ListTemplates'
import PointTemplates from '@/components/PointTemplates'
import CompanyLists from '@/components/CompanyLists'
import PointExemplars from '@/components/PointExemplars'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies
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
      component: PointTemplates
    },
    {
      path: '/company/:id',
      props: true,
      name: 'CompanyLists',
      component: CompanyLists
    },
    {
      path: '/list/:id',
      props: true,
      name: 'PointExemplars',
      component: PointExemplars
    }
  ],
  mode: 'history'
})
