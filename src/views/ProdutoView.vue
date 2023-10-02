<script>
import {ref} from 'vue';
import ProdutosApi from "@/api/produtos.js";
import CategoriasApi from "@/api/categorias.js";
import imageService from "@/api/imagem.js";

const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();

const coverUrl = ref('')
const file = ref(null)

export default {
  data() {
    return {
      produtos: [],
      produto: {},
      categorias: [],
      categoria: {},
      // coverUrl: '',
      // file: null,
    };
  },
  async created() {
    this.produtos = await produtosApi.buscarTodosOsProdutos();
    this.categorias = await categoriasApi.buscarTodasAsCategorias();
  },

  methods: {
    async salvar() {
      if (this.produto.id) {
        await produtosApi.atualizarProduto(this.produto);
      } else {

        const imagem = await imageService.uploadImage(file.value)

        await produtosApi.adicionarProduto(this.produto);
      }
      this.produto = {};
      this.produtos = await produtosApi.buscarTodosOsProdutos();
    },
    onFileChange(e) {
      file.value = e.target.files[0]
      coverUrl.value = URL.createObjectURL(file.value)
    },
    editar(produto) {
      Object.assign(this.produto, produto);
    },
    async excluir(produto) {
      await produtosApi.excluirProduto(produto.id);
      this.produtos = await produtosApi.buscarTodosOsProdutos();
    },

  },
};
</script>

<template>
  <h1>produto</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="produto.nome" placeholder="Nome" />
    <input type="text" v-model="produto.descricao" placeholder="Descricão" />
    <input type="text" v-model="produto.preco" placeholder="Preço" />
    <select v-model="produto.categoria">
      <option disabled value="">Selecione uma categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.descricao }}
      </option>
    </select>
    <input type="file" @change="onFileChange" />

    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="produto in produtos" :key="produto.id">
      <span @click="editar(produto)">
    <li>ID: {{ produto.id }}</li>
    <li>
      {{ produto.nome }}
    </li>
    <li>
      {{ produto.descricao }}
    </li>
    <li>R$ {{ produto.preco }}</li>
    <li>{{ produto.categoria }}</li>
    <li>
      <img :src="produto.imagem.file" alt="" />
    </li>
    </span>
    <button @click="excluir(produto)">X</button>
    </li>
  </ul>
</template>

<style>
img {
  max-width: 100px;
}
</style>
