import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Goods from '@/pages/home/components/goods/Goods'
import Ratings from '@/pages/home/components/ratings/Ratings'
import Sellers from '@/pages/home/components/sellers/Sellers'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: { name: 'goods' },
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods,
          props: {goods: true}
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: 'sellers',
          name: 'sellers',
          component: Sellers
        }
      ]
    }
  ]
})
