import axios from 'axios';
export default class UsuarioApi {
  async buscarTodosOsUsuarios() {
    const { data } = await axios.get('/usuario/');
    return data;
  }
  async adicionarUsuario(usuario) {
    const { data } = await axios.post('/usuario/', usuario);
    return data;
  }
  async atualizarUsuario(usuario) {
    const { data } = await axios.put(`/usuario/${usuario.id}/`, usuario);
    return data;
  }
  async excluirUsuario(id) {
    const { data } = await axios.delete(`/usuario/${id}/`);
    return data;
  }
}
