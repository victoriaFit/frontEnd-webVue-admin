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
  <div class="row wrap">
    <div v-for="produto in produtos" :key="produto.id" class="card">
      <img :src="produto.imagem.file" :alt="produto.nome" />
      <div class="produto-detail">
        <h3>{{ produto.nome }}</h3>
        <div class="produto-year-rating">
          <p>{{ produto.preco }}</p>
        </div>
        <p>{{ produto.categoria }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  height: 400px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.produto-detail p {
  margin: 0;
}

.produto-year-rating {
  display: flex;
  column-gap: 2rem;
}

.produto-detail h3 {
  margin: 0;
  font-size: 1.2rem;
}
</style>