import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Review from './views/Review.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    }
  ]
})
