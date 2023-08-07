import axios from "axios";
export default class EnderecosApi {
  async buscarTodosOsEnderecos() {
    const { data } = await axios.get("/endereco/");
    return data;
  }
  async adicionarEndereco(endereco) {
    const { data } = await axios.post("/endereco/", endereco);
    return data;
  }
  async atualizarEndereco(endereco) {
    const { data } = await axios.put(`/endereco/${endereco.id}/`, endereco);
    return data;
  }
  async excluirEndereco(id) {
    const { data } = await axios.delete(`/endereco/${id}/`);
    return data;
  }
}
