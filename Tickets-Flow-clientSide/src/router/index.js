import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePageVue.vue'
import LoginPage from '../views/LoginPageVue.vue'
import UserHomePage from '../views/UserHomePageVue.vue'
import AdminHomePage from '../views/AdminHomePageVue.vue'
import ResponsibleHomePage from '../views/ResponsibleHomePageVue.vue'
import NotAuthenticatedHomePage from '../views/NotAuthenticatedHomePageVue.vue'
import AdminHomeresp from '../views/AdminHomeresp.vue'
import TickestsList from '../views/TicketsListVue.vue'
import TicketsAdd from '../views/TicketsAddVue.vue'
import TicketDetaills from '../views/TicketDetaillsVue.vue'
import TicketHitory from '../views/TicketHitoryVue.vue'
import CategoryAdd from '../views/CategoryAddVue.vue'
import CategoryList from '../views/CategoryListVue.vue'
import UserAdd from '../views/UserAddVue.vue'

function checkAuth(to, from, next) {

  if(to.name == 'login'){
    localStorage.removeItem('token')
    next()
  }else if (localStorage.getItem('token') == null) {
    next('/login')
  } else {
    next()
  }
  
}



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotAuthenticatedHomePage
    },
    {
      path: '/home',
      name: 'homePage',   
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/homeuser',
      name: 'homeuser',
      component: UserHomePage
    },
    
    {
      path: '/homeresponsible',
      name: 'homeresponsible',
      component: ResponsibleHomePage
    },
    {
      path: '/homeadminresponsibles',
      name: 'AdminHomePageResponsibles',
      component: AdminHomeresp
    },{
      path: '/ticketlist',
      name: 'ticketlist',
      component: TickestsList
    },{
      path: '/ticketlist/:userId',
      name: 'ticketlistuderid',
      component: TickestsList
    },{
      path: '/ticketsadd/:id',
      name: 'ticketsadd',
      component: TicketsAdd
    },{
      path: '/ticketdetaills/:id',
      name: 'TicketDetaills',
      component: TicketDetaills
    },{
      path: '/categoryadd',
      name: 'categoryadd',
      component: CategoryAdd
    },{
      path: '/tickethistory/:id',
      name: 'TicketHistory',
      component: TicketHitory
    },{
      path: '/categorylist',
      name: 'CategoryList',
      component: CategoryList
    },{
      path: '/useradd',
      name: 'UserAdd',
      component: UserAdd
    }
  ]
})

router.beforeEach(checkAuth)

export default router
