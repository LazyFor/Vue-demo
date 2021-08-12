import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 注册模块, 已经全局组件 router-view

const routes = [
  {
    path: '/film',
    component: () => import('../views/Film.vue'),
    // 嵌套路由
    children: [
      {
        path: 'nowplaying', // 简写
        component: () => import('../views/film/Nowplaying.vue')
      },
      {
        path: '/film/comingsoon',
        component: () => import('../views/film/Comingsoon.vue')
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: () => import('../views/Cinema.vue')
  },
  {
    path: '/center',
    component: () => import('../views/Center.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/city',
    component: () => import('../views/City.vue')
  },
  {
    path: '/detail/:myid', // 动态路由
    component: () => import('../views/Detail.vue'),
    name: 'kerwinDetail'
  },

  // {
  //   path: '/detail',
  //   component: Detail
  // },

  {
    path: '*', // 通配符
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'hash', // hash ,history
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // ...
  const auth = ['/center', '/order', '/money', '/card']

  if (auth.includes(to.fullPath)) {
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
