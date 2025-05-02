import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { createRouter, createWebHistory } from 'vue-router'

// Import components
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'
import PageThree from './components/PageThree.vue'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/page-one'
    },
    {
      path: '/page-one',
      name: 'PageOne',
      component: PageOne,
      meta: { step: 1 }
    },
    {
      path: '/page-two',
      name: 'PageTwo',
      component: PageTwo,
      meta: { step: 2 }
    },
    {
      path: '/page-three',
      name: 'PageThree',
      component: PageThree,
      meta: { step: 3 }
    }
  ]
})

// Navigation guard to update current page in store
router.beforeEach((to, from, next) => {
  if (to.meta.step) {
    store.dispatch('setCurrentPage', to.meta.step)
  }
  next()
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
