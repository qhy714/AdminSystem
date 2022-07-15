import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')

const UserList = () => import('@/views/UserList')
const PermissionList = () => import('@/views/Permission/PermissionList.vue')
const RolesList = () => import('@/views/Permission/RolesList.vue')
const Classify = () => import('@/views/Goods/Classify.vue')
const GoodsClassify = () => import('@/views/Goods/GoodsClassify.vue')
const GoodsList = () => import('@/views/Goods/GoodsList.vue')
const Order = () => import('@/views/Order')
const Data = () => import('@/views/Data')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children:
      [
        { path: 'userlist', component: UserList },
        { path: 'rolesList', component: RolesList },
        { path: 'permissionlist', component: PermissionList },
        { path: 'goodslist', component: GoodsList },
        { path: 'classify', component: Classify },
        { path: 'goodsclassify', component: GoodsClassify },
        { path: 'order', component: Order },
        { path: 'data', component: Data }
      ]
  }

]

const router = new VueRouter({
  routes
})

export default router
