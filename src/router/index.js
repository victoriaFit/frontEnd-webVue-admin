import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarrinhoView from '../views/CarrinhoView.vue';
import EnderecoView from '../views/EnderecoView.vue';
import ProdutoView from '../views/ProdutoView.vue';
import UsuarioView from '../views/UsuarioView.vue';
import CategoriaView from '../views/CategoriaView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/carrinhos',
      name: 'carrinhos',
      component: CarrinhoView,
    },
    {
      path: '/enderecos',
      name: 'enderecos',
      component: EnderecoView,
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: ProdutoView,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuarioView,
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriaView,
    }
  ],
});

export default router;
