<script>
import ProdutosApi from "@/api/produtos";
const produtosApi = new ProdutosApi();
export default {
  data() {
    return {
      produtos: [],
      produto: {},
    };
  },
  async created() {
    this.produtos = await produtosApi.buscarTodosOsProdutos();
  },
  methods: {
    async salvar() {
      if (this.produto.id) {
        await produtosApi.atualizarProduto(this.produto);
      } else {
        await produtosApi.adicionarProduto(this.produto);
      }
      this.produto = {};
      this.produtos = await produtosApi.buscarTodosOsProdutos();
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
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="produto in produtos" :key="produto.id">
      <span @click="editar(produto)">
        ({{ produto.id }}) - {{ produto.nome }} - {{ produto.descricao }} - {{ produto.preco }}
      </span>
      <button @click="excluir(produto)">X</button>
    </li>
  </ul>
</template>

<style></style>
