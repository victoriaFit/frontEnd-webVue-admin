<script>
import CategoriaApi from "@/api/categorias";
export default {
  data() {
    return {
      categorias: [],
      categoria: {},
    };
  },
  async created() {
    this.categorias = await CategoriaApi.buscarTodasAsCategorias();
  },
  methods: {
    async salvar() {
      if (this.categoria.id) {
        await CategoriaApi.atualizarCategoria(this.categoria);
      } else {
        await CategoriaApi.adicionarCategoria(this.categoria);
      }
      this.categoria = {};
      this.categorias = await CategoriaApi.buscarTodasAsCategorias();
    },
    editar(categoria) {
      Object.assign(this.categoria, categoria);
    },
    async excluir(categoria) {
      await CategoriaApi.excluirCategoria(categoria.id);
      this.categorias = await CategoriaApi.buscarTodasAsCategorias();
    },
  },
};
</script>

<template>
  <h1>categoria</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="categoria in categorias" :key="categoria.id">
      <span @click="editar(categoria)">
    <li>
      ID: {{ categoria.id }}
    </li>
    <li>
      {{ categoria.descricao }}
    </li>
    <li>
      <img :src="categoria.imagem.file" alt="" />
    </li>
    </span>
    <button @click="excluir(endereco)">X</button>
    </li>
  </ul>
</template>

<style></style>
