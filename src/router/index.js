import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import routesConfig from './config'
import store from '../store/index.js'
import { compile } from 'vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox,

  },
  //mainbox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  }
  else {
    //如果授权（已经登陆过）
    if (!localStorage.getItem('token')) {
      next(
        {
          path: 'login'
        })
    }
    else {
      if (!store.state.isGetterRouter) {
        configRouter();
        next({
          path: to.fullPath//如果在动态添加路由后直接调用 next()，Vue Router 可能不会识别到刚添加的路由，导致当前导航无法匹配到目标路由，甚至可能显示 404 或跳转失败。
        });
        store.commit('changeGetterRouter', true);
      }
      else {
        next();
      }
    }
  }
})
const configRouter = () => {
  routesConfig.forEach(
    item => {
      router.addRoute(
        'mainbox',
        item
      )
    }
  )

}

export default router
