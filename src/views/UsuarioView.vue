<script>
import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();
import EnderecosApi from "@/api/enderecos";
const enderecosApi = new EnderecosApi();

export default {
  data() {
    return {
      usuarios: [],
      usuario: {},
      enderecos: [],
      endereco: {},
    };
  },
  async created() {
    this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    this.enderecos = await enderecosApi.buscarTodosOsEnderecos();
  },
  methods: {
    async salvar() {
      if (this.usuario.id) {
        await usuariosApi.atualizarUsuario(this.usuario);
      } else {
        await usuariosApi.adicionarUsuario(this.usuario);
      }
      this.usuario = {};
      this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    },
    editar(usuario) {
      Object.assign(this.usuario, usuario);
    },
    async excluir(usuario) {
      await usuariosApi.excluirUsuario(usuario.id);
      this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    },
  },
};
</script>

<template>
  <h1>Usuário</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="usuario.nome" placeholder="Nome" />
    <input type="text" v-model="usuario.email" placeholder="Email" />
    <input type="text" v-model="usuario.telefone" placeholder="Telefone" />
    <input type="text" v-model="usuario.senha" placeholder="Senha" />
    <input type="text" v-model="usuario.endereco_padrao" placeholder="Endereco" />
    <select v-model="usuario.endereco_padrao">
      <option value="">Selecione um endereço</option>
      <option v-for="endereco of enderecos" :key="endereco.id" :value="endereco.id">
        {{ endereco.cep }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="usuario in usuarios" :key="usuario.id">
      <span @click="editar(usuario)">
        <li>
          Id: {{ usuario.id }} 
        </li>
        <li>
          Nome: {{ usuario.nome }} 
        </li>
        <li>
          Email: {{ usuario.email }} <button @click="excluir(usuario)">X</button>
        </li>
        <li>  
          Telefone: {{ usuario.telefone }} 
        </li>
        <li>
          Cep: {{ usuario.endereco_padrao }} 
        </li>
      </span>
      <hr>
    </li>
    
  </ul>
</template>

<style></style>
