import { createRouter, createWebHashHistory } from 'vue-router'
import Clubs from '../components/Clubs.vue'
import Players from '../components/Players.vue'
import Leagues from '../components/Leagues.vue'

const routes = [
  {
    path: '/',
    name: 'clubs',
    component: Clubs
  },
  {
    path: '/players',
    name: 'Players',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Players
  },
  {
    path: '/leagues',
    name: 'Leagues',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Leagues
  }
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
