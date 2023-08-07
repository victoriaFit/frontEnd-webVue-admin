<script>
import CarrinhosApi from "@/api/carrinhos";
const carrinhosApi = new CarrinhosApi();
import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();
import ProdutosApi from "@/api/produtos";
const produtosApi = new ProdutosApi();
export default {
  data() {
    return {
      carrinhos: [],
      carrinho: {},
      usuarios: [],
      usuario: {},
      produtos: [],
      produto: {},
    };
  },
  async created() {
    this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
    this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    this.produtos = await produtosApi.buscarTodosOsProdutos();
  },
  methods: {
    async salvar() {
      if (this.carrinho.id) {
        await carrinhosApi.atualizarCarrinho(this.carrinho);
      } else {
        await carrinhosApi.adicionarCarrinho(this.carrinho);
      }
      this.carrinho = {};
      this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
    },
    editar(carrinho) {
      Object.assign(this.carrinho, carrinho);
    },
    async excluir(carrinho) {
      await carrinhosApi.excluirCarrinho(carrinho.id);
      this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
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
    <select v-model="carrinho.usuario">
      <option value="">Selecione um usuario</option>
      <option v-for="usuario of usuarios" :key="usuario.id" :value="usuario.id">
        {{ usuario.nome }}
      </option>
    </select>
    <select v-model="carrinho.produto">
      <option value="">Selecione um produto</option>
      <option v-for="produto of produtos" :key="produto.id" :value="produto.id">
        {{ produto.nome }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="carrinho in carrinhos" :key="carrinho.id">
      <span @click="editar(carrinho)">
        <li>
          ID: {{ carrinho.id }}
        </li>
        <li>
          Número: {{ carrinho.numero }}
        </li>
        <li>
          Complemento: {{ carrinho.complemento }} 
        </li>
        <li>
          Rua: {{ carrinho.rua }} 
        </li>
        <li>
          Bairro: {{ carrinho.bairro }}
        </li>
        <li>
          Cidade: {{ carrinho.cidade }}
        </li>
        <li>
          Cep :{{ carrinho.cep }}
        </li>
        <hr>
        <li>
          testes: {{ carrinho.id }} - {{ carrinho.usuario }} - {{ carrinho.produto }}
        </li>
      </span>
      <button @click="excluir(carrinho)">X</button>
    </li>
  </ul>
</template>

<style></style>
