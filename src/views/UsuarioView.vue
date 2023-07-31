<script>
import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();
export default {
  data() {
    return {
      usuarios: [],
      usuario: {},
    };
  },
  async created() {
    this.usuarios = await usuariosApi.buscarTodasOsUsuarios();
  },
  methods: {
    async salvar() {
      if (this.usuario.id) {
        await usuariosApi.atualizarUsuario(this.usuario);
      } else {
        await usuariosApi.adicionarUsuario(this.usuario);
      }
      this.usuario = {};
      this.usuarios = await usuariosApi.buscarTodasOsUsuarios();
    },
    editar(usuario) {
      Object.assign(this.usuario, usuario);
    },
    async excluir(usuario) {
      await usuariosApi.excluirusuario(usuario.id);
      this.usuarios = await usuariosApi.buscarTodasOsUsuarios();
    },
  },
};
</script>

<template>
  <h1>usuario</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="usuario.nome" placeholder="Nome" />
    <input type="text" v-model="usuario.email" placeholder="Email" />
    <input type="text" v-model="usuario.telefone" placeholder="Telefone" />
    <input type="text" v-model="usuario.senha" placeholder="Senha" />
    <input type="text" v-model="usuario.endereco" placeholder="Endereco" />
    <button @click="salvar">Salvar</button>
  </div>
  <hr />
  <ul>
    <li v-for="usuario in usuarios" :key="usuario.id">
      <span @click="editar(usuario)">
        ({{ usuario.id }}) - {{ usuario.numero }} - {{ usuario.complemento }} - {{ usuario.rua }} - {{ usuario.bairro }} - {{ usuario.cidade }} - {{ usuario.cep }}
      </span>
      <button @click="excluir(usuario)">X</button>
    </li>
  </ul>
</template>

<style></style>
