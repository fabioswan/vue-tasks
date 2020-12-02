import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskManager from '../views/TaskManager.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TaskManager',
    component: TaskManager,
    meta:{title:'Tasks'},
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to,from,next) => {
  document.title = to.meta.title;
  next()
});

export default router
