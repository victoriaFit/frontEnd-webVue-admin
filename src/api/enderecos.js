import api from '../plugins/api'
export default class EnderecosApi {
  async buscarTodosOsEnderecos() {
    const { data } = await api.get("/endereco/");
    return data;
  }
  async adicionarEndereco(endereco) {
    const { data } = await api.post("/endereco/", endereco);
    return data;
  }
  async atualizarEndereco(endereco) {
    const { data } = await api.put(`/endereco/${endereco.id}/`, endereco);
    return data;
  }
  async excluirEndereco(id) {
    const { data } = await api.delete(`/endereco/${id}/`);
    return data;
  }
}
