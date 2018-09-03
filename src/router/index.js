import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Companies from '@/components/Companies'
import ListTemplates from '@/components/ListTemplates'

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
      // children{
      //   path: '/point_templates',
      //   name: 'PointTemplates',
      //   component: PointTemplates,
      // }
    }
  ],
  mode: 'history'
})
