<script>
import CarrinhosApi from "@/api/carrinhos";
const carrinhosApi = new CarrinhosApi();
export default {
  data() {
    return {
      carrinhos: [],
      carrinho: {},
    };
  },
  async created() {
    this.carrinhos = await carrinhosApi.buscarTodasOsCarrinhos();
  },
  methods: {
    async salvar() {
      if (this.carrinho.id) {
        await carrinhosApi.atualizarCarrinho(this.carrinho);
      } else {
        await carrinhosApi.adicionarCarrinho(this.carrinho);
      }
      this.carrinho = {};
      this.carrinhos = await carrinhosApi.buscarTodasOsCarrinhos();
    },
    editar(carrinho) {
      Object.assign(this.carrinho, carrinho);
    },
    async excluir(carrinho) {
      await carrinhosApi.excluirCarrinho(carrinho.id);
      this.carrinhos = await carrinhosApi.buscarTodasOsCarrinhos();
    },
  },
};
</script>

<template>
  <h1>carrinho</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="carrinho.numero" placeholder="Número" />
    <input type="text" v-model="carrinho.complemento" placeholder="Complemento" />
    <input type="text" v-model="carrinho.rua" placeholder="Rua" />
    <input type="text" v-model="carrinho.bairro" placeholder="Bairro" />
    <input type="text" v-model="carrinho.cidade" placeholder="Cidade" />
    <input type="text" v-model="carrinho.cep" placeholder="Cep" />
    <input type="text" v-model="carrinho.usuario" placeholder="Usuario" />
    <input type="text" v-model="carrinho.produto" placeholder="Produto" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="carrinho in carrinhos" :key="carrinho.id">
      <span @click="editar(carrinho)">
        <li>
          ({{ carrinho.id }}) - {{ carrinho.numero }} - {{ carrinho.complemento }} - {{ carrinho.rua }} - {{ carrinho.bairro }} - {{ carrinho.cidade }} - {{ carrinho.cep }}
        </li>
        <li>
          ({{ carrinho.id }} - {{ carrinho.usuario }} - {{ carrinho.produto }})
        </li>
      </span>
      <button @click="excluir(carrinho)">X</button>
    </li>
  </ul>
</template>

<style></style>
