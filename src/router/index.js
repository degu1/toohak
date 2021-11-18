import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/LoginOrRegister.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login/Register',
    component: Home
  },
  {
    path: '/quiz_setup',
    name: 'Quiz Setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizSetup.vue')
  },
  {
    path: '/class_setup',
    name: 'Class Setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ClassSetup.vue')
  },
  {
    path: '/myQuizes',
    name: 'My Quizes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyQuizes.vue')
  },
  {
    path: '/quizes/:quiz_id',
    name: 'Active Quiz',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ActiveQuiz.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
