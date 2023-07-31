<template>
  <header>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link to="/carrinhos">Carrinhos</router-link>
    <router-link to="/enderecos">Endereços</router-link>
    <router-link to="/produtos">Produtos</router-link>
    <router-link to="/usuarios">Usuários</router-link>
  </header>
  <main>
    <RouterView />
  </main>
</template>
