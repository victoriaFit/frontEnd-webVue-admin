<template>
  <header>
    <router-link :to="{ name: 'home' }"> Home </router-link> 
    <router-link to="/equipments"> Produtos</router-link>
    <router-link to="/users">Usuários</router-link>

  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
</style>
