import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/index',
      component:require('../components/home'),
      meta: {navShow:true}
    },
    {
      path: '/citys',
      component:require('../components/citys'),
      meta: {navShow:false}
    },
    {
      path: '/search',
      component:require('../components/search'),
      meta: {navShow:false}
    },
    {
      path: '/salePrice',
      component:require('../components/salePrice'),
      meta:{navShow:false}
    },
     {
      path: '/mien',
      component:require('../components/mien'),
      meta:{navShow:false}
    },
    {
      path: '/shareOrder',
      component:require('../components/shareOrder'),
      meta:{navShow:false}
    },
    {
      path: '/AA',
      component:require('../components/AA'),
      meta:{navShow:false}
    },
    {
      path: '/my_share',
      component:require('../components/my_share'),
      meta:{navShow:false}
    },
     {
      path: '/AA_share',
      component:require('../components/AA_share'),
      meta:{navShow:false}
    },
    {
      path: '/AA_mass',
      component:require('../components/AA_mass'),
      meta:{navShow:false}
    },
    {
      path: '/notify',
      component:require('../components/notify'),
      meta:{navShow:false}
    },
    {
      path: '/bbq',
      component:require('../components/bbq'), 
       meta: {navShow:true}
    },
    {
      path: '/detail/:id',
      history:false,
      component:require('../components/detail'),
      meta: {navShow:false}
    },
    {
      path: '/goods/:id',
      component:require('../components/goods'),
      meta: {navShow:false},
      children:[
                  { path: '/goods/:id/goodsDetail', component: require('../components/goodsCont/goodsDetail'),meta:{navShow:false}},
                  { path: '/goods/:id/ratings', component: require('../components/goodsCont/ratings'),meta:{navShow:false}},
                  { path: '/goods/:id/seller', component: require('../components/goodsCont/seller'),meta:{navShow:false}},
                  { path: '',redirect:'/goods/:id/goodsDetail'}
               ]
    },
     {
      path: '/pics',
      component:require('../components/pics'),
      meta: {navShow:false}
    },
    {
      path: '/payDetail',
      component:require('../components/payDetail'),
      meta: {navShow:false}
    },
    {
      path: '/confirmPay',
      component:require('../components/confirmPay'),
      meta: {navShow:false}
    },
    {
      path: '/payOk',
      component:require('../components/payOk'),
      meta: {navShow:false}
    },
    {
      path: '/order',
      component:require('../components/order'),
      meta: {navShow:true},
      children:[
                  { path: '/order/allPay', component: require('../components/order/allPay'),meta:{navShow:true}},
                  { path: '/order/noPayment', component: require('../components/order/noPayment'),meta:{navShow:true}},
                  { path: '/order/Payment', component: require('../components/order/Payment'),meta:{navShow:true}},
                  { path: '/order/estimate', component: require('../components/order/estimate'),meta:{navShow:true}},
                  { path: '/order/refund', component: require('../components/order/refund'),meta:{navShow:true}},
                  { path: '',redirect:'/order/allPay'}
               ]
    },
    {
      path: '/order/orderDetail/:id',
      component:require('../components/orderDetail'),
      meta: {navShow:false},
       children:[
                  { path: '/order/:id/orderState', component: require('../components/order/orderState'),meta:{navShow:false}},
                  { path: '/order/:id/orderContent', component: require('../components/order/orderContent'),meta:{navShow:false}},
                  { path: '',redirect:'/order/:id/orderState'}
               ]
    },
    {
      path: '/comment',
      component:require('../components/comment'),
      meta: {navShow:false}
    },
    {
      path: '/postponed',
      component:require('../components/order/postponed'),
      meta: {navShow:false}
    },
    {
      path: '/refundDetail',
      component:require('../components/order/refundDetail'),
      meta: {navShow:false}
    },
     {
      path: '/refundState',
      component:require('../components/order/refundState'),
      meta: {navShow:false}
    },
    {
      path: '/user',
      component:require('../components/user'),
      meta: {navShow:true}
    },
    {
      path: '/userInfo',
      component:require('../components/userInfo'),
      meta: {navShow:false}
    },
    {
      path: '/setInfo',
      component:require('../components/setInfo'),
      meta: {navShow:false}
    },
    {
      path: '/userSet',
      component:require('../components/userSet'),
      meta: {navShow:false}
    },
     {
      path: '/passwordSet',
      component:require('../components/passwordSet'),
      meta: {navShow:false}
    },
    {
      path: '/collect',
      component:require('../components/collect'),
      meta: {navShow:false}
    },
    {
      path: '/voucher',
      component:require('../components/voucher'),
      meta: {navShow:false}
    },
    {
      path: '/userAdd',
      component:require('../components/userAdd'),
      meta: {navShow:false}
    },
    {
      path: '/newAdd',
      component:require('../components/newAdd'),
      meta: {navShow:false}
    },
    {
      path: '/compileAdd',
      component:require('../components/compileAdd'),
      meta: {navShow:false}
    },
    {
      path: '/Add',
      component:require('../components/Add'),
      meta: {navShow:false}
    },
    {
      path: '/login',
      component:require('../components/login/login'),
      meta: {navShow:false}
    },
    {
      path: '/register',
      component:require('../components/login/register'),
      meta: {navShow:false}
    },
    {
      path: '/findPs',
      component:require('../components/login/findPs'),
      meta: {navShow:false}
    },
    {
      path: '/feedback',
      component:require('../components/feedback'),
      meta: {navShow:false}
    },
    {
      path: '/article/:id',
      component:require('../components/article'),
      meta: {navShow:false}
    },
    {
      path: '*',
      redirect:'/index',
      meta:{navShow:true}
    }
   
  ],
  linkActiveClass: 'cur'
})
export default router


    