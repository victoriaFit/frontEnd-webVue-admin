<template>
  <header>
    <router-link to="/equipments" v-if="$route.path !== '/login'"> </router-link>
    <button @click="logout" class="logout-button" v-if="$route.path !== '/login'">Logout</button>
  </header>
  <main>
    <RouterView />
  </main>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function logout() {
  localStorage.removeItem('authToken');
  router.push('/login');
}

</script>


<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /* Adicione mais estilos conforme necessário */
}

.logout-button {
  background-color: #f44336; /* Cor de fundo */
  color: white; /* Cor do texto */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
