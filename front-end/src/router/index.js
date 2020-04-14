import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Gallery from  '../views/Gallery.vue'
import People from  '../views/People.vue'
import FamilyList from '../views/FamilyList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add/',
    name: 'add',
    component: Add
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/family',
    name: 'family',
    component: FamilyList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
