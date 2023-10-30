import api from '../plugins/api'
export default class UsuarioApi {
  async buscarTodosOsUsuarios() {
    const { data } = await api.get('/usuarios/');
    return data;
  }
  async adicionarUsuario(usuario) {
    const { data } = await api.post('/usuarios/', usuario);
    return data;
  }
  async atualizarUsuario(usuario) {
    const { data } = await api.put(`/usuarios/${usuario.id}/`, usuario);
    return data;
  }
  async excluirUsuario(id) {
    const { data } = await api.delete(`/usuarios/${id}/`);
    return data;
  }
}
