<script setup>
import { ref, onMounted } from 'vue'

import produtosApi from '@/api/produtos'

const produtos = ref([])

onMounted(async () => {
  const data = await produtosApi.buscarTodosOsProdutos()
  produtos.value = data
})
</script>

<template>
  <div class="container">
    <div v-for="produto in produtos" :key="produto.id" class="card">
      <img :src="produto.cover.url" :alt="produto.nome" />
      <div>
        <h3>{{ produto.nome }}</h3>
        <div>
          <p>{{ produto.preco }}</p>
        </div>
        <p>{{ produto.categoria }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container{
  display: wrap;
  flex-direction: row;
}
.card {
  width: 200px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>