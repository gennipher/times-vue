import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/times',
    name: 'Times',
    component: () => import( '../views/Times.vue')
  },
  {
    path: '/cadastrotimes',
    name: 'CadastroTimes',
    component: () => import( '../views/CadastroTimes.vue')
  },
  {
    path: '/maisinformacoes',
    name: 'MaisInformacoes',
    component: () => import( '../views/MaisInformacoes.vue')
  },
  {
    path: '/jogadores',
    name: 'jogadores',
    component: () => import( '../views/Jogadores.vue')
  },
  {
    path: '/cadastrojogadores',
    name: 'CadastroJogadores',
    component: () => import( '../views/CadastroJogadores.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
