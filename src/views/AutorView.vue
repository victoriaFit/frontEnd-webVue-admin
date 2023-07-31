<script>
import AutoresApi from "@/api/autores";
const autoresApi = new AutoresApi();
export default {
  data() {
    return {
      autores: [],
      autor: {},
    };
  },
  async created() {
    this.autores = await autoresApi.buscarTodasOsAutores();
  },
  methods: {
    async salvar() {
      if (this.autor.id) {
        await autoressApi.atualizarAutor(this.autor);
      } else {
        await autoresApi.adicionarAutor(this.autor);
      }
      this.autor = {};
      this.autores = await autoresApi.buscarTodasOsAutores();
    },
    editar(autor) {
      Object.assign(this.autor, autor);
    },
    async excluir(autor) {
      await autoresApi.excluirAutor(autor.id);
      this.autores = await autoresApi.buscarTodasOsAutores();
    },
  },
};
</script>

<template>
  <h1>Autor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="autor.nome" placeholder="Nome" />
    <input type="text" v-model="autor.email" placeholder="Email" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="autor in autores" :key="autor.id">
      <span @click="editar(autor)">
        ({{ autor.id }}) - {{ autor.nome }} - {{ autor.email }}
      </span>
      <button @click="excluir(autor)">X</button>
    </li>
  </ul>
</template>

<style></style>
